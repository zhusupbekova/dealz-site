import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import Link from "next/link";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { Button } from "../components/common/Button";
import { Divider } from "../components/common/Divider";
import { Layout } from "../components/layoutComponents/Layout";
import { validateEmail } from "../utils/validate";
import { useRouter } from "next/router";

interface ISignInValues {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  return (
    <Layout
      head="Log in"
      metaDescription="Log in to your accaunt to check saved and used deals and coupons"
    >
      <div className="space-y-2 mx-auto max-w-lg">
        <div>
          <GoogleLoginButton
            style={{ background: "#eaeaea", boxShadow: "none" }}
          />
        </div>

        <div>
          <FacebookLoginButton
            style={{ background: "#1776f2", boxShadow: "none" }}
          />
        </div>

        <Divider>or</Divider>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (
            values: ISignInValues,
            { setSubmitting, resetForm }: FormikHelpers<ISignInValues>
          ) => {
            await fetch(`/api/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            }).then((res) =>
              res.status === 200 ? router.push("/account") : null
            );

            setSubmitting(false);
            resetForm();
          }}
        >
          <Form className="flex flex-col space-y-2">
            <div>
              <label
                htmlFor="email"
                className="hidden text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>

                <Field
                  validate={validateEmail}
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary focus:border-primary block w-full pl-10 h-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="hidden text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>

                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="focus:ring-primary focus:primary block w-full pl-10 h-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="*******"
                />
              </div>
            </div>

            <Button.Primary type="submit">Login now</Button.Primary>
          </Form>
        </Formik>

        <Link href="/register">
          <a className="text-center block text-gray-400 underline">
            Don't have an account? Signup here.
          </a>
        </Link>
      </div>
    </Layout>
  );
}
