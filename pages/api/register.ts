import nc from "next-connect";

import { sessionMiddleware } from "../../middlewares/session";
import { poster } from "../../utils/fetcher";

export default nc()
  .use(sessionMiddleware)
  .post(async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
      const user = await poster(`/api/auth/local/register`, {
        email,
        username: email,
        password,
      })
        .then((res) => {
          return res;
        })
        .then((data) => ({
          ...data.user,
          strapiToken: data.jwt,
        }));

      if (!user.confirmed) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not confirmed",
        });
      }

      req.session.set("user", user);
      await req.session.save();
      return res.status(200).json({ statusCode: 200, message: "ok" });
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error;
      if (fetchResponse) {
        return res
          .status(fetchResponse?.status || 500)
          .json(error.response?.data);
      }
      res.status(500).json(error);
    }
  });
