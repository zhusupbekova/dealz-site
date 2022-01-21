import React from "react";
import { footer, brand } from "../../config";

export function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className=" max-w-5xl mx-auto pt-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <img className="h-10" src={brand.logo} alt={brand.name} />
            <p
              className="text-gray-500 text-base max-w-sm"
              dangerouslySetInnerHTML={{ __html: brand.slogan }}
            ></p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Links
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {footer.links.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className=" md:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul role="list" className="mt-4 space-y-2">
              {footer.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className=" md:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Social
            </h3>
            <div className="flex  mt-4 flex-col space-y-2">
              {footer.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500 flex items-center space-x-2"
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                  <label className="text-sm">{item.name}</label>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 pl-4 md:pl-0 pb-12">
        <p className="text-base text-gray-400 xl:text-center">
          &copy; 2020 {brand.name}, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
