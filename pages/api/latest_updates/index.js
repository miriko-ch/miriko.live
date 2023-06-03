//route: /api/latest_updates
import md5 from 'md5'
import axios from 'axios'

export default async function bili_latest_updates(req, res) {
  if (req.method != 'GET') {
    res.end();
    return;
  }

  const wbi_keys = await getWbiKeys()
  const query = encWbi(
    {
      mid: 7564991,
      pn: 1,
      ps: 8
    },
    wbi_keys.img_key,
    wbi_keys.sub_key
  )
  console.log(query)

  fetch('https://api.bilibili.com/x/space/wbi/arc/search?' + query, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0',
      'Referer': 'https://space.bilibili.com/7564991/video'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      res.json(data);
      // if (data.code !== 0) {
      //   console.log("API: /latest_updates received error");
      //   res.json(data);
      // } else {
      //   res.json(data.data.list.vlist);
      // }
    })
    .catch(err => {
      res.json(err);
    });
}


//https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md#javascript
const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
  61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
  36, 20, 34, 44, 52
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
function getMixinKey(orig) {
  let temp = ''
  mixinKeyEncTab.forEach((n) => {
    temp += orig[n]
  })
  return temp.slice(0, 32)
}

// 为请求参数进行 wbi 签名
function encWbi(params, img_key, sub_key) {
  const mixin_key = getMixinKey(img_key + sub_key),
    curr_time = Math.round(Date.now() / 1000),
    chr_filter = /[!'\(\)*]/g
  let query = []
  params = Object.assign(params, { wts: curr_time })    // 添加 wts 字段
  // 按照 key 重排参数
  Object.keys(params).sort().forEach((key) => {
    query.push(
      encodeURIComponent(key) +
      '=' +
      // 过滤 value 中的 "!'()*" 字符
      encodeURIComponent(('' + params[key]).replace(chr_filter, ''))
    )
  })
  query = query.join('&')
  const wbi_sign = md5(query + mixin_key) // 计算 w_rid
  return query + '&w_rid=' + wbi_sign
}

// 获取最新的 img_key 和 sub_key
async function getWbiKeys() {
  const resp = await axios({
    url: 'https://api.bilibili.com/x/web-interface/nav',
    method: 'get',
    responseType: 'json'
  }),
    json_content = resp.data,
    img_url = json_content.data.wbi_img.img_url,
    sub_url = json_content.data.wbi_img.sub_url
  return {
    img_key: img_url.substring(img_url.lastIndexOf('/') + 1, img_url.length).split('.')[0],
    sub_key: sub_url.substring(sub_url.lastIndexOf('/') + 1, sub_url.length).split('.')[0]
  }
}
