/*!
 * @name 春日影
 * @description 支持网易云，仅128k
 * @version v1
 * @author 玥然OvO
 */

const { EVENT_NAMES, request, on, send } = globalThis.lx

on(EVENT_NAMES.request, ({ source, action, info }) => {
    if (source !== 'wy' || action !== 'musicUrl') {
        return
    }
    return getAudio(info.musicInfo)
})

async function getAudio(musicInfo) {
    const songId = musicInfo.songmid || musicInfo.id
    if (!songId) throw new Error('缺少歌曲ID')
    
    return new Promise((resolve, reject) => {
        request(`http://itapi.top/API/get_wyyid.php?id=${songId}`, {
            method: 'GET',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://music.163.com/'
            }
        }, (err, resp) => {
            if (err) {
                return reject(new Error('网络请求失败'))
            }
            
            try {
                const data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body
                
                if (data.code === 0 && data.data && data.data[0] && data.data[0].url) {
                    const song = data.data[0]
                    resolve(song.url)
                } else {
                    reject(new Error('API错误'))
                }
            } catch (e) {
                reject(new Error('解析失败'))
            }
        })
    })
}

send(EVENT_NAMES.inited, {
    openDevTools: false,
    sources: {
        wy: {
            name: '网易云音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k']
        }
    }
})

console.log('IT-API音源加载成功')