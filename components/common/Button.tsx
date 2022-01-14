import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, HeartIcon, ShareIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { classNames } from "../../utils/style";

interface IButtonProps {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  href?: string;
  className?: string;
}

interface ILikeButtonProps {
  isFavourite: boolean;
}

const Primary: React.FC<IButtonProps> = ({
  children,
  onClick,
  href,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "h-12 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover",
        className ? className : ""
      )}
    >
      <a href={href}>{children}</a>
    </button>
  );
};

const Deal: React.FC<IButtonProps> = ({
  children,
  onClick,
  href,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "relative overflow-hidden transition-all group h-12 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover",
        className ? className : ""
      )}
    >
      <span className="absolute top-0 right-0 inline-block w-10 h-10 transition-all duration-500 ease-in-out bg-primaryHover rounded-md group-hover:-mr-4 group-hover:-mt-4">
        <span className="absolute top-0 right-0 w-10 h-10 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary rounded-md group-hover:mb-12 group-hover:translate-x-0"></span>
      <span className="relative w-full h-full text-white transition-colors duration-200 ease-in-out group-hover:text-white text-center">
        {children}{" "}
      </span>
    </button>
  );
};

const Like: React.FC<IButtonProps & ILikeButtonProps> = ({
  onClick,
  href,
  className,
  isFavourite,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      //   className={classNames(
      //     "h-12 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover",
      //     className ? className : ""
      //   )}
      className="flex items-center justify-center"
    >
      <HeartIcon
        className={classNames(
          isFavourite ? "text-red-500" : "text-gray-400",
          "flex-shrink-0 h-8 w-8 mx-2"
        )}
        aria-hidden="true"
      />
      <a href={href} className="text-gray-500">
        {children}
      </a>
    </button>
  );
};

const socialOptions = [];

const Share: React.FC<IButtonProps> = ({
  onClick,
  href,
  className,
  children,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left ml-8">
      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
        <ShareIcon
          className={classNames(
            // isFavourite ? "text-red-500" : "text-gray-400",
            "flex-shrink-0 h-6 w-6 mx-2 text-gray-500"
          )}
          aria-hidden="true"
        />
        Share this deal
      </Menu.Button>

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
            {socialOptions.map((option) => (
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
    // <button
    //   onClick={onClick}
    //   //   className={classNames(
    //   //     "h-12 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover",
    //   //     className ? className : ""
    //   //   )}
    //   className="flex items-center justify-center"
    // >
    //   <ShareIcon
    //     className={classNames(
    //       // isFavourite ? "text-red-500" : "text-gray-400",
    //       "flex-shrink-0 h-6 w-6 mx-2 text-gray-500"
    //     )}
    //     aria-hidden="true"
    //   />
    //   <a href={href} className="text-gray-400 whitespace-nowrap">
    //     {children}
    //   </a>
    // </button>
  );
};

export const Button = { Primary, Deal, Like, Share };
