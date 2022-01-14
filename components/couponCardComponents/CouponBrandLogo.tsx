import Image from "next/image";
import { classNames } from "../../utils/style";

interface ICouponBrandLogo {
  url: string;
  name: string;
  className: string;
}

export function CouponBrandLogo({ url, name, className }: ICouponBrandLogo) {
  return (
    <div
      className={classNames(
        "overflow-hidden h-12 w-12 rounded-full ring-4 ring-white sm:h-16 sm:w-16 bg-gray-200",
        className ? className : ""
      )}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`}
        alt={`${name}-logo`}
        layout="fill"
      />
    </div>
  );
}
