import { Fragment, useState } from "react";
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

export default function Home() {
  return (
    <Layout>
      <Hero />
      <SearchSort />
      <Gallery />
    </Layout>
  );
}

function Gallery() {
  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data: deals, error }: SWRResponse<IDeals, Error> = useSWR(
    `/api/deals?${dealsQuery}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className="bg-white">
      <div>
        {/* <FilterMobile
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        /> */}

        <main className="mx-auto">
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            {/* <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-base font-medium text-gray-700">
                  Filters
                </span>
                <PlusSmIcon
                  className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>

            </aside> */}
            <Filter />

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Deals
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {deals ? (
                  deals.data.map((item, idx) => (
                    <CouponCard item={item} key={idx} />
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
