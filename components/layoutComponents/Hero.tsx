import { CurrencyDollarIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { brand } from "../../config";

export function Hero() {
  return (
    <div className="text-center">
      <h1
        className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-6"
        dangerouslySetInnerHTML={{ __html: brand.slogan }}
      ></h1>
      <div className="mt-5  mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow border">
          <a
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
          >
            <CurrencyDollarIcon
              className="flex-shrink-0 h-6 w-6 text-primary mr-2"
              aria-hidden="true"
            />
            Deal of the month
          </a>
        </div>
        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 border">
          <a
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
          >
            <TrendingUpIcon
              className="flex-shrink-0 h-6 w-6 text-primary  mr-2"
              aria-hidden="true"
            />
            Trending deal
          </a>
        </div>
      </div>
    </div>
  );
}
