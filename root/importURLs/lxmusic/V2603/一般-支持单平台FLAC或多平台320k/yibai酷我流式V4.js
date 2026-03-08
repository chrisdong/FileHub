/*!
 * @name yibai酷我流式(v4)
 * @description 仅支持酷我全音质，建议下载出来播放，记得多多宣传，群号1021814843
 * @version v114514
 * @author yibai
 */
 // 倒卖死妈死全家
const DEV_ENABLE = false
const API_URL = "http://kwdec.942240.xyz"
const API_KEY = ""
const MUSIC_QUALITY = JSON.parse('{"kw":["128k","320k","flac","hires","atmos","atmos_plus","master"]}');
const MUSIC_SOURCE = Object.keys(MUSIC_QUALITY);
const { EVENT_NAMES, request, on, send, utils, env, version } = globalThis.lx;
const httpFetch = (url, options = { method: "GET" }) => {
  return new Promise((resolve, reject) => {
    request(url, options, (err, resp) => {
      if (err) return reject(err);
      resolve(resp);
    });
  });
};
const handleGetMusicUrl = async (source, musicInfo, quality) => {
  const songId = musicInfo.hash ?? musicInfo.songmid;
  
  try {
    const request = await httpFetch(
      `${API_URL}/kwurl?id=${songId}&q=${quality}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": `${
            env ? `lx-music-${env}/${version}` : `lx-music-request/${version}`
          }`
        },
        follow_max: 5,
      }
    );
    
    const { body } = request;
    
    if (!body) {
      throw new Error("获取链接失败");
    }
    
    if (body.url) {
      return body.url;
    }
    
    throw new Error("获取链接失败");
    
  } catch (error) {
    throw new Error("获取链接失败");
  }
};
const musicSources = {};
MUSIC_SOURCE.forEach((item) => {
  musicSources[item] = {
    name: item,
    type: "music",
    actions: ["musicUrl"],
    qualitys: MUSIC_QUALITY[item],
  };
});
on(EVENT_NAMES.request, ({ action, source, info }) => {
  if (action === "musicUrl") {
    return handleGetMusicUrl(source, info.musicInfo, info.type);
  }
  return Promise.reject("action not support");
});
send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: DEV_ENABLE,
  sources: musicSources,
});