import { Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";
import { classNames } from "../../utils/style";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Latest", href: "#", current: false },
];

export function SearchSort() {
  return (
    <div className="items-center justify-between border-b border-gray-200 pt-24 pb-4 grid grid-cols-1 gap-8 lg:grid-cols-6 xl:grid-cols-8">
      <button className="inline-flex justify-between items-center h-full md:ml-0 border rounded px-6 py-2 lg:col-span-2 xl:col-span-2 text-white bg-primary">
        <p className="text-left text-lg font-semibold leading-tight">
          Join 3248 others <br /> getting deals alert
        </p>{" "}
        <BellIcon className="h-10 w-10" />
      </button>

      <div className="flex h-full lg:col-span-3 xl:col-span-5">
        <form
          className="w-full h-full flex md:ml-0 border rounded-sm px-4 py-2"
          action="#"
          method="GET"
        >
          <label htmlFor="desktop-search-field" className="sr-only">
            Search deals
          </label>
          <div className="relative w-full h-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <SearchIcon
                className="flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              />
            </div>
            <input
              name="mobile-search-field"
              id="mobile-search-field"
              className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
              placeholder="Search"
              type="search"
            />
            {/* <input
              name="desktop-search-field"
              id="desktop-search-field"
              className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
              placeholder="Search deals"
              type="search"
            /> */}
          </div>
        </form>
      </div>

      <Menu as="div" className="relative inline-block text-left ml-8">
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
              {sortOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <a
                      href={option.href}
                      className={classNames(
                        option.current
                          ? "font-medium text-gray-900"
                          : "text-gray-500",
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {option.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
