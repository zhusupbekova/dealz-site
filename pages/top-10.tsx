import qs from "qs";
import subDays from "date-fns/subDays";

import { fetcher } from "../utils/fetcher";
import { dealsQuery } from "../utils/queries";

import { Layout } from "../components/common/Layout";
import { CouponCard } from "../components/common/CouponCard";

export default function BrandPage({ deals }) {
  return (
    <Layout
      head={"Top 10 "}
      metaDescription={`Best money saving deals and coupons of last 7 days`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl">Top 10 Deals</h1>
        <div className="py-10 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {deals?.map((item, idx) => (
            <CouponCard item={item} key={`${idx}_coupon`} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const fromDate = subDays(new Date(), 7).toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  const query = qs.stringify({
    pagination: { start: 0, limit: 10 },
    ...qs.parse(dealsQuery),
    sort: ["used_times:desc"],
    filters: {
      deal_usages: { createdAt: { $gte: fromDate } },
      $or: [
        { expiration_date: { $gte: today } },
        { expiration_date: { $null: true } },
      ],
    },
  });

  const deals = await fetcher()(`/api/deals?${query}`);

  return {
    revalidate: 60,
    props: { deals: deals?.data ?? null },
  };
}
