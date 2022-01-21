import React, { Fragment } from "react";
import useSWR, { SWRResponse } from "swr";
import qs from "qs";

import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { classNames } from "../../utils/style";
import { brand, navigation } from "../../config";
import { IFilterStats } from "../../utils/schema";
import { fetcher } from "../../utils/fetcher";
import { Loading } from "../common/LoadingComponent";
import { Button } from "../common/Button";
import Link from "next/link";

const query = qs.stringify(
  {
    populate: "*",
  },
  {
    encodeValuesOnly: true,
  }
);

export function Header() {
  const {
    data: filterData,
    error: filterError,
  }: SWRResponse<IFilterStats, Error> = useSWR(
    `/api/c/categories/stats`,
    fetcher
  );

  return (
    <Popover className="relative bg-white z-50">
      <div className="px-4 sm:px-6 w-full border-b-2 border-gray-100">
        <div className="flex justify-between max-w-6xl mx-auto  items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">{brand.name}</span>
              <img
                className="h-8 w-auto sm:h-10"
                src={brand.logo}
                alt={brand.name}
              />
            </a>
          </div>

          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {navigation.map((item) =>
              item.name.toLowerCase().includes("categories") ? (
                <Popover key={`header_item_${item.name}`}>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-primary"
                        )}
                      >
                        <span>Categories</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100 "
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="absolute z-10 bottom-0 transform px-2 w-full max-w-3xl sm:px-0 lg:ml-0 left-1/2 -translate-x-1/2 translate-y-full">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-2 gap-x-4 bg-white px-5 py-6 grid-cols-4">
                              {filterData ? (
                                filterData.categoryStats.map((item) => (
                                  <a
                                    key={`category_name_${item.title}`}
                                    href={`/categories/${item.slug}`}
                                    className="rounded-lg hover:bg-gray-50"
                                  >
                                    <div className="flex min-w-0 items-center">
                                      <p className="text-sm flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis font-medium text-gray-700">
                                        {item.title}
                                      </p>
                                      <p className="ml-1 text-sm text-gray-500">
                                        {item.dealsCount ?? null}
                                      </p>
                                    </div>
                                  </a>
                                ))
                              ) : (
                                <Loading />
                              )}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <a
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </a>
              )
            )}
          </Popover.Group>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link href="/login" passHref>
              <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </a>
            </Link>

            <Link href="/register" passHref>
              <a>
                <Button.Primary href={"#"} className="ml-8">
                  Sign up
                </Button.Primary>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute left-0 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-primary.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) =>
                    item.name.toLowerCase().includes("categories") ? (
                      <Popover key={`header_item_${item.name}`}>
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={classNames(
                                open ? "text-gray-500" : "text-gray-900",
                                "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-primary"
                              )}
                            >
                              <span>Categories</span>
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "text-gray-400" : "text-gray-500",
                                  "ml-2 h-5 w-5 group-hover:text-gray-500"
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute z-50 left-0 mt-3 transform px-2 w-screen">
                                <div className="rounded-lg shadow-lg z-50 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                  <div className="grid gap-2 gap-x-6 bg-white p-4 grid-cols-2">
                                    {filterData.categoryStats?.map((item) => (
                                      <a
                                        key={`category_name_${item.title}`}
                                        href={`/categories/${item.slug}`}
                                        className="flex items-start rounded-lg hover:bg-gray-50"
                                      >
                                        <div className="flex w-full min-w-0">
                                          <p className="text-base font-medium flex-1 text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                            {item.title}
                                          </p>

                                          <p className="ml-1 text-sm text-gray-500 shrink-0">
                                            {item.dealsCount}
                                          </p>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ) : (
                      <a
                        href={item.href}
                        key={item.href}
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <Link href="/register" passHref>
                  <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover">
                    Sign up
                  </a>
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <Link href="/login" passHref>
                    <a className="text-primary hover:text-primary">Sign in</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
