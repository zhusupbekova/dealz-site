import qs from "qs";
import Slider from "react-slick";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Layout } from "../../components/common/Layout";
import { fetcher } from "../../utils/fetcher";

function Testimonial({ quote, who, avatar }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center max-w-3xl mx-auto">
      <div className="h-32 w-32 rounded-full overflow-hidden sm:mr-2 mb-2 sm:mb-0">
        <img src={avatar} className="h-full w-full object-cover m-0" />
      </div>

      <div className="flex-1">
        <p className="leading-tight mb-0">{quote}</p>
        <p className="text-sm">{who}</p>
      </div>
    </div>
  );
}

export default function FlatPage({ slug, source }) {
  return (
    <Layout head={slug} metaDescription="">
      <div className="max-w-6xl mx-auto prose-lg prose-p:text-gray-500 prose-li:text-gray-500 mb-12 prose-a:text-primary prose-a:hover:underline">
        <MDXRemote {...source} components={{ Slider, Testimonial }} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { flatPage } = context.params;
  const query = qs.stringify({ filters: { slug: { $eq: flatPage } } });
  const res = await fetcher()(`/api/flat-pages?${query}`);
  const data = res.data[0];

  return {
    revalidate: 60,
    props: {
      source: await serialize(data?.attributes.text ?? ""),
      slug: flatPage,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const data = await fetcher()(`/api/flat-pages`);

  return {
    paths: data.data.map((flatPage) => ({
      params: {
        flatPage: flatPage.attributes.slug,
      },
    })),
    fallback: "blocking", // false or 'blocking'
  };
}
