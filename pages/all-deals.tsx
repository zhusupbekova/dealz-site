import _ from "lodash";
import Link from "next/link";
import * as qs from "qs";
import React from "react";

import { Layout } from "../components/common/Layout";
import { fetcher } from "../utils/fetcher";

export default function AllDealsPage({ deals }) {
  return (
    <Layout containerClassName="bg-gray-100" className="sm:mt-4">
      <div className="mx-auto max-w-6xl md:space-x-4 flex flex-col-reverse md:flex-row">
        <div className="flex-1 rounded bg-white p-6 space-y-6">
          <div className="pb-4">
            <h1 className="text-3xl">All Deals</h1>
          </div>

          {_.sortBy(Object.keys(deals)).map((letter, idx) => (
            <React.Fragment key={`deals_for_${letter}`}>
              {idx > 0 && (
                <div className="inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              )}

              <div>
                <h3
                  className="text-xl mb-4 font-semibold"
                  id={`deals_${letter}`}
                >
                  Deals - {letter}
                </h3>

                <div className="grid gap-4 grid-cols-3">
                  {deals[letter].map((b) => (
                    <Link href={`/brand/${b.slug}`} passHref>
                      <a className="min-w-0 flex items-center space-x-2 cursor-pointer hover:text-gray-800 text-primary transition-colors">
                        <div className="h-6 w-6 rounded-full overflow-hidden">
                          <img
                            src={b.logo}
                            alt={`${b.name} logo`}
                            height="24"
                          />
                        </div>

                        <p className="text-sm flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {b.name}
                        </p>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="md:w-48 flex-1 md:flex-none space-y-2 rounded bg-white p-6">
          {_.sortBy(Object.keys(deals)).map((letter, idx) => (
            <React.Fragment>
              {idx > 0 && (
                <div className="inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              )}
              <a
                href={`#deals_${letter}`}
                className="flex items-center justify-between text-primary font-semibold"
              >
                <span>{letter}</span>
                <span>{deals[letter].length}</span>
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const query = qs.stringify({
    pagination: { start: 0, limit: 9999 },
    populate: { logo: { fields: ["url"] } },
    fields: ["name", "slug"],
  });

  let deals = await fetcher()(`/api/brands?${query}`).then((r) =>
    r.data.map((b) => ({
      name: b.attributes.name,
      slug: b.attributes.slug,
      logo: b.attributes.logo?.data.attributes.url || null,
    }))
  );

  deals = _(deals)
    .groupBy((deal) => deal.name[0].toUpperCase())
    .valueOf();

  return {
    revalidate: 60,
    props: {
      deals,
    },
  };
}
