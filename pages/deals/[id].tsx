import qs from "qs";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import * as _ from "lodash";

import { Button } from "../../components/common/Button";
import { Layout } from "../../components/common/Layout";
import { Loading } from "../../components/common/LoadingComponent";
import { fetcher } from "../../utils/fetcher";
import { dealsQuery, userQuery } from "../../utils/queries";
import { IDeal, IUserProps } from "../../utils/schema";
import { CategoryTag } from "../../components/common/CategoryTag";
import { CouponModal } from "../../components/couponCardComponents/CouponModal";
import { CouponBrandLogo } from "../../components/couponCardComponents/CouponBrandLogo";
import { withSession } from "../../middlewares/session";
import { classNames } from "../../utils/style";
import { useRouter } from "next/router";

interface IDealDetailPageProps {
  deal: { data: IDeal };
  user: IUserProps;
  related: { data: IDeal[] };
}

export default function DealDetailPage({
  deal,
  user,
  related,
}: IDealDetailPageProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignInRequired, setShowSignInRequired] = useState(false);

  const href = typeof window !== "undefined" ? window.location.href : "";

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function onLikeClick(e) {
    e.stopPropagation();

    if (user) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/c/deals/save?deal_id=${deal?.data.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.strapiToken}`,
            },
          }
        );
        refreshData();
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowSignInRequired(true);
    }
  }

  return (
    <Layout
      compact
      containerClassName="bg-gray-100"
      className="w-full mx-auto"
      user={user}
    >
      {deal ? (
        <div className="max-w-6xl mx-auto flex px-4 sm:px-6">
          <div>
            <div className="sticky top-12 w-72 text-center space-y-4 flex flex-col mr-8">
              <div className="bg-white p-4 pt-8 rounded space-y-8">
                {deal.data.attributes.deal_description && (
                  <h1 className="text-2xl font-bold text-primary leading-none">
                    {deal.data.attributes.deal_description}
                  </h1>
                )}

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
                  onLikeClick(e);
                }}
                isFavourite={deal.data.attributes.saved}
              >
                Save{deal.data.attributes.saved ? "d" : ""} for later
              </Button.Like>
              <div
                className={classNames(
                  showSignInRequired ? "" : "hidden",
                  "rounded-md bg-orange-50 p-4 absolute bottom-0"
                )}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-orange-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-orange-800">
                      You need to be signed in to save the deal
                    </p>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowSignInRequired(false);
                        }}
                        className="inline-flex bg-orange-50 rounded-md p-1.5 text-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-50 focus:ring-orange-600"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <CouponModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                item={deal.data}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6 bg-white p-4 pt-8 rounded">
              <div className="space-x-1 text-sm flex">
                {[
                  { title: "Home", path: "/" },
                  { title: "All", path: "/" },
                  {
                    title: `${deal.data.attributes.categories?.data[0]?.attributes.title}`,
                    path: `/?categories=${deal.data.attributes.categories?.data[0]?.attributes.slug}`,
                  },
                ].map((a) => (
                  <p key={a.title}>
                    <Link href={a.path}>
                      <a className="text-primary">{a.title}</a>
                    </Link>
                    <span className="ml-1">/</span>
                  </p>
                ))}
                <span>{deal.data.attributes.brand?.data.attributes.name}</span>
              </div>
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
                    <h3 className="text-xl font-medium text-gray-900">
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
            </div>
            {deal.data.attributes.overview.length > 0 && (
              <div className=" rounded my-6 overflow-hidden flex space-y-6 bg-white">
                <h2
                  className="text-xl font-semibold text-white bg-primary transform rotate-180 p-8"
                  style={{
                    textOrientation: "mixed",
                    writingMode: "vertical-lr",
                  }}
                >
                  Deal overview
                </h2>

                <div className="grid grid-cols-2 gap-8 w-full text-left p-4">
                  {deal.data.attributes.overview.map((item) => (
                    <div className="flex">
                      <div>
                        <CheckCircleIcon className="h-8 w-8 mr-2 text-green-500 inline" />
                      </div>
                      <p>{item.overview_item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <ReactMarkdown
              skipHtml={false}
              rehypePlugins={[rehypeRaw]}
              className="prose-lg prose-p:text-gray-500 prose-li:text-gray-500 prose-a:text-primary prose-a:hover:underline bg-white p-4 pt-8 rounded"
            >
              {deal.data.attributes.description}
            </ReactMarkdown>
            {related.data?.length > 0 && (
              <div className="flex flex-col pt-24">
                <h1 className="text-3xl text-center font-semibold my-4">
                  You may also be interested in...
                </h1>
                {related.data?.map((recommendedDeal) => (
                  <Link href={`/deals/${recommendedDeal.id}`}>
                    <div className="flex justify-between items-center p-6 shadow rounded-md my-4 bg-white cursor-pointer">
                      <CouponBrandLogo
                        url={
                          recommendedDeal.attributes.brand?.data.attributes.logo
                            ?.data.attributes.url
                        }
                        name={`${recommendedDeal.attributes.brand?.data?.attributes.name}-logo`}
                        className={"relative"}
                      />
                      <div className="flex-1 ml-4">
                        <h3 className="text-xl font-medium text-gray-900">
                          {recommendedDeal.attributes.title}
                        </h3>
                        <p className="text-lg font-medium text-primary">
                          Offered by{" "}
                          {
                            recommendedDeal.attributes.brand.data.attributes
                              .name
                          }
                        </p>
                      </div>
                      <Button.Primary
                        className="animate-pulse"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsModalOpen(true);
                        }}
                      >
                        Use this {recommendedDeal.attributes.type}
                      </Button.Primary>
                      <CouponModal
                        open={isModalOpen}
                        setOpen={setIsModalOpen}
                        item={recommendedDeal}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}{" "}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export const getServerSideProps = withSession(async (context) => {
  const { params, req } = context;
  const user = req.session.get("user") || null;
  const res = await fetcher(user)(`/api/deals/${params.id}?${dealsQuery}`);

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  const related = await fetcher()(
    `/api/deals?${dealsQuery}&${qs.stringify({
      pagination: { start: 0, limit: 3 },
      sort: ["createdAt:desc", "featured:desc"],
      filters: {
        id: { $ne: res.data.id },
        expiration_date: {
          $gt: Date.now(),
        },
        categories: {
          id: {
            $in: res.data.attributes.categories.data.map((c) => c.id),
          },
        },
      },
    })}`
  );

  return {
    props: {
      deal: res,
      user,
      related,
    },
  };
});
