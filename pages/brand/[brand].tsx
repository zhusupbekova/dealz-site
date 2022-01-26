import qs from "qs";
import { useRouter } from "next/router";
import { Layout } from "../../components/common/Layout";
import useSWR from "swr";
import { CouponCard } from "../../components/common/CouponCard";
import { fetcher } from "../../utils/fetcher";
import { dealsQuery } from "../../utils/queries";
import { Loading } from "../../components/common/LoadingComponent";

const query = (brand: string) =>
  qs.stringify({
    pagination: { start: 0, limit: 9999 },
    ...qs.parse(dealsQuery),
    filters: {
      brand: {
        slug: {
          $eq: brand,
        },
      },
    },
  });

export default function BrandPage() {
  const router = useRouter();
  const { brand } = router.query;
  const { data: deals } = useSWR(
    `/api/deals?${query(brand as string)}`,
    fetcher()
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl">Biggest Deals for {brand}</h1>
        <div className="py-10 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {deals?.data.map((item, idx) => (
            <CouponCard item={item} key={`${idx}_coupon`} />
          )) ?? (
            <div className="sm:col-span-2 xl:col-span-3 flex w-full py-10 items-center justify-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
