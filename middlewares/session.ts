import {
  withIronSession,
  ironSession,
  SessionOptions,
} from "next-iron-session";

const sessionConfig: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD,
  cookieName: "next-session",
  cookieOptions: {
    path: "/",
    secure: false,
  },
};

export const sessionMiddleware = ironSession(sessionConfig);

export function withSession(handler) {
  return withIronSession(handler, sessionConfig);
}
