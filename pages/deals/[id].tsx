import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import useSWR, { SWRResponse } from "swr";
import rehypeRaw from "rehype-raw";
import * as _ from "lodash";

import { Button } from "../../components/common/Button";
import { Layout } from "../../components/common/Layout";
import { Loading } from "../../components/common/LoadingComponent";
import { fetcher } from "../../utils/fetcher";
import { dealsQuery } from "../../utils/queries";
import { IDeal, IDeals } from "../../utils/schema";
import { CategoryTag } from "../../components/common/CategoryTag";
import { CouponModal } from "../../components/couponCardComponents/CouponModal";
import { CouponBrandLogo } from "../../components/couponCardComponents/CouponBrandLogo";

interface IDealDetailPageProps {
  deal: { data: IDeal };
  href: string;
}

export default function DealDetailPage({ deal, href }: IDealDetailPageProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(deal);
  return (
    <Layout>
      {deal ? (
        <div className="max-w-6xl mx-auto flex px-4 sm:px-6">
          <div>
            <div className="sticky top-12 w-72 text-center space-y-4 flex flex-col mr-20">
              {/* // add columns in data table */}
              <div className="bg-gray-100 p-4 border rounded space-y-8">
                <h1 className="  text-2xl font-bold text-primary">42% Off</h1>
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    {deal.data.attributes.usageCount.count}
                  </h1>
                  <p className="text-gray-500">people used this deal</p>
                </div>
                <div className="flex flex-col items-center">
                  <CouponBrandLogo
                    url={
                      deal.data.attributes.brand?.data.attributes.logo?.data
                        .attributes.url
                    }
                    name={`${deal.data.attributes.brand?.data?.attributes.name}-logo`}
                    className={"relative"}
                  />
                  <p className="text-gray-500">
                    Offered by{" "}
                    {deal.data.attributes.brand?.data.attributes.name}
                  </p>
                </div>
              </div>
              <Button.Primary
                className="animate-pulse w-full "
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                Use this {deal.data.attributes.type}
              </Button.Primary>
              <Button.Like
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFavourite(!isFavourite);
                }}
                isFavourite={isFavourite}
              >
                Save{isFavourite ? "d" : ""} for later
              </Button.Like>
              <CouponModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                item={deal.data}
              />
            </div>
          </div>

          <div className=" space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-full flex items-center">
                <CouponBrandLogo
                  url={
                    deal.data.attributes.brand.data.attributes.logo?.data
                      .attributes.url
                  }
                  name={`${deal.data.attributes.brand?.data?.attributes.name}-logo`}
                  className={"relative mr-4"}
                />

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Latest Money-Saving Deals for{" "}
                    {deal.data.attributes.brand.data.attributes.name}
                  </h3>
                  <h3 className="text-lg font-medium text-primary">
                    {deal.data.attributes.title}
                  </h3>
                </div>
              </div>
              <div>
                <div className="text-right space-x-2 mb-2">
                  {deal.data.attributes.categories.data.map((category) => (
                    <CategoryTag
                      category={category}
                      key={`catrgory_tag_${category.attributes.slug}`}
                    />
                  ))}
                </div>
                <Button.Share
                  dealUrl={href}
                  mediaUrl={deal.data.attributes.banner?.data.attributes.url}
                >
                  Share this deal
                </Button.Share>
              </div>
            </div>

            <div className="relative w-full h-96 bg-gray-100">
              <Image
                src={deal.data.attributes.banner?.data.attributes.url}
                alt={deal.data.attributes.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <ReactMarkdown
              skipHtml={false}
              rehypePlugins={[rehypeRaw]}
              className="prose-lg"
            >
              {deal.data.attributes.description}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetcher(`/api/deals/${id}?${dealsQuery}`);

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  let href = context.req.protocol + "://" + context.req.host + "/deals/" + id;

  return {
    props: { deal: res, href },
  };
}
