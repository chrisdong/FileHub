/*!
 * @name 惜缘
 * @description 
 * @version v1
 * @author 竹佀
 */
const { EVENT_NAMES, request, on, send } = globalThis.lx

// 支持的平台
const platforms = {
    tx: { name: 'QQ音乐', api: 'qq' },
    kw: { name: '酷我音乐', api: 'kw' },
    wy: { name: '网易云音乐', api: 'wy' },
    mg: { name: '咪咕音乐', api: 'mg' }
}

// 获取音频地址
const fetchAudioUrl = (source, musicInfo) => {
    return new Promise((resolve, reject) => {
        // 直接从musicInfo中获取ID，优先使用songmid
        const musicId = musicInfo.songmid || musicInfo.id || musicInfo.rid || musicInfo.cpid
        
        if (!musicId) {
            return reject(new Error('无法获取歌曲ID'))
        }
        
        const apiUrl = `https://yunzhiapi.cn/API/yyjhss.php?id=${musicId}&type=${platforms[source].api}`
        
        request(apiUrl, { method: 'GET', timeout: 10000 }, (error, response) => {
            if (error) return reject(new Error(`请求失败: ${error.message}`))
            
            if (!response?.body) return reject(new Error('接口返回空数据'))
            
            const result = response.body
            if (result.code === 1 && result.data?.url) {
                resolve(result.data.url)
            } else {
                reject(new Error(result.msg || '获取音频失败'))
            }
        })
    })
}

// 处理音乐地址请求
on(EVENT_NAMES.request, async ({ source, action, info }) => {
    if (action !== 'musicUrl') return Promise.reject(new Error('只支持musicUrl'))
    
    if (!platforms[source]) {
        return Promise.reject(new Error(`不支持的平台: ${source}`))
    }
    
    try {
        const audioUrl = await fetchAudioUrl(source, info.musicInfo)
        return Promise.resolve(audioUrl)
        
    } catch (error) {
        return Promise.reject(new Error(`[惜缘音源] ${error.message}`))
    }
})

// 注册音源
const sources = {}
Object.keys(platforms).forEach(key => {
    sources[key] = {
        name: `${platforms[key].name} - 惜缘`,
        type: 'music',
        actions: ['musicUrl'],
        qualitys: ['128k', '320k']
    }
})

send(EVENT_NAMES.inited, {
    openDevTools: false,
    sources: sources
})

console.log('音源加载完成')