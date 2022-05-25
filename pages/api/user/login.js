//route => /api/user/login

import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "../../../lib/session";
import { SHA3 } from 'sha3';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

const helper = require("../db");
let db = null;

async function loginRoute(req, res) {
  if(req.method != 'POST') {
    res.end();
    return;
  }
  if (!db) {
    db = await helper.connectToDatabase();
  }
  const collection = await db.collection('users');
  const { username, password } = req.body;
  let query_user = await collection.findOne({ email: username });
  if(query_user == null) query_user = await collection.findOne({ name: username });
  if(query_user) {
    const hash = new SHA3(256);
    hash.update(password);  // second sha3 on server side
    if(query_user.password == hash.digest('hex')) {
      const user = {
        ...query_user,
        isLoggedIn: true
      };
      delete user.password;
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } else {
      res.status(401).json({ message: 'Password not match'});
    }
  } else {
    res.status(401).json({ message: 'Login failed' });
  }
}
