import { HeartIcon } from "@heroicons/react/solid";
import * as _ from "lodash";
import Link from "next/link";
import { IDeal } from "../../utils/schema";

export function CouponCard({ item }: { item: IDeal }) {
  console.log(_.pick(item, "attributes.brand.logo.data.attributes.url"));

  return (
    <Link href={`/${item.attributes.slug}`}>
      <div
        key={item.id}
        className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
      >
        <div className="relative aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-32">
          <img
            src={_.pick(item, "attributes.banner.data.attributes.url")}
            alt={item.attributes.title}
            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
          />
          <div className="flex">
            <img
              className=" absolute right-2  translate-y-2/4  h-12 w-12 rounded-full ring-4 ring-white sm:h-16 sm:w-16"
              src={_.pick(
                item,
                "attributes.brand.data.attributes.logo.data.attributes.url"
              )}
              alt=""
            />
          </div>
        </div>
        <div className="p-4 space-x-2 flex border-t">
          {item.attributes.categories.data.map((category) => (
            <span
              className="border rounded-sm px-2 py-1 text-xs tracking-wide text-gray-400"
              key={category.id}
            >
              {category.attributes.title}
            </span>
          ))}
        </div>
        <div className="flex-1 p-4 space-y-2 flex flex-col border-t">
          <h3 className="text-lg font-medium text-gray-900">
            <a href={item.attributes.title}>
              <span aria-hidden="true" className="absolute inset-0" />
              {item.attributes.title}
            </a>
          </h3>
          <p className="text-sm text-gray-500">
            {item.attributes.brand?.data.attributes.slogan}
          </p>
          <div className="flex-1 flex flex-col justify-end">
            <p className="text-sm italic text-gray-500">
              {item.attributes.used_times ?? "0"} used
            </p>
          </div>
        </div>
        <div className="flex items-center p-2">
          <button>
            <HeartIcon
              className="flex-shrink-0 h-8 w-8 ml-2 text-red-500"
              aria-hidden="true"
            />
          </button>
          <button className="flex-1 ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover">
            Use this {item.attributes.type}
          </button>
        </div>
      </div>
    </Link>
  );
}