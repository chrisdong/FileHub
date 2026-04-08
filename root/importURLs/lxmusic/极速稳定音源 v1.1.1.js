/**
 * @name 极速稳定音源
 * @description 超快响应，多平台高速获取播放链接
 * @version 1.1.1
 * @author assistant
 * @homepage https://lxmusic.toside.cn/mobile/custom-source
 */
const { EVENT_NAMES, request, on, send } = globalThis.lx;

const QUALITY_MAP = {
  wy: { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'lossless' },
  tx: { '128k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac' },
  kw: { '128k': '128k', '320k': '320k', 'flac': 'lossless', 'flac24bit': 'lossless' },
  kw: { '128k': '128k', '320k': '320k', 'flac': 'lossless', 'flac24bit': 'lossless' },
  mg: { '128k': '128k', '320k': '320k', 'flac': 'flac', 'flac24bit': 'flac' }
};

// 极速接口（延迟最低）
const FAST_API = {
  wy: (id) => `https://api.injahow.cn/meting/api/?server=wy&type=url&id=${id}`,
  tx: (id) => `https://api.injahow.cn/meting/api/?server=tx&type=url&id=${id}`,
  kw: (id) => `https://api.injahow.cn/meting/api/?server=kw&type=url&id=${id}`,
  kw: (id) => `https://api.injahow.cn/meting/api/?server=kw&type=url&id=${id}`,
  mg: (id) => `https://api.injahow.cn/meting/api/?server=mg&type=url&id=${id}`
};

const http = (url) => new Promise((resolve, reject) => {
  request(url, { method: 'GET', timeout: 6000 }, (err, resp, body) => {
    if (err) return reject(err);
    try {
      if (typeof body === 'string') {
        if (body.startsWith('http')) return resolve(body);
        const json = JSON.parse(body);
        return resolve(json);
      }
      resolve(body);
    } catch (e) {
      resolve(body);
    }
  });
});

const getMusicUrl = async (source, musicInfo) => {
  const id = (musicInfo.id || musicInfo.hash || musicInfo.songmid || '').trim();
  if (!id) throw new Error('歌曲ID无效');

  const res = await http(FAST_API[source](id));
  let url = '';

  if (typeof res === 'string') {
    url = res.trim();
  } else {
    url = res?.url || res?.data?.url || '';
  }

  if (!url || url.includes('404') || url.includes('error') || url.includes('null')) {
    throw new Error('获取播放地址失败');
  }

  return url;
};

on(EVENT_NAMES.request, (params) => {
  const { source, action, info } = params;
  if (action === 'musicUrl') {
    return getMusicUrl(source, info.musicInfo).catch(e => Promise.reject(e.message));
  }
  return Promise.reject('不支持该操作');
});

send(EVENT_NAMES.inited, {
  sources: {
    wy: { name: '🚀 网易云极速', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac'] },
    tx: { name: '🚀 QQ音乐极速', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac'] },
    kw: { name: '🚀 酷狗极速', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac'] },
    kw: { name: '🚀 酷我极速', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac'] },
    mg: { name: '🚀 咪咕极速', type: 'music', actions: ['musicUrl'], qualitys: ['128k', '320k', 'flac'] }
  }
});
