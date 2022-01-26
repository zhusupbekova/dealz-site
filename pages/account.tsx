import { useState } from "react";
import useSWR from "swr";
import { Button } from "../components/common/Button";
import { Layout } from "../components/common/Layout";
import { withSession } from "../middlewares/session";
import { fetcher } from "../utils/fetcher";
import { classNames } from "../utils/style";

const tabs = [{ name: "Saved deals" }, { name: "Used deals" }];

export default function AccountPage({ user }) {
  const [tab, setTab] = useState(0);
  const { data, error } = useSWR(
    user ? "/api/c/deals/used-deals" : null,
    fetcher(user)
  );
  console.log(data);
  return (
    <Layout user={user}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:space-x-4">
        <Tabs onChange={setTab} current={tab} />
        <div className="flex-1">
          <h3 className="font-semibold text-2xl">{tabs[tab].name}</h3>
        </div>
      </div>
    </Layout>
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
  const user = req.session.get("user");
  if (user) {
    return {
      props: {
        user,
      },
    };
  }
  // return {
  //   redirect: {
  //     permanent: false,
  //     destination: "/",
  //   },
  // };
});
