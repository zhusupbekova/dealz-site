import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as _ from "lodash";

import { IDeal } from "../../utils/schema";
import { classNames } from "../../utils/style";
import { Button } from "./Button";
import { CategoryTag } from "./CategoryTag";
import { CouponModal } from "../couponCardComponents/CouponModal";
import { CouponBrandLogo } from "../couponCardComponents/CouponBrandLogo";

export function CouponCard({ item }: { item: IDeal }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <CategoryTag category={category} />
          ))}
        </div>
        <div className="flex-1 p-4 space-y-2 flex flex-col border-t">
          <h3 className="text-lg font-medium text-gray-900 cursor-pointer">
            {item.attributes.title}
          </h3>
          <p className="text-sm text-gray-500">
            {item.attributes.brand?.data?.attributes.slogan}
          </p>
          <div className="flex-1 flex flex-col justify-end">
            <p className="text-sm italic text-gray-500">
              {item.usageCount.count ?? "0"} used
            </p>
          </div>
        </div>

        <div className="flex items-center bg-gray-100 p-2 bottom-0">
          <Button.Like
            onClick={(e) => {
              e.stopPropagation();
              setIsFavourite(!isFavourite);
            }}
            isFavourite={isFavourite}
          />
          <Button.Deal
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            {" "}
            Use this {item.attributes.type}
          </Button.Deal>
        </div>
        <CouponModal open={isModalOpen} setOpen={setIsModalOpen} item={item} />
      </div>
    </Link>
  );
}
