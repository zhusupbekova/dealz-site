import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import Link from "next/link";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { Button } from "../components/common/Button";
import { Divider } from "../components/common/Divider";
import { Layout } from "../components/common/Layout";
import { poster } from "../utils/fetcher";
import { withSession } from "../middlewares/session";

interface ISignInValues {
  email: string;
  password: string;
}

export default function RegisterPage({ user }) {
  console.log(user);
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  return (
    <Layout user={user}>
      <div className="space-y-2 mx-auto max-w-lg h-full">
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

        <p className="text-gray-400 text-sm px-2 pt-2">
          Signing up with social is super quick. Don’t worry, we’d never share
          any of your data or post anything on your behalf.
        </p>

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
              // credentials: "include",
            }).then((res) => console.log(res));
            console.log();
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

            <p className="text-sm text-gray-400 px-2 pb-4">
              By creating your account, you agree to our{" "}
              <a
                target="_blank"
                href="/terms-and-conditions"
                className="underline"
              >
                Terms and Conditions
              </a>{" "}
              &{" "}
              <a target="_blank" href="/privacy-policy" className="underline">
                Privacy Policy
              </a>{" "}
            </p>

            <Button.Primary type="submit">Sign up now</Button.Primary>
          </Form>
        </Formik>

        <Link href="/login">
          <a className="text-center block text-gray-400 underline">
            Already have an account? Login here.
          </a>
        </Link>
      </div>
    </Layout>
  );
}

// This is the recommended way for Next.js 9.3 or newer

export const getServerSideProps = withSession((context) => {
  const { req } = context;
  console.log(context);
  return {
    props: {
      user: req.session.get("user") || null,
    },
  };
});
