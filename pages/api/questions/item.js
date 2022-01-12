//route => /api/questions/item

const helper = require("../db");
let db = null;

export default async function questions_item(req, res) {
  if (!db) {
    db = await helper.connectToDatabase();
  }
  const collection = await db.collection('questions');
  //TODO: data validation
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
      const { owner, content } = req.body;
      const now = new Date();
      await collection.insertOne({
        owner: helper.getObjectId(owner),
        created_time: now,
        updated_time: now,
        deleted_time: null,
        content: content,
        answer: ''
      }).then(
        result => res.status(201).json({
          result: 'ok',
          id: result.insertedId
        }),
        error => res.status(500).json({
          result: 'error',
          ...error
        })
      )
  }
}