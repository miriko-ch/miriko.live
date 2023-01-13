//route => /api/questions/item

const helper = require("../db");
let db = null;

export default async function questions_item(req, res) {
  if (!db) {
    db = await helper.connectToDatabase();
  }
  const collection = await db.collection('questions');
  switch (req.method) {
    case 'GET':
      const { id } = req.query;
      await collection.findOne({
          _id: helper.getObjectId(id)
        })
        .then((questionObj) => {
          if(questionObj) res.status(200).json(questionObj);
          else res.status(404).end();
        })
      break;

    case 'PUT':
      const { owner, content, recaptcha } = req.body;
      if(!owner || !content || !recaptcha) {
        res.status(400).json({ result: 'Missing Parameter(s)' });
        return;
      }
      const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;
      const VERIFY_URL = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha}`;
      try {
        const recaptchaRes = await fetch(VERIFY_URL, { method: "POST" });
        const recaptchaJson = await recaptchaRes.json();
        console.log(JSON.stringify(recaptchaJson));
        if(recaptchaJson.success && recaptchaJson.score >= 0.5) {
          const now = new Date();
          await collection.insertOne({
            owner: helper.getObjectId(owner),
            created_time: now,
            updated_time: now,
            deleted_time: null,
            choose: false,
            content: content,
            answer: ''
          }).then(
            result => { 
              const body = {
                result: 'success',
                id: result.insertedId
              }
              res.status(201).json(body);
              console.log(JSON.stringify(body));
            },
            error => res.status(500).json({
              result: error
            })
          );
        } else {
          console.log("1")
          res.status(400).json({ result: 'recaptcha_fail' });
        }
      } catch(e) {
        console.log("2")
        res.status(400).json({ result: e.error });
      }
  }
}