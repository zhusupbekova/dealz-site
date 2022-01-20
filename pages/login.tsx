import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import Link from "next/link";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { Button } from "../components/common/Button";
import { Divider } from "../components/common/Divider";
import { Layout } from "../components/common/Layout";

export default function RegisterPage() {
  return (
    <Layout>
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

        <form className="flex flex-col space-y-2">
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

              <input
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

              <input
                type="password"
                name="password"
                id="password"
                className="focus:ring-primary focus:border-primary block w-full pl-10 h-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="*******"
              />
            </div>
          </div>

          <Button.Primary>Login now</Button.Primary>
        </form>

        <Link href="/register">
          <a className="text-center block text-gray-400 underline">
            Don't have an account? Signup here.
          </a>
        </Link>
      </div>
    </Layout>
  );
}
