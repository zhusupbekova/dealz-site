import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as _ from "lodash";

import { IDeal, IDeals, IUserProps } from "../../utils/schema";
import { classNames } from "../../utils/style";
import { Button } from "./Button";
import { CategoryTag } from "./CategoryTag";
import { CouponModal } from "../couponCardComponents/CouponModal";
import { CouponBrandLogo } from "../couponCardComponents/CouponBrandLogo";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";

export function CouponCard({
  item,
  compact,
  user,
  mutate,
}: {
  item: IDeal;
  compact?: boolean;
  user: IUserProps;
  mutate: () => Promise<IDeals>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignInRequired, setShowSignInRequired] = useState(false);

  async function onLikeClick(e) {
    e.stopPropagation();

    if (user) {
      console.log(user);
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/c/deals/save?deal_id=${item.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.strapiToken}`,
            },
          }
        ).then();
        await mutate();
      } catch (err) {
        console.log(err);
      }
    } else {
      setShowSignInRequired(true);
    }
  }

  return (
    <Link href={`/deals/${item.id}`}>
      <div
        key={item.id}
        className="transition  hover:-translate-y-1 hover:scale-100  duration-200 relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
      >
        <div className="bg-white cursor-pointer">
          <div className="relative w-full h-48">
            <Image
              src={item.attributes.banner?.data?.attributes.url}
              alt={item.attributes.title}
              layout="fill"
              objectFit="cover"
            />
            <CouponBrandLogo
              className="absolute right-2 bottom-0 translate-y-2/4 cursor-pointer"
              url={
                item.attributes.brand?.data?.attributes.logo?.data?.attributes
                  .url
              }
              name={`${item.attributes.brand?.data?.attributes.name}-logo`}
            />
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-100 space-x-2 flex border-t">
          {item.attributes.categories.data.map((category) => (
            <CategoryTag
              category={category}
              key={`${category.id}-${category.attributes.title}`}
            />
          ))}
        </div>
        <div className="flex-1 p-4 space-y-2 flex flex-col border-t">
          <h3 className="text-lg font-medium text-gray-900 cursor-pointer">
            {item.attributes.title}
          </h3>
          <p className="text-sm text-gray-500">
            {item.attributes.brand?.data?.attributes.slogan}
          </p>
          {compact || (
            <div className="flex-1 flex flex-col justify-end">
              <p className="text-sm italic text-gray-500">
                {item.attributes.usageCount.count ?? "0"} used
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center bg-gray-100 p-2 bottom-0">
          {compact || (
            <Button.Like
              onClick={(e) => onLikeClick(e)}
              isFavourite={item.attributes.saved}
            />
          )}

          <Button.Deal
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Use this {item.attributes.type}
          </Button.Deal>
        </div>
        <CouponModal open={isModalOpen} setOpen={setIsModalOpen} item={item} />
        <div
          className={classNames(
            showSignInRequired ? "" : "hidden",
            "rounded-md bg-orange-50 p-4 absolute bottom-0"
          )}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon
                className="h-5 w-5 text-orange-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-800">
                You need to be signed in to save the deal
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSignInRequired(false);
                  }}
                  className="inline-flex bg-orange-50 rounded-md p-1.5 text-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-50 focus:ring-orange-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
