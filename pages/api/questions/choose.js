//api/questions/choose

const helper = require("../db");
let db = null;

export default async function chooseChange(req, res) {
  if(req.method != 'POST') {
    res.end();
    return;
  }
  if (!db) {
    db = await helper.connectToDatabase();
  }
  const collection = await db.collection('questions');
  const { owner, id, choose } = req.body;
  if(req.session.user._id == owner) {
    try {
      await collection.updateOne(
        { _id: helper.getObjectId(id) },
        { $set: { "choose": choose} });
      
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Choose failed'})
    }
  }
}