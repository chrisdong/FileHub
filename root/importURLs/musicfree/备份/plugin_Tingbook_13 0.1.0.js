"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const headers = {
    "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/47.0.2526.107 Mobile/13C75 Safari/601.1.46",
};

function formatAlbumItem(_) {
    return {
        id: _.novel.url,
        artist: _.boyin.name || "",
        title: _.novel.name || "",
        artwork: _.novel.cover || "",
        description: _.novel.intro || "",
    };
}

async function getRecommendSheetTags() {
    // 默认选项这里，就不提供选择了，直接摆到顶部栏选(pinned)
    const data = [
        // {
        //     title: "排行",
        //     data: [
        //         {
        //             id: "allvisit",
        //             title: "人气榜",
        //         },
        //         {
        //             id: "marknum",
        //             title: "收藏榜",
        //         },
        //         // {
        //         //     id: "votenum",
        //         //     title: "推荐榜",
        //         // },
        //         {
        //             id: "postdate",
        //             title: "新书榜",
        //         },
        //         {
        //             id: "lastupdate",
        //             title: "更新榜",
        //         },
        //         {
        //             id: "downnum",
        //             title: "下载榜",
        //         },
        //     ],
        // },
    ];

    return {
        pinned: [
            {
                id: "allvisit",
                title: "人气榜",
            },
            {
                id: "marknum",
                title: "收藏榜",
            },
            {
                id: "postdate",
                title: "新书榜",
            },
            {
                id: "lastupdate",
                title: "更新榜",
            },
            {
                id: "downnum",
                title: "下载榜",
            },
        ],
        data,
    };
}

async function getRecommendSheetsByTag(sheetItem, page) {
    if (sheetItem.id == "") {
        sheetItem.id = "votenum";
    }

    const res = (
        await axios_1.default.get(
            "https://m.ting13.com/api/ajax/toplist?sort=1&type=" +
                sheetItem.id +
                "&page=" +
                page,
            {
                headers: headers,
            }
        )
    ).data;

    return {
        // 实在是太多页了，我测试100页都有数据，给个10页差不多了
        isEnd: page >= 30,
        data: res.map(formatAlbumItem),
    };
}

async function getMusicSheetInfo(sheet, page) {
    let res = (
        await axios_1.default.get(
            "https://m.ting13.com" + sheet.id + "?p=" + page,
            {
                headers: headers,
            }
        )
    ).data;

    let $ = cheerio_1.default.load(res);
    res = $(".play-list li");

    return {
        isEnd: $("span.pg-next").text().match("尾 页") != null,
        musicList: res
            .map(function () {
                return {
                    id: $("a", this).attr("href"),
                    artwork: sheet.artwork,
                    title: $("a", this).attr("title"),
                    artist: sheet.artist,
                    album: sheet.title,
                };
            })
            .toArray(),
    };
}

async function searchAlbum(query, page) {
    const res = (
        await axios_1.default.get(
            "https://m.ting13.com/api/ajax/solist?word=" +
                query +
                "&type=name&page=" +
                page +
                "&order=1",
            {
                headers: headers,
            }
        )
    ).data;

    return {
        isEnd: page * 10 >= res.cnum,
        data: res.data.map(formatAlbumItem),
    };
}

async function searchArtist(query, page) {
    const res = (
        await axios_1.default.get(
            "https://m.ting13.com/api/ajax/solist?word=" +
                query +
                "&type=name&page=" +
                page +
                "&order=1",
            {
                headers: headers,
            }
        )
    ).data;

    return {
        isEnd: true,
        data: [
            {
                id: query,
                name: query,
                avatar: "https://img2.baidu.com/it/u=2272164741,3657351618&fm=253&fmt=auto&app=138&f=JPEG?w=501&h=500",
                worksNum: res.cnum,
                description: "没有单曲，只有专辑(小说)",
            },
        ],
    };
}

async function search(query, page, type) {
    // 没有哪一部小说是单集的
    // 某部小说 == 专辑
    if (type === "album") {
        return await searchAlbum(query, page);
    }
    // 搜索播音员
    if (type === "artist") {
        return await searchArtist(query, page);
    }
}

async function getAlbumInfo(albumItem, page) {
    let res = (
        await axios_1.default.get(
            "https://m.ting13.com" + albumItem.id + "?p=" + page,
            {
                headers: headers,
            }
        )
    ).data;

    let $ = cheerio_1.default.load(res);
    res = $(".play-list li");

    return {
        isEnd: $("span.pg-next").text().match("尾 页") != null,
        musicList: res
            .map(function () {
                return {
                    id: $("a", this).attr("href"),
                    artwork: albumItem.artwork,
                    title: $("a", this).attr("title"),
                    artist: albumItem.artist,
                    album: albumItem.title,
                    description: albumItem.description,
                };
            })
            .toArray(),
    };
}

async function getArtistWorks(artistItem, page, type) {
    if (type === "album") {
        const res = (
            await axios_1.default.get(
                "https://m.ting13.com/api/ajax/solist?word=" +
                    artistItem.id +
                    "&type=name&page=" +
                    page +
                    "&order=1",
                {
                    headers: headers,
                }
            )
        ).data;

        return {
            isEnd: page * 10 >= res.cnum,
            data: res.data.map(formatAlbumItem),
        };
    }
}

async function getLyric(musicItem) {
    // 用小说简介代替
    return {
        rawLrc: musicItem.description,
    };
}

async function getMediaSource(musicItem, quality) {
    let res = await axios_1.default.get("https://m.ting13.com" + musicItem.id, {
        headers: headers,
    });

    // 测试环境需要带上的Cookie，生产环境不需要
    // let get_co = res.headers["set-cookie"]
    //     .join(";")
    //     .match(/(PHPSESSID=.*?);/)[1];
    res = res.data;

    let $ = cheerio_1.default.load(res);
    let nid = $("meta[name='_b']").attr("content");
    let cid = $("meta[name='_p']").attr("content");
    let mo = $("meta[name='_f']").attr("content");
    let sc = $("meta[name='_c']").attr("content");
    let data = "nid=" + nid + "&cid=" + cid + "&mo=" + mo;

    res = (
        await axios_1.default.post("https://m.ting13.com/api/mapi/play", data, {
            headers: {
                authority: "m.ting13.com",
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
                sc: sc,
                // Cookie: get_co,
                "user-agent":
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
            },
        })
    ).data;

    return {
        url: res.url,
        // 测试下可否播放m3u8格式，可惜了，不能播放，因为好多音频格式是m3u8，看大佬是否会加，如果可以，到时候再弄个电台系列，就完美了。
        // url: "https://pull-l3-cny.douyincdn.com/live/5f3b8de5129f8de27074e2f8c9ffe8db.m3u8"
    };
}

module.exports = {
    platform: "听书_ting13",
    version: "0.1.0",
    appVersion: ">0.1.0-alpha.0",
    cacheControl: "no-cache",
    desc: "本插件只用于学习交流，所有内容均来自m.ting13.com，请在24小时之内删除！",
    search,
    getAlbumInfo,
    getArtistWorks,
    getLyric,
    getMediaSource,
    getRecommendSheetTags,
    getRecommendSheetsByTag,
    getMusicSheetInfo,
};

// /** 测试单元 **/
// // 搜索关键字("我师兄实在")
// searchAlbum("我师兄实在", 1).then((res) => {
//     console.log(res);
// });

// // 获取书籍播放列表(专辑)
// getAlbumInfo(
//     {
//         id: "/youshengxiaoshuo/21037/",
//         artist: "言归正传",
//         title: "我师兄实在太稳健了",
//         artwork:
//             "https://image.itingshu.net/cover/yousheng/033a680e41cb1162e9af7900c50e45f0.gif",
//         description:
//             "重生在封神大战之前的上古时代，李长寿成了一个小小的练气士，没有什么气运加身，也不是什么注定的大劫之子，他只有一个想要长生不老的修仙梦。\r\n" +
//             "为了能在残酷的洪荒安身立命，他努力不沾因果，杀人必扬其灰，凡事谋而后动，从不轻易步入危险之中。\r\n" +
//             "藏底牌，修遁术，炼丹毒，掌神通，不动稳如老狗，一动石破天惊，动后悄声走人。\r\n" +
//             "本来李长寿规划中，自己会一直躲在山中平安无事的修行成仙，直到有一年，他的老师父静极思动，又给他……收了个师妹回来……",
//     },
//     1
// ).then((res) => {
//     console.log(res);
// });

// // 获取最终播放地址
// getMediaSource({
//     id: "/play/21037_1_125481.html",
//     artwork:
//         "https://image.itingshu.net/cover/yousheng/033a680e41cb1162e9af7900c50e45f0.gif",
//     title: "我师兄实在太稳健了有声小说 第1集在线收听",
//     artist: "言归正传",
//     album: "我师兄实在太稳健了",
// }).then((res) => {
//     console.log(res);
// });

// // 因为有点熟练了，所以一波流把推荐榜、搜索播音员、播音员专辑，歌词功能写了，直接通过，那就没测试。
