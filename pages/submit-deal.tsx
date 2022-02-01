import {
  CheckCircleIcon,
  ReceiptTaxIcon,
  TagIcon,
  TicketIcon,
  XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import useSWR, { SWRResponse } from "swr";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { Layout } from "../components/common/Layout";
import { LoadingInline } from "../components/common/LoadingComponent";
import { fetcher, poster } from "../utils/fetcher";
import { IDealUsages } from "../utils/schema";
import { useState } from "react";
import { classNames } from "../utils/style";
import { validateEmail } from "../utils/validate";

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
    title: "Commission",
    icon: <ReceiptTaxIcon className="h-10 w-10 text-primary mr-6" />,
    text: "You must provide us with an affiliate commission per sale.",
  },
];
export default function SubmitDeal() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { data, error }: SWRResponse<IDealUsages, Error> = useSWR(
    `/api/deal-usages`,
    fetcher()
  );

  return (
    <Layout head="Submit deal" metaDescription="Submit deals to get featured">
      <div className="flex flex-col md:grid grid-cols-2 max-w-6xl mx-auto px-4 sm:px-6 gap-x-10">
        <div className="flex relative aspect-1 col-span-1">
          <Image src="/money-saving-1.jpg" layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-col space-y-6">
          <p className="text-gray-500">
            Over{" "}
            <span className="font-semibold text-primary">
              {data?.meta.pagination.total ?? <LoadingInline size={4} />}
            </span>{" "}
            deals used by our customers
          </p>
          <h1 className="font-bold text-2xl sm:text-4xl">
            Submit your deal today
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl">
            Get listed on Internet Marketing Deals and get in front of thousands
            of potential new customers.
          </p>
          <h3>Does your deal qualify?</h3>

          {pitch.map((item) => (
            <div className="flex items-center" key={`${item.title}`}>
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

      <div className="flex flex-col items-center space-y-4 my-8">
        <h1 className="text-2xl">Think you qualify?</h1>
        <p className="text-gray-500 text=lg">
          Enter your details below and we will get in touch
        </p>
        <SubmitDealForm
          showSuccessAlert={showSuccessAlert}
          setShowSuccessAlert={setShowSuccessAlert}
        />
        <div
          className={classNames(
            showSuccessAlert ? "" : "hidden",
            "rounded-md bg-green-50 p-4"
          )}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Successfully uploaded
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setShowSuccessAlert(false)}
                  className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface IFSubmitFormValues {
  email: string;
  name: string;
  company_name: string;
  deal_description: string;
}

function SubmitDealForm({ showSuccessAlert, setShowSuccessAlert }) {
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        company_name: "",
        deal_description: "",
      }}
      onSubmit={async (
        values: IFSubmitFormValues,
        { setSubmitting, resetForm }: FormikHelpers<IFSubmitFormValues>
      ) => {
        await poster("/api/submitteds", {
          data: {
            email: values.email,
            name: values.name,
            company_name: values.company_name,
            deal_description: values.deal_description,
          },
        });
        setShowSuccessAlert(true);
        setSubmitting(false);
        resetForm();
      }}
    >
      <Form className="py-6 max-w-xl w-full space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm mb-2 font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <Field
              type="text"
              id="name"
              name="name"
              autoComplete="cc-name"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="company_name"
            className="block text-sm mb-2 font-medium text-gray-700"
          >
            Company Name
          </label>
          <div className="mt-1">
            <Field
              type="text"
              id="company_name"
              name="company_name"
              autoComplete="off"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm mb-2 font-medium text-gray-700"
          >
            Email address
          </label>
          <div>
            <Field
              validate={validateEmail}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="deal_description"
            className="block text-sm mb-2 font-medium text-gray-700"
          >
            Deal description
          </label>
          <div className="mt-1">
            <Field
              as="textarea"
              id="deal_description"
              name="deal_description"
              rows={3}
              className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
              defaultValue={""}
            />
          </div>
        </div>

        <button className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
