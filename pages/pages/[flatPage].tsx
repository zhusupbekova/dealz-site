import qs from "qs";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import { Layout } from "../../components/common/Layout";
import { fetcher } from "../../utils/fetcher";
import { Loading } from "../../components/common/LoadingComponent";

export default function FlatPage({ data, slug }) {
  return (
    <Layout head={slug} metaDescription="">
      <ReactMarkdown
        skipHtml={false}
        rehypePlugins={[rehypeRaw]}
        className="max-w-6xl mx-auto prose-lg prose-p:text-gray-500 prose-li:text-gray-500 mb-12 prose-a:text-primary prose-a:hover:underline"
      >
        {data?.attributes.text}
      </ReactMarkdown>
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
      data,
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
      params: { flatPage: flatPage.attributes.slug },
    })),
    fallback: "blocking", // false or 'blocking'
  };
}
