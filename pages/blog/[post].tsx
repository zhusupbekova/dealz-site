import qs from "qs";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import { Layout } from "../../components/layoutComponents/Layout";
import { fetcher } from "../../utils/fetcher";
import { CouponCard } from "../../components/common/CouponCard";

export default function PostPage({ post }: any) {
  return (
    <Layout
      className="sm:mt-12"
      head={post.title}
      metaDescription={`${post.content.slice(0, 150)}...`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1 pb-12">
          <h1 className="text-4xl font-medium">{post.title}</h1>

          <div className="flex items-center mt-2">
            <div className="flex-shrink-0">
              <a href="#">
                <span className="sr-only">
                  {post.author.data?.attributes.name}
                </span>

                <img
                  className="h-10 w-10 rounded-full mr-2"
                  src={
                    post.author.data?.attributes.profile_photo.data?.attributes
                      .formats.small.url
                  }
                  alt=""
                />
              </a>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author.data?.attributes.name}
              </p>

              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleString().split(",")[0]}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>10 minutes read</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 w-full mt-6 rounded overflow-hidden">
            <Image
              src={post.cover?.data.attributes.url}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>

          <ReactMarkdown
            skipHtml={false}
            rehypePlugins={[rehypeRaw]}
            className="prose-lg prose-p:text-gray-500 prose-li:text-gray-500 prose-a:text-primary prose-a:hover:underline bg-white py-8 w-full max-w-none"
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="md:w-72 space-y-4">
          {post.featured_deals.data.length > 0 && (
            <h3 className="text-lg font-semibold">
              Deals featured in this article
            </h3>
          )}
          {post.featured_deals.data.map((fd) => (
            <CouponCard compact item={fd} key={`featured_deal_${fd.id}`} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { post: _post } = context.params;

  const query = qs.stringify({
    filter: {
      slug: { $eq: _post },
    },
    pagination: { start: 0, limit: 1 },
    populate: [
      "cover",
      "author",
      "author.profile_photo",
      "featured_deals",
      "featured_deals.categories",
      "featured_deals.banner",
      "featured_deals.brand",
      "featured_deals.brand.logo",
    ],
  });

  const post = await fetcher()(`/api/blogs?${query}`);

  return {
    revalidate: 60,
    props: {
      post: post.data[0].attributes,
    },
  };
}

export async function getStaticPaths() {
  const query = qs.stringify({
    pagination: { limit: -1 },
  });

  const post = await fetcher()(`/api/blogs?${query}`);

  return {
    fallback: "blocking",
    paths:
      post.data?.map((p) => ({
        params: { post: p.attributes.slug },
      })) ?? [],
  };
}
