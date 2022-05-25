//route => /api/user

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

const helper = require("../db");
let db = null;

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  if (req.session.user) {
    const { _id } = req.session.user;
    let user = null;
    console.log('received request /api/user');
    if(_id) {
      if (!db) db = await helper.connectToDatabase();
      const collection = await db.collection('users');
      user = await collection.findOne({ _id: helper.getObjectId(_id) });
    }
    if(user) {
      delete user.password;
      res.json({
        ...user,
        isLoggedIn: true,
      });
    } else {
      res.json({
        isLoggedIn: false
      });
    }
  } else {
    res.json({
      isLoggedIn: false
    });
  }
}