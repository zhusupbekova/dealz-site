import Image from "next/image";
import { CurrencyDollarIcon, TrendingUpIcon } from "@heroicons/react/outline";

import { brand } from "../../config";
import { IDeal } from "../../utils/schema";
import Link from "next/link";

export function Hero({
  dealOfTheMonth,
  trendingDeal,
}: {
  dealOfTheMonth?: IDeal;
  trendingDeal?: IDeal;
}) {
  return (
    <div className="text-center">
      <h1
        className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-6"
        dangerouslySetInnerHTML={{ __html: brand.slogan }}
      />

      <div className="mt-5 sm:mx-auto sm:flex sm:justify-center md:mt-8 sm:space-x-4">
        {dealOfTheMonth ? (
          <div className="group relative sm:pr-8 sm:w-1/2 xl:w-1/4 cursor-pointer">
            <div className="rounded-md shadow-inner group-hover:shadow border w-full bg-gray-50 group-hover:bg-white transition-shadow">
              <Link href={`/deals/${dealOfTheMonth?.id}`} passHref>
                <a className="relative w-full flex items-center justify-center pr-8 md:pr-10 pl-6 py-3 border border-transparent text-base font-medium  md:py-4 md:text-lg ">
                  <CurrencyDollarIcon
                    className="flex-shrink-0 h-10 w-10 text-primary mr-2"
                    aria-hidden="true"
                  />
                  Deal of the month
                </a>
              </Link>
            </div>

            <div className="absolute h-16 w-16 rounded-full overflow-hidden right-0 top-1/2 transform -translate-y-1/2 group-hover:shadow-lg">
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  dealOfTheMonth?.attributes.brand.data.attributes.logo.data
                    .attributes.url
                }
              />
            </div>
          </div>
        ) : null}

        {trendingDeal ? (
          <div className="group relative mt-6 sm:mt-0 sm:pr-8 sm:w-1/2 xl:w-1/4 cursor-pointer">
            <div className="rounded-md shadow-inner group-hover:shadow border w-full bg-gray-50 group-hover:bg-white transition-shadow">
              <Link href={`/deals/${trendingDeal?.id}`} passHref>
                <a className="relative w-full flex items-center justify-center pr-8 md:pr-10 pl-6 py-3 border border-transparent text-base font-medium  md:py-4 md:text-lg ">
                  <CurrencyDollarIcon
                    className="flex-shrink-0 h-10 w-10 text-primary mr-2"
                    aria-hidden="true"
                  />
                  Trending Deal
                </a>
              </Link>
            </div>

            <div className="absolute h-16 w-16 rounded-full overflow-hidden right-0 top-1/2 transform -translate-y-1/2 group-hover:shadow-lg">
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  trendingDeal?.attributes.brand.data.attributes.logo.data
                    .attributes.url
                }
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
