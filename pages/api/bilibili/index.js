//route: /api/bilibili

export default async function bili_followers(req, res) {
  let live_status = 0;
  let followers = 0;
  if (req.method != 'GET') {
    res.end();
    return;
  }
  let response = await fetch('https://api.live.bilibili.com/room/v1/Room/room_init?id=449047');
  let room_json = await response.json();
  live_status = room_json.data.live_status;

  response = await fetch('https://api.live.bilibili.com/live_user/v1/Master/info?uid=7564991');
  let master_json = await response.json();
  followers = master_json.data.follower_num;

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=900');
  res.status(200).json({
    live: live_status,
    followers: followers
  });
}