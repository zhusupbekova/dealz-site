import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import rehypeRaw from "rehype-raw";

import { Layout } from "../../components/common/Layout";
import { fetcher } from "../../utils/fetcher";
import { Loading } from "../../components/common/LoadingComponent";

export default function FlatPage({ data }) {
  console.log(data);
  return (
    <Layout>
      <ReactMarkdown
        skipHtml={false}
        rehypePlugins={[rehypeRaw]}
        className="max-w-6xl mx-auto prose-lg"
      >
        {data?.attributes.text}
      </ReactMarkdown>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const { flatPage } = context.params;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetcher(`/api/flat-pages?slug=${flatPage}`);
  const data = res.data[0]; // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const data = await fetcher(`/api/flat-pages`);

  return {
    paths: data.data.map((flatPage) => ({
      params: { flatPage: flatPage.attributes.slug },
    })),
    fallback: true, // false or 'blocking'
  };
}
