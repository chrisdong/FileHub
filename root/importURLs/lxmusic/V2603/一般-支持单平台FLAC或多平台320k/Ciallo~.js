/*!
 * @name Ciallo～(∠・ω< )⌒☆
 * @description 仅支持网易，理论支持全音质
 * @version 0721 opt
 * @author 玥然OvO
 */
const { EVENT_NAMES, request, on, send } = globalThis.lx

const API_BASE = 'https://api.s0o1.com/API/wyy_music'

const QUALITY_MAP = {
    '128k': '1',
    '320k': '2', 
    'flac': '3',
    'flac24bit': '4',
    'hires': '5',
    'atmos': '6',
    'master': '7'
}

const QUALITY_NAMES = {
    '128k': '128K',
    '320k': '320K',
    'flac': 'FLAC',
    'flac24bit': '24Bit',
    'hires': 'Hi-Res',
    'atmos': 'Atmos',
    'master': 'Master'
}

const getAudioUrl = (musicInfo, quality = '128k') => {
    return new Promise((resolve, reject) => {
        const id = musicInfo.songmid || musicInfo.id || musicInfo.mid
        if (!id) {
            return reject(new Error('缺少歌曲ID'))
        }
        
        const yz = QUALITY_MAP[quality] || '1'
        const apiUrl = `${API_BASE}?id=${id}&yz=${yz}`
        
        request(apiUrl, { 
            method: 'GET',
            timeout: 8000
        }, (err, resp) => {
            if (err) {
                return reject(new Error('网络请求失败'))
            }
            
            try {
                let data = resp.body
                if (typeof data === 'string') {
                    data = JSON.parse(data.trim())
                }
                
                if (data.status !== 200 || !data.success || !data.data || !data.data.url) {
                    return reject(new Error('获取音频地址失败'))
                }
                
                resolve(data.data.url)
            } catch (error) {
                reject(new Error('解析响应数据失败'))
            }
        })
    })
}

const searchMusic = (keyword, limit = 10) => {
    return new Promise((resolve) => {
        const apiUrl = `${API_BASE}?msg=${encodeURIComponent(keyword)}&sm=${limit}`
        
        request(apiUrl, {
            method: 'GET',
            timeout: 5000
        }, (err, resp) => {
            if (err) {
                return resolve([])
            }
            
            try {
                let data = resp.body
                if (typeof data === 'string') {
                    data = JSON.parse(data.trim())
                }
                
                if (data.status !== 200 || !data.success || !data.data) {
                    return resolve([])
                }
                
                const results = []
                
                if (data.data.id) {
                    results.push({
                        songmid: data.data.id.toString(),
                        id: data.data.id.toString(),
                        name: data.data.name || keyword,
                        singer: data.data.artists || '未知',
                        albumName: data.data.album || '',
                        source: 'wy',
                        interval: '03:00',
                        img: data.data.pic
                    })
                }
                
                resolve(results)
            } catch (error) {
                resolve([])
            }
        })
    })
}

on(EVENT_NAMES.request, ({ source, action, info }) => {
    switch (action) {
        case 'musicUrl':
            return new Promise((resolve, reject) => {
                if (!info?.musicInfo) {
                    return reject(new Error('缺少音乐信息'))
                }
                getAudioUrl(info.musicInfo, info.type || '128k')
                    .then(resolve)
                    .catch(reject)
            })
            
        case 'search':
            return new Promise((resolve) => {
                if (!info?.keyword) {
                    return resolve({ list: [], total: 0, page: 1, limit: 10, source: 'wy', allPage: 1 })
                }
                
                const { keyword, page = 1, limit = 10 } = info
                
                searchMusic(keyword, limit)
                    .then(results => {
                        resolve({
                            list: results,
                            total: results.length,
                            page,
                            limit,
                            source: 'wy',
                            allPage: Math.max(1, Math.ceil(results.length / limit))
                        })
                    })
                    .catch(() => {
                        resolve({ list: [], total: 0, page, limit, source: 'wy', allPage: 1 })
                    })
            })
            
        default:
            return Promise.reject(new Error('不支持的操作'))
    }
})

send(EVENT_NAMES.inited, {
    openDevTools: false,
    sources: {
        wy: {
            name: '网易云解析',
            type: 'music',
            actions: ['musicUrl', 'search'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master'],
            qualityName: QUALITY_NAMES,
            maxSearchCount: 20,
            hotSearchable: true,
            importable: true,
            supportBitRateTest: false
        }
    }
})