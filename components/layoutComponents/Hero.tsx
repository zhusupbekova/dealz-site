import Image from "next/image";
import { CurrencyDollarIcon, TrendingUpIcon } from "@heroicons/react/outline";

import { brand } from "../../config";
import { IDeal } from "../../utils/schema";

export function Hero({ dealOfTheMonth }: { dealOfTheMonth?: IDeal }) {
  return (
    <div className="text-center">
      <h1
        className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-6"
        dangerouslySetInnerHTML={{ __html: brand.slogan }}
      />

      <div className="mt-5  mx-auto sm:flex sm:justify-center md:mt-8 space-x-4">
        {dealOfTheMonth ? (
          <div className="group relative pr-8 w-1/4 cursor-pointer">
            <div className="rounded-md shadow-inner group-hover:shadow border w-full bg-gray-50 group-hover:bg-white transition-shadow">
              <a
                href="#"
                className="relative w-full flex items-center justify-center pr-8 md:pr-10 pl-6 py-3 border border-transparent text-base font-medium  md:py-4 md:text-lg "
              >
                <CurrencyDollarIcon
                  className="flex-shrink-0 h-10 w-10 text-primary mr-2"
                  aria-hidden="true"
                />
                Deal of the month
              </a>
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

        <div className="pr-12 w-1/4">
          <div className="mt-3 sm:mt-0 rounded-md shadow-inner hover:shadow border w-full bg-gray-50 hover:bg-white transition-shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center pr-8 md:pr-10 pl-6 py-3 md:py-4 border border-transparent text-base font-medium  md:text-lg"
            >
              <TrendingUpIcon
                className="flex-shrink-0 h-10 w-10 text-primary  mr-2"
                aria-hidden="true"
              />
              Trending deal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
