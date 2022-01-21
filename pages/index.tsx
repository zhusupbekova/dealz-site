import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import useSWR, { SWRResponse } from "swr";
import { fetcher } from "../utils/fetcher";
import qs from "qs";
import ReactMarkdown from "react-markdown";
import * as _ from "lodash";
import axios from "axios";
import { supabase } from "../utils/supabaseClient";
import { Layout } from "../components/common/Layout";
import { brand } from "../config";
import { Hero } from "../components/layoutComponents/Hero";

import { PlusSmIcon } from "@heroicons/react/solid";
import { SearchSort } from "../components/homePageComponents/SearchSort";
import { CouponCard } from "../components/common/CouponCard";
import { classNames } from "../utils/style";
import { ICategories, IDeals } from "../utils/schema";
import { Filter, FilterMobile } from "../components/homePageComponents/Filter";
import { Loading } from "../components/common/LoadingComponent";
import { dealsQuery } from "../utils/queries";
import { useRouter } from "next/router";
import { Button } from "../components/common/Button";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <SearchSort />
      <Gallery />
      <Button.ScrollToTop />
    </Layout>
  );
}

function isArray(item) {
  return Array.isArray(item);
}

function Gallery() {
  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState<Set<string>>(
    new Set()
  );
  const router = useRouter();
  const {
    expired,
    expiringSoon,
    featured,
    categories,
    dealType,
    search,
    sort,
  } = router.query;

  const featuredFilterQuery = qs.stringify(
    {
      filters: {
        featured: {
          $eq: featured,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const categoryFilterQuery = qs.stringify(
    {
      filters: {
        categories: {
          slug: {
            $in: categories
              ? isArray(categories)
                ? categories
                : (categories as string).split(",")
              : [],
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const dealLifetimeFilterQuery = qs.stringify(
    {
      filters: {
        deal_lifetime: {
          slug: {
            $in: dealType
              ? isArray(dealType)
                ? dealType
                : (dealType as string).split(",")
              : [],
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const currentDate = new Date().toISOString().split("T")[0];

  const expiredDealFilterQuery = qs.stringify(
    {
      filters: {
        expiration_date: {
          $lt: currentDate,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const expiringSoonFilterQuery = qs.stringify({
    filters: {
      $and: [
        { expiration_date: { $gte: currentDate } },
        {
          expiration_date: {
            $lte: new Date(new Date().setDate(new Date().getDate() + 7))
              .toISOString()
              .split("T")[0],
          },
        },
      ],
    },
  });

  const searchFilterQuery = qs.stringify(
    {
      filters: {
        $or: [
          {
            title: {
              $containsi: search,
            },
          },
          {
            brand: {
              name: { $containsi: search },
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const sortFilterQuery = qs.stringify(
    {
      sort: [sort],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data: deals, error }: SWRResponse<IDeals, Error> = useSWR(
    `/api/deals?${dealsQuery}${categories ? `&${categoryFilterQuery}` : ""}${
      dealType ? `&${dealLifetimeFilterQuery}` : ""
    }${search ? `&${searchFilterQuery}` : ""}${
      sort ? `&${sortFilterQuery}` : ""
    }${featured ? `&${featuredFilterQuery}` : ""}${
      expired ? `&${expiredDealFilterQuery}` : ""
    }${expiringSoon ? `&${expiringSoonFilterQuery}` : ""}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto">
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <div>
              <Filter
                categoriesFilter={categoriesFilter}
                setCategoriesFilter={setCategoriesFilter}
              />
            </div>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Deals
              </h2>

              {deals ? (
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                  {deals.data.map((item, idx) => (
                    <CouponCard item={item} key={idx} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between w-full h-full">
                  <Loading />
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
