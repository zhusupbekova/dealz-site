import { Transition, Dialog } from "@headlessui/react";
import * as _ from "lodash";
import Image from "next/image";
import { ExclamationIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/solid";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { brand } from "../../config";
import { IDeal } from "../../utils/schema";
import { CouponBrandLogo } from "./CouponBrandLogo";
import { poster } from "../../utils/fetcher";
import { mutate } from "swr";
import Link from "next/link";

interface ICouponnModal {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  item: IDeal;
}

export function CouponModal({ open, setOpen, item }: ICouponnModal) {
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const copyMeOnClipboard = () => {
    var copyText = document.getElementById("couponCode").innerText;

    navigator.clipboard.writeText(copyText);

    setCopyButtonText("Copied");
  };

  async function onUseDeal() {
    await poster("/api/deal-usages", {
      data: {
        deal: item.id,
      },
    });

    await mutate(`/deals/${item.id}`);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-40 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-8 md:px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="relative flex items-center justify-center h-12 ">
                  <Image
                    className="h-10 w-full sm:h-10"
                    src={brand.logo}
                    alt={brand.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="relative mt-3 mb-3 text-center sm:mt-14 sm:mb-10 mx-4 sm:mx-8">
                  <CouponBrandLogo
                    url={
                      item.attributes.brand?.data?.attributes.logo?.data
                        .attributes.url
                    }
                    name={item.attributes.brand.data?.attributes.name}
                    className={
                      "absolute z-40 translate-x-1/2 -translate-y-1/3 top-0 right-0 "
                    }
                  />
                  <Dialog.Title
                    as="h3"
                    className="relative text-gray-900 py-6 px-4 text-xl leading-6 font-medium border rounded-md"
                  >
                    {item.attributes.title}
                  </Dialog.Title>
                  <div className="flex flex-col items-center mt-6">
                    {item.attributes.type === "deal" ? (
                      <>
                        <CheckCircleIcon
                          className="h-10 w-10 text-green-600"
                          aria-hidden="true"
                        />
                        <p className="text-lg">Deal activated</p>
                        <p className="text-sm text-gray-500">
                          No coupon code required!
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="border border-dashed border-primary rounded-md divide-y divide-primary w-full flex items-center justify-between">
                          <div className="w-0 flex-1 flex items-center p-4">
                            <span
                              className="flex-1 w-0 truncate"
                              id="couponCode"
                            >
                              {item.attributes.coupon_code}
                            </span>
                          </div>
                          <div className="bg-primary hover:bg-primaryHover flex-shrink-0  py-4 px-6">
                            <button
                              onClick={() => copyMeOnClipboard()}
                              className="font-medium text-white"
                            >
                              {copyButtonText}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:px-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={item.attributes.affiliate_link}
                  onClick={() => onUseDeal()}
                  className="relative w-full inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white bg-primary transition duration-300 ease-out border-2 border-primary rounded-md shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Go to {item.attributes.brand.data?.attributes.name}
                  </span>
                  <span className="relative invisible">
                    Go to {item.attributes.brand.data?.attributes.name}
                  </span>
                </a>
                <div className="flex items-center justify-center mt-2 mb-14">
                  <ExclamationIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-gray-400">
                    Note you must use this link to claim this deal!
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 absolute bottom-0 left-0 p-6 flex items-center justify-between text-xs text-gray-400">
                <Link
                  href={`/contact-us?brand=${item.attributes.brand.data?.attributes.name}&deal_description=${item.attributes.title}&deal_id=${item.id}`}
                >
                  <a>{_.capitalize(item.attributes.type)} not working?</a>
                </Link>
                <Link href={"/pages/terms-and-conditions"}>
                  <a>Terms & Conditions</a>
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
