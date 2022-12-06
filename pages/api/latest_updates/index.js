//route: /api/latest_updates

export default async function bili_latest_updates(req, res) {
  if (req.method != 'GET') {
    res.end();
    return;
  }

  fetch('http://api.bilibili.com/x/space/arc/search?mid=7564991&pn=1&ps=8', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0',
      'Referer': 'https://space.bilibili.com/7564991/video'
    }
  })
  .then((response) => response.json())
  .then((data) => {
    res.json(data.data.list.vlist);
  })
  .catch(err => {
    res.json(err);
  });
}