import {
  HandIcon,
  LockClosedIcon,
  ReceiptTaxIcon,
  TagIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { Layout } from "../components/common/Layout";

const pitch = [
  {
    title: "Deal",
    icon: <TagIcon className="h-10 w-10 text-primary mr-6" />,
    text: "You must provide a unique deal or discount for our users.",
  },
  {
    title: "Coupon",
    icon: <TicketIcon className="h-10 w-10 text-primary mr-6" />,
    text: "This deal must be obtained via unique coupon or affiliate link.",
  },
  {
    title: "Comission",
    icon: <ReceiptTaxIcon className="h-10 w-10 text-primary mr-6" />,
    text: "You must provide us with an affiliate commission per sale.",
  },
];
export default function SubmitDeal() {
  const usedDealsNumber = "todo";
  return (
    <Layout>
      <div className="flex flex-col md:grid grid-cols-2 max-w-6xl mx-auto px-4 sm:px-6 gap-x-10">
        <div className="flex relative aspect-1 col-span-1">
          <Image src="/money-saving-1.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-col space-y-6">
          <p className="text-gray-500">
            Over{" "}
            <span className="font-semibold text-primary">
              {usedDealsNumber}
            </span>{" "}
            deals used by our customers
          </p>
          <h1 className="font-bold text-4xl">Submit your deal today</h1>
          <p className="text-gray-500 text-xl">
            Get listed on Internet Marketing Deals and get in front of thousands
            of potential new customers.
          </p>
          <h3>Does your deal qualify?</h3>

          {pitch.map((item) => (
            <div className="flex items-center">
              {item.icon}
              <div>
                <h5 className="text-lg text-primary font-semibold">
                  {item.title}
                </h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <h1>Think you qualify?</h1>
        <p>Enter your details below and we will get in touch</p>
        <SubmitDealForm />
      </div>
    </Layout>
  );
}

const countryCodesOptions = [
  {
    key: "US",
    value: "+1",
  },
  {
    key: "KG",
    value: "+996",
  },
  {
    key: "TR",
    value: "+86",
  },
];

function SubmitDealForm() {
  return (
    <form className="mt-6 max-w-xl w-full space-y-4">
      <div className="">
        <label
          htmlFor="email-address"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email-address"
            name="email-address"
            autoComplete="email"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="name-on-card"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="name-on-card"
            name="name-on-card"
            autoComplete="cc-name"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-gray-700"
        >
          Phone number
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label htmlFor="country" className="sr-only">
              Country code
            </label>
            <select
              id="country"
              name="country"
              autoComplete="country"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full border-gray-300 py-0 pl-3 pr-7  bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              {countryCodesOptions.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            id="phone-number"
            name="phone-number"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="expiration-date"
          className="block text-sm font-medium text-gray-700"
        >
          Deal description
        </label>
        <div className="mt-1">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
            defaultValue={""}
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="expiration-date"
          className="block text-sm font-medium text-gray-700"
        >
          Comission structure{" "}
        </label>
        <div className="mt-1">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
            defaultValue={""}
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="expiration-date"
          className="block text-sm font-medium text-gray-700"
        >
          Additional comments
        </label>
        <div className="mt-1">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
            defaultValue={""}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>

      <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
        <LockClosedIcon
          className="w-5 h-5 text-gray-400 mr-1.5"
          aria-hidden="true"
        />
        Payment details stored in plain text
      </p>
    </form>
  );
}
