import nc from "next-connect";
import { sessionMiddleware } from "../../middlewares/session";
import { poster } from "../../utils/fetcher";

export default nc()
  .use(sessionMiddleware)
  .post(async (req: any, res: any) => {
    try {
      await req.session.destroy();
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
