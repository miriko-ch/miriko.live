//route: /api/info

export default async function bili_followers(req, res) {
  let bili_live_status = false;
  let bili_followers = 0;
  let ac_live_status = false;
  let ac_followers = 0;
  if (req.method != 'GET') {
    res.end();
    return;
  }
  let response = await fetch('https://api.live.bilibili.com/room/v1/Room/room_init?id=449047');
  let room_json = await response.json();
  bili_live_status = room_json.data.live_status == 1 ? true : false;

  response = await fetch('https://api.live.bilibili.com/live_user/v1/Master/info?uid=7564991');
  let master_json = await response.json();
  bili_followers = master_json.data.follower_num;

  res.setHeader('Cache-Control', 'max-age=0, s-maxage=900');
  res.status(200).json({
    bili: {
      live: bili_live_status,
      followers: bili_followers
    }
  });
}