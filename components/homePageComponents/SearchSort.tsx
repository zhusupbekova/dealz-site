import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ChevronDownIcon,
  PlusSmIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import * as _ from "lodash";

import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { classNames } from "../../utils/style";
import { FilterMobile } from "./Filter";

const sortOptions = [
  { name: "Most Popular", current: false },
  { name: "Latest", current: false },
];

export function SearchSort() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState("");
  const router = useRouter();
  const { categories, search, sort } = router.query;

  function onSort(sort: string) {
    router.push(
      {
        query: {
          categories,
          search,
          sort: sort,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <div className="items-center justify-between border-b border-gray-200 pt-24 pb-4 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      <button className="inline-flex justify-between items-center h-full md:ml-0 border rounded px-6 py-2 col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 text-white bg-primary">
        <p className="text-left text-lg font-semibold leading-tight">
          Join 3248 others <br /> getting deals alert
        </p>{" "}
        <BellIcon className="h-10 w-10" />
      </button>

      <div className="flex h-full col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-5">
        <div className="relative w-full h-full flex items-center md:ml-0 border rounded-sm px-4 py-2 text-gray-400 focus-within:text-gray-600">
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center"> */}
          <SearchIcon
            className="flex-shrink-0 h-5 w-5 m-l-3"
            aria-hidden="true"
          />
          <input
            name="mobile-search-field"
            id="mobile-search-field"
            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
            placeholder="Search"
            type="search"
            onChange={_.debounce((e) =>
              router.push(
                {
                  query: {
                    categories,
                    search: e.target.value,
                  },
                },
                undefined,
                { shallow: true }
              )
            )}
          />
        </div>
      </div>
      <FilterMobile
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
      />

      <button
        type="button"
        className="inline-flex items-center col-span-1 md:col-span-2 lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="text-base font-medium text-gray-700">Filters</span>
        <PlusSmIcon
          className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </button>
      {/* </aside> */}

      <Menu
        as="div"
        className="relative inline-block text-right sm:text-left col-span-1 md:col-span-2 lg:col-span-1"
      >
        <div>
          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort
            <ChevronDownIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item key="most-popular">
                {({ active }) => (
                  <button
                    onClick={() => onSort("deal_usages.length:desc")}
                    className={classNames(
                      currentSortOption === "most-popular"
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Most popular
                  </button>
                )}
              </Menu.Item>
              <Menu.Item key="latest">
                {({ active }) => (
                  <button
                    onClick={() => onSort("createdAt:desc")}
                    className={classNames(
                      currentSortOption === "latest"
                        ? "font-medium text-gray-900"
                        : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Latest
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
