import Link from "next/link";
import { useState } from "react";
import useSWR, { SWRResponse } from "swr";
import { Button } from "../components/common/Button";
import { Layout } from "../components/common/Layout";
import { CouponBrandLogo } from "../components/couponCardComponents/CouponBrandLogo";
import { withSession } from "../middlewares/session";
import { fetcher } from "../utils/fetcher";
import { classNames } from "../utils/style";

interface IDealStat {
  id: number;
  name: string;
  title: string;
  url: string;
}
export interface IDealsStats {
  dealUsageByUser: IDealStat[];
  savedDealsByUser: IDealStat[];
}

const tabs = [
  { name: "Saved deals", key: "saved" },
  { name: "Used deals", key: "used" },
];

export default function AccountPage({ user }) {
  const [tab, setTab] = useState(0);
  const {
    data: dealsStats,
    error: usedDealsError,
  }: SWRResponse<IDealsStats, Error> = useSWR(
    user ? "/api/c/deals/deals-stats" : null,
    fetcher(user)
  );

  return (
    <Layout
      user={user}
      head="Account"
      metaDescription="Saved and used deals and coupons"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-4">
        <Tabs onChange={setTab} current={tab} />
        <div className="flex-1">
          <h3 className="font-semibold text-2xl">{tabs[tab].name}</h3>
          {tabs[tab].key === "used" ? (
            <div className="mt-6">
              {dealsStats?.["dealUsageByUser"].map((deal) => (
                <Link href={`/deals/${deal.id}`}>
                  <a>
                    <DealStatCard item={deal} />
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              {dealsStats?.["savedDealsByUser"].map((deal) => (
                <Link href={`/deals/${deal.id}`}>
                  <a>
                    <DealStatCard item={deal} />
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function DealStatCard({ item }: { item: IDealStat }) {
  return (
    <div className="grid grid-cols-6 gap-4 items-center h-24 px-6 rounded-md border shadow mb-4">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 mr-4 col-span-1">
        <CouponBrandLogo
          url={item.url}
          name={item.name}
          className="absolute cursor-pointer"
        />
      </div>
      <h3 className="col-span-2 text-lg text-gray-800">{item.name}</h3>
      <h2 className="col-span-3 text-primary text-lg font-semibold">
        {item.title}
      </h2>
    </div>
  );
}

function Tabs({ onChange, current }: any) {
  return (
    <div className="flex md:space-x-4 mb-12">
      <nav className="space-y-1 w-full md:w-72" aria-label="Sidebar">
        {tabs.map((item, idx) => (
          <button
            key={item.name}
            onClick={() => onChange(idx)}
            className={classNames(
              current === idx
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "flex items-center px-3 py-2 text-sm font-medium rounded-md w-full"
            )}
            aria-current={current === idx ? "page" : undefined}
          >
            <span className="truncate">{item.name}</span>
          </button>
        ))}

        <div className="pt-6">
          <Button.Primary className="w-full">Logout</Button.Primary>
        </div>
      </nav>

      <div className="h-full border-l border-gray-300"></div>
    </div>
  );
}

export const getServerSideProps = withSession((context) => {
  const { req, res } = context;
  const user = req.session.get("user") || null;
  if (user) {
    return {
      props: {
        user,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
});
