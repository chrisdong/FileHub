/**
 * @name Hei Music聚合源
 * @description 聚合自网上公开接口及音源，请低调使用 Q群516649104
 * @version v1.1.5
 * @author Compile by CatXiaolan
 */

const { EVENT_NAMES, request, on, send } = globalThis.lx

// ========== 混淆层：字符串编码/解码 ==========
// 将敏感URL和密钥以编码形式存储，运行时解码使用
var _0x4e8f = function(arr, key) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(String.fromCharCode(arr[i] ^ key.charCodeAt(i % key.length)))
  }
  return result.join('')
}

// 编码后的API URL密钥表（XOR with key "HeiMusic"）
var _0xa3b1 = {
  changqing_kw: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x25,0x10,0x1a,0x24,0x16,0x12,0x19,0xa,0x66,0xd,0x8,0x24,0x1,0x12,0x7,0x4,0x3f,0x4b,0x7,0x28,0x1,0x5c,0x4,0x16,0x3b,0xc,0xa,0x7c,0x5a,0x18,0x1e,0x4d,0x38,0xd,0x19],
  changqing_kg: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x25,0x10,0x1a,0x24,0x16,0x5d,0x1,0x2,0x21,0x11,0x8,0x23,0x12,0x4,0x47,0x0,0x2b,0x4a,0x2,0x2a,0x4,0x2,0x58,0x4c,0x23,0x2,0x47,0x3d,0x1d,0x3],
  nianxin_kw: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x25,0x6,0x19,0x63,0x1b,0x1a,0x8,0xd,0x30,0xc,0x7,0x35,0xf,0x5d,0xa,0xc,0x25,0x4a,0x1a,0x25,0x14,0x1,0xc,0x4c,0x2b,0x0,0x1a,0x25,0x1c,0x5c,0x2,0x14,0x66,0x15,0x1,0x3d],
  xinghai: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x2b,0x1,0x10,0x37,0x7,0x5d,0xd,0x13,0x2c,0xb,0x1a,0x63,0x1a,0x1,0xe,0x4c,0x24,0x1d,0x46,0x2c,0x5,0x1a,0x46,0x2,0x38,0xc,0x47,0x3d,0x1d,0x3],
  huibq: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x24,0x1d,0x4,0x38,0x6,0x1a,0xa,0x2,0x38,0xc,0x47,0x22,0x1b,0x1,0xc,0xd,0x2c,0x0,0x1b,0x63,0x16,0x1c,0x4],
  chksz: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x29,0x15,0x0,0x63,0x16,0x1b,0x2,0x10,0x32,0x4b,0x1d,0x22,0x5,0x5c,0x8,0x13,0x21],
  gdstudio: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x25,0x10,0x1a,0x24,0x16,0x5e,0x8,0x13,0x21,0x4b,0xe,0x29,0x6,0x7,0x1c,0x7,0x21,0xa,0x47,0x35,0xc,0x9,0x46,0x2,0x38,0xc,0x47,0x3d,0x1d,0x3],
  cenguigui: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x23,0x12,0x44,0x2c,0x5,0x1a,0x47,0x0,0x2d,0xb,0xe,0x38,0x1c,0x14,0x1c,0xa,0x66,0x6,0x7],
  qq_vkey: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x3d,0x11,0x47,0x34,0x5b,0x2,0x18,0x4d,0x2b,0xa,0x4,0x62,0x16,0x14,0x0,0x4e,0x2a,0xc,0x7,0x62,0x18,0x6,0x1a,0xa,0x2b,0x10,0x47,0x2b,0x16,0x14],
  qq_cdn: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x2c,0x9,0x47,0x3e,0x1,0x1,0xc,0x2,0x25,0x4b,0x18,0x3c,0x18,0x6,0x1a,0xa,0x2b,0x4b,0x18,0x3c,0x5b,0x10,0x6,0xe,0x67],
  ynx_tx: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x29,0x15,0x0,0x60,0x3,0x41,0x47,0x1a,0x3d,0x4,0xf,0x28,0x1b,0x14,0x47,0x0,0x26,0x4a,0x28,0x1d,0x3c,0x5c,0x18,0x12,0x25,0x10,0x1a,0x24,0x16,0x5d,0x19,0xb,0x38],
  ynx_tx2: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x3c,0x4,0x7,0x2a,0x5b,0x12,0x19,0xa,0x66,0x16,0x59,0x7c,0x6,0x5d,0xa,0xd,0x67,0x8,0x1c,0x3e,0x1c,0x10,0x36,0xc,0x38,0x0,0x7,0x12,0x14,0x3,0x0,0x4d,0x38,0xd,0x19],
  nianxin_wy: [0x20,0x11,0x1d,0x3d,0x6,0x49,0x46,0x4c,0x25,0x6,0x19,0x63,0x1b,0x1a,0x8,0xd,0x30,0xc,0x7,0x35,0xf,0x5d,0xa,0xc,0x25,0x4a,0x1a,0x25,0x14,0x1,0xc,0x4c,0x2b,0x0,0x1a,0x25,0x1c,0x5c,0x1e,0x1a,0x66,0x15,0x1,0x3d],
  ynx_apikey: [0x7b,0x3,0xf,0x7f,0x46,0x46,0x5b,0x50,0x2d,0x51,0x5e,0x79,0x43,0x46,0x5b,0x51,0x7c,0x4,0x5a,0x2b,0x41,0x4b,0x5c,0x54,0x71,0x4,0xa,0x2b,0x41,0x42,0xf,0x51,0x7c,0x54,0x5c,0x79,0x45,0x10,0xc,0x53,0x7c,0x7,0x5f,0x2e,0x16,0x43,0xb,0x5a,0x7c,0x54,0x5f,0x79,0x13,0x40,0x5e,0x2,0x7d,0x7,0x5f,0x7f,0x4c,0x4a,0xd,0x56],
}

// 运行时解码URL
var _dec = function(name) {
  return _0x4e8f(_0xa3b1[name], 'HeiMusic')
}

// 字符串混淆：将明文字符串通过函数间接引用
var _s = function(str) {
  return str
}
var _n = function(str) {
  return str
}

const qualitys = {
  kw: {
    '128k': '128',
    '320k': '320',
    flac: 'flac',
    flac24bit: 'flac24bit',
  },
  kg: {
    '128k': '128',
    '320k': '320',
    flac: 'flac',
    flac24bit: 'flac24bit',
  },
  tx: {
    '128k': '128',
    '320k': '320',
    flac: 'flac',
    flac24bit: 'flac24bit',
  },
  wy: {
    '128k': '128',
    '320k': '320',
    flac: 'flac',
    flac24bit: 'flac24bit',
    jyeffect: 'jyeffect',
    sky: 'sky',
    jymaster: 'jymaster',
    dolby: 'dolby',
  },
  mg: {
    '128k': '128',
    '320k': '320',
    flac: 'flac',
    flac24bit: 'flac24bit',
  },
}

const httpRequest = (url, options) => new Promise((resolve, reject) => {
  request(url, options, (err, resp) => {
    if (err) return reject(err)
    resolve(resp.body)
  })
})

// 带超时的请求封装，避免慢速API阻塞并发竞速
const fetchWithTimeout = function(promise, ms) {
  var timeout = new Promise(function(_, reject) {
    setTimeout(function() { reject(new Error('请求超时(' + ms + 'ms)')) }, ms)
  })
  return Promise.race([promise, timeout])
}

const isValidUrl = function(url) {
  if (!url || typeof url !== 'string') return false
  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) return false
  if (url.indexOf('panspace.kuwo.cn') !== -1) return false
  return true
}

const getSongId = function(musicInfo) {
  return musicInfo.hash || musicInfo.songmid || musicInfo.songId || musicInfo.id || musicInfo.rid || musicInfo.musicId || musicInfo.copyrightId || musicInfo.songid
}

const getPlatformSongId = function(platform, musicInfo) {
  if (platform === 'kg') return musicInfo.hash || musicInfo.songmid || musicInfo.id || musicInfo.rid || musicInfo.mid
  if (platform === 'tx') return musicInfo.songmid || musicInfo.strMediaMid || musicInfo.mediaId || musicInfo.id
  if (platform === 'mg') return musicInfo.copyrightId || musicInfo.songId || musicInfo.id || musicInfo.songmid
  return musicInfo.songmid || musicInfo.id || musicInfo.songId || musicInfo.rid || musicInfo.hash
}

const qualityToLevel = function(quality) {
  var q = String(quality || '128k').toLowerCase()
  if (q === 'jymaster' || q === 'jyeffect' || q === 'sky' || q === 'dolby') return 'lossless'
  if (q === 'flac' || q === 'flac24bit') return 'lossless'
  if (q === '320k' || q === '192k') return 'exhigh'
  return 'standard'
}

const buildSearchKeyword = function(musicInfo) {
  var name = musicInfo.name || musicInfo.songName || ''
  var singer = musicInfo.singer || musicInfo.artist || ''
  if (name && singer) return name + ' ' + singer
  return name
}

// ========== API 源获取函数 ==========

// 长青SVIP - kw/kg (从混淆代码提取的真实URL路径含1后缀)
var CHANGQING_URLS = {
  kw: _dec('changqing_kw') + '?type=mp3&id={id}&level={level}',
  kg: _dec('changqing_kg') + '?type=mp3&id={id}&level={level}',
}
const fetchChangqing = function(source, musicInfo, quality) {
  var songId = getPlatformSongId(source, musicInfo)
  if (!songId) return Promise.reject(new Error('长青SVIP: 歌曲ID不存在'))
  var template = CHANGQING_URLS[source]
  if (!template) return Promise.reject(new Error('长青SVIP: 不支持该平台'))
  var level = qualityToLevel(quality)
  var url = template.replace('{id}', encodeURIComponent(String(songId))).replace('{level}', encodeURIComponent(level))
  return Promise.resolve(url)
}

// 念心SVIP - kw (从混淆代码提取的真实URL)
var NIANXIN_URLS = {
  kw: _dec('nianxin_kw') + '?id={id}&level={level}&type=mp3',
}
const fetchNianxin = function(source, musicInfo, quality) {
  var songId = getPlatformSongId(source, musicInfo)
  if (!songId) return Promise.reject(new Error('念心SVIP: 歌曲ID不存在'))
  var template = NIANXIN_URLS[source]
  if (!template) return Promise.reject(new Error('念心SVIP: 不支持该平台'))
  var level = qualityToLevel(quality)
  var url = template.replace('{id}', encodeURIComponent(String(songId))).replace('{level}', encodeURIComponent(level))
  return Promise.resolve(url)
}

// 聆澜音源 - kw/kg/tx/wy
const fetchLinglan = function(source, musicInfo, quality) {
  var songId = musicInfo.hash || musicInfo.songmid
  if (!songId) return Promise.reject(new Error('聆澜: 歌曲ID不存在'))
  var apiUrl = 'https://source.shiqianjiang.cn/api/music/url?source=' + source + '&songId=' + encodeURIComponent(String(songId)) + '&quality=' + encodeURIComponent(quality)
  return httpRequest(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'CERU_KEY-1709B0C2AC900B075CBF6A7B36E0DE1F',
    },
  }).then(function(body) {
    if (!body || isNaN(Number(body.code))) throw new Error('聆澜: unknown error')
    if (body.code === 200) {
      if (isValidUrl(body.url)) return body.url
      throw new Error('聆澜: invalid url')
    }
    throw new Error('聆澜: ' + (body.message || '未知错误'))
  })
}

// chksz - wy
const fetchChksz = function(source, musicInfo, quality) {
  if (source !== 'wy') return Promise.reject(new Error('chksz 仅支持 wy'))
  var songId = getSongId(musicInfo)
  if (!songId) return Promise.reject(new Error('chksz: 歌曲ID不存在'))
  var levelMap = { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'jymaster', 'jyeffect': 'jyeffect', 'sky': 'sky', 'jymaster': 'jymaster', 'dolby': 'dolby' }
  var level = levelMap[quality] || 'standard'
  return httpRequest(_dec('chksz') + '/163_music?id=' + songId + '&level=' + level, {
    method: 'GET',
    headers: { 'Referer': 'https://cp.chksz.top/' },
  }).then(function(body) {
    if (body && body.code === 200 && body.data && body.data.url) return body.data.url
    throw new Error('chksz 获取失败')
  })
}

// HUIBQ - tx
const fetchHuibq = function(source, musicInfo, quality) {
  if (source !== 'tx') return Promise.reject(new Error('HUIBQ 仅支持 tx'))
  var songId = getPlatformSongId('tx', musicInfo)
  if (!songId) return Promise.reject(new Error('HUIBQ: 歌曲ID不存在'))
  var supportedQualities = ['320k', '192k', '128k']
  if (supportedQualities.indexOf(quality) === -1) {
    return Promise.reject(new Error('HUIBQ: 不支持该音质'))
  }
  var targetQuality = quality
  return httpRequest(_dec('huibq') + '/url/' + source + '/' + songId + '/' + targetQuality, {
    method: 'GET',
    headers: { 'X-Request-Key': 'share-v3' },
  }).then(function(body) {
    if (!body || isNaN(Number(body.code))) throw new Error('HUIBQ: unknow error')
    if (body.code === 0) {
      if (isValidUrl(body.url)) return body.url
      throw new Error('HUIBQ: invalid url')
    }
    throw new Error('HUIBQ: ' + (body.msg || 'unknow error'))
  })
}

// gdstudio - wy
const fetchGdstudio = function(source, musicInfo, quality) {
  if (source !== 'wy') return Promise.reject(new Error('gdstudio 仅支持 wy'))
  var songId = getSongId(musicInfo)
  if (!songId) return Promise.reject(new Error('gdstudio: 歌曲ID不存在'))
  var brMap = { '128k': '128', '320k': '320', 'flac': '740', 'flac24bit': '999', 'jyeffect': '999', 'sky': '999', 'jymaster': '999', 'dolby': '999' }
  var br = brMap[quality] || '320'
  return httpRequest(_dec('gdstudio') + '?types=url&source=netease&id=' + songId + '&br=' + br, {
    method: 'GET',
  }).then(function(body) {
    if (body && body.url && isValidUrl(body.url)) return body.url
    throw new Error('gdstudio 获取失败')
  })
}

// cenguigui - kw
const fetchCenguigui = function(source, musicInfo, quality) {
  if (source !== 'kw') return Promise.reject(new Error('cenguigui 仅支持 kw'))
  var songId = getSongId(musicInfo)
  if (!songId) return Promise.reject(new Error('cenguigui: 歌曲ID不存在'))
  var levelMap = { '128k': '128k', '320k': '320k', 'flac': 'lossless', 'flac24bit': 'lossless' }
  var level = levelMap[quality] || '320k'
  return httpRequest(_dec('cenguigui') + '?id=' + songId + '&type=song&format=json&level=' + level, {
    method: 'GET',
  }).then(function(body) {
    var realUrl
    if (body) {
      if (body.data && body.data.url) realUrl = body.data.url
      else if (body.url) realUrl = body.url
    }
    if (isValidUrl(realUrl)) return realUrl
    throw new Error('cenguigui 获取失败')
  })
}

// 星海后端 - mg/tx (通过星海后端API获取，需name+singer参数辅助匹配)
var XINGHAI_BACKEND_URL = _dec('xinghai')
var XINGHAI_SOURCE_MAP = { tx: 'qq', mg: 'migu', kw: 'kw', kg: 'kg' }

var fetchXinghaiBackend = function(source, musicInfo, quality) {
  var backendSource = XINGHAI_SOURCE_MAP[source]
  if (!backendSource) return Promise.reject(new Error('星海后端: 不支持该平台'))
  var songId = getPlatformSongId(source, musicInfo)
  var name = musicInfo.name || musicInfo.songName || ''
  var singer = musicInfo.singer || musicInfo.artist || ''
  var params = 'version=3.2.7&source=' + encodeURIComponent(backendSource)
  if (name) params += '&name=' + encodeURIComponent(name)
  if (singer) params += '&singer=' + encodeURIComponent(singer)
  if (songId) params += '&songmid=' + encodeURIComponent(String(songId))
  params += '&quality=' + encodeURIComponent(quality || '320k')
  return httpRequest(XINGHAI_BACKEND_URL + '?' + params, {
    method: 'GET',
  }).then(function(body) {
    if (body && body.code === 200 && body.url && isValidUrl(body.url)) return body.url
    if (body && body.msg) throw new Error('星海后端: ' + body.msg)
    throw new Error('星海后端: 未返回有效链接')
  })
}

// QQ音乐直连vkey - tx (直接调用QQ音乐官方vkey接口，响应最快~0.13s)
var QQ_VKEY_URL = _dec('qq_vkey')
var QQ_CDN_URL = _dec('qq_cdn')
var QQ_VKEY_GUID = '10000'

var _qqVkeyRequest = function(filename, songmid) {
  var payload = {
    comm: { ct: 19, cv: 0, guid: QQ_VKEY_GUID, tmeAppID: 'qqmusic', qq: '0' },
    hot: {
      method: 'CgiGetHotVkey',
      module: 'music.vkey.GetEVkey',
      param: { filename: [filename], songmid: [String(songmid)] }
    }
  }
  return httpRequest(QQ_VKEY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(function(body) {
    if (body && body.code === 0 && body.hot && body.hot.code === 0 &&
        body.hot.data && body.hot.data.urls && body.hot.data.urls.length > 0) {
      var purl = body.hot.data.urls[0].purl
      if (purl) {
        var fullUrl = QQ_CDN_URL + purl
        if (isValidUrl(fullUrl)) return fullUrl
      }
    }
    return null
  })
}

var fetchQqVkey = function(source, musicInfo, quality) {
  if (source !== 'tx') return Promise.reject(new Error('QQ音乐直连 仅支持 tx'))
  var songmid = musicInfo.songmid || musicInfo.strMediaMid || musicInfo.id || ''
  var mediaMid = musicInfo.strMediaMid || songmid
  if (!songmid) return Promise.reject(new Error('QQ音乐直连: 歌曲ID不存在'))
  // 音质格式映射，按优先级尝试
  var formatMap = {
    '128k': [{ prefix: 'C400', ext: 'm4a' }],
    '320k': [{ prefix: 'M800', ext: 'mp3' }, { prefix: 'C400', ext: 'm4a' }],
    'flac': [{ prefix: 'F000', ext: 'flac' }, { prefix: 'M800', ext: 'mp3' }],
    'flac24bit': [{ prefix: 'D000', ext: 'flac' }, { prefix: 'F000', ext: 'flac' }, { prefix: 'M800', ext: 'mp3' }],
    'dolby': [{ prefix: 'Q000', ext: 'm4a' }, { prefix: 'F000', ext: 'flac' }, { prefix: 'M800', ext: 'mp3' }]
  }
  var formats = formatMap[quality] || formatMap['320k']
  // 依次尝试不同格式，第一个成功即返回
  var tryFormat = function(index) {
    if (index >= formats.length) {
      return Promise.reject(new Error('QQ音乐直连: 未返回有效链接'))
    }
    var fmt = formats[index]
    var filename = fmt.prefix + mediaMid + '.' + fmt.ext
    return _qqVkeyRequest(filename, songmid).then(function(url) {
      if (url) return url
      return tryFormat(index + 1)
    })
  }
  return tryFormat(0)
}

// 玉宁熙tx主接口 - tx (api-v2.yuafeng.cn, 带APIKEY)
var YNX_TX_URL = _dec('ynx_tx')
var YNX_TX2_URL = _dec('ynx_tx2')
var YNX_APIKEY = _dec('ynx_apikey')

// 校验玉宁熙返回的URL是否匹配请求的音质，避免音质降级
var _checkYnxQuality = function(quality, url) {
  if (!url) return false
  var q = String(quality || '128k').toLowerCase()
  // 128k 不降级检查
  if (q === '128k') return true
  // 320k 不应返回 C400（128k m4a）
  if (q === '320k' || q === '192k') {
    return url.indexOf('C400') === -1
  }
  // 无损/全景声应包含 flac 或高品质标识，避免 C400
  if (q === 'flac' || q === 'flac24bit' || q === 'dolby') {
    return url.indexOf('C400') === -1
  }
  return true
}

var fetchYnxTx = function(source, musicInfo, quality) {
  if (source !== 'tx') return Promise.reject(new Error('玉宁熙 仅支持 tx'))
  var songmid = getPlatformSongId('tx', musicInfo)
  if (!songmid) return Promise.reject(new Error('玉宁熙: 歌曲ID不存在'))
  // 音质映射为中文type参数
  var typeMap = { '128k': '低品质', '320k': 'HQ高品质', 'flac': 'SQ无损', 'flac24bit': '臻品全景声', 'dolby': '臻品全景声' }
  var type = encodeURIComponent(typeMap[quality] || 'HQ高品质')
  // 主接口: api-v2.yuafeng.cn
  return httpRequest(YNX_TX_URL + '?type=' + type + '&mid=' + encodeURIComponent(String(songmid)) + '&apikey=' + YNX_APIKEY, {
    method: 'GET',
  }).then(function(body) {
    if (body && body.code === 0 && body.data && body.data.music) {
      var musicUrl = body.data.music
      if (isValidUrl(musicUrl)) {
        if (_checkYnxQuality(quality, musicUrl)) return musicUrl
        throw new Error('玉宁熙: 音质降级')
      }
    }
    // 主接口失败，尝试次接口
    return httpRequest(YNX_TX2_URL + '?mid=' + encodeURIComponent(String(songmid)), {
      method: 'GET',
    }).then(function(body2) {
      if (body2) {
        // 按音质依次尝试字段
        var fields = ['song_play_url_hq', 'song_play_url_standard', 'song_play_url']
        if (quality === 'flac' || quality === 'flac24bit') {
          fields = ['song_play_url_pq', 'song_play_url_sq', 'song_play_url_hq', 'song_play_url_standard', 'song_play_url']
        } else if (quality === '128k') {
          fields = ['song_play_url_standard', 'song_play_url', 'song_play_url_fq']
        }
        for (var i = 0; i < fields.length; i++) {
          var url = body2[fields[i]]
          if (url && isValidUrl(url)) {
            if (_checkYnxQuality(quality, url)) return url
          }
        }
      }
      throw new Error('玉宁熙: 未返回有效链接')
    })
  })
}

// 念心wy接口 - wy (mcp.nianxinxz.com/share/ceshi/wy.php)
var NIANXIN_WY_URL = _dec('nianxin_wy')

var fetchNianxinWy = function(source, musicInfo, quality) {
  if (source !== 'wy') return Promise.reject(new Error('念心wy 仅支持 wy'))
  var songId = musicInfo.songId || musicInfo.musicId || musicInfo.id || ''
  if (!songId) return Promise.reject(new Error('念心wy: 歌曲ID不存在'))
  var levelMap = { '128k': 'standard', '320k': 'exhigh', 'flac': 'lossless', 'flac24bit': 'hires', 'jyeffect': 'jyeffect', 'sky': 'sky', 'jymaster': 'jymaster', 'dolby': 'dolby' }
  var level = levelMap[quality] || 'exhigh'
  return httpRequest(NIANXIN_WY_URL + '?id=' + encodeURIComponent(String(songId)) + '&level=' + level, {
    method: 'GET',
  }).then(function(body) {
    if (body && body.code === 200 && body.url && isValidUrl(body.url)) return body.url.trim()
    throw new Error('念心wy: ' + (body && body.msg ? body.msg : '未返回有效链接'))
  })
}

// ========== API 源列表 ==========
// txTier: TX平台专用分层竞速优先级，1=优先层（真实音质、响应快），2=备用层
const API_SOURCES = [
  // 公网源
  { name: '玉宁熙',       fetch: fetchYnxTx,       sources: ['tx'], txTier: 2 },
  { name: '长青SVIP',     fetch: fetchChangqing,   sources: ['kw', 'kg'] },
  { name: '念心SVIP',     fetch: fetchNianxin,     sources: ['kw'] },
  { name: 'cenguigui',    fetch: fetchCenguigui,   sources: ['kw'] },
  { name: 'chksz',        fetch: fetchChksz,       sources: ['wy'] },
  { name: '念心wy',        fetch: fetchNianxinWy,   sources: ['wy'] },
  { name: 'gdstudio',     fetch: fetchGdstudio,    sources: ['wy'] },
  { name: '星海后端',     fetch: fetchXinghaiBackend, sources: ['tx', 'mg'], txTier: 1 },
  { name: 'HUIBQ',        fetch: fetchHuibq,       sources: ['tx'], txTier: 1 },
]

// ========== 核心逻辑：并发竞速策略 ==========
// 对同一平台的所有可用源同时发起请求，取最快返回的有效URL
// 每个源设置6秒超时，避免慢速API阻塞；任一成功即返回
var RACE_TIMEOUT = 6000

// 并发竞速：所有候选源同时请求，任一成功即返回
var raceSources = function(candidates, source, musicInfo, quality) {
  if (candidates.length === 0) {
    return Promise.reject(new Error('无可用源'))
  }
  // 单源直接返回（带超时）
  if (candidates.length === 1) {
    return fetchWithTimeout(candidates[0].fetch(source, musicInfo, quality), RACE_TIMEOUT).then(function(url) {
      if (url && isValidUrl(url)) return url
      return Promise.reject(new Error(candidates[0].name + ': 无效URL'))
    })
  }
  // 多源并发竞速
  var errors = []
  var resolved = false
  return new Promise(function(resolve, reject) {
    var pending = candidates.length
    var onSettled = function() {
      pending--
      if (pending === 0 && !resolved) {
        reject(new Error('所有API源均失败:\n' + errors.join('\n')))
      }
    }
    for (var i = 0; i < candidates.length; i++) {
      (function(apiSource) {
        fetchWithTimeout(apiSource.fetch(source, musicInfo, quality), RACE_TIMEOUT).then(function(url) {
          if (resolved) return
          if (url && isValidUrl(url)) {
            resolved = true
            resolve(url)
          } else {
            errors.push(apiSource.name + ': 无效URL')
            onSettled()
          }
        }).catch(function(e) {
          if (resolved) return
          errors.push(apiSource.name + ': ' + (e.message || e))
          onSettled()
        })
      })(candidates[i])
    }
  })
}

const handleGetMusicUrl = function(source, musicInfo, quality) {
  // 筛选支持该平台的源
  var candidates = []
  for (var i = 0; i < API_SOURCES.length; i++) {
    if (API_SOURCES[i].sources.indexOf(source) !== -1) {
      candidates.push(API_SOURCES[i])
    }
  }
  if (candidates.length === 0) {
    return Promise.reject(new Error('无可用源支持平台: ' + source))
  }
  // TX 平台使用分层竞速：优先层先跑，全部失败再跑备用层
  // 优先层为真实音质源（星海后端、HUIBQ），备用层为玉宁熙
  if (source === 'tx') {
    var tier1 = []
    var tier2 = []
    for (var j = 0; j < candidates.length; j++) {
      if (candidates[j].txTier === 1) tier1.push(candidates[j])
      else tier2.push(candidates[j])
    }
    return raceSources(tier1, source, musicInfo, quality).catch(function(err1) {
      if (tier2.length === 0) return Promise.reject(err1)
      return raceSources(tier2, source, musicInfo, quality)
    })
  }
  return raceSources(candidates, source, musicInfo, quality)
}

// ========== apis 对象（对齐官方示例结构）==========
const apis = {
  kw: {
    musicUrl: function(musicInfo, quality) {
      return handleGetMusicUrl('kw', musicInfo, quality)
    },
  },
  kg: {
    musicUrl: function(musicInfo, quality) {
      return handleGetMusicUrl('kg', musicInfo, quality)
    },
  },
  tx: {
    musicUrl: function(musicInfo, quality) {
      return handleGetMusicUrl('tx', musicInfo, quality)
    },
  },
  wy: {
    musicUrl: function(musicInfo, quality) {
      return handleGetMusicUrl('wy', musicInfo, quality)
    },
  },
  mg: {
    musicUrl: function(musicInfo, quality) {
      return handleGetMusicUrl('mg', musicInfo, quality)
    },
  },
}

// 注册应用 API 请求事件
on(EVENT_NAMES.request, function(params) {
  var source = params.source
  var action = params.action
  var info = params.info
  switch (action) {
    case 'musicUrl':
      return apis[source].musicUrl(info.musicInfo, qualitys[source][info.type]).catch(function(err) {
        console.log(err)
        return Promise.reject(err)
      })
    default:
      console.error('action(' + action + ') not support')
      return Promise.reject('action not support')
  }
})

// 脚本初始化完成后发送 inited 事件告知应用
send(EVENT_NAMES.inited, {
  sources: {
    kw: {
      name: '酷我音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit'],
    },
    kg: {
      name: '酷狗音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit'],
    },
    tx: {
      name: 'QQ音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit'],
    },
    wy: {
      name: '网易云音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit', 'jyeffect', 'sky', 'jymaster', 'dolby'],
    },
    mg: {
      name: '咪咕音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k', '320k', 'flac', 'flac24bit'],
    },
  },
})