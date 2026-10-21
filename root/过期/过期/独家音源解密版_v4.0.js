/*!
 * @name 独家音源 [解密版]
 * @description 音源更新，关注微信公众号：洛雪科技
 * @version 4
 * @author 洛雪科技&TSS
 * @repository https://github.com/lxmusics/lx-music-api-server
 */

/*!
 * @deobfuscated by Toskysun
 * 此文件为完整解密版本，耗时耗力
 */

;(function() {
    'use strict';

    if (typeof globalThis === "undefined") {
        if (typeof window !== "undefined") {
            globalThis = window;
        } else if (typeof global !== "undefined") {
            globalThis = global;
        } else {
            globalThis = this;
        }
    }

    if (typeof exports !== "undefined") {
        globalThis.exports = exports;
    }
    if (typeof require !== "undefined") {
        globalThis.require = require;
    }
    if (typeof module !== "undefined") {
        globalThis.module = module;
    }
    if (typeof __filename !== "undefined") {
        globalThis.__filename = __filename;
    }
    if (typeof __dirname !== "undefined") {
        globalThis.__dirname = __dirname;
    }


    var API_URL = 'https://88.lxmusic.xn--fiqs8s';

    var API_KEY = 'lxmusic';

    var SECRET_KEY = 'JaJ?a7Nwk_Fgj?2o:znAkst';

    var SCRIPT_MD5 = '1888f9865338afe6d5534b35171c61a4';

    var version = 4;

    var DEV_ENABLE = false;

    var UPDATE_ENABLE = true;

    var EVENT_NAMES = {
        request: 'request',
        inited: 'inited',
        updateAlert: 'updateAlert'
    };

    var MUSIC_SOURCE = {
        kw: {
            name: 'kw',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires']
        },
        mg: {
            name: 'mg',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires']
        },
        kg: {
            name: 'kg',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master']
        },
        tx: {
            name: 'tx',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master']
        },
        wy: {
            name: 'wy',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'master']
        }
    };

    var MUSIC_QUALITY = ['128k', '320k', 'flac', 'flac24bit', 'hires', 'atmos', 'atmos_plus', 'master'];

    var httpFetch = null;
    var request = null;
    var utils = null;
    var lx = null;
    var env = null;
    var send = null;
    var on = null;

    /**
     * SHA256哈希算法实现
     * @see https://github.com/emn178/js-sha256
     * @version 0.11.0
     * @author Chen, Yi-Cyuan
     * @license MIT
     */

    var sha256 = (function() {
        var ERROR = 'input is invalid type';
        var ARRAY_BUFFER = typeof ArrayBuffer !== 'undefined';
        var HEX_CHARS = '0123456789abcdef'.split('');
        var EXTRA = [-2147483648, 8388608, 32768, 128];
        var SHIFT = [24, 16, 8, 0];

        // SHA256 K常量
        var K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];

        var blocks = [];

        function Sha256(is224, sharedMemory) {
            if (sharedMemory) {
                blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
                blocks[4] = blocks[5] = blocks[6] = blocks[7] =
                blocks[8] = blocks[9] = blocks[10] = blocks[11] =
                blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
                this.blocks = blocks;
            } else {
                this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }

            if (is224) {
                this.h0 = 0xc1059ed8;
                this.h1 = 0x367cd507;
                this.h2 = 0x3070dd17;
                this.h3 = 0xf70e5939;
                this.h4 = 0xffc00b31;
                this.h5 = 0x68581511;
                this.h6 = 0x64f98fa7;
                this.h7 = 0xbefa4fa4;
            } else {
                this.h0 = 0x6a09e667;
                this.h1 = 0xbb67ae85;
                this.h2 = 0x3c6ef372;
                this.h3 = 0xa54ff53a;
                this.h4 = 0x510e527f;
                this.h5 = 0x9b05688c;
                this.h6 = 0x1f83d9ab;
                this.h7 = 0x5be0cd19;
            }

            this.block = this.start = this.bytes = this.hBytes = 0;
            this.finalized = this.hashed = false;
            this.first = true;
            this.is224 = is224;
        }

        Sha256.prototype.update = function(message) {
            if (this.finalized) {
                return;
            }
            var notString, type = typeof message;
            if (type !== 'string') {
                if (type === 'object') {
                    if (message === null) {
                        throw new Error(ERROR);
                    } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
                        message = new Uint8Array(message);
                    } else if (!Array.isArray(message)) {
                        if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                            throw new Error(ERROR);
                        }
                    }
                } else {
                    throw new Error(ERROR);
                }
                notString = true;
            }
            var code, index = 0, i, length = message.length, blocks = this.blocks;

            while (index < length) {
                if (this.hashed) {
                    this.hashed = false;
                    blocks[0] = this.block;
                    blocks[16] = blocks[1] = blocks[2] = blocks[3] =
                    blocks[4] = blocks[5] = blocks[6] = blocks[7] =
                    blocks[8] = blocks[9] = blocks[10] = blocks[11] =
                    blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
                }

                if (notString) {
                    for (i = this.start; index < length && i < 64; ++index) {
                        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                    }
                } else {
                    for (i = this.start; index < length && i < 64; ++index) {
                        code = message.charCodeAt(index);
                        if (code < 0x80) {
                            blocks[i >> 2] |= code << SHIFT[i++ & 3];
                        } else if (code < 0x800) {
                            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                        } else if (code < 0xd800 || code >= 0xe000) {
                            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                        } else {
                            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
                            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                        }
                    }
                }

                this.lastByteIndex = i;
                this.bytes += i - this.start;
                if (i >= 64) {
                    this.block = blocks[16];
                    this.start = i - 64;
                    this.hash();
                    this.hashed = true;
                } else {
                    this.start = i;
                }
            }
            if (this.bytes > 4294967295) {
                this.hBytes += this.bytes / 4294967296 << 0;
                this.bytes = this.bytes % 4294967296;
            }
            return this;
        };

        Sha256.prototype.finalize = function() {
            if (this.finalized) {
                return;
            }
            this.finalized = true;
            var blocks = this.blocks, i = this.lastByteIndex;
            blocks[16] = this.block;
            blocks[i >> 2] |= EXTRA[i & 3];
            this.block = blocks[16];
            if (i >= 56) {
                if (!this.hashed) {
                    this.hash();
                }
                blocks[0] = this.block;
                blocks[16] = blocks[1] = blocks[2] = blocks[3] =
                blocks[4] = blocks[5] = blocks[6] = blocks[7] =
                blocks[8] = blocks[9] = blocks[10] = blocks[11] =
                blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            }
            blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
            blocks[15] = this.bytes << 3;
            this.hash();
        };

        Sha256.prototype.hash = function() {
            var a = this.h0, b = this.h1, c = this.h2, d = this.h3,
                e = this.h4, f = this.h5, g = this.h6, h = this.h7,
                blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

            for (j = 16; j < 64; ++j) {
                t1 = blocks[j - 15];
                s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
                t1 = blocks[j - 2];
                s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
                blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
            }

            bc = b & c;
            for (j = 0; j < 64; j += 4) {
                if (this.first) {
                    if (this.is224) {
                        ab = 300032;
                        t1 = blocks[0] - 1413257819;
                        h = t1 - 150054599 << 0;
                        d = t1 + 24177077 << 0;
                    } else {
                        ab = 704751109;
                        t1 = blocks[0] - 210244248;
                        h = t1 - 1521486534 << 0;
                        d = t1 + 143694565 << 0;
                    }
                    this.first = false;
                } else {
                    s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
                    s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
                    ab = a & b;
                    maj = ab ^ (a & c) ^ bc;
                    ch = (e & f) ^ (~e & g);
                    t1 = h + s1 + ch + K[j] + blocks[j];
                    t2 = s0 + maj;
                    h = d + t1 << 0;
                    d = t1 + t2 << 0;
                }
                s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
                s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
                da = d & a;
                maj = da ^ (d & b) ^ ab;
                ch = (h & e) ^ (~h & f);
                t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
                t2 = s0 + maj;
                g = c + t1 << 0;
                c = t1 + t2 << 0;
                s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
                s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
                cd = c & d;
                maj = cd ^ (c & a) ^ da;
                ch = (g & h) ^ (~g & e);
                t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
                t2 = s0 + maj;
                f = b + t1 << 0;
                b = t1 + t2 << 0;
                s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
                s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
                bc = b & c;
                maj = bc ^ (b & d) ^ cd;
                ch = (f & g) ^ (~f & h);
                t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
                t2 = s0 + maj;
                e = a + t1 << 0;
                a = t1 + t2 << 0;
            }

            this.h0 = this.h0 + a << 0;
            this.h1 = this.h1 + b << 0;
            this.h2 = this.h2 + c << 0;
            this.h3 = this.h3 + d << 0;
            this.h4 = this.h4 + e << 0;
            this.h5 = this.h5 + f << 0;
            this.h6 = this.h6 + g << 0;
            this.h7 = this.h7 + h << 0;
        };

        Sha256.prototype.hex = function() {
            this.finalize();

            var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3,
                h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;

            var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
                HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
                HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
                HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
                HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
                HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
                HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
                HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
                HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
                HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
                HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
                HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
                HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
                HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
                HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
                HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
                HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
                HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
                HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
                HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
                HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
                HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
                HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
                HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
                HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
                HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
                HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
                HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
            if (!this.is224) {
                hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
                    HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
                    HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
                    HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
            }
            return hex;
        };

        Sha256.prototype.toString = Sha256.prototype.hex;

        Sha256.prototype.digest = function() {
            this.finalize();

            var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3,
                h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;

            var arr = [
                (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
                (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
                (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
                (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
                (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
                (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
                (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
            ];
            if (!this.is224) {
                arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
            }
            return arr;
        };

        Sha256.prototype.array = Sha256.prototype.digest;

        Sha256.prototype.arrayBuffer = function() {
            this.finalize();

            var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
            var dataView = new DataView(buffer);
            dataView.setUint32(0, this.h0);
            dataView.setUint32(4, this.h1);
            dataView.setUint32(8, this.h2);
            dataView.setUint32(12, this.h3);
            dataView.setUint32(16, this.h4);
            dataView.setUint32(20, this.h5);
            dataView.setUint32(24, this.h6);
            if (!this.is224) {
                dataView.setUint32(28, this.h7);
            }
            return buffer;
        };

        function createMethod(is224) {
            var method = function(message) {
                return new Sha256(is224, true).update(message).hex();
            };
            return method;
        }

        return createMethod(false);
    })();

    /**
     * 异步生成器步进函数
     */
    var asyncGeneratorStep = function(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    };

    /**
     * 异步函数转换器
     */
    var _asyncToGenerator = function(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise(function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            });
        };
    };

    var musicSources = {};

    /**
     * 检查脚本更新
     * @returns {Promise<Object>} 更新信息
     */
    var checkUpdate = function() {
        return new Promise(function(resolve, reject) {
            var url = API_URL + '/script?key=' + API_KEY + '&checkUpdate=';

            httpFetch(url, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'user-agent': 'lx-music-mobile/2.0.0'
                }
            }, function(err, resp, body) {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    var data = typeof body === 'string' ? JSON.parse(body) : body;
                    if (data && data.version && data.version > version) {
                        resolve({
                            hasUpdate: true,
                            version: data.version,
                            log: data.log || '',
                            updateUrl: data.updateUrl || ''
                        });
                    } else {
                        resolve({ hasUpdate: false });
                    }
                } catch (e) {
                    resolve({ hasUpdate: false });
                }
            });
        });
    };

    /**
     * 生成请求签名
     */
    var generateSign = function(requestPath) {
        var signInput = requestPath + SCRIPT_MD5 + SECRET_KEY;
        return sha256(signInput);
    };

    /**
     * 获取音乐播放URL
     */
    var handleGetMusicUrl = function(musicInfo, quality) {
        return new Promise(function(resolve, reject) {
            var source = musicInfo.source;
            var songmid = musicInfo.songmid || musicInfo.hash || musicInfo.copyrightId;

            // 构建请求路径
            var requestPath = '/lxmusicv4/url/' + source + '/' + songmid + '/' + quality;

            // 生成签名
            var sign = generateSign(requestPath);
            var url = API_URL + requestPath + '?sign=' + sign;

            // LX Music的request使用回调方式
            httpFetch(url, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'x-request-key': 'lxmusic',
                    'user-agent': 'lx-music-mobile/2.0.0'
                }
            }, function(err, resp, body) {
                if (err) {
                    console.error('[独家音源] 请求失败:', err);
                    reject(err);
                    return;
                }

                // 获取响应数据
                var statusCode = resp ? (resp.statusCode || resp.status || 200) : 200;
                var responseBody = body || (resp ? resp.body : null);

                // 先检查HTTP状态码
                if (statusCode === 404) {
                    console.error('[独家音源] API端点不存在 (404)');
                    reject(new Error('API端点不存在，请检查API_URL配置'));
                    return;
                }

                if (statusCode >= 500) {
                    console.error('[独家音源] 服务器错误 (' + statusCode + ')');
                    reject(new Error('服务器错误 (HTTP ' + statusCode + ')'));
                    return;
                }

                if (!responseBody) {
                    console.error('[独家音源] 响应体为空');
                    reject(new Error('服务器返回空响应'));
                    return;
                }

                try {
                    var data = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;

                    // 检查响应是否有效
                    if (!data || isNaN(Number(data.code))) {
                        throw new Error('响应格式错误: 无效的响应数据');
                    }

                    // 根据状态码处理响应
                    switch (data.code) {
                        case 0:
                        case 200:
                            // 优先使用 data.data，其次使用 data.url
                            var musicUrl = data.data || data.url;
                            if (musicUrl) {
                                resolve(musicUrl);
                            } else {
                                console.error('[独家音源] 响应中未找到URL字段:', data);
                                reject(new Error('响应中未找到有效的URL'));
                            }
                            break;
                        case 403:
                            console.error('[独家音源] 鉴权失败:', data.msg || 'Key失效');
                            reject(new Error('Key失效/鉴权失败'));
                            break;
                        case 429:
                            console.error('[独家音源] 请求过频:', data.msg || '请求过于频繁');
                            reject(new Error('请求过速，请稍后再试'));
                            break;
                        case 500:
                            console.error('[独家音源] 服务器错误:', data.msg || data.message);
                            reject(new Error('服务器错误: ' + (data.msg || data.message || '未知错误')));
                            break;
                        default:
                            console.error('[独家音源] 未知错误码:', data.code, data.msg || data.message);
                            reject(new Error(data.msg || data.message || '未知错误'));
                    }
                } catch (e) {
                    console.error('[独家音源] 处理响应失败:', e.message);
                    reject(new Error('处理响应失败: ' + e.message));
                }
            });
        });
    };


    /**
     * Base64编码
     */
    var handleBase64Encode = function(str) {
        if (typeof btoa !== 'undefined') {
            return btoa(unescape(encodeURIComponent(str)));
        }
        // Node.js环境
        return Buffer.from(str, 'utf-8').toString('base64');
    };

    (function init() {
        var _globalThis = globalThis;
        lx = _globalThis.lx;

        if (!lx) {
            console.error('[独家音源] 未检测到LX Music环境');
            return;
        }

        // 脚本MD5服务器验证
        console.log('[独家音源] 脚本MD5(硬编码):', SCRIPT_MD5);

        // 获取工具函数
        httpFetch = lx.request;
        request = lx.request;
        utils = lx.utils;
        env = lx.env;
        send = lx.send;
        on = lx.on;

        // 注册事件监听
        if (on) {
            on(EVENT_NAMES.request, function(req) {
                return new Promise(function(resolve, reject) {
                    var action = req.action;
                    var source = req.source;
                    var info = req.info;

                    if (action === 'musicUrl') {
                        // info.musicInfo 包含实际的歌曲信息
                        var musicInfo = info.musicInfo || info;

                        handleGetMusicUrl({
                            source: source,
                            songmid: musicInfo.songmid || musicInfo.hash || musicInfo.copyrightId
                        }, info.type)
                            .then(resolve)
                            .catch(reject);
                    } else {
                        reject(new Error('Unsupported action: ' + action));
                    }
                });
            });
        }

        // 发送初始化完成事件
        if (send) {
            send(EVENT_NAMES.inited, {
                sources: MUSIC_SOURCE,
                openDevTools: DEV_ENABLE
            });
        }

        // 检查更新
        if (UPDATE_ENABLE) {
            checkUpdate().then(function(updateInfo) {
                if (updateInfo && updateInfo.hasUpdate) {
                    console.log('[独家音源] 发现新版本:', updateInfo.version);
                    if (send) {
                        send(EVENT_NAMES.updateAlert, {
                            log: updateInfo.log,
                            updateUrl: updateInfo.updateUrl
                        });
                    }
                }
            }).catch(function(err) {
                console.error('[独家音源] 检查更新失败:', err.message);
            });
        }

        console.log('[独家音源] 初始化完成, 版本:', version);
    })();

    var exportModule = {
        name: '[独家音源]',
        description: '音源更新，关注微信公众号：洛雪科技',
        version: version,
        author: '洛雪科技&TSS',
        homepage: 'https://github.com/lxmusics/lx-music-api-server',

        API_URL: API_URL,
        API_KEY: API_KEY,
        SECRET_KEY: SECRET_KEY,
        SCRIPT_MD5: SCRIPT_MD5,

        sources: MUSIC_SOURCE,

        musicSources: musicSources,
        handleGetMusicUrl: handleGetMusicUrl,
        handleBase64Encode: handleBase64Encode,
        checkUpdate: checkUpdate,
        generateSign: generateSign,

        sha256: sha256,

        send: send,
        on: on
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = exportModule;
    }

    globalThis.MUSIC_SOURCE = exportModule;

})();