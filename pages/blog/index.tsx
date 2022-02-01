import qs from "qs";
import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

import { fetcher } from "../../utils/fetcher";
import { Layout } from "../../components/common/Layout";

export default function Blog({ posts }: any) {
  return (
    <Layout
      head="Blog"
      metaDescription="Find posts about saving money using deals and coupons"
    >
      <Posts posts={posts} />
    </Layout>
  );
}

function Posts({ posts }: any) {
  return (
    <div className="pb-24 lg:pb-28 ">
      <div className="relative">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
        </div>

        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-6xl">
          {posts?.map((post) => (
            <Link
              key={post.attributes.title}
              href={`/blog/${post.attributes.slug}`}
            >
              <a className="h-full">
                <div className="flex flex-col h-full rounded-lg shadow-lg overflow-hidden">
                  <div className="relative flex-shrink-0 h-48 w-full">
                    <Image
                      src={post.attributes.cover?.data.attributes.url}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top"
                    />
                  </div>

                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex-1 flex space-x-2">
                        {_.flatMap(
                          post.attributes.featured_deals.data || [],
                          (fd) => fd.attributes.categories.data
                        ).length > 0 ? (
                          _.flatMap(
                            post.attributes.featured_deals.data || [],
                            (fd) => fd.attributes.categories.data
                          ).map((df) => (
                            <p className="text-xs p-0.5 px-1 rounded-sm border border-primary font-medium text-primary">
                              {df.attributes.title}
                            </p>
                          ))
                        ) : (
                          <p className="text-xs p-0.5 px-1 font-medium text-white">
                            {"No categories"}
                          </p>
                        )}
                      </div>

                      <a href={post.href} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.attributes.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {post.attributes.description}
                        </p>
                      </a>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <a href="#">
                          <span className="sr-only">
                            {post.attributes.author.data?.attributes.name}
                          </span>

                          <img
                            className="h-10 w-10 rounded-full mr-2"
                            src={
                              post.attributes.author.data?.attributes
                                .profile_photo.data?.attributes.formats.small
                                .url
                            }
                            alt=""
                          />
                        </a>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.attributes.author.data?.attributes.name}
                        </p>

                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.attributes.publishedAt}>
                            {
                              new Date(post.attributes.publishedAt)
                                .toLocaleString()
                                .split(",")[0]
                            }
                          </time>
                          <span aria-hidden="true">&middot;</span>
                          <span>10 minutes read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const query = qs.stringify({
    pagination: { limit: -1 },
    sort: ["createdAt:desc"],
    populate: [
      "cover",
      "featured_deals",
      "featured_deals.categories",
      "author",
      "author.profile_photo",
    ],
  });

  const posts = await fetcher()(`/api/blogs?${query}`);
  console.log(JSON.stringify(posts.data, null, 4));
  return {
    revalidate: 60,
    props: {
      posts: posts.data,
    },
  };
}
