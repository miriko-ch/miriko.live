//route => /api/questions/

const helper = require("../db");
let db = null;

export default async function questions(req, res) {
  if (req.method != 'GET') {
    res.end();
    return;
  }
  if (!db) {
    db = await helper.connectToDatabase();
  }
  const collection = await db.collection('questions');
  const { owner } = req.query;
  console.log(owner);
  const questions = await collection.findOne({
    owner: helper.getObjectId(owner)
  }).sort({
    created_time: -1    //按创建时间降序
  }).toArray();
  if (questions && questions.length != 0) {
    res.status(200).json(questions)
  } else {
    res.status(404).end();
  }
}
