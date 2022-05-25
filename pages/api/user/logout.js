//route => /api/user/logout

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req, res, session) {
  req.session.destroy();
  res.send({ ok: true });
}