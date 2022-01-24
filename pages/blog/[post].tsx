import qs from "qs";
import Image from "next/image";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import { Layout } from "../../components/common/Layout";
import { fetcher } from "../../utils/fetcher";
import { CouponCard } from "../../components/common/CouponCard";

export default function PostPage({ post }: any) {
  return (
    <Layout className="sm:mt-12">
      <div className="max-w-6xl mx-auto flex lg:space-x-4">
        <div className="flex-1">
          <h1 className="text-4xl font-medium">{post.title}</h1>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleString().split(",")[0]}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>10 minutes read</span>
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
            className="prose-lg prose-p:text-gray-500 prose-li:text-gray-500 bg-white py-8 w-full max-w-none"
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="w-72 space-y-4">
          <h3>Deals featured in this article</h3>
          {post.featured_deals.data.map((fd) => (
            <CouponCard compact item={fd} key={`featured_deal_${fd.id}`} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const query = qs.stringify({
    populate: [
      "cover",
      "featured_deals",
      "featured_deals.categories",
      "featured_deals.banner",
      "featured_deals.brand",
      "featured_deals.brand.logo",
    ],
  });

  const { post: _post } = context.params;
  const post = await fetcher(`/api/blogs/${_post}?${query}`);

  return {
    props: {
      post: post.data.attributes,
    },
  };
}

export async function getStaticPaths() {
  const query = qs.stringify({
    pagination: { limit: -1 },
  });

  const post = await fetcher(`/api/blogs?${query}`);

  return {
    fallback: "blocking",
    paths: post.data.map((p) => ({
      params: { post: p.id.toString() },
    })),
  };
}
