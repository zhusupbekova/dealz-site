import { Dispatch, Fragment, SetStateAction } from "react";
import useSWR, { SWRResponse } from "swr";
import { Transition, Dialog, Disclosure } from "@headlessui/react";
import qs from "qs";

import {
  XIcon,
  ChevronDownIcon,
  FireIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";

import { fetcher } from "../../utils/fetcher";
import { ICategories, IFilterStat, IFilterStats } from "../../utils/schema";
import { classNames } from "../../utils/style";
import { useRouter } from "next/router";

interface IFilterProps {
  mobileFiltersOpen?: boolean;
  setMobileFiltersOpen?: Dispatch<SetStateAction<boolean>>;
  categoriesFilter?: Set<string>;
  setCategoriesFilter?: Dispatch<SetStateAction<Set<string>>>;
}

const dealTypes = {
  id: "dealTypes",
  name: "Deal types",
  type: "checkbox",
  options: [
    { value: "annual", label: "Annual", checked: false },
    { value: "lifetime", label: "Lifetime", checked: false },
    { value: "freeTrial", label: "Free trial", checked: false },
    { value: "expired", label: "expired", checked: false },
  ],
};

const mostUsed = {
  id: "mostUsed",
  name: "Most used",
  type: "radio",
  options: [
    { value: "today", label: "Today", checked: false },
    { value: "week", label: "Week", checked: false },
    { value: "month", label: "Month", checked: false },
    { value: "all", label: "All", checked: false },
  ],
};

export function FilterMobile({
  mobileFiltersOpen,
  setMobileFiltersOpen,
}: IFilterProps) {
  const router = useRouter();
  const {
    featured,
    search,
    sort,
    categories,
    expiringSoon,
    expired,
    dealType,
  } = router.query;

  const { data, error } = useSWR(`/api/c/categories/stats`, fetcher);

  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className=" ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
            <div className="px-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              <div
                key="featured"
                className="flex items-center justify-between border-t border-gray-200 pt-4 pb-4 px-4 py-2"
              >
                <label
                  htmlFor={`featured`}
                  className="flex items-center text-base font-medium text-gray-900"
                >
                  Featured
                  <FireIcon
                    className="flex-shrink-0 h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                </label>
                <input
                  id="featured"
                  name={`featured[]`}
                  checked={featured === "true"}
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary float-right"
                  onChange={(e) =>
                    e.target.checked
                      ? router.push(
                          {
                            query: {
                              ...(expiringSoon ? { expiringSoon } : null),
                              ...(expired ? { expired } : null),
                              ...(dealType ? { dealType } : null),
                              ...(categories ? { categories } : null),
                              ...(search ? { search } : null),
                              ...(sort ? { sort } : null),
                              featured: true,
                            },
                          },
                          undefined,
                          { shallow: true }
                        )
                      : router.push(
                          {
                            query: {
                              ...(expiringSoon ? { expiringSoon } : null),
                              ...(expired ? { expired } : null),
                              ...(dealType ? { dealType } : null),

                              ...(categories ? { categories } : null),
                              ...(search ? { search } : null),
                              ...(sort ? { sort } : null),
                            },
                          },
                          undefined,
                          { shallow: true }
                        )
                  }
                />
              </div>
              <FilterSectionMobile
                name={"Categories"}
                type={"checkbox"}
                options={data?.categoryStats}
              />
              <FilterSectionMobile
                name={"Deal types"}
                type={"checkbox"}
                options={data?.dealLifetimeStats}
              />
              {/* <FilterSection section={mostUsed} /> */}
            </form>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

interface IFilterSectionProps {
  name: string;
  type: string;
  options: IFilterStat[];
}

function FilterSectionMobile({ name, type, options }: IFilterSectionProps) {
  const router = useRouter();
  const {
    featured,
    search,
    sort,
    categories,
    dealType,
    expired,
    expiringSoon,
  } = router.query;

  function onFilterItemClick(sectionName: string, slug: string) {
    if (sectionName === "Categories") {
      categories?.includes(slug)
        ? router.push(
            {
              query: {
                categories: (
                  (categories as string).split(",") as string[]
                ).filter((i) => i !== slug),
                ...(expiringSoon ? { expiringSoon } : null),
                ...(expired ? { expired } : null),
                ...(search ? { search } : null),
                ...(sort ? { sort } : null),
                ...(featured ? { featured } : null),
              },
            },
            undefined,
            { shallow: true }
          )
        : router.push(
            {
              query: {
                categories: [
                  ...(categories ? (categories as string).split(",") : []),
                  slug,
                ].join(","),
                ...(expiringSoon ? { expiringSoon } : null),
                ...(expired ? { expired } : null),
                ...(search ? { search } : null),
                ...(sort ? { sort } : null),
                ...(featured ? { featured } : null),
              },
            },
            undefined,
            { shallow: true }
          );
    }

    if (sectionName === "Deal types") {
      if (slug === "expiring-soon") {
        expiringSoon
          ? router.push(
              {
                query: {
                  ...(expired ? { expired } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            )
          : router.push(
              {
                query: {
                  expiringSoon: true,
                  ...(expired ? { expired } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            );
      } else if (slug === "expired") {
        expired
          ? router.push(
              {
                query: {
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            )
          : router.push(
              {
                query: {
                  expired: true,
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            );
      } else {
        dealType?.includes(slug)
          ? router.push(
              {
                query: {
                  dealType: (
                    (dealType as string).split(",") as string[]
                  ).filter((i) => i !== slug),
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(expired ? { expired } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            )
          : router.push(
              {
                query: {
                  dealType: [
                    ...(dealType ? (dealType as string).split(",") : []),
                    slug,
                  ].join(","),
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(expired ? { expired } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            );
      }
    }
  }
  return (
    <Disclosure
      as="div"
      key={`${name}-mobile`}
      className="border-t border-gray-200 pt-4 pb-4"
    >
      {({ open }) => (
        <fieldset>
          <legend className="w-full px-2">
            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
              <span className="text-base font-medium text-gray-900">
                {name}
              </span>
              <span className="ml-6 h-7 flex items-center">
                <ChevronDownIcon
                  className={classNames(
                    open ? "-rotate-180" : "rotate-0",
                    "h-5 w-5 transform"
                  )}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </legend>
          <Disclosure.Panel className="pt-4 pb-2 px-4">
            <div className="space-y-6">
              {options?.map((option, optionIdx) => (
                <div
                  key={`${option.slug}-mobile`}
                  className="flex items-center"
                >
                  <input
                    id={`filter-${name}-${optionIdx}`}
                    name={`${name}[]`}
                    type={type}
                    checked={
                      categories?.includes(option.slug) ||
                      dealType?.includes(option.slug) ||
                      (expired && option.slug === "expired") ||
                      (expiringSoon && option.slug === "expiring-soon")
                    }
                    className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                    onClick={() => onFilterItemClick(name, option.slug)}
                  />
                  <label
                    htmlFor={`filter-${name}-${optionIdx}-mobile`}
                    className="ml-3 text-base text-gray-500"
                  >
                    {option.title}
                    {categories.includes(option.slug) ||
                      dealType.includes(option.slug) ||
                      (expired && option.slug === "expired") ||
                      (expiringSoon && option.slug === "expiring-soon")}
                  </label>
                  <p className="flex-1 ml-1 font-semibold text-primary text-right">
                    {option.dealsCount}
                  </p>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </fieldset>
      )}
    </Disclosure>
  );
}

export function Filter({}: IFilterProps) {
  const router = useRouter();
  const {
    featured,
    search,
    sort,
    categories,
    dealType,
    expired,
    expiringSoon,
  } = router.query;
  const { data, error }: SWRResponse<IFilterStats, Error> = useSWR(
    `/api/c/categories/stats`,
    fetcher
  );

  return (
    <div className="sticky top-12 hidden lg:block bg-gray-100 p-4 border rounded">
      <form className="hidden lg:block">
        <div key="featured" className="flex items-center justify-between py-6">
          <label
            htmlFor={`featured`}
            className="flex items-center text-lg font-medium text-gray-900"
          >
            Featured
            <FireIcon
              className="flex-shrink-0 h-8 w-8 ml-2 text-primary"
              aria-hidden="true"
            />
          </label>
          <input
            id="featured"
            name={`featured[]`}
            checked={featured === "true"}
            type="checkbox"
            className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
            onChange={(e) =>
              e.target.checked
                ? router.push(
                    {
                      query: {
                        ...(expiringSoon ? { expiringSoon } : null),
                        ...(expired ? { expired } : null),
                        ...(dealType ? { dealType } : null),
                        ...(categories ? { categories } : null),
                        ...(search ? { search } : null),
                        ...(sort ? { sort } : null),
                        featured: true,
                      },
                    },
                    undefined,
                    { shallow: true }
                  )
                : router.push(
                    {
                      query: {
                        ...(expiringSoon ? { expiringSoon } : null),
                        ...(expired ? { expired } : null),
                        ...(dealType ? { dealType } : null),
                        ...(categories ? { categories } : null),
                        ...(search ? { search } : null),
                        ...(sort ? { sort } : null),
                      },
                    },
                    undefined,
                    { shallow: true }
                  )
            }
          />
        </div>
        <FilterSection
          name={"Categories"}
          type={"checkbox"}
          options={data?.categoryStats}
        />
        <FilterSection
          name={"Deal types"}
          type={"checkbox"}
          options={data?.lifetimeStats}
        />
        {/* <FilterSection section={mostUsed} /> */}
      </form>
    </div>
  );
}

function FilterSection({ name, type, options }: IFilterSectionProps) {
  const router = useRouter();
  const {
    featured,
    search,
    sort,
    categories,
    dealType,
    expired,
    expiringSoon,
  } = router.query;

  function onFilterItemClick(sectionName: string, slug: string) {
    if (sectionName === "Categories") {
      categories?.includes(slug)
        ? router.push(
            {
              query: {
                categories: (
                  (categories as string).split(",") as string[]
                ).filter((i) => i !== slug),
                ...(search ? { search } : null),
                ...(sort ? { sort } : null),
                ...(featured ? { featured } : null),
                ...(expiringSoon ? { expiringSoon } : null),
                ...(expired ? { expired } : null),
                ...(dealType ? { dealType } : null),
              },
            },
            undefined,
            { shallow: true }
          )
        : router.push(
            {
              query: {
                categories: [
                  ...(categories ? (categories as string).split(",") : []),
                  slug,
                ].join(","),
                ...(search ? { search } : null),
                ...(sort ? { sort } : null),
                ...(featured ? { featured } : null),
                ...(expiringSoon ? { expiringSoon } : null),
                ...(expired ? { expired } : null),
                ...(dealType ? { dealType } : null),
              },
            },
            undefined,
            { shallow: true }
          );
    }

    if (sectionName === "Deal types") {
      console.log(slug);
      if (slug === "expiring-soon") {
        expiringSoon
          ? router.push(
              {
                query: {
                  ...(expired ? { expired } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            )
          : router.push(
              {
                query: {
                  expiringSoon: true,
                  ...(expired ? { expired } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            );
      } else if (slug === "expired") {
        expired
          ? router.push(
              {
                query: {
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            )
          : router.push(
              {
                query: {
                  expired: true,
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(dealType ? { dealType } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            );
      } else {
        dealType?.includes(slug)
          ? router.push(
              {
                query: {
                  dealType: (
                    (dealType as string).split(",") as string[]
                  ).filter((i) => i !== slug),
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(expired ? { expired } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            )
          : router.push(
              {
                query: {
                  dealType: [
                    ...(dealType ? (dealType as string).split(",") : []),
                    slug,
                  ].join(","),
                  ...(expiringSoon ? { expiringSoon } : null),
                  ...(expired ? { expired } : null),
                  ...(categories ? { categories } : null),
                  ...(search ? { search } : null),
                  ...(sort ? { sort } : null),
                  ...(featured ? { featured } : null),
                },
              },
              undefined,
              { shallow: true }
            );
      }
    }
  }

  return (
    <Disclosure as="div" key={name} className="border-t border-gray-200 py-6">
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-3 w-full flex items-center justify-between text-base text-gray-400 hover:text-gray-500">
              <span className="font-medium text-lg text-gray-900">{name}</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {options?.map((option, optionIdx) => (
                <div key={option.slug} className="flex items-center">
                  <input
                    id={`filter-${name}-${optionIdx}`}
                    name={`${name}[]`}
                    type={type}
                    checked={
                      categories?.includes(option.slug) ||
                      dealType?.includes(option.slug) ||
                      (expired && option.slug === "expired") ||
                      (expiringSoon && option.slug === "expiring-soon")
                    }
                    onClick={() => onFilterItemClick(name, option.slug)}
                    className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`filter-${name}-${optionIdx}`}
                    className="ml-3 text-lg text-gray-600"
                  >
                    {option.title}
                  </label>
                  <p className="flex-1 ml-1 font-semibold text-primary text-right">
                    {option.dealsCount}
                  </p>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
