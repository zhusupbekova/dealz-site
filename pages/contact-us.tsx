import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/common/Layout";
import { withSession } from "../middlewares/session";
import { poster } from "../utils/fetcher";
import { classNames } from "../utils/style";
import { validateEmail } from "../utils/validate";

interface IFSubmitFormValues {
  name: string;
  email: string;
  brand_name: string;
  deal_description: string;
  comments: string;
}

export default function ContactUs({ user }) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const router = useRouter();
  const { brand = "", deal_description = "", deal_id = "" } = router.query;

  console.log(user);
  return (
    <Layout
      user={user}
      head="Contact us"
      metaDescription="Have questions about deals and coupons or have deal? Contact us."
    >
      <div className="flex flex-col items-center space-y-4 my-8 max-w-2xl mx-auto">
        <div className=" text-center">
          <h2 className=" text-2xl sm:text-4xl">Contact Us</h2>
          <p className="text-gray-500 sm:text-lg">
            If you'd like to get your deal listed then please visit{" "}
            <Link href={"/submit-deal"}>
              <a className="text-primary underline">this page </a>
            </Link>
            or if you have any questions please get in touch and we'll respond
            as soon as possible.
          </p>
        </div>
        <Formik
          initialValues={{
            email: user ? user.email : "",
            name: "",
            deal_description: deal_description,
            brand_name: brand,
            comments: "",
          }}
          onSubmit={async (
            values: IFSubmitFormValues,
            { setSubmitting, resetForm }: FormikHelpers<IFSubmitFormValues>
          ) => {
            try {
              await poster("/api/contact-requests", {
                data: {
                  name: values.name,
                  email: values.email,
                  deal_id: Number(deal_id),
                  deal_description: values.deal_description,
                  brand_name: values.brand_name,
                  comments: values.comments,
                },
              });
              setShowSuccessAlert(true);
              setSubmitting(false);
              resetForm();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Form className="py-6 max-w-xl w-full space-y-6">
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
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
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
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            {deal_id ? (
              <>
                <div>
                  <label
                    htmlFor="brand_name"
                    className="block text-sm mb-2 font-medium text-gray-700"
                  >
                    Brand name
                  </label>
                  <div className="mt-1">
                    <Field
                      type="text"
                      id="brand_name"
                      name="brand_name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
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
                      className="shadow-sm block w-full focus:ring-primary focus:border-primary sm:text-sm border border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </>
            ) : null}

            <div className="col-span-full">
              <label
                htmlFor="comments"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                {deal_id ? "Additional comments" : "How can we help?"}
              </label>
              <div className="mt-1">
                <Field
                  as="textarea"
                  id="comments"
                  name="comments"
                  rows={3}
                  className="shadow-sm block w-full focus:ring-primary focus:border-primary sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
            </div>

            <button className="w-full mt-6 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Submit
            </button>
          </Form>
        </Formik>
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
                Thank you! We will get in touch soon.
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

export const getServerSideProps = withSession((context) => {
  const { req, res } = context;
  const user = req.session.get("user") || null;
  return {
    props: {
      user,
    },
  };
});
