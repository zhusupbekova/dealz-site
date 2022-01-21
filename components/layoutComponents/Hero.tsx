import { CurrencyDollarIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { brand } from "../../config";

export function Hero() {
  return (
    <div className="text-center">
      <h1
        className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl mb-6"
        dangerouslySetInnerHTML={{ __html: brand.slogan }}
      />

      <div className="mt-5  mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow-inner hover:shadow border w-1/4 bg-gray-50 hover:bg-white transition-shadow">
          <a
            href="#"
            className="w-full flex items-center justify-center pr-8 md:pr-10 pl-6 py-3 border border-transparent text-base font-medium  md:py-4 md:text-lg "
          >
            <CurrencyDollarIcon
              className="flex-shrink-0 h-10 w-10 text-primary mr-2"
              aria-hidden="true"
            />
            Deal of the month
          </a>
        </div>

        <div className="mt-3 sm:mt-0 sm:ml-3 rounded-md shadow-inner hover:shadow border w-1/4 bg-gray-50 hover:bg-white transition-shadow">
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
  );
}
