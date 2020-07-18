window["Mark"] = function Mark() {
    this.id = "";
    this.selection_text = "";
    this.has_selection = false;
    this.color = "";
    this.selection_info = "";
    this.readonly = false;
    this.type = "";
};
var k = void 0, r = !0, s = null, z = !1;

function B() {
    return function () {
    };
}

function aa(f) {
    return function () {
        return f;
    };
}

var F, FLOWPAPER = window.FLOWPAPER ? window.FLOWPAPER : window.FLOWPAPER = {}, ba = 1, ca = ba;
FLOWPAPER.Pf = function () {
    var f = [];
    return {
        fl: function (c) {
            f.push(c);
        }, notify: function (c, d) {
            for (var e = 0, g = f.length; e < g; e++) {
                var m = f[e];
                if (m[c]) {
                    m[c](d);
                }
            }
        }
    };
}();

function da(f) {
    ca >= ba && FLOWPAPER.Pf.notify("warn", f);
}

function J(f, c, d, e) {
    try {
        throw Error();
    } catch (g) {
        g.stack && g.stack.split("\n").slice(2);
    }
    FLOWPAPER.Pf.notify("error", f);
    d && c && (e ? jQuery("#" + d).trigger(c, e) : jQuery("#" + d).trigger(c));
    throw Error(f);
}

FLOWPAPER.Dg = {
    init: function () {
        if ("undefined" == typeof eb || !eb) {
            eb = {};
        }
        var f = navigator.userAgent.toLowerCase(), c = location.hash.substr(1), d = z, e = "";
        0 <= c.indexOf("mobilepreview=") && (d = r, e = c.substr(c.indexOf("mobilepreview=")).split("&")[0].split("=")[1]);
        var g;
        try {
            g = "ontouchstart" in document.documentElement;
        } catch (m) {
            g = z;
        }
        if (!g && (f.match(/iphone/i) || f.match(/ipod/i) || f.match(/ipad/i))) {
            d = r;
        }
        c = eb;
        g = /win/.test(f);
        var n = /mac/.test(f), l;
        if (!(l = d)) {
            var q;
            try {
                q = "ontouchstart" in document.documentElement;
            } catch (h) {
                q = z;
            }
            l = q || f.match(/touch/i) || navigator.Sj || navigator.msPointerEnabled;
        }
        c.platform = {
            win: g,
            mac: n,
            touchdevice: l,
            ios: d && ("ipad" == e || "iphone" == e) || f.match(/iphone/i) || f.match(/ipod/i) || f.match(/ipad/i),
            android: d && "android" == e || -1 < f.indexOf("android"),
            Md: d && ("ipad" == e || "iphone" == e) || navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 6_\d/i),
            iphone: d && "iphone" == e || f.match(/iphone/i) || f.match(/ipod/i),
            ipad: d && "ipad" == e || f.match(/ipad/i),
            winphone: f.match(/Windows Phone/i) || f.match(/iemobile/i) || f.match(/WPDesktop/i),
            xk: f.match(/Windows NT/i) && f.match(/ARM/i) && f.match(/touch/i),
            Ih: navigator.Sj || navigator.msPointerEnabled,
            blackberry: f.match(/BlackBerry/i) || f.match(/BB10/i),
            webos: f.match(/webOS/i),
            Gi: -1 < f.indexOf("android") && !(jQuery(window).height() < jQuery(window).width()),
            mobilepreview: d,
            cb: window.devicePixelRatio ? window.devicePixelRatio : 1,
            bj: "undefined" !== typeof document && !!document.fonts
        };
        d = eb;
        e = document.createElement("div");
        e.innerHTML = "000102030405060708090a0b0c0d0e0f";
        d.oc = e;
        eb.platform.touchonlydevice = eb.platform.touchdevice && (eb.platform.android || eb.platform.ios || eb.platform.blackberry || eb.platform.webos) || eb.platform.winphone || eb.platform.xk;
        eb.platform.Bb = eb.platform.touchonlydevice && (eb.platform.iphone || eb.platform.Gi || eb.platform.blackberry);
        eb.platform.ios && (d = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), d != s && 1 < d.length ? (eb.platform.iosversion = parseInt(d[1], 10), eb.platform.Md = 6 <= eb.platform.iosversion) : eb.platform.Md = r);
        eb.browser = {
            version: (f.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)(?!.+opera)/) || [])[1],
            Mb: (f.match(/.+?(?:version|chrome|firefox|opera|msie|OPR)[\/: ]([\d.]+)(?!.+opera)/) || [])[1],
            safari: (/webkit/.test(f) || /applewebkit/.test(f)) && !/chrome/.test(f),
            opera: /opera/.test(f),
            msie: /msie/.test(f) && !/opera/.test(f) && !/applewebkit/.test(f),
            ic: ("Netscape" == navigator.appName && /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) != s || 0 < f.indexOf("edge/")) && !/opera/.test(f),
            mozilla: /mozilla/.test(f) && !/(compatible|webkit)/.test(f),
            chrome: /chrome/.test(f),
            Pl: window.innerHeight > window.innerWidth
        };
        eb.browser.detected = eb.browser.safari || eb.browser.opera || eb.browser.msie || eb.browser.mozilla || eb.browser.seamonkey || eb.browser.chrome || eb.browser.ic;
        if (!eb.browser.detected || !eb.browser.version) {
            eb.browser.chrome = r, eb.browser.version = "500.00";
        }
        if (eb.browser.msie) {
            var f = eb.browser, A;
            try {
                A = !!new ActiveXObject("htmlfile");
            } catch (D) {
                A = z;
            }
            f.Ol = A && "Win64" == navigator.platform && document.documentElement.clientWidth == screen.width;
        }
        eb.browser.version && 1 < eb.browser.version.match(/\./g).length && (eb.browser.version = eb.browser.version.substr(0, eb.browser.version.indexOf(".", eb.browser.version.indexOf("."))));
        eb.browser.Mb && 1 < eb.browser.Mb.match(/\./g).length && (eb.browser.Mb = eb.browser.Mb.substr(0, eb.browser.Mb.indexOf(".", eb.browser.Mb.indexOf("."))));
        A = eb.browser;
        var f = !eb.platform.touchonlydevice || eb.platform.android && !window.annotations || eb.platform.Md && !window.annotations || eb.platform.ios && 6.99 <= eb.platform.iosversion && !window.annotations,
            d = eb.browser.mozilla && 4 <= eb.browser.version.split(".")[0] || eb.browser.chrome && 535 <= eb.browser.version.split(".")[0] || eb.browser.msie && 10 <= eb.browser.version.split(".")[0] || eb.browser.safari && 534 <= eb.browser.version.split(".")[0],
            e = document.documentElement.requestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullScreen,
            w;
        try {
            w = !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
        } catch (t) {
            w = z;
        }
        A.Da = {Ia: f, wk: d, bn: e, kn: w};
        if (eb.browser.msie) {
            w = eb.browser;
            var x;
            try {
                /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) != s && (rv = parseFloat(RegExp.$1)), x = rv;
            } catch (v) {
                x = -1;
            }
            w.version = x;
        }
    }
};
var S = "Portrait", T = "BookView", V = "TwoPage", ea = "FlipView", W = "ThumbView", X = "SinglePage";

function fa(f) {
    f.getContext("2d").clearRect(0, 0, f.width, f.height);
}

function Y() {
    for (var f = eb.Sg.innerHTML, c = [], d = 0; "\n" != f.charAt(d) && d < f.length;) {
        for (var e = 0, g = 6; 0 <= g; g--) {
            " " == f.charAt(d) && (e |= Math.pow(2, g)), d++;
        }
        c.push(String.fromCharCode(e));
    }
    return c.join("");
}

function ha(f, c, d) {
    this.g = f;
    this.fc = c;
    this.containerId = d;
    this.scroll = function () {
        var c = this;
        jQuery(this.fc).bind("mousedown", function (d) {
            if (c.g.Sa || f.Hc && f.Hc() || jQuery("*:focus").hasClass("flowpaper_textarea_contenteditable") || jQuery("*:focus").hasClass("flowpaper_note_textarea")) {
                return d.returnValue = z, r;
            }
            if (c.g.va) {
                return r;
            }
            c.uk(c.fc);
            c.Bf = d.pageY;
            c.Af = d.pageX;
            return z;
        });
        jQuery(this.fc).bind("mousemove", function (d) {
            return c.Wi(d);
        });
        this.g.Zh || (jQuery(this.containerId).bind("mouseout", function (d) {
            c.nj(d);
        }), jQuery(this.containerId).bind("mouseup", function () {
            c.Bh();
        }), this.g.Zh = r);
    };
    this.Wi = function (c) {
        if (!this.g.jf) {
            return r;
        }
        this.g.kg != this.fc && (this.Bf = c.pageY, this.Af = c.pageX, this.g.kg = this.fc);
        this.scrollTo(this.Af - c.pageX, this.Bf - c.pageY);
        this.Bf = c.pageY;
        this.Af = c.pageX;
        return z;
    };
    this.uk = function (c) {
        this.g.jf = r;
        this.g.kg = c;
        jQuery(this.fc).removeClass("flowpaper_grab");
        jQuery(this.fc).addClass("flowpaper_grabbing");
    };
    this.nj = function (c) {
        0 == jQuery(this.g.r).has(c.target).length && this.Bh();
    };
    this.Bh = function () {
        this.g.jf = z;
        jQuery(this.fc).removeClass("flowpaper_grabbing");
        jQuery(this.fc).addClass("flowpaper_grab");
    };
    this.scrollTo = function (c, d) {
        var m = jQuery(this.containerId).scrollLeft() + c, f = jQuery(this.containerId).scrollTop() + d;
        jQuery(this.containerId).scrollLeft(m);
        jQuery(this.containerId).scrollTop(f);
    };
}

function ia(f) {
    f = f.split(",").map(function (c) {
        a:if (/^-?\d+$/.test(c)) {
            c = parseInt(c, 10);
        } else {
            var d;
            if (d = c.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)) {
                c = d[1];
                var e = d[2];
                d = d[3];
                if (c && d) {
                    c = parseInt(c);
                    d = parseInt(d);
                    var g = [], m = c < d ? 1 : -1;
                    if ("-" == e || ".." == e || "\u2025" == e) {
                        d += m;
                    }
                    for (; c != d; c += m) {
                        g.push(c);
                    }
                    c = g;
                    break a;
                }
            }
            c = [];
        }
        return c;
    });
    return 0 === f.length ? [] : 1 === f.length ? Array.isArray(f[0]) ? f[0] : f : f.reduce(function (c, d) {
        Array.isArray(c) || (c = [c]);
        Array.isArray(d) || (d = [d]);
        return c.concat(d);
    });
}

function ja(f, c, d, e) {
    var g = f.createElement("node");
    g.setAttribute("pageNumber", ka(c, e));
    g.setAttribute("title", la(c.title));
    d.appendChild(g);
    if (c.items && c.items.length) {
        for (d = 0; d < c.items.length; d++) {
            ja(f, c.items[d], g, e);
        }
    }
}

function ka(f, c) {
    destRef = "string" === typeof f.dest ? c.destinations[f.dest][0] : f != s && f.dest != s ? f.dest[0] : s;
    return destRef instanceof Object ? c.Qd[destRef.num + " " + destRef.gen + " R"] + 1 : destRef + 1;
}

function ma(f, c) {
    if (eb.platform.bj) {
        var d = new FontFace(f, "url(data:" + c + ")", {});
        document.fonts.add(d);
    } else {
        d = '@font-face { font-family:"' + f + '";src:' + ("url(" + c + ");") + "}";
        if (window.styleElement) {
            e = window.styleElement;
        } else {
            var e = window.styleElement = document.createElement("style");
            e.id = "FLOWPAPER_FONT_STYLE_TAG";
            document.documentElement.getElementsByTagName("head")[0].appendChild(e);
        }
        e = e.sheet;
        e.insertRule(d, e.cssRules.length);
    }
}

function na(f) {
    function c(c, e) {
        var d, g, m, h, f;
        m = c & 2147483648;
        h = e & 2147483648;
        d = c & 1073741824;
        g = e & 1073741824;
        f = (c & 1073741823) + (e & 1073741823);
        return d & g ? f ^ 2147483648 ^ m ^ h : d | g ? f & 1073741824 ? f ^ 3221225472 ^ m ^ h : f ^ 1073741824 ^ m ^ h : f ^ m ^ h;
    }

    function d(e, d, g, m, h, f, n) {
        e = c(e, c(c(d & g | ~d & m, h), n));
        return c(e << f | e >>> 32 - f, d);
    }

    function e(e, d, g, m, h, f, n) {
        e = c(e, c(c(d & m | g & ~m, h), n));
        return c(e << f | e >>> 32 - f, d);
    }

    function g(e, d, g, m, h, f, n) {
        e = c(e, c(c(d ^ g ^ m, h), n));
        return c(e << f | e >>> 32 - f, d);
    }

    function m(e, d, g, m, h, f, n) {
        e = c(e, c(c(g ^ (d | ~m), h), n));
        return c(e << f | e >>> 32 - f, d);
    }

    function n(c) {
        var e = "", d = "", g;
        for (g = 0; 3 >= g; g++) {
            d = c >>> 8 * g & 255, d = "0" + d.toString(16), e += d.substr(d.length - 2, 2);
        }
        return e;
    }

    var l = [], q, h, A, D, w, t, x, v;
    f = function (c) {
        c = c.replace(/\r\n/g, "\n");
        for (var e = "", d = 0; d < c.length; d++) {
            var g = c.charCodeAt(d);
            128 > g ? e += String.fromCharCode(g) : (127 < g && 2048 > g ? e += String.fromCharCode(g >> 6 | 192) : (e += String.fromCharCode(g >> 12 | 224), e += String.fromCharCode(g >> 6 & 63 | 128)), e += String.fromCharCode(g & 63 | 128));
        }
        return e;
    }(f);
    l = function (c) {
        var e, d = c.length;
        e = d + 8;
        for (var g = 16 * ((e - e % 64) / 64 + 1), m = Array(g - 1), h = 0, f = 0; f < d;) {
            e = (f - f % 4) / 4, h = 8 * (f % 4), m[e] |= c.charCodeAt(f) << h, f++;
        }
        e = (f - f % 4) / 4;
        m[e] |= 128 << 8 * (f % 4);
        m[g - 2] = d << 3;
        m[g - 1] = d >>> 29;
        return m;
    }(f);
    w = 1732584193;
    t = 4023233417;
    x = 2562383102;
    v = 271733878;
    for (f = 0; f < l.length; f += 16) {
        q = w, h = t, A = x, D = v, w = d(w, t, x, v, l[f + 0], 7, 3614090360), v = d(v, w, t, x, l[f + 1], 12, 3905402710), x = d(x, v, w, t, l[f + 2], 17, 606105819), t = d(t, x, v, w, l[f + 3], 22, 3250441966), w = d(w, t, x, v, l[f + 4], 7, 4118548399), v = d(v, w, t, x, l[f + 5], 12, 1200080426), x = d(x, v, w, t, l[f + 6], 17, 2821735955), t = d(t, x, v, w, l[f + 7], 22, 4249261313), w = d(w, t, x, v, l[f + 8], 7, 1770035416), v = d(v, w, t, x, l[f + 9], 12, 2336552879), x = d(x, v, w, t, l[f + 10], 17, 4294925233), t = d(t, x, v, w, l[f + 11], 22, 2304563134), w = d(w, t, x, v, l[f + 12], 7, 1804603682), v = d(v, w, t, x, l[f + 13], 12, 4254626195), x = d(x, v, w, t, l[f + 14], 17, 2792965006), t = d(t, x, v, w, l[f + 15], 22, 1236535329), w = e(w, t, x, v, l[f + 1], 5, 4129170786), v = e(v, w, t, x, l[f + 6], 9, 3225465664), x = e(x, v, w, t, l[f + 11], 14, 643717713), t = e(t, x, v, w, l[f + 0], 20, 3921069994), w = e(w, t, x, v, l[f + 5], 5, 3593408605), v = e(v, w, t, x, l[f + 10], 9, 38016083), x = e(x, v, w, t, l[f + 15], 14, 3634488961), t = e(t, x, v, w, l[f + 4], 20, 3889429448), w = e(w, t, x, v, l[f + 9], 5, 568446438), v = e(v, w, t, x, l[f + 14], 9, 3275163606), x = e(x, v, w, t, l[f + 3], 14, 4107603335), t = e(t, x, v, w, l[f + 8], 20, 1163531501), w = e(w, t, x, v, l[f + 13], 5, 2850285829), v = e(v, w, t, x, l[f + 2], 9, 4243563512), x = e(x, v, w, t, l[f + 7], 14, 1735328473), t = e(t, x, v, w, l[f + 12], 20, 2368359562), w = g(w, t, x, v, l[f + 5], 4, 4294588738), v = g(v, w, t, x, l[f + 8], 11, 2272392833), x = g(x, v, w, t, l[f + 11], 16, 1839030562), t = g(t, x, v, w, l[f + 14], 23, 4259657740), w = g(w, t, x, v, l[f + 1], 4, 2763975236), v = g(v, w, t, x, l[f + 4], 11, 1272893353), x = g(x, v, w, t, l[f + 7], 16, 4139469664), t = g(t, x, v, w, l[f + 10], 23, 3200236656), w = g(w, t, x, v, l[f + 13], 4, 681279174), v = g(v, w, t, x, l[f + 0], 11, 3936430074), x = g(x, v, w, t, l[f + 3], 16, 3572445317), t = g(t, x, v, w, l[f + 6], 23, 76029189), w = g(w, t, x, v, l[f + 9], 4, 3654602809), v = g(v, w, t, x, l[f + 12], 11, 3873151461), x = g(x, v, w, t, l[f + 15], 16, 530742520), t = g(t, x, v, w, l[f + 2], 23, 3299628645), w = m(w, t, x, v, l[f + 0], 6, 4096336452), v = m(v, w, t, x, l[f + 7], 10, 1126891415), x = m(x, v, w, t, l[f + 14], 15, 2878612391), t = m(t, x, v, w, l[f + 5], 21, 4237533241), w = m(w, t, x, v, l[f + 12], 6, 1700485571), v = m(v, w, t, x, l[f + 3], 10, 2399980690), x = m(x, v, w, t, l[f + 10], 15, 4293915773), t = m(t, x, v, w, l[f + 1], 21, 2240044497), w = m(w, t, x, v, l[f + 8], 6, 1873313359), v = m(v, w, t, x, l[f + 15], 10, 4264355552), x = m(x, v, w, t, l[f + 6], 15, 2734768916), t = m(t, x, v, w, l[f + 13], 21, 1309151649), w = m(w, t, x, v, l[f + 4], 6, 4149444226), v = m(v, w, t, x, l[f + 11], 10, 3174756917), x = m(x, v, w, t, l[f + 2], 15, 718787259), t = m(t, x, v, w, l[f + 9], 21, 3951481745), w = c(w, q), t = c(t, h), x = c(x, A), v = c(v, D);
    }
    return (n(w) + n(t) + n(x) + n(v)).toLowerCase();
}

String.format = function () {
    for (var f = arguments[0], c = 0; c < arguments.length - 1; c++) {
        f = f.replace(RegExp("\\{" + c + "\\}", "gm"), arguments[c + 1]);
    }
    return f;
};

function oa(f, c) {
    return f.substr(f.length - c.length) === c;
}

jQuery.fn.wl = function (f, c) {
    return this.each(function () {
        jQuery(this).fadeIn(f, function () {
            eb.browser.msie ? jQuery(this).get(0).style.removeAttribute("filter") : "";
            "function" == typeof eval(c) ? eval(c)() : "";
        });
    });
};
jQuery.fn.$i = function (f) {
    this.each(function () {
        eb.browser.msie ? eval(f)() : jQuery(this).fadeOut(400, function () {
            eb.browser.msie ? jQuery(this).get(0).style.removeAttribute("filter") : "";
            "function" == typeof eval(f) ? eval(f)() : "";
        });
    });
};
jQuery.fn.Bm = function (f, c) {
    return this.each(function () {
        jQuery(this).data("retry") ? jQuery(this).data("retry", parseInt(jQuery(this).data("retry")) + 1) : jQuery(this).data("retry", 1);
        jQuery(this).data("retry") <= f ? this.src = this.src + (-1 < this.src.indexOf("?") ? "&" : "?") + "t=" + (new Date).getTime() : c();
    });
};
jQuery.fn.Kb = function (f, c) {
    if (0 <= jQuery.fn.jquery.indexOf("1.8")) {
        try {
            if (jQuery._data(this[0], "events") === k) {
                return z;
            }
        } catch (d) {
            return z;
        }
        var e = jQuery._data(this[0], "events")[f];
        if (e === k || 0 === e.length) {
            return z;
        }
        var g = 0;
    } else {
        if (this.data("events") === k) {
            return z;
        }
        e = this.data("events")[f];
        if (e === k || 0 === e.length) {
            return z;
        }
        g = 0;
    }
    for (; g < e.length; g++) {
        if (e[g].handler == c) {
            return r;
        }
    }
    return z;
};
jQuery.fn.en = function (f) {
    if (this.data("events") === k) {
        return z;
    }
    var c = this.data("events")[f];
    if (c === k || 0 === c.length) {
        return z;
    }
    for (var d = 0; d < c.length; d++) {
        jQuery(this).unbind(f, c[d].handler);
    }
    return z;
};
jQuery.fn.hm = function () {
    eb.browser.Da.Ia ? this.scrollTo(ce, 0, {axis: "xy", offset: -30}) : this.data("jsp").scrollToElement(ce, z);
};

function pa(f) {
    var c;
    eb.platform.touchdevice && "undefined" !== typeof f.originalEvent.touches && (f = f.originalEvent.touches[0]);
    f || (f = window.event);
    f.target ? c = f.target : f.srcElement && (c = f.srcElement);
    3 == c.nodeType && (c = c.parentNode);
    var d = f.pageX - jQuery(c).offset().left;
    f = f.pageY - jQuery(c).offset().top;
    return {x: d, y: f};
}

function la(f) {
    return f.split("").map(function (c) {
        var d = c.charCodeAt(0);
        if (127 < d) {
            return c = d.toString(16), "\\u" + (Array(5 - c.length).join("0") + c);
        }
        31 >= d && (c = "");
        "\n" == c && (c = "");
        "\r" == c && (c = "");
        "\b" == c && (c = "");
        "\t" == c && (c = "");
        "\f" == c && (c = "");
        "\b" == c && (c = "");
        return c;
    }).join("");
}

function qa(f) {
    return f.split("").reverse().join("");
}

jQuery.fn.wm = function (f, c) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid transparent", f),
        "border-top": String.format("{0}px solid transparent", f),
        "border-right": String.format("{0}px solid {1}", f, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    this.unbind("mouseover");
    this.unbind("mouseout");
    eb.platform.touchonlydevice || (this.on("mouseover", function (c) {
        jQuery(c.target).css({"border-right": String.format("{0}px solid {1}", f, "#DEDEDE")});
    }), this.on("mouseout", function (d) {
        jQuery(d.target).css({"border-right": String.format("{0}px solid {1}", f, c)});
    }));
};
jQuery.fn.xm = function (f, c, d) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid {1}", f, c),
        "border-top": String.format("{0}px solid {1}", f, c),
        "border-left": String.format("1px solid {1}", f, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    this.on("mouseover", function (c) {
        jQuery(d).trigger("mouseover");
        jQuery(c.target).css({
            "border-left": String.format("1px solid {1}", f, "#DEDEDE"),
            "border-bottom": String.format("{0}px solid {1}", f, "#DEDEDE"),
            "border-top": String.format("{0}px solid {1}", f, "#DEDEDE")
        });
    });
    this.on("mouseout", function (e) {
        jQuery(d).trigger("mouseout");
        jQuery(e.target).css({
            "border-left": String.format("1px solid {1}", f, c),
            "border-bottom": String.format("{0}px solid {1}", f, c),
            "border-top": String.format("{0}px solid {1}", f, c)
        });
    });
};
jQuery.fn.Zj = function (f) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid transparent", f),
        "border-top": String.format("{0}px solid transparent", f),
        "border-left": String.format("{0}px solid {1}", f, "#AAAAAA"),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    this.css({opacity: 0.5});
    this.unbind("mouseover");
    this.unbind("mouseout");
    this.on("mouseover", function (c) {
        jQuery(c.target).css({"border-left": String.format("{0}px solid {1}", f, "#FFFFFF"), opacity: 0.85});
    });
    this.on("mouseout", function (c) {
        jQuery(c.target).css({"border-left": String.format("{0}px solid {1}", f, "#AAAAAA")});
        jQuery(c.target).css({opacity: 0.5});
    });
};
jQuery.fn.ym = function (f, c, d) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid {1}", f, c),
        "border-top": String.format("{0}px solid {1}", f, c),
        "border-right": String.format("1px solid {1}", f, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    this.on("mouseover", function (c) {
        jQuery(d).trigger("mouseover");
        jQuery(c.target).css({
            "border-right": String.format("1px solid {1}", f, "#DEDEDE"),
            "border-top": String.format("{0}px solid {1}", f, "#DEDEDE"),
            "border-bottom": String.format("{0}px solid {1}", f, "#DEDEDE")
        });
    });
    this.on("mouseout", function (e) {
        jQuery(d).trigger("mouseout");
        jQuery(e.target).css({
            "border-right": String.format("1px solid {1}", f, c),
            "border-top": String.format("{0}px solid {1}", f, c),
            "border-bottom": String.format("{0}px solid {1}", f, c)
        });
    });
};
jQuery.fn.cl = function (f) {
    return this[0].classList ? (this[0].classList.add(f), this) : this.addClass(f);
};
jQuery.fn.um = function (f) {
    return this[0].classList ? (this[0].classList.remove(f), this) : this.addClass(f);
};
jQuery.fn.Gg = function () {
    this.css({display: "none"});
};
jQuery.fn.Cf = function () {
    this.css({display: "block"});
};
window.ak = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (f) {
    window.setTimeout(f, 1000 / 60);
};
jQuery.fn.Hl = function () {
    var f = this.css("transform");
    return f && "none" != f && ("0px,0px" != f.translate || 1 != parseFloat(f.scale)) ? r : z;
};

function ra(f, c) {
    var d = "0", e = f += "";
    if (d == s || 1 > d.length) {
        d = " ";
    }
    if (f.length < c) {
        for (var e = "", g = 0; g < c - f.length; g++) {
            e += d;
        }
        e += f;
    }
    return e;
}

jQuery.fn.spin = function (f) {
    this.each(function () {
        var c = jQuery(this), d = c.data();
        d.Ef && (d.Ef.stop(), delete d.Ef);
        f !== z && (d.Ef = (new Spinner(jQuery.extend({color: c.css("color")}, f))).spin(this));
    });
    return this;
};
jQuery.fn.vj = function () {
    var f = jQuery.extend({jg: "cur", $g: z, speed: 300}, {$g: z, speed: 100});
    this.each(function () {
        var c = jQuery(this).addClass("harmonica"), d = jQuery("ul", c).prev("a");
        c.children(":last").addClass("last");
        jQuery("ul", c).each(function () {
            jQuery(this).children(":last").addClass("last");
        });
        jQuery("ul", c).prev("a").addClass("harFull");
        c.find("." + f.jg).parents("ul").show().prev("a").addClass(f.jg).addClass("harOpen");
        d.on("click", function () {
            jQuery(this).next("ul").is(":hidden") ? jQuery(this).addClass("harOpen") : jQuery(this).removeClass("harOpen");
            f.$g ? (jQuery(this).closest("ul").closest("ul").find("ul").not(jQuery(this).next("ul")).slideUp(f.speed).prev("a").removeClass("harOpen"), jQuery(this).next("ul").slideToggle(f.speed)) : jQuery(this).next("ul").stop(r).slideToggle(f.speed);
            return z;
        });
    });
};

function sa(f) {
    if (f && (!f || f.length)) {
        return f = f.replace(/\\u([\d\w]{4})/gi, function (c, d) {
            return String.fromCharCode(parseInt(d, 16));
        }), f = unescape(f);
    }
}

function ta(f, c) {
    var d = jQuery("<ul>");
    jQuery.each(c, function (c, g) {
        var m = jQuery("<li>").appendTo(d), n = jQuery(g).children("node");
        jQuery('<a style="' + (eb.platform.touchonlydevice ? "font-size:0.8em;line-height:1.2em;" : "") + '" class="flowpaper_accordionLabel flowpaper-tocitem" data-pageNumber="' + g.getAttribute("pageNumber") + '">').text(sa(g.getAttribute("title"))).appendTo(m);
        0 < n.length && ta(f, n).appendTo(m);
    });
    return d;
}

jQuery.Cg = function (f, c, d) {
    f = f.offset();
    return {x: Math.floor(c - f.left), y: Math.floor(d - f.top)};
};
jQuery.fn.Cg = function (f, c) {
    return jQuery.Cg(this.first(), f, c);
};
(function (f) {
    f.fn.moveTo = function (c) {
        return this.each(function () {
            var d = f(this).clone();
            f(d).appendTo(c);
            f(this).remove();
        });
    };
})(jQuery);

function ua(f) {
    window.Dh || (window.Dh = 1);
    if (!window.pg) {
        var c = window, d = document.createElement("div");
        document.body.appendChild(d);
        d.style.position = "absolute";
        d.style.width = "1in";
        var e = d.offsetWidth;
        d.style.display = "none";
        c.pg = e;
    }
    return f / (72 / window.pg) * window.Dh;
}

function va(f, c) {
    jQuery("#" + f).hasClass("activeElement") || (jQuery(".activeElement:not(#" + f + ")").removeClass("activeElement").find(".activeElement-label").remove(), jQuery("#" + f).hasClass("activeElement") || (jQuery("#" + f).addClass("activeElement").prepend('<span contenteditable="false" class="activeElement-label"><i class="activeElement-drag fa fa-arrows"></i><span class="activeElement-labeltext">Click to Zoom in and out. Double click to edit this page.</span><i style="margin-left:5px;" class="fa fa-cog activeElement-label-settingsCog"></i></span>'), jQuery("#" + f).data("hint-pageNumber", c)));
}

FLOWPAPER.Hf = function (f, c) {
    if (0 < f.indexOf("[*,2]") || 0 < f.indexOf("[*,1]")) {
        var d = f.substr(f.indexOf("[*,"), f.indexOf("]") - f.indexOf("[*,") + 1);
        return f.replace(d, ra(c, parseInt(d.substr(d.indexOf(",") + 1, d.indexOf("]") - 2))));
    }
    return 0 < f.indexOf("[*,2,true]") ? f.replace("_[*,2,true]", "") : 0 < f.indexOf("[*,1,true]") ? f.replace("_[*,1,true]", "") : 0 < f.indexOf("[*,0,true]") ? f.replace("_[*,0,true]", "") : f;
};
FLOWPAPER.ej = function () {
    for (var f = "", c = 0; 10 > c; c++) {
        f += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
    }
    return f;
};
FLOWPAPER.Rl = function (f) {
    return "#" != f.charAt(0) && "/" != f.charAt(0) && (-1 == f.indexOf("//") || f.indexOf("//") > f.indexOf("#") || f.indexOf("//") > f.indexOf("?"));
};
FLOWPAPER.ae = function (f, c, d, e, g, m, n) {
    if (e < c) {
        var l = c;
        c = e;
        e = l;
        l = d;
        d = g;
        g = l;
    }
    l = document.createElement("div");
    l.id = f + "_line";
    l.className = "flowpaper_cssline flowpaper_annotation_" + n + " flowpaper_interactiveobject_" + n;
    f = Math.sqrt((c - e) * (c - e) + (d - g) * (d - g));
    l.style.width = f + "px";
    l.style.marginLeft = m;
    e = Math.atan((g - d) / (e - c));
    l.style.top = d + 0.5 * f * Math.sin(e) + "px";
    l.style.left = c - 0.5 * f * (1 - Math.cos(e)) + "px";
    l.style.MozTransform = l.style.WebkitTransform = l.style.msTransform = l.style.Uk = "rotate(" + e + "rad)";
    return l;
};
FLOWPAPER.De = function (f, c, d, e, g, m) {
    if (e < c) {
        var n = c;
        c = e;
        e = n;
        n = d;
        d = g;
        g = n;
    }
    f = jQuery("#" + f + "_line");
    n = Math.sqrt((c - e) * (c - e) + (d - g) * (d - g));
    f.css("width", n + "px");
    e = Math.atan((g - d) / (e - c));
    f.css("top", d + 0.5 * n * Math.sin(e) + "px");
    f.css("left", c - 0.5 * n * (1 - Math.cos(e)) + "px");
    f.css("margin-left", m);
    f.css("-moz-transform", "rotate(" + e + "rad)");
    f.css("-webkit-transform", "rotate(" + e + "rad)");
    f.css("-o-transform", "rotate(" + e + "rad)");
    f.css("-ms-transform", "rotate(" + e + "rad)");
};
FLOWPAPER.$c = function () {
    eb.browser.mozilla ? jQuery(".flowpaper_interactive_canvas").addClass("flowpaper_interactive_canvas_drawing_moz") : eb.browser.msie || eb.browser.ic ? jQuery(".flowpaper_interactive_canvas").addClass("flowpaper_interactive_canvas_drawing_ie") : jQuery(".flowpaper_interactive_canvas").addClass("flowpaper_interactive_canvas_drawing");
};
FLOWPAPER.Ui = function () {
    jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_canvas_drawing");
    jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_canvas_drawing_moz");
    jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_canvas_drawing_ie");
};
"use strict";

function wa() {
    try {
        return new window.XMLHttpRequest;
    } catch (f) {
    }
}

var xa = "undefined" !== typeof window && window.ActiveXObject ? function () {
    var f;
    if (!(f = wa())) {
        a:{
            try {
                f = new window.ActiveXObject("Microsoft.XMLHTTP");
                break a;
            } catch (c) {
            }
            f = k;
        }
    }
    return f;
} : wa;

function ya(f, c) {
    try {
        var d = xa();
        d.open("GET", f, r);
        "responseType" in d && (d.responseType = "arraybuffer");
        d.overrideMimeType && d.overrideMimeType("text/plain; charset=x-user-defined");
        d.onreadystatechange = function () {
            var e, m;
            if (4 === d.readyState) {
                if (200 === d.status || 0 === d.status) {
                    m = e = s;
                    try {
                        e = d.response || d.responseText;
                    } catch (n) {
                        m = Error(n);
                    }
                    c(m, e);
                } else {
                    c(Error("Ajax error for " + f + " : " + this.status + " " + this.statusText), s);
                }
            }
        };
        d.send();
    } catch (e) {
        c(Error(e), s);
    }
}

var ImagePageRenderer = window.ImagePageRenderer = function () {
    function f(c, d, e) {
        this.p = c;
        this.config = d;
        this.gc = d.jsonfile;
        this.jsDirectory = e;
        this.pageImagePattern = d.pageImagePattern;
        this.pageThumbImagePattern = d.pageThumbImagePattern;
        this.pageSVGImagePattern = d.pageSVGImagePattern;
        this.Pj = d.pageHighResImagePattern;
        this.yl = d.FontsToLoad;
        this.Gc = d.DisableOverflow;
        this.JSONPageDataFormat = this.Q = this.dimensions = s;
        this.ba = d.compressedJSONFormat != s ? d.compressedJSONFormat : r;
        this.C = s;
        this.bb = "pageLoader_[pageNumber]";
        this.Ka = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        this.Fc = -1;
        this.Z = s;
        this.fd = z;
        this.Si = this.dc = r;
        this.Ud = d.SVGMode;
        this.loadTestFont = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
    }

    f.prototype = {
        Lc: aa("ImagePageRenderer"), ea: function (c) {
            return c.g.u ? c.g.u.H : "";
        }, Fa: function (c) {
            return c.g.u.Kl;
        }, lb: function () {
            jQuery(this.Z).unbind();
            this.Z.lb();
            delete this.sb;
            this.sb = s;
            delete this.dimensions;
            this.dimensions = s;
            delete this.Z;
            this.Z = s;
            delete this.C;
            this.C = s;
        }, initialize: function (c) {
            var d = this;
            d.sb = c;
            d.cb = eb.platform.cb;
            d.JSONPageDataFormat = d.ba ? {
                ta: "width",
                ya: "height",
                zc: "text",
                Ma: "d",
                Vd: "f",
                pb: "l",
                Va: "t",
                $b: "w",
                Zb: "h"
            } : {
                ta: d.config.JSONPageDataFormat.pageWidth,
                ya: d.config.JSONPageDataFormat.pageHeight,
                zc: d.config.JSONPageDataFormat.textCollection,
                Ma: d.config.JSONPageDataFormat.textFragment,
                Vd: d.config.JSONPageDataFormat.textFont,
                pb: d.config.JSONPageDataFormat.textLeft,
                Va: d.config.JSONPageDataFormat.textTop,
                $b: d.config.JSONPageDataFormat.textWidth,
                Zb: d.config.JSONPageDataFormat.textHeight
            };
            d.Z = new za(d.p, d.ba, d.JSONPageDataFormat, r);
            jQuery.ajaxPrefilter(function (c, e, d) {
                if (c.onreadystatechange) {
                    var f = c.xhr;
                    c.xhr = function () {
                        function e() {
                            c.onreadystatechange(m, d);
                        }

                        var m = f.apply(this, arguments);
                        m.addEventListener ? m.addEventListener("readystatechange", e, z) : setTimeout(function () {
                            var c = m.onreadystatechange;
                            c && (m.onreadystatechange = function () {
                                e();
                                c.apply(this, arguments);
                            });
                        }, 0);
                        return m;
                    };
                }
            });
            if (!eb.browser.msie && !eb.browser.safari && 6 > eb.browser.Mb) {
                var e = jQuery.ajaxSettings.xhr;
                jQuery.ajaxSettings.xhr = function () {
                    var c = e();
                    c instanceof window.XMLHttpRequest && c.addEventListener("progress", function (c) {
                        c.lengthComputable && (c = c.loaded / c.total, jQuery("#toolbar").trigger("onProgressChanged", c));
                    }, z);
                    return c;
                };
            }
            jQuery("#" + d.p).trigger("onDocumentLoading");
            c = document.createElement("a");
            c.href = d.gc;
            c.search += 0 < c.search.length ? "&" : "?";
            c.search += "callback=?";
            d.kl = z;
            jQuery(d).trigger("loadingProgress", {p: d.p, progress: 0.3});
            0 < d.gc.indexOf("{page}") ? (d.da = r, d.Ic({
                url: d.Wc(FLOWPAPER.CHUNK_SIZE != s ? FLOWPAPER.CHUNK_SIZE : 10),
                dataType: d.config.JSONDataType,
                success: function (c) {
                    jQuery(d).trigger("loadingProgress", {p: d.p, progress: 0.9});
                    if (c.e) {
                        var e = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML));
                        c = jQuery.parseJSON(e.toString(CryptoJS.enc.Utf8));
                        d.Uc = r;
                    }
                    if (0 < c.length) {
                        d.C = Array(c[0].pages);
                        d.rb = c[0].detailed;
                        for (var f = 0; f < c.length; f++) {
                            d.C[f] = c[f];
                            for (e = 0; e < d.C[f].text.length; e++) {
                                d.C[f].text[e][5] = la(d.C[f].text[e][5]);
                            }
                            d.C[f].loaded = r;
                        }
                        for (f = 0; f < d.C.length; f++) {
                            d.C[f] == s && (d.C[f] = [], d.C[f].loaded = z);
                        }
                        0 < d.C.length && (d.Ca = d.C[0].twofold, d.Ca && (d.cb = 1));
                        if (d.rb) {
                            d.Ab || (d.Ab = {});
                            f = 5 > c.length ? c.length : 5;
                            d.Rc = [];
                            for (var l = 0; l < f; l++) {
                                if (c[l].fonts && 0 < c[l].fonts.length) {
                                    for (e = 0; e < c[l].fonts.length; e++) {
                                        d.Ab[c[l].fonts[e].name] || (ma(c[l].fonts[e].name, c[l].fonts[e].data), d.Rc.push(c[l].fonts[e].name));
                                    }
                                } else {
                                    var q = c[l].text;
                                    if (q && 0 < q.length) {
                                        for (e = 0; e < q.length; e++) {
                                            q[e][7] && !d.Ab[q[e][7]] && -1 == d.Rc.indexOf(q[e][7]) && 0 == q[e][7].indexOf("g_font") && q[e][7] && d.Rc.push(q[e][7]);
                                        }
                                    }
                                }
                            }
                            d.ge = 0;
                            0 < d.Rc.length ? WebFont.load({
                                custom: {families: d.Rc}, fontactive: function (c) {
                                    d.ge++;
                                    d.Ab[c] = "loaded";
                                    jQuery(d).trigger("loadingProgress", {p: d.p, progress: d.ge / d.Rc.length});
                                }, fontinactive: function (c) {
                                    d.ge++;
                                    d.Ab[c] = "loaded";
                                    jQuery(d).trigger("loadingProgress", {p: d.p, progress: d.ge / d.Rc.length});
                                }, inactive: function () {
                                    d.sb();
                                    d.Z.Db(c);
                                }, active: function () {
                                    d.sb();
                                    d.Z.Db(c);
                                }, timeout: 5000
                            }) : (d.sb(), d.Z.Db(c));
                        } else {
                            d.sb(), d.Z.Db(c);
                        }
                    }
                },
                error: function (c, e, f) {
                    J("Error loading JSON file (" + c.statusText + "," + f + "). Please check your configuration.", "onDocumentLoadedError", d.p, c.responseText != s && 0 == c.responseText.indexOf("Error:") ? c.responseText.substr(6) : "");
                }
            })) : d.Ic({
                url: d.gc, dataType: d.config.JSONDataType, success: function (c) {
                    jQuery(d).trigger("loadingProgress", {p: d.p, progress: 0.9});
                    c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), d.Uc = r);
                    d.C = c;
                    for (var e = 0; e < c.length; e++) {
                        c[e].loaded = r;
                        for (var f = 0; f < d.C[e].text.length; f++) {
                            d.C[e].text[f][5] = la(d.C[e].text[f][5]);
                        }
                    }
                    d.sb();
                    d.Z.Db(c);
                }, onreadystatechange: B(), error: function (c, e, f) {
                    J("Error loading JSON file (" + c.statusText + "," + f + "). Please check your configuration.", "onDocumentLoadedError", d.p, c.responseText != s && 0 == c.responseText.indexOf("Error:") ? c.responseText.substr(6) : "");
                }
            });
        }, getDimensions: function (c, d) {
            var e = this.C.length;
            c == s && (c = 0);
            d == s && (d = e);
            if (this.dimensions == s || d && c) {
                this.dimensions == s && (this.dimensions = [], this.Q = []);
                for (e = c; e < d; e++) {
                    this.C[e].loaded ? (this.dimensions[e] = [], this.qh(e), this.qb == s && (this.qb = this.dimensions[e])) : this.qb != s && (this.dimensions[e] = [], this.dimensions[e].page = e, this.dimensions[e].loaded = z, this.dimensions[e].width = this.qb.width, this.dimensions[e].height = this.qb.height, this.dimensions[e].U = this.qb.U, this.dimensions[e].ia = this.qb.ia);
                }
            }
            return this.dimensions;
        }, qh: function (c) {
            if (this.dimensions[c]) {
                this.dimensions[c].page = c;
                this.dimensions[c].loaded = r;
                this.dimensions[c].width = this.C[c][this.JSONPageDataFormat.ta];
                this.dimensions[c].height = this.C[c][this.JSONPageDataFormat.ya];
                this.dimensions[c].U = this.dimensions[c].width;
                this.dimensions[c].ia = this.dimensions[c].height;
                this.Q[c] = [];
                this.Q[c] = "";
                900 < this.dimensions[c].width && (this.dimensions[c].width = 918, this.dimensions[c].height = 1188);
                for (var d = s, e = 0, g; g = this.C[c][this.JSONPageDataFormat.zc][e++];) {
                    this.ba ? !isNaN(g[0].toString()) && 0 <= Number(g[0].toString()) && (!isNaN(g[1].toString()) && 0 <= Number(g[1].toString()) && !isNaN(g[2].toString()) && 0 < Number(g[2].toString()) && !isNaN(g[3].toString()) && 0 < Number(g[3].toString())) && (d && (Math.round(d[0]) != Math.round(g[0]) && Math.round(d[1]) == Math.round(g[1])) && (this.Q[c] += " "), d && (Math.round(d[0]) != Math.round(g[0]) && !oa(this.Q[c], " ")) && (this.Q[c] += " "), d = /\\u([\d\w]{4})/gi, d = (g[5] + "").replace(d, function (c, e) {
                        return String.fromCharCode(parseInt(e, 16));
                    }), this.config.RTLMode || (this.Q[c] += d), this.config.RTLMode && (this.Q[c] += qa(d))) : !isNaN(g[this.JSONPageDataFormat.pb].toString()) && 0 <= Number(g[this.JSONPageDataFormat.pb].toString()) && (!isNaN(g[this.JSONPageDataFormat.Va].toString()) && 0 <= Number(g[this.JSONPageDataFormat.Va].toString()) && !isNaN(g[this.JSONPageDataFormat.$b].toString()) && 0 < Number(g[this.JSONPageDataFormat.$b].toString()) && !isNaN(g[this.JSONPageDataFormat.Zb].toString()) && 0 < Number(g[this.JSONPageDataFormat.Zb].toString())) && (d && (Math.round(d[this.JSONPageDataFormat.Va]) != Math.round(g[this.JSONPageDataFormat.Va]) && Math.round(d[this.JSONPageDataFormat.pb]) == Math.round(prev[this.JSONPageDataFormat.pb])) && (this.Q[c] += " "), d && (Math.round(d[this.JSONPageDataFormat.Va]) != Math.round(g[this.JSONPageDataFormat.Va]) && !oa(this.Q[c], " ")) && (this.Q[c] += " "), d = /\\u([\d\w]{4})/gi, d = (g[this.JSONPageDataFormat.Ma] + "").replace(d, function (c, e) {
                        return String.fromCharCode(parseInt(e, 16));
                    }), this.config.RTLMode || (this.Q[c] += d), this.config.RTLMode && (this.Q[c] += qa(d))), d = g;
                }
                this.Q[c] = this.Q[c].toLowerCase();
            }
        }, oe: function (c) {
            this.yc = z;
            if (c.j == S || c.j == X) {
                c.j == S && c.z(c.K).addClass("flowpaper_hidden"), this.Ud ? c.z(c.V).append("<object data='" + this.Ka + "' type='image/svg+xml' id='" + c.page + "' class='flowpaper_interactivearea " + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_grab flowpaper_hidden flowpaper_rescale' style='" + c.getDimensions() + "' /></div>") : this.rb ? c.z(c.V).append("<canvas id='" + c.page + "' class='flowpaper_interactivearea " + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_grab flowpaper_hidden flowpaper_rescale' style='" + c.getDimensions() + ";background-size:cover;' />") : c.z(c.V).append("<img alt='' src='" + this.Ka + "' id='" + c.page + "' class='flowpaper_interactivearea " + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_grab flowpaper_hidden flowpaper_rescale' style='" + c.getDimensions() + ";background-size:cover;' />"), c.j == X && 0 == c.pageNumber && this.Jg(c, c.K);
            }
            c.j == W && jQuery(c.K).append("<img src='" + this.Ka + "' alt='" + this.ka(c.pageNumber + 1) + "'  id='" + c.page + "' class='flowpaper_hidden' style='" + c.getDimensions() + "'/>");
            c.j == this.ea(c) && this.Fa(c).oe(this, c);
            if (c.j == V || c.j == T) {
                0 == c.pageNumber && (jQuery(c.K + "_1").append("<img id='" + c.bb + "_1' class='flowpaper_pageLoader' src='" + c.g.pc + "' style='position:absolute;left:50%;top:" + c.Ra() / 4 + "px;margin-left:-32px;' />"), jQuery(c.K + "_1").append("<img src='" + this.Ka + "' alt='" + this.ka(c.pageNumber + 1) + "'  id='" + c.page + "' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_load_on_demand' style='" + c.getDimensions() + ";position:absolute;background-size:cover;'/>"), jQuery(c.K + "_1").append("<div id='" + c.S + "_1_textoverlay' style='position:relative;left:0px;top:0px;width:100%;height:100%;'></div>")), 1 == c.pageNumber && (jQuery(c.K + "_2").append("<img id='" + c.bb + "_2' class='flowpaper_pageLoader' src='" + c.g.pc + "' style='position:absolute;left:50%;top:" + c.Ra() / 4 + "px;margin-left:-32px;' />"), jQuery(c.K + "_2").append("<img src='" + this.Ka + "' alt='" + this.ka(c.pageNumber + 1) + "'  id='" + c.page + "' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_load_on_demand' style='" + c.getDimensions() + ";position:absolute;left:0px;top:0px;background-size:cover;'/>"), jQuery(c.K + "_2").append("<div id='" + c.S + "_2_textoverlay' style='position:absolute;left:0px;top:0px;width:100%;height:100%;'></div>"));
            }
        }, Ic: function (c) {
            var d = this;
            if ("lz" == d.config.JSONDataType) {
                if ("undefined" !== typeof Worker && !(eb.browser.msie && 11 > eb.browser.version)) {
                    var e = document.location.href.substr(0, document.location.href.lastIndexOf("/") + 1);
                    -1 == c.url.indexOf("http") && (c.url = e + c.url);
                    d.Oa || (d.Oa = {});
                    d.Oa[c.url] = c;
                    d.Oc || (d.Oc = new Worker(("undefined" != d.jsDirectory && d.jsDirectory != s ? d.jsDirectory : "js/") + "flowpaper.worker.js"), d.Oc.addEventListener("message", function (c) {
                        d.Oa[c.data.url] && ("undefined" !== typeof Response ? (new Response(c.data.JSON)).json().then(function (e) {
                            d.Oa[c.data.url] && (d.Oa[c.data.url].success(e), d.Oa[c.data.url] = s);
                        }) : d.Oa[c.data.url] && (d.Oa[c.data.url].success(JSON.parse(c.data.JSON)), d.Oa[c.data.url] = s));
                    }, z));
                    d.Oc.postMessage(c.url);
                } else {
                    ya(c.url, function (e, d) {
                        requestAnim(function () {
                            var e = "undefined" != typeof Uint8Array ? new Uint8Array(d) : d,
                                e = pako.tj(e, {Ak: "string"});
                            "undefined" !== typeof Response ? (new Response(e)).json().then(function (e) {
                                c.success(e);
                            }) : c.success(JSON.parse(e));
                        }, 10);
                    });
                }
            } else {
                return jQuery.ajax(c);
            }
        }, Wc: function (c) {
            return this.gc.replace("{page}", c);
        }, ka: function (c, d, e) {
            this.config.RTLMode && (this.C && this.C.length) && (c = this.C.length - c + 1);
            this.config.PageIndexAdjustment && (c += this.config.PageIndexAdjustment);
            this.Uc && (c = CryptoJS.RC4.encrypt(c.toString(), CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)).toString());
            return !e || e && !this.pageSVGImagePattern ? d ? this.pageThumbImagePattern != s && 0 < this.pageThumbImagePattern.length ? 0 < this.pageThumbImagePattern.indexOf("?") ? this.pageThumbImagePattern.replace("{page}", c) + "&resolution=" + d : this.pageThumbImagePattern.replace("{page}", c) + "?resolution=" + d : 0 < this.pageImagePattern.indexOf("?") ? this.pageImagePattern.replace("{page}", c) + "&resolution=" + d : this.pageImagePattern.replace("{page}", c) + "?resolution=" + d : this.pageImagePattern.replace("{page}", c) : d ? this.pageThumbImagePattern != s && 0 < this.pageThumbImagePattern.length ? this.pageThumbImagePattern.replace("{page}", c) : 0 < this.pageSVGImagePattern.indexOf("?") ? this.pageSVGImagePattern.replace("{page}", c) + "&resolution=" + d : this.pageSVGImagePattern.replace("{page}", c) + "?resolution=" + d : this.pageSVGImagePattern.replace("{page}", c);
        }, Xa: function (c, d) {
            return this.Pj.replace("{page}", c).replace("{sector}", d);
        }, cd: function (c) {
            var d = FLOWPAPER.CHUNK_SIZE != s ? FLOWPAPER.CHUNK_SIZE : 10;
            return 0 === d ? c : c + (d - c % d);
        }, hc: function (c, d, e) {
            var g = this;
            g.Ub != g.cd(c) && (g.Ub = g.cd(c), g.Ic({
                url: g.Wc(g.Ub),
                dataType: g.config.JSONDataType,
                async: d,
                success: function (c) {
                    c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), g.Uc = r);
                    if (0 < c.length) {
                        for (var d = 0; d < c.length; d++) {
                            var f = parseInt(c[d].number) - 1;
                            g.C[f] = c[d];
                            g.C[f].loaded = r;
                            for (var q = 0; q < g.C[f].text.length; q++) {
                                g.C[f].text[q][5] = la(g.C[f].text[q][5]);
                            }
                            g.qh(f);
                        }
                        g.Z.Db(g.C);
                        jQuery(g).trigger("onTextDataUpdated", c[0].number);
                        e != s && e();
                    }
                    g.Ub = s;
                },
                error: function (c) {
                    J("Error loading JSON file (" + c.statusText + "). Please check your configuration.", "onDocumentLoadedError", g.p);
                    g.Ub = s;
                }
            }));
        }, ga: function (c) {
            return c.Fc;
        }, ua: function (c, d) {
            c.Fc = d;
        }, Ob: function (c, d, e) {
            var g = this;
            if (c.j != g.ea(c) && -1 < g.ga(c)) {
                window.clearTimeout(c.Xb), c.Xb = setTimeout(function () {
                    g.Ob(c, d, e);
                }, 250);
            } else {
                if (g.rb && c.j != g.ea(c) && (!g.Gc && c.lj != c.scale || g.Gc && !c.Eg || c.j == X)) {
                    if (c.j == S || c.j == X) {
                        c.j != X ? g.ua(c, c.pageNumber) : 0 <= g.ga(c) && jQuery(c.O).css("background-image", "url('" + g.ka(c.k.D + 1) + "')");
                        var m = jQuery(c.O).get(0), f = 1.5 < g.cb ? g.cb : 1.5;
                        g.Gc && (f = 2);
                        m.width = jQuery(m).width() * f;
                        m.height = jQuery(m).height() * f;
                        c.lj = c.scale;
                        jQuery(m).data("needs-overlay", 1);
                        c.Eg || (c.Eg = r);
                        g.Gc ? (c.ha = new Image, jQuery(c.ha).bind("load", function () {
                            var e = jQuery(c.O).get(0);
                            e.getContext("2d").drawImage(c.ha, 0, 0, e.width, e.height);
                            c.ve(e).then(function () {
                                jQuery("#" + g.p).trigger("onPageLoaded", c.pageNumber + 1);
                            }, B());
                        }), jQuery(c.ha).attr("src", g.ka(c.pageNumber + 1, c.j == W ? 200 : s))) : c.ve(m).then(B(), B());
                    }
                }
                if (!(c.na && c.j != g.ea(c))) {
                    f = c.Pd;
                    if (c.j == S || c.j == X || c.j == V || c.j == T || c.j == g.ea(c)) {
                        var l = c.Aa(), q = c.Ra(), m = c.nb();
                        0 == jQuery("#" + f).length ? (f = "<div id='" + f + "' class='flowpaper_textLayer' style='width:" + l + "px;height:" + q + "px;margin-left:" + m + "px;'></div>", c.j == S || g.ea(c) || c.j == X ? jQuery(c.V).append(f) : (c.j == V || c.j == T) && jQuery(c.V + "_" + (c.pageNumber % 2 + 1)).append(f)) : jQuery("#" + f).css({
                            width: l,
                            height: q,
                            "margin-left": m
                        });
                        if (90 == c.rotation || 270 == c.rotation || 180 == c.rotation) {
                            jQuery(c.Ba).css({
                                "z-index": 11,
                                "margin-left": m
                            }), jQuery(c.Ba).transition({rotate: c.rotation, translate: "-" + m + "px, 0px"}, 0);
                        }
                    }
                    if (c.j == S || c.j == W) {
                        if (!c.na && (jQuery(c.O).attr("src") == g.Ka || g.Ud || g.rb) && !c.ke) {
                            g.ua(c, c.pageNumber), c.dimensions.loaded || g.hc(c.pageNumber + 1, r, function () {
                                g.Jb(c);
                            }), c.xc(), g.ha = new Image, jQuery(g.ha).bind("load", function () {
                                c.ke = r;
                                c.ff = this.height;
                                c.gf = this.width;
                                g.mc(c);
                                c.dimensions.U > c.dimensions.width && (c.dimensions.width = c.dimensions.U, c.dimensions.height = c.dimensions.ia, (c.j == S || c.j == X) && c.Ta());
                            }).bind("error", function () {
                                J("Error loading image (" + this.src + ")", "onErrorLoadingPage", g.p, c.pageNumber);
                            }), jQuery(g.ha).bind("error", function () {
                                g.ua(c, -1);
                            }), jQuery(g.ha).attr("src", g.ka(c.pageNumber + 1, c.j == W ? 200 : s));
                        }
                        !c.na && (jQuery(c.O).attr("src") == g.Ka && c.ke) && g.mc(c);
                        e != s && e();
                    }
                    c.j == g.ea(c) && (!c.dimensions.loaded && (!g.dimensions[c.pageNumber - 1].loaded || g.getNumPages() == c.pageNumber + 1 && 0 == g.getNumPages() % 2) && g.hc(c.pageNumber + 1, r, function () {
                        g.Jb(c);
                    }), g.Fa(c).Ob(g, c, d, e));
                    c.j == X && (c.jd || (c.xc(), c.jd = r), 0 == c.pageNumber && (g.ua(c, c.k.D), g.getDimensions()[g.ga(c)].loaded || g.hc(g.ga(c) + 1, r, function () {
                        g.Jb(c);
                    }), g.ha = new Image, jQuery(g.ha).bind("load", function () {
                        c.ke = r;
                        c.ff = this.height;
                        c.gf = this.width;
                        c.$a();
                        g.mc(c);
                        c.dimensions.U > c.dimensions.width && (c.dimensions.width = c.dimensions.U, c.dimensions.height = c.dimensions.ia, c.Ta());
                        c.na || jQuery("#" + g.p).trigger("onPageLoaded", c.pageNumber + 1);
                        c.na = r;
                        g.ua(c, -1);
                    }), jQuery(g.ha).bind("error", function () {
                        c.$a();
                        g.ua(c, -1);
                    }), jQuery(g.ha).attr("src", g.ka(c.k.D + 1)), jQuery(c.K + "_1").removeClass("flowpaper_load_on_demand"), e != s && e()));
                    if (c.j == V || c.j == T) {
                        c.jd || (c.xc(), c.jd = r), 0 == c.pageNumber ? (jQuery(c.O), c.j == T ? g.ua(c, 0 != c.k.D ? c.k.D : c.k.D + 1) : c.j == V && g.ua(c, c.k.D), g.getDimensions()[g.ga(c) - 1] && !g.getDimensions()[g.ga(c) - 1].loaded && g.hc(g.ga(c) + 1, r, function () {
                            g.Jb(c);
                        }), g.ha = new Image, jQuery(g.ha).bind("load", function () {
                            c.ke = r;
                            c.ff = this.height;
                            c.gf = this.width;
                            c.$a();
                            g.mc(c);
                            c.dimensions.U > c.dimensions.width && (c.dimensions.width = c.dimensions.U, c.dimensions.height = c.dimensions.ia, c.Ta());
                            c.na || jQuery("#" + g.p).trigger("onPageLoaded", c.pageNumber + 1);
                            c.na = r;
                            g.ua(c, -1);
                        }), jQuery(g.ha).bind("error", function () {
                            c.$a();
                            g.ua(c, -1);
                        }), c.j == T && jQuery(g.ha).attr("src", g.ka(0 != c.k.D ? c.k.D : c.k.D + 1)), c.j == V && jQuery(g.ha).attr("src", g.ka(c.k.D + 1)), jQuery(c.K + "_1").removeClass("flowpaper_load_on_demand"), e != s && e()) : 1 == c.pageNumber && (m = jQuery(c.O), c.k.D + 1 > c.k.getTotalPages() ? m.attr("src", "") : (0 != c.k.D || c.j == V ? (g.ua(c, c.k.D + 1), g.ha = new Image, jQuery(g.ha).bind("load", function () {
                            c.$a();
                            g.mc(c);
                            c.dimensions.U > c.dimensions.width && (c.dimensions.width = c.dimensions.U, c.dimensions.height = c.dimensions.ia);
                            c.na || jQuery("#" + g.p).trigger("onPageLoaded", c.pageNumber + 1);
                            c.na = r;
                            g.ua(c, -1);
                        }), jQuery(g.ha).bind("error", function () {
                            g.ua(c, -1);
                            c.$a();
                        })) : c.$a(), c.j == T && jQuery(g.ha).attr("src", g.ka(c.k.D + 1)), c.j == V && jQuery(g.ha).attr("src", g.ka(c.k.D + 2)), 1 < c.k.D && jQuery(c.K + "_2").removeClass("flowpaper_hidden"), jQuery(c.K + "_2").removeClass("flowpaper_load_on_demand")), e != s && e());
                    }
                }
            }
        }, mc: function (c) {
            if (c.j == S && (Math.round(100 * (c.gf / c.ff)) != Math.round(100 * (c.dimensions.width / c.dimensions.height)) || this.Ud) && !(eb.browser.msie && 9 > eb.browser.version)) {
                if (this.Ud) {
                    jQuery(c.O).attr("data", this.ka(c.pageNumber + 1, s, r)), jQuery(c.K).removeClass("flowpaper_load_on_demand"), jQuery(c.O).css("width", jQuery(c.O).css("width"));
                } else {
                    if (this.Gc && this.rb) {
                        var d = jQuery(c.O).css("background-image");
                        0 < d.length && "none" != d ? (jQuery(c.O).css("background-image", d + ",url('" + this.ka(c.pageNumber + 1) + "')"), jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1), fa(jQuery(c.O).get(0))) : jQuery(c.O).css("background-image", "url('" + this.ka(c.pageNumber + 1) + "')");
                    } else {
                        jQuery(c.O).css("background-image", "url('" + this.ka(c.pageNumber + 1) + "')"), jQuery(c.O).attr("src", this.Ka);
                    }
                }
                jQuery("#" + c.bb).hide();
                !c.na && !this.rb && jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1);
                c.na = r;
            } else {
                c.j == this.ea(c) ? this.Fa(c).mc(this, c) : c.j == V || c.j == T ? (0 == c.pageNumber && (d = c.j == T ? 0 != c.k.D ? c.k.D : c.k.D + 1 : c.k.D + 1, c.xe != d && (eb.browser.msie || eb.browser.safari && 5 > eb.browser.Mb ? jQuery(c.O).attr("src", this.ka(d)) : jQuery(c.O).css("background-image", "url('" + this.ka(d) + "')"), jQuery(c.K + "_1").removeClass("flowpaper_hidden"), c.xe = d), jQuery(c.O).removeClass("flowpaper_hidden")), 1 == c.pageNumber && (d = c.j == T ? c.k.D + 1 : c.k.D + 2, c.xe != d && (eb.browser.msie || eb.browser.safari && 5 > eb.browser.Mb ? jQuery(c.O).attr("src", this.ka(d)) : jQuery(c.O).css("background-image", "url('" + this.ka(d) + "')"), c.xe = d, c.j == V && jQuery(c.K + "_2").removeClass("flowpaper_hidden")), jQuery(c.O).removeClass("flowpaper_hidden")), c.na || jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1), c.na = r) : c.j == X ? (this.rb ? jQuery(c.O).css("background-image", "url('" + this.ka(this.ga(c) + 1) + "')") : jQuery(c.O).attr("src", this.ka(this.ga(c) + 1)), jQuery("#" + c.bb).hide(), c.na || jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1), c.na = r) : this.Gc ? this.Gc && (jQuery("#" + c.bb).hide(), c.na || jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1), c.na = r) : (this.Ud ? (jQuery(c.O).attr("data", this.ka(c.pageNumber + 1, s, r)), jQuery(c.K).removeClass("flowpaper_load_on_demand")) : this.rb ? jQuery(c.O).css("background-image", "url('" + this.ka(c.pageNumber + 1) + "')") : jQuery(c.O).attr("src", this.ka(c.pageNumber + 1), c.j == W ? 200 : s), jQuery("#" + c.bb).hide(), c.na || jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1), c.na = r);
            }
            this.ua(c, -1);
            this.fd || (this.fd = r, c.g.tf());
        }, lh: function (c) {
            c.j == V || c.j == T ? (0 == c.pageNumber && jQuery(c.P).css("background-image", "url(" + this.Ka + ")"), 1 == c.pageNumber && jQuery(c.P).css("background-image", "url(" + this.Ka + ")")) : jQuery(c.P).css("background-image", "url(" + this.Ka + ")");
        }, unload: function (c) {
            jQuery(c.K).addClass("flowpaper_load_on_demand");
            var d = s;
            if (c.j == S || c.j == W || c.j == X) {
                d = jQuery(c.O);
            }
            if (c.j == V || c.j == T) {
                d = jQuery(c.O), jQuery(c.O).addClass("flowpaper_hidden");
            }
            c.j == this.ea(c) && this.Fa(c).unload(this, c);
            d != s && 0 < d.length && (d.attr("alt", d.attr("src")), d.attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"));
            c.jd = z;
            c.xe = -1;
            jQuery(".flowpaper_pageword_" + this.p + "_page_" + c.pageNumber + ":not(.flowpaper_selected_searchmatch, .flowpaper_annotation_" + this.p + ")").remove();
            c.ub && c.ub();
            jQuery(".flowpaper_annotation_" + this.p + "_page_" + c.pageNumber).remove();
            c.Jf && c.Jf();
        }, getNumPages: function () {
            return this.C.length;
        }, Jb: function (c, d, e, g) {
            this.Z.Jb(c, d, e, g);
        }, xb: function (c, d, e, g) {
            this.Z.xb(c, d, e, g);
        }, Cc: function (c, d, e, g) {
            this.Z.Cc(c, d, e, g);
        }, ma: function (c, d, e) {
            this.Z.ma(c, e);
        }, Jg: function (c, d) {
            if (this.yc) {
                if (1 > c.scale) {
                    c.yh = d, c.zh = z;
                } else {
                    !d && c.yh && (d = c.yh);
                    var e = 0.25 * Math.round(c.Bg()), g = 0.25 * Math.round(c.Ag());
                    jQuery(".flowpaper_flipview_canvas_highres_" + c.pageNumber).remove();
                    d == s && (d = c.K);
                    var m = eb.platform.Md || eb.platform.android ? "flowpaper_flipview_canvas_highres" : c.S + "_canvas_highres";
                    jQuery(d).append(String.format("<div id='" + c.S + "_canvas_highres_l1t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat:no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l2t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r1t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r2t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l1t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, g + 0 + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l2t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, g + 0 + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r1t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, g + 0 + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r2t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, g + 0 + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l1b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, 2 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l2b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, 2 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r1b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, 2 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r2b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, 2 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l1b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, 3 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_l2b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, 3 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r1b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, 3 * g + 0, e, g, m) + String.format("<div id='" + c.S + "_canvas_highres_r2b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, 3 * g + 0, e, g, m) + "");
                    c.zh = r;
                }
            }
        }, we: function (c) {
            if (!(1 > c.scale)) {
                !c.zh && this.yc && this.Jg(c);
                if (this.yc) {
                    var d = document.getElementById(c.S + "_canvas_highres_l1t1"),
                        e = document.getElementById(c.S + "_canvas_highres_l2t1"),
                        g = document.getElementById(c.S + "_canvas_highres_l1t2"),
                        m = document.getElementById(c.S + "_canvas_highres_l2t2"),
                        f = document.getElementById(c.S + "_canvas_highres_r1t1"),
                        l = document.getElementById(c.S + "_canvas_highres_r2t1"),
                        q = document.getElementById(c.S + "_canvas_highres_r1t2"),
                        h = document.getElementById(c.S + "_canvas_highres_r2t2"),
                        A = document.getElementById(c.S + "_canvas_highres_l1b1"),
                        D = document.getElementById(c.S + "_canvas_highres_l2b1"),
                        w = document.getElementById(c.S + "_canvas_highres_l1b2"),
                        t = document.getElementById(c.S + "_canvas_highres_l2b2"),
                        x = document.getElementById(c.S + "_canvas_highres_r1b1"),
                        v = document.getElementById(c.S + "_canvas_highres_r2b1"),
                        G = document.getElementById(c.S + "_canvas_highres_r1b2"),
                        C = document.getElementById(c.S + "_canvas_highres_r2b2");
                    if (1 == c.pageNumber && 1 == c.k.D || c.pageNumber == c.k.D - 1 || c.pageNumber == c.k.D - 2) {
                        var y = c.j == this.ea(c) ? c.k.F : s, K = c.j == this.ea(c) ? c.pageNumber + 1 : c.k.D + 1;
                        jQuery(d).visible(r, y) && "none" === jQuery(d).css("background-image") && jQuery(d).css("background-image", "url('" + this.Xa(K, "l1t1") + "')");
                        jQuery(e).visible(r, y) && "none" === jQuery(e).css("background-image") && jQuery(e).css("background-image", "url('" + this.Xa(K, "l2t1") + "')");
                        jQuery(g).visible(r, y) && "none" === jQuery(g).css("background-image") && jQuery(g).css("background-image", "url('" + this.Xa(K, "l1t2") + "')");
                        jQuery(m).visible(r, y) && "none" === jQuery(m).css("background-image") && jQuery(m).css("background-image", "url('" + this.Xa(K, "l2t2") + "')");
                        jQuery(f).visible(r, y) && "none" === jQuery(f).css("background-image") && jQuery(f).css("background-image", "url('" + this.Xa(K, "r1t1") + "')");
                        jQuery(l).visible(r, y) && "none" === jQuery(l).css("background-image") && jQuery(l).css("background-image", "url('" + this.Xa(K, "r2t1") + "')");
                        jQuery(q).visible(r, y) && "none" === jQuery(q).css("background-image") && jQuery(q).css("background-image", "url('" + this.Xa(K, "r1t2") + "')");
                        jQuery(h).visible(r, y) && "none" === jQuery(h).css("background-image") && jQuery(h).css("background-image", "url('" + this.Xa(K, "r2t2") + "')");
                        jQuery(A).visible(r, y) && "none" === jQuery(A).css("background-image") && jQuery(A).css("background-image", "url('" + this.Xa(K, "l1b1") + "')");
                        jQuery(D).visible(r, y) && "none" === jQuery(D).css("background-image") && jQuery(D).css("background-image", "url('" + this.Xa(K, "l2b1") + "')");
                        jQuery(w).visible(r, y) && "none" === jQuery(w).css("background-image") && jQuery(w).css("background-image", "url('" + this.Xa(K, "l1b2") + "')");
                        jQuery(t).visible(r, y) && "none" === jQuery(t).css("background-image") && jQuery(t).css("background-image", "url('" + this.Xa(K, "l2b2") + "')");
                        jQuery(x).visible(r, y) && "none" === jQuery(x).css("background-image") && jQuery(x).css("background-image", "url('" + this.Xa(K, "r1b1") + "')");
                        jQuery(v).visible(r, y) && "none" === jQuery(v).css("background-image") && jQuery(v).css("background-image", "url('" + this.Xa(K, "r2b1") + "')");
                        jQuery(G).visible(r, y) && "none" === jQuery(G).css("background-image") && jQuery(G).css("background-image", "url('" + this.Xa(K, "r1b2") + "')");
                        jQuery(C).visible(r, y) && "none" === jQuery(C).css("background-image") && jQuery(C).css("background-image", "url('" + this.Xa(K, "r2b2") + "')");
                    }
                }
                c.jh = r;
            }
        }, Te: function (c) {
            if (this.yc) {
                var d = eb.platform.Md || eb.platform.android ? "flowpaper_flipview_canvas_highres" : c.S + "_canvas_highres";
                c.jh && 0 < jQuery("." + d).length && (jQuery("." + d).css("background-image", ""), c.jh = z);
            }
        }
    };
    return f;
}(), CanvasPageRenderer = window.CanvasPageRenderer = function () {
    function f(c, d, e, g) {
        this.p = c;
        this.file = d;
        this.jsDirectory = e;
        this.initialized = z;
        this.JSONPageDataFormat = this.ja = this.dimensions = s;
        this.pageThumbImagePattern = g.pageThumbImagePattern;
        this.pageImagePattern = g.pageImagePattern;
        this.config = g;
        this.ce = this.p + "_dummyPageCanvas_[pageNumber]";
        this.Ye = "#" + this.ce;
        this.de = this.p + "dummyPageCanvas2_[pageNumber]";
        this.Ze = "#" + this.de;
        this.Ja = [];
        this.context = this.P = s;
        this.qa = [];
        this.Fe = [];
        this.dc = this.fd = z;
        this.Ka = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        this.re = 1;
        this.Q = [];
        this.Qd = {};
        this.JSONPageDataFormat = s;
        this.Si = r;
        this.ba = g.compressedJSONFormat != s ? g.compressedJSONFormat : r;
        this.Qe = [];
    }

    f.prototype = {
        Lc: aa("CanvasPageRenderer"), ea: function (c) {
            return c.g ? c.g.u ? c.g.u.H : "" : z;
        }, Fa: function (c) {
            return c.g.u.ll;
        }, lb: function () {
            jQuery(this.Z).unbind();
            this.Z.lb();
            delete this.sb;
            this.sb = s;
            delete this.dimensions;
            this.dimensions = s;
            delete this.Z;
            this.Z = s;
            delete this.qa;
            this.qa = s;
            delete this.Fe;
            this.Fe = s;
        }, initialize: function (c, d) {
            var e = this;
            e.sb = c;
            e.cb = eb.platform.cb;
            1 < e.cb && eb.platform.touchonlydevice && (e.cb = 1);
            if (e.config.MixedMode && (eb.browser.ic || eb.browser.msie) && 0 == e.file.indexOf("http")) {
                e.config.MixedMode = z;
            }
            e.Rj = ("undefined" != e.jsDirectory && e.jsDirectory != s ? e.jsDirectory : "js/") + "pdf.min.js";
            e.JSONPageDataFormat = e.ba ? {
                ta: "width",
                ya: "height",
                zc: "text",
                Ma: "d",
                Vd: "f",
                pb: "l",
                Va: "t",
                $b: "w",
                Zb: "h"
            } : {
                ta: e.config.JSONPageDataFormat.pageWidth,
                ya: e.config.JSONPageDataFormat.pageHeight,
                zc: e.config.JSONPageDataFormat.textCollection,
                Ma: e.config.JSONPageDataFormat.textFragment,
                Vd: e.config.JSONPageDataFormat.textFont,
                pb: e.config.JSONPageDataFormat.textLeft,
                Va: e.config.JSONPageDataFormat.textTop,
                $b: e.config.JSONPageDataFormat.textWidth,
                Zb: e.config.JSONPageDataFormat.textHeight
            };
            e.da = e.file.indexOf && 0 <= e.file.indexOf("[*,") && e.config && e.config.jsonfile != s && !d.vg;
            e.Z = new za(e.p, e.da, e.JSONPageDataFormat, r);
            e.da && (e.rk = e.file.substr(e.file.indexOf("[*,"), e.file.indexOf("]") - e.file.indexOf("[*,")), e.qg = e.qg = z);
            PDFJS.workerSrc = ("undefined" != e.jsDirectory && e.jsDirectory != s ? e.jsDirectory : "js/") + "pdf.worker.min.js";
            jQuery.getScript(e.Rj, function () {
                if (e.qg) {
                    var g = new XMLHttpRequest;
                    g.open("HEAD", e.Ue(1), z);
                    g.overrideMimeType("application/pdf");
                    g.onreadystatechange = function () {
                        if (200 == g.status) {
                            var c = g.getAllResponseHeaders(), d = {};
                            if (c) {
                                for (var c = c.split("\r\n"), m = 0; m < c.length; m++) {
                                    var f = c[m], n = f.indexOf(": ");
                                    0 < n && (d[f.substring(0, n)] = f.substring(n + 2));
                                }
                            }
                            e.Sf = "bytes" === d["Accept-Ranges"];
                            e.Oi = "identity" === d["Content-Encoding"] || d["Content-Encoding"] === s || !d["Content-Encoding"];
                            e.Sf && (e.Oi && !eb.platform.ios && !eb.browser.safari) && (e.file = e.file.substr(0, e.file.indexOf(e.rk) - 1) + ".pdf", e.da = z);
                        }
                        g.abort();
                    };
                    try {
                        g.send(s);
                    } catch (m) {
                    }
                }
                window["wordPageList_" + e.p] = e.Z.qa;
                jQuery("#" + e.p).trigger("onDocumentLoading");
                FLOWPAPER.RANGE_CHUNK_SIZE && (PDFJS.RANGE_CHUNK_SIZE = FLOWPAPER.RANGE_CHUNK_SIZE);
                PDFJS.disableWorker = e.da || eb.browser.ic || eb.browser.msie;
                PDFJS.disableRange = e.da;
                PDFJS.disableAutoFetch = e.da || z;
                PDFJS.disableStream = e.da || z;
                PDFJS.pushTextGeometries = !e.da;
                PDFJS.verbosity = PDFJS.VERBOSITY_LEVELS.errors;
                PDFJS.enableStats = z;
                PDFJS.sl = r;
                PDFJS.tl = r;
                if (e.da) {
                    e.da && (e.config && e.config.jsonfile != s) && (e.da = r, e.gc = e.config.jsonfile, e.lm = new Promise(B()), l = FLOWPAPER.CHUNK_SIZE != s ? FLOWPAPER.CHUNK_SIZE : 10, e.Ic({
                        url: e.Wc(l), dataType: e.config.JSONDataType, success: function (c) {
                            c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), e.Uc = r);
                            jQuery(e).trigger("loadingProgress", {p: e.p, progress: 0.1});
                            if (0 < c.length) {
                                e.C = Array(c[0].pages);
                                for (var d = 0; d < c.length; d++) {
                                    e.C[d] = c[d];
                                    e.C[d].loaded = r;
                                    for (var g = 0; g < e.C[d].text.length; g++) {
                                        e.C[d].text[g][5] = la(e.C[d].text[g][5]);
                                    }
                                    e.Ee(d);
                                }
                                0 < e.C.length && (e.Ca = e.C[0].twofold, e.Ca && (e.cb = 1));
                                for (d = 0; d < e.C.length; d++) {
                                    e.C[d] == s && (e.C[d] = [], e.C[d].loaded = z);
                                }
                                e.Z && e.Z.Db && e.Z.Db(e.C);
                            }
                            e.Ec = 1;
                            e.ja = Array(c[0].pages);
                            e.Ja = Array(c[0].pages);
                            e.kf(e.Ec, function () {
                                jQuery(e).trigger("loadingProgress", {p: e.p, progress: 1});
                                e.sb();
                            }, s, function (c) {
                                c = 0.1 + c;
                                1 < c && (c = 1);
                                jQuery(e).trigger("loadingProgress", {p: e.p, progress: c});
                            });
                        }, error: function (g, m, f) {
                            m = g.responseText != s && 0 == g.responseText.indexOf("Error:") ? g.responseText.substr(6) : "";
                            this.url.indexOf("view.php") || this.url.indexOf("view.ashx") ? (console.log("Warning: Could not load JSON file. Switching to single file mode."), d.vg = r, e.da = z, e.initialize(c, d), e.pageThumbImagePattern = s) : J("Error loading JSON file (" + g.statusText + "," + f + "). Please check your configuration.", "onDocumentLoadedError", e.p, m);
                        }
                    }));
                } else {
                    e.gc = e.config.jsonfile;
                    var f = new jQuery.Deferred, l = FLOWPAPER.CHUNK_SIZE != s ? FLOWPAPER.CHUNK_SIZE : 10;
                    e.gc && 0 < e.gc.length ? e.Ic({
                        url: e.Wc(l),
                        dataType: e.config.JSONDataType,
                        success: function (c) {
                            c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), e.Uc = r);
                            if (0 < c.length) {
                                e.C = Array(c[0].pages);
                                for (var d = 0; d < c.length; d++) {
                                    e.C[d] = c[d];
                                    e.C[d].loaded = r;
                                    for (var g = 0; g < e.C[d].text.length; g++) {
                                        e.C[d].text[g][5] = la(e.C[d].text[g][5]);
                                    }
                                    e.Ee(d);
                                }
                                for (d = 0; d < e.C.length; d++) {
                                    e.C[d] == s && (e.C[d] = [], e.C[d].loaded = z);
                                }
                                e.Z && e.Z.Db && e.Z.Db(e.C);
                                0 < e.C.length && (e.Ca = e.C[0].twofold, e.Ca && (e.cb = 1));
                            }
                            f.resolve();
                        }
                    }) : f.resolve();
                    f.then(function () {
                        var c = {}, g = e.file;
                        d && (d.vg && g.match(/(page=\d)/ig)) && (g = g.replace(/(page=\d)/ig, ""));
                        e.file.indexOf && !(e.file instanceof Uint8Array) && !(e.file.indexOf && 0 == e.file.indexOf("blob:")) ? c.url = g : c = g;
                        e.kh() && (c.password = e.config.signature + "e0737b87e9be157a2f73ae6ba1352a65");
                        var m = 0;
                        c.rangeChunkSize = FLOWPAPER.RANGE_CHUNK_SIZE;
                        c = PDFJS.getDocument(c);
                        c.onPassword = function (c, d) {
                            jQuery("#" + e.p).trigger("onPasswordNeeded", c, d);
                        };
                        c.onProgress = function (c) {
                            m = c.loaded / c.total;
                            1 < m && (m = 1);
                            jQuery(e).trigger("loadingProgress", {p: e.p, progress: m});
                        };
                        c.then(function (c) {
                            0.5 > m && jQuery(e).trigger("loadingProgress", {p: e.p, progress: 0.5});
                            e.pdf = e.ja = c;
                            e.ja.getPageLabels().then(function (c) {
                                jQuery(e).trigger("labelsLoaded", {Lg: c});
                            });
                            e.initialized = r;
                            e.dimensions = s;
                            e.Ja = Array(!e.Ca ? e.ja.numPages : e.C.length);
                            e.dimensions = [];
                            (e.Ti = e.ja.getDestinations()).then(function (c) {
                                e.destinations = c;
                            });
                            (e.Oj = e.ja.getOutline()).then(function (c) {
                                e.outline = c || [];
                            });
                            var g = d && d.StartAtPage ? parseInt(d.StartAtPage) : 1;
                            e.ja.getPage(g).then(function (c) {
                                c = c.getViewport(1);
                                var d = e.ja.numPages;
                                !e.da && e.Ca && (d = e.C.length);
                                for (i = 1; i <= d; i++) {
                                    e.dimensions[i - 1] = [], e.dimensions[i - 1].page = i - 1, e.dimensions[i - 1].width = c.width, e.dimensions[i - 1].height = c.height, e.dimensions[i - 1].U = c.width, e.dimensions[i - 1].ia = c.height;
                                }
                                e.Ve = r;
                                jQuery(e).trigger("loadingProgress", {p: e.p, progress: 1});
                                1 == g && 1 < d && window.zine ? e.ja.getPage(2).then(function (c) {
                                    c = c.getViewport(1);
                                    e.Ca = 2 * Math.round(e.dimensions[0].width) >= Math.round(c.width) - 1 && 2 * Math.round(e.dimensions[0].width) <= Math.round(c.width) + 1;
                                    if (e.Ca) {
                                        e.C = Array(d);
                                        for (var g = 0; g < e.C.length; g++) {
                                            e.C[g] = {}, e.C[g].text = [], e.C[g].k = d, e.C[g].Ca = r, e.C[g].width = 0 == g ? e.dimensions[0].width : c.width, e.C[g].height = 0 == g ? e.dimensions[0].height : c.height, e.Ee(g);
                                        }
                                    }
                                    e.sb();
                                }) : e.sb();
                            });
                            (e.config.jsonfile == s || e.config.jsonfile != s && 0 == e.config.jsonfile.length || !e.da) && e.Ah(e.ja);
                        }, function (c) {
                            J("Cannot load PDF file (" + c + ")", "onDocumentLoadedError", e.p, "Cannot load PDF file (" + c + ")");
                            jQuery(e).trigger("loadingProgress", {p: e.p, progress: "Error"});
                        }, B(), function (c) {
                            jQuery(e).trigger("loadingProgress", {p: e.p, progress: c.loaded / c.total});
                        });
                    });
                }
            }).fail(B());
            e.JSONPageDataFormat = {
                ta: "width",
                ya: "height",
                zc: "text",
                Ma: "d",
                Vd: "f",
                pb: "l",
                Va: "t",
                $b: "w",
                Zb: "h"
            };
        }, kf: function (c, d, e) {
            var g = this, m = {};
            m.url = g.Ue(c);
            g.kh() && (m.password = g.config.signature + "e0737b87e9be157a2f73ae6ba1352a65");
            m.rangeChunkSize = FLOWPAPER.RANGE_CHUNK_SIZE;
            g.tn = PDFJS.getDocument(m).then(function (m) {
                g.ja[c - 1] = m;
                g.initialized = r;
                g.dimensions || (g.dimensions = []);
                g.ja[c - 1].getDestinations().then(function (c) {
                    g.destinations = c;
                });
                g.ja[c - 1].getPage(1).then(function (m) {
                    g.Ja[c - 1] = m;
                    var f = m.getViewport(g.Ca ? 1 : 1.5),
                        h = g.dimensions && g.dimensions[c - 1] ? g.dimensions[c - 1] : [], n = Math.floor(f.width),
                        f = Math.floor(f.height), D = h && h.width && !(n > h.width - 1 && n < h.width + 1),
                        w = h && h.height && !(f > h.height - 1 && f < h.height + 1);
                    g.dimensions[c - 1] = [];
                    g.dimensions[c - 1].loaded = r;
                    g.dimensions[c - 1].page = c - 1;
                    g.dimensions[c - 1].width = n;
                    1 < c && g.Ca && (c < g.ja[c - 1].numPages || 0 != g.ja[c - 1].numPages % 2) ? (g.dimensions[c - 1].width /= 2, g.dimensions[c - 1].U = n / 2) : g.dimensions[c - 1].U = n;
                    h.width && (!(g.dimensions[c - 1].width > h.width - 1 && g.dimensions[c - 1].width < h.width + 1) && e && !g.Ca) && (e.dimensions.U = n, e.dimensions.ia = f, e.Ta());
                    if (D || !g.dimensions[c - 1].U) {
                        g.dimensions[c - 1].U = n;
                    }
                    if (w || !g.dimensions[c - 1].ia) {
                        g.dimensions[c - 1].ia = f;
                    }
                    g.dimensions[c - 1].height = f;
                    if (1 < c && g.Ca && (c < g.ja[c - 1].numPages || 0 != g.ja[c - 1].numPages % 2)) {
                        g.dimensions[c - 1].U /= 2;
                    }
                    g.aa[c - 1] != s && g.aa.length > c && (g.dimensions[c - 1].Gb = g.aa[c].Gb, g.dimensions[c - 1].Fb = g.aa[c].Fb, g.dimensions[c - 1].ib = g.aa[c].ib, g.dimensions[c - 1].Pb = g.aa[c].Pb);
                    g.Qd[c - 1 + " " + m.ref.gen + " R"] = c - 1;
                    g.Ve = r;
                    g.Ec = -1;
                    d && d();
                });
                g.Ec = -1;
            }, function (c) {
                J("Cannot load PDF file (" + c + ")", "onDocumentLoadedError", g.p);
                jQuery(g).trigger("loadingProgress", {p: g.p, progress: "Error"});
                g.Ec = -1;
            });
        }, Ic: function (c) {
            var d = this;
            if ("lz" == d.config.JSONDataType) {
                if ("undefined" !== typeof Worker && !(eb.browser.msie && 11 > eb.browser.version)) {
                    var e = document.location.href.substr(0, document.location.href.lastIndexOf("/") + 1);
                    -1 == c.url.indexOf("http") && (c.url = e + c.url);
                    d.Oa || (d.Oa = {});
                    d.Oa[c.url] = c;
                    d.Oc || (d.Oc = new Worker(("undefined" != d.jsDirectory && d.jsDirectory != s ? d.jsDirectory : "js/") + "flowpaper.worker.js"), d.Oc.addEventListener("message", function (c) {
                        d.Oa[c.data.url] && ("undefined" !== typeof Response ? (new Response(c.data.JSON)).json().then(function (e) {
                            d.Oa[c.data.url] && (d.Oa[c.data.url].success(e), d.Oa[c.data.url] = s);
                        }) : d.Oa[c.data.url] && (d.Oa[c.data.url].success(JSON.parse(c.data.JSON)), d.Oa[c.data.url] = s));
                    }, z));
                    d.Oc.postMessage(c.url);
                } else {
                    ya(c.url, function (e, d) {
                        requestAnim(function () {
                            var e = "undefined" != typeof Uint8Array ? new Uint8Array(d) : d,
                                e = pako.tj(e, {Ak: "string"});
                            "undefined" !== typeof Response ? (new Response(e)).json().then(function (e) {
                                c.success(e);
                            }) : c.success(JSON.parse(e));
                        }, 10);
                    });
                }
            } else {
                return jQuery.ajax(c);
            }
        }, Wc: function (c) {
            return this.gc.replace("{page}", c);
        }, $e: function (c) {
            var d = 1;
            if (1 < c) {
                for (var e = 0; e < c; e++) {
                    (0 != e % 2 || 0 == e % 2 && 0 == c % 2 && e == c - 1) && d++;
                }
                return d;
            }
            return 1;
        }, kh: function () {
            return this.config.signature != s && 0 < this.config.signature.length;
        }, Ue: function (c) {
            this.config.PageIndexAdjustment && (c += this.config.PageIndexAdjustment);
            this.Ca && 1 < c && (c = this.$e(c));
            if (0 <= this.file.indexOf("{page}")) {
                return this.file.replace("{page}", c);
            }
            if (0 <= this.file.indexOf("[*,")) {
                var d = this.file.substr(this.file.indexOf("[*,"), this.file.indexOf("]") - this.file.indexOf("[*,") + 1);
                return this.file.replace(d, ra(c, parseInt(d.substr(d.indexOf(",") + 1, d.indexOf("]") - 2))));
            }
        }, cd: function (c) {
            var d = FLOWPAPER.CHUNK_SIZE != s ? FLOWPAPER.CHUNK_SIZE : 10;
            return 0 === d ? c : c + (d - c % d);
        }, hc: function (c, d, e, g, m) {
            var f = this;
            f.Ub == f.cd(c) ? (window.clearTimeout(m.yj), m.yj = setTimeout(function () {
                m.dimensions.loaded || f.hc(c, d, e, g, m);
            }, 100)) : (f.Ub = f.cd(c), f.Ic({
                url: f.Wc(f.Ub),
                dataType: f.config.JSONDataType,
                async: d,
                success: function (c) {
                    c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), f.Uc = r);
                    if (0 < c.length) {
                        for (var d = 0; d < c.length; d++) {
                            var g = parseInt(c[d].number) - 1;
                            f.C[g] = c[d];
                            f.C[g].loaded = r;
                            for (var A = 0; A < f.C[g].text.length; A++) {
                                f.C[g].text[A][5] = la(f.C[g].text[A][5]);
                            }
                            f.Bj(g);
                            f.Ee(g, m);
                        }
                        f.Z.Db && f.Z.Db(f.C);
                        jQuery(f).trigger("onTextDataUpdated");
                        e != s && e();
                    }
                    f.Ub = s;
                },
                error: function (c) {
                    J("Error loading JSON file (" + c.statusText + "). Please check your configuration.", "onDocumentLoadedError", f.p);
                    f.Ub = s;
                }
            }));
        }, Ee: function (c) {
            this.aa || (this.aa = []);
            this.aa[c] || (this.aa[c] = []);
            this.aa[c].Gb = this.C[c][this.JSONPageDataFormat.ta];
            this.aa[c].Fb = this.C[c][this.JSONPageDataFormat.ya];
            this.aa[c].ib = this.aa[c].Gb;
            this.aa[c].Pb = this.aa[c].Fb;
            c = this.aa[c];
            for (var d = 0; d < this.getNumPages(); d++) {
                this.aa[d] == s && (this.aa[d] = [], this.aa[d].Gb = c.Gb, this.aa[d].Fb = c.Fb, this.aa[d].ib = c.ib, this.aa[d].Pb = c.Pb);
            }
        }, getDimensions: function () {
            var c = this;
            if (c.dimensions == s || c.Ve || c.dimensions != s && 0 == c.dimensions.length) {
                c.dimensions == s && (c.dimensions = []);
                var d = c.ja.numPages;
                !c.da && c.Ca && (d = c.C.length);
                if (c.da) {
                    for (var e = 0; e < c.getNumPages(); e++) {
                        c.dimensions[e] != s || c.dimensions[e] != s && !c.dimensions[e].loaded ? (c.qb == s && (c.qb = c.dimensions[e]), !c.dimensions[e].ib && c.aa[e] != s && (c.dimensions[e].ib = c.aa[e].ib, c.dimensions[e].Pb = c.aa[e].Pb)) : c.qb != s && (c.dimensions[e] = [], c.dimensions[e].page = e, c.dimensions[e].loaded = z, c.dimensions[e].width = c.qb.width, c.dimensions[e].height = c.qb.height, c.dimensions[e].U = c.qb.U, c.dimensions[e].ia = c.qb.ia, c.aa[e] != s && (c.dimensions[e].width = c.aa[e].Gb, c.dimensions[e].height = c.aa[e].Fb, c.dimensions[e].U = c.aa[e].ib, c.dimensions[e].ia = c.aa[e].Pb), c.aa[e - 1] != s && (c.dimensions[e - 1].Gb = c.aa[e].Gb, c.dimensions[e - 1].Fb = c.aa[e].Fb, c.dimensions[e - 1].ib = c.aa[e].ib, c.dimensions[e - 1].Pb = c.aa[e].Pb), e == c.getNumPages() - 1 && (c.dimensions[e].Gb = c.aa[e].Gb, c.dimensions[e].Fb = c.aa[e].Fb, c.dimensions[e].ib = c.aa[e].ib, c.dimensions[e].Pb = c.aa[e].Pb), c.Qd[e + " 0 R"] = e);
                    }
                } else {
                    c.yg = [];
                    for (e = 1; e <= d; e++) {
                        var g = e;
                        c.Ca && (g = c.$e(e));
                        c.yg.push(c.ja.getPage(g).then(function (e) {
                            var d = e.getViewport(1);
                            c.dimensions[e.pageIndex] = [];
                            c.dimensions[e.pageIndex].page = e.pageIndex;
                            c.dimensions[e.pageIndex].width = d.width;
                            c.dimensions[e.pageIndex].height = d.height;
                            c.dimensions[e.pageIndex].U = d.width;
                            c.dimensions[e.pageIndex].ia = d.height;
                            d = e.ref;
                            c.Qd[d.num + " " + d.gen + " R"] = e.pageIndex;
                        }));
                    }
                    Promise.all && Promise.all(c.yg.concat(c.Ti).concat(c.Oj)).then(function () {
                        jQuery(c).trigger("outlineAdded", {p: c.p});
                    });
                }
                c.Ve = z;
            }
            return c.dimensions;
        }, Bj: function (c) {
            if (this.dimensions[c]) {
                this.dimensions[c].page = c;
                this.dimensions[c].loaded = r;
                this.Q[c] = [];
                this.Q[c] = "";
                for (var d = s, e = 0, g; g = this.C[c][this.JSONPageDataFormat.zc][e++];) {
                    this.ba ? !isNaN(g[0].toString()) && 0 <= Number(g[0].toString()) && (!isNaN(g[1].toString()) && 0 <= Number(g[1].toString()) && !isNaN(g[2].toString()) && 0 <= Number(g[2].toString()) && !isNaN(g[3].toString()) && 0 <= Number(g[3].toString())) && (d && (Math.round(d[0]) != Math.round(g[0]) && Math.round(d[1]) == Math.round(g[1])) && (this.Q[c] += " "), d && (Math.round(d[0]) != Math.round(g[0]) && !oa(this.Q[c], " ")) && (this.Q[c] += " "), d = /\\u([\d\w]{4})/gi, d = (g[5] + "").replace(d, function (c, e) {
                        return String.fromCharCode(parseInt(e, 16));
                    }), this.config.RTLMode || (this.Q[c] += d), this.config.RTLMode && (this.Q[c] += qa(d))) : !isNaN(g[this.JSONPageDataFormat.pb].toString()) && 0 <= Number(g[this.JSONPageDataFormat.pb].toString()) && (!isNaN(g[this.JSONPageDataFormat.Va].toString()) && 0 <= Number(g[this.JSONPageDataFormat.Va].toString()) && !isNaN(g[this.JSONPageDataFormat.$b].toString()) && 0 < Number(g[this.JSONPageDataFormat.$b].toString()) && !isNaN(g[this.JSONPageDataFormat.Zb].toString()) && 0 < Number(g[this.JSONPageDataFormat.Zb].toString())) && (d && (Math.round(d[this.JSONPageDataFormat.Va]) != Math.round(g[this.JSONPageDataFormat.Va]) && Math.round(d[this.JSONPageDataFormat.pb]) == Math.round(prev[this.JSONPageDataFormat.pb])) && (this.Q[c] += " "), d && (Math.round(d[this.JSONPageDataFormat.Va]) != Math.round(g[this.JSONPageDataFormat.Va]) && !oa(this.Q[c], " ")) && (this.Q[c] += " "), d = /\\u([\d\w]{4})/gi, d = (g[this.JSONPageDataFormat.Ma] + "").replace(d, function (c, e) {
                        return String.fromCharCode(parseInt(e, 16));
                    }), this.config.RTLMode || (this.Q[c] += d), this.config.RTLMode && (this.Q[c] += qa(d))), d = g;
                }
                this.Q[c] = this.Q[c].toLowerCase();
            }
        }, getNumPages: function () {
            return this.da ? this.C.length : this.Ca ? this.C.length : this.ja ? this.ja.numPages : this.C.length;
        }, getPage: function (c) {
            this.ja.getPage(c).then(function (c) {
                return c;
            });
            return s;
        }, mc: function (c) {
            var d = this;
            c.j == V || c.j == T ? (0 == c.pageNumber && jQuery(c.P).css("background-image", "url('" + d.ka(c.k.D + 1) + "')"), 1 == c.pageNumber && jQuery(c.P).css("background-image", "url('" + d.ka(c.k.D + 2) + "')")) : c.j == W ? jQuery(c.P).css("background-image", "url('" + d.ka(c.pageNumber + 1, 200) + "')") : c.j == X ? jQuery(c.P).css("background-image", "url('" + d.ka(d.ga(c) + 1) + "')") : jQuery(c.P).css("background-image", "url('" + d.ka(c.pageNumber + 1) + "')");
            c.ha = new Image;
            jQuery(c.ha).bind("load", function () {
                var e = Math.round(100 * (c.ha.width / c.ha.height)),
                    g = Math.round(100 * (c.dimensions.width / c.dimensions.height));
                if (c.j == X) {
                    var e = d.aa[c.k.D], m = Math.round(100 * (e.Gb / e.Fb)),
                        g = Math.round(100 * (c.dimensions.U / c.dimensions.ia));
                    m != g && (c.dimensions.U = e.Gb, c.dimensions.ia = e.Fb, c.Ta(), c.Gf = -1, d.ma(c, r, s));
                } else {
                    e != g && (c.dimensions.U = c.ha.width, c.dimensions.ia = c.ha.height, c.Ta(), c.Gf = -1, d.ma(c, r, s));
                }
            });
            jQuery(c.ha).attr("src", d.ka(c.pageNumber + 1));
        }, lh: function (c) {
            c.j == V || c.j == T ? (0 == c.pageNumber && jQuery(c.P).css("background-image", "url(" + this.Ka + ")"), 1 == c.pageNumber && jQuery(c.P).css("background-image", "url(" + this.Ka + ")")) : jQuery(c.P).css("background-image", "url(" + this.Ka + ")");
        }, oe: function (c) {
            this.wb = c.wb = this.da && this.config.MixedMode;
            if (c.j == S || c.j == X) {
                jQuery(c.K).append("<canvas id='" + this.Qa(1, c) + "' style='position:relative;left:0px;top:0px;width:100%;height:100%;display:none;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='" + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_rescale'></canvas><canvas id='" + this.Qa(2, c) + "' style='position:relative;left:0px;top:0px;width:100%;height:100%;display:block;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='" + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_rescale'></canvas>");
            }
            c.j == this.ea(c) && this.Fa(c).oe(this, c);
            c.j == W && jQuery(c.K).append("<canvas id='" + this.Qa(1, c) + "' style='" + c.getDimensions() + ";background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden' ></canvas>");
            if (c.j == V || c.j == T) {
                0 == c.pageNumber && (jQuery(c.K + "_1").append("<img id='" + c.bb + "_1' src='" + c.g.pc + "' style='position:absolute;left:" + (c.Aa() - 30) + "px;top:" + c.Ra() / 2 + "px;' />"), jQuery(c.K + "_1").append("<canvas id='" + this.Qa(1, c) + "' style='position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden'/></canvas>"), jQuery(c.K + "_1").append("<div id='" + c.S + "_1_textoverlay' style='position:relative;left:0px;top:0px;width:100%;height:100%;z-index:10'></div>")), 1 == c.pageNumber && (jQuery(c.K + "_2").append("<img id='" + c.bb + "_2' src='" + c.g.pc + "' style='position:absolute;left:" + (c.Aa() / 2 - 10) + "px;top:" + c.Ra() / 2 + "px;' />"), jQuery(c.K + "_2").append("<canvas id='" + this.Qa(2, c) + "' style='position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden'/></canvas>"), jQuery(c.K + "_2").append("<div id='" + c.S + "_2_textoverlay' style='position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:10'></div>"));
            }
        }, Qa: function (c, d) {
            var e = d.pageNumber;
            if ((d.j == V || d.j == T) && 0 == d.pageNumber % 2) {
                return this.p + "_dummyCanvas1";
            }
            if ((d.j == V || d.j == T) && 0 != d.pageNumber % 2) {
                return this.p + "_dummyCanvas2";
            }
            if (1 == c) {
                return this.ce.replace("[pageNumber]", e);
            }
            if (2 == c) {
                return this.de.replace("[pageNumber]", e);
            }
        }, ij: function (c, d) {
            if ((d.j == V || d.j == T) && 0 == d.pageNumber % 2) {
                return "#" + this.p + "_dummyCanvas1";
            }
            if ((d.j == V || d.j == T) && 0 != d.pageNumber % 2) {
                return "#" + this.p + "_dummyCanvas2";
            }
            if (1 == c) {
                return this.Ye.replace("[pageNumber]", d.pageNumber);
            }
            if (2 == c) {
                return this.Ze.replace("[pageNumber]", d.pageNumber);
            }
        }, Ob: function (c, d, e) {
            var g = this;
            g.ug = r;
            if (c.j != g.ea(c) || g.Fa(c).Pm(g, c, d, e)) {
                if ((c.j == S || c.j == V || c.j == T) && c.context == s && !c.jd) {
                    c.xc(), c.jd = r;
                }
                1 == g.$j && (1 < c.scale && c.wb) && g.ua(c, -1);
                if (-1 < g.ga(c) || g.da && g.pd != s) {
                    window.clearTimeout(c.Xb), c.Xb = setTimeout(function () {
                        setTimeout(function () {
                            g.Ob(c, d, e);
                        });
                    }, 50);
                } else {
                    g.Ng = c;
                    g.$j = c.scale;
                    if (c.j == V || c.j == T) {
                        if (0 == c.pageNumber) {
                            c.j == T ? g.ua(c, 0 == c.k.D ? c.k.D : c.k.D - 1) : c.j == V && g.ua(c, c.k.D), g.lg = c, c.$a();
                        } else {
                            if (1 == c.pageNumber) {
                                c.j == T ? g.ua(c, c.k.D) : c.j == V && g.ua(c, c.k.D + 1), g.lg = c, jQuery(c.K + "_2").removeClass("flowpaper_hidden"), jQuery(c.K + "_2").removeClass("flowpaper_load_on_demand"), c.$a();
                            } else {
                                return;
                            }
                        }
                    } else {
                        c.j == X ? g.ua(c, c.k.D) : (g.ua(c, c.pageNumber), g.lg = c);
                    }
                    g.ph(c);
                    if ((c.wb || g.da) && !c.dimensions.loaded) {
                        var m = c.pageNumber + 1;
                        c.j == X && (m = g.ga(c) + 1);
                        g.hc(m, r, function () {
                            c.dimensions.loaded = z;
                            g.Jb(c);
                        }, r, c);
                    }
                    var m = z, f = c.Pd;
                    if (c.j == S || c.j == X || c.j == V || c.j == T || c.j == g.ea(c) && g.Fa(c).gn(g, c)) {
                        var m = r, l = c.nb(), q = c.Aa(), h = c.Ra();
                        0 == jQuery("#" + f).length ? (q = "<div id='" + f + "' class='flowpaper_textLayer' style='width:" + q + "px;height:" + h + "px;backface-visibility:hidden;margin-left:" + l + "px;'></div>", c.j == S || g.ea(c) || c.j == X ? jQuery(c.V).append(q) : (c.j == V || c.j == T) && jQuery(c.V + "_" + (c.pageNumber % 2 + 1)).append(q)) : jQuery("#" + f).css({
                            width: q,
                            height: h,
                            "margin-left": l
                        });
                        if (90 == c.rotation || 270 == c.rotation || 180 == c.rotation) {
                            jQuery(c.Ba).css({
                                "z-index": 11,
                                "margin-left": l
                            }), jQuery(c.Ba).transition({rotate: c.rotation, translate: "-" + l + "px, 0px"}, 0);
                        }
                    }
                    if (c.wb && 1.1 >= c.scale && !c.Vi) {
                        -1 < g.ga(c) && window.clearTimeout(c.Xb), jQuery(c.K).removeClass("flowpaper_load_on_demand"), g.da && c.g.initialized && !c.Ki ? g.Qe.push(function () {
                            var e = new XMLHttpRequest;
                            e.open("GET", g.Ue(c.pageNumber + 1), r);
                            e.overrideMimeType("text/plain; charset=x-user-defined");
                            e.addEventListener("load", function () {
                                g.Se();
                            });
                            e.addEventListener("error", function () {
                                g.Se();
                            });
                            e.send(s);
                            c.Ki = r;
                        }) : g.Sf && g.Ja[g.ga(c)] == s && (l = g.ga(c) + 1, g.ja && g.ja.getPage && g.ja.getPage(l).then(function (e) {
                            g.Ja[g.ga(c)] = e;
                        })), c.j == g.ea(c) ? g.Fa(c).Ob(g, c, d, e) : (g.mc(c), g.Dd(c, e)), c.na = r;
                    } else {
                        if (c.wb && 1.1 < c.scale && !c.Vi) {
                            c.j != g.ea(c) && g.mc(c);
                        } else {
                            if (!c.wb && c.lf && c.j == g.ea(c) && 1 == c.scale && !g.We) {
                                if (!c.cc && 100 != c.P.width) {
                                    c.cc = c.P.toDataURL(), l = jQuery("#" + g.Qa(1, c)), l.css("background-image").length < c.cc.length + 5 && l.css("background-image", "url(" + c.cc + ")"), l[0].width = 100;
                                } else {
                                    if (c.cc && !g.da && "none" != jQuery("#" + g.Qa(1, c)).css("background-image")) {
                                        g.ua(c, -1);
                                        c.na = r;
                                        return;
                                    }
                                }
                                g.hh(c);
                            }
                        }
                        g.Ja[g.ga(c)] == s && !g.da && (l = g.ga(c) + 1, g.Ca && (l = g.$e(l)), g.ja && g.ja.getPage && g.ja.getPage(l).then(function (m) {
                            g.Ja[g.ga(c)] = m;
                            window.clearTimeout(c.Xb);
                            g.ua(c, -1);
                            g.Ob(c, d, e);
                        }));
                        if (c.P) {
                            if (100 != c.P.width && 1 == c.scale && c.j == g.ea(c) && !c.dk) {
                                jQuery("#" + g.Qa(1, c)).Cf(), jQuery("#" + g.Qa(2, c)).Gg(), 1 == c.scale && eb.browser.safari ? (jQuery("#" + g.Qa(1, c)).css("-webkit-backface-visibility", "hidden"), jQuery("#" + g.Qa(2, c)).css("-webkit-backface-visibility", "hidden"), jQuery("#" + c.S + "_textoverlay").css("-webkit-backface-visibility", "hidden")) : eb.browser.safari && (jQuery("#" + g.Qa(1, c)).css("-webkit-backface-visibility", "visible"), jQuery("#" + g.Qa(2, c)).css("-webkit-backface-visibility", "visible"), jQuery("#" + c.S + "_textoverlay").css("-webkit-backface-visibility", "visible")), g.ua(c, -1), c.na || jQuery("#" + g.p).trigger("onPageLoaded", c.pageNumber + 1), c.na = r, g.ma(c, r, e);
                            } else {
                                if (l = r, g.Ja[g.ga(c)] == s && g.da && (c.j == g.ea(c) && (l = g.Fa(c).Om(g, c)), g.ja[g.ga(c)] == s && (-1 == g.Ec && l && g.pd == s) && (g.Ec = g.ga(c) + 1, g.kf(g.Ec, function () {
                                    window.clearTimeout(c.Xb);
                                    g.ua(c, -1);
                                    g.Ob(c, d, e);
                                }, c))), !(g.Ja[g.ga(c)] == s && l) && (c.j == g.ea(c) ? g.Fa(c).Ob(g, c, d, e) : (c.P.width = c.Aa(), c.P.height = c.Ra()), g.Ca && 0 < c.kb.indexOf("cropCanvas") && (c.P.width *= 2), !(g.Ja[g.ga(c)] == s && l))) {
                                    if (g.ug) {
                                        l = c.P.height / g.getDimensions()[c.pageNumber].height;
                                        c.j != g.ea(c) && (l *= g.cb, g.da && (l *= 1.5));
                                        g.Ck = l;
                                        1.5 > l && (l = 1.5);
                                        g.nm = l;
                                        var A = g.Ja[g.ga(c)].getViewport(l);
                                        g.Ca || (c.P.width = A.width, c.P.height = A.height);
                                        var D = c.Xj = {
                                            canvasContext: c.context,
                                            viewport: A,
                                            pageNumber: c.pageNumber,
                                            Ch: m && !g.da ? new Aa(document.getElementById(f)) : s
                                        };
                                        g.Ja[g.ga(c)].objs.geometryTextList = [];
                                        window.ak(function () {
                                            c.P.style.display = "none";
                                            c.P.redraw = c.P.offsetHeight;
                                            c.P.style.display = "";
                                            g.pd = g.Ja[g.ga(c)].render(D);
                                            g.pd.onContinue = function (c) {
                                                c();
                                            };
                                            g.pd.promise.then(function () {
                                                g.pd = s;
                                                if (g.Ja[g.ga(c)] != s) {
                                                    if (!g.da && !(c.wb && 1.1 >= c.scale) && c.P) {
                                                        var d = c.P.height / g.getDimensions()[c.pageNumber].height,
                                                            m = g.Ja[g.ga(c)].objs.geometryTextList;
                                                        if (m) {
                                                            for (var f = 0; f < m.length; f++) {
                                                                m[f].hk != d && (m[f].h = m[f].metrics.height / d, m[f].l = m[f].metrics.left / d, m[f].t = m[f].metrics.top / d, m[f].w = m[f].textMetrics.geometryWidth / d, m[f].d = m[f].unicode, m[f].f = m[f].fontFamily, m[f].hk = d);
                                                            }
                                                            c.j == X || c.j == V || c.j == T ? g.Z.sh(m, g.ga(c), g.getNumPages()) : g.Z.sh(m, c.pageNumber, g.getNumPages());
                                                        }
                                                        g.wh(g.Ja[g.ga(c)], c, A, g.da);
                                                        g.Dd(c, e);
                                                        g.ma(c, r, e);
                                                    } else {
                                                        g.da || g.wh(g.Ja[g.ga(c)], c, A, g.da), g.Dd(c, e);
                                                    }
                                                } else {
                                                    g.Dd(c, e), da(c.pageNumber + "  is missing its pdf page (" + g.ga(c) + ")");
                                                }
                                            }, function (c) {
                                                J(c.toString(), "onDocumentLoadedError", g.p);
                                                g.pd = s;
                                            });
                                        }, 50);
                                    } else {
                                        g.ua(c, -1);
                                    }
                                    jQuery(c.K).removeClass("flowpaper_load_on_demand");
                                }
                            }
                        } else {
                            window.clearTimeout(c.Xb);
                        }
                    }
                }
            }
        }, hh: function (c) {
            var d = s, e = s;
            0 != c.pageNumber % 2 ? (d = c, e = c.g.k.k[c.pageNumber - 1]) : (e = c, d = c.g.k.k[c.pageNumber + 1]);
            if (c.j == this.ea(c) && !c.wb && c.lf && d && e && (!d.mf || !e.mf) && !this.We) {
                var g = e.cc, d = d.cc;
                g && (d && !c.mf) && e.lf(g, d);
            }
        }, ga: function (c) {
            return this.da || PDFJS.disableWorker || c == s ? this.Fc : c.Fc;
        }, ua: function (c, d) {
            if ((!this.da || c && c.wb && 1 == c.scale) && c) {
                c.Fc = d;
            }
            this.Fc = d;
        }, ph: function (c) {
            c.j == S || c.j == X ? jQuery(this.ij(1, c)).is(":visible") ? (c.kb = this.Qa(2, c), c.le = this.Qa(1, c)) : (c.kb = this.Qa(1, c), c.le = this.Qa(2, c)) : c.j == this.ea(c) ? this.Fa(c).ph(this, c) : (c.kb = this.Qa(1, c), c.le = s);
            this.Ca && 0 < c.pageNumber && 0 == c.pageNumber % 2 ? (c.P = document.createElement("canvas"), c.P.width = c.P.height = 100, c.P.id = c.kb + "_cropCanvas", c.kb += "_cropCanvas") : c.P = document.getElementById(c.kb);
            c.sj != s && (c.sj = document.getElementById(c.le));
            c.P && c.P.getContext && (c.context = c.P.getContext("2d"), c.context.ln = c.context.mozImageSmoothingEnabled = c.context.imageSmoothingEnabled = z);
        }, Pi: function (c, d, e, g) {
            c = g.convertToViewportRectangle(d.rect);
            c = PDFJS.Util.normalizeRect(c);
            d = e.nb();
            g = document.createElement("a");
            var m = e.j == this.ea(e) ? 1 : this.cb;
            g.style.position = "absolute";
            g.style.left = Math.floor(c[0]) / m + d + "px";
            g.style.top = Math.floor(c[1]) / m + "px";
            g.style.width = Math.ceil(c[2] - c[0]) / m + "px";
            g.style.height = Math.ceil(c[3] - c[1]) / m + "px";
            g.style["z-index"] = 20;
            g.style.cursor = "pointer";
            g.className = "pdfPageLink_" + e.pageNumber + " flowpaper_interactiveobject_" + this.p;
            return g;
        }, wh: function (c, d, e, g) {
            var m = this;
            1 != d.scale && d.j == m.ea(d) || (jQuery(".pdfPageLink_" + d.pageNumber).remove(), c.getAnnotations().then(function (e) {
                for (var f = 0; f < e.length; f++) {
                    var q = e[f];
                    switch (q.subtype) {
                        case"Link":
                            var h = m.Pi("a", q, d, c.getViewport(m.Ck), c.view);
                            h.style.position = "absolute";
                            h.href = q.url || "";
                            eb.platform.touchonlydevice || (jQuery(h).on("mouseover", function () {
                                jQuery(this).stop(r, r);
                                jQuery(this).css("background", d.g.linkColor);
                                jQuery(this).css({opacity: d.g.pe});
                            }), jQuery(h).on("mouseout", function () {
                                jQuery(this).css("background", "");
                                jQuery(this).css({opacity: 0});
                            }));
                            !q.url && !g ? (q = "string" === typeof q.dest ? m.destinations[q.dest][0] : q != s && q.dest != s ? q.dest[0] : s, q = q instanceof Object ? m.Qd[q.num + " " + q.gen + " R"] : q + 1, jQuery(h).data("gotoPage", q + 1), jQuery(h).on("click touchstart", function () {
                                d.g.gotoPage(parseInt(jQuery(this).data("gotoPage")));
                                return z;
                            }), jQuery(d.V).append(h)) : h.href != s && ("" != h.href && q.url) && (jQuery(h).on("click touchstart", function () {
                                jQuery(d.r).trigger("onExternalLinkClicked", this.href);
                            }), jQuery(d.V).append(h));
                    }
                }
            }));
        }, Dd: function (c, d) {
            this.ma(c, r, d);
            jQuery("#" + c.kb).Cf();
            this.pj(c);
            (c.j == S || c.j == X) && jQuery(c.Nb).remove();
            c.j == this.ea(c) && this.Fa(c).Dd(this, c, d);
            if (c.kb && 0 < c.kb.indexOf("cropCanvas")) {
                var e = c.P;
                c.kb = c.kb.substr(0, c.kb.length - 11);
                c.P = jQuery("#" + c.kb).get(0);
                c.P.width = e.width / 2;
                c.P.height = e.height;
                c.P.getContext("2d").drawImage(e, e.width / 2, 0, c.P.width, c.P.height, 0, 0, e.width / 2, e.height);
                jQuery(c.P).Cf();
            }
            !c.wb && (c.lf && !c.mf && c.P && !this.We) && (c.cc = c.P.toDataURL(), this.hh(c));
            if (c.cc && 1 == c.scale && !this.We) {
                var g = jQuery("#" + this.Qa(1, c));
                requestAnim(function () {
                    g.css("background-image").length < c.cc.length + 5 && g.css("background-image", "url(" + c.cc + ")");
                    g[0].width = 100;
                });
            }
            if (c.j == V || c.j == T) {
                0 == c.pageNumber && (jQuery(c.O).removeClass("flowpaper_hidden"), jQuery(c.K + "_1").removeClass("flowpaper_hidden")), 1 == c.pageNumber && jQuery(c.O).removeClass("flowpaper_hidden");
            }
            c.na || jQuery("#" + this.p).trigger("onPageLoaded", c.pageNumber + 1);
            c.na = r;
            c.dk = z;
            c.Sl = z;
            this.fd || (this.fd = r, c.g.tf());
            d != s && d();
            this.Se();
        }, Se: function () {
            0 < this.Qe.length && (-1 == this.ga() && this.Ng.na && !this.Ng.Ql) && this.Qe.shift()();
        }, pj: function (c) {
            c.j != V && (c.j != T && (c.j != this.ea(c) || eb.browser.safari)) && jQuery("#" + c.le).Gg();
            this.ua(c, -1);
        }, ka: function (c, d) {
            this.config.RTLMode && (this.C && this.C.length) && (c = this.C.length - c + 1);
            this.Uc && (c = CryptoJS.RC4.encrypt(c.toString(), CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.oc.innerHTML)).toString());
            this.config.PageIndexAdjustment && (c += this.config.PageIndexAdjustment);
            if (d) {
                if (this.pageThumbImagePattern != s && 0 < this.pageThumbImagePattern.length) {
                    return this.pageThumbImagePattern.replace("{page}", c) + (0 < this.pageThumbImagePattern.indexOf("?") ? "&" : "?") + "resolution=" + d;
                }
            } else {
                return this.pageSVGImagePattern ? this.pageSVGImagePattern.replace("{page}", c) : this.pageImagePattern.replace("{page}", c);
            }
        }, unload: function (c) {
            jQuery(".flowpaper_pageword_" + this.p + "_page_" + c.pageNumber + ":not(.flowpaper_selected_searchmatch, .flowpaper_annotation_" + this.p + ")").remove();
            c.j != this.ea(c) && this.lh(c);
            c.wb && (jQuery(c.P).css("background-image", "url(" + this.Ka + ")"), c.ha = s);
            c.context != s && (c.P != s && 100 != c.P.width) && (this.context = this.P = c.Xj = s, c.ub && c.ub(), jQuery(".flowpaper_annotation_" + this.p + "_page_" + c.pageNumber).remove());
            this.da && (this.Ja[c.pageNumber] && this.Ja[c.pageNumber].cleanup(), this.ja[c.pageNumber] = s, this.Ja[c.pageNumber] = s);
            c.Jf && c.Jf();
        }, Ah: function (c) {
            var d = this;
            d.ja && d.ja.getPage(d.re).then(function (e) {
                e.getTextContent().then(function (e) {
                    var m = "";
                    if (e) {
                        for (var f = 0; f < e.items.length; f++) {
                            m += e.items[f].str;
                        }
                    }
                    d.Q[d.re - 1] = m.toLowerCase();
                    d.re + 1 < d.getNumPages() + 1 && (d.re++, d.Ah(c));
                });
            });
        }, Jb: function (c, d, e, g) {
            this.Z.Jb(c, d, e, g);
        }, xb: function (c, d, e, g) {
            this.Z.xb(c, d, e, g);
        }, Cc: function (c, d, e, g) {
            this.Z.Cc(c, d, e, g);
        }, ma: function (c, d, e) {
            var g = this.C != s && this.C[c.pageNumber] && this.C[c.pageNumber].text && 0 < this.C[c.pageNumber].text.length && this.da;
            if (c.na || d || g) {
                c.Gf != c.scale && (jQuery(".flowpaper_pageword_" + this.p + "_page_" + c.pageNumber).remove(), c.Gf = c.scale), d = this.ud != s ? this.ud : e, this.ud = s, this.Z && this.Z.ma && this.Z.ma(c, d);
            } else {
                if (e != s) {
                    if (this.ud != s) {
                        var m = this.ud;
                        this.ud = function () {
                            m();
                            e();
                        };
                    } else {
                        this.ud = e;
                    }
                }
            }
        }
    };
    return f;
}();

function Aa(f) {
    this.Wm = f;
    this.beginLayout = function () {
        this.textDivs = [];
        this.Ym = [];
        this.Fe = [];
    };
    this.endLayout = B();
    this.hl = B();
}

var za = window.TextOverlay = function () {
    function f(c, d, e, g) {
        this.p = c;
        this.JSONPageDataFormat = e;
        this.C = [];
        this.fa = s;
        this.qa = [];
        this.ba = this.Hk = d;
        this.dc = g;
        this.state = {};
        this.Ka = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }

    f.prototype = {
        lb: function () {
            delete this.p;
            this.p = s;
            delete this.C;
            this.C = s;
            delete this.JSONPageDataFormat;
            this.JSONPageDataFormat = s;
            delete this.fa;
            this.fa = s;
            delete this.qa;
            this.qa = s;
            delete this.state;
            this.state = s;
            delete this.Ka;
            this.Ka = s;
            delete this.dc;
            this.dc = s;
        }, saveState: function () {
            this.state[this.ba] || (this.state[this.ba] = [], this.state[this.ba].C = this.C, this.state[this.ba].fa = this.fa, this.state[this.ba].qa = this.qa, window["wordPageList_" + this.p] = s);
            this.C = [];
            this.fa = s;
            this.qa = [];
            this.ba = this.Hk;
        }, ea: function (c) {
            return c.g.u ? c.g.u.H : "";
        }, Fa: function (c) {
            return c.g.u.Xm;
        }, Ii: function (c) {
            return c.g.document.AutoDetectLinks;
        }, Db: function (c) {
            this.C = c;
            this.fa == s && (this.fa = Array(c.length));
            window["wordPageList_" + this.p] = this.qa;
        }, sh: function (c, d, e) {
            this.fa == s && (this.fa = Array(e));
            this.C[d] = [];
            this.C[d].text = c;
            window["wordPageList_" + this.p] = this.qa;
        }, Jb: function (c, d, e, g) {
            var m = c.pageNumber, f = z, l = z;
            if (!this.fa) {
                if (c.wb && (this.ba = r), this.state[this.ba]) {
                    if (this.C = this.state[this.ba].C, this.fa = this.state[this.ba].fa, this.qa = this.state[this.ba].qa, window["wordPageList_" + this.p] = this.qa, !this.fa) {
                        return;
                    }
                } else {
                    return;
                }
            }
            if (!window.annotations && eb.touchdevice && !g) {
                e && e();
            } else {
                if (!window.annotations && (!c.g.va && !g && !c.g.Ig) && (f = r), l = this.Vb != s && this.Vb[c.pageNumber] != s, c.j != W) {
                    if (c.j == T && (0 == c.pageNumber && (m = 0 != c.k.D ? c.k.D - 1 : c.k.D), 1 == c.pageNumber && (m = c.k.D), 0 == c.k.getTotalPages() % 2 && m == c.k.getTotalPages() && (m -= 1), 0 == c.k.D % 2 && c.k.D > c.k.getTotalPages())) {
                        return;
                    }
                    c.j == X && (m = c.k.D);
                    if (c.j == V && (0 == c.pageNumber && (m = c.k.D), 1 == c.pageNumber && (m = c.k.D + 1), 1 == c.pageNumber && m >= c.k.getTotalPages() && 0 != c.k.getTotalPages() % 2)) {
                        return;
                    }
                    d = c.Ha || !d;
                    c.j == this.ea(c) && (isvisble = this.Fa(c).hd(this, c));
                    var q = jQuery(".flowpaper_pageword_" + this.p + "_page_" + m + ":not(.flowpaper_annotation_" + this.p + ")" + (g ? ":not(.pdfPageLink_" + m + ")" : "")).length;
                    g = c.dimensions.ib != s ? c.dimensions.ib : c.dimensions.U;
                    g = this.dc ? c.Aa() / g : 1;
                    if (d && 0 == q) {
                        var h = q = "", A = 0, D = m;
                        c.g.config.document.RTLMode && (D = c.k.getTotalPages() - m - 1);
                        if (this.fa[D] == s || !this.dc) {
                            if (this.C[D] == s) {
                                return;
                            }
                            this.fa[D] = this.C[D][this.JSONPageDataFormat.zc];
                        }
                        if (this.fa[D] != s) {
                            c.wb && (this.ba = r);
                            var w = new WordPage(this.p, m), m = c.nb(), t = [], x = c.Mc(), v = c.xg(), G = z, C = -1,
                                y = -1, K = 0, I = -1, P = -1, L = z;
                            this.qa[D] = w;
                            c.j == this.ea(c) && (g = this.Fa(c).Dl(this, c, g));
                            c.Zm = g;
                            for (var N = 0, u; u = this.fa[D][N++];) {
                                var H = N - 1, E = !this.ba ? u[this.JSONPageDataFormat.Ma] : u[5], M = N, O = N + 1,
                                    Q = N < this.fa[D].length ? this.fa[D][N] : s,
                                    U = N + 1 < this.fa[D].length ? this.fa[D][N + 1] : s,
                                    G = Q ? !this.ba ? Q[this.JSONPageDataFormat.Ma] : Q[5] : "",
                                    R = U ? !this.ba ? U[this.JSONPageDataFormat.Ma] : U[5] : "";
                                " " == G && (M = N + 1, O = N + 2, G = (Q = M < this.fa[D].length ? this.fa[D][M] : s) ? !this.ba ? Q[this.JSONPageDataFormat.Ma] : Q[5] : "", R = (U = O < this.fa[D].length ? this.fa[D][O] : s) ? !this.ba ? U[this.JSONPageDataFormat.Ma] : U[5] : "");
                                Q = U = s;
                                if (E == s) {
                                    da("word not found in node");
                                    e && e();
                                    return;
                                }
                                0 == E.length && (E = " ");
                                L = s;
                                if (-1 == E.indexOf("actionGoToR") && -1 == E.indexOf("actionGoTo") && -1 == E.indexOf("actionURI") && this.Ii(c)) {
                                    if (L = E.match(/\b((?:(https?|ftp):(?:\/{1,3}|[0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig)) {
                                        E = "actionURI(" + L[0] + "):" + L[0], this.fa[D][H][!this.ba ? this.JSONPageDataFormat.Ma : 5] = E;
                                    }
                                    if (!L && -1 < E.indexOf("@")) {
                                        L = E.trim().match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                                        if (!L && (L = (E.trim() + G.trim()).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi))) {
                                            G = "actionURI(mailto:" + L[0] + "):" + L[0], this.fa[D][M][!this.ba ? this.JSONPageDataFormat.Ma : 5] = G;
                                        }
                                        if (!L && (L = (E.trim() + G.trim() + R.trim()).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi))) {
                                            G = "actionURI(mailto:" + L[0] + "):" + L[0], this.fa[D][M][!this.ba ? this.JSONPageDataFormat.Ma : 5] = G, R = "actionURI(mailto:" + L[0] + "):" + L[0], this.fa[D][O][!this.ba ? this.JSONPageDataFormat.Ma : 5] = R;
                                        }
                                        L && (E = L[0], oa(E, ".") && (E = E.substr(0, E.length - 1)), E = "actionURI(mailto:" + E + "):" + E, this.fa[D][H][!this.ba ? this.JSONPageDataFormat.Ma : 5] = E);
                                    }
                                }
                                if (0 <= E.indexOf("actionGoToR")) {
                                    U = E.substring(E.indexOf("actionGoToR") + 12, E.indexOf(",", E.indexOf("actionGoToR") + 13)), E = E.substring(E.indexOf(",") + 1);
                                } else {
                                    if (0 <= E.indexOf("actionGoTo")) {
                                        U = E.substring(E.indexOf("actionGoTo") + 11, E.indexOf(",", E.indexOf("actionGoTo") + 12)), E = E.substring(E.indexOf(",") + 1);
                                    } else {
                                        if (0 <= E.indexOf("actionURI") || L) {
                                            if (0 <= E.indexOf("actionURI(") && 0 < E.indexOf("):") ? (Q = E.substring(E.indexOf("actionURI(") + 10, E.lastIndexOf("):")), E = E.substring(E.indexOf("):") + 2)) : (Q = E.substring(E.indexOf("actionURI") + 10), E = E.substring(E.indexOf("actionURI") + 10)), -1 == Q.indexOf("http") && -1 == Q.indexOf("mailto") && 0 != Q.indexOf("/")) {
                                                Q = "http://" + Q;
                                            } else {
                                                if (!L) {
                                                    H = N;
                                                    M = !this.ba ? u[this.JSONPageDataFormat.Ma] : u[5];
                                                    for (O = 1; 2 >= O; O++) {
                                                        for (H = N; H < this.fa[D].length && 0 <= this.fa[D][H].toString().indexOf("actionURI") && -1 == this.fa[D][H].toString().indexOf("actionURI(");) {
                                                            G = this.fa[D][H], L = !this.ba ? G[this.JSONPageDataFormat.Ma] : G[5], 1 == O ? 0 <= L.indexOf("actionURI") && (11 < L.length && -1 == L.indexOf("http://") && -1 == L.indexOf("https://") && -1 == L.indexOf("mailto")) && (M += L.substring(L.indexOf("actionURI") + 10)) : !this.ba ? G[this.JSONPageDataFormat.Ma] : G[5] = M, H++;
                                                        }
                                                        2 == O && -1 == M.indexOf("actionURI(") && (E = M, Q = E.substring(E.indexOf("actionURI") + 10), E = E.substring(E.indexOf("actionURI") + 10));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (U || Q || !f || l) {
                                    M = (!this.ba ? u[this.JSONPageDataFormat.Va] : u[0]) * g + 0;
                                    O = (!this.ba ? u[this.JSONPageDataFormat.pb] : u[1]) * g + 0;
                                    H = (!this.ba ? u[this.JSONPageDataFormat.$b] : u[2]) * g;
                                    u = (!this.ba ? u[this.JSONPageDataFormat.Zb] : u[3]) * g;
                                    w.nk(A, E);
                                    G = -1 != C && C != M;
                                    L = N == this.fa[D].length;
                                    O + H > x && (H = x - O);
                                    M + u > v && (u = v - M);
                                    t[A] = {};
                                    t[A].left = O;
                                    t[A].right = O + H;
                                    t[A].top = M;
                                    t[A].bottom = M + u;
                                    t[A].el = "#" + this.p + "page_" + D + "_word_" + A;
                                    t[A].i = A;
                                    t[A].bh = U;
                                    t[A].Hh = Q;
                                    q += "<span id='" + this.p + "page_" + D + "_word_" + A + "' class='flowpaper_pageword flowpaper_pageword_" + this.p + "_page_" + D + " flowpaper_pageword_" + this.p + (U != s || Q != s ? " pdfPageLink_" + c.pageNumber : "") + "' style='left:" + O + "px;top:" + M + "px;width:" + H + "px;height:" + u + "px;margin-left:0px;" + (t[A].bh || t[A].Hh ? "cursor:hand;" : "") + ";" + (eb.browser.msie ? "background-image:url(" + this.Ka + ");color:transparent;" : "") + "'>" + (c.g.Ig ? E : "") + "</span>";
                                    if (U != s || Q != s) {
                                        R = document.createElement("a");
                                        R.style.position = "absolute";
                                        R.style.left = Math.floor(O) + m + "px";
                                        R.style.top = Math.floor(M) + "px";
                                        R.style.width = Math.ceil(H) + "px";
                                        R.style.height = Math.ceil(u) + "px";
                                        R.style["margin-left"] = m;
                                        R.style.cursor = "pointer";
                                        R.setAttribute("data-href", Q != s ? Q : "");
                                        R.setAttribute("rel", "nofollow noopener");
                                        jQuery(R).css("z-index", "99");
                                        R.className = "pdfPageLink_" + c.pageNumber + " flowpaper_interactiveobject_" + this.p + " flowpaper_pageword_" + this.p + "_page_" + D + " gotoPage_" + U + " flowpaper_pageword_" + this.p;
                                        eb.platform.touchonlydevice && (R.style.background = c.g.linkColor, R.style.opacity = c.g.pe);
                                        U != s && (jQuery(R).data("gotoPage", U), jQuery(R).on("click touchstart", function () {
                                            c.g.gotoPage(parseInt(jQuery(this).data("gotoPage")));
                                            return z;
                                        }));
                                        if (Q != s) {
                                            jQuery(R).on("click touchstart", function (e) {
                                                jQuery(c.r).trigger("onExternalLinkClicked", this.getAttribute("data-href"));
                                                e.stopImmediatePropagation();
                                                e.preventDefault();
                                                return z;
                                            });
                                        }
                                        eb.platform.touchonlydevice || (jQuery(R).on("mouseover", function () {
                                            jQuery(this).stop(r, r);
                                            jQuery(this).css("background", c.g.linkColor);
                                            jQuery(this).css({opacity: c.g.pe});
                                        }), jQuery(R).on("mouseout", function () {
                                            jQuery(this).css("background", "");
                                            jQuery(this).css({opacity: 0});
                                        }));
                                        c.j == V || c.j == T ? (0 == c.pageNumber && jQuery(c.K + "_1_textoverlay").append(R), 1 == c.pageNumber && jQuery(c.K + "_2_textoverlay").append(R)) : jQuery(c.V).append(R);
                                    }
                                    eb.platform.touchdevice && c.j == S && (G || L ? (L && (K += H, h = h + "<div style='float:left;width:" + H + "px'>" + (" " == E ? "&nbsp;" : E) + "</div>"), h = "<div id='" + this.p + "page_" + D + "_word_" + A + "_wordspan' class='flowpaper_pageword flowpaper_pageword_" + this.p + "_page_" + D + " flowpaper_pageword_" + this.p + "' style='color:transparent;left:" + I + "px;top:" + C + "px;width:" + K + "px;height:" + y + "px;margin-left:" + P + "px;font-size:" + y + "px" + (t[A].bh || t[A].Hh ? "cursor:hand;" : "") + "'>" + h + "</div>", jQuery(c.sf).append(h), C = M, y = u, K = H, I = O, P = m, h = "<div style='background-colorfloat:left;width:" + H + "px'>" + (" " == E ? "&nbsp;" : E) + "</div>") : (-1 == I && (I = O), -1 == P && (P = m), -1 == C && (C = M), -1 == y && (y = u), h = h + "<div style='float:left;width:" + H + "px'>" + (" " == E ? "&nbsp;" : E) + "</div>", K += H, y = u));
                                }
                                A++;
                            }
                            w.mk(t);
                            c.j == S && (0 == jQuery(c.Ba).length && (f = c.Pd, H = c.Aa(), u = c.Ra(), m = c.nb(), jQuery(c.V).append("<div id='" + f + "' class='flowpaper_textLayer' style='width:" + H + "px;height:" + u + "px;margin-left:" + m + "px;'></div>")), jQuery(c.Ba).append(q));
                            c.j == X && (0 == jQuery(c.Ba).length && (f = c.Pd, H = c.Aa(), u = c.Ra(), m = c.nb(), jQuery(c.V).append("<div id='" + f + "' class='flowpaper_textLayer' style='width:" + H + "px;height:" + u + "px;margin-left:" + m + "px;'></div>")), jQuery(c.Ba).append(q));
                            c.j == this.ea(c) && (0 == jQuery(c.Ba).length && (f = c.jc + "_textLayer", H = c.Aa(), u = c.Ra(), m = c.nb(), jQuery(c.V).append("<div id='" + f + "' class='flowpaper_textLayer' style='width:" + H + "px;height:" + u + "px;margin-left:" + m + "px;'></div>")), this.Fa(c).il(this, c, q));
                            if (c.j == V || c.j == T) {
                                0 == c.pageNumber && jQuery(c.K + "_1_textoverlay").append(q), 1 == c.pageNumber && jQuery(c.K + "_2_textoverlay").append(q);
                            }
                            d && jQuery(c).trigger("onAddedTextOverlay", c.pageNumber);
                            if (l) {
                                for (l = 0; l < this.Vb[c.pageNumber].length; l++) {
                                    this.vi(c, this.Vb[c.pageNumber][l].vk, this.Vb[c.pageNumber][l].zk);
                                }
                            }
                        }
                    }
                    e != s && e();
                }
            }
        }, xb: function (c, d, e, g, m) {
            var f = this;
            window.annotations || jQuery(c).unbind("onAddedTextOverlay");
            var l = c.j == V || c.j == T ? c.k.D + c.pageNumber : c.pageNumber;
            c.j == T && (0 < c.k.D && 1 == c.pageNumber) && (l -= 2);
            c.j == X && (l = c.k.D);
            if ((c.Ha || !e) && c.g.sa - 1 == l) {
                jQuery(".flowpaper_selected").removeClass("flowpaper_selected");
                jQuery(".flowpaper_selected_searchmatch").removeClass("flowpaper_selected_searchmatch");
                jQuery(".flowpaper_selected_default").removeClass("flowpaper_selected_default");
                jQuery(".flowpaper_tmpselection").remove();
                var q = jQuery(".flowpaper_pageword_" + f.p + "_page_" + c.pageNumber + ":not(.flowpaper_annotation_" + f.p + "):not(.pdfPageLink_" + c.pageNumber + ")").length;
                m && (q = jQuery(".flowpaper_pageword_" + f.p + "_page_" + c.pageNumber + ":not(.flowpaper_annotation_" + f.p + ")").length);
                if (!f.qa[l] || 0 == q) {
                    jQuery(c).bind("onAddedTextOverlay", function () {
                        f.xb(c, d, e, g, r);
                    }), f.Jb(c, e, s, r);
                } else {
                    m = f.qa[l].words;
                    for (var q = "", h = 0, A = 0, D = -1, w = -1, t = d.split(" "), x = 0, v = 0, G = 0; G < m.length; G++) {
                        var C = sa((m[G] + "").toLowerCase()), x = x + C.length;
                        x > g && x - d.length <= g + v && (v += d.length);
                        if (!C && (jQuery.trim(C) == d || jQuery.trim(q + C) == d)) {
                            C = jQuery.trim(C);
                        }
                        if (0 == d.indexOf(q + C) && (q + C).length <= d.length && " " != q + C) {
                            if (q += C, -1 == D && (D = h, w = h + 1), d.length == C.length && (D = h), q.length == d.length) {
                                if (A++, c.g.wc == A) {
                                    if (c.j == S || c.j == X) {
                                        eb.browser.Da.Ia ? jQuery("#pagesContainer_" + f.p).scrollTo(jQuery(f.qa[l].ca[D].el), 0, {
                                            axis: "xy",
                                            offset: -30
                                        }) : jQuery("#pagesContainer_" + f.p).data("jsp").scrollToElement(jQuery(f.qa[l].ca[D].el), z);
                                    }
                                    for (var y = D; y < h + 1; y++) {
                                        c.j == f.ea(c) ? (C = jQuery(f.qa[l].ca[y].el).clone(), f.Fa(c).Hi(f, c, C, d, r, y == D, y == h)) : (jQuery(f.qa[l].ca[y].el).addClass("flowpaper_selected"), jQuery(f.qa[l].ca[y].el).addClass("flowpaper_selected_default"), jQuery(f.qa[l].ca[y].el).addClass("flowpaper_selected_searchmatch"));
                                    }
                                } else {
                                    q = "", D = -1;
                                }
                            }
                        } else {
                            if (0 <= (q + C).indexOf(t[0])) {
                                -1 == D && (D = h, w = h + 1);
                                q += C;
                                if (1 < t.length) {
                                    for (C = 0; C < t.length - 1; C++) {
                                        0 < t[C].length && m.length > h + 1 + C && 0 <= (q + m[h + 1 + C]).toLowerCase().indexOf(t[C]) ? (q += m[h + 1 + C].toLowerCase(), w = h + 1 + C + 1) : (q = "", w = D = -1);
                                    }
                                }
                                -1 == q.indexOf(d) && (q = "", w = D = -1);
                                y = (q.match(RegExp(d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "g")) || []).length;
                                if (0 < q.length) {
                                    for (var K = 0; K < y; K++) {
                                        if (-1 < q.indexOf(d) && A++, c.g.wc == A) {
                                            for (var I = jQuery(f.qa[l].ca[D].el), P = parseFloat(I.css("left").substring(0, I.css("left").length - 2)) - (c.j == f.ea(c) ? c.nb() : 0), C = I.clone(), L = 0, N = 0, u = 0; D < w; D++) {
                                                L += parseFloat(jQuery(f.qa[l].ca[D].el).css("width").substring(0, I.css("width").length - 2));
                                            }
                                            N = 1 - (q.length - d.length) / q.length;
                                            w = -1;
                                            for (D = 0; D < K + 1; D++) {
                                                w = q.indexOf(d, w + 1), u = w / q.length;
                                            }
                                            C.addClass("flowpaper_tmpselection");
                                            C.attr("id", C.attr("id") + "tmp");
                                            C.addClass("flowpaper_selected");
                                            C.addClass("flowpaper_selected_searchmatch");
                                            C.addClass("flowpaper_selected_default");
                                            C.css("width", L * N + "px");
                                            C.css("left", P + L * u + "px");
                                            if (c.j == S || c.j == X) {
                                                jQuery(c.Ba).append(C), eb.browser.Da.Ia ? jQuery("#pagesContainer_" + f.p).scrollTo(C, 0, {
                                                    axis: "xy",
                                                    offset: -30
                                                }) : jQuery("#pagesContainer_" + f.p).data("jsp").scrollToElement(C, z);
                                            }
                                            c.j == f.ea(c) && f.Fa(c).Hi(f, c, C, d);
                                            c.j == T && (0 == l ? jQuery("#dummyPage_0_" + f.p + "_1_textoverlay").append(C) : jQuery("#dummyPage_" + (l - 1) % 2 + "_" + f.p + "_" + ((l - 1) % 2 + 1) + "_textoverlay").append(C));
                                            c.j == V && jQuery("#dummyPage_" + l % 2 + "_" + f.p + "_" + (l % 2 + 1) + "_textoverlay").append(C);
                                            w = D = -1;
                                        } else {
                                            K == y - 1 && (q = "", w = D = -1);
                                        }
                                    }
                                }
                            } else {
                                0 < q.length && (q = "", D = -1);
                            }
                        }
                        h++;
                    }
                }
            }
        }, Cc: function (c, d, e) {
            this.Vb == s && (this.Vb = Array(this.fa.length));
            this.Vb[c.pageNumber] == s && (this.Vb[c.pageNumber] = []);
            var g = {};
            g.vk = d;
            g.zk = e;
            this.Vb[c.pageNumber][this.Vb[c.pageNumber].length] = g;
        }, vi: function (c, d, e) {
            jQuery(c).unbind("onAddedTextOverlay");
            var g = c.j == V || c.j == T ? c.k.D + c.pageNumber : c.pageNumber;
            c.j == T && (0 < c.k.D && 1 == c.pageNumber) && (g -= 2);
            c.j == X && (g = c.k.D);
            for (var f = this.qa[g].words, n = -1, l = -1, q = 0, h = 0; h < f.length; h++) {
                var A = f[h] + "";
                q >= d && -1 == n && (n = h);
                if (q + A.length >= d + e && -1 == l && (l = h, -1 != n)) {
                    break;
                }
                q += A.length;
            }
            for (e = n; e < l + 1; e++) {
                c.j == this.ea(c) ? (d = jQuery(this.qa[g].ca[e].el).clone(), this.Fa(c).dl(this, c, d)) : (jQuery(this.qa[g].ca[e].el).addClass("flowpaper_selected"), jQuery(this.qa[g].ca[e].el).addClass("flowpaper_selected_yellow"), jQuery(this.qa[g].ca[e].el).addClass("flowpaper_selected_searchmatch"));
            }
        }, ma: function (c, d) {
            this.Jb(c, d == s, d);
        }
    };
    return f;
}();
window.WordPage = function (f, c) {
    this.p = f;
    this.pageNumber = c;
    this.words = [];
    this.ca = s;
    this.Kk = "";
    this.Gl = function () {
        return this.words;
    };
    this.El = function () {
        return this.pageNumber;
    };
    this.nk = function (c, e) {
        this.words[c] = e;
    };
    this.Nm = function (c) {
        this.Kk = c;
    };
    this.mk = function (c) {
        this.ca = c;
    };
    this.Fl = function () {
        return this.ca;
    };
    this.match = function (c, e) {
        var g, f = s;
        g = "#page_" + this.pageNumber + "_" + this.p;
        0 == jQuery(g).length && (g = "#dummyPage_" + this.pageNumber + "_" + this.p);
        g = jQuery(g).offset();
        window.$FlowPaper(this.p).j == X && (g = "#dummyPage_0_" + this.p, g = jQuery(g).offset());
        if (window.$FlowPaper(this.p).j == V || window.$FlowPaper(this.p).j == T) {
            g = 0 == this.pageNumber || window.$FlowPaper(this.p).j == V ? jQuery("#dummyPage_" + this.pageNumber % 2 + "_" + this.p + "_" + (this.pageNumber % 2 + 1) + "_textoverlay").offset() : jQuery("#dummyPage_" + (this.pageNumber - 1) % 2 + "_" + this.p + "_" + ((this.pageNumber - 1) % 2 + 1) + "_textoverlay").offset();
        }
        c.top -= g.top;
        c.left -= g.left;
        for (g = 0; g < this.ca.length; g++) {
            if (this.rj(c, this.ca[g], e) && (f == s || f != s && f.top < this.ca[g].top || f != s && f.top <= this.ca[g].top && f != s && f.left < this.ca[g].left)) {
                f = this.ca[g], f.pageNumber = this.pageNumber;
            }
        }
        return f;
    };
    this.Tg = function (c) {
        for (var e = 0; e < this.ca.length; e++) {
            if (this.ca[e] && this.ca[e].el == "#" + c) {
                return this.ca[e];
            }
        }
        return s;
    };
    this.rj = function (c, e, g) {
        return !e ? z : g ? c.left + 3 >= e.left && c.left - 3 <= e.right && c.top + 3 >= e.top && c.top - 3 <= e.bottom : c.left + 3 >= e.left && c.top + 3 >= e.top;
    };
    this.Xc = function (c, e) {
        var g = window.a, f = window.b, n = new Ba, l, q, h = 0, A = -1;
        if (s == g) {
            return n;
        }
        if (g && f) {
            var D = [], w;
            g.top > f.top ? (l = f, q = g) : (l = g, q = f);
            for (l = l.i; l <= q.i; l++) {
                if (this.ca[l]) {
                    var t = jQuery(this.ca[l].el);
                    0 != t.length && (w = parseInt(t.attr("id").substring(t.attr("id").indexOf("word_") + 5)), A = parseInt(t.attr("id").substring(t.attr("id").indexOf("page_") + 5, t.attr("id").indexOf("word_") - 1)) + 1, 0 <= w && D.push(this.words[w]), h++, c && (t.addClass("flowpaper_selected"), t.addClass(e), "flowpaper_selected_strikeout" == e && !t.data("adjusted") && (w = t.height(), t.css("margin-top", w / 2 - w / 3 / 1.5), t.height(w / 2.3), t.data("adjusted", r))));
                }
            }
            eb.platform.touchonlydevice || jQuery(".flowpaper_selector").val(D.join("")).select();
        } else {
            eb.platform.touchdevice || jQuery("#selector").val("");
        }
        n.qj = h;
        n.Lk = g.left;
        n.sn = g.right;
        n.Mk = g.top;
        n.rn = g.bottom;
        n.nn = g.left;
        n.pn = g.right;
        n.qn = g.top;
        n.mn = g.bottom;
        n.aj = D != s && 0 < D.length ? D[0] : s;
        n.Wl = D != s && 0 < D.length ? D[D.length - 1] : n.aj;
        n.ee = g != s ? g.i : -1;
        n.Og = f != s ? f.i : n.ee;
        n.text = D != s ? D.join("") : "";
        n.page = A;
        n.Jh = this;
        return n;
    };
};

function Ba() {
}

function Ca(f, c) {
    var d = window["wordPageList_" + f];
    if (d) {
        return d.length >= c ? d[c] : s;
    }
}

var Ea = function () {
    function f(c, d, e, g) {
        this.g = d;
        this.r = c;
        this.k = {};
        this.selectors = {};
        this.container = "pagesContainer_" + e;
        this.F = "#" + this.container;
        this.D = g == s ? 0 : g - 1;
        this.sd = g;
        this.ue = this.rd = s;
        this.Tb = this.Sb = -1;
        this.em = this.dm = 0;
        this.initialized = z;
        this.gm = eb.platform.touchonlydevice && !eb.platform.Bb ? 30 : 22;
        this.p = this.g.p;
        this.document = this.g.document;
    }

    f.prototype = {
        z: function (c) {
            if (0 < c.indexOf("undefined")) {
                return jQuery(s);
            }
            this.selectors || (this.selectors = {});
            this.selectors[c] || (this.selectors[c] = jQuery(c));
            return this.selectors[c];
        }, Yg: function () {
            this.tg != s && (window.clearTimeout(this.tg), this.tg = s);
            this.g.u && this.g.j == this.g.u.H && this.g.u.Za.Yg(this);
        }, ac: function () {
            return this.g.u && this.g.j == this.g.u.H && this.g.u.Za.ac(this) || this.g.j == X;
        }, bk: function () {
            return !(this.g.u && this.g.u.Za.ac(this));
        }, Ta: function (c, d, e) {
            var g = this.g.scale;
            this.g.scale = c;
            if (this.g.j == V || this.g.j == T) {
                var f = 100 * c + "%";
                eb.platform.touchdevice || this.z(this.F).css({width: f, "margin-left": this.dd()});
            }
            this.k[0] && (this.k[0].scale = c);
            if (this.g.j == S || this.g.j == X) {
                for (f = this.Nd = 0; f < this.document.numPages; f++) {
                    if (this.La(f)) {
                        var n = this.k[f].Aa(c);
                        n > this.Nd && (this.Nd = n);
                    }
                }
            }
            for (f = 0; f < this.document.numPages; f++) {
                this.La(f) && (this.k[f].scale = c, this.k[f].Ta());
            }
            this.g.u && this.g.j == this.g.u.H && this.g.u.Za.Ta(this, g, c, d, e);
        }, lb: function () {
            for (var c = 0; c < this.document.numPages; c++) {
                this.k[c].lb(), delete this.k[c];
            }
            this.selectors = this.k = this.r = this.g = s;
        }, resize: function (c, d, e) {
            if (this.g.j == S || this.g.j == X) {
                d += eb.browser.Da.Ia ? 0 : 14, c -= eb.browser.msie ? 0 : 2;
            }
            this.g.j == W && (d -= 10);
            this.z(this.F).css({width: c, height: d});
            this.g.j == V && (this.g.If = this.r.height() - (!eb.platform.touchdevice ? 27 : 0), this.g.Xd = c / 2 - 2, this.z(this.F).height(this.g.If), this.z("#" + this.container + "_2").css("left", this.z("#" + this.container).width() / 2), eb.platform.touchdevice || (this.z(this.F + "_1").width(this.g.Xd), this.z(this.F + "_2").width(this.g.Xd)));
            if (this.g.u && this.g.j == this.g.u.H) {
                this.g.u.Za.resize(this, c, d, e);
            } else {
                this.Sd();
                for (c = 0; c < this.document.numPages; c++) {
                    this.La(c) && this.k[c].Ta();
                }
            }
            this.Kf = s;
            this.jScrollPane != s && (this.jScrollPane.data("jsp").reinitialise(this.Lb), this.jScrollPane.data("jsp").scrollTo(this.Sb, this.Tb, z));
        }, je: function (c) {
            var d = this;
            if (!d.W) {
                var e = z;
                "function" === typeof d.Jd && d.ub();
                jQuery(".flowpaper_pageword").each(function () {
                    jQuery(this).hasClass("flowpaper_selected_default") && (e = r);
                });
                d.touchwipe != s && (d.touchwipe.config.preventDefaultEvents = z);
                d.ac() || (jQuery(".flowpaper_pageword_" + d.p).remove(), setTimeout(function () {
                    (d.g.j == V || d.g.j == T) && d.lc();
                    d.ma();
                    e && d.getPage(d.g.sa - 1).xb(d.g.kc, z);
                }, 500));
                d.g.u && d.g.j == d.g.u.H ? d.g.u.Za.je(d, c) : d.Ta(1);
                d.jScrollPane != s ? (d.jScrollPane.data("jsp").reinitialise(d.Lb), d.jScrollPane.data("jsp").scrollTo(d.Sb, d.Tb, z)) : (d.g.j == V || d.g.j == T) && d.z(d.F).parent().scrollTo({
                    left: d.Sb + "px",
                    top: d.Tb + "px"
                }, 0, {axis: "xy"});
            }
        }, ed: function (c) {
            var d = this;
            if (!d.W) {
                var e = z;
                d.touchwipe != s && (d.touchwipe.config.preventDefaultEvents = r);
                "function" === typeof d.Jd && d.ub();
                jQuery(".flowpaper_pageword").each(function () {
                    jQuery(this).hasClass("flowpaper_selected_default") && (e = r);
                });
                d.ac() || jQuery(".flowpaper_pageword_" + d.p).remove();
                d.g.u && d.g.j == d.g.u.H ? d.g.u.Za.ed(d, c) : d.Ta(window.FitHeightScale);
                setTimeout(function () {
                    d.ma();
                    e && d.getPage(d.g.sa - 1).xb(d.g.kc, z);
                }, 500);
                d.ma();
                d.jScrollPane != s ? (d.jScrollPane.data("jsp").scrollTo(0, 0, z), d.jScrollPane.data("jsp").reinitialise(d.Lb)) : d.z(d.F).parent().scrollTo({
                    left: 0,
                    top: 0
                }, 0, {axis: "xy"});
            }
        }, Wg: function () {
            var c = this;
            c.yd();
            if (c.g.u && c.g.j == c.g.u.H) {
                c.g.u.Za.Wg(c);
            } else {
                if (c.g.j == X || c.g.j == V || c.g.j == T) {
                    c.touchwipe = c.z(c.F).touchwipe({
                        wipeLeft: function () {
                            if (!c.g.Sa && !window.ob && c.W == s && ((c.g.j == V || c.g.j == T) && 1 != c.g.scale && c.next(), c.g.j == X)) {
                                var e = jQuery(c.F).width() - 5, d = 1 < c.g.getTotalPages() ? c.g.M - 1 : 0;
                                0 > d && (d = 0);
                                var f = c.getPage(d).dimensions.U / c.getPage(d).dimensions.ia,
                                    e = Math.round(100 * (e / (c.getPage(d).pa * f) - 0.03));
                                100 * c.g.scale < 1.2 * e && c.next();
                            }
                        },
                        wipeRight: function () {
                            if (!c.g.Sa && !window.ob && c.W == s && ((c.g.j == V || c.g.j == T) && 1 != c.g.scale && c.previous(), c.g.j == X)) {
                                var e = jQuery(c.F).width() - 15, d = 1 < c.g.getTotalPages() ? c.g.M - 1 : 0;
                                0 > d && (d = 0);
                                var f = c.getPage(d).dimensions.U / c.getPage(d).dimensions.ia,
                                    e = Math.round(100 * (e / (c.getPage(d).pa * f) - 0.03));
                                100 * c.g.scale < 1.2 * e && c.previous();
                            }
                        },
                        preventDefaultEvents: c.g.j == V || c.g.j == T || c.g.j == X,
                        min_move_x: eb.platform.Bb ? 150 : 200,
                        min_move_y: 500
                    });
                }
            }
            if (eb.platform.mobilepreview) {
                c.z(c.F).on("mousedown", function (e) {
                    c.Sb = e.pageX;
                    c.Tb = e.pageY;
                });
            }
            c.z(c.F).on("touchstart", function (e) {
                c.Sb = e.originalEvent.touches[0].pageX;
                c.Tb = e.originalEvent.touches[0].pageY;
            });
            c.z(c.F).on(!eb.platform.mobilepreview ? "touchend" : "mouseup", function () {
                c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").enable && c.g.k.jScrollPane.data("jsp").enable();
                if (c.Wb != s && c.g.j == X) {
                    for (var e = 0; e < c.document.numPages; e++) {
                        c.La(e) && c.z(c.k[e].O).transition({y: 0, scale: 1}, 0, "ease", function () {
                            c.W > c.g.scale && c.W - c.g.scale < c.g.document.ZoomInterval && (c.W += c.g.document.ZoomInterval);
                            0 < c.Ib - c.qc && c.W < c.g.scale && (c.W = c.g.scale + c.g.document.ZoomInterval);
                            c.g.Ea(c.W, {Bd: r});
                            c.W = s;
                        });
                    }
                    c.k[0] && c.k[0].yd();
                    c.z(c.F).addClass("flowpaper_pages_border");
                    c.qm = c.Wb < c.W;
                    c.Wb = s;
                    c.eh = s;
                    c.W = s;
                    c.Ul = s;
                    c.Vl = s;
                }
            });
            if (!(c.g.u && c.g.j == c.g.u.H)) {
                if (eb.platform.touchdevice) {
                    var d = c.z(c.F);
                    d.doubletap(function (e) {
                        if (c.g.j == V || c.g.j == T) {
                            (c.g.j == V || c.g.j == T) && 1 != c.g.scale ? c.je() : (c.g.j == V || c.g.j == T) && 1 == c.g.scale && c.ed(), e.preventDefault();
                        }
                    }, s, 300);
                } else {
                    c.g.gd && (d = c.z(c.F), d.doubletap(function (e) {
                        var d = jQuery(".activeElement").data("hint-pageNumber");
                        window.parent.postMessage("EditPage:" + d, "*");
                        window.clearTimeout(c.Nl);
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }, s, 300));
                }
            }
            c.z(c.F).on("scroll gesturechange", function () {
                c.g.j == X ? c.g.renderer.yc && !c.W && c.g.renderer.we(c.k[0]) : c.g.u && c.g.j == c.g.u.H || (eb.platform.ios && c.wf(-1 * c.z(c.F).scrollTop()), eb.platform.ios ? (setTimeout(function () {
                    c.Yd();
                    c.md();
                }, 1000), setTimeout(function () {
                    c.Yd();
                    c.md();
                }, 2000), setTimeout(function () {
                    c.Yd();
                    c.md();
                }, 3000)) : c.Yd(), c.md(), c.ma(), c.rd != s && (window.clearTimeout(c.rd), c.rd = s), c.rd = setTimeout(function () {
                    c.Fg();
                    window.clearTimeout(c.rd);
                    c.rd = s;
                }, 100), c.om = r);
            });
            this.Fg();
        }, wf: function (c) {
            for (var d = 0; d < this.document.numPages; d++) {
                this.La(d) && this.k[d].wf(c);
            }
        }, yd: function () {
            this.g.u && this.g.u.Za.yd(this);
        }, getTotalPages: function () {
            return this.document.numPages;
        }, ig: function (c) {
            var d = this;
            c.empty();
            jQuery(d.g.renderer).on("onTextDataUpdated", function () {
                d.ma(d);
            });
            d.g.ue == s && (!d.g.document.DisableOverflow && !d.g.xl) && (d.g.ue = d.r.height(), eb.platform.touchonlydevice ? d.g.Ne || d.r.height(d.g.ue - 10) : d.r.height(d.g.ue - 27));
            var e = d.g.u && d.g.u.backgroundColor ? "background-color:" + d.g.u.backgroundColor + ";" : "";
            d.g.u && d.g.u.backgroundImage && (e = "background-color:transparent;");
            if (d.g.j == S || d.g.j == X) {
                eb.platform.touchonlydevice && d.g.j == X && (eb.browser.Da.Ia = z);
                var g = jQuery(d.g.m).height() + (window.zine && "Portrait" == d.g.ab ? 20 : 0),
                    f = !eb.platform.touchonlydevice ? 26 : 31;
                window.zine && "Portrait" != d.g.ab && (f = !eb.platform.touchonlydevice ? 36 : 41);
                var g = d.r.height() + (eb.browser.Da.Ia ? window.annotations ? 0 : f - g : -5), f = d.r.width() - 2,
                    n = 1 < d.sd ? "visibility:hidden;" : "",
                    l = eb.browser.msie && 9 > eb.browser.version ? "position:relative;" : "";
                d.g.document.DisableOverflow ? c.append("<div id='" + d.container + "' class='flowpaper_pages' style='overflow:hidden;padding:0;margin:0;'></div>") : c.append("<div id='" + d.container + "' class='flowpaper_pages " + (!window.annotations ? "flowpaper_pages_border" : "") + "' style='" + (eb.platform.Ih ? "touch-action: none;" : "") + "-moz-user-select:none;-webkit-user-select:none;" + l + ";" + n + "height:" + g + "px;width:" + f + "px;overflow-y: auto;overflow-x: auto;;-webkit-overflow-scrolling: touch;-webkit-backface-visibility: hidden;-webkit-perspective: 1000;" + e + ";'></div>");
                d.g.document.DisableOverflow || (eb.browser.Da.Ia ? eb.platform.touchonlydevice ? (jQuery(c).css("overflow-y", "auto"), jQuery(c).css("overflow-x", "auto"), jQuery(c).css("-webkit-overflow-scrolling", "touch")) : (jQuery(c).css("overflow-y", "visible"), jQuery(c).css("overflow-x", "visible"), jQuery(c).css("-webkit-overflow-scrolling", "visible")) : jQuery(c).css("-webkit-overflow-scrolling", "hidden"));
                if (eb.platform.touchdevice && (eb.platform.ipad || eb.platform.iphone || eb.platform.android || eb.platform.Ih)) {
                    jQuery(d.F).on("touchmove", function (c) {
                        if (!eb.platform.ios && 2 == c.originalEvent.touches.length && (d.g.k.jScrollPane && d.g.k.jScrollPane.data("jsp").disable(), d.Hc != r)) {
                            c.preventDefault && c.preventDefault();
                            c.returnValue = z;
                            c = Math.sqrt((c.originalEvent.touches[0].pageX - c.originalEvent.touches[1].pageX) * (c.originalEvent.touches[0].pageX - c.originalEvent.touches[1].pageX) + (c.originalEvent.touches[0].pageY - c.originalEvent.touches[1].pageY) * (c.originalEvent.touches[0].pageY - c.originalEvent.touches[1].pageY));
                            c *= 2;
                            d.W == s && (d.z(d.F).removeClass("flowpaper_pages_border"), d.Wb = 1, d.eh = c);
                            d.W == s && (d.Wb = 1, d.qc = 1 + (jQuery(d.k[0].O).width() - d.r.width()) / d.r.width());
                            var e = c = (d.Wb + (c - d.eh) / jQuery(d.F).width() - d.Wb) / d.Wb;
                            d.ac() || (1 < e && (e = 1), -0.3 > e && (e = -0.3), 0 < c && (c *= 0.7));
                            d.Ib = d.qc + d.qc * c;
                            d.Ib < d.g.document.MinZoomSize && (d.Ib = d.g.document.MinZoomSize);
                            d.Ib > d.g.document.MaxZoomSize && (d.Ib = d.g.document.MaxZoomSize);
                            d.vb = 1 + (d.Ib - d.qc);
                            d.W = d.k[0].zg(jQuery(d.k[0].O).width() * d.vb);
                            d.W < d.g.document.MinZoomSize && (d.W = d.g.document.MinZoomSize);
                            d.W > d.g.document.MaxZoomSize && (d.W = d.g.document.MaxZoomSize);
                            jQuery(d.k[0].O).width() > jQuery(d.k[0].O).height() ? d.W < d.g.he() && (d.vb = d.Od, d.W = d.g.he()) : d.W < d.g.Jc() && (d.vb = d.Od, d.W = d.g.Jc());
                            d.Od = d.vb;
                            if (d.ac() && 0 < d.vb) {
                                jQuery(".flowpaper_annotation_" + d.p).hide();
                                for (c = 0; c < d.document.numPages; c++) {
                                    d.La(c) && jQuery(d.k[c].O).transition({
                                        transformOrigin: "50% 50%",
                                        scale: d.vb
                                    }, 0, "ease", B());
                                }
                            }
                        }
                    }), jQuery(d.F).on("touchstart", B()), jQuery(d.F).on("gesturechange", function (c) {
                        if (d.yk != r && d.Hc != r) {
                            d.g.renderer.yc && jQuery(".flowpaper_flipview_canvas_highres").hide();
                            d.W == s && (d.Wb = 1, d.qc = 1 + (jQuery(d.k[0].O).width() - d.r.width()) / d.r.width());
                            var e, g = e = (c.originalEvent.scale - d.Wb) / d.Wb;
                            d.ac() || (1 < g && (g = 1), -0.3 > g && (g = -0.3), 0 < e && (e *= 0.7));
                            d.Ib = d.qc + d.qc * e;
                            d.Ib < d.g.document.MinZoomSize && (d.Ib = d.g.document.MinZoomSize);
                            d.Ib > d.g.document.MaxZoomSize && (d.Ib = d.g.document.MaxZoomSize);
                            d.vb = 1 + (d.Ib - d.qc);
                            d.W = d.k[0].zg(jQuery(d.k[0].O).width() * d.vb);
                            jQuery(d.k[0].O).width() > jQuery(d.k[0].O).height() ? d.W < d.g.he() && (d.vb = d.Od, d.W = d.g.he()) : d.W < d.g.Jc() && (d.vb = d.Od, d.W = d.g.Jc());
                            d.W < d.g.document.MinZoomSize && (d.W = d.g.document.MinZoomSize);
                            d.W > d.g.document.MaxZoomSize && (d.W = d.g.document.MaxZoomSize);
                            c.preventDefault && c.preventDefault();
                            d.Od = d.vb;
                            if (d.ac() && 0 < d.vb) {
                                jQuery(".flowpaper_annotation_" + d.p).hide();
                                for (c = 0; c < d.document.numPages; c++) {
                                    d.La(c) && jQuery(d.k[c].O).transition({
                                        transformOrigin: "50% 50%",
                                        scale: d.vb
                                    }, 0, "ease", B());
                                }
                            }
                            if (!d.ac() && (0.7 <= g || -0.3 >= g)) {
                                d.yk = r, d.W > d.g.scale && d.W - d.g.scale < d.g.document.ZoomInterval && (d.W += d.g.document.ZoomInterval), d.g.Ea(d.W), d.W = s;
                            }
                        }
                    }), jQuery(d.F).on("gestureend", B());
                }
                d.g.renderer.rb && jQuery(d.g.renderer).bind("onTextDataUpdated", function (c, e) {
                    for (var g = e + 12, f = e - 2; f < g; f++) {
                        var m = d.getPage(f);
                        if (m) {
                            var l = jQuery(m.O).get(0);
                            if (l) {
                                var n = m.Aa(), v = m.Ra(), G = 1.5 < d.g.renderer.cb ? d.g.renderer.cb : 1.5;
                                l.width != n * G && (jQuery(l).data("needs-overlay", 1), d.g.document.DisableOverflow && (G = 2), l.width = n * G, l.height = v * G, m.ve(l).then(function (c) {
                                    if (d.g.document.DisableOverflow) {
                                        var e = jQuery(c).css("background-image");
                                        0 < e.length && "none" != e ? (jQuery(c).css("background-image", "url('" + c.toDataURL() + "')," + e), e = jQuery(c).attr("id").substr(5, jQuery(c).attr("id").lastIndexOf("_") - 5), jQuery("#" + d.p).trigger("onPageLoaded", parseInt(e) + 1), fa(c)) : jQuery(c).css("background-image", "url('" + c.toDataURL() + "')");
                                    }
                                }));
                            }
                        }
                    }
                });
            }
            if (d.g.j == V || d.g.j == T) {
                g = d.r.height() - (eb.browser.msie ? 37 : 0), f = d.r.width() - (eb.browser.msie ? 0 : 20), e = 0, 1 == d.g.M && d.g.j == T && (e = f / 3, f -= e), eb.platform.touchdevice ? eb.browser.Da.Ia ? (c.append("<div id='" + d.container + "' style='-moz-user-select:none;-webkit-user-select:none;margin-left:" + e + "px;position:relative;width:100%;' class='flowpaper_twopage_container'><div id='" + d.container + "_1' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div><div id='" + d.container + "_2' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div></div>"), jQuery(c).css("overflow-y", "scroll"), jQuery(c).css("overflow-x", "scroll"), jQuery(c).css("-webkit-overflow-scrolling", "touch")) : (c.append("<div id='" + d.container + "_jpane' style='-moz-user-select:none;-webkit-user-select:none;height:" + g + "px;width:100%;" + (window.eb.browser.msie || eb.platform.android ? "overflow-y: scroll;overflow-x: scroll;" : "overflow-y: auto;overflow-x: auto;") + ";-webkit-overflow-scrolling: touch;'><div id='" + d.container + "' style='margin-left:" + e + "px;position:relative;height:100%;width:100%' class='flowpaper_twopage_container'><div id='" + d.container + "_1' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div><div id='" + d.container + "_2' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div></div></div>"), jQuery(c).css("overflow-y", "visible"), jQuery(c).css("overflow-x", "visible"), jQuery(c).css("-webkit-overflow-scrolling", "visible")) : (c.append("<div id='" + d.container + "' style='-moz-user-select:none;-webkit-user-select:none;margin-left:" + e + "px;position:relative;' class='flowpaper_twopage_container'><div id='" + d.container + "_1' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:" + (!eb.browser.msie ? 20 : 10) + "px;'></div><div id='" + d.container + "_2' class='flowpaper_pages " + (d.g.j == T && 2 > d.sd ? "flowpaper_hidden" : "") + "' style='position:absolute;top:0px;height:99%;margin-top:" + (!eb.browser.msie ? 20 : 10) + "px;'></div></div>"), jQuery(c).css("overflow-y", "auto"), jQuery(c).css("overflow-x", "auto"), jQuery(c).css("-webkit-overflow-scrolling", "touch")), d.g.If == s && (d.g.If = d.r.height() - (!eb.platform.touchdevice ? 27 : 0), d.g.Xd = d.z(d.F).width() / 2 - 2), d.z(d.F).css({height: "90%"}), d.z("#" + this.container + "_2").css("left", d.z("#" + d.container).width() / 2), eb.platform.touchdevice || (d.z(d.F + "_1").width(d.g.Xd), d.z(d.F + "_2").width(d.g.Xd));
            }
            d.g.j == W && (jQuery(c).css("overflow-y", "visible"), jQuery(c).css("overflow-x", "visible"), jQuery(c).css("-webkit-overflow-scrolling", "visible"), l = eb.browser.msie && 9 > eb.browser.version ? "position:relative;" : "", c.append("<div id='" + this.container + "' class='flowpaper_pages' style='" + l + ";" + (eb.platform.touchdevice ? "padding-left:10px;" : "") + (eb.browser.msie ? "overflow-y: scroll;overflow-x: hidden;" : "overflow-y: auto;overflow-x: hidden;-webkit-overflow-scrolling: touch;") + "'></div>"), jQuery(".flowpaper_pages").height(d.r.height() - 0));
            d.g.u && d.g.u.Za.ig(d, c);
            d.r.trigger("onPagesContainerCreated");
            jQuery(d).bind("onScaleChanged", d.Yg);
        }, Ed: function (c) {
            return this.getPage(c).Ed();
        }, Fd: function (c) {
            return this.getPage(c).Fd();
        }, Rb: function (c) {
            return this.getPage(c).scale;
        }, Kc: function (c) {
            return this.getPage(c).Aa();
        }, Gd: function (c) {
            return this.getPage(c).Ra();
        }, create: function (c) {
            var d = this;
            d.ig(c);
            if (!eb.browser.Da.Ia && d.g.j != W && (d.Lb = {}, d.g.j == V || d.g.j == T)) {
                d.jScrollPane = d.z(d.F + "_jpane").jScrollPane(d.Lb);
            }
            for (c = 0; c < this.document.numPages; c++) {
                d.La(c) && this.Bi(c);
            }
            d.Wg();
            if (!eb.browser.Da.Ia) {
                if (d.g.j == S || d.g.j == X) {
                    d.jScrollPane = d.z(this.F).jScrollPane(d.Lb);
                }
                window.zine && !(d.g.u && d.g.u.H == d.g.j) && jQuery(d.z(this.F)).bind("jsp-initialised", function () {
                    jQuery(this).find(".jspHorizontalBar, .jspVerticalBar").hide();
                }).jScrollPane().hover(function () {
                    jQuery(this).find(".jspHorizontalBar, .jspVerticalBar").stop().fadeTo("fast", 0.9);
                }, function () {
                    jQuery(this).find(".jspHorizontalBar, .jspVerticalBar").stop().fadeTo("fast", 0);
                });
            }
            !eb.browser.Da.Ia && d.g.j == W && (d.jScrollPane = d.z(d.F).jScrollPane(d.Lb));
            1 < d.sd && d.g.j == S && setTimeout(function () {
                d.scrollTo(d.sd, r);
                d.sd = -1;
                jQuery(d.F).css("visibility", "visible");
            }, 500);
            d.sd && d.g.j == X && jQuery(d.F).css("visibility", "visible");
        }, getPage: function (c) {
            if (this.g.j == V || this.g.j == T) {
                if (0 != c % 2) {
                    return this.k[1];
                }
                if (0 == c % 2) {
                    return this.k[0];
                }
            } else {
                return this.g.j == X ? this.k[0] : this.k[c];
            }
        }, La: function (c) {
            return this.g.DisplayRange ? -1 < this.g.DisplayRange.indexOf(c + 1) : (this.g.j == V || this.g.j == T) && (0 == c || 1 == c) || this.g.j != V && this.g.j != T;
        }, Bi: function (c) {
            this.k[c] = new Da(this.p, c, this, this.r, this.g, this.kj(c));
            this.k[c].create(this.z(this.F));
            jQuery(this.g.r).trigger("onPageCreated", c);
        }, kj: function (c) {
            for (var d = 0; d < this.document.dimensions.length; d++) {
                if (this.document.dimensions[d].page == c) {
                    return this.document.dimensions[d];
                }
            }
            return {width: -1, height: -1};
        }, scrollTo: function (c, d) {
            if (this.D + 1 != c || d) {
                !eb.browser.Da.Ia && this.jScrollPane ? this.jScrollPane.data("jsp").scrollToElement(this.k[c - 1].z(this.k[c - 1].V), r, z) : jQuery(this.F).scrollTo && jQuery(this.F).scrollTo(this.k[c - 1].z(this.k[c - 1].V), 0);
            }
            this.ma();
        }, ck: function () {
            for (var c = 0; c < this.getTotalPages(); c++) {
                this.La(c) && this.k[c] && this.k[c].Xb && window.clearTimeout(this.k[c].Xb);
            }
        }, Fg: function () {
            this.Sd();
        }, Sd: function () {
            var c = this;
            c.qd != s && (window.clearTimeout(c.qd), c.qd = s);
            c.qd = setTimeout(function () {
                c.lc();
            }, 200);
        }, Ff: function () {
            if (this.jScrollPane != s) {
                try {
                    this.jScrollPane.data("jsp").reinitialise(this.Lb);
                } catch (c) {
                }
            }
        }, lc: function (c) {
            var d = this;
            if (d.g) {
                if (d.g.u && d.g.j == d.g.u.H) {
                    d.g.u.Za.lc(d, c);
                } else {
                    d.qd != s && (window.clearTimeout(d.qd), d.qd = s);
                    c = d.z(this.F).scrollTop();
                    for (var e = 0; e < this.document.numPages; e++) {
                        if (this.k[e] && d.La(e)) {
                            var g = !d.k[e].Ha;
                            this.k[e].hd(c, d.z(this.F).height(), r) ? (g && d.r.trigger("onVisibilityChanged", e + 1), this.k[e].Ha = r, this.k[e].load(function () {
                                if (d.g.j == V || d.g.j == T) {
                                    !d.z(d.F).is(":animated") && 1 != d.g.scale && (d.z(d.F).css("margin-left", d.dd()), d.z("#" + this.container + "_2").css("left", d.z("#" + d.container).width() / 2)), !d.initialized && d.jScrollPane != s && (d.jScrollPane.data("jsp").reinitialise(d.Lb), d.initialized = r);
                                }
                            }), this.k[e].wj(), this.k[e].ma()) : d.g.j != V && d.g.j != T && this.k[e].unload();
                        }
                    }
                }
            }
        }, md: function () {
            this.g.j != this.g.H() ? this.g.Yc(this.D + 1) : this.g.Yc(this.D);
        }, ma: function (c) {
            c = c ? c : this;
            for (var d = 0; d < c.document.numPages; d++) {
                c.La(d) && c.k[d] && c.k[d].Ha && c.k[d].ma();
            }
        }, Yd: function () {
            for (var c = this.D, d = this.z(this.F).scrollTop(), e = 0; e < this.document.numPages; e++) {
                if (this.La(e) && this.g.j != X) {
                    var g = !this.k[e].Ha;
                    if (this.k[e].hd(d, this.z(this.F).height(), z)) {
                        c = e;
                        g && this.r.trigger("onVisibilityChanged", e + 1);
                        break;
                    }
                }
            }
            this.D != c && this.r.trigger("onCurrentPageChanged", c + 1);
            this.D = c;
        }, setCurrentCursor: function (c) {
            for (var d = 0; d < this.document.numPages; d++) {
                this.La(d) && ("TextSelectorCursor" == c ? jQuery(this.k[d].K).addClass("flowpaper_nograb") : jQuery(this.k[d].K).removeClass("flowpaper_nograb"));
            }
        }, gotoPage: function (c) {
            this.g.gotoPage(c);
        }, Hd: function (c, d) {
            c = parseInt(c);
            var e = this;
            e.g.renderer.Te && e.g.renderer.Te(e.k[0]);
            jQuery(".flowpaper_pageword").remove();
            jQuery(".flowpaper_interactiveobject_" + e.p).remove();
            e.k[0].unload();
            e.k[0].visible = r;
            var g = e.z(e.F).scrollTop();
            e.g.Yc(c);
            e.r.trigger("onCurrentPageChanged", c);
            e.k[0].hd(g, e.z(this.F).height(), r) && (e.r.trigger("onVisibilityChanged", c + 1), e.k[0].load(function () {
                d != s && d();
                e.Sd();
                e.jScrollPane != s && e.jScrollPane.data("jsp").reinitialise(e.Lb);
            }));
        }, Id: function (c, d) {
            c = parseInt(c);
            var e = this;
            0 == c % 2 && 0 < c && e.g.j == T && c != e.getTotalPages() && (c += 1);
            c == e.getTotalPages() && (e.g.j == V && 0 == e.getTotalPages() % 2) && (c = e.getTotalPages() - 1);
            0 == c % 2 && e.g.j == V && (c -= 1);
            c > e.getTotalPages() && (c = e.getTotalPages());
            jQuery(".flowpaper_pageword").remove();
            jQuery(".flowpaper_interactiveobject_" + e.p).remove();
            if (c <= e.getTotalPages() && 0 < c) {
                e.g.Yc(c);
                e.D != c && e.r.trigger("onCurrentPageChanged", c);
                e.k[0].unload();
                e.k[0].load(function () {
                    if (e.g.j == V || e.g.j == T) {
                        e.z(e.F).animate({"margin-left": e.dd()}, {duration: 250}), e.z("#" + this.container + "_2").css("left", e.z("#" + e.container).width() / 2), e.Ta(e.g.scale);
                    }
                });
                1 < e.g.M ? (e.z(e.k[1].K + "_2").removeClass("flowpaper_hidden"), e.z(e.F + "_2").removeClass("flowpaper_hidden")) : e.g.j == T && 1 == e.g.M && (e.z(e.k[1].K + "_2").addClass("flowpaper_hidden"), e.z(e.F + "_2").addClass("flowpaper_hidden"));
                0 != e.getTotalPages() % 2 && (e.g.j == V && c >= e.getTotalPages()) && e.z(e.k[1].K + "_2").addClass("flowpaper_hidden");
                0 == e.getTotalPages() % 2 && (e.g.j == T && c >= e.getTotalPages()) && e.z(e.k[1].K + "_2").addClass("flowpaper_hidden");
                var g = e.z(this.F).scrollTop();
                e.k[1].unload();
                e.k[1].visible = r;
                !e.z(e.k[1].K + "_2").hasClass("flowpaper_hidden") && e.k[1].hd(g, e.z(this.F).height(), r) && (e.r.trigger("onVisibilityChanged", c + 1), e.k[1].load(function () {
                    d != s && d();
                    e.z(e.F).animate({"margin-left": e.dd()}, {duration: 250});
                    e.z("#" + this.container + "_2").css("left", e.z("#" + e.container).width() / 2);
                    e.Sd();
                    e.jScrollPane != s && e.jScrollPane.data("jsp").reinitialise(e.Lb);
                }));
            }
        }, rotate: function (c) {
            this.k[c].rotate();
        }, dd: function (c) {
            this.r.width();
            var d = 0;
            1 == this.g.M && !c && this.g.j == T ? d = this.dn = (this.r.width() / 2 - this.z(this.F + "_1").width() / 2) * (this.g.scale + 0.7) : (c = jQuery(this.F + "_2").width(), 0 == c && (c = this.z(this.F + "_1").width()), d = this.cn = (this.r.width() - (this.z(this.F + "_1").width() + c)) / 2);
            10 > d && (d = 0);
            return d;
        }, previous: function () {
            var c = this;
            if (c.g.j == S) {
                var d = c.z(c.F).scrollTop() - c.k[0].height - 14;
                0 > d && (d = 1);
                eb.browser.Da.Ia ? c.z(c.F).scrollTo(d, {
                    axis: "y",
                    duration: 500
                }) : c.jScrollPane.data("jsp").scrollToElement(this.k[c.g.M - 2].z(this.k[c.g.M - 2].V), r, r);
            }
            c.g.j == X && 0 < c.g.M - 1 && (!eb.platform.touchdevice || 1 == this.g.scale ? c.Hd(c.g.M - 1) : (c.g.Sa = r, c.z(c.F).removeClass("flowpaper_pages_border"), c.z(c.F).transition({x: 1000}, 350, function () {
                c.k[0].unload();
                c.z(c.F).transition({x: -800}, 0);
                c.jScrollPane ? c.jScrollPane.data("jsp").scrollTo(0, 0, z) : c.z(c.F).scrollTo(0, {
                    axis: "y",
                    duration: 0
                });
                c.Hd(c.g.M - 1, B());
                c.z(c.F).transition({x: 0}, 350, function () {
                    c.g.Sa = z;
                    window.annotations || c.z(c.F).addClass("flowpaper_pages_border");
                });
            })));
            c.g.u && c.g.j == c.g.u.H && c.g.u.Za.previous(c);
            if ((c.g.j == V || c.g.j == T) && !(1 > c.g.M - 2)) {
                !eb.platform.touchdevice || 1 == this.g.scale ? c.Id(c.g.M - 2) : (c.D = c.g.M - 2, c.g.Sa = r, c.z(c.F).animate({"margin-left": 1000}, {
                    duration: 350,
                    complete: function () {
                        jQuery(".flowpaper_interactiveobject_" + c.p).remove();
                        1 == c.g.M - 2 && c.g.j == T && c.k[1].z(c.k[1].K + "_2").addClass("flowpaper_hidden");
                        setTimeout(function () {
                            c.z(c.F).css("margin-left", -800);
                            c.k[0].unload();
                            c.k[1].unload();
                            c.z(c.F).animate({"margin-left": c.dd()}, {
                                duration: 350, complete: function () {
                                    setTimeout(function () {
                                        c.g.Sa = z;
                                        c.Id(c.g.M - 2);
                                    }, 500);
                                }
                            });
                        }, 500);
                    }
                }));
            }
        }, next: function () {
            var c = this;
            if (c.g.j == S) {
                0 == c.g.M && (c.g.M = 1);
                var d = c.g.M - 1,
                    d = 100 < this.k[c.g.M - 1].z(this.k[c.g.M - 1].V).offset().top - c.r.offset().top ? c.g.M - 1 : c.g.M;
                eb.browser.Da.Ia ? this.k[d] && c.z(c.F).scrollTo(this.k[d].z(this.k[d].V), {
                    axis: "y",
                    duration: 500
                }) : c.jScrollPane.data("jsp").scrollToElement(this.k[c.g.M].z(this.k[c.g.M].V), r, r);
            }
            c.g.j == X && c.g.M < c.getTotalPages() && (!eb.platform.touchdevice || 1 == c.g.scale ? c.Hd(c.g.M + 1) : (c.g.Sa = r, c.z(c.F).removeClass("flowpaper_pages_border"), c.z(c.F).transition({x: -1000}, 350, "ease", function () {
                c.k[0].unload();
                c.z(c.F).transition({x: 1200}, 0);
                c.jScrollPane ? c.jScrollPane.data("jsp").scrollTo(0, 0, z) : c.z(c.F).scrollTo(0, {
                    axis: "y",
                    duration: 0
                });
                c.Hd(c.g.M + 1, B());
                c.z(c.F).transition({x: 0}, 350, "ease", function () {
                    window.annotations || c.z(c.F).addClass("flowpaper_pages_border");
                    c.g.Sa = z;
                });
            })));
            c.g.u && c.g.j == c.g.u.H && c.g.u.Za.next(c);
            if (c.g.j == V || c.g.j == T) {
                if (c.g.j == V && c.g.M + 2 > c.getTotalPages()) {
                    return z;
                }
                !eb.platform.touchdevice || 1 == this.g.scale ? c.Id(c.g.M + 2) : (c.D = c.g.M + 2, c.g.Sa = r, c.z(c.F).animate({"margin-left": -1000}, {
                    duration: 350,
                    complete: function () {
                        jQuery(".flowpaper_interactiveobject_" + c.p).remove();
                        c.g.M + 2 <= c.getTotalPages() && 0 < c.g.M + 2 && c.k[1].z(c.k[1].K + "_2").removeClass("flowpaper_hidden");
                        setTimeout(function () {
                            c.z(c.F).css("margin-left", 800);
                            c.k[0].unload();
                            c.k[1].unload();
                            c.k[0].Ha = r;
                            c.k[1].Ha = r;
                            c.r.trigger("onVisibilityChanged", c.D);
                            c.z(c.F).animate({"margin-left": c.dd(r)}, {
                                duration: 350, complete: function () {
                                    setTimeout(function () {
                                        c.g.Sa = z;
                                        c.Id(c.g.M + 2);
                                    }, 500);
                                }
                            });
                        }, 500);
                    }
                }));
            }
        }
    };
    return f;
}(), Da = function () {
    function f(c, d, e, g, f, n) {
        this.r = g;
        this.g = f;
        this.k = e;
        this.pa = 1000;
        this.na = this.Ha = z;
        this.p = c;
        this.pageNumber = d;
        this.dimensions = n;
        this.selectors = {};
        this.S = "dummyPage_" + this.pageNumber + "_" + this.p;
        this.page = "page_" + this.pageNumber + "_" + this.p;
        this.jc = "pageContainer_" + this.pageNumber + "_" + this.p;
        this.Pd = this.jc + "_textLayer";
        this.ce = "dummyPageCanvas_" + this.pageNumber + "_" + this.p;
        this.de = "dummyPageCanvas2_" + this.pageNumber + "_" + this.p;
        this.Zd = this.page + "_canvasOverlay";
        this.bb = "pageLoader_" + this.pageNumber + "_" + this.p;
        this.ah = this.jc + "_textoverlay";
        this.j = this.g.j;
        this.H = this.g.u ? this.g.u.H : "";
        this.renderer = this.g.renderer;
        c = this.g.scale;
        this.scale = c;
        this.K = "#" + this.S;
        this.O = "#" + this.page;
        this.V = "#" + this.jc;
        this.Ba = "#" + this.Pd;
        this.Ye = "#" + this.ce;
        this.Ze = "#" + this.de;
        this.Li = "#" + this.Zd;
        this.Nb = "#" + this.bb;
        this.sf = "#" + this.ah;
        this.Um = {bottom: 3, top: 2, right: 0, left: 1, Cl: 4, back: 5};
        this.Zl = [];
        this.duration = 1.3;
        this.jm = 16777215;
        this.offset = this.zl = 0;
    }

    f.prototype = {
        z: function (c) {
            if (0 < c.indexOf("undefined")) {
                return jQuery(s);
            }
            this.selectors || (this.selectors = {});
            this.selectors[c] || (this.selectors[c] = jQuery(c));
            return this.selectors[c];
        }, show: function () {
            this.g.j != V && this.g.j != T && this.z(this.O).removeClass("flowpaper_hidden");
        }, yd: function () {
            this.k.jScrollPane && (!eb.browser.Da.Ia && this.k.jScrollPane ? this.g.j == X ? 0 > this.z(this.k.F).width() - this.z(this.V).width() ? (this.k.jScrollPane.data("jsp").scrollToPercentX(0.5, z), this.k.jScrollPane.data("jsp").scrollToPercentY(0.5, z)) : (this.k.jScrollPane.data("jsp").scrollToPercentX(0, z), this.k.jScrollPane.data("jsp").scrollToPercentY(0, z)) : this.k.jScrollPane.data("jsp").scrollToPercentX(0, z) : this.z(this.V).parent().scrollTo && this.z(this.V).parent().scrollTo({left: "50%"}, 0, {axis: "x"}));
        }, create: function (c) {
            var d = this;
            if (d.g.j == S) {
                c.append("<div class='flowpaper_page " + (d.g.document.DisableOverflow ? "flowpaper_ppage" : "") + " " + (d.g.document.DisableOverflow && d.pageNumber < d.g.renderer.getNumPages() - 1 ? "ppage_break" : "ppage_none") + "' id='" + d.jc + "' style='position:relative;" + (d.g.document.DisableOverflow ? "margin:0;padding:0;overflow:hidden;" : "") + "'><div id='" + d.S + "' class='' style='z-index:11;" + d.getDimensions() + ";'></div></div>");
                if (0 < jQuery(d.g.Lf).length) {
                    var e = this.pa * this.scale;
                    jQuery(d.g.Lf).append("<div id='" + d.ah + "' class='flowpaper_page' style='position:relative;height:" + e + "px;width:100%;overflow:hidden;'></div>");
                }
                d.uj();
            }
            d.g.j == X && 0 == d.pageNumber && c.append("<div class='flowpaper_page' id='" + d.jc + "' class='flowpaper_rescale' style='position:relative;'><div id='" + d.S + "' class='' style='position:absolute;z-index:11;" + d.getDimensions() + "'></div></div>");
            if (d.g.j == V || d.g.j == T) {
                0 == d.pageNumber && jQuery(c.children().get(0)).append("<div class='flowpaper_page' id='" + d.jc + "_1' style='z-index:2;float:right;position:relative;'><div id='" + d.S + "_1' class='flowpaper_hidden flowpaper_border' style='" + d.getDimensions() + ";float:right;'></div></div>"), 1 == d.pageNumber && jQuery(c.children().get(1)).append("<div class='flowpaper_page' id='" + d.jc + "_2' style='position:relative;z-index:1;float:left;'><div id='" + d.S + "_2' class='flowpaper_hidden flowpaper_border' style='" + d.getDimensions() + ";float:left'></div></div>");
            }
            d.g.j == W && (c.append("<div class='flowpaper_page' id='" + d.jc + "' style='position:relative;" + (eb.browser.msie ? "clear:none;float:left;" : "display:inline-block;") + "'><div id=\"" + d.S + '" class="flowpaper_page flowpaper_thumb flowpaper_border flowpaper_load_on_demand" style="margin-left:10px;' + d.getDimensions() + '"></div></div>'), jQuery(d.V).on("mousedown touchstart", function () {
                d.g.gotoPage(d.pageNumber + 1);
            }));
            d.g.j == d.H ? d.g.u.bc.create(d, c) : (d.g.renderer.oe(d), d.show(), d.height = d.z(d.V).height(), d.ok());
        }, uj: function () {
            var c = this;
            if (c.g.gd) {
                jQuery(c.V).on("mouseover, mousemove", function () {
                    c.g.j == S ? va("pageContainer_" + c.pageNumber + "_documentViewer_textLayer", c.pageNumber + 1) : va("turn-page-wrapper-" + (c.pageNumber + 1), c.pageNumber + 1);
                });
            }
        }, Pa: function () {
            if (this.g.j == S || this.g.j == X) {
                return this.Zd;
            }
            if (this.g.j == V || this.g.j == T) {
                if (0 == this.pageNumber) {
                    return this.Zd + "_1";
                }
                if (1 == this.pageNumber) {
                    return this.Zd + "_2";
                }
            }
        }, fj: function () {
            if (this.g.j == S || this.g.j == X) {
                return this.K;
            }
            if (this.g.j == V || this.g.j == T) {
                if (0 == this.pageNumber) {
                    return this.V + "_1";
                }
                if (1 == this.pageNumber) {
                    return this.V + "_2";
                }
            }
        }, Ed: function () {
            if (this.g.j == S || this.g.j == X) {
                return this.K;
            }
            if (this.g.j == V || this.g.j == T) {
                if (0 == this.pageNumber) {
                    return this.V + "_1";
                }
                if (1 == this.pageNumber) {
                    return this.V + "_2";
                }
            }
        }, Fd: function () {
            if (this.g.j == S || this.g.j == X) {
                return this.Ba;
            }
            if (this.g.j == V || this.g.j == T) {
                if (0 == this.pageNumber) {
                    return this.Ba + "_1";
                }
                if (1 == this.pageNumber) {
                    return this.Ba + "_2";
                }
            }
        }, wf: function (c) {
            this.z(this.sf).css({top: c});
        }, $a: function () {
            (this.g.j == S || this.g.j == X || this.g.j == this.H) && jQuery("#" + this.bb).remove();
            if (this.g.j == V || this.g.j == T) {
                0 == this.pageNumber && this.z(this.Nb + "_1").hide(), 1 == this.pageNumber && this.z(this.Nb + "_2").hide();
            }
        }, xc: function () {
            if (!this.g.document.DisableOverflow) {
                if (this.g.j == S || this.g.j == X || this.g.j == this.H) {
                    this.pa = 1000;
                    if (0 < this.z(this.Nb).length) {
                        return;
                    }
                    var c = 0 < jQuery(this.V).length ? jQuery(this.V) : this.te;
                    c && c.find && 0 != c.length ? 0 == c.find("#" + this.bb).length && c.append("<img id='" + this.bb + "' src='" + this.g.pc + "' class='flowpaper_pageLoader'  style='position:absolute;left:50%;top:50%;height:8px;margin-left:" + (this.nb() - 10) + "px;' />") : da("can't show loader, missing container for page " + this.pageNumber);
                }
                if (this.g.j == V || this.g.j == T) {
                    if (0 == this.pageNumber) {
                        if (0 < this.z(this.Nb + "_1").length) {
                            this.z(this.Nb + "_1").show();
                            return;
                        }
                        this.z(this.K + "_1").append("<img id='" + this.bb + "_1' src='" + this.g.pc + "' style='position:absolute;left:" + (this.Aa() - 30) + "px;top:" + this.Ra() / 2 + "px;' />");
                        this.z(this.Nb + "_1").show();
                    }
                    1 == this.pageNumber && (0 < this.z(this.Nb + "_2").length || this.z(this.K + "_2").append("<img id='" + this.bb + "_2' src='" + this.g.pc + "' style='position:absolute;left:" + (this.Aa() / 2 - 10) + "px;top:" + this.Ra() / 2 + "px;' />"), this.z(this.Nb + "_2").show());
                }
            }
        }, Ta: function () {
            var c, d;
            d = this.Aa();
            c = this.Ra();
            var e = this.nb();
            this.g.document.DisableOverflow && (c = Math.floor(c), d = Math.floor(d));
            if (this.g.j == S || this.g.j == X) {
                this.z(this.V).css({
                    height: c,
                    width: d,
                    "margin-left": e,
                    "margin-top": 0
                }), this.z(this.K).css({height: c, width: d, "margin-left": e}), this.z(this.O).css({
                    height: c,
                    width: d,
                    "margin-left": e
                }), this.z(this.Ye).css({height: c, width: d}), this.z(this.Ze).css({
                    height: c,
                    width: d
                }), this.z(this.sf).css({
                    height: c,
                    width: d
                }), this.z(this.Nb).css({"margin-left": e}), jQuery(this.Ba).css({
                    height: c,
                    width: d,
                    "margin-left": e
                }), this.g.renderer.yc && (jQuery(".flowpaper_flipview_canvas_highres").css({
                    width: 0.25 * d,
                    height: 0.25 * c
                }).show(), 1 > this.scale ? this.g.renderer.Te(this) : this.g.renderer.we(this)), this.me(this.scale, e);
            }
            if (this.g.j == V || this.g.j == T) {
                this.z(this.K + "_1").css({height: c, width: d}), this.z(this.K + "_2").css({
                    height: c,
                    width: d
                }), this.z(this.K + "_1_textoverlay").css({
                    height: c,
                    width: d
                }), this.z(this.K + "_2_textoverlay").css({height: c, width: d}), this.z(this.O).css({
                    height: c,
                    width: d
                }), eb.browser.Da.Ia || (0 == this.k.D ? this.k.z(this.k.F).css({
                    height: c,
                    width: d
                }) : this.k.z(this.k.F).css({
                    height: c,
                    width: 2 * d
                }), this.g.j == V && this.k.z(this.k.F).css({width: "100%"})), eb.platform.touchdevice && 1 <= this.scale && this.k.z(this.k.F).css({width: 2 * d}), eb.platform.touchdevice && (this.g.j == V && this.k.z(this.k.F + "_2").css("left", this.k.z(this.k.F + "_1").width() + e + 2), this.g.j == T && this.k.z(this.k.F + "_2").css("left", this.k.z(this.k.F + "_1").width() + e + 2));
            }
            if (this.g.j == this.H) {
                var g = this.rg() * this.pa, f = this.Aa() / g;
                this.dimensions.ib != s && (this.dc && this.g.renderer.da) && (f = this.k.al / 2 / g);
                this.g.j == this.H ? 1 == this.scale && this.me(f, e) : this.me(f, e);
            }
            this.height = c;
            this.width = d;
        }, ac: function () {
            return this.g.j == X;
        }, resize: B(), rg: function () {
            return this.dimensions.U / this.dimensions.ia;
        }, Mc: function () {
            return this.g.j == this.H ? this.g.u.bc.Mc(this) : this.pa * this.scale * (this.dimensions.U / this.dimensions.ia);
        }, xg: function () {
            return this.g.j == this.H ? this.g.u.bc.xg(this) : this.pa * this.scale;
        }, getDimensions: function () {
            var c = this.bd(), d = this.g.Mc();
            if (this.g.document.DisableOverflow) {
                var e = this.pa * this.scale;
                return "height:" + e + "px;width:" + e * c + "px";
            }
            if (this.g.j == S || this.g.j == X) {
                return e = this.pa * this.scale, "height:" + e + "px;width:" + e * c + "px;margin-left:" + (d - e * c) / 2 + "px;";
            }
            if (this.g.j == this.H) {
                return this.g.u.bc.getDimensions(this, c);
            }
            if (this.g.j == V || this.g.j == T) {
                return e = this.r.width() / 2 * this.scale, (0 == this.pageNumber ? "margin-left:0px;" : "") + "height:" + e + "px;width:" + e * c + "px";
            }
            if (this.g.j == W) {
                return e = this.pa * ((this.r.height() - 100) / this.pa) / 2.7, "height:" + e + "px;width:" + e * c + "px";
            }
        }, bd: function () {
            return this.dimensions.U / this.dimensions.ia;
        }, Aa: function (c) {
            return this.g.j == this.H ? this.g.u.bc.Aa(this) : this.pa * this.bd() * (c ? c : this.scale);
        }, Bg: function () {
            return this.g.j == this.H ? this.g.u.bc.Bg(this) : this.pa * this.bd() * this.scale;
        }, zg: function (c) {
            return c / (this.pa * this.bd());
        }, Ra: function () {
            return this.g.j == this.H ? this.g.u.bc.Ra(this) : this.pa * this.scale;
        }, Ag: function () {
            return this.g.j == this.H ? this.g.u.bc.Ag(this) : this.pa * this.scale;
        }, nb: function () {
            var c = this.g.Mc(), d = 0;
            if (this.g.document.DisableOverflow) {
                return 0;
            }
            if (this.g.j == S || this.g.j == X) {
                return this.k.Nd && this.k.Nd > c && (c = this.k.Nd), d = (c - this.Aa()) / 2 / 2 - 4, 0 < d ? d : 0;
            }
            if (this.g.j == V || this.g.j == T) {
                return 0;
            }
            if (this.g.j == this.H) {
                return this.g.u.bc.nb(this);
            }
        }, hd: function (c, d, e) {
            var g = z;
            if (this.g.j == S || this.g.j == W) {
                if (this.offset = this.z(this.V).offset()) {
                    this.k.Kf || (this.k.Kf = this.g.A.offset().top);
                    var g = this.offset.top - this.k.Kf + c, f = this.offset.top + this.height;
                    d = c + d;
                    g = e || eb.platform.touchdevice && !eb.browser.Da.Ia ? this.Ha = c - this.height <= g && d >= g || g - this.height <= c && f >= d : c <= g && d >= g || g <= c && f >= d;
                } else {
                    g = z;
                }
            }
            this.g.j == X && (g = this.Ha = 0 == this.pageNumber);
            this.g.j == this.H && (g = this.Ha = this.g.u.bc.hd(this));
            if (this.g.j == T) {
                if (0 == this.k.getTotalPages() % 2 && this.k.D >= this.k.getTotalPages() && 1 == this.pageNumber) {
                    return z;
                }
                g = this.Ha = 0 == this.pageNumber || 0 != this.k.D && 1 == this.pageNumber;
            }
            if (this.g.j == V) {
                if (0 != this.k.getTotalPages() % 2 && this.k.D >= this.k.getTotalPages() && 1 == this.pageNumber) {
                    return z;
                }
                g = this.Ha = 0 == this.pageNumber || 1 == this.pageNumber;
            }
            return g;
        }, wj: function () {
            this.na || this.load();
        }, load: function (c) {
            this.ma(c);
            if (!this.na) {
                if (this.g.j == V && (c = this.g.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.k.D + this.pageNumber], c.width != this.dimensions.width || c.height != this.dimensions.height)) {
                    this.dimensions = c, this.Ta();
                }
                if (this.g.j == T && (c = this.g.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.k.D - (0 < this.k.D ? 1 : 0) + this.pageNumber], c.width != this.dimensions.width || c.height != this.dimensions.height)) {
                    this.dimensions = c, this.Ta();
                }
                if (this.g.j == X) {
                    c = this.g.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.k.D];
                    if (c.width != this.dimensions.width || c.height != this.dimensions.height) {
                        this.dimensions = c, this.Ta(), jQuery(".flowpaper_pageword_" + this.p).remove(), this.ma();
                    }
                    this.dimensions.loaded = z;
                }
                if (this.g.j == S && (c = this.g.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.pageNumber], c.width != this.dimensions.width || c.height != this.dimensions.height)) {
                    this.dimensions = c, this.Ta(), jQuery(".flowpaper_pageword_" + this.p).remove(), this.ma();
                }
                this.g.renderer.Ob(this, z);
                "function" === typeof this.Jd && this.loadOverlay();
            }
        }, unload: function () {
            if (this.na || !(this.g.j != V && this.g.j != T && this.g.j != this.H)) {
                if (delete this.selectors, this.selectors = {}, jQuery(this.ha).unbind(), delete this.ha, this.ha = s, this.na = z, this.g.renderer.unload(this), jQuery(this.Nb).remove(), this.Of && (delete this.Of, this.Of = s), this.g.j == this.H && this.g.u.bc.unload(this), this.g.j != V && this.g.j != T && this.z("#" + this.Pa()).remove(), "function" === typeof this.Jd) {
                    var c = document.getElementById(this.Pa());
                    c && (c.width = this.Aa());
                }
            }
        }, ma: function (c) {
            this.g.j != W && ((this.Ha || c != s) && !this.k.Dc) && this.g.renderer.ma(this, z, c);
        }, xb: function (c, d, e) {
            this.g.renderer.xb(this, c, d, e);
        }, Cc: function (c, d, e) {
            this.g.renderer.Cc(this, c, d, e);
        }, ok: function () {
            if (this.g.j == S || this.g.j == X) {
                !(eb.browser.msie && 9 > eb.browser.version) && !eb.platform.ios && (new ha(this.g, "CanvasPageRenderer" == this.renderer.Lc() ? this.K : this.O, this.z(this.V).parent())).scroll();
            }
        }, me: function (c, d) {
            var e = this;
            if (e.g.I[e.pageNumber]) {
                for (var g = 0; g < e.g.I[e.pageNumber].length; g++) {
                    if ("link" == e.g.I[e.pageNumber][g].type) {
                        var f = e.g.I[e.pageNumber][g].Xl * c, n = e.g.I[e.pageNumber][g].Yl * c,
                            l = e.g.I[e.pageNumber][g].width * c, q = e.g.I[e.pageNumber][g].height * c,
                            h = e.g.I[e.pageNumber][g].Qm, A = e.g.I[e.pageNumber][g].Rm, D = e.g.I[e.pageNumber][g].cm;
                        if (0 == jQuery("#flowpaper_mark_link_" + e.pageNumber + "_" + g).length) {
                            var w = jQuery(String.format("<div id='flowpaper_mark_link_{4}_{5}' class='flowpaper_mark_link flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;box-shadow: 0px 0px 0px 0px;'></div>", f, n, l, q, e.pageNumber, g)),
                                t = e.V;
                            0 == jQuery(t).length && (t = e.te);
                            if (h) {
                                h = "flowpaper-linkicon-url";
                                e.g.I[e.pageNumber][g].href && -1 < e.g.I[e.pageNumber][g].href.indexOf("mailto:") && (h = "flowpaper-linkicon-email");
                                e.g.I[e.pageNumber][g].href && -1 < e.g.I[e.pageNumber][g].href.indexOf("tel:") && (h = "flowpaper-linkicon-phone");
                                e.g.I[e.pageNumber][g].href && -1 < e.g.I[e.pageNumber][g].href.indexOf("actionGoTo:") && (h = "flowpaper-linkicon-bookmark");
                                var x = jQuery(String.format("<div id='flowpaper_mark_link_{4}_{5}_icon' class='flowpaper_mark flowpaper-linkicon flowpaper-linkicon-roundbg' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;pointer-events:none;'></div>'", f, n, l, q, e.pageNumber, g));
                                jQuery(t).append(x);
                                f = jQuery(String.format("<div id='flowpaper_mark_link_{4}_{5}_icon' class='flowpaper_mark flowpaper-linkicon {6}' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;pointer-events:none;'></div>'", f, n, l, q, e.pageNumber, g, h));
                                jQuery(t).append(f);
                            }
                            t = jQuery(t).append(w).find("#flowpaper_mark_link_" + e.pageNumber + "_" + g);
                            A && (t.data("mouseOverText", D), t.bind("mouseover", function (c) {
                                for (var d = document.querySelectorAll(".popover"), g = 0; g < d.length; g++) {
                                    d[g].remove();
                                }
                                jQuery(this).data("mouseOverText") && !(jQuery(this).data("mouseOverText") && 0 == jQuery(this).data("mouseOverText").length) && (c = new Popover({
                                    position: "top",
                                    button: c.target
                                }), c.Gm('<span style="font-family:Arial;font-size:0.8em;">' + jQuery(this).data("mouseOverText") + "</span>"), c.render("open", e.g.A.get(0)));
                            }), t.bind("mouseout", function () {
                                for (var c = document.querySelectorAll(".popover"), e = 0; e < c.length; e++) {
                                    c[e].remove();
                                }
                            }));
                            t.data("link", e.g.I[e.pageNumber][g].href);
                            t.bind("mouseup touchend", function (c) {
                                if (e.k.Nf || e.k.Dc) {
                                    return z;
                                }
                                if (0 == jQuery(this).data("link").indexOf("actionGoTo:")) {
                                    e.g.gotoPage(jQuery(this).data("link").substr(11));
                                } else {
                                    if (0 == jQuery(this).data("link").indexOf("javascript")) {
                                        var d = unescape(jQuery(this).data("link"));
                                        eval(d.substring(11));
                                    } else {
                                        jQuery(e.r).trigger("onExternalLinkClicked", jQuery(this).data("link"));
                                    }
                                }
                                c.preventDefault();
                                c.stopImmediatePropagation();
                                return z;
                            });
                            eb.platform.touchonlydevice || (jQuery(t).on("mouseover", function () {
                                jQuery(this).stop(r, r);
                                jQuery(this).css("background", e.g.linkColor);
                                jQuery(this).css({opacity: e.g.pe});
                            }), jQuery(t).on("mouseout", function () {
                                jQuery(this).css("background", "");
                                jQuery(this).css({opacity: 0});
                            }));
                        } else {
                            w = jQuery("#flowpaper_mark_link_" + e.pageNumber + "_" + g), w.css({
                                left: f + "px",
                                top: n + "px",
                                width: l + "px",
                                height: q + "px",
                                "margin-left": d + "px"
                            });
                        }
                    }
                    "video" == e.g.I[e.pageNumber][g].type && (D = e.g.I[e.pageNumber][g].hn * c, w = e.g.I[e.pageNumber][g].jn * c, t = e.g.I[e.pageNumber][g].width * c, A = e.g.I[e.pageNumber][g].height * c, f = e.g.I[e.pageNumber][g].src, n = e.g.I[e.pageNumber][g].autoplay, FLOWPAPER.authenticated && (f = FLOWPAPER.appendUrlParameter(f, FLOWPAPER.authenticated.getParams())), 0 == jQuery("#flowpaper_mark_video_" + e.pageNumber + "_" + g).length ? (f = jQuery(String.format("<div id='flowpaper_mark_video_{4}_{5}' data-autoplay='{8}' class='flowpaper_mark_video flowpaper_mark_video_{4} flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;margin-left:{7}px'><img src='{6}' style='position:absolute;width:{2}px;height:{3}px;' class='flowpaper_mark'/></div>", D, w, t, A, e.pageNumber, g, f, d, n)), t = e.V, 0 == jQuery(t).length && (t = e.te), t = jQuery(t).append(f).find("#flowpaper_mark_video_" + e.pageNumber + "_" + g), t.data("video", e.g.I[e.pageNumber][g].url), t.data("maximizevideo", e.g.I[e.pageNumber][g].bm), t.bind("mouseup touchend", function (c) {
                        jQuery(e.r).trigger("onVideoStarted", {
                            VideoUrl: jQuery(this).data("video"),
                            PageNumber: e.pageNumber + 1
                        });
                        if (e.k.Nf || e.k.Dc) {
                            return z;
                        }
                        var d = jQuery(this).data("video"), g = "true" == jQuery(this).data("maximizevideo");
                        if (d && 0 <= d.toLowerCase().indexOf("youtube")) {
                            for (var f = d.substr(d.indexOf("?") + 1).split("&"), m = "", h = 0; h < f.length; h++) {
                                0 == f[h].indexOf("v=") && (m = f[h].substr(2));
                            }
                            if (g) {
                                e.g.tb = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>'));
                                e.g.A.append(e.g.tb);
                                jQuery(e.g.tb).html(String.format("<iframe class='flowpaper_videoframe' width='{0}' height='{1}' src='{3}://www.youtube.com/embed/{2}?rel=0&autoplay=1&enablejsapi=1' frameborder='0' allowfullscreen ></iframe>", 0.95 * e.g.A.width(), 0.95 * e.g.A.height(), m, -1 < location.href.indexOf("https:") ? "https" : "http"));
                                var l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;right:3px;top:1%;z-index:999999;cursor:pointer;">', e.g.wd));
                                e.g.A.append(l);
                                jQuery(l).bind("mousedown touchstart", function () {
                                    jQuery(".flowpaper_mark_video_maximized").remove();
                                    jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                                });
                            } else {
                                jQuery(this).html(String.format("<iframe class='flowpaper_videoframe' width='{0}' height='{1}' src='{3}://www.youtube.com/embed/{2}?rel=0&autoplay=1&enablejsapi=1' frameborder='0' allowfullscreen ></iframe>", jQuery(this).width(), jQuery(this).height(), m, -1 < location.href.indexOf("https:") ? "https" : "http"));
                            }
                        }
                        d && 0 <= d.toLowerCase().indexOf("vimeo") && (m = d.substr(d.lastIndexOf("/") + 1), g ? (e.g.tb = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>')), e.g.A.append(e.g.tb), jQuery(e.g.tb).html(String.format("<iframe class='flowpaper_videoframe' src='//player.vimeo.com/video/{2}?autoplay=1' width='{0}' height='{1}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>", 0.95 * e.g.A.width(), 0.95 * e.g.A.height(), m)), l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;right:3px;top:1%;z-index:999999;cursor:pointer;">', e.g.wd)), e.g.A.append(l), jQuery(l).bind("mousedown touchstart", function () {
                            jQuery(".flowpaper_mark_video_maximized").remove();
                            jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                        })) : jQuery(this).html(String.format("<iframe class='flowpaper_videoframe' src='//player.vimeo.com/video/{2}?autoplay=1' width='{0}' height='{1}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>", jQuery(this).width(), jQuery(this).height(), m)));
                        d && 0 <= d.toLowerCase().indexOf("wistia") && (m = d.substr(d.lastIndexOf("/") + 1), g ? (e.g.tb = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>')), e.g.A.append(e.g.tb), jQuery(e.g.tb).html(String.format("<iframe class='flowpaper_videoframe' src='//fast.wistia.net/embed/iframe/{2}?autoplay=true' width='{0}' height='{1}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>", 0.95 * e.g.A.width(), 0.95 * e.g.A.height(), m)), l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;right:3px;top:1%;z-index:999999;cursor:pointer;">', e.g.wd)), e.g.A.append(l), jQuery(l).bind("mousedown touchstart", function () {
                            jQuery(".flowpaper_mark_video_maximized").remove();
                            jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                        })) : jQuery(this).html(String.format("<iframe class='flowpaper_videoframe' src='//fast.wistia.net/embed/iframe/{2}?autoplay=true' width='{0}' height='{1}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>", jQuery(this).width(), jQuery(this).height(), m)));
                        if (d && -1 < d.indexOf("{")) {
                            try {
                                var n = JSON.parse(d), q = "vimeoframe_" + FLOWPAPER.ej();
                                if (g) {
                                    e.g.tb = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>')), e.g.A.append(e.g.tb), jQuery(e.g.tb).html(jQuery(String.format('<video id="{2}" style="width:{3}px;height:{4}px;" class="videoframe flowpaper_mark video-js vjs-default-skin" controls autoplay preload="auto" width="{3}" height="{4}" data-setup=\'{"example_option":true}\'><source src="{0}" type="video/mp4" /><source src="{1}" type="video/webm" /></video>', n.mp4, n.webm, q, 0.95 * e.g.A.width(), 0.95 * e.g.A.height()))), l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;right:3px;top:1%;z-index:999999;cursor:pointer;">', e.g.wd)), e.g.A.append(l), jQuery(l).bind("mousedown touchstart", function () {
                                        jQuery(".flowpaper_mark_video_maximized").remove();
                                        jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                                    });
                                } else {
                                    if (0 == jQuery(this).find("video").length) {
                                        jQuery(this).html(jQuery(String.format('<video id="{2}" style="width:{3}px;height:{4}px;" class="videoframe flowpaper_mark video-js vjs-default-skin" controls autoplay preload="auto" width="{3}" height="{4}" data-setup=\'{"example_option":true}\'><source src="{0}" type="video/mp4" /><source src="{1}" type="video/webm" /></video>', n.mp4, n.webm, q, jQuery(this).width(), jQuery(this).height())));
                                    } else {
                                        return r;
                                    }
                                }
                            } catch (t) {
                            }
                        }
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        return z;
                    })) : (f = jQuery("#flowpaper_mark_video_" + e.pageNumber + "_" + g), f.css({
                        left: D + "px",
                        top: w + "px",
                        width: t + "px",
                        height: A + "px",
                        "margin-left": d + "px"
                    }).find(".flowpaper_mark").css({
                        width: t + "px",
                        height: A + "px"
                    }), w = f.find("iframe"), 0 < w.length && (w.attr("width", t), w.attr("height", A))));
                    "image" == e.g.I[e.pageNumber][g].type && (t = e.g.I[e.pageNumber][g].Ll * c, n = e.g.I[e.pageNumber][g].Ml * c, l = e.g.I[e.pageNumber][g].width * c, q = e.g.I[e.pageNumber][g].height * c, A = e.g.I[e.pageNumber][g].src, D = e.g.I[e.pageNumber][g].href, w = e.g.I[e.pageNumber][g].Jl, FLOWPAPER.authenticated && (A = FLOWPAPER.appendUrlParameter(A, FLOWPAPER.authenticated.getParams())), 0 == jQuery("#flowpaper_mark_image_" + e.pageNumber + "_" + g).length ? (f = jQuery(String.format("<div id='flowpaper_mark_image_{4}_{5}' class='flowpaper_mark_image flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;'><img src='{6}' style='position:absolute;width:{2}px;height:{3}px;' class='flowpaper_mark'/></div>", t, n, l, q, e.pageNumber, g, A)), t = e.V, 0 == jQuery(t).length && (t = e.te), t = jQuery(t).append(f).find("#flowpaper_mark_image_" + e.pageNumber + "_" + g), t.data("image", e.g.I[e.pageNumber][g].url), D != s && 0 < D.length ? (t.data("link", D), t.bind("mouseup touchend", function (c) {
                        if (e.k.Nf || e.k.Dc) {
                            return z;
                        }
                        0 == jQuery(this).data("link").indexOf("actionGoTo:") ? e.g.gotoPage(jQuery(this).data("link").substr(11)) : jQuery(e.r).trigger("onExternalLinkClicked", jQuery(this).data("link"));
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        return z;
                    })) : e.g.gd || f.css({"pointer-events": "none"}), w != s && 0 < w.length && (t.data("hoversrc", w), t.data("imagesrc", A), t.bind("mouseover", function () {
                        jQuery(this).find(".flowpaper_mark").attr("src", jQuery(this).data("hoversrc"));
                    }), t.bind("mouseout", function () {
                        jQuery(this).find(".flowpaper_mark").attr("src", jQuery(this).data("imagesrc"));
                    }), e.g.gd || f.css({"pointer-events": "auto"}))) : (f = jQuery("#flowpaper_mark_image_" + e.pageNumber + "_" + g), f.css({
                        left: t + "px",
                        top: n + "px",
                        width: l + "px",
                        height: q + "px",
                        "margin-left": d + "px"
                    }).find(".flowpaper_mark").css({width: l + "px", height: q + "px"})));
                    "iframe" == e.g.I[e.pageNumber][g].type && (w = e.g.I[e.pageNumber][g].Al * c, f = e.g.I[e.pageNumber][g].Bl * c, t = e.g.I[e.pageNumber][g].width * c, D = e.g.I[e.pageNumber][g].height * c, n = e.g.I[e.pageNumber][g].src, FLOWPAPER.authenticated && (n = FLOWPAPER.appendUrlParameter(n, FLOWPAPER.authenticated.getParams())), 0 == jQuery("#flowpaper_mark_frame_" + e.pageNumber + "_" + g).length ? (A = t - 10, 50 < A && (A = 50), 50 > t && (A = t - 10), 50 > D && (A = D - 10), n = jQuery(String.format("<div id='flowpaper_mark_frame_{4}_{5}' class='flowpaper_mark_frame flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;margin-left:{7}px'><img src='{6}' style='position:absolute;width:{2}px;height:{3}px;' class='flowpaper_mark'/><div id='flowpaper_mark_frame_{4}_{5}_play' style='position:absolute;top:{9}px;left:{8}px;'></div></div>", w, f, t, D, e.pageNumber, g, n, d, t / 2 - A / 3, D / 2 - A)), t = e.V, 0 == jQuery(t).length && (t = e.te), t = jQuery(t).append(n).find("#flowpaper_mark_frame_" + e.pageNumber + "_" + g), jQuery("#flowpaper_mark_frame_" + e.pageNumber + "_" + g + "_play").Zj(A), t.data("url", e.g.I[e.pageNumber][g].url), t.data("maximizeframe", e.g.I[e.pageNumber][g].am), jQuery("#flowpaper_mark_frame_" + e.pageNumber + "_" + g + "_play").bind("mouseup touchend", function (c) {
                        if (e.k.Nf || e.k.Dc) {
                            return z;
                        }
                        var d = jQuery(this).parent().data("url"),
                            g = "true" == jQuery(this).parent().data("maximizeframe");
                        -1 < d.indexOf("http") && (d = d.substr(d.indexOf("//") + 2));
                        g ? (e.g.Ug = jQuery(String.format('<div class="flowpaper_mark_frame_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>')), e.g.A.append(e.g.Ug), jQuery(e.g.Ug).html(String.format("<iframe sandbox='allow-forms allow-same-origin allow-scripts' width='{0}' height='{1}' src='{3}://{2}' frameborder='0' allowfullscreen ></iframe>", 0.95 * e.g.A.width(), 0.95 * e.g.A.height(), d, -1 < location.href.indexOf("https:") ? "https" : "http")), d = jQuery(String.format('<img class="flowpaper_mark_frame_maximized_closebutton" src="{0}" style="position:absolute;right:3px;top:1%;z-index:999999;cursor:pointer;">', e.g.wd)), e.g.A.append(d), jQuery(d).bind("mousedown touchstart", function () {
                            jQuery(".flowpaper_mark_frame_maximized").remove();
                            jQuery(".flowpaper_mark_frame_maximized_closebutton").remove();
                        })) : jQuery(this).parent().html(String.format("<iframe sandbox='allow-forms allow-same-origin allow-scripts' width='{0}' height='{1}' src='{3}://{2}' frameborder='0' allowfullscreen ></iframe>", jQuery(this).parent().width(), jQuery(this).parent().height(), d, -1 < location.href.indexOf("https:") ? "https" : "http"));
                        c.preventDefault();
                        c.stopImmediatePropagation();
                        return z;
                    })) : (n = jQuery("#flowpaper_mark_frame_" + e.pageNumber + "_" + g), n.css({
                        left: w + "px",
                        top: f + "px",
                        width: t + "px",
                        height: D + "px",
                        "margin-left": d + "px"
                    }).find(".flowpaper_mark").css({
                        width: t + "px",
                        height: D + "px"
                    }), w = n.find("iframe"), 0 < w.length && (w.attr("width", t), w.attr("height", D))));
                }
            }
        }, lb: function () {
            jQuery(this.V).find("*").unbind();
            jQuery(this).unbind();
            jQuery(this.ha).unbind();
            delete this.ha;
            this.ha = s;
            jQuery(this.V).find("*").remove();
            this.selectors = this.k = this.g = this.r = s;
        }, rotate: function () {
            if (!this.rotation || 360 == this.rotation) {
                this.rotation = 0;
            }
            this.rotation += 90;
            360 == this.rotation && (this.rotation = 0);
            var c = this.nb();
            if (this.g.j == S || this.g.j == X) {
                this.Ta(), 90 == this.rotation ? (this.z(this.K).transition({rotate: this.rotation}, 0), jQuery(this.O).transition({
                    rotate: this.rotation,
                    translate: "-" + c + "px, 0px"
                }, 0), jQuery(this.Ba).css({
                    "z-index": 11,
                    "margin-left": c
                }), jQuery(this.Ba).transition({
                    rotate: this.rotation,
                    translate: "-" + c + "px, 0px"
                }, 0)) : 270 == this.rotation ? (jQuery(this.O).transition({
                    rotate: this.rotation,
                    translate: "-" + c + "px, 0px"
                }, 0), jQuery(this.Ba).css({
                    "z-index": 11,
                    "margin-left": c
                }), this.z(this.K).transition({rotate: this.rotation}, 0), jQuery(this.Ba).transition({
                    rotate: this.rotation,
                    translate: "-" + c + "px, 0px"
                }, 0)) : 180 == this.rotation ? (jQuery(this.O).transition({
                    rotate: this.rotation,
                    translate: "-" + c + "px, 0px"
                }, 0), jQuery(this.Ba).css({
                    "z-index": 11,
                    "margin-left": c
                }), this.z(this.K).transition({rotate: this.rotation}, 0), jQuery(this.Ba).transition({
                    rotate: this.rotation,
                    translate: "-" + c + "px, 0px"
                }, 0)) : (jQuery(this.O).css("transform", ""), jQuery(this.Ba).css({
                    "z-index": "",
                    "margin-left": 0
                }), this.z(this.K).css("transform", ""), jQuery(this.Ba).css("transform", ""));
            }
        }, ve: function (c, d, e, g, f, n, l) {
            var q = this, h = q.pageNumber + (d ? d : 0), A = new jQuery.Deferred;
            if (!q.g.renderer.rb) {
                return A.resolve(), A;
            }
            q.k.Dc && (window.clearTimeout(q.Yj), q.Yj = setTimeout(function () {
                q.ve(c, d, e, g, f, n, l);
            }, 50));
            l || q.xc();
            var D = q.g.renderer;
            q.j == X && (h = q.k.D);
            q.g.config.document.RTLMode && (h = q.k.getTotalPages() - h - 1);
            D.C[h] && D.C[h].loaded && (1 == jQuery(c).data("needs-overlay") || n) ? (jQuery(c).data("needs-overlay", jQuery(c).data("needs-overlay") - 1), q.xj(d, function () {
                q.zj = r;
                var d = D.C[h].text, l = c.getContext("2d"),
                    n = (e ? e : c.width) / (D.C[0] ? D.C[0].width : D.C[h].width), v = r;
                g || (g = 0, v = z);
                f || (f = 0, v = z);
                l.setTransform(1, 0, 0, 1, g, f);
                l.save();
                l.scale(n, n);
                for (var G = 0; G < d.length; G++) {
                    var C = d[G], y = C[1], K = C[0] + C[10] * C[3], I = C[9], P = C[2], L = C[3], N = C[7], u = C[8],
                        H = C[6], E = C[11], C = C[12], M = N && 0 == N.indexOf("(bold)"),
                        O = N && 0 == N.indexOf("(italic)");
                    N && (N = N.replace("(bold) ", ""), N = N.replace("(italic) ", ""), l.font = (O ? "italic " : "") + (M ? "bold " : "") + Math.abs(L) + "px " + N + ", " + u);
                    if ("object" == typeof H && H.length && 6 == H.length) {
                        var Q, N = H[1], u = H[2], M = H[3], O = H[4], L = H[5];
                        "axial" === H[0] ? Q = l.createLinearGradient(N[0], N[1], u[0], u[1]) : "radial" === H[0] && (Q = l.createRadialGradient(N[0], N[1], M, u[0], u[1], O));
                        H = 0;
                        for (N = L.length; H < N; ++H) {
                            u = L[H], Q.addColorStop(u[0], u[1]);
                        }
                        l.fillStyle = Q;
                    } else {
                        l.fillStyle = H;
                    }
                    0 != E && (l.save(), l.translate(y, K), l.rotate(E));
                    if (C) {
                        for (H = 0; H < C.length; H++) {
                            L = C[H], 0 == E ? (!v || !(0 > g + (y + L[0] * I + P) * n || g + (y + L[0] * I) * n > c.width)) && l.fillText(L[1], y + L[0] * I, K) : l.fillText(L[1], L[0] * Math.abs(I), 0);
                        }
                    }
                    0 != E && l.restore();
                }
                l.restore();
                jQuery(c).data("overlay-scale", n);
                A.resolve(c);
                q.$a();
            })) : (D.C[h].loaded ? A.resolve(c) : (q.zj = z, c.width = 100, A.reject()), q.$a());
            return A;
        }, xj: function (c, d) {
            var e = new jQuery.Deferred, g = this.g.renderer;
            g.fe || (g.fe = {});
            g.Ab || (g.Ab = {});
            for (var f = [], n = z, l = g.cd(this.pageNumber), q = l - 10; q < l; q++) {
                g.C[q] && (g.C[q].fonts && 0 < g.C[q].fonts.length) && (n = r);
            }
            if (!eb.browser.msie && !eb.browser.ic || n) {
                var q = this.pageNumber + (c ? c : 0), h = g.C[q].text;
                if (n) {
                    for (q = l - (10 < l ? 11 : 10); q < l; q++) {
                        if (g.C[q] && g.C[q].fonts && 0 < g.C[q].fonts.length) {
                            for (h = 0; h < g.C[q].fonts.length; h++) {
                                g.Ab[g.C[q].fonts[h].name] || (ma(g.C[q].fonts[h].name, g.C[q].fonts[h].data), f.push(g.C[q].fonts[h].name));
                            }
                        }
                    }
                } else {
                    if (h && 0 < h.length) {
                        for (n = 0; n < h.length; n++) {
                            h[n][7] && !g.Ab[h[n][7]] && -1 == f.indexOf(h[n][7]) && 0 == h[n][7].indexOf("g_font") && h[n][7] && f.push(h[n][7]);
                        }
                    }
                }
            } else {
                l = this.k.getTotalPages();
                for (q = 0; q < l; q++) {
                    if (h = g.C[q], h.loaded) {
                        h = h.text;
                        for (n = 0; n < h.length; n++) {
                            h[n][7] && !g.Ab[h[n][7]] && -1 == f.indexOf(h[n][7]) && 0 == h[n][7].indexOf("g_font") && h[n][7] && f.push(h[n][7]);
                        }
                    }
                }
            }
            0 < f.length ? (q = f.join(" "), g.fe[q] ? g.fe[q].then(function () {
                e.resolve();
            }) : (g.fe[q] = e, WebFont.load({
                custom: {families: f}, inactive: function () {
                    e.resolve();
                }, fontactive: function (c) {
                    g.Ab[c] = "loaded";
                }, fontinactive: function (c) {
                    g.Ab[c] = "inactive";
                }, active: function () {
                    e.resolve();
                }, timeout: eb.browser.msie || eb.browser.ic ? 5000 : 25000
            })), e.then(function () {
                d && d();
            })) : (e.resolve(), d && d());
            return e;
        }
    };
    return f;
}();

function Fa(f, c) {
    this.g = this.be = f;
    this.r = this.g.r;
    this.resources = this.g.resources;
    this.p = this.g.p;
    this.document = c;
    this.Vc = s;
    this.za = "toolbar_" + this.g.p;
    this.m = "#" + this.za;
    this.Yf = this.za + "_bttnPrintdialogPrint";
    this.Pe = this.za + "_bttnPrintdialogCancel";
    this.Vf = this.za + "_bttnPrintDialog_RangeAll";
    this.Wf = this.za + "_bttnPrintDialog_RangeCurrent";
    this.Xf = this.za + "_bttnPrintDialog_RangeSpecific";
    this.Oe = this.za + "_bttnPrintDialogRangeText";
    this.Mg = this.za + "_labelPrintProgress";
    this.Cd = s;
    this.create = function () {
        var c = this;
        c.qk = "background-image:url(data:image/png;base64,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) ;";
        if (!eb.platform.touchonlydevice && !c.Cd) {
            var e = c.resources.J.Oh,
                g = String.format("<div class='flowpaper_floatright flowpaper_bttnPercent' sbttnPrintIdtyle='text-align:center;padding-top:5px;background-repeat:no-repeat;width:20px;height:20px;font-size:9px;font-family:Arial;background-image:url({0})'><div id='lblPercent'></div></div>", c.resources.J.ki);
            eb.browser.msie && addCSSRule(".flowpaper_tbtextinput", "height", "18px");
            jQuery(c.m).html(String.format("<img src='{0}' class='flowpaper_tbbutton print flowpaper_bttnPrint'/>", c.resources.J.fi) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) + (c.g.config.document.ViewModeToolsVisible ? String.format("<img src='{1}' class='flowpaper_bttnSinglePage flowpaper_tbbutton flowpaper_viewmode flowpaper_singlepage {0}' />", c.g.ab == S ? "flowpaper_tbbutton_pressed" : "", c.resources.J.ji) + String.format("<img src='{1}' class='flowpaper_bttnTwoPage flowpaper_tbbutton flowpaper_viewmode flowpaper_twopage {0}' />", c.g.ab == V ? "flowpaper_tbbutton_pressed" : "", c.resources.J.oi) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_thumbview flowpaper_viewmode flowpaper_bttnThumbView' />", c.resources.J.mi) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_fitmode flowpaper_fitwidth flowpaper_bttnFitWidth' />", c.resources.J.di) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_fitmode flowpaper_fitheight flowpaper_bttnFitHeight'/>", c.resources.J.ci) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_bttnRotate'/>", c.resources.J.hi) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + (c.g.config.document.ZoomToolsVisible ? String.format("<div class='flowpaper_slider flowpaper_zoomSlider' style='{0}'><div class='flowpaper_handle' style='{0}'></div></div>", eb.browser.msie && 9 > eb.browser.version ? c.qk : "") + String.format("<input type='text' class='flowpaper_tbtextinput flowpaper_txtZoomFactor' style='width:40px;' />") + String.format("<img class='flowpaper_tbbutton flowpaper_bttnFullScreen' src='{0}' />", c.resources.J.Wh) + String.format("<img src='{0}' class='flowpaper_tbseparator' style='margin-left:5px' />", e) : "") + (c.g.config.document.NavToolsVisible ? String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_previous flowpaper_bttnPrevPage'/>", c.resources.J.Kh) + String.format("<input type='text' class='flowpaper_tbtextinput flowpaper_currPageNum flowpaper_txtPageNumber' value='1' style='width:50px;text-align:right;' />") + String.format("<div class='flowpaper_tblabel flowpaper_numberOfPages flowpaper_lblTotalPages'> / </div>") + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_next flowpaper_bttnPrevNext'/>", c.resources.J.Mh) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + (c.g.config.document.CursorToolsVisible ? String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_bttnTextSelect'/>", c.resources.J.li) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_tbbutton_pressed flowpaper_bttnHand'/>", c.resources.J.$h) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + (c.g.config.document.SearchToolsVisible ? String.format("<input type='text' class='flowpaper_tbtextinput flowpaper_txtSearch' style='width:70px;margin-left:4px' />") + String.format("<img src='{0}' class='flowpaper_find flowpaper_tbbutton flowpaper_bttnFind' />", c.resources.J.Th) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + g);
            jQuery(c.m).addClass("flowpaper_toolbarstd");
        } else {
            c.Cd || (e = c.resources.J.Ph, jQuery(c.m).html((!eb.platform.touchonlydevice ? String.format("<img src='{0}' class='flowpaper_tbbutton_large flowpaper_print flowpaper_bttnPrint' style='margin-left:5px;'/>", c.resources.J.gi) : "") + (c.g.config.document.ViewModeToolsVisible ? (!eb.platform.Bb ? String.format("<img src='{0}' class='flowpaper_tbbutton_large flowpaper_viewmode flowpaper_singlepage {1} flowpaper_bttnSinglePage' style='margin-left:15px;'>", c.resources.J.ii, c.g.ab == S ? "flowpaper_tbbutton_pressed" : "") : "") + (!eb.platform.Bb ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_viewmode  flowpaper_twopage {1} flowpaper_bttnTwoPage'>", c.resources.J.pi, c.g.ab == V ? "flowpaper_tbbutton_pressed" : "") : "") + (!eb.platform.Bb ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_viewmode flowpaper_thumbview flowpaper_bttnThumbView'>", c.resources.J.ni) : "") + (!eb.platform.Bb ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_fitmode flowpaper_fitwidth flowpaper_bttnFitWidth'>", c.resources.J.Vh) : "") + (!eb.platform.Bb ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_fitmode fitheight flowpaper_bttnFitHeight'>", c.resources.J.ei) : "") + "" : "") + (c.g.config.document.ZoomToolsVisible ? String.format("<img class='flowpaper_tbbutton_large flowpaper_bttnZoomIn' src='{0}' style='margin-left:5px;' />", c.resources.J.qi) + String.format("<img class='flowpaper_tbbutton_large flowpaper_bttnZoomOut' src='{0}' style='margin-left:-1px;' />", c.resources.J.ri) + (!eb.platform.Bb ? String.format("<img class='flowpaper_tbbutton_large flowpaper_bttnFullScreen' src='{0}' style='margin-left:-1px;' />", c.resources.J.Xh) : "") + "" : "") + (c.g.config.document.NavToolsVisible ? String.format("<img src='{0}' class='flowpaper_tbbutton_large flowpaper_previous flowpaper_bttnPrevPage' style='margin-left:15px;'/>", c.resources.J.Lh) + String.format("<input type='text' class='flowpaper_tbtextinput_large flowpaper_currPageNum flowpaper_txtPageNumber' value='1' style='width:70px;text-align:right;' />") + String.format("<div class='flowpaper_tblabel_large flowpaper_numberOfPages flowpaper_lblTotalPages'> / </div>") + String.format("<img src='{0}'  class='flowpaper_tbbutton_large flowpaper_next flowpaper_bttnPrevNext'/>", c.resources.J.Nh) + "" : "") + (c.g.config.document.SearchToolsVisible ? String.format("<input type='text' class='flowpaper_tbtextinput_large flowpaper_txtSearch' style='margin-left:15px;width:130px;' />") + String.format("<img src='{0}' class='flowpaper_find flowpaper_tbbutton_large flowpaper_bttnFind' style=''/>", c.resources.J.Uh) + "" : "")), jQuery(c.m).addClass("flowpaper_toolbarios"));
        }
        jQuery(c.r).bind("onDocumentLoaded", function () {
            jQuery(c.m).find(".flowpaper_bttnPercent").hide();
        });
    };
    this.Pg = function (c) {
        c = this.Ya = c.split("\n");
        jQuery(this.m).find(".flowpaper_bttnPrint").attr("title", this.la(c, "Print"));
        jQuery(this.m).find(".flowpaper_bttnSinglePage").attr("title", this.la(c, "SinglePage"));
        jQuery(this.m).find(".flowpaper_bttnTwoPage, .flowpaper_bttnBookView").attr("title", this.la(c, V));
        jQuery(this.m).find(".flowpaper_bttnThumbView").attr("title", this.la(c, W));
        jQuery(this.m).find(".flowpaper_bttnFitWidth").attr("title", this.la(c, "FitWidth"));
        jQuery(this.m).find(".flowpaper_bttnFitHeight").attr("title", this.la(c, "FitHeight"));
        jQuery(this.m).find(".flowpaper_bttnFitHeight").attr("title", this.la(c, "FitPage"));
        jQuery(this.m).find(".flowpaper_zoomSlider").attr("title", this.la(c, "Scale"));
        jQuery(this.m).find(".flowpaper_txtZoomFactor").attr("title", this.la(c, "Scale"));
        jQuery(this.m).find(".flowpaper_bttnFullScreen, .flowpaper_bttnFullscreen").attr("title", this.la(c, "Fullscreen"));
        jQuery(this.m).find(".flowpaper_bttnPrevPage").attr("title", this.la(c, "PreviousPage"));
        jQuery(this.m).find(".flowpaper_txtPageNumber").attr("title", this.la(c, "CurrentPage"));
        jQuery(this.m).find(".flowpaper_bttnPrevNext").attr("title", this.la(c, "NextPage"));
        jQuery(this.m).find(".flowpaper_txtSearch, .flowpaper_bttnTextSearch").attr("title", this.la(c, "Search"));
        jQuery(this.m).find(".flowpaper_bttnFind").attr("title", this.la(c, "Search"));
        var e = this.g.Ge && 0 < this.g.Ge.length ? this.g.Ge : this.g.A;
        e.find(".flowpaper_bttnHighlight").find(".flowpaper_tbtextbutton").html(this.la(c, "Highlight", "Highlight"));
        e.find(".flowpaper_bttnComment").find(".flowpaper_tbtextbutton").html(this.la(c, "Comment", "Comment"));
        e.find(".flowpaper_bttnStrikeout").find(".flowpaper_tbtextbutton").html(this.la(c, "Strikeout", "Strikeout"));
        e.find(".flowpaper_bttnDraw").find(".flowpaper_tbtextbutton").html(this.la(c, "Draw", "Draw"));
        e.find(".flowpaper_bttnDelete").find(".flowpaper_tbtextbutton").html(this.la(c, "Delete", "Delete"));
        e.find(".flowpaper_bttnShowHide").find(".flowpaper_tbtextbutton").html(this.la(c, "ShowAnnotations", "Show Annotations"));
    };
    this.la = function (c, e, g) {
        for (var f = 0; f < c.length; f++) {
            var n = c[f].split("=");
            if (n[0] == e) {
                return n[1];
            }
        }
        return g ? g : s;
    };
    this.bindEvents = function () {
        var c = this;
        jQuery(c.m).find(".flowpaper_tbbutton_large, .flowpaper_tbbutton").each(function () {
            jQuery(this).data("minscreenwidth") && parseInt(jQuery(this).data("minscreenwidth")) > window.innerWidth && jQuery(this).hide();
        });
        if (0 == c.g.A.find(".flowpaper_printdialog").length) {
            var e = c.la(c.Ya, "Enterpagenumbers", "Enter page numbers and/or page ranges separated by commas. For example 1,3,5-12"),
                e = e.replace("1,3,5-12", "2-5");
            c.g.gd ? c.g.A.prepend("<div id='modal-print' class='modal-content flowpaper_printdialog' style='overflow:hidden;;'><div style='background-color:#fff;color:#000;padding:10px 10px 10px 10px;height:205px;padding-bottom:20px;'>It's not possible to print from within the Desktop Publisher. <br/><br/>You can try this feature by clicking on 'Publish' and then 'View in Browser'.<br/><br/><a class='flowpaper_printdialog_button' id='" + c.Pe + "'>OK</a></div></div>") : c.g.A.prepend("<div id='modal-print' class='modal-content flowpaper_printdialog' style='overflow:hidden;'><font style='color:#000000;font-size:11px'><b>" + c.la(c.Ya, "Selectprintrange", "Select print range") + "</b></font><div style='width:98%;padding-top:5px;padding-left:5px;background-color:#ffffff;'><table border='0' style='margin-bottom:10px;'><tr><td><input type='radio' name='PrintRange' checked='checked' id='" + c.Vf + "'/></td><td>" + c.la(c.Ya, "All", "All") + "</td></tr><tr><td><input type='radio' name='PrintRange' id='" + c.Wf + "'/></td><td>" + c.la(c.Ya, "CurrentPage", "Current Page") + "</td></tr><tr><td><input type='radio' name='PrintRange' id='" + c.Xf + "'/></td><td>" + c.la(c.Ya, "Pages", "Pages") + "</td><td><input type='text' style='width:120px' id='" + c.Oe + "' /><td></tr><tr><td colspan='3'>" + e + "</td></tr></table><a id='" + c.Yf + "' class='flowpaper_printdialog_button'>" + c.la(c.Ya, "Print", "Print") + "</a>&nbsp;&nbsp;<a class='flowpaper_printdialog_button' id='" + c.Pe + "'>" + c.la(c.Ya, "Cancel", "Cancel") + "</a><span id='" + c.Mg + "' style='padding-left:5px;'></span><div style='height:5px;display:block;margin-top:5px;'>&nbsp;</div></div></div>");
        }
        jQuery("input:radio[name=PrintRange]:nth(0)").attr("checked", r);
        c.g.config.Toolbar ? (jQuery(c.m).find(".flowpaper_txtZoomFactor").bind("click touchstart", function () {
            if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled")) {
                return z;
            }
        }), jQuery(c.m).find(".flowpaper_currPageNum").bind("click touchstart", function () {
            jQuery(c.m).find(".flowpaper_currPageNum").focus();
        }), jQuery(c.m).find(".flowpaper_txtSearch").bind("click touchstart", function () {
            jQuery(c.m).find(".flowpaper_txtSearch").focus();
            return z;
        }), jQuery(c.m).find(".flowpaper_bttnFind").bind("click touchstart", function () {
            c.searchText(jQuery(c.m).find(".flowpaper_txtSearch").val());
            jQuery(c.m).find(".flowpaper_bttnFind").focus();
            return z;
        })) : (jQuery(c.m).find(".flowpaper_bttnFitWidth").bind("click touchstart", function () {
            jQuery(this).hasClass("flowpaper_tbbutton_disabled") || (c.g.fitwidth(), jQuery("#toolbar").trigger("onFitModeChanged", "Fit Width"));
        }), jQuery(c.m).find(".flowpaper_bttnFitHeight").bind("click touchstart", function () {
            jQuery(this).hasClass("flowpaper_tbbutton_disabled") || (c.g.fitheight(), jQuery("#toolbar").trigger("onFitModeChanged", "Fit Height"));
        }), jQuery(c.m).find(".flowpaper_bttnTwoPage").bind("click touchstart", function () {
            jQuery(this).hasClass("flowpaper_tbbutton_disabled") || (c.g.ab == T ? c.g.switchMode(T) : c.g.switchMode(V));
        }), jQuery(c.m).find(".flowpaper_bttnSinglePage").bind("click touchstart", function () {
            (!c.g.config.document.TouchInitViewMode || !c.g.config.document.TouchInitViewMode == X) && eb.platform.touchonlydevice ? c.g.switchMode(X, c.g.getCurrPage()) : c.g.switchMode(S, c.g.getCurrPage() - 1);
        }), jQuery(c.m).find(".flowpaper_bttnThumbView").bind("click touchstart", function () {
            c.g.switchMode("Tile");
        }), jQuery(c.m).find(".flowpaper_bttnPrint").bind("click touchstart", function () {
            eb.platform.touchonlydevice ? c.g.printPaper("current") : (jQuery("#modal-print").css("background-color", "#dedede"), c.g.fh = jQuery("#modal-print").smodal({
                minHeight: 255,
                appendTo: c.g.A
            }), jQuery("#modal-print").parent().css("background-color", "#dedede"));
        }), jQuery(c.m).find(".flowpaper_bttnDownload").bind("click touchstart", function () {
            if (window.zine) {
                var e = FLOWPAPER.Hf(c.document.PDFFile, c.g.getCurrPage());
                FLOWPAPER.authenticated && (e = FLOWPAPER.appendUrlParameter(e, FLOWPAPER.authenticated.getParams()));
                var f = !eb.browser.msie && -1 == window.location.href.indexOf("flowpaper.com");
                if (f) {
                    jQuery(window.document.body).append(String.format('<a class="flowpaper_downloadlink"></a>'));
                    var n = e.split("?")[0];
                    jQuery(".flowpaper_downloadlink").attr("href", n);
                    jQuery(".flowpaper_downloadlink").attr("download", n.split("/").pop());
                    window.document.querySelector(".flowpaper_downloadlink").click();
                } else {
                    window.open(e, "windowname3", s);
                }
                0 < c.document.PDFFile.indexOf("[*,") && (-1 == c.document.PDFFile.indexOf("[*,2,true]") && 1 < c.g.getTotalPages() && 1 < c.g.getCurrPage()) && (e = FLOWPAPER.Hf(c.document.PDFFile, c.g.getCurrPage() - 1), FLOWPAPER.authenticated && (e = FLOWPAPER.appendUrlParameter(e, FLOWPAPER.authenticated.getParams())), f ? (n = e.split("?")[0], jQuery(".flowpaper_downloadlink").attr("href", n), jQuery(".flowpaper_downloadlink").attr("download", n.split("/").pop()), window.document.querySelector(".flowpaper_downloadlink").click()) : window.open(e, "windowname4", s));
                jQuery(c.g).trigger("onDownloadDocument", e);
            } else {
                e = FLOWPAPER.Hf(c.document.PDFFile, c.g.getCurrPage()), FLOWPAPER.authenticated && (e = FLOWPAPER.appendUrlParameter(e, FLOWPAPER.authenticated.getParams())), window.open(e, "windowname4", s);
            }
            return z;
        }), jQuery(c.m).find(".flowpaper_bttnOutline").bind("click touchstart", function () {
            c.g.expandOutline();
        }), jQuery(c.m).find(".flowpaper_bttnPrevPage").bind("click touchstart", function () {
            c.g.previous();
            return z;
        }), jQuery(c.m).find(".flowpaper_bttnPrevNext").bind("click touchstart", function () {
            c.g.next();
            return z;
        }), jQuery(c.m).find(".flowpaper_bttnZoomIn").bind("click touchstart", function () {
            c.g.j == V || c.g.j == T ? c.g.k.je() : (c.g.j == S || c.g.j == X) && c.g.ZoomIn();
        }), jQuery(c.m).find(".flowpaper_bttnZoomOut").bind("click touchstart", function () {
            c.g.j == V || c.g.j == T ? c.g.k.ed() : (c.g.j == S || c.g.j == X) && c.g.ZoomOut();
        }), jQuery(c.m).find(".flowpaper_txtZoomFactor").bind("click touchstart", function () {
            if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled")) {
                return jQuery(c.m).find(".flowpaper_txtZoomFactor").focus(), z;
            }
        }), jQuery(c.m).find(".flowpaper_currPageNum").bind("click touchstart", function () {
            jQuery(c.m).find(".flowpaper_currPageNum").focus();
        }), jQuery(c.m).find(".flowpaper_txtSearch").bind("click touchstart", function () {
            jQuery(c.m).find(".flowpaper_txtSearch").focus();
            return z;
        }), jQuery(c.m).find(".flowpaper_bttnFullScreen, .flowpaper_bttnFullscreen").bind("click touchstart", function () {
            c.g.openFullScreen();
        }), jQuery(c.m).find(".flowpaper_bttnFind").bind("click touchstart", function () {
            c.searchText(jQuery(c.m).find(".flowpaper_txtSearch").val());
            jQuery(c.m).find(".flowpaper_bttnFind").focus();
            return z;
        }), jQuery(c.m).find(".flowpaper_bttnTextSelect").bind("click touchstart", function () {
            c.g.oa = "flowpaper_selected_default";
            jQuery(c.m).find(".flowpaper_bttnTextSelect").addClass("flowpaper_tbbutton_pressed");
            jQuery(c.m).find(".flowpaper_bttnHand").removeClass("flowpaper_tbbutton_pressed");
            c.g.setCurrentCursor("TextSelectorCursor");
        }), jQuery(c.m).find(".flowpaper_bttnHand").bind("click touchstart", function () {
            jQuery(c.m).find(".flowpaper_bttnHand").addClass("flowpaper_tbbutton_pressed");
            jQuery(c.m).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_pressed");
            c.g.setCurrentCursor("ArrowCursor");
        }), jQuery(c.m).find(".flowpaper_bttnRotate").bind("click touchstart", function () {
            c.g.rotate();
        }));
        jQuery("#" + c.Oe).bind("keydown", function () {
            jQuery(this).focus();
        });
        jQuery(c.m).find(".flowpaper_currPageNum, .flowpaper_txtPageNumber").bind("keydown", function (e) {
            if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled")) {
                if ("13" != e.keyCode) {
                    return;
                }
                c.gotoPage(this);
            }
            return z;
        });
        c.g.A.find(".flowpaper_txtSearch").bind("keydown", function (e) {
            if ("13" == e.keyCode) {
                return c.searchText(c.g.A.find(".flowpaper_txtSearch").val()), z;
            }
        });
        jQuery(c.m).bind("onZoomFactorChanged", function (e, f) {
            var n = Math.round(100 * (f.ad / c.g.document.MaxZoomSize) * c.g.document.MaxZoomSize) + "%";
            jQuery(c.m).find(".flowpaper_txtZoomFactor").val(n);
            c.ad != f.ad && (c.ad = f.ad, jQuery(c.g).trigger("onScaleChanged", f.ad));
        });
        jQuery(c.r).bind("onDocumentLoaded", function (e, f) {
            2 > f ? jQuery(c.m).find(".flowpaper_bttnTwoPage").addClass("flowpaper_tbbutton_disabled") : jQuery(c.m).find(".flowpaper_bttnTwoPage").removeClass("flowpaper_tbbutton_disabled");
        });
        jQuery(c.m).bind("onCursorChanged", function (e, f) {
            "TextSelectorCursor" == f && (jQuery(c.m).find(".flowpaper_bttnTextSelect").addClass("flowpaper_tbbutton_pressed"), jQuery(c.m).find(".flowpaper_bttnHand").removeClass("flowpaper_tbbutton_pressed"));
            "ArrowCursor" == f && (jQuery(c.m).find(".flowpaper_bttnHand").addClass("flowpaper_tbbutton_pressed"), jQuery(c.m).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_pressed"));
        });
        jQuery(c.m).bind("onFitModeChanged", function (e, f) {
            jQuery(".flowpaper_fitmode").each(function () {
                jQuery(this).removeClass("flowpaper_tbbutton_pressed");
            });
            "FitHeight" == f && jQuery(c.m).find(".flowpaper_bttnFitHeight").addClass("flowpaper_tbbutton_pressed");
            "FitWidth" == f && jQuery(c.m).find(".flowpaper_bttnFitWidth").addClass("flowpaper_tbbutton_pressed");
        });
        jQuery(c.m).bind("onProgressChanged", function (e, f) {
            jQuery("#lblPercent").html(100 * f);
            1 == f && jQuery(c.m).find(".flowpaper_bttnPercent").hide();
        });
        jQuery(c.m).bind("onViewModeChanged", function (e, f) {
            jQuery(c.r).trigger("onViewModeChanged", f);
            jQuery(".flowpaper_viewmode").each(function () {
                jQuery(this).removeClass("flowpaper_tbbutton_pressed");
            });
            if ("Portrait" == c.g.j || "SinglePage" == c.g.j) {
                jQuery(c.m).find(".flowpaper_bttnSinglePage").addClass("flowpaper_tbbutton_pressed"), jQuery(c.m).find(".flowpaper_bttnFitWidth").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnFitHeight").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnPrevPage").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnPrevNext").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_zoomSlider").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_txtZoomFactor").removeClass("flowpaper_tbbutton_disabled"), c.g.toolbar && c.g.toolbar.Eb && c.g.toolbar.Eb.enable();
            }
            if ("TwoPage" == c.g.j || "BookView" == c.g.j || c.g.j == ea) {
                jQuery(c.m).find(".flowpaper_bttnBookView").addClass("flowpaper_tbbutton_pressed"), jQuery(c.m).find(".flowpaper_bttnTwoPage").addClass("flowpaper_tbbutton_pressed"), jQuery(c.m).find(".flowpaper_bttnFitWidth").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnFitHeight").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnPrevPage").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnPrevNext").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_disabled"), eb.platform.touchdevice && (jQuery(c.m).find(".flowpaper_zoomSlider").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_txtZoomFactor").addClass("flowpaper_tbbutton_disabled"), c.g.toolbar.Eb && c.g.toolbar.Eb.disable()), !eb.platform.touchdevice && !eb.browser.msie && (jQuery(c.m).find(".flowpaper_zoomSlider").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_txtZoomFactor").removeClass("flowpaper_tbbutton_disabled"), c.g.toolbar.Eb && c.g.toolbar.Eb.enable());
            }
            "ThumbView" == c.g.j && (jQuery(c.m).find(".flowpaper_bttnThumbView").addClass("flowpaper_tbbutton_pressed"), jQuery(c.m).find(".flowpaper_bttnFitWidth").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnFitHeight").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnPrevPage").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnPrevNext").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_bttnTextSelect").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_zoomSlider").addClass("flowpaper_tbbutton_disabled"), jQuery(c.m).find(".flowpaper_txtZoomFactor").addClass("flowpaper_tbbutton_disabled"), c.g.toolbar && c.g.toolbar.Eb && c.g.toolbar.Eb.disable());
        });
        jQuery(c.m).bind("onFullscreenChanged", function (e, f) {
            f ? jQuery(c.m).find(".flowpaper_bttnFullscreen").addClass("flowpaper_tbbutton_disabled") : jQuery(c.m).find(".flowpaper_bttnFullscreen").removeClass("flowpaper_tbbutton_disabled");
        });
        jQuery(c.m).bind("onScaleChanged", function (e, f) {
            jQuery(c.r).trigger("onScaleChanged", f);
            c.Eb && c.Eb.setValue(f, r);
        });
        jQuery("#" + c.Pe).bind("click touchstart", function (e) {
            jQuery.smodal.close();
            e.stopImmediatePropagation();
            c.g.fh = s;
            return z;
        });
        jQuery("#" + c.Yf).bind("click touchstart", function () {
            var e = "";
            jQuery("#" + c.Vf).is(":checked") && (c.g.printPaper("all"), e = "1-" + c.g.renderer.getNumPages());
            jQuery("#" + c.Wf).is(":checked") && (c.g.printPaper("current"), e = jQuery(c.m).find(".flowpaper_txtPageNumber").val());
            jQuery("#" + c.Xf).is(":checked") && (e = jQuery("#" + c.Oe).val(), c.g.printPaper(e));
            jQuery(this).html("Please wait");
            window.onPrintRenderingProgress = function (e) {
                jQuery("#" + c.Mg).html("Processing page:" + e);
            };
            window.onPrintRenderingCompleted = function () {
                jQuery.smodal.close();
                c.g.fh = s;
                c.r.trigger("onDocumentPrinted", e);
            };
            return z;
        });
        c.Fk();
    };
    this.Di = function (c, e) {
        var g = this;
        if (0 != jQuery(g.m).find(".flowpaper_zoomSlider").length && g.Eb == s) {
            g = this;
            this.ld = c;
            this.kd = e;
            if (window.zine) {
                var f = {Sh: 0, ai: g.g.r.width() / 2, bi: g.g.r.height() / 2};
                g.Eb = new Slider(jQuery(g.m).find(".flowpaper_zoomSlider").get(0), {
                    callback: function (c) {
                        c * g.g.document.MaxZoomSize >= g.g.document.MinZoomSize && c <= g.g.document.MaxZoomSize ? g.g.Ea(g.g.document.MaxZoomSize * c, f) : c * g.g.document.MaxZoomSize < g.g.document.MinZoomSize ? g.g.Ea(g.g.document.MinZoomSize, f) : c > g.g.document.MaxZoomSize && g.g.Ea(g.g.document.MaxZoomSize, f);
                    }, animation_callback: function (c) {
                        c * g.g.document.MaxZoomSize >= g.g.document.MinZoomSize && c <= g.g.document.MaxZoomSize ? g.g.Ea(g.g.document.MaxZoomSize * c, f) : c * g.g.document.MaxZoomSize < g.g.document.MinZoomSize ? g.g.Ea(g.g.document.MinZoomSize, f) : c > g.g.document.MaxZoomSize && g.g.Ea(g.g.document.MaxZoomSize, f);
                    }, snapping: z
                });
            } else {
                jQuery(g.m).find(".flowpaper_zoomSlider > *").bind("mousedown", function () {
                    jQuery(g.m).find(".flowpaper_bttnFitWidth").removeClass("flowpaper_tbbutton_pressed");
                    jQuery(g.m).find(".flowpaper_bttnFitHeight").removeClass("flowpaper_tbbutton_pressed");
                }), g.Eb = new Slider(jQuery(g.m).find(".flowpaper_zoomSlider").get(0), {
                    callback: function (c) {
                        jQuery(g.m).find(".flowpaper_bttnFitWidth, .flowpaper_bttnFitHeight").hasClass("flowpaper_tbbutton_pressed") && "up" === g.g.nf || (c * g.g.document.MaxZoomSize >= g.ld && c <= g.kd ? g.g.Ea(g.g.document.MaxZoomSize * c) : c * g.g.document.MaxZoomSize < g.ld ? g.g.Ea(g.ld) : c > g.kd && g.g.Ea(g.kd));
                    }, animation_callback: function (c) {
                        jQuery(g.m).find(".flowpaper_bttnFitWidth, .flowpaper_bttnFitHeight").hasClass("flowpaper_tbbutton_pressed") && "up" === g.g.nf || (c * g.g.document.MaxZoomSize >= g.ld && c <= g.kd ? g.g.Ea(g.g.document.MaxZoomSize * c) : c * g.g.document.MaxZoomSize < g.ld ? g.g.Ea(g.ld) : c > g.kd && g.g.Ea(g.kd));
                    }, snapping: z
                });
            }
            jQuery(g.m).find(".flowpaper_txtZoomFactor").bind("keypress", function (c) {
                if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled") && 13 == c.keyCode) {
                    try {
                        var e = {Sh: 0, ai: g.g.r.width() / 2, bi: g.g.r.height() / 2},
                            d = jQuery(g.m).find(".flowpaper_txtZoomFactor").val().replace("%", "") / 100;
                        g.g.Zoom(d, e);
                    } catch (f) {
                    }
                    return z;
                }
            });
        }
    };
    this.Gk = function (c) {
        jQuery(c).val() > this.document.numPages && jQuery(c).val(this.document.numPages);
        (1 > jQuery(c).val() || isNaN(jQuery(c).val())) && jQuery(c).val(1);
    };
    this.Dk = function (c) {
        this.document.RTLMode ? (c = this.be.getTotalPages() - c + 1, 1 > c && (c = 1), this.g.j == V ? "1" == c ? jQuery(this.m).find(".flowpaper_txtPageNumber").val("1-2") : parseInt(c) <= this.document.numPages && 0 == this.document.numPages % 2 || parseInt(c) < this.document.numPages && 0 != this.document.numPages % 2 ? jQuery(this.m).find(".flowpaper_txtPageNumber").val(c + 1 + "-" + c) : jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.document.numPages) : this.g.j == T || this.g.j == ea ? "1" == c && !eb.platform.iphone ? jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(1, "1")) : parseInt(c) + 1 <= this.document.numPages && (!this.g.u || !this.g.u.Bc) ? (0 != parseInt(c) % 2 && 1 < parseInt(c) && (c -= 1), jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(c, 1 < parseInt(c) ? c + 1 + "-" + c : c))) : jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(c, c)) : "0" != c && jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(c, c))) : this.g.j == V ? "1" == c ? jQuery(this.m).find(".flowpaper_txtPageNumber").val("1-2") : parseInt(c) <= this.document.numPages && 0 == this.document.numPages % 2 || parseInt(c) < this.document.numPages && 0 != this.document.numPages % 2 ? jQuery(this.m).find(".flowpaper_txtPageNumber").val(c + "-" + (c + 1)) : jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.document.numPages) : this.g.j == T || this.g.j == ea ? "1" == c && !eb.platform.iphone ? jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(1, "1")) : parseInt(c) + 1 <= this.document.numPages && (!this.g.u || !this.g.u.Bc) ? (0 != parseInt(c) % 2 && 1 < parseInt(c) && (c -= 1), jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(c, 1 < parseInt(c) ? c + "-" + (c + 1) : c))) : jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(c, c)) : "0" != c && jQuery(this.m).find(".flowpaper_txtPageNumber").val(this.nc(c, c));
    };
    this.ek = function (c) {
        if (this.g.labels) {
            for (var e = this.g.labels.children(), g = 0; g < e.length; g++) {
                if (e[g].getAttribute("title") == c) {
                    return parseInt(e[g].getAttribute("pageNumber"));
                }
            }
        }
        return s;
    };
    this.nc = function (c, e, g) {
        0 == c && (c = 1);
        if (this.g.labels) {
            var f = this.g.labels.children();
            if (f.length > parseInt(c) - 1) {
                if (e = f[parseInt(c - 1)].getAttribute("title"), isNaN(e)) {
                    e = sa(f[parseInt(c) - 1].getAttribute("title"));
                } else {
                    if (this.g.j == ea && 1 < parseInt(e) && parseInt(e) + 1 <= this.document.numPages && (!this.g.u || !this.g.u.Bc) && !g) {
                        0 != parseInt(e) % 2 && (e = parseInt(e) - 1), e = e + "-" + (parseInt(e) + 1);
                    }
                }
            }
        }
        return e;
    };
    this.Fk = function () {
        this.Cd ? jQuery(this.Cd.an).find(".flowpaper_lblTotalPages").html(" / " + this.document.numPages) : jQuery(this.m).find(".flowpaper_lblTotalPages").html(" / " + this.document.numPages);
    };
    this.gotoPage = function (c) {
        var e = this.ek(jQuery(c).val());
        e ? this.g.gotoPage(e) : 0 <= jQuery(c).val().indexOf("-") && this.g.j == V ? (c = jQuery(c).val().split("-"), !isNaN(c[0]) && !isNaN(c[1]) && (0 == parseInt(c[0]) % 2 ? this.g.gotoPage(parseInt(c[0]) - 1) : this.g.gotoPage(parseInt(c[0])))) : isNaN(jQuery(c).val()) || (this.Gk(c), this.g.gotoPage(jQuery(c).val()));
    };
    this.searchText = function (c) {
        this.g.searchText(c);
    };
}

window.addCSSRule = function (f, c, d) {
    for (var e = s, g = 0; g < document.styleSheets.length; g++) {
        try {
            var m = document.styleSheets[g], n = m.cssRules || m.rules, l = f.toLowerCase();
            if (n != s) {
                e == s && (e = document.styleSheets[g]);
                for (var q = 0, h = n.length; q < h; q++) {
                    if (n[q].selectorText && n[q].selectorText.toLowerCase() == l) {
                        if (d != s) {
                            n[q].style[c] = d;
                            return;
                        }
                        m.deleteRule ? m.deleteRule(q) : m.removeRule ? m.removeRule(q) : n[q].style.cssText = "";
                    }
                }
            }
        } catch (A) {
        }
    }
    m = e || {};
    m.insertRule ? (n = m.cssRules || m.rules, m.insertRule(f + "{ " + c + ":" + d + "; }", n.length)) : m.addRule && m.addRule(f, c + ":" + d + ";", 0);
};
window.FlowPaper_Resources = function (f) {
    this.g = f;
    this.J = {};
    this.J.Pk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gEEFCsCTiK85wAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAADUSURBVCjPY2AYBViBPkEVjMgctbkfvzIw/mbd2ZCs8CzqG6Mzk0LfpHuM/7HqFP3Ptldzhd7WFhH5JMavLB3y/xn+e0XisEbsP0cOhKWQxPyKgYGBgfEJWwNCnglZMRMDV5TsHN9lDAxMDEzszC7mi/9L+39AyLOgeuAXq6oFJxsDAyPDf+5/M27+dOldPQGHM6T+8+YwMDAwHGFQSWJ/hSmP5gwWRgYGBgYbBmashqGINihY7Nj7kIGBgaGO3ebrnr14gnwpAwMDA8M8OH/+aDrFCwBelDJZ0XbhRgAAAABJRU5ErkJggg%3D%3D";
    this.J.ki = "data:image/gif;base64,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%3D%3D";
    this.J.fi = "data:image/gif;base64,R0lGODlhDwAPAOMGAPHx8f39/f7+/ujo6N3d3fr5+f///52dnf///////////////////////////////yH5BAEKAAgALAAAAAAPAA8AAARCEMlJ6zw4Y3uE+Z93VMdgnuZIHUTrtiqizbMcGp4HGuNR/MDgrwegaYqyVA5UGvRguB2L0MvodJrVzhCIrYyWsCUCADs%3D";
    this.J.Oh = "data:image/gif;base64,R0lGODlhAwAVAIABAJmZmf///yH5BAEKAAEALAAAAAADABUAAAINRBynaaje0pORrWnhKQA7";
    this.J.ji = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAPgALAAAAAAPAA8AAAitAHEJFJgLmMFgwoQNI6aQ3b+HECM+FKbMocR//vrpy3cv1zGHqUKKFHmvXi1iFjH248dvnz579OTFEgZy5MiYroCBg5iRpUuY8lL9AnfP5khz5UzpIgpzXjx48N61Q4d0VC2il7Jq1Yr0Uyx295o+jToV6SZY7OptXTsu3KVW7OTJg+eO3bp16tCJC/eNkiN2ec2RGwcO3Ddv2bBZ+1Oo0SNGiiJLRmTJkaJDAQEAOw%3D%3D";
    this.J.oi = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAP4ALAAAAAAPAA8AAAjCAHEJFAgMGK5gwhIOIyZsGLt/ECEOixhRmLKHFJX968dPX757uY49TEXy37F/JFPdq1eLGMaN/4j982iPnrxYwkaWFIaSpE1XwMBF7PcP2Mx8NeWl+gXuXsp7v5ySNFfOlK6mNePd03Wv3Tp0VEfVanqp7L1a98peovopFrt7We/F6vqV6iZY7OqprQdLb9lx4S61YidPHjzCreSBFRfuGyVH7NSBHQfO0Tdv3LJhs/anUKNHjBSJLqQIESNLjhQdCggAOw%3D%3D";
    this.J.mi = "data:image/gif;base64,R0lGODlhDwAPAMZLAGZmZmxsbHl5eX5+foSEhIWFhYaGhoiIiImJiYqKiouLi4yMjI2NjY6OjpCQkJKSkpOTk5SUlJaWlqKioqenp6qqqqurq62trbCwsLGxsbW1tbi4uLm5ubq6ur29vcDAwMHBwcLCwsPDw8TExMfHx8rKyszMzNDQ0NbW1tnZ2dvb29zc3N7e3t/f3+Dg4OHh4ePj4+Tk5OXl5ebm5ujo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAAPAA8AAAepgBuCghwfHyAhiSEjISI4S5CRkpAhJzgCAAJLmAJJnEMflgAmAEujAEinQR4lOAEAAUqvAUazPhwkj5FHRURDQb1BGiOXmUqcQJw+GR04p0OnPac1ExiusD+zObMyEhc4Q0JAPz08Ozk3NjQyERXFAj+cOZwyDxbOpDynN6cvDhTXAuiYRWNWiwUNcKibEQOGixYsVqhIgWIAAQUMEhzYuNEAAggRDhQIBAA7";
    this.J.di = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAOAALAAAAAAPAA8AAAjRAHEJFJgLWDBhCIUNI6bwn8OHEB8KUxbxn79+/Pbpy3cv17GI/vhlzIfvXr1axCBe1MjRHj15sYT9gyemmEiS9+Z9cfbOFTB4Zr4Uc0cP3zx05IIKS/ULzJcvYMCssmct6lMwpnTRm7Pznr158eC1MyOm2aha8vK1GVaPXth26cBQO/cpFjyv9MC+a7dOHTpz5TbBgtdWHrx37NalO1duXLhLreDJM+yOnV9z5MSF+0bJkeW/5MZ988ZtWzZs1v4UavSIkaLXihAxqmTJkaJDAQEAOw%3D%3D";
    this.J.ci = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKANUALAAAAAAPAA8AAAjXAHEJxJULGLBgwhIKG0Zs4b+HEMHIg/hQGDSK/+h8MQPPXz9++4BdhOjmi0kx/EDm66WMIjJpYIwR26cv371cxyj68wfm3b58+O7Vq0UMokd+YObZtEdPXixd+37es1dvXjx47tqxSycKVr168uC9cwcmXbpz5caFs9RKXlh37NaB4WaOnLhw3yipihcP7jl0YK7dBeetm6RV7tytUwfGzJcyX75546YN0il2W89FC2PyF7dt2rAxcqROXd1xxsDc0rYtGzZrfggtaoSodm1DiSZRYoSoUEAAOw%3D%3D";
    this.J.Wh = "data:image/gif;base64,R0lGODlhEQAOAMIGAGZmZm9vb4eHh4yMjLKyssrKyv///////yH5BAEKAAcALAAAAAARAA4AAAMweLrcDDDK+MK4GMM33Npf5x2gAoheSaKOeo4kwMHuZMvfPXlE7xOwgmBIFBRgSEUCADs%3D";
    this.J.Kh = "data:image/gif;base64,R0lGODlhDwAPAMZsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra////////////////////////////////////////////////////////////////////////////////yH5BAEHAH8ALAAAAAAPAA8AAAcrgH+Cg4SFhoNrh4ZriYqIjI6CjJCOk5SHlpeYlpF/nJ2TnZKNoqSip6iKgQA7";
    this.J.Mh = "data:image/gif;base64,R0lGODlhDwAPAMZsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra////////////////////////////////////////////////////////////////////////////////yH5BAEHAH8ALAAAAAAPAA8AAAcqgH+Cg4SFhWuGiX9riIqEjI2Oi5CSk5SOkJeJmZGbmoqfoJ2YlaWmp4SBADs%3D";
    this.J.li = "data:image/gif;base64,R0lGODlhEAAPAIABAGtrawAAACH5BAEKAAEALAAAAAAQAA8AAAIkjI+pi+DhgJGMnrfsxEnDqHgRN3WjJp5Wel6mVzbsR8HMjScFADs%3D";
    this.J.$h = "data:image/gif;base64,R0lGODlhEAAPAIQYADk5OUJCQk1NTVVVVV9fX2ZmZuHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O7u7u/v7/Dw8PLy8vT09PX19QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEKAB8ALAAAAAAQAA8AAAVa4CeOZGmORXGSaTFJ6VpUVBFBxRKXc33nhYOKZam4YI6CYoiiSW4PnRCVKlJeEQdjKSpcak7oIjH9zC5WLGSLYM7CkEeDbGCaC5RnfF7mXfUMdix6cgmCKyYhADs%3D";
    this.J.Th = "data:image/gif;base64,R0lGODlhDwAPAMZBAOzs7GBgYEpKSj8/Qz09QUhISEtLSxkZGff39y8vLxYVG2dnaKKiooiIiG1tbczMzJCPk05OTt3c4dzc3B0dHY+PjzQ1NU1MT5mZmTY1Oy0tLfj4+NjX1u/v7z09PdLS0uvq6pmZltXV1k1MTiEhIe7u8OPj5O3t7c3Nzfb29ezr7pWVmdfX1/v7++nn6dXV1YyMjcbGxklJSdLR09LR0uPj44+PklNTVPLy8vn499TU1pKSkn5+fujo6CIhJtrZ2wAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAPAA8AAAdngH+Cg4SFhC40LIaFPxYJBxWLgjoEMEEoMjuLPRk2QUEAMR4MhjMKKkEtOA88EYYiPhKfNR0BDosrAyZBCBgUL5IQGg0BJEACJ5IhNwsTBccbkoMpF0AGINKCJSNAHNmCAB853+TSgQA7";
    this.J.hi = "data:image/gif;base64,R0lGODlhEQAQAOcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEHAP8ALAAAAAARABAAAAjcAP8JHDhQmcGDBgkC+6FH4LJs4Lp1A5dt2UBgSqIMRPZtHTp0674hG6hH48Bi2s6NG3dOWzGBQ5gMGfJEoLGUK1saG8jFSZCBwbCRCxeOHLZgBNsQ/GWNHDhw5Kz9IkjVV9Nv36L2cuRoESJEgv786dMHT5063cJJy9Uo2rZp06A9e2bQ2S+0atmCk1euHDly4rhxG9esTrhz1Ww14rbuqTdv3KxZ65asjjRqyGgtbgzuceTJyezQGq15b9+/gQc7s0OwkTRucOXSVWaX9UCuir4G8uOHDx+zdQgGBAA7";
    this.J.gi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAZMw/s7MUAAAPsSURBVEjHvVffTyJXFP4Ogq4D4ccMlAimqxiXl5I0G6P/wJZmq131tfvcTbr/QbP/zbbvW7fafehu9RXTNiHUiE9gJQQVVkdWhDhzTx/44cAMA+xqTzK5cOfm3O9+5zvn3CEYLJvNcrVaRa1WgxACd2UulwterxeKokCSJAQCAQIAai9IpVI8Pj4OWZYxNTWFu7ZcLodisYhoNIpgMAhZlskJANvb2+zz+RCbm+MWQDYC7WPcGsnmP/WMnfezsRhkWUY2mwVz8xVls1lWVRXxeBxutwc9QPqBGwbsMMZnZ+/p4OAAsdkYnKqqIhqNYlKSWLCw3WxzcxO/vHqFYYGsra9jZWXFkpm2+fx+DoVCVHlfgaPRaCAYDjMTYdDzUUcfwu/M3ByrqgqnruuA6HtS6hp5VCQw+iYb/9A0DU4AoLaCzPoYRdDWp2EeBLfj19mkUvRmCFtkycjUMAQbfPdjpUNEE8wNOCsWOuLj0XkhHkxoNzOGXSyY+cQsZthmk4kZiKGAQ7vWRsKhXWsDfHdbSzNsCtPFxQXevPmN/slksLi4RN8+eYKJexMjgZm4NwEmpl9fv8buboq+SCTw+PE38Hq9/cPEbIb/808vkU6nAQBHhSMwCySTSSwsLGBsbGxg7HRdhyzLYBY4Khzh5OQEf7x7h0q5jB+eP+/PDJhMmkmn051JoQt8qF7C6XTC7wu0wdv2JiIH168apGkaC110fKXTaeN+VtnEdtmEvb09vHjxo7WQ+s91it11j9a4Oy+7w0Q22UREEEJHo6F/UkckopvuzDbZxMRWFbc5wYzbMKMfi4QxCrhvO7gTMwBji6JHNEAPt4yGLPdyDirzxljflmbYrujZdG0wM2ZmZvHVo0cAEcYcDojmelsGHUTQhQCY8fvbt8jnc1ad3Kprm7NJURSqVCoAgIAcwJcPH370HfjPv/+iNhhFUXrKjLnOmE753dOn2NjYwL+Hh02KwdhNpbC1tQW3JBHMNz/DkRiXtRotLy9jcWmJqLX28/v3sbq62lvXOp8vTpfLhdPjYwRDn3V5fvAgjmffP8OHy0tIkgQWjFKphEq5jMqQOimVSmDBWFtbRzL5NTxuN3x+P1h0q+Ywn4PX6wVlMhmu1+sIhUII+BXTFcxUeCw+E/rFys5He81p+RiFQgHz8/NwJBIJqtfrOD8/x9l5BUzMzaLEYGI2ju2nvYbBzXJKDG49aM1x72h4h9bvk9MSisUiIpEIotHoTeB3dnbY4/FgcnIS09PTDAaBDIcyXtmo6zpGXXPG/20fN2OHxPxhHqqqIhwOIx6Pk6no7O/vc7VaxdXV1f/yrR0MBhGJRDoY/gMkxwIzT9ZCwQAAAABJRU5ErkJggg%3D%3D";
    this.J.Ph = "data:image/gif;base64,R0lGODlhBgAqAKEBAJmZmf///////////yH+GkNyZWF0ZWQgd2l0aCBHSU1QIG9uIGEgTWFjACH5BAEKAAIALAAAAAAGACoAAAIkBBJmuOjPTlIR2hlbu05TzHWSMkohSFYn+m2h561svMKlbEcFADs%3D";
    this.J.ii = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAYCdD7BDYAAAMVSURBVEjHvVfdSuNQEP6mJEJjaG2aUtsorC3SKxHfwYfwB8HFfYPFB/ERll3cl7AoiBfe2gXjjbogZV1XbShoLWlmL5rEY9qkUVMHhsn5yZw53/yccwgCmabJ7XYbDw8PcBwH4yJZlpHJZJDP56EoCnK5HAEAeROOj495YmICmqahVCph3HRxcYFmswnDMKDrOjRNIwkA9vf3OZvNolKtsmsgi4aGELuSItoUkP74XKUCTdNgmiaY+0NkmiZbloVarYbJSRUBQ8KMi2NsHOL7+zs6OztDZa4CybIsGIaBtKKww87Qxb5sbQUXHjCEiPwdLi8vY2V1NRIZj7JTU1woFOj27happ6cn6MUiMxHCONYWmSHLMr5ub2Nvbw8/d3cpSqfIn6pVtiwLUq/XA5xQyF/lCkVRoCoKNE1DvV4HAKysrlOELr/Ptm2kAICY2WUI0v+OS91uF5IkYXFxEQBQr9fx4/s3CPqC7K8FABIAMDnBDBkWxCPJtm1Ml6axtr7GqqrSyckJDg8PYds2Nj9vcggqfiyl+i3ymAISDIrtql6vh1+NX2AQLS0tYWNjA7Ozszg6OvJ0iiyuST4yYEQgE99NjuNgZ2fHzy5ZlmHbtqeGQ2LH7+8bE1n531ZOmBndblewdPQ/bsywuHJSBe2lccQjM7ZvDDtjP4virOHGDEVlU2LQxIqZ59gao5sQ000UmU3JEMXNJiG4Ig+1ZLw0gAoHApg5xE2JIcQ81E084KbA0UzvLjLDoRlZxKTX1dj3BHDMokcf4KaQ03/QTQKCY8smJsSuM4lcrt5QZ0h8vqRkWcbN9TXY4VBOxJgI/Zfn58hkMqBGo8GdTgeFQgG5qfyAM4OFB0OeCWHvlSgd3pybf9e4urrC/Pw8UgsLC9TpdNBqtXDfuoV7/3SBZRalx94cBvfLNzHYZbh9HJTCGNzvvzd/0Gw2US6XYRjGc305ODhgVVWRTqcxMzPDYBBI2BQLgNCL6xi96BPbno5n6YN4+fsSlmWhWCyiVqvRQICenp5yu93G4+Pjh7y1dV1HuVz2bfgP5BfYXgA24coAAAAASUVORK5CYII%3D";
    this.J.pi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAUJ6CYRvUAAAPBSURBVEjHxZfNThtXFMd/Z/wh4VAbPKYIG1mNkeUVUkpC+gY067as0k0CPEfUXdRnaHbNl8kD2Nl4JFasmqgLjJIIwsJqQsGMLAEGz5wu7DFjYzupXZorXZ25H+fec8/5/8+9I/hKuVzWWq3G8fExrutyVSUUChGNRjFNk0gkwuTkpACIN2Fzc1PD4TDxeJyZmRmuuuzs7FCpVEilUiQSCeLxuAQBSqWSxmIxMnNz2jJQ/Yb2KdqSMqAtXbI9fj2TIR6PUy6XUW0OSblcVtu2yeVyXLs2Tpch/Yz7HGM/p2i1eijb29tkrmcI2rZNKpViLBJRV5s4cV1XDcMQgPX1dYqFQjOmIt4pOgz57dEjVldWLu3km8/3d+6wvLysgLiui2EYAMQmJnRqakoODg8w6vU6ielpVRFUBEcVCQRQEfL5vBQLBbLZLOFwuL3wpeNJbyepKuFwmGw2S7FQIJ/Pi4oggQCOKt6e38zNqW3bGI7jgIt41cAQXOTF8zwvi0VM0+Te/VUikUh/Zw8gXiQS4d79VUzT5GWxyIvneXDBwOjYt9FoYACIqrYqoqrPnj6hWCwAsLBwk1AgoPV6ve+G0sdjAPV6nVAgwMLCTQCKxQLPnj7B26slAQg23dw+mj7+/bFsbGyQyWS48e0NXVpaIhAI0Gg0+qNQ3L6AbjQaTMRj+uNPP/BVdJxXf7wSyyrhOA3u/ny3g4VGsyVeFcuySKfTrKytsbh4m/rZubx5+w7HcQZwXPoyy3Ec3rx9J/Wzc1m8/Z2srK2RTqexLKu9p6cf7MgQLcru7e3xy4MHnJ+fSy/29M04veDkuvz68GGbXaFQ6OJg2pmfgr0A6DjOQE/8GwB3s+vs7KyvXgsz7aMNlch8+sPoSacxOtqlOKx+t14LMzJamtchb4amXidmlBHDxJBhokeYREe7AIeEjKfX5RlR+TRJrwTA/qeFB2DVkcKkQxrTVJRuAI/2NhkewHI5z4z6QvqP9ILerT1KmGTIMEmvMPm8PBSbRkszF2ySUqmkC7du8aXLn69fEwyFQux/+EBi6usvZsj73R2i0ShGLBajWq1yVD1EVNqVHhJfW7r6e7UHreH1/b3/kWq1immaGPPz83J6esrR0RHVowNa789mshZVv/SqN0fRZhoVRVuVVp92S98Yre+P+39RqVRIJpOkUqkLnluWpePj44yNjTE7O6sogvj+m9QHbOl4jklHn7/trXEh24zdfb+LbdtMT0+Ty+XkEpW3tra0VqtxcnLyv/xrJxIJkslk24Z/AJjcAKCwx1DkAAAAAElFTkSuQmCC";
    this.J.ni = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAWLXJ7zWkAAAL7SURBVEjHzVdRTxpBEP7G3JGABOTuCJHzoUIMT77VtOkP8keYCpEafoR/5nxqJPbNB88XtYkhtRblQgKY6E0fuDsW2Fs51KaTbJa9b3Z3dma+2YUgiOu63O/3MRgM4Ps+3kt0XUcul4NpmshkMigUCgQAFCq0221OpVIwDAPr6+t4b7m6ukKn04Ft27AsC4ZhkAYAjuNwPp9HpVrlwEAWDY0RDnpSjGmmj/DNSgWGYcB1XTCPIXJdlz3PQ61Ww+pqFjOGxBm3iLGLCD883NPFxQUqmxVonufBtm2kMxn22U+y2as8E0p+bY2LxSJ177vQHh8fYZVKzJLdDup1AoBut0sAYJomAKDRbIoYAowEDAAowCiYR41mU7YNPlSrfHpyQtrz8zPgJ3S5St9PNC8aPz09QQMAYhZdGIUoPPXu7i4A4OjoCKF+6C0JpponC3VkkAYATP5sHihzRtBPirHEK5EjxsZM9p3yTCqVmjpZOGbQspjsgNOeASORZ8AqjrGKf7J1I8+Q4zj8+dMXjrFYVWfwBtSO1jlpfw/CRCwN07fmgZTa+/WGiE1RO8Ck1N6vN/BimJiTXYoq/WUxIWdImjNxFAUTlsSUOaNN8mo+TOo8XAp7mU0Uw6Y4ihLH0/4FbAHPEMsYoCherCiIjATY1F7kOA5/3NnhmDC9+xMiXOfH6WmUwCSLYat1KKX23t5XarUOMUPtEIMKi8uXCbWXOM5bY0IC/1e3drK7iUmV3EpsoTojXSL+9mVSYMp5cTmj6zpWdF3H3e0t2Oe5FnvCV2Cydn15iVwuBzo7O+PRaIRisYjCmjkXTFnhoQVf5ao1Qp27P7e4ubnB1tYWVra3t2k0GqHX6+Gh1wUT87g4MZiYxT5soQ6DxyWXGBw0BN94thcwBL9/3/1Cp9NBuVyGbduT+nJ8fMzZbBbpdBobGxsMBoGEQwnPweA7ID4Tw2/iOFxj0kdOvP55Dc/zUCqVUKvVaK7onJ+fc7/fx3A4/Cf/tS3LQrlcjmz4C6V4EUpXdwN6AAAAAElFTkSuQmCC";
    this.J.Vh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAWE7Ma0MIAAAM+SURBVEjHxVdNT9tAEH0TESQCSsBxGhFzKOGQE5eKHxbshL8Q2/yocOWIesCcgEtUSsGxIvEhgaeHeDfrzTpJW1FGenrrnTe7Y3u86yUoFkURTyYTPD09IU1TfJSVy2VUq1XU63VUKhXs7OwQAJAQnJ+f8/r6OizLwu7uLj7arq+vMRqN4DgObNuGZVm0BgDD4ZBrtRraBwecJchqogXGGdOCa9JY+vfbbViWhSiKwDx1URRFnCQJOp0ONje3oCVSlNwqya5iHMePdHV1hfZ+G2tJksBxHGxUKpxy+ieT/dOTEVbb3uZGo0EPjw8ovb6+wm42mYnwWfh6cMBJkqD0/v4OpCADYGAB8rpd0vop60dBLJnGEXh7e0MJAIiZM0BhFPTBc7vI4uYAAJ7bNfoMYDWuBABMqQBrrLfhesezopn6chA+1zs2+hWo4/MsGZAAaZxre66nVTCRDtXvuR6ZNIbxSSYDlmCNAWaAgZ7rmr4nFv4shnVJz3Xzfs7Nl4ubJpMuAqHnuebPPPPn9Abree6SOaDWDAuQxuj13eKFRtFl7cK1qdd3SdPPxU2T4dSIfs9buPCZYhZZv+cVzqXUDAmw4JN+f4XFXOpnj3eJnfT76ny5uBJytcUkOAhPl+cy04v20v0qCE/V+XJx2aInwSqHwenCO1X0or1QHwanqn4urqQU4lzxMjEFYbjkLeVR/ERCLiheGZcVsDRSWPTDDwI2F7DUibbxNflBgNmOI/VQ5lIXPbmFQmG1Tb4fmh7NPPRE/NCs0+eaFfBqGGgJmTSqDfxw5bGVAl591/YHgVLA5l0bAPxB8Le7tgRrbMTAn9aQpmOm6U0O/MA0FheMK+NoOBzyt6MjfLZ9v7jAWrlcxv3dHezGl09L5PbmGtVqFaVarYY4jjGOH0FMEjAwlGvS+k3Xi8YQfb/ufyKOY9TrdZQODw/p5eUF4/EY8fgBWSWLxZ5Vlj8gmYahLaNZHBSfZMWHrP3z/gdGoxFarRYcx5n9mZ2dnfHW1hY2Njawt7fHYBBIOWawcsQg5SsW/aJPvRZjzFgeVW5ub5AkCZrNJjqdDs2dYS4vL3kymeD5+fm/nLVt20ar1ZI5/AZC6tu9dBzKcQAAAABJRU5ErkJggg%3D%3D";
    this.J.ei = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAVHAiInpAAAAMSSURBVEjHzVfbTuJQFF2bUBOJcimMoPgwI4n8XmmJ8wXQwlz8JE184gvsEzjJjEaYDENINBrtnof2HA71lJtx4iGLda6rq7uHfShBKb7v83Q6xd3dHYIgwFsVwzCQzWZRLBaRyWRQKBQIAEhM6PV6vLW1BdM0sb+/j7cug8EA19fXqFarKJVKME2T0gBwdnbGuVwOR7UaRwZZNZpQOGJa0KYYy/FPR0cwTRO+74M5HEr5vs+ZTAaVSgUEIgJxxIjqKkNpk5jXsCyo7ehDGlbHkc8XuF6vYzgc4tfPX0y9Xo+r1So+7O1x7M5Jc3fxqMBuNGT/99NTXjUyqs6g36fHx0ekHh4eUCqXmYmwLlQjwtgmOh9rNZ5MJkg9Pz8DAUgDaFiAHMvS7inHspCwlnQ6Ak9PT0gBADFzBCiMhD44trVwZzu2BXX+AkhdAKEZpkCAYxyvw3YaK/10bach1iZB1eeZGZAAxXiu7tjOWrnEsR2K1uug6pM0A5bgGAPMAANN294ouTVtW9VWdDHfL80Ei0BoOja9Jts2HXvJNcJ56XDPsC63yPLl6zddnlnLIIOT5sv+0AwHeA8lHdqmeGZ987NJp5OOQrjwMS0L75I2JYzrH9Nsy7yHyBDrBOTCzycny6KwNDKdbjcpKjIUYdKbFVJY9MPrdPg1G9PrdDA7cRgKxLXUpCePUCis1snzupsZ8bpQ9OKYXWt2HKwGd01DrtddWVuaWefU9tzOahFxO5ue2hIcYy1cb/Eecr2OTosTdJkJ6qnNpAE0LD7U9jytkbbnIWEt6XQEDMNAyjAMjG5vwQGvjVbbnTPSarsb6Vz1+8hms0jlcjmMx2P8Hf8J//NHgIahtAVarTBC7ZY3N2+Zhuj7PRpiPB6jWCyGCeni4oJ3d3eRz+eRL5hh4hPfDJI8S1XqnJf5NOm9IlYfjW5xc3ODSqWC4+NjklLn5+e8s7OD7e1tHB4ezkwIyZdmhCjN9alt9UZIHoEEAFc/rjCZTFAul1Gv1+lFCr+8vOTpdIr7+/v/8q5dKpVwcHAgPfwDmoUpP5Jd2SsAAAAASUVORK5CYII%3D";
    this.J.qi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwEtNTlGiyEAAAOcSURBVEjHxZfNbttGEMd/Q0ty5MhULFF1LPkQy0B1MuDXiN+hybXIpS1a9yGaB2lO6SPYQHPxJTmazsXOoURiVaYIAZZUWJweRFKstKTktmkXWCx3ZjmcnfnPB4XUcF1XB4MBt7e3hGHI5xrFYhHbtqnX62xsbLC1tSUAEh84OzvTUqlErVZjZ2eHzz0uLy/xPI9Wq4XjONRqNSkAnJycaLVapb2/r5GCmlY0Y2i0Ss5e5taEv9duU6vVcF0X1SlLXNfVIAjodDo8fFhhTpEs5ZJ9GIaoKqqKiGBZFiKyqoHU92/k4uKC9l6bQhAEtFotyhsbGmq48LGllhFERBBEp0SV6Ka5lolH9dEjbTQa0rvpYY3HY5ztbVUR/q/5ZH9fgyCgMJlMIMy0gphuk2E1WfJu7jt3d3cUAGK7GvCxFDNv3vzK619eA3B4eMizr54nhyaTCWtra8tcncgtAKiE8xGihigxYsb76EkqT8WyFCBkgpUN5oUonCozU85kBclQSABsu5oQHMeJZQnAWqGYeROTqwpzdzdYRrNSiQKUSqVEWKm0Dqpp/tJoWrAM4UqKGzE4CAbJ82g0glD+dlaOMKN5bsrV0n3vJgTP+21e1rJoWnSTqtk06Wj48fh4WWgDcPzD90b6Ty9frmYZVIyY0RCw5N+pjDOT5WNGyXCTzHhP9vawbZv3FxfU63VK6+uMRyN832c4HCaSm80m6w8e8Md4TK/X48tOh7hMrOQmyYimNbES3ouvX5huw6tXP8vbd28BaDQafPvNdxgTpq4YTSpqyrggSFQ8Za4SJ2ce7zyGd1NipVJJA3jRU1Flz8phEYCzy4Gq5pYDUsJFhJmoxWhK8bLLASpZyUQkzqhq9nP3upsKbQ8TNMIwnPY5UxBmRmUhr/isMsrlcvK8ublprhuWtdI3/nHVXviw3utqpqqdV5vyO72nR0fy9Ogo2euKPXBenrl3cxXjwOT/yNBxBK7UXBWLRQrFYpHup084jS/uhRVB0DDfJbqiyz5cXWLbNla1WsX3ffr+DaKSTAwrqb3M0U37PBkx7ffuNb7vU6/XsQ4ODmQ0GtHv9/H7vWlvL5r0+ek1nvEZRafpWxSNJhFN59cUj+j5uvsRz/NoNpu0Wq1Zfjk9PdVKpUK5XGZ3d1fRqScS8KXawb9kHU3qmC7sYxmzNcHJ1YcrgiBge3ubTqcjC6A6Pz/XwWDAcDj8T/61Hceh2WwmOvwJjz3t/SbNLJ0AAAAASUVORK5CYII%3D";
    this.J.ri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwEuF8cLmQYAAALYSURBVEjHzVfNbtpAEP7G2CQQZCe2KYqdQwCpPuW9qtzTh2geCq55gpheSC6oSUqMhRSgCjs9+AcHvMbkp+lIq/Xs2rOz334zsyZkxPd9nk6neHp6ghACHyWapkHXdViWhXq9jqOjIwIASl64urriarUK0zRxfHyMj5bhcIjRaATXdWHbNkzTJBUAer0eG4aBTrfLsYOcdVQiHPdUoNNan863Ox2Ypgnf98EcTZHv+xyGITzPw8FBA2uOyJxLdSEEmBnMDCKCoiggorIAcRA80mAwQKfdgRqGIVzXRa1eZ8FiY7GtyBCIiEAgjgaZ4p0WIpOIcXjIzWaTxo9jKIvFAnarxUyEz2qn3S6HYQh1uVwCQooC5e1Gghpt+bbwm+fnZ6gAkOCaw4+tnHmjvLCjAgCTWI8QzokSWTTl7ZZLOLIRhZEzK+fyUJAZpxILYQenImQyS+Ugw7JUEitMBfrWaNpABgIlN7kLb3eXmDNcdExlj+I10bR5TMz50CyXS1QqFQDA94uLN23/x+VlOWTAlMsZFgCU94jgF/AXc4YhOSZazZ2229B1HT8HA1iWhereHhbzOYIgwGw2Sy07joO9/X38WSwwHo/x1fOQlIlSx0SSaKqQks6dfzuX5ZhyVZtLRhMT5xlAVP1YRk7e+aTiyi6zExP4XcrB1mhaLVNQDsBEWxLLm5KJECK650QklNpR8Rq8dxRSlFJr/I9Vu6g2fcwduCjPfPrlStM0qJqm4eHuDnbzCz5Lbm+G0HUdimEYCIIAk+ARxJQ25PTI6LQ2nqcX2UjGfj/cIwgCWJYF5ezsjObzOSaTCYLJOLrbE6f3/GyftOQdBkfpmxgcN8RjvN5n5hA/3z/8wmg0guM4cF13lV/6/T43Gg3UajWcnJwwGATKkC9zHYzHE/rRi7GsnthY9SlPbm5vEIYhWq0WPM+jDVJdX1/zdDrFbDb7J//atm3DcZzUh7/MEqJMe2pkgAAAAABJRU5ErkJggg%3D%3D";
    this.J.Xh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAUOVqXe5YAAAPASURBVEjHvVfLbttGFD1HpIxIMWRboqxY9EYKBMELbws4yKZ110m2ydIfEHQXoB9QIIsa7Q80u/Qn2trwKkaXTiE5BSoHMAQ/ZD0gwNRC4u2CIsXHkJILpwMIw+Ednrlz77kPEb7RbDZlOBzi9vYWtm3jS410Oo1cLodCoYBsNou1tTUCAN0Nx8fHsrS0hHw+j42NDXzp0Wq10G63YZomDMNAPp+nDgAHBweysrKC6uPHMlVQ/IrGDJnOTFgzNHvySrWKfD6PZrMJEUfEZrMpg8EA9XodDx8uI6RInHKLKLvIkF6vy9PTU1QrVeiDwQCmaSKTzYotHk/k70+f+Mu7d7zpdECSIgLSO//OiogICoaBvb091Go17/3K6qoUi0XedG/Ao6Mj+WpnR8Iff//mDa3RCJVKxQPzKRM4BIBSFv6u1Woh8+ABfnj7Nuxq/PnhA/XJZALY0Zt2u11sbW3h9evv7o20P/+0j0ajAcwC1Tt3PB5DBwC611Pwg47oXjlD77ggjg4AQjtsNgFA27YhtGVONEXOipPZtk0RcTEjUegoA0JpGRICxoEnWUYtI8EZZmSvHrpjwDIQACJxqWS6ECasg3lGpowQdb5ylEnK/DbnXJh3MJiLqX495Ywo3eT4VxZ1RdyaM946YR7CDBFY7DgXx8r+UxRxesEYTN1zs4ozQdl91CaSDGOGoynBTbhfNykwg25iTDQRRDxl7m4ZgiQjmCHLUFQAEHrk5qKJLbFYMhIUAZwpgdXlQNc0txAuUg7muknXNCeaksoBRJ0R+/0+Wv+0MJnYnEwmd0wms6FpGlKpFHq9vqOIqFsRPa7IfP3NLv74/Tfs7/84t09xbxvXRvhbjd3db2P9G1u1Xzx7jlKxKFdXV9R0PXANzTU3puUirIQIXEuKr0Uora9jZ+fJvKodjSZqKT55+jSOI6Jw2cI9sACJeYZxJd9/QCqVwng8xq/v3/Py4gKZTMZPRpKEZVkoPXqEl69eUdd1JYaKe+l0Gno6ncb15SWM4roiqwV1FNupuH99/AjLsmL50el0AHH2KzFC4/NZC7lcDjw5OZHRaIRisYi11UIkdkWRVLhg5kvCcPdcdy5xfn6OWq2G1Pb2NkejEfr9Pnr9GwhFnKQkEDrNhzu7P3ePQBwG0Elk7nfwybzZJ8P0+er6Au12G+VyGaZpzsLg8PBQlpeXkclksLm5KXAsHGiMfFfyFxAG3vnXLsZs9ox49vkMg8EApVIJ9XqdkaTTaDRkOBzCsqz/5b+2YRgol8ueDv8CmAsGVvaUUeAAAAAASUVORK5CYII%3D";
    this.J.Lh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAARF/s2ghwAAAMOSURBVEjHvVfRTuJAFD2XUBOQgJQSIvVhhRie/LbVAv7BSmE/Sl999sH6om5iyLouSkOimGjvPrSdDmVaCsadyc3pTKenZ+7cuZ0SpOI4Ds9mM7y8vMDzPHxV0TQN5XIZtVoNxWIR1WqVAIDCARcXF7y1tQVd17G7u4uvLre3txiPxzBNE4ZhQNd1ygPA2dkZVyoVtNptDgSyLDShcICU0qYYivv7rRZ0XYfjOGD2b5HjOOy6LjqdDra3S4gJSRKXRWyWws/PT3R9fY3Wfgs513VhmiYKxSJ7foWEacaxceyxx0dH3xHj4ITx8NhDZWeH6/U6Jk8T5N7e3mA0GsxE+KxZx8cEYO3nvrXb7Lou8h8fH4CX6HKKIRLa6FpHUZ+nfJZS+PH+/o48AFAYQcvxkSlmrO7x4hsE3eqYkXnyvlu9+A5hxS5R7qau1V2aMZOXRc3SLvTFROJUXqAEQdSzrASVtM5OW/SM9CqFZ1iZSnpda1UGSs0zqnyVlwJulXBx3etb6TPf8EsSxAynLdNC6fe6q6PS58uym5aXiTnbVE76/WxbhL3NPQOmtN3kCznprZHkaaOYyfktUSmGog5HP7NrUXORijfsB4Ccn6SEcQwXbDTMJiiBixN4fYWhGCZRISFUfcPRKFMAZzTBG4mJCkkY9ssIZoY9HHJ6ADMkDhlJ5pHeFS2T9AmFhEjoA5jItkfpAZzNIl7hmQ1tkCBoEy4pgIUPISES+hba9mCoCGDOaoJHCmBhHMM043DcwB6qVokVyEk80jIpYz0t78TH4dS2N8kzgkfTNOQ0TcPjwwPY40/bj9OBL2bN5+5ublAul0GXl5c8n89Rr9dR3aktHcFYcaChjP8raRzhmMe/D7i/v8fBwQFyh4eHNJ/PMZ1O8TydIIjkcPFYxtDCMYxYGg2eg3RPoHQPwfWfx98Yj8doNpswTTM6kZ2fn3OpVEKhUMDe3h6DQSBpUtJxMOgXx7qFPrkdckQonHj36w6u66LRaKDT6dDSF/Tq6opnsxleX1//y7+2YRhoNptCwz/m1JcKyxmy4QAAAABJRU5ErkJggg%3D%3D";
    this.J.Nh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAATL+ECWAAAAAMHSURBVEjHvVdRT+JAEP6GFBOQgJRyROrDCTE8+dvEAvcPTgr+KH312QfrE5oYcp6n0pAoJtq5B7btsm2BHnpDvsxud/djdmc6syVI4jgOT6dTvLy8wPM8fJVks1kUi0VUKhXk83mUy2UCAPInXFxc8NbWFnRdx+7uLr5aRqMRxuMxTNOEYRjQdZ00ADg7O+NSqYRGs8nCQJYNTRAWmpb0SdHB+H6jAV3X4TgOmOdD5DgOu66LVquF7e0CFEOSjFvH2HWEn5+f6Pr6Go39BjKu68I0TeTyefbmP0g6Ee32kTqPY/qqjvCWdna4Wq3i8ekRmbe3Nxi1GjMR0gAArONjSrsuDt+bTXZdF5mPjw/AA8UAMRpBX0in3YY0hxbmRHWUR+D9/R0ZACBmFoCkkfAM5Eecb5DVhjK+LgJeAHNjmDwfrGi1HUAVq3Osrl8FmZ9DY0A+SNFqO0CcdKyOvH4VZH4KjAEHYEUDzFhsc5gxYqRrWUlcvMi78J/hyShBpYCUtugvkW7HWsEZgzBm2AcpOhGrpNuzKIYzjpeYOHQTs5ca60iv20nFJ2KGfLCik7Gm/Oj1ZO443uCoNYgYkorYZ9UdAMBgeOrzJ3EGz7V50otU4k8xaDg49XdKMVU9Uv01EcBxVVpeSEm7ST6RIfNqf8r/JdwUpnf6jCuEPRiAmWnFhiI8mghgSth16pOx7eHSpLiMR5Odtqn07eFGXJpftTd1k90fzEtFyptexE1SmP3T29S3B+CUd+Dktyk56lfGzIltJ+WRdQKY5M8XLZvN4uH+Hkb1W2of/zzpg73NI+72ZoRisQi6vLzk2WyGarWK8k4l4kz1jBETPEnfK8s4/DkPf+5xd3eHg4MDZA4PD2k2m2EymeB58ghx/xTOm19efB1cQMQcBs/T90I1F31VS2MQ7d8PvzAej1Gv12GaZphfzs/PuVAoIJfLYW9vj8EgkLQp+XpHkAsILTyT+z5HqINDvLm9geu6qNVqaLVaFAmqq6srnk6neH19/S/f2oZhoF6vBzb8BbU1MGBi7Vj6AAAAAElFTkSuQmCC";
    this.J.Uh = "data:image/png;base64,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";
    this.jl = "data:image/png;base64,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";
    this.Ji = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAABUCAMAAAALdX1LAAAC8VBMVEUAAAAAAAADAgMAAAAAAAAAAAAAAAAIEhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADYPgDqYB4AAAD7YwAAAADgHQbas3DkYj/bLBP1bg5yVoHqRxDvYhntSQj9y07lwG34cBz2dALPPDPhViM5hqrhqKjXnaO7kpDix2bT02G+IVnFPFj00Wr3egL7nDrbDgDzaQDmNwH5di7yXgD7nDEAAAD7ewb4fAb9xy790VLVJBL5byr7jQD6liTjDgD6fADeGgndLgjYTQL8agD8pkDVdVrXNAL6eQHzcAD9y1L8hQ/3XADwSw790GTXFwD7ZADkYT/4QgDXQAH9xVPdKCveFAD7pUPwdgD6lzD5UgD6WgDYBwD5SQD5XALgFQD6kSj6kTLiWkDnJgDRVQ78fAT9zlv8sk/4TQDYNgfdXwDfDgD91G77WAD902vocADdCgD9yFf7SwD9zV7iWD/9ymL6mTbpXwD9x1HrdAH7nC/4ci79fAL5bQL7jSz8WgD6mjHdMgD5dzPlZUP9v0n9yTD6eA77mzHNRwz8qEblaUj7pUbDLljcpm6wbWzcgGA6f5Ldpm6wbWyGnWirt2fcgGBfPFb6oT/+NwD9z3L9z0TaTCfy0Wr9xy7fQT8AAAD5WAD9ylvlGQD9x1HaXwD9ewHtdwD5UgD9xknscgD7XQD9yDDjEwD90Wn7bwD9xljbAgD91Fr902z9w1X9wFD8ih3iDQD912b8r0/7qUj6aQHjAQD90HL911/9ylT6mjv8pjr6kCf+SwDcCwD6eQ76nkL6fxn3RQDeAQA6f5KGnWirt2f9zmFfPFb6dQTdpm6wbWzcgGD6ZgfqWgD9sjv7hAPZSwDxeQPdZADcJB3+VAD9vlr90U39zT35gi7dTwT6NQDKEAAyQGzRAAAAuHRSTlMAqxFg5xe6DDcfBYndL4N2skDxySnFR9CQ7H0I+m/XaVOc4sCXJWSgWE3+BaT+9l0S/k8/NiAYRjstXzAQCf7+/v7+/v7+4IWDelQp/v79y7aUZE4+/v787NGjlIpsUSz+7sl7dWQzHf3n2NPSyMTDqqOamIyHfXlrZV1X+fj28fDp49zX0r2ysa+tpJiSZT76+fTs5eLb2cvCvryxifHcz62TgG8w/v7+7+/v7+/v7+7q6ebk0ca199nq/QAAC9lJREFUaN7U1jEKwjAUxvF3ny4dU49hcXXp0KkXcKmLCKUIHkAHj6DgEBxDCbGFLE1O0CNYV99zcnf6/kPmX+DBe/RvSUnIZTkBl9wLAu5kloTb0iDz1RmZz3pgvroZYH5euxmWn7bBOTeD8vNdEP7LGMC1pZrAOfHPcHzVaGu14IP3L0VQla3WzO8HO3kuYPEP1+nLt/LoKYSMcCr349hpSX7QczXMwZxSuRuZ/6sftilhpE4p6zmZnqaygh+GKiGI8qNqO+45TjEWh6PYhU8QbR6Vcv4pdbHI6vjgmN8QQovVe733zJcKqmJkP9dfCKAPc/UamlQYx3H8p/Oo83LUedvO0unMmqQl2WZz635RNtON2MYCN1ZrEb1ZF4oiukCXF0UR3Ykgovu9F0FWiENQelNtBrmFta7rQntTEL3rec660OpFtAV+EfRwPPB5/pznHE8weGDvlgcPkkmi340lVM/Xux65X/mBYPDYhkzPLeJP7kTlPirn9feqkPsdCwY/BwKZzJNPD5Lbpy7b+ajrzp2uri6iPzgNFbn+7PE1BD/3rV+VefLkSffmhXuWJG918X24F6uHpx65XfWBhmBf34ZVGeo/tWfh/OSr7/pN5RUH25Hb+RoanvaR6VN+Z0vg+Ktk8s6QPtY+rTlWjqFYxfgyAXKvYw1Pn97rCwRCmcy1vZ0tW7pvJW8N6VdWNMfqMFR+kVSSZ0TO1dqQpfyj60OhzKlA4GRPT/enV7y+vqo5FqvBUEozkKcFrRh/SibDt4p/+yHDzyZUu91Cd7VE4na7q90kjCjfQDZL+E3t+0NH955oIfru7k9E3+bzHIzFmqeBb5y4wFlmofw8W1hvAiwlAJixSgCGEqGKKdTrBToA+Va91uYAHBapWqtnKVwn0OoLJcC4fLvVhClzr8y5Ouvi9POXLl+YN3PG7BsYQR0da6NpfvwnDodajgY6CZ/0NFFf1R4j+TCURi4yScsIX66w6BxmKyyiYsBykwVgY5lSm1ypkxcpITFalbpxBVKwZluZTqNXy2AvKtRJ1TYZ9HLjWAPhv5vzetbb6c9fvHxD+fMxglZ718Tj0ffZe01NTas27G/p7aH+w+s6vEeovg749eZRFtARMwUaWakUsKrFACOyM/wyMFYMhxkkgRyqm/SPEpEFAitIxjzYREpgVPkVWzsoPxpNEf/e/YHO3t6eLZ0bPEt3PH780TWwqQrfkyoklC9Xg2YdD6ecjFoZ1qHMCDu/KChFQqGQmO1GOTgtaIVOmYKioVIjLMco85fGO9byfFdqoL491BIi/O7Dh1Kp1GPSxwiG8wUsaCU2WLTQ6CEwwclCp2BAEip0kFrFYnUpC1YA2jgbU6DVk8xiaPNGm78j6q2JEz/ht3na6ldRft/7NOEnCH81MG0Y31kImkpMrAxXiDwBzFLYRTyfKWUcRZyUgVUOVg2aSSws1ShJdmb0+bWu+NJynp9I+f0xX9tgUy+v58e/CxWry4fxS8KgiVlAXaI2IF/r0Mpgv2kAyaCAmONPy8GJ8G0XmDX8ORX0o81fl+7fhRU8f3lNW51/cHBwIJ5wudLpdOrjani3RjCMLywtAWApygfKzHoJoDaygH2iXggUGzmorZQ6hiVbVwVAQzYFa5SAXjf601+c7l+BtTx/jX8g0hwbjCXekwPySaybsPbLLvzKD5Nvs4AbrzCAiMY4AcJUAjozq2c5rUAGqcjJOa0mkUOltgq4saVEXKwOs6xxPBD+xj9H+Gcp/8zI+LXpRH+/t2Ir4S+oaTsUGWxsTLzPJmhHPFUrvqyoxo8kUhkYJVXncSUMaNJ8eqiREb5ColRxBpDyTVwZWQXDOeHgTHbQDJxKA0DJX1Z8urVySmvrlCmtlZWnK0n41yb1k3bw49+1bsBf19joimaz6URieaR2jevj9Vr8ZfTJMyxWgP/domf3b3/p9+JIPFpzaNP6xsY0eYFlN+1YWhVZ7nK5vPhrftFvfLkY/7kJ2+4+e/bw/sbJtcsXR1J1fqJP1Pl9Hs8ainf58NcxhUIMy2LCf678a7vm8tpEFMXhk5jMZDJJJjN5J5P3JGnSktBIK2i7lipFhSxqW7CISqmlRUQsaBdWF3YhiEsRRPwXBA+EUgiIZNWFXXbjyk2h2pW48s6dTmZamy6cCA34bUJvbuE7Z373kZApqv+p+fruw5vfbl3/Qm4Pb69effttcnJy9+VtOOU02m2SHpWp2uMntz+TBfz9+/fNzc2Xu7svL8Fpp9be+dSkzEw3p2d2J3dbm5TW7tOzcBxFdNjhb7Fhb1fzxM7OJ82/NtWsLf6cnCStp9wfhdOv/2BnZ4v6L680n9X2KgfNf3XvLHThjBV9P/p7r6/6Tyw3Z2YrlZ9q869fvHDh3oV/oZ8eSvdWv030CVO15uP6YqWy8ermtUsXLj1v3Rw8Sf+0MNEma5ewPtFcrFcqe0+f37t381Wr1ToL/aBfI/pbpP8ry3Ozs6T5PzZamy3CRTBgxaKQDjv/1HeGi0Iy4wUDt3cgmRwIAsE0Jx0+ruCgOtULlrjcbre3trbIpl+pv67s/djY+KHaPx805H0eVJGy3GH94JCElEBZl09HUEVmXLpiSZvj8CVAJZqKgkY4j5RQxuKlob29tbU+MbfWIM1XUe3HjR4Ro1SJVwLEQTTrizHEkMIrTBXxDKgkbNrUEGK1DPocRuFtOfLCHtp5eDKHiUb9EmLUYvi3t7dXXldmanNq89X2XzN6z+VQSrO0XQ6McYa+04ERl1ZgHiUOCHGU0wlqnSJTtTkhmg67j1oa+34U0VYAAkdKFixder5ub0/VK3P1mcoG5emlQxu1JIKGKKNi6AvUkMLFqAGbQx40vBLG6QlH69J8JaehX0ZU9MDlMea0sniJ/vrK3NrI2p4qvzo7CgZhxCTolDBm7+gHsGSqcUitQkbROF0DNCGBTgYRMx19dwQjbjjAhZi2FB+Snen56csVtfOzI0cO+VQCdESp6tL13SFP0VQXo+l3hjK2KNX36JaJrC3c0RdpLTqhqmLp5Nqebzybr9X2NmbPjcMhWAf6wIArsJ3uu93QIUL1EynMucDMAGI2ccydh8ecadhZsBCe8emvO8v1+fmRmZ+LcBQvYvjkY8ttD4olREZ7B+Vs2OTCBhAjSW/iqD7Ts4vb+NL+/v6DiV/LsLg6C0cJo1zoru9NZ5mUhIhVTR/SMUSM5aMDBb2xfiR4bILImvUj6IPeMFif3h9urP+aGJtbPQdHKWOV66afCaFqnssrZTX7FE4ISXTU79UbUMohLUFwd/QTHkxCr6gvnRtd+9UYfLc6dlz3u+kLRNJWdHGqlUL0dbiyj5EQpU7oWG8xm0JEf0LXd/eu+zBeH4Szwx/GoPEO/sCFKB6nT99hgnBAluobcPEqOpxg4BYZRF8nPHkcgh7yfvgNwOVz8Af2GMZNf/nzYV0/ijljAfupvpMzRjLqJprgOHenAAZzrK4fpRuqTjKvgCXeDJ/v+ukocuhZ6Ps+9dBJeKi+X86a99IouGTZa1pGckH/t/Khhxqw+CzGF4ZvwPFkEAfAyIgnYej7TXFC5mhPryAPTgmTpmVU5XR91oN5oykyZsAKN4YXBuF43AF0BHUBGQXohMe48rgkmeqLaNiKslq2Hz1O8/mt60MRO6FMhNDDghUeDb+AbnglzJW1I1TCCKvrq6556p84I6VI34NkjEFZ0EzCOTrXhRhwHXwFh5jWly59Re1LuQKDmLG6ch9BV0QHEfUl43lET0HrXMxON0uMZQVB8aDkFRFlBoCLkDmKkORDiDma+iSi7I8nhZIDUQGTPkv8c4oglCREAayu3FHoTmGoiiryEKc9hViK3nl8MaQwXnArMZmhPT4Yk0ocUMoh1EgVQaUUK4FG2oOUSMbqwbuwACdSOOPjfcWgHla7HSjcgI/n0wfh4FjtNRPn+XiGgw6uNK/OcgOFtbPGJ2iB5wXRDRYZJdHvY+6Q6Pcxj0j0+5gXC9DPfOzr6MNSX0d/bGkE+piRpdP+K8cTacxAP1OvQT9Tb0A/c3kM/vPv+A2T7OHWmuRBtwAAAABJRU5ErkJggg==";
    this.J.Qk = "";
    this.J.Rk = "";
    this.J.Sk = "";
    this.J.Vk = "";
    this.J.Tk = "";
    this.J.Xk = "";
    this.J.Yk = "";
    this.J.Zk = "";
    this.J.Wk = "";
    this.J.$k = "";
    this.Tj = function () {
        var c = this.g, d = this, e = -1 === document.URL.indexOf("http://") && -1 === document.URL.indexOf("https://");
        Ga();
        var g = window.navigator.tk || window.matchMedia && window.matchMedia("(display-mode: standalone)").matches,
            f = r, f = f = "", f = ["d0ma1n"], f = f[0] + "", f = c.resources.Fh(f, g && e);
        f || (f = ["d0ma1n"], f = f[0] + "#FlexPaper-1-4-5-Annotations-1.0.10", f = c.resources.Fh(f, g && e));
        f || alert("License key not accepted. Please check your configuration settings.");
        this.mj = z;
        jQuery(".flowpaper_tbloader").hide();
        f && (c.Qg = new Image, jQuery(c.Qg).bind("load", function () {
            jQuery(d).trigger("onPostinitialized");
        }), c.Qg.src = c.pc);
    };
    this.Fh = function (c, d) {
        var e = this.g, g = Math.pow(9, 3), f = Math.pow(6, 2),
            n = e.config.key != s && 0 < e.config.key.length && 0 <= e.config.key.indexOf("@"), l = function () {
                var c = Array.prototype.slice.call(arguments), e = c.shift();
                return c.reverse().map(function (c, d) {
                    return String.fromCharCode(c - e - 28 - d);
                }).join("");
            }(14, 144, 124) + (20196).toString(36).toLowerCase() + function () {
                var c = Array.prototype.slice.call(arguments), e = c.shift();
                return c.reverse().map(function (c, d) {
                    return String.fromCharCode(c - e - 9 - d);
                }).join("");
            }(27, 150, 102, 155) + (928).toString(36).toLowerCase(), l = parseInt(g) + Ha(r) + l,
            f = parseInt(f) + Ha(r) + "AdaptiveUId0ma1n",
            g = na(parseInt(g) + (n ? e.config.key.split("$")[0] : Ha(r)) + c), f = na(f), l = na(l),
            g = "$" + g.substring(11, 30).toLowerCase(), f = "$" + f.substring(11, 30).toLowerCase(),
            l = "~" + l.substring(11, 30).toLowerCase();
        validated = d ? Ga() || e.config.key == l : Ga() || e.config.key == g || e.config.key == f || n && g == "$" + e.config.key.split("$")[1];
        this.mj = z;
        return validated;
    };
    this.initialize = function () {
        var c = this.g;
        c.A.prepend(String.format("<div id='modal-I' class='modal-content'><p><a href='https://flowpaper.com/?ref=FlowPaper' target='_new'><img src='{0}' style='display:block;width:100px;heigh:auto;padding-bottom:10px;' border='0' /></a></p>FlowPaper  web PDF viewer 3.3.2. Developed by Devaldi Ltd.<br/><a href='https://flowpaper.com/' target='_new'>Click here for more information about this online PDF viewer</a></div>", c.resources.Ji));
        c.about = FLOWPAPER.about = function () {
            jQuery("#modal-I").smodal();
        };
        c.config.document.BrandingLogo && 3 < c.config.document.BrandingLogo.length && jQuery(c.r).bind("onPagesContainerCreated", function () {
            c.A.append(String.format("<div class='flowpaper_custom_logo'><a href='#' data-brandingUrl='{1}'><img src='{0}' border='0' width='80'></a></div>", c.config.document.BrandingLogo, c.config.document.BrandingUrl ? c.config.document.BrandingUrl : "#"));
            c.A.find(".flowpaper_custom_logo").bind("click", function () {
                jQuery(c.r).trigger("onExternalLinkClicked", $(this).find("a").attr("data-brandingUrl"));
            });
        });
    };
};

function Ha(f) {
    var c = window.location.href.toString();
    0 == c.length && (c = document.URL.toString());
    if (f) {
        var d;
        d = c.indexOf("///");
        0 <= d ? d += 3 : (d = c.indexOf("//"), d = 0 <= d ? d + 2 : 0);
        c = c.substr(d);
        d = c.indexOf(":");
        var e = c.indexOf("/");
        0 < d && 0 < e && d < e || (0 < e ? d = e : (e = c.indexOf("?"), d = 0 < e ? e : c.length));
        c = c.substr(0, d);
    }
    if (f && (f = c.split("."))) {
        if (d = f.length, !(2 >= d)) {
            if (!(e = -1 != "co,com,net,org,web,gov,edu,".indexOf(f[d - 2] + ","))) {
                b:{
                    for (var e = ".ac.uk .ab.ca .bc.ca .mb.ca .nb.ca .nf.ca .nl.ca .ns.ca .nt.ca .nu.ca .on.ca .pe.ca .qc.ca .sk.ca .yk.ca".split(" "), g = 0; g < e.length;) {
                        if (-1 !== c.indexOf(e[g], c.length - e[g].length)) {
                            e = r;
                            break b;
                        }
                        g++;
                    }
                    e = z;
                }
            }
            c = e ? f[d - 3] + "." + f[d - 2] + "." + f[d - 1] : f[d - 2] + "." + f[d - 1];
        }
    }
    return c;
}

function Ga() {
    var f = Ha(z),
        c = window.navigator.tk || window.matchMedia && window.matchMedia("(display-mode: standalone)").matches,
        d = -1 === document.URL.indexOf("http://") && -1 === document.URL.indexOf("https://");
    return c || d ? z : 0 == f.indexOf("http://localhost/") || 0 == f.indexOf("http://localhost:") || 0 == f.indexOf("http://localhost:") || 0 == f.indexOf("http://192.168.") || 0 == f.indexOf("http://127.0.0.1") || 0 == f.indexOf("https://localhost/") || 0 == f.indexOf("https://localhost:") || 0 == f.indexOf("https://localhost:") || 0 == f.indexOf("https://192.168.") || 0 == f.indexOf("https://127.0.0.1") || 0 == f.indexOf("http://10.1.1.") || 0 == f.indexOf("http://git.devaldi.com") || 0 == f.indexOf("https://online.flowpaper.com") || 0 == f.indexOf("http://online.flowpaper.com") || 0 == f.indexOf("file://") ? r : 0 == f.indexOf("http://") ? z : 0 == f.indexOf("/") ? r : z;
}

window.FlowPaperViewerAnnotations_Plugin = function (f, c, d) {
    this.g = f;
    this.r = f.r;
    this.p = this.g.p;
    this.Ga = this.g.Ga;
    this.document = c;
    this.za = d;
    this.m = "#" + d;
    this.Me = r;
    this.hg = d + "_flowpaper_colorselector_yellow";
    this.gg = d + "_flowpaper_colorselector_orange";
    this.fg = d + "_flowpaper_colorselector_green";
    this.eg = d + "_flowpaper_colorselector_blue";
    this.Vg = d + "_flowpaper_notecolorselector_yellow";
    this.Hj = d + "_flowpaper_notecolorselector_orange";
    this.Gj = d + "_flowpaper_notecolorselector_green";
    this.Fj = d + "_flowpaper_notecolorselector_blue";
    this.im = d + "_flowpaper_notetypeselector";
    this.qf = d + "_flowpaper_notetypeselector_point";
    this.Ij = d + "_flowpaper_notetypeselector_area";
    this.Jj = d + "_flowpaper_notetypeselector_text";
    this.ag = d + "_flowpaper_colorselector2_black";
    this.dg = d + "_flowpaper_colorselector2_red";
    this.bg = d + "_flowpaper_colorselector2_blue";
    this.cg = d + "_flowpaper_colorselector2_green";
    this.ol = d + "_flowpaper_colorselector2_rect";
    this.nl = d + "_flowpaper_colorselector2_filledrect";
    this.I = [];
    this.Yb = s;
    this.Nc = "data:image/gif;base64,R0lGODlhBwAHAKEBAAAAAP///////////yH5BAEKAAEALAAAAAAHAAcAAAIMjA9nwMj9wmuLIlUAADs%3D";
    this.Ld = "data:image/gif;base64,R0lGODlhBwAHAIAAAP///////yH+GkNyZWF0ZWQgd2l0aCBHSU1QIG9uIGEgTWFjACH5BAEKAAEALAAAAAAHAAcAAAIMjA9nwMj9wmuLIlUAADs%3D";
    this.Ni = "data:image/png;base64,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%3D%3D";
    this.ze = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFTUs/////kXQHwAAAAAJ0Uk5T/wDltzBKAAAAJklEQVR42mJgZGRghAAGRgYGKJsBDKCiSApQmFA1MCFGIpgAAQYAEQQAVDdDqNQAAAAASUVORK5CYII%3D";
    this.Ej = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAADpPU2iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMJFCA74egkjwAAAF9JREFUKM9jfLtg3v/fDx8wEAsY7zlb//9++ijRGpgYSASjGoaqBg5dI0ZiFfMFxzAyMjAwMDxOjGH4tHbJf0KKZecvQQg8ToxhuMrH8B8bfpwYg90UbJpwKsamCZtiALZxM2A+y5QtAAAAAElFTkSuQmCC";
    FlowPaperViewer_HTML.prototype.Tc = function (c) {
        this.k.Tc(c);
    };
    FlowPaperViewer_HTML.prototype.mb = function (c, d, f) {
        var n = this;
        n.k.mb(c, d, f);
        jQuery(n.k).on("onDrawingStopped", function (c, e, d) {
            jQuery(n).trigger("onDrawingStopped", [e, d]);
        });
    };
    FlowPaperViewer_HTML.prototype.zb = function (c) {
        this.k.zb(c);
    };
    FlowPaperViewer_HTML.prototype.tc = function (c) {
        return this.k.tc(c);
    };
    FlowPaperViewer_HTML.prototype.Ad = function () {
        this.k.Ad();
    };
    FlowPaperViewer_HTML.prototype.Zc = function () {
        this.k.Zc();
    };
    FlowPaperViewer_HTML.prototype.ub = function () {
        this.k.ub();
    };
    FlowPaperViewer_HTML.prototype.Hc = function () {
        return this.k.Hc;
    };
    FlowPaperViewer_HTML.prototype.hj = function () {
        if (this.N) {
            return this.N.text;
        }
    };
    this.g.getCurrentlySelectedText = FlowPaperViewer_HTML.prototype.hj;
    this.g.config.document.AnnotationToolsVisible && 0 == this.g.A.find("#" + this.g.za + "_annotations_container").length && (this.g.document.DisableOverflow || this.g.A.append(String.format("<div id='" + this.g.za + "_annotations_container' style='height:50px;'><div id='" + this.g.za + "_annotations_popup' class='flowpaper_toolbarstd_bottom' style='top:{0}px;z-index:200;position:relative;visibility:hidden;border-width:0px;width:100px;z-index:200;overflow-y:hidden;margin-left:1px;overflow-x:hidden;margin-top:" + (!eb.platform.touchonlydevice ? "-14" : eb.platform.Bb ? "-2" : "-13") + "px'></div><div id='" + this.g.za + "_annotations' class='flowpaper_toolbarstd_bottom' style='margin-top:{0}px;z-index:200;overflow-y:hidden;overflow-x:hidden;'></div></div>", eb.platform.touchonlydevice && !eb.browser.Da.Ia ? -9 : 0)), this.g.Ge = jQuery(this.g.A).find("#" + this.g.za + "_annotations_container"));
    this.create = function () {
        var c = this;
        c.g.document.DisableOverflow || 0 < c.g.config.BottomToolbar.length && jQuery.ajax({
            url: c.g.config.BottomToolbar,
            async: z,
            success: function (d) {
                jQuery(c.m).append(d);
                600 > window.innerWidth && jQuery(c.m).find(".flowpaper_tblabelbutton").each(function () {
                    jQuery(this).data("autocompactwidth") && (jQuery(this).html(""), jQuery(this).css("width", "10px"));
                });
                jQuery(c.m).find(".flowpaper_toolbarstd_bottom").removeClass("flowpaper_toolbarstd_bottom");
            }
        });
        window[c.Ga].markList = c.I;
        window[c.Ga].clearMarks = c.Mi;
        window[c.Ga].getMarkList = c.jj;
        window[c.Ga].removeMark = c.Wj;
        window[c.Ga].scrollToMark = c.jk;
        window[c.Ga].addMarks = c.zi;
        window[c.Ga].addMark = c.xi;
        window[c.Ga].createMark = c.Ri;
        window[c.Ga].enableHighlighter = c.Zi;
        window[c.Ga].enableDrawMode = c.Xi;
        window[c.Ga].addNote = c.Ai;
        window[c.Ga].enableStrikeout = c.sg;
        window[c.Ga].enableStrikeout = c.sg;
        window[c.Ga].triggerDelete = c.Bk;
        window[c.Ga].setAnnotationsVisible = c.oh;
        window[c.Ga].removeSelectedMark = c.ih;
        window[c.Ga].refreshMarks = c.Uj;
        jQuery(window).bind("keydown", function (d) {
            c.ra && (!c.ra.note && 46 == d.which && !(d.target && "INPUT" == d.target.tagName)) && c.ih();
        });
    };
    this.lb = function () {
        jQuery(this.g).unbind("onDrawingStopped");
        jQuery(this.g.r).unbind("onVisibilityChanged");
        this.g.r.unbind("touchstart");
        this.g.r.unbind("touchmove");
        this.g.r.unbind("touchend");
        jQuery(this.g).unbind("onSelectedMarkChanged");
        this.m = this.za = this.document = this.Ga = this.p = this.r = this.g = s;
    };
    this.Mi = function (c) {
        return this.plugin.Zf(c);
    };
    this.jj = function () {
        return this.plugin.df();
    };
    this.ih = function () {
        var c = this.plugin ? this.plugin : this;
        if (c.ra && !c.ra.readonly && confirm(c.g.toolbar.la(c.g.toolbar.Ya, "ConfirmDeleteAnnotation", "Are you sure you want to delete this " + c.ra.type + "?"))) {
            c.vf(c.ra);
            jQuery(c.g).trigger("onSelectedMarkChanged", s);
            c.r.trigger("onSelectedMarkChanged", s);
            var d = jQuery.extend({}, c.ra);
            d.note && "string" != typeof d.note && (d.note = "<notes>" + d.note.find("note").parent().html() + "</notes>");
            c.ra = s;
        }
    };
    this.Wj = function (c) {
        this.plugin.vf(c);
    };
    this.jk = function (c) {
        this.plugin.ik(c);
    };
    this.zi = function (c) {
        this.plugin.yi(c);
    };
    this.xi = function (c) {
        return this.plugin.wi(c);
    };
    this.ik = function (c) {
        var d = this, f = -1;
        if (c.id != k) {
            if ("highlight" == c.type || "strikeout" == c.type) {
                f = c.selection_info.split(";"), f = parseInt(f[0]);
            }
            "note" == c.type && (f = parseInt(c.pageIndex));
            "drawing" == c.type && (f = parseInt(c.pageIndex));
            -1 != f && d.g.gotoPage(f, function () {
                var f = jQuery("#" + c.id);
                "Portrait" == d.g.j && (eb.browser.Da.Ia ? jQuery("#pagesContainer_" + d.p).scrollTo(f, 0, {
                    axis: "xy",
                    offset: -30
                }) : jQuery("#pagesContainer_" + d.p).data("jsp").scrollToElement(f, z));
            });
        } else {
            c.selection_info != s && 0 < c.selection_info.indexOf(";") && (f = c.selection_info.split(";"), f = parseInt(f[0]), d.g.gotoPage(f));
        }
    };
    this.wi = function (c) {
        c.id == s && (c.id = Z());
        this.I[this.I.length] = c;
        this.gb(this.g.getCurrPage() - 1);
        return c;
    };
    this.yi = function (c) {
        for (var d = 0; d < c.length; d++) {
            c[d].id == s && (c[d].id = Z()), this.I[this.I.length] = c[d];
        }
        this.gb(this.g.getCurrPage() - 1);
    };
    this.Qi = function () {
        if (this.g.N) {
            for (var c = 0, d = 0; d < this.g.N.ee; d++) {
                c += this.g.N.Jh.words[d].length;
            }
            c++;
            d = new Mark;
            d.id = Z();
            d.type = "highlight";
            d.selection_text = this.g.N.text;
            d.color = this.wg(r);
            d.selection_info = this.g.N.page + ";" + c + ";" + (c + this.g.N.text.length);
            d.readonly = z;
            d.pageWidth = 1000 * (this.g.getDimensions()[parseInt(this.g.N.page) - 1].width / this.g.getDimensions()[parseInt(this.g.N.page) - 1].height);
            d.pageHeight = 1000;
            d.author = this.g.config.CurrentUser;
            this.I[this.I.length] = d;
            this.gb(this.g.N.page - 1);
            this.r.trigger("onMarkCreated", d);
        }
    };
    this.Ri = function () {
        this.plugin.Qi();
    };
    this.vf = function (c, d) {
        jQuery("#" + c.id).remove();
        jQuery("#" + c.id + "_line").remove();
        jQuery("." + c.id).remove();
        for (var f = 0; f < this.I.length; f++) {
            if (this.I[f] === c || c.id && c.id == this.I[f].id) {
                c = this.I[f];
            }
        }
        for (var f = this.I, n = c, l = 0; l < f.length;) {
            f[l] === n || n.id && n.id == f[l].id ? f.splice(l, 1) : ++l;
        }
        if ("drawing" == c.type) {
            f = c.pageIndex - 1;
            "TwoPage" == this.g.j && (f = 0 == c.pageIndex % 2 ? 1 : 0);
            "BookView" == this.g.j && (f = 1 < c.pageIndex && 0 == c.pageIndex % 2 ? 1 : 0);
            if (n = this.g.tc(f)) {
                n.width = this.g.Kc(f), n.height = this.g.Gd(f);
            }
            n = z;
            for (l = 0; l < this.I.length; l++) {
                "drawing" == this.I[l].type && this.I[l].pageIndex == c.pageIndex && (n = r);
            }
            n || this.g.ub();
            jQuery(".flowpaper_drawing_" + f).remove();
        }
        f = c.pageIndex - 1;
        if (n = this.g.tc(f)) {
            n.width -= 1;
        }
        d || (c.note ? this.r.trigger("onMarkDeleted", this.Qc(c)) : this.r.trigger("onMarkDeleted", c));
        this.gb(f);
    };
    this.Zf = function (c) {
        for (i = 0; i < this.I.length; i++) {
            this.vf(this.I[i], c), i--;
        }
    };
    this.df = function () {
        for (var c = 0; c < this.I.length; c++) {
            this.I[c].note && "string" != typeof this.I[c].note && (this.I[c].note = "<notes>" + this.I[c].note.find("note").parent().html() + "</notes>");
        }
        return this.I;
    };
    this.Zi = function (c) {
        this.Td = z;
        this.plugin.jb();
        addCSSRule(".flowpaper_pageword", "cursor", "text");
        c || (c = "yellow");
        this.oa = "flowpaper_selected_" + c;
        this.plugin.vd = this.va;
        this.va = r;
        this.Ac = "highlight";
    };
    this.sg = function () {
        this.Td = r;
        this.plugin.jb();
        addCSSRule(".flowpaper_pageword", "cursor", "text");
        this.plugin.vd = this.va;
        this.va = r;
        this.Ac = "strikeout";
        this.oa = "flowpaper_selected_strikeout";
    };
    this.Xi = function (c) {
        c || (c = "black");
        0 <= c.indexOf("black") && (this.Na = "#000000");
        0 <= c.indexOf("red") && (this.Na = "#fa1100");
        0 <= c.indexOf("blue") && (this.Na = "#274af3");
        0 <= c.indexOf("green") && (this.Na = "#35dc0f");
        this.Tc(this.Na);
        this.mb(this.Na);
        FLOWPAPER.$c();
        jQuery(this.m).find(".flowpaper_bttnDraw").addClass("flowpaper_tbtextbutton_pressed");
    };
    this.oh = function () {
        var c = this.g ? this.g : this;
        if (jQuery(c.plugin.m).find(".flowpaper_bttnShowHide").hasClass("flowpaper_tbtextbutton_pressed")) {
            return jQuery(c.plugin.m).find(".flowpaper_bttnShowHide").removeClass("flowpaper_tbtextbutton_pressed"), c.plugin.Me = z, jQuery(".flowpaper_annotation_" + c.p).hide(), jQuery(".flowpaper_interactiveobject_" + c.p).hide(), r;
        }
        jQuery(c.plugin.m).find(".flowpaper_bttnShowHide").addClass("flowpaper_tbtextbutton_pressed");
        c.plugin.Me = r;
        jQuery(".flowpaper_annotation_" + c.p).show();
        jQuery(".flowpaper_interactiveobject_" + c.p).show();
        return z;
    };
    this.Bk = function () {
        jQuery(".flowpaper_bttnDelete").trigger("click");
    };
    this.Ai = function () {
        jQuery(".flowpaper_bttnComment").trigger("click");
    };
    this.bindEvents = function () {
        var c = this;
        jQuery(c.g.r).on("onVisibilityChanged", function () {
            jQuery(c.m).find(".flowpaper_bttnDraw").hasClass("flowpaper_tbtextbutton_pressed") ? (c.g.mb(c.g.Na), FLOWPAPER.$c()) : c.g.zb(r);
        });
        c.g.r.on("onPageCreated", function (d, f) {
            if ("BookView" == c.g.j || "TwoPage" == c.g.j) {
                if (jQuery(c.g.k.k[0]).Kb("onAddedTextOverlay", c.vc) != r) {
                    jQuery(c.g.k.k[0]).on("onAddedTextOverlay", c.vc);
                }
                if (jQuery(c.g.k.k[1]).Kb("onAddedTextOverlay", c.vc) != r) {
                    jQuery(c.g.k.k[1]).on("onAddedTextOverlay", c.vc);
                }
                if (jQuery(c.g.k.k[0]).Kb("onTextOverlayInactive", c.nd) != r) {
                    jQuery(c.g.k.k[1]).on("onTextOverlayInactive", c.nd);
                }
                if (jQuery(c.g.k.k[0]).Kb("onTextOverlayInactive", c.nd) != r) {
                    jQuery(c.g.k.k[1]).on("onTextOverlayInactive", c.nd);
                }
            } else {
                if (c.g.j == X) {
                    if (jQuery(c.g.k.k[0]).Kb("onAddedTextOverlay", c.vc) != r) {
                        jQuery(c.g.k.k[0]).on("onAddedTextOverlay", c.vc);
                    }
                } else {
                    if (jQuery(c.g.k.k[f]).Kb("onAddedTextOverlay", c.vc) != r) {
                        jQuery(c.g.k.k[f]).on("onAddedTextOverlay", c.vc);
                    }
                    if (jQuery(c.g.k.k[f]).Kb("onTextOverlayInactive", c.nd) != r) {
                        jQuery(c.g.k.k[f]).on("onTextOverlayInactive", c.nd);
                    }
                }
            }
        });
        c.g.r.on("touchstart", function (d) {
            if (!(1 < d.originalEvent.touches.length)) {
                return c.g.mg(d);
            }
        });
        c.g.r.on("touchmove", function (d) {
            if (!(1 < d.originalEvent.touches.length)) {
                return c.g.ng(d);
            }
        });
        c.g.r.on("touchend", function (d) {
            if (!(1 < d.originalEvent.touches.length)) {
                return c.g.og(d);
            }
        });
        jQuery(c.g).on("onSelectedMarkChanged", function (d, f) {
            f == s || f && f.readonly ? jQuery(c.m).find(".flowpaper_bttnDelete").addClass("flowpaper_tbbutton_disabled") : jQuery(c.m).find(".flowpaper_bttnDelete").removeClass("flowpaper_tbbutton_disabled");
        });
        jQuery(c.m).find(".flowpaper_bttnHighlight").bind("click", function (d) {
            addCSSRule(".flowpaper_pageword", "cursor", "text");
            c.Td = z;
            if (jQuery(c.m).find(".flowpaper_bttnHighlight").hasClass("flowpaper_tbtextbutton_pressed")) {
                c.g.va = z, c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").enable(), jQuery(c.m + "_popup").css("visibility", "hidden"), c.jb();
            } else {
                c.vd = c.g.va;
                c.g.va = r;
                c.g.Ac = "highlight";
                c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").disable();
                jQuery(c.m + "_popup").css({left: jQuery(this).offset().left, width: "100px"});
                jQuery(c.m + "_popup").html(String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#fff774;margin-top:3px;margin-left:3px;'/>", c.hg) + String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#facd56;margin-top:3px;margin-left:7px;'/>", c.gg) + String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#c2f785;margin-top:3px;margin-left:7px;'/>", c.fg) + String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#9cdcff;margin-top:3px;margin-left:7px;'/>", c.eg));
                if (!eb.platform.touchdevice || eb.platform.touchdevice && (!c.g.N || c.g.N && !c.g.N.qj)) {
                    "flowpaper_selected_orange" == c.g.oa ? jQuery("#" + c.gg).css("background-image", "url(" + c.Nc + ")") : "flowpaper_selected_green" == c.g.oa ? jQuery("#" + c.fg).css("background-image", "url(" + c.Nc + ")") : "flowpaper_selected_blue" == c.g.oa ? jQuery("#" + c.eg).css("background-image", "url(" + c.Nc + ")") : (jQuery("#" + c.hg).css("background-image", "url(" + c.Nc + ")"), c.g.oa = "flowpaper_selected_yellow");
                }
                jQuery(".flowpaper_colorselector").on("mousedown", function (d) {
                    jQuery(".flowpaper_colorselector").css("background-image", "");
                    (!eb.platform.touchdevice || eb.platform.touchdevice && !c.g.N) && jQuery(this).css("background-image", "url(" + c.Nc + ")");
                    0 <= jQuery(this).attr("id").indexOf("yellow") && (c.g.oa = "flowpaper_selected_yellow");
                    0 <= jQuery(this).attr("id").indexOf("orange") && (c.g.oa = "flowpaper_selected_orange");
                    0 <= jQuery(this).attr("id").indexOf("green") && (c.g.oa = "flowpaper_selected_green");
                    0 <= jQuery(this).attr("id").indexOf("blue") && (c.g.oa = "flowpaper_selected_blue");
                    eb.platform.touchdevice && (c.g.N != s && c.g.N.text != s && 0 < c.g.N.text.length) && (c.zd(), d.preventDefault(), d.stopPropagation());
                });
                c.jb();
                jQuery(c.m + "_popup").css("visibility", "visible");
                jQuery(c.m).find(".flowpaper_bttnHighlight").addClass("flowpaper_tbtextbutton_pressed");
                d && d.preventDefault && d.preventDefault();
                d && d.stopPropagation && d.stopPropagation();
            }
        });
        jQuery(c.m).find(".flowpaper_bttnComment").bind("click", function () {
            jQuery(c.m).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed") ? (c.g.va = z, c.jb()) : (c.jb(), jQuery(c.m).find(".flowpaper_bttnComment").addClass("flowpaper_tbtextbutton_pressed"), jQuery(c.m + "_popup").css({
                left: jQuery(this).offset().left + "px",
                width: "172px"
            }), jQuery(c.m + "_popup").html(String.format("<div id='{0}' class='flowpaper_notetypeselector' style='cursor:pointer;float:left;margin-top:3px;margin-left:3px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIXFRo40SzIZwAAAVRJREFUOMulkz+qwkAQxn8+gkq0Dla2aRMQPIGXsEjlMaz9cw0vkM7CI8TCC9jYhICISDBkJdl9VQbfM4q+t80OO/PNfDP7DfzzNADCMDRJkgBwvV4BuFwulGUJgG3bAphOp437BBZAkiRMJhPiOGa/33M+nzkejwB0u10JPhwODwysyojjmPV6LQ6l1I+71WrVtmBVtPv9PuPxGACtNUVRSFCe5/R6PZbL5XMGAFEUiV0UBcYYAFzXfTpEq6oAMBgMpHKe59xuN2EEkGVZfYLKsd1uBdBut9Fa0+l0AGg2m8xms9ct+L4vldM0RSnFcDj8jTH3MrDu/3m326G1pixLbNsWHWw2GxzHwfM80U6VSBhkWcZoNJIZnE4n0jQFwHEclFIEQcBqtXpsQSnFYrEAkKrGGObzOQCe5xEEQV0b5h25m1fvXx/ujqldpj8yeBf/Otk3ANmn8k9Eh6YAAAAASUVORK5CYII%3D)'>&nbsp;Point</div>", c.qf) + String.format("<div id='{0}' class='flowpaper_notetypeselector' style='cursor:pointer;float:left;margin-top:3px;margin-left:7px;background-image:url(data:image/gif;base64,R0lGODlhEAAQAJECAP///8zMzAD/AAAAACH5BAEAAAIALAAAAAAQABAAAAI5lI9pEyMOWzsB1GtzOEz7aWCixo3VYDnhl6LbYgLDDFBsM6tPnM+r2fMxhhJZTqGA6JAJH7O5fCIKADs%3D)'>&nbsp;Area</div>", c.Ij) + String.format("<div id='{0}' class='flowpaper_notetypeselector' style='cursor:pointer;float:left;margin-top:3px;margin-left:7px;background-image:url(data:image/gif;base64,R0lGODlhEAAQAMIAAP///8zMzAD/AAAAAP///////////////yH5BAEKAAIALAAAAAAQABAAAANDKLrcOmEISWNcAeSte1iQJ17KNgzaGX6PBaDoSwqZCqmABrpwfmOvVOSUY004yBQwidzdLKqhxNGYUh3WKyN7VU1OCQA7)'>&nbsp;Text</div>", c.Jj)), jQuery(c.m + "_popup").css("visibility", "visible"), jQuery(c.m + "_popup").find(".flowpaper_notetypeselector").on("mousedown", function (d) {
                jQuery(this).parent().find(".flowpaper_notetypeselector_selected").removeClass("flowpaper_notetypeselector_selected");
                jQuery(this).addClass("flowpaper_notetypeselector_selected");
                0 <= jQuery(this).attr("id").indexOf("point") && (c.$d(), eb.browser.msie ? jQuery(".flowpaper_interactivearea").addClass("flowpaper_note_marker_ie") : jQuery(".flowpaper_interactivearea").addClass("flowpaper_note_marker"));
                0 <= jQuery(this).attr("id").indexOf("area") && (c.$d(), d.preventDefault && d.preventDefault(), d.stopPropagation && d.stopPropagation(), c.g.mb("#fa1100", s, "DashRectangle"), FLOWPAPER.$c());
                0 <= jQuery(this).attr("id").indexOf("text") ? (jQuery(c.m + "_popup").animate({width: "263px"}, 100), 0 == jQuery(c.m + "_popup").find(".flowpaper_notetype_colorselector").length && (jQuery(c.m + "_popup").append(jQuery(String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#fff774;margin-top:5px;margin-left:8px;'/>", c.Vg) + String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#facd56;margin-top:5px;margin-left:7px;'/>", c.Hj) + String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#c2f785;margin-top:5px;margin-left:7px;'/>", c.Gj) + String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#9cdcff;margin-top:5px;margin-left:7px;'/>", c.Fj))), jQuery(c.m + "_popup").find("#" + c.Vg).css("background-image", "url(" + c.Nc + ")"), c.g.oa = "flowpaper_selected_yellow"), jQuery(c.m + "_popup").find(".flowpaper_notetype_colorselector").on("mousedown", function () {
                    jQuery(c.m + "_popup").find(".flowpaper_notetype_colorselector").css("background-image", "");
                    (!eb.platform.touchdevice || eb.platform.touchdevice && !c.g.N) && jQuery(this).css("background-image", "url(" + c.Nc + ")");
                    0 <= jQuery(this).attr("id").indexOf("yellow") && (c.g.oa = "flowpaper_selected_yellow");
                    0 <= jQuery(this).attr("id").indexOf("orange") && (c.g.oa = "flowpaper_selected_orange");
                    0 <= jQuery(this).attr("id").indexOf("green") && (c.g.oa = "flowpaper_selected_green");
                    0 <= jQuery(this).attr("id").indexOf("blue") && (c.g.oa = "flowpaper_selected_blue");
                }), c.vd = c.g.va, c.g.va = r, c.g.Ac = "highlight", c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").disable(), eb.platform.touchdevice && (c.g.N != s && c.g.N.text != s && 0 < c.g.N.text.length) && (c.zd(), d.preventDefault(), d.stopPropagation()), c.$d(), addCSSRule(".flowpaper_pageword", "cursor", "text"), c.Td = z, c.g.Zc(), c.g.zb(), d.preventDefault && d.preventDefault(), d.stopPropagation && d.stopPropagation()) : (jQuery(c.m + "_popup").find(".flowpaper_notetype_colorselector").remove(), jQuery(c.m + "_popup").animate({width: "172px"}, 100));
            }), c.g.va = z, c.g.mb(), c.g.Ad(), jQuery(".flowpaper_interactivearea").removeClass("flowpaper_grab"), !eb.browser.msie && !eb.browser.ic ? jQuery(".flowpaper_interactivearea").addClass("flowpaper_interactive_note") : jQuery(".flowpaper_interactivearea").addClass("flowpaper_interactive_note_ie"), jQuery(".flowpaper_interactivearea").on("mousedown touchstart", function (d) {
                if (jQuery(c.m).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed") && (0 == jQuery(c.m + "_popup").find(".flowpaper_notetypeselector_selected").length || jQuery(c.m + "_popup").find(".flowpaper_notetypeselector_selected").attr("id") == c.qf)) {
                    var f = parseInt(d.target.id.substring(d.target.id.indexOf("_") + 1));
                    if (isNaN(f) && eb.browser.msie && 9 >= eb.browser.version) {
                        var n = jQuery(d.target).parent().parent().get(0),
                            f = parseInt(n.id.substring(n.id.indexOf("_") + 1));
                    }
                    n = parseFloat(c.g.Rb(f));
                    d = pa(d);
                    var l = 0 < jQuery(c.m + "_popup").find(".flowpaper_notetypeselector_selected").length && jQuery(c.m + "_popup").find(".flowpaper_notetypeselector_selected").attr("id") == c.qf,
                        q = new Mark;
                    q.id = Z();
                    q.note = "";
                    "Portrait" == c.g.j && (q.pageIndex = f + 1);
                    "TwoPage" == c.g.j && (q.pageIndex = c.g.k.D + f + 1);
                    "BookView" == c.g.j && (q.pageIndex = c.g.k.D + f);
                    "SinglePage" == c.g.j && (q.pageIndex = c.g.k.D + 1);
                    var h = c.g.k.getPage(f).dimensions.U, A = c.g.k.getPage(f).dimensions.ia;
                    q.positionX = d.x / n;
                    q.positionY = d.y / n;
                    q.width = 170 / n;
                    q.height = 150 / n;
                    q.collapsed = z;
                    q.readonly = z;
                    q.type = "note";
                    q.pageWidth = 1000 * (h / A);
                    q.pageHeight = 1000;
                    q.author = c.g.config.CurrentUser;
                    l && (q.points = (d.x - 6) / n + "," + (d.y - 15) / n, q.positionX = (d.x + 50) / n, q.positionY = (d.y + 50) / n);
                    c.I[c.I.length] = q;
                    c.r.trigger("onMarkCreated", q);
                    setTimeout(function () {
                        c.g.mb(c.g.Na);
                        c.g.zb();
                        c.gb(f);
                    }, 300);
                    c.jb();
                }
            }));
        });
        jQuery(c.m).find(".flowpaper_bttnStrikeout").bind("click", function () {
            addCSSRule(".flowpaper_pageword", "cursor", "text");
            jQuery(c.m).find(".flowpaper_bttnStrikeout").hasClass("flowpaper_tbtextbutton_pressed") ? (c.g.va = z, c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").enable(), jQuery(c.m + "_popup").css("visibility", "hidden"), c.g.va = r, c.g.oa = "flowpaper_selected_default", c.g.Ac = "highlight", c.jb()) : (c.Td = r, eb.platform.touchonlydevice ? c.g.N != s && (c.g.N.text != s && 0 < c.g.N.text.length) && (c.vd = c.g.va, c.g.va = r, c.g.Ac = "strikeout", c.g.oa = "flowpaper_selected_strikeout", c.zd(), event.preventDefault(), event.stopPropagation(), jQuery(c.m).find(".flowpaper_bttnStrikeout").addClass("flowpaper_tbtextbutton_pressed")) : (c.vd = c.g.va, c.g.va = r, c.g.Ac = "strikeout", c.g.N && c.g.N.text != s && 0 < c.g.N.text.length ? (c.zd(), c.g.N = s, c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").enable(), jQuery(c.m + "_popup").css("visibility", "hidden"), c.g.config.document.StickyTools ? (c.g.oa = "flowpaper_selected_strikeout", jQuery(c.m).find(".flowpaper_bttnStrikeout").addClass("flowpaper_tbtextbutton_pressed")) : c.jb()) : (c.g.oa = "flowpaper_selected_strikeout", c.g.k.jScrollPane != s && c.g.k.jScrollPane.data("jsp").disable(), c.jb(), jQuery(c.m).find(".flowpaper_bttnStrikeout").addClass("flowpaper_tbtextbutton_pressed"))));
        });
        jQuery(c.m).find(".flowpaper_bttnShowHide").bind("click", function () {
            c.oh();
        });
        jQuery(c.g).on("onDrawingStopped", function (d, f, n) {
            d = jQuery(c.m).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed");
            if (0 < n.actions.length) {
                var l = "", q = n.actions.length - 1, h = parseFloat(f.scale);
                if (d) {
                    l += n.actions[q].events[0].x / h + "," + n.actions[q].events[0].y / h + ":" + n.actions[q].events[n.actions[q].events.length - 1].x / h + "," + n.actions[q].events[n.actions[q].events.length - 1].y / h;
                } else {
                    for (p = 0; p < n.actions[q].events.length; p++) {
                        l += n.actions[q].events[p].x / h + "," + n.actions[q].events[p].y / h + ":";
                    }
                }
                var A = new Mark;
                A.id = Z();
                A.color = n.actions[q].color;
                "Portrait" == f.j && (A.pageIndex = f.pageNumber + 1);
                "TwoPage" == f.j && (A.pageIndex = c.g.k.D + f.pageNumber + 1);
                "SinglePage" == c.g.j && (A.pageIndex = c.g.k.D + 1);
                "BookView" == f.j && (A.pageIndex = 0 == c.g.k.D ? 1 : c.g.k.D + (0 == f.pageNumber % 2 ? 0 : f.pageNumber));
                if (d) {
                    var D = n.actions[q].events[n.actions[q].events.length - 1].x;
                    n = n.actions[q].events[0].y;
                    A.note = "";
                    A.positionX = (D + 50) / h;
                    A.positionY = n / h;
                    A.width = 170 / h;
                    A.height = 150 / h;
                    A.collapsed = z;
                    A.readonly = z;
                }
                n = c.g.k.getPage(A.pageIndex - 1).dimensions.U;
                h = c.g.k.getPage(A.pageIndex - 1).dimensions.ia;
                A.readonly = z;
                A.points = l;
                A.type = "drawing";
                A.pageWidth = 1000 * (n / h);
                A.pageHeight = 1000;
                A.displayFormat = "html";
                A.author = c.g.config.CurrentUser;
                c.I[c.I.length] = A;
                c.r.trigger("onMarkCreated", A);
                !c.g.config.document.StickyTools || d ? (setTimeout(function () {
                    c.g.zb();
                    c.gb(f.pageNumber);
                }, 300), jQuery(c.m + "_popup").css("visibility", "hidden"), c.jb()) : setTimeout(function () {
                    c.gb(f.pageNumber);
                    c.g.mb();
                    c.g.Tc(c.g.Na);
                    FLOWPAPER.$c();
                }, 300);
            }
        });
        jQuery(c.m).find(".flowpaper_bttnDraw").bind("click", function () {
            jQuery(c.m).find(".flowpaper_bttnDraw").hasClass("flowpaper_tbtextbutton_pressed") ? (jQuery(c.m + "_popup").css("visibility", "hidden"), c.g.zb(), c.jb()) : (jQuery(c.m + "_popup").css({
                left: jQuery(this).offset().left,
                width: "100px"
            }), jQuery(c.m + "_popup").html(String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#000000;float:left;margin-top:3px;margin-left:3px;'/>", c.ag) + String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#fa1100;float:left;margin-top:3px;margin-left:7px;'/>", c.dg) + String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#274af3;float:left;margin-top:3px;margin-left:7px;'/>", c.bg) + String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#35dc0f;float:left;margin-top:3px;margin-left:7px;'/>", c.cg)), "#fa1100" == c.g.Na ? jQuery("#" + c.dg).css("background-image", "url(" + c.Ld + ")") : "#274af3" == c.g.Na ? jQuery("#" + c.bg).css("background-image", "url(" + c.Ld + ")") : "#35dc0f" == c.g.Na ? jQuery("#" + c.cg).css("background-image", "url(" + c.Ld + ")") : (jQuery("#" + c.ag).css("background-image", "url(" + c.Ld + ")"), c.g.Na = "#000000"), jQuery(".flowpaper_colorselector_tool").on("click", B()), jQuery(".flowpaper_colorselector_2").on("click", function (d) {
                jQuery(".flowpaper_colorselector_2").css("background-image", "");
                jQuery(this).css("background-image", "url(" + c.Ld + ")");
                0 <= jQuery(this).attr("id").indexOf("black") && (c.g.Na = "#000000");
                0 <= jQuery(this).attr("id").indexOf("red") && (c.g.Na = "#fa1100");
                0 <= jQuery(this).attr("id").indexOf("blue") && (c.g.Na = "#274af3");
                0 <= jQuery(this).attr("id").indexOf("green") && (c.g.Na = "#35dc0f");
                c.g.Tc(c.g.Na);
                d.preventDefault();
                d.stopPropagation();
            }), c.jb(), c.g.mb(c.g.Na), FLOWPAPER.$c(), jQuery(c.m + "_popup").css("visibility", "visible"), jQuery(c.m).find(".flowpaper_bttnDraw").addClass("flowpaper_tbtextbutton_pressed"));
        });
        jQuery("#" + c.p).bind("onSelectionCreated", function () {
            "flowpaper_selected_default" != c.g.oa && (c.zd(), c.g.N = s);
        });
    };
    this.zd = function () {
        if (this.g.N.text != s && 0 < this.g.N.text.length) {
            for (var c = 0, d = !this.Td, f = this.g.N.ee <= this.g.N.Og ? this.g.N.ee : this.g.N.Og, n = 0; n < f; n++) {
                c += this.g.N.Jh.words[n].length;
            }
            c++;
            f = new Mark;
            f.id = Z();
            f.type = d ? "highlight" : "strikeout";
            f.selection_text = this.g.N.text;
            f.color = this.wg(d);
            f.selection_info = this.g.N.page + ";" + c + ";" + (c + this.g.N.text.length);
            f.readonly = z;
            f.pageWidth = 1000 * (this.g.getDimensions()[parseInt(this.g.N.page) - 1].width / this.g.getDimensions()[parseInt(this.g.N.page) - 1].height);
            f.pageHeight = 1000;
            f.author = this.g.config.CurrentUser;
            if (c = jQuery(this.m).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed")) {
                var d = parseFloat(this.g.Rb(parseInt(this.g.N.page) - 1)), n = this.g.N.Lk, l = this.g.N.Mk;
                f.note = "";
                f.positionX = (n + 50) / d;
                f.positionY = (l + 50) / d;
                f.width = 170 / d;
                f.height = 150 / d;
                f.collapsed = z;
                f.readonly = z;
            }
            this.I[this.I.length] = f;
            this.gb(this.g.N.page - 1);
            this.r.trigger("onMarkCreated", f);
            !this.g.config.document.StickyTools || eb.platform.touchdevice || c ? (this.g.va = this.vd, this.g.Ac = "highlight", this.g.oa = "flowpaper_selected_default", this.g.ec(r), jQuery(this.m + "_popup").css("visibility", "hidden"), this.jb(), this.g.k.jScrollPane != s && this.g.k.jScrollPane.data("jsp").enable()) : this.g.ec(r);
        }
    };
    this.Xe = function () {
        if (jQuery(this.g.m).Kb("onZoomFactorChanged", this.Zg) != r) {
            jQuery(this.g.m).on("onZoomFactorChanged", this.Zg);
        }
    };
    this.Zg = B();
    this.nd = B();
    this.vc = function (c, d, f) {
        if ((c = f ? f : this.g) && c.plugin) {
            c = this.g.plugin, c.gb(d), jQuery(c.m).find(".flowpaper_bttnDraw").hasClass("flowpaper_tbtextbutton_pressed") && (c.g.mb(c.g.Na), FLOWPAPER.$c());
        }
    };
    this.Ek = function (c, d, f, n) {
        this.Yb == s && (this.Yb = Array(this.g.getTotalPages()));
        c.ta = d;
        c.ya = f;
        this.Yb[n] = {};
        this.Yb[n].width = d;
        this.Yb[n].height = f;
        this.gb(n);
    };
    this.Am = B();
    this.Uj = function () {
        var c = this;
        c instanceof FlowPaperViewer_HTML && (c = c.plugin);
        for (i = 0; i < c.I.length; i++) {
            var d = c.I[i];
            jQuery("#" + d.id).remove();
            jQuery("#" + d.id + "_line").remove();
            jQuery("." + d.id).remove();
            jQuery(".flowpaper_annotation_documentViewer").remove();
            if ("drawing" == d.type) {
                var f = d.pageIndex - 1;
                "TwoPage" == c.g.j && (f = 0 == d.pageIndex % 2 ? 1 : 0);
                "BookView" == c.g.j && (f = 1 < d.pageIndex && 0 == d.pageIndex % 2 ? 1 : 0);
                jQuery(".flowpaper_drawing_" + f).remove();
            }
        }
        for (d = 0; d < c.g.document.numPages; d++) {
            c.g.k.k[d].Ha && c.gb(d);
        }
    };
    this.sm = B();
    this.gb = function (c) {
        var d = this;
        d instanceof FlowPaperViewer_HTML && (d = d.plugin);
        if (d.Me && d.g && d.I !== k) {
            if (d.g.initialized) {
                for (var f = 0; 3 > f; f++) {
                    for (var n = 0; n < d.I.length; n++) {
                        if (!d.g.k.getPage(c)) {
                            return;
                        }
                        var l = d.g.k.getPage(c).rg(), q = d.g.k.getPage(c).pa, l = q * l, h = d.I[n];
                        h.id = h.id;
                        h.type = h.type;
                        h.note != k && (h.note = h.note);
                        h.positionX != k && (h.fb = h.positionX);
                        h.positionY != k && (h.Wa = h.positionY);
                        h.width != k && (h.width = h.width);
                        h.height != k && (h.height = h.height);
                        h.pageHeight != k && (h.ya = h.pageHeight);
                        h.pageWidth != k && (h.ta = h.pageWidth);
                        h.selection_info != k && (h.selection_info = h.selection_info);
                        h.pageIndex != k && (h.pageIndex = h.pageIndex);
                        h.collapsed != k && (h.collapsed = h.collapsed);
                        h.readonly != k && (h.readonly = h.readonly);
                        h.displayFormat != k && (h.sc = h.displayFormat);
                        h.points != k && (h.Rd = h.points);
                        h.color != k && (h.color = h.color);
                        h.author != k && (h.Uf = h.author);
                        h.selection_x != k && (h.Em = h.selection_x);
                        h.selection_y != k && (h.Fm = h.selection_y);
                        h.selection_width != k && (h.Dm = h.selection_width);
                        h.selection_height != k && (h.Cm = h.selection_height);
                        d.g.config.UserCollaboration && (h.note && h.note && "string" == typeof h.note && 0 < h.note.length && -1 == h.note.indexOf('<?xml version="1.0" encoding="utf-8"?>')) && (h.note = '<?xml version="1.0" encoding="utf-8"?>' + h.note);
                        if (!h.ta || !h.ya && 0 == f) {
                            if ("undefined" === h.sc || !h.sc) {
                                h.sc = "html";
                            }
                            h.sc && "flash" == h.sc && ("drawing" == h.type || "note" == h.type) ? d.g.config.docSizeQueryService ? d.Yb == s || d.Yb != s && d.Yb[c] == s ? jQuery.ajax({
                                url: d.g.config.docSizeQueryService,
                                dataType: "jsonp",
                                success: function (f) {
                                    d.Ek(h, f.width, f.height, c);
                                },
                                timeout: 10000,
                                error: function () {
                                    J("Error accessing docSizeQueryService. Some annotations may not have been loaded properly.");
                                }
                            }) : (h.ta = d.Yb[c].width, h.ya = d.Yb[c].height, h.sc = "flash") : J("Cannot query document for size.") : (h.ta = h.pageWidth = l, h.ya = h.pageHeight = q, h.sc = "html");
                        }
                        try {
                            var A = d.g.k.getPage(h.pageIndex - 1).dimensions.U,
                                D = d.g.k.getPage(h.pageIndex - 1).dimensions.ia, w = Math.round(1000 * (A / D));
                            Math.round(h.ta) > w - 2 && Math.round(h.ta) < w + 2 || (h.ta = 1000 * (A / D), h.ya = D);
                        } catch (t) {
                        }
                        var x = h.id == s ? Z() : h.id;
                        h.id = x;
                        if (("highlight" == h.type || "strikeout" == h.type) && 0 == f) {
                            var v = h.selection_info.split(";");
                            h.pageIndex = parseInt(v[0]);
                            var G = parseInt(v[1]), C = parseInt(v[2]), y = Ca(d.p, parseInt(v[0]) - 1);
                            if (y != s && 0 == jQuery(".flowpaper_annotation_selection_" + h.id).length) {
                                for (var K = 0, I = 0, P = v = 0; P < y.words.length; P++) {
                                    K <= G - 1 && (I = P);
                                    if (K + y.words[P].length == C - 1) {
                                        v = P;
                                        break;
                                    }
                                    if (K + y.words[P].length >= C - 1) {
                                        v = P;
                                        break;
                                    }
                                    K += y.words[P].length;
                                }
                                var L = "", N = h.id == s ? Z() : h.id;
                                h.points = "";
                                for (wi = I; wi <= v; wi++) {
                                    if (0 == jQuery("#" + N + "_" + wi).length && y.ca && y.ca[wi]) {
                                        var L = d.gj(h.color), u = jQuery(y.ca[wi].el).clone();
                                        jQuery(u).attr("id", N + "_" + wi);
                                        jQuery(u).data("adjusted", jQuery(y.ca[wi].el).data("adjusted"));
                                        jQuery(u).addClass("flowpaper_selected");
                                        jQuery(u).addClass("flowpaper_annotation_selection_" + h.id);
                                        jQuery(u).addClass("flowpaper_annotation_" + d.p);
                                        jQuery(u).addClass("flowpaper_interactiveobject_" + d.p);
                                        jQuery(u).addClass("flowpaper_annotation_" + c + "_" + d.p);
                                        jQuery(u).addClass(N);
                                        jQuery(u).addClass(L);
                                        jQuery(u).data("isMark", r);
                                        jQuery(u).data("classid", N);
                                        jQuery(u).data("mark", h);
                                        jQuery(u).data("selectionClass", L);
                                        jQuery(u).data("handler", this);
                                        jQuery(u).css("z-index", "12");
                                        var H = parseFloat(y.ca[wi].left) / parseFloat(d.g.Rb(c)),
                                            E = parseFloat(y.ca[wi].top) / parseFloat(d.g.Rb(c)),
                                            M = y.ca[wi].right / parseFloat(d.g.Rb(c)),
                                            I = y.ca[wi].bottom / parseFloat(d.g.Rb(c));
                                        h.points += H + "," + E + ":" + M + "," + I + ";";
                                        d.g.document.DisableOverflow && ("strikeout" != h.type ? "flowpaper_selected_orange" == L ? jQuery(u).css({
                                            "border-top": "solid " + jQuery(u).height() + "px #facd56",
                                            "background-color": "transparent"
                                        }) : "flowpaper_selected_green" == L ? jQuery(u).css({
                                            "border-top": "solid " + jQuery(u).height() + "px #c2f785",
                                            "background-color": "transparent"
                                        }) : "flowpaper_selected_blue" == L ? jQuery(u).css({
                                            "border-top": "solid " + jQuery(u).height() + "px #9cdcff",
                                            "background-color": "transparent"
                                        }) : jQuery(u).css({
                                            "border-top": "solid " + jQuery(u).height() + "px #fff774",
                                            "background-color": "transparent"
                                        }) : jQuery(u).css({
                                            "border-top": "solid " + jQuery(u).height() / 3 + "px #fb5450",
                                            "background-color": "transparent"
                                        }));
                                        jQuery(u).on("mouseover", function () {
                                            jQuery("." + N).removeClass(L).addClass("flowpaper_selected_hover");
                                        });
                                        "flowpaper_selected_strikeout" == L && !jQuery(u).data("adjusted") && (jQuery(u).css("margin-top", jQuery(y.ca[wi].el).height() / 2 - jQuery(y.ca[wi].el).height() / 2.3 / (!d.g.document.DisableOverflow ? 1.5 : 3)), jQuery(u).height(jQuery(y.ca[wi].el).height() / 2.3), jQuery(u).data("adjusted", r));
                                        jQuery(y.ca[wi].el).parent().append(u);
                                    }
                                }
                                if (0 < jQuery("." + N).length && !jQuery("." + N).Kb("mousedown", d.Xg)) {
                                    jQuery("." + N).on("mousedown touchstart", d.Xg);
                                }
                                jQuery("." + N).on("mouseout", function () {
                                    jQuery("." + N).removeClass("flowpaper_selected_hover").addClass(L);
                                });
                                jQuery(d.r).trigger("onMarkRedrawn", h);
                            }
                        }
                        if ("drawing" == h.type && (h.ta && h.ya && 2 == f) && ("Portrait" == d.g.j && (h.pageIndex == c + 1 || h.pageIndex == c) || "SinglePage" == d.g.j && h.pageIndex == d.g.k.D + 1 || "TwoPage" == d.g.j && (d.g.k.D == h.pageIndex - 1 || d.g.k.D == h.pageIndex - 2) || "BookView" == d.g.j && (d.g.k.D == h.pageIndex || d.g.k.D == h.pageIndex - 1))) {
                            y = h.pageIndex - 1;
                            "TwoPage" == d.g.j && (y = 0 == h.pageIndex % 2 ? 1 : 0);
                            "BookView" == d.g.j && (y = 1 < h.pageIndex && 0 != h.pageIndex % 2 ? 1 : 0);
                            "SinglePage" == d.g.j && (y = 0);
                            var O = s;
                            d.g.k.getPage(y) && (O = d.g.tc(y));
                            if (O != s) {
                                v = O.getContext("2d");
                                I = h.Rd.split(":");
                                G = I[0].split(",");
                                u = parseFloat(d.g.Rb(y));
                                E = H = -1;
                                M = jQuery(U).css("margin-left");
                                parseInt(O.width) != parseInt(d.g.Kc(y)) && (O.width = d.g.Kc(y), O.height = d.g.Gd(y), jQuery(".flowpaper_drawing_" + y).remove());
                                ("TwoPage" == d.g.j || "BookView" == d.g.j) && jQuery(".flowpaper_drawing_" + y).remove();
                                H = parseFloat(G[0]);
                                E = parseFloat(G[1]);
                                H = H / h.ta * l;
                                E = E / h.ya * q;
                                v.lineJoin = "round";
                                v.lineCap = "round";
                                v.beginPath();
                                v.moveTo(H * u, E * u);
                                M = h.id;
                                h.note != s && (h.fb != s && !isNaN(h.fb) && h.Wa != s && !isNaN(0 <= h.Wa)) && (M += "_drawing");
                                if (0 == jQuery("#" + M).length) {
                                    var Q = P = K = C = -1, U = d.g.Ed(y);
                                    for (p = 0; p < I.length; p++) {
                                        G = I[p].split(",");
                                        H = parseFloat(G[0]);
                                        E = parseFloat(G[1]);
                                        H = H / h.ta * l;
                                        E = E / h.ya * q;
                                        if (-1 == C || C > H) {
                                            C = H;
                                        }
                                        K < H && (K = H);
                                        if (-1 == P || P > E) {
                                            P = E;
                                        }
                                        Q < E && (Q = E);
                                    }
                                    C -= 15;
                                    P -= 15;
                                    K += 15;
                                    Q += 15;
                                    jQuery(U).append(String.format("<div id='{4}' class='flowpaper_annotation_{5} flowpaper_interactiveobject_{5} flowpaper_drawinghitarea flowpaper_annotation_{5}_page_{7}' style='position:absolute;left:{0}px;top:{1}px;width:{2}px;height:{3}px;z-index:100;margin-left:{6};'>&nbsp;</div>", C * u, P * u, (K - C) * u, (Q - P) * u, M, d.p, 0, c));
                                    jQuery("#" + M).data("mark", h);
                                    jQuery("#" + M).addClass("flowpaper_drawing_" + y);
                                    jQuery("#" + M).on("mousedown touchstart", function () {
                                        jQuery(this).corner("cc:#ff0000 notch 5px");
                                        jQuery(this).addClass("flowpaper_selected");
                                        d.ra = jQuery(this).data("mark");
                                        jQuery(d.g).trigger("onSelectedMarkChanged", d.ra);
                                        d.r.trigger("onSelectedMarkChanged", d.ra);
                                        d.r.trigger("onMarkClicked", d.ra);
                                    });
                                    if (h.note != s && h.fb != s && h.Wa != s && !isNaN(h.fb) && h.Wa != s && !isNaN(h.Wa) && h.width != s && h.height != s && 0 < h.width && 0 < h.height) {
                                        C = I[0].split(","), G = I[I.length - 1].split(","), y = parseFloat(C[0]), I = parseFloat(C[1]), C = parseFloat(G[0]), G = parseFloat(G[1]), y = y / h.ta * l, I = I / h.ya * q, C = C / h.ta * l, G = G / h.ya * q, v.strokeStyle = "#DD0000", CanvasRenderingContext2D.prototype.dashedLine ? (v.lineWidth = 2, v.dashedLine(y * u, I * u, C * u, I * u, 3), v.dashedLine(C * u, I * u, C * u, G * u, 3), v.dashedLine(C * u, G * u, y * u, G * u, 3), v.dashedLine(y * u, G * u, y * u, I * u, 3)) : (v.lineWidth = 1, v.lineTo(y * u, I * u), v.lineTo(C * u, I * u), v.lineTo(C * u, G * u), v.lineTo(y * u, G * u), v.lineTo(y * u, I * u));
                                    } else {
                                        v.lineWidth = 1;
                                        for (p = 0; p < I.length; p++) {
                                            G = I[p].split(","), H = parseFloat(G[0]), E = parseFloat(G[1]), H = H / h.ta * l, E = E / h.ya * q, 0 < G.length && v.lineTo(H * u, E * u);
                                        }
                                    }
                                }
                                h.note != s && h.fb != s && h.Wa != s && !isNaN(h.fb) && h.Wa != s && !isNaN(h.Wa) && h.width != s && h.height != s && 0 < h.width && 0 < h.height ? (v.lineWidth = 2, v.strokeStyle = "#fa1100") : (v.lineWidth = 1, v.strokeStyle = h.color);
                                v.stroke();
                                jQuery(d.r).trigger("onMarkRedrawn", h);
                            }
                        }
                        if (("note" == h.type || "highlight" == h.type && h.note != s && h.fb != s && h.Wa != s && !(-1 == h.fb && -1 == h.Wa) && !isNaN(h.fb) && !isNaN(h.Wa) || "drawing" == h.type && h.note != s && h.fb != s && h.Wa != s && !isNaN(h.fb) && !isNaN(h.Wa) && h.width != s && h.height != s && 0 < h.width && 0 < h.height) && h.ta && h.ya && 1 == f) {
                            if ("Portrait" == d.g.j && h.pageIndex == c + 1 || "SinglePage" == d.g.j && h.pageIndex == d.g.k.D + 1 || "TwoPage" == d.g.j && (d.g.k.D == h.pageIndex - 1 || d.g.k.D == h.pageIndex - 2) || "BookView" == d.g.j && (d.g.k.D == h.pageIndex || d.g.k.D == h.pageIndex - 1)) {
                                y = h.pageIndex - 1;
                                h.note || (h.note = "");
                                "TwoPage" == d.g.j && (y = 0 == h.pageIndex % 2 ? 1 : 0);
                                "BookView" == d.g.j && (y = 1 < h.pageIndex && 0 != h.pageIndex % 2 ? 1 : 0);
                                "SinglePage" == d.g.j && (y = 0);
                                O = d.g.tc(y);
                                O != s && O.width != parseInt(d.g.Kc(y)) && (O.width = d.g.Kc(y), O.height = d.g.Gd(y), jQuery(".flowpaper_drawing_" + y).remove());
                                U = d.g.Fd(y);
                                u = parseFloat(d.g.Rb(y));
                                H = h.fb;
                                E = h.Wa;
                                v = h.width;
                                I = eb.platform.touchonlydevice ? 25 : 15;
                                M = 0;
                                G = d.g.r.width() * u / 55;
                                C = eb.platform.touchonlydevice ? 15 : 10;
                                y = d.g.k.getPage(y);
                                0 == jQuery(U).length && (K = y.Aa(), P = y.Ra(), Q = y.nb(), K = "<div id='" + U.substr(1) + "' class='flowpaper_textLayer' style='width:" + K + "px;height:" + P + "px;margin-left:" + Q + "px;'></div>", y.j == S || y.j == X ? jQuery(y.V).append(K) : (y.j == V || y.j == T) && jQuery(y.V + "_" + (y.pageNumber % 2 + 1)).append(K));
                                H = H / h.ta * l;
                                E = E / h.ya * q;
                                v = v / h.ta * l;
                                "flash" == h.sc && (h.fb = H, h.Wa = E, h.ta = l, h.ya = q);
                                11 < G && (G = 11);
                                K = h.note;
                                if (d.g.config.UserCollaboration) {
                                    if ("string" == typeof K && 0 <= K.indexOf("<notes") || "object" == typeof h.note) {
                                        var R = "";
                                        "string" == typeof K && 0 <= K.indexOf("<notes") && (h.note = h.note = jQuery(h.note));
                                        R += "<div class='flowpaper_textarea_data'>";
                                        h.note.find("note").each(function (c) {
                                            R += String.format("{2}<b>{1}:</b><br/>{0}", jQuery(this).text(), jQuery(this).attr("author"), 0 < c ? "<br/><br/>" : "");
                                        });
                                        R += "</div>";
                                        K = String.format("<div id='{2}' style='height:{3}px;font-size:{4}px;width:100%;overflow:auto;' class='flowpaper_note_textarea'>{0}<div><div class='flowpaper_textarea_contenteditable' style='margin-top:5px;width:99%;height:40px;color:#00;text-decoration:underline;text-align:right;font-size:{5}px;padding-bottom:10px;' contenteditable='true'>" + (!h.readonly ? "<img src='{1}' />Reply<br/><br/>" : "") + "</div></div></div>", R, d.ze, x + "_textarea", h.height * u - I * u - C * u, G, G - 1);
                                    } else {
                                        K = 0 < h.note.length ? String.format("<div id='{2}' style='height:{3}px;font-size:{4}px;width:100%;overflow:auto;' class='flowpaper_note_textarea'><div class='flowpaper_textarea_data'><b>Unnamed user:</b><br/>{0}</div><div><div class='flowpaper_textarea_contenteditable' style='margin-top:5px;width:99%;height:40px;color:#00;text-decoration:underline;text-align:right;font-size:{5}px;padding-bottom:10px;' contenteditable='true'>" + (!h.readonly ? "<img src='{1}' />Reply<br/><br/>" : "") + "</div></div></div>", h.note, d.ze, x + "_textarea", h.height * u - I * u - C * u, G, G - 1) : String.format("<div id='{2}' style='height:{3}px;font-size:{4}px;width:99%;overflow:auto;' class='flowpaper_note_textarea'><div class='flowpaper_textarea_data'></div><div><div class='flowpaper_textarea_contenteditable_userinfo'><b>{6}:</b><br/></div><div class='flowpaper_textarea_contenteditable' style='margin-top:5px;width:100%;height:40px;color:#00;text-decoration:none;text-align:left;font-size:{5}px;padding-bottom:10px;' contenteditable='true'></div></div></div>", h.note, d.ze, x + "_textarea", h.height * u - I * u - C * u, G, G - 1, d.g.config.CurrentUser);
                                    }
                                } else {
                                    K = String.format("<textarea id='{0}' style='height:{1}px;font-size:{2}px;width:100%;' {3} class='flowpaper_note_textarea'>{4}</textarea>", x + "_textarea", h.height * u - I * u - C * u, G, h.readonly ? "readonly" : "", h.note);
                                }
                                jQuery("#" + x).data("pscale", u);
                                0 == jQuery("#" + x).length ? (jQuery(U).append(String.format("<div id='{0}' class='flowpaper_note flowpaper_annotation_{12} flowpaper_interactiveobject_{12} flowpaper_annotation_{12}_page_{13}' style='left:{1}px;top:{2}px;width:{3}px;height:{4}px;z-index:105;margin-left:{14};padding:2px 2px 5px 2px;'><div id='{0}_block' class='flowpaper_note_container' style='display:block;width:100%;height:{5}px;white-space:nowrap;overflow:hidden;'>{16}</div><div style='margin-right:5px;'>{10}</div><div id='{0}_block2' style='display:block;width:100%;height:{6}px;'></div></div>", x, H * u, E * u, v * u, h.height * u, I * u, C * u, h.height * u - I * u - C * u, h.id + "_textarea", h.width * u, K, G, d.p, c, M, d.Ni, h.Uf != s && !d.g.config.UserCollaboration ? h.Uf : "")), jQuery("#" + x).data("mark", h), jQuery("#" + x).corner("2px tl tr"), jQuery("#" + x).data("pscale", u), y.rotation && 0 != y.rotation && jQuery("#" + x).transition({rotate: -y.rotation}, 0), h.readonly || (jQuery("#" + x).draggable({
                                    containment: d.g.r, start: function () {
                                        d.g.Sa = r;
                                        window.ob = z;
                                        O && (O.width -= 1);
                                        d.gb(c);
                                        d.ra = jQuery(this).data("mark");
                                        jQuery(this).addClass("flowpaper_note_selected");
                                        jQuery(d.g).trigger("onSelectedMarkChanged", d.Qc(d.ra));
                                        d.r.trigger("onSelectedMarkChanged", d.ra);
                                        d.g.k.jScrollPane != s && d.g.k.jScrollPane.data("jsp").disable();
                                        jQuery("#" + jQuery(this).attr("id") + "_block").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_block2").hide();
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", r);
                                        jQuery("#" + jQuery(this).attr("id")).addClass("flowpaper_note_semitrans");
                                    }, drag: B(), stop: function (f, h) {
                                        O && (O.width -= 1);
                                        d.g.Sa = z;
                                        d.g.k.jScrollPane != s && d.g.k.jScrollPane.data("jsp").enable();
                                        var m = jQuery(this).data("mark");
                                        m.positionY = h.position.top / jQuery(this).data("pscale");
                                        m.positionX = h.position.left / jQuery(this).data("pscale");
                                        jQuery("#" + jQuery(this).attr("id")).removeClass("flowpaper_note_semitrans");
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", z);
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").show();
                                        jQuery("#" + jQuery(this).attr("id") + "_block").show();
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").show();
                                        d.gb(c);
                                        d.r.trigger("onMarkChanged", d.Qc(m));
                                    }
                                }), jQuery("#" + x).resizable({
                                    resize: function () {
                                        d.g.Sa = r;
                                        window.ob = z;
                                        d.ra = jQuery(this).data("mark");
                                        jQuery(this).addClass("flowpaper_note_selected");
                                        jQuery(d.g).trigger("onSelectedMarkChanged", d.Qc(d.ra));
                                        d.r.trigger("onSelectedMarkChanged", d.ra);
                                        d.g.k.jScrollPane != s && d.g.k.jScrollPane.data("jsp").disable();
                                        jQuery("#" + jQuery(this).attr("id") + "_block").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_block2").hide();
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", r);
                                        jQuery("#" + jQuery(this).attr("id")).addClass("flowpaper_note_semitrans");
                                    }, stop: function (f, m) {
                                        d.g.Sa = z;
                                        d.g.k.jScrollPane != s && d.g.k.jScrollPane.data("jsp").enable();
                                        jQuery(this).data("mark").width = m.size.width / jQuery(this).data("pscale");
                                        jQuery(this).data("mark").height = m.size.height / jQuery(this).data("pscale");
                                        jQuery("#" + jQuery(this).attr("id")).removeClass("flowpaper_note_semitrans");
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", z);
                                        d.gb(c);
                                        d.r.trigger("onMarkChanged", d.Qc(h));
                                    }
                                }), jQuery("#" + h.id + "_textarea").on("mousedown touchstart", function () {
                                    d.g.Sa = r;
                                    jQuery("#" + jQuery(this).attr("id")).focus();
                                    jQuery("#" + jQuery(this).parent().parent().attr("id")).draggable("disable");
                                }), jQuery("#" + h.id + "_textarea").on("remove", function () {
                                    jQuery(this).closest(".flowpaper_note").data("changed") && jQuery(this).closest("textarea").trigger("change");
                                }), jQuery("#" + h.id + "_textarea").on("touchstart mousedown keydown paste input", function () {
                                    jQuery(this).closest(".flowpaper_note").data("changed", r);
                                })), jQuery("#" + h.id + "_textarea").bind("blur", function () {
                                    d.g.Sa = z;
                                }), 0 == h.note.length && (d.g.config.UserCollaboration ? (v = jQuery("#" + h.id + "_textarea").find(".flowpaper_textarea_contenteditable"), v.css({"background-color": "#ffffff"})) : v = jQuery("#" + h.id + "_textarea"), v.focus(), v.parent().scrollTo(v)), d.g.config.UserCollaboration && (jQuery("#" + h.id + "_textarea").find(".flowpaper_textarea_contenteditable").bind("touchstart mousedown keydown paste input", function () {
                                    var c = jQuery(this), e = jQuery(this).closest(".flowpaper_note").data("mark");
                                    eb.platform.touchonlydevice && c.focus();
                                    if (0 <= c.html().indexOf("<img")) {
                                        return c.parent().prepend("<div class='flowpaper_textarea_contenteditable_userinfo'><br/><b>" + d.g.config.CurrentUser + ":</b></div>"), c.css({"text-align": "left"}), c.css({"text-decoration": "none"}), c.html(""), c.css({"background-color": "#ffffff"}), c.focus(), c.closest("flowpaper_note_textarea").scrollTo("max"), "string" == typeof e.note && -1 == e.note.indexOf("<notes") && (c = String.format('<notes mark_id="{0}"><note author="{2}">{1}</note></notes>', h.id, e.note, "Unnamed user"), e.note = jQuery(c)), (c = e && e.note.find("note").last()) && 0 < c.text().length && e.note.find("note").last().parent().append(String.format("<note author='{0}'></note>", d.g.config.CurrentUser)), z;
                                    }
                                }), jQuery("#" + h.id + "_textarea").bind("blur keyup paste input", function () {
                                    var c = jQuery(this);
                                    c.data("before") !== c.html() && -1 == c.html().indexOf("<img") && (c.data("before", c.html()), c.trigger("change"));
                                    return c;
                                }), jQuery("#" + h.id + "_textarea").bind("focusout", function () {
                                    var c = jQuery(this).find(".flowpaper_textarea_contenteditable");
                                    if (0 < c.html().length && "<br>" != c.html() && !c.is(":focus") && -1 == c.html().indexOf("<img")) {
                                        var e = c.parent().parent().find(".flowpaper_textarea_data"),
                                            f = jQuery(jQuery(this).closest(".flowpaper_note").data("mark").note).find("note").length;
                                        e.append(String.format("{0}<b>" + d.g.config.CurrentUser + ":</b><br/>" + c.html(), 1 < f ? "<br/><br/>" : ""));
                                    }
                                    c.is(":focus") || ("object" == typeof jQuery(this).closest(".flowpaper_note").data("mark").note && (c.parent().find(".flowpaper_textarea_contenteditable_userinfo").remove(), c.css({"text-align": "right"}), c.css({"text-decoration": "underline"}), c.css({"background-color": ""}), c.html(String.format("<img src='{0}' />Reply<br/><br/>", d.ze))), c.parent().parent().scrollTop(c.parent().parent()[0].scrollHeight));
                                })), jQuery("#" + h.id + "_textarea").on("change", function () {
                                    var c = jQuery(this).closest(".flowpaper_note").data("mark"),
                                        e = jQuery(this).find(".flowpaper_textarea_contenteditable");
                                    if (d.g.config.UserCollaboration) {
                                        if (-1 == e.html().indexOf("<img")) {
                                            if ("string" == typeof c.note && -1 == c.note.indexOf("<notes")) {
                                                var f = String.format('<notes mark_id="{0}"><note author="{2}">{1}</note></notes>', h.id, e.html(), d.g.config.CurrentUser);
                                                c.note = jQuery(f);
                                            }
                                            c.note.find("note").last().text(e.html());
                                        }
                                    } else {
                                        c.note = jQuery(this).val();
                                    }
                                    window.clearTimeout(d.Cj);
                                    d.Cj = setTimeout(function () {
                                        d.r.trigger("onMarkChanged", d.Qc(c));
                                    }, 300);
                                }), jQuery("#" + x).on("mouseover", function () {
                                    jQuery(this).addClass("flowpaper_note_selected");
                                }), jQuery("#" + x).on("mouseout", function () {
                                    (jQuery(this).data("interacting") == s || jQuery(this).data("interacting") != s && jQuery(this).data("interacting") != r) && jQuery(this).data("mark") != d.ra && jQuery(this).removeClass("flowpaper_note_selected");
                                }), jQuery("#" + x).on("mousedown touchstart", function (c) {
                                    c.stopPropagation && c.stopPropagation();
                                    window.ob = z;
                                    d.ra = jQuery(this).data("mark");
                                    c = jQuery.extend({}, d.ra);
                                    "string" != typeof c.note && (c.note = "<notes>" + c.note.find("note").parent().html() + "</notes>");
                                    jQuery(this).addClass("flowpaper_note_selected");
                                    jQuery(d.g).trigger("onSelectedMarkChanged", d.Qc(d.ra));
                                    d.r.trigger("onSelectedMarkChanged", d.ra);
                                    d.r.trigger("onMarkClicked", c);
                                    eb.platform.touchdevice || jQuery("#" + jQuery(this).attr("id") + "_textarea").focus();
                                    d.ra.readonly || jQuery(this).draggable("enable");
                                }), jQuery(d.r).trigger("onMarkRedrawn", h)) : (jQuery("#" + x).css({
                                    left: H * u,
                                    top: E * u,
                                    width: h.width * u,
                                    height: h.height * u,
                                    "margin-left": M
                                }), jQuery("#" + x + "_block").css({height: I * u}), jQuery("#" + x + "_block2").css({height: C * u}), jQuery("#" + x + "_textarea").css({
                                    height: h.height * u - I * u - C * u,
                                    "font-size": G
                                }), y.rotation && 0 != y.rotation ? jQuery("#" + x).transition({rotate: -y.rotation}, 0) : jQuery("#" + x).transition({rotate: 0}, 0), jQuery("#" + x + "_block").show(), jQuery("#" + x + "_textarea").show(), jQuery("#" + x + "_block2").show());
                                "note" == h.type && (h.Rd != s && 0 < h.Rd.length && O) && (G = h.Rd.split(","), y = parseFloat(G[0]), I = parseFloat(G[1]), y = y / h.ta * l, I = I / h.ya * q, d.od ? (v = O.getContext("2d"), v.drawImage(d.od, y * u, I * u)) : (d.od = new Image, x = {}, x.Nk = y, x.gh = u, x.Ok = I, jQuery(d.od).data("position", x), jQuery(d.od).bind("load", function () {
                                    var c = O.getContext("2d"), e = jQuery(this).data("position");
                                    c.drawImage(d.od, e.Nk * e.gh, e.Ok * e.gh);
                                }), d.od.src = d.Ej), y < H + h.width ? 0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.De(h.id, H * u, E * u, y * u + 5, I * u, M) : jQuery(U).append(FLOWPAPER.ae(h.id, H * u, E * u, y * u + 5, I * u, M, d.p)) : 0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.De(h.id, H * u + h.width * u, E * u, y * u + 5, I * u, M) : jQuery(U).append(FLOWPAPER.ae(h.id, H * u, E * u, y * u + 5, I * u, M, d.p)));
                                "drawing" == h.type && (h.note != s && h.fb != s && h.Wa != s && !d.g.Sa) && (I = h.Rd.split(":"), C = I[0].split(","), G = I[I.length - 1].split(","), y = parseFloat(C[0]), I = parseFloat(C[1]), C = parseFloat(G[0]), G = parseFloat(G[1]), y = y / h.ta * l, I = I / h.ya * q, C = C / h.ta * l, G = G / h.ya * q, 0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.De(h.id, H * u, E * u, (H > C ? C : y) * u, (E > I ? G : I) * u, M) : jQuery(U).append(FLOWPAPER.ae(h.id, H * u, E * u, C * u, I * u, M, d.p)));
                                if ("highlight" == h.type && h.note != s && h.fb != s && h.Wa != s && !d.g.Sa) {
                                    var v = h.selection_info.split(";"), y = Ca(d.p, parseInt(v[0]) - 1),
                                        G = parseInt(v[1]), C = parseInt(v[2]);
                                    if (y != s) {
                                        for (P = v = I = K = 0; P < y.words.length; P++) {
                                            K <= G - 1 && (I = P);
                                            if (K + y.words[P].length == C - 1) {
                                                v = P;
                                                break;
                                            }
                                            if (K + y.words[P].length >= C - 1) {
                                                v = P;
                                                break;
                                            }
                                            K += y.words[P].length;
                                        }
                                        q = jQuery("#" + h.id + "_" + I);
                                        l = 0;
                                        0 < jQuery("#" + h.id + "_" + v).length && (l = jQuery("#" + h.id + "_" + v).position().left > jQuery("#" + h.id + "_" + I).position().left || jQuery("#" + h.id + "_" + I).position().left > jQuery("#" + h.id + "_" + v).position().left ? jQuery("#" + h.id + "_" + v).position().left - jQuery("#" + h.id + "_" + I).position().left : jQuery("#" + h.id + "_" + I).position().left - jQuery("#" + h.id + "_" + v).position().left, midy = jQuery("#" + h.id + "_" + v).position().top - jQuery("#" + h.id + "_" + I).position().top);
                                        0 < q.length && (0 < q.position().top && 0 < q.position().left) && (0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.De(h.id, H * u, E * u, q.position().left + l, q.position().top + midy + q.height(), M) : jQuery(U).append(FLOWPAPER.ae(h.id, H * u, E * u, q.position().left + l, q.position().top + midy + q.height(), M, d.p)));
                                    }
                                }
                            }
                        }
                    }
                }
                if (!jQuery(".flowpaper_page").Kb("mousedown", d.Ae)) {
                    jQuery(".flowpaper_page, .flowpaper_interactivearea").on("mousedown", function (c) {
                        d.Ae(d, c);
                    });
                }
                if (!jQuery(".flowpaper_page").Kb("touchstart", d.Ae)) {
                    jQuery(".flowpaper_page, .flowpaper_interactivearea").on("touchstart", function (c) {
                        d.Ae(d, c);
                    });
                }
            } else {
                window.clearTimeout(d.Vj), d.Vj = setTimeout(function () {
                    d.gb(c);
                }, 300);
            }
        }
    };
    this.Qc = function (c) {
        var d = jQuery.extend({}, c);
        d.note = c.note;
        d.note && "string" != typeof d.note ? d.note = "<notes>" + d.note.find("note").parent().html() + "</notes>" : d.note && "string" == typeof d.note && (d.note = c.note);
        return d;
    };
    this.tm = function () {
        jQuery(".flowpaper_selected_selected").removeClass("flowpaper_selected_selected");
        jQuery(".flowpaper_note_selected").removeClass("flowpaper_note_selected");
    };
    this.Ae = function (c, d) {
        var f = jQuery(d.target).data("mark") != s ? jQuery(d.target).data("mark") : jQuery(d.target).parent().data("mark") != s ? jQuery(d.target).parent().data("mark") : jQuery(d.target).parent().parent().data("mark");
        jQuery(".flowpaper_selected_selected").each(function () {
            f != s && f != jQuery(this).data("mark") ? (jQuery(this).removeClass("flowpaper_selected_selected"), jQuery(this).addClass(jQuery(this).data("selectionClass"))) : f == s && (jQuery(this).removeClass("flowpaper_selected_selected"), jQuery(this).addClass(jQuery(this).data("selectionClass")), c.ra = s, jQuery(c.be).trigger("onSelectedMarkChanged", s));
        });
        jQuery(".flowpaper_note_selected").each(function () {
            f != s && f != jQuery(this).data("mark") ? jQuery(this).removeClass("flowpaper_note_selected") : f == s && (jQuery(this).removeClass("flowpaper_note_selected"), c.ra = s, jQuery(c.be).trigger("onSelectedMarkChanged", s));
        });
        jQuery(".flowpaper_selected").each(function () {
            f != s && f != jQuery(this).data("mark") ? (jQuery(this).removeClass("flowpaper_selected"), jQuery(this).uncorner()) : f == s && (jQuery(this).removeClass("flowpaper_selected"), jQuery(this).uncorner(), c.ra = s, jQuery(c.be).trigger("onSelectedMarkChanged", s));
        });
    };
    this.Xg = function (c) {
        var d = jQuery(c.target).data("handler"), f = jQuery(c.target).data("classid"),
            n = jQuery(c.target).data("selectionClass");
        d.ra = jQuery(c.target).data("mark");
        jQuery("." + f).removeClass(n).addClass("flowpaper_selected_selected");
        jQuery(d.g).trigger("onSelectedMarkChanged", d.ra);
        d.r.trigger("onSelectedMarkChanged", d.ra);
        d.r.trigger("onMarkClicked", d.ra);
    };
    this.jb = function () {
        jQuery(this.m).find(".flowpaper_bttnHighlight").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.m).find(".flowpaper_bttnComment").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.m).find(".flowpaper_bttnStrikeout").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.m).find(".flowpaper_bttnDraw").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.m + "_popup").css("visibility", "hidden");
        this.$d();
        jQuery(".flowpaper_interactivearea").addClass("flowpaper_grab");
        this.g.Zc();
        this.g.zb();
    };
    this.$d = function () {
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_interactive_note");
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_interactive_note_ie");
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_note_marker");
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_note_marker_ie");
    };
    this.wg = function (c) {
        return c ? "flowpaper_selected_orange" == this.g.oa ? "#facd56" : "flowpaper_selected_green" == this.g.oa ? "#c2f785" : "flowpaper_selected_blue" == this.g.oa ? "#9cdcff" : "#fff774" : "#fb5450";
    };
    this.gj = function (c) {
        return "#facd56" == c ? "flowpaper_selected_orange" : "#c2f785" == c ? "flowpaper_selected_green" : "#9cdcff" == c ? "flowpaper_selected_blue" : "#fb5450" == c ? "flowpaper_selected_strikeout" : "flowpaper_selected_yellow";
    };
};

function Z() {
    function f() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
    }

    return f() + f() + "-" + f() + "-" + f() + "-" + f() + "-" + f() + f() + f();
}

CanvasRenderingContext2D.prototype.dashedLine = function (f, c, d, e, g) {
    g == k && (g = 2);
    this.beginPath();
    this.moveTo(f, c);
    var m = d - f, n = e - c;
    g = Math.floor(Math.sqrt(m * m + n * n) / g);
    for (var m = m / g, n = n / g, l = 0; l++ < g;) {
        f += m, c += n, this[0 == l % 2 ? "moveTo" : "lineTo"](f, c);
    }
    this[0 == l % 2 ? "moveTo" : "lineTo"](d, e);
    this.stroke();
    this.closePath();
};
F = Ea.prototype;
F.mb = function (f, c, d) {
    if (this.g.j == V || this.g.j == T) {
        this.k[0].mb(f, s, d), this.k[1].mb(f, s, d);
    } else {
        for (var e = 0; e < this.getTotalPages(); e++) {
            this.La(e) && this.k[e].Ha && this.k[e].mb(f, c == e, d);
        }
    }
    this.Hc = r;
};
F.Tc = function (f) {
    for (var c = 0; c < this.getTotalPages(); c++) {
        this.La(c) && this.k[c].Tc(f);
    }
};
F.zb = function (f) {
    if (this.g.j == V || this.g.j == T) {
        this.k[0].zb(), this.k[1] && this.k[1].zb();
    } else {
        for (var c = 0; c < this.getTotalPages(); c++) {
            (!f || f && (this.k[c] && !this.k[c].Ha) && this.La(c)) && this.k[c].zb();
        }
    }
    this.Hc = z;
};
F.tc = function (f) {
    return !this.getPage(f) ? s : this.getPage(f).tc();
};
F.Ad = function () {
    for (var f = 0; f < this.getTotalPages(); f++) {
        this.La(f) && this.k[f].Ad();
    }
};
F.Zc = function () {
    for (var f = 0; f < this.getTotalPages(); f++) {
        this.La(f) && this.k[f].Zc();
    }
};
F.ub = function () {
    if (this.g.j == V || this.g.j == T) {
        this.k[0].ub(), this.k[1].ub();
    } else {
        for (var f = 0; f < this.getTotalPages(); f++) {
            this.La(f) && this.k[f].ub();
        }
    }
};
F.Jd = aa(r);

function Ia(f, c) {
    if (f.Ha) {
        var d = f.fj();
        if (0 != jQuery(d).length) {
            var e = "";
            if (eb.browser.msie || eb.browser.ic) {
                e = "-ms-touch-action:none; touch-action:none;";
            }
            f.g.j == V || f.g.j == T ? jQuery(d).append("<canvas id='" + f.Pa() + "' class='flowpaper_interactive_canvas flowpaper_interactivearea flowpaper_interactiveobject_" + f.pageNumber + "_" + f.p + "' flowpaper_interactiveobject_" + f.p + " flowpaper_annotation_" + f.p + "' style='z-index:11;position:absolute;left:0px;top:0px;display:block;" + e + "' width='" + f.Aa() + "' height='" + f.Ra() + "'></canvas>") : (f.g.renderer.dc && jQuery(d).empty(), jQuery(d).append("<canvas id='" + f.Pa() + "' class='flowpaper_interactive_canvas flowpaper_interactivearea flowpaper_interactiveobject_" + f.p + " flowpaper_annotation_" + f.p + "' style='z-index:11;position:absolute;left:0px;top:0px;display:block;" + e + "' width='" + f.Aa() + "' height='" + f.Ra() + "'></canvas>"));
            !(eb.browser.msie && 9 > eb.browser.version) && !eb.platform.ios && (new ha(f.g, "#" + f.Pa(), f.z(f.V).parent())).scroll();
            eb.browser.msie && (9 > eb.browser.version && !jQuery("#" + f.Pa()).data("excanvasinitialized")) && (f.bf = G_vmlCanvasManager.initElement(jQuery("#" + f.Pa()).get(0)), jQuery(f.bf).css({background: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}), jQuery("#" + f.Pa()).data("excanvasinitialized", r));
            jQuery(d).removeClass("flowpaper_hidden");
            f.g.j != V && f.g.j != T && jQuery(d).css("position", "absolute");
            jQuery("#" + f.Pa()).on("onDrawingStopped", function (c, d) {
                jQuery(f.g).trigger("onDrawingStopped", [f, d]);
            });
            f.xa = jQuery("#" + f.Pa()).sketch();
            jQuery(f.xa).data("sketch").color = c;
        }
    }
}

F = Da.prototype;
F.mb = function (f, c, d) {
    0 < jQuery("#" + this.Pa()).length ? (jQuery(this.xa).data("sketch").enabled = r, jQuery(this.xa).data("sketch").actions = [], jQuery("#" + this.Pa()).css("z-index", 11), this.bf && jQuery(this.bf).css({background: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}), jQuery(".flowpaper_pageword_" + this.p + "_page_" + this.pageNumber).css("z-index", 9), jQuery(".pdfPageLink_" + this.pageNumber).css("z-index", 9), jQuery(".flowpaper_drawinghitarea").css("z-index", 9), d ? jQuery(this.xa).data("sketch").drawingTool = d : jQuery(this.xa).data("sketch").drawingTool = s) : (Ia(this, f), jQuery(".flowpaper_pageword_" + this.p + "_page_" + this.pageNumber).css("z-index", 9), jQuery(".pdfPageLink_" + this.pageNumber).css("z-index", 9), jQuery(".flowpaper_drawinghitarea").css("z-index", 9), jQuery(this.xa).data("sketch").enabled = r);
    this.xa && jQuery(this.xa).data("sketch") && (jQuery(this.xa).data("sketch").color = f);
};
F.Tc = function (f) {
    this.xa != s && jQuery(this.xa).data("sketch") && (jQuery(this.xa).data("sketch").color = f);
};
F.tc = function () {
    0 == jQuery("#" + this.Pa()).length && (Ia(this), this.xa && jQuery(this.xa).data("sketch") && (jQuery(this.xa).data("sketch").enabled = z));
    return document.getElementById(this.Pa());
};
F.zb = function () {
    this.xa != s && (jQuery(this.xa).data("sketch") && jQuery(this.xa).data("sketch").enabled) && (jQuery(this.xa).data("sketch").enabled = z, 0 < jQuery("#" + this.Pa()).length && "9" != jQuery("#" + this.Pa()).css("z-index") && (jQuery(".flowpaper_pageword_" + this.p + "_page_" + this.pageNumber).css("z-index", 11), jQuery(".flowpaper_drawinghitarea").css("z-index", 11)), jQuery(".pdfPageLink_" + this.pageNumber).css("z-index", 20), jQuery("#" + this.Pa()).css("z-index", "9"), FLOWPAPER.Ui(), jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_note"));
};
F.Ad = function () {
    this.xa != s && jQuery(this.xa).data("sketch") && (jQuery(this.xa).data("sketch").enabled = z);
};
F.Zc = function () {
    this.xa != s && jQuery(this.xa).data("sketch") && (jQuery(this.xa).data("sketch").enabled = r);
};
F.ub = function () {
    "ImagePageRenderer" == this.g.renderer.Lc() && (this.g.j == S && (jQuery(this.Li).unbind("onDrawingStopped"), jQuery(this.K).empty()), (this.g.j == V || this.g.j == T) && jQuery("#" + this.Pa()).remove());
};
F.Jd = aa(r);
F.loadOverlay = function () {
    if (this.g.j == V) {
        var f = document.getElementById(this.Pa());
        f && (f.width = this.Aa());
    }
};
var Ja = "undefined" == typeof window;
Ja && (window = []);
var FlowPaperViewer_HTML = window.FlowPaperViewer_HTML = function () {
    function f(c) {
        window.annotations = r;
        this.config = c;
        this.Ga = this.config.instanceid;
        this.document = this.config.document;
        this.p = this.config.rootid;
        this.r = {};
        this.Qb = this.A = s;
        this.selectors = {};
        this.j = S;
        this.ab = c.document.InitViewMode != s && "undefined" != c.document.InitViewMode && "" != c.document.InitViewMode ? c.document.InitViewMode : window.zine ? ea : S;
        this.initialized = z;
        this.oa = "flowpaper_selected_default";
        this.wa = {};
        this.I = [];
        this.si = "data:image/gif;base64,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%3D";
        this.Rf = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAAZiS0dEAFEAUQBRjSJ44QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCCgEMO6ApCe8AAAFISURBVCjPfZJBi49hFMV/521MUYxEsSGWDDWkFKbkA/gAajaytPIFLKx8BVkodjP5AINGU0xZKAslC3Ys2NjP+VnM++rfPzmb23065z6de27aDsMwVD0C3AfOAYeB38BP9fEwDO/aMgwDAAFQDwKbwC9gZxScUM8Al5M8SPJ0Eu5JYV0FeAZcBFaAxSSPkjwHnrQ9Pf1E22XVsX5s+1m9o54cB9J2q+361KM+VN+ot9uqrjIH9VJbpz7qOvAeuAIcSnJzThA1SXaTBGAAvgCrwEvg0yxRXUhikrOjZ1RQz7uHFfUu/4C60fb16G9hetxq+1a9Pkdears2Dt1Rj87mdAx4BfwAttWvSQ4AV9W1aYlJtoFbmQJTjwP3gAvAIlDgG7CsXvu7uWQzs+cxmj0F7Fd3k3wfuRvqDWAfM+HxP6hL6oe2tn3xB7408HFbpc41AAAAAElFTkSuQmCC";
        this.Ke = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcCBUXESpvlMWrAAAAYklEQVQ4y9VTQQrAIAxLiv//cnaYDNeVWqYXA4LYNpoEKQkrMCxiLwFJABAAkcS4xvPXjPNAjvCe/Br1sLTseSo4bNGNGXyPzRpmtf0xZrqjWppCZkVJAjt+pVDZRxIO/EwXL00iPZwDxWYAAAAASUVORK5CYII%3D";
        this.ti = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEX///////////////////////////////////////////////////////////////////////////////////////////+QFj7cAAAAFnRSTlMAHDE8PkJmcXR4eY+Vs8fL09Xc5vT5J4/h6AAAAFtJREFUeNqt0kkOgDAMQ9EPZSgztMX3PyoHiMKi6ttHkZ1QI+UDpmwkXl0QZbwUnTDLKEg3LLIIQw/dYATa2vYI425sSA+ssvw8/szPnrb83vyu/Tz+Tf0/qPABFzEW/E1C02AAAAAASUVORK5CYII=";
        this.bl = "";
        this.pc = "data:image/gif;base64,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%3D";
        this.wd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAVVSURBVHjaxFdbSFxHGJ7djfdb1HgNpsV7iwQrYhWN5EmReHlqUEGqUcGHohBCMSqhqEgU8aWiqH0QBDGkAe2bF1ARMduKldqqsURFrVqtBo1uvOzu9P+n/znMWVfNWwc+zp455/zf/LdvZnXs8qGTrrbAwe2ASddrDdvOIfSEGwADQW9DagVYCGa6t9os4kpS5bdCgGSOCpqamj5PSUm5d+fOnS98fHyiHB0dg3U6HT8/P//r6Ojoj729PePy8vJIRkbGnLQQdh25johcADcBQYDQ4uLitNevX3eB4Q2r1coVbG1t8ZWVFS7PnZ6ewtTK856eniiypbskmuoDB4ArwBfwCSCmvr7+GzBiJIO8s7OTP3jwgLu6umqQnJzMW1pauMlkEuTg9eDo6Gg62bRLrHiIhLfQO0B8VVXVk83NzUU0Mjg4yKOioi6Q2eLu3bt8enpaEJ+cnBiHh4fTJY81QwmpLxEmpKWlPVpYWJjFj7u7u7mHh8e1hC4uLgLu7u68oaFBEIPng11dXdH2iJ0ohxjSeEDmy5cvf1I8vIpQIbKHtrY2Qfz27dvnxKGXSd2oaGIAaVB9Nbu7u3tQODw8PFxDkpiYyO/fv3+BICQkhJeWlnJfX191zsvLi6+vr4vigsKKt/XWm8KaDMiFghjAFba2tmoI4+Li1Cqtra1VjUdHR/ONjQ0x39HRoc47OzvzsrIyMT8zM1NJrSdI9XSDReSJC4iNjY3ABy9evNAk/vj4mEFxiN81NTXs6dOnLDQ0lI2MjLDg4GAx//79e8Y5F8AxMDDAgJRBxL609TQEiwfwFeBbWPXewcGB3fzl5OSobYHA95Tfr1694m5ubsJDGbOzs1jJS2Dbg0RHeOpAiUZvXSEvntvb2xovlZUPDQ2x3NxcdnZ2Ju6hyMS1v7+fFRUV/SdnBoMGkFfm4OBwmwjV8Cpy50RgIG0XCJUBYiHCKI/5+XlmsVjsSh3Ogw2drNt6W2Hf2dk5DgwMtGsAciO8hWiIe8wXDhASVllZafcbzDdEZlNWJr3tS4uLi+9A0MXLspcYSiQMCAhQQ/rw4UO1uKqrq1lJSYnGFoY3MjKSQfu9kef10naEW5NlfHx8Bx9kZWVpDODHMmFhYSED8WD5+fkqMWiw5pvU1FTm6enJlpaWfrXd7rBH7wG+BnwXExPzI1TwEe4icrMjsO8qKio4GBKVqgC2PF5XV8cjIiI08xMTExx3J2ivdFK9G3ZbBvB9Y2Pj79gGzc3NGlJsAdnoVYBQi1YyGo1dxKG2jIHE3pGu2DYukFcrSJ4P5Mx9dXWVzc3NqfnV6/XXnUZYQkIC6+vrY7BL/fzs2bNW2DywkE4ohdxAhPIpwenw8BALCj++CSt2MZvNbHJy8qNIsbh6e3vZ/v7+m/b29h9AGo0oaIBT6TShFXzAI1Q6DHNSUtIwkG1hmGC1PC8vj/v5+dkNZ2ZmJocThggpFM7s48ePn5DNIOJQZVBHgoCh9QL4AQLpRSzVW0FBQbfLy8s/Kygo+BTayA12DaxGBiIuVgyFx6CARJXCiWF/bGxsEmqhH3L5GzzeBRwAPqDmUJeopwblqOJFpwd/wi3ahdzh5BCUnZ0dAluff1hYmLe/vz+uHokO19bW/p6amvoTWukXqNhZmMa2+4cITURoUVpGUQmDzW7jI8GbKs+VomJQFI7yhEZRF98B9iUc0rMzmZBJfWOh1ZjooYWq7ZhW6y6RKt+YJdIjIjmgBRxJIbXYOx9x8tYsqYaFVmgiQwqhoySdVnpHITYR0QeaO7/s7PvRh23K+w0bUjMZP5Ngvu6w/b/8rfhXgAEAmJkyLSnsNQEAAAAASUVORK5CYII=";
        this.Ik = this.p + "_textoverlay";
        this.Lf = "#" + this.Ik;
        this.M = 1;
        this.zm = s;
        this.renderer = this.config.renderer;
        this.za = "toolbar_" + this.p;
        this.m = "#" + this.za;
        this.va = z;
        this.Ac = "highlight";
        this.scale = this.config.document.Scale;
        this.resources = new FlowPaper_Resources(this);
        this.Ne = z;
        this.xd = 0;
        this.linkColor = "#72e6ff";
        this.pe = 0.4;
        this.km = 0.3;
    }

    f.prototype = {
        z: function (c) {
            if (0 < c.indexOf("undefined")) {
                return jQuery(s);
            }
            this.selectors || (this.selectors = {});
            this.selectors[c] || (this.selectors[c] = jQuery(c));
            return this.selectors[c];
        }, H: function () {
            return this.u ? this.u.H : "";
        }, loadFromUrl: function (c) {
            var d = this;
            d.Be();
            var e;
            window.annotations && d.plugin && d.plugin.Zf();
            if (d.k) {
                for (var g = 0; g < d.document.numPages; g++) {
                    d.k.k[g] && delete d.k.k[g];
                }
            }
            var f = g = z;
            c.RenderingOrder && (f = c.RenderingOrder.split(","), g = 0 < f.length && "html5" == f[0], f = 0 < f.length && "html" == f[0]);
            c.DOC && (c.PDFFile = FLOWPAPER.translateUrlByFormat(unescape(c.DOC), "pdf"), c.SWFFile = FLOWPAPER.translateUrlByFormat(unescape(c.DOC), "swf"), c.JSONFile = FLOWPAPER.translateUrlByFormat(unescape(c.DOC), "jsonp"), c.IMGFiles = FLOWPAPER.translateUrlByFormat(unescape(c.DOC), "jpg"));
            c.FitPageOnLoad && (d.config.document.FitPageOnLoad = r, d.config.document.FitWidthOnLoad = z);
            c.FitWidthOnLoad && (d.config.document.FitWidthOnLoad = r, d.config.document.FitPageOnLoad = z);
            if ((eb.browser.Da.wk && c.PDFFile || g) && !f) {
                e = new CanvasPageRenderer(this.p, c.PDFFile, d.config.jsDirectory, {
                    jsonfile: c.JSONFile,
                    pageImagePattern: c.pageImagePattern,
                    JSONDataType: d.renderer.config.JSONDataType,
                    signature: d.renderer.config.signature
                });
            } else {
                if ((c.JSONFile && c.IMGFiles || f) && !g) {
                    e = new ImagePageRenderer(this.p, {
                        jsonfile: c.JSONFile,
                        pageImagePattern: c.IMGFiles,
                        JSONDataType: d.renderer.config.JSONDataType,
                        signature: d.renderer.config.signature
                    }, d.config.jsDirectory);
                }
            }
            d.renderer = e;
            jQuery(d.renderer).bind("loadingProgress", function (c, e) {
                d.uh(c, e);
            });
            jQuery(d.renderer).bind("labelsLoaded", function (c, e) {
                d.rh(c, e);
            });
            jQuery(d.renderer).bind("loadingProgressStatusChanged", function (c, e) {
                d.vh(c, e);
            });
            jQuery(d.renderer).bind("UIBlockingRenderingOperation", function (c, e) {
                d.xc(c, e);
            });
            jQuery(d.renderer).bind("UIBlockingRenderingOperationCompleted", function () {
                d.$a();
            });
            jQuery(d.renderer).bind("outlineAdded", function (c, e) {
                d.dh(c, e);
            });
            e && (d.uc = "", d.Df(), d.renderer = e, e.initialize(function () {
                d.document.numPages = e.getNumPages();
                d.document.dimensions = e.getDimensions();
                d.document.StartAtPage = c.StartAtPage;
                d.loadDoc(e, e.getNumPages());
            }, {}));
        }, loadDoc: function (c, d) {
            this.initialized = z;
            this.document.numPages = d;
            this.renderer = c;
            this.show();
        }, getDimensions: function (c) {
            return this.renderer.getDimensions(c);
        }, ng: function (c) {
            if (jQuery(c.target).hasClass("flowpaper_note_container") && eb.platform.touchdevice) {
                return window.ob = z, r;
            }
            var d = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageX : c.originalEvent.touches[0].pageX,
                e = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageY : c.originalEvent.touches[0].pageY;
            if (this.va || eb.platform.touchdevice) {
                c.target && (c.target.id && 0 <= c.target.id.indexOf("page") && 0 <= c.target.id.indexOf("word")) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = Ca(this.p, hoverPage));
                if ((hoverPageObject || window.ob) && window.ob) {
                    eb.platform.touchdevice && (c.preventDefault && c.preventDefault(), c.stopPropagation && c.stopPropagation(), this.k.jScrollPane && this.k.jScrollPane.data("jsp").disable());
                } else {
                    return r;
                }
                this.j == this.H() && 1 < this.scale ? window.b = hoverPageObject.Tg(c.target.id) : window.b = hoverPageObject.match({
                    left: d,
                    top: e
                }, z);
                window.b != s && (window.a != s && window.a.pageNumber != window.b.pageNumber) && (window.a = hoverPageObject.match({
                    left: d - 1,
                    top: e - 1
                }, z));
                this.ec(r);
                this.N = hoverPageObject.Xc(r, this.oa);
            } else {
                if (c.target && (c.target.id && 0 <= c.target.id.indexOf("page")) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = Ca(this.p, hoverPage)), hoverPageObject && hoverPageObject.match({
                    left: d,
                    top: e
                }, r), !hoverPageObject && !window.ob) {
                    return r;
                }
            }
        }, ec: function (c) {
            eb.platform.touchdevice || (this.N = s);
            this.va && (jQuery(".flowpaper_pageword_" + this.p).removeClass("flowpaper_selected"), jQuery(".flowpaper_pageword_" + this.p).removeClass("flowpaper_selected_default"));
            c && jQuery(".flowpaper_pageword_" + this.p).each(function () {
                jQuery(this).hasClass("flowpaper_selected_yellow") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_yellow");
                jQuery(this).hasClass("flowpaper_selected_orange") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_orange");
                jQuery(this).hasClass("flowpaper_selected_green") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_green");
                jQuery(this).hasClass("flowpaper_selected_blue") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_blue");
                jQuery(this).hasClass("flowpaper_selected_strikeout") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_strikeout");
            });
        }, og: function (c) {
            this.nf = "up";
            this.Sa = this.jf = z;
            this.Rg = s;
            if (!this.k || !this.k.Dc) {
                if (jQuery(c.target).hasClass("flowpaper_searchabstract_result") || (jQuery(c.target).parent().hasClass("flowpaper_searchabstract_result") || jQuery(c.target).hasClass("flowpaper_note_container")) || "TEXTAREA" == c.target.tagName || jQuery(c.target).hasClass("flowpaper_textarea_contenteditable") || jQuery(c.target).parent().hasClass("flowpaper_textarea_contenteditable")) {
                    return r;
                }
                if (this.va || eb.platform.touchdevice) {
                    if (hoverPageObject) {
                        if (eb.platform.touchdevice) {
                            var d = s;
                            "undefined" != typeof c.originalEvent.touches && (d = c.originalEvent.touches[0] || c.originalEvent.changedTouches[0]);
                            d != s && (this.Sb == d.pageX && this.Tb == d.pageY) && (this.ec(), this.N = hoverPageObject.Xc(window.ob, this.oa));
                            d != s && (this.Sb = d.pageX, this.Tb = d.pageY);
                            this.k.jScrollPane && this.k.jScrollPane.data("jsp").enable();
                        } else {
                            window.b = hoverPageObject.match({left: c.pageX, top: c.pageY}, z);
                        }
                        this.N != s && this.r.trigger("onSelectionCreated", this.N.text);
                        window.ob = z;
                        window.a = s;
                        window.b = s;
                    }
                } else {
                    hoverPageObject && (window.b = hoverPageObject.match({
                        left: c.pageX,
                        top: c.pageY
                    }, z), window.ob = z, this.ec(), this.N = hoverPageObject.Xc(z, this.oa));
                }
            }
        }, mg: function (c) {
            var d = this;
            d.nf = "down";
            if (jQuery(c.target).hasClass("flowpaper_note_textarea") || "INPUT" == jQuery(c.target).get(0).tagName) {
                window.b = s, window.a = s;
            } else {
                if (!d.k.Dc) {
                    var e = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageX : c.originalEvent.touches[0].pageX,
                        g = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageY : c.originalEvent.touches[0].pageY;
                    d.Sb = e;
                    d.Tb = g;
                    eb.platform.touchdevice && (eb.platform.touchonlydevice && window.annotations && (d.va = r, d.ec(r)), window.clearTimeout(d.Aj), d.Rg = (new Date).getTime(), document.activeElement && jQuery(document.activeElement).hasClass("flowpaper_note_textarea") && document.activeElement.blur(), d.Aj = setTimeout(function () {
                        if (d.Rg != s && c.originalEvent.touches && 0 < c.originalEvent.touches.length) {
                            var e = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageX : c.originalEvent.touches[0].pageX,
                                g = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageY : c.originalEvent.touches[0].pageY;
                            d.Sb + 20 > e && d.Sb - 20 < e && (d.Tb + 20 > g && d.Tb - 20 < g) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = Ca(d.p, hoverPage), hoverPageObject != s && (d.k.jScrollPane != s && d.k.jScrollPane.data("jsp").disable(), window.ob = r, d.ec(r), window.b = hoverPageObject.match({
                                left: e,
                                top: g
                            }, z), window.a = hoverPageObject.match({
                                left: e - 1,
                                top: g - 1
                            }, z), d.N = hoverPageObject.Xc(r, d.oa)));
                        }
                    }, 800));
                    if (d.va || eb.platform.touchdevice) {
                        if (!hoverPageObject) {
                            if (eb.platform.touchdevice) {
                                if (c.target && (c.target.id && 0 <= c.target.id.indexOf("page") && 0 <= c.target.id.indexOf("word")) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = Ca(d.p, hoverPage)), !hoverPageObject) {
                                    window.a = s;
                                    return;
                                }
                            } else {
                                window.a = s;
                                return;
                            }
                        }
                        d.j == d.H() && 1 < d.scale ? window.a = hoverPageObject.Tg(c.target.id) : window.a = hoverPageObject.match({
                            left: e,
                            top: g
                        }, r);
                        if (window.a) {
                            return window.ob = r, d.ec(), d.N = hoverPageObject.Xc(z, d.oa), z;
                        }
                        !jQuery(c.target).hasClass("flowpaper_tblabelbutton") && (!jQuery(c.target).hasClass("flowpaper_tbtextbutton") && !jQuery(c.target).hasClass("flowpaper_colorselector") && !jQuery(c.target).hasClass("flowpaper_tbbutton")) && !eb.platform.touchdevice && (d.ec(), d.N = hoverPageObject.Xc(z, d.oa));
                        window.ob = z;
                        return r;
                    }
                    window.a = hoverPageObject ? hoverPageObject.match({left: e, top: g}, r) : s;
                }
            }
        }, Mc: function () {
            this.width || (this.width = this.A.width());
            return this.width;
        }, Rh: function () {
            return this.k != s ? this.j != this.H() ? this.k.D + 1 : this.k.D : 1;
        }, bindEvents: function () {
            var c = this;
            hoverPage = 0;
            hoverPageObject = s;
            c.A.bind("mousemove", function (d) {
                return c.ng(d);
            });
            c.A.bind("mousedown", function (d) {
                return c.mg(d);
            });
            c.A.bind("mouseup", function (d) {
                return c.og(d);
            });
            var d = jQuery._data(jQuery(window)[0], "events");
            eb.platform.android ? jQuery(window).bind("orientationchange", function (d) {
                c.Mf(d);
            }) : jQuery(window).bind("resize", function (d) {
                c.Mf(d);
            });
            jQuery(window).bind("orientationchange", function (d) {
                c.Lj(d);
            });
            d && d.resize && (c.mh = d.resize[d.resize.length - 1]);
            if (!c.document.DisableOverflow) {
                try {
                    jQuery.get(c.config.localeDirectory + c.document.localeChain + "/FlowPaper.txt", function (d) {
                        c.toolbar.Pg(d);
                        c.Df();
                    }).error(function () {
                        c.Df();
                        J("Failed loading supplied locale (" + c.document.localeChain + ")");
                    }), c.toolbar.Pg("");
                } catch (e) {
                }
            }
            c.uc || (c.uc = "");
        }, Lj: function (c) {
            var d = this;
            d.Re = r;
            if (window.zine && d.j == d.H()) {
                var e = window.screen && window.screen.orientation ? window.screen.orientation.angle : window.orientation;
                if ("Flip-SinglePage" != d.document.InitViewMode) {
                    switch (e) {
                        case 270:
                        case -90:
                        case 90:
                            d.u.Bc = "Flip-SinglePage" != d.config.document.TouchInitViewMode ? z : r;
                            break;
                        default:
                            d.u.Bc = r;
                    }
                }
                d.u.vl = d.u.ml();
                setTimeout(function () {
                    d.j = "";
                    d.switchMode(d.H(), d.getCurrPage() - 1);
                    d.Re = z;
                    window.scrollTo(0, 0);
                }, 500);
                jQuery(".flowpaper_glyphcanvas").css("z-index", -1);
            }
            if (d.j == S || d.j == X) {
                d.config.document.FitPageOnLoad && d.fitheight(), d.config.document.FitWidthOnLoad && d.fitwidth(), d.A.height("auto"), setTimeout(function () {
                    requestAnim(function () {
                        d.Mf(c);
                        d.A.height("auto");
                        d.Re = z;
                    });
                }, 1000);
            }
        }, Mf: function (c) {
            if (!this.document.DisableOverflow && !this.Re && !jQuery(c.target).hasClass("flowpaper_note")) {
                c = this.A.width();
                var d = this.A.height(), e = z, g = -1;
                this.zf ? g = this.zf : 0 < this.A[0].style.width.indexOf("%") && (this.zf = g = parseFloat(this.A[0].style.width.substr(0, this.A[0].style.width.length - 1) / 100));
                0 < g && (c = 0 == this.A.parent().width() ? jQuery(document).width() * g : this.A.parent().width() * g, e = r);
                g = -1;
                this.yf ? g = this.yf : 0 < this.A[0].style.height.indexOf("%") && (this.yf = g = parseFloat(this.A[0].style.height.substr(0, this.A[0].style.height.length - 1) / 100));
                0 < g && (d = 0 == this.A.parent().height() ? jQuery(window).height() * g : this.A.parent().height() * g, e = r);
                g = document.dj || document.mozFullScreen || document.webkitIsFullScreen || window.Yh || window.He;
                e && !g && this.resize(c, d);
            }
        }, Df: function () {
            var c = this;
            if (!c.document.DisableOverflow) {
                if (c.Pc || (c.Pc = c.toolbar != s && c.toolbar.Ya != s ? c.toolbar.la(c.toolbar.Ya, "LoadingPublication") : "Loading Publication"), c.Pc == s && (c.Pc = "Loading Publication"), c.Eh = window.zine && (c.renderer.config.pageThumbImagePattern && 0 < c.renderer.config.pageThumbImagePattern.length || c.config.document.LoaderImage), c.Eh) {
                    var d = new Image;
                    jQuery(d).bind("load", function () {
                        if (!c.initialized && (!c.wa || c.wa && !c.wa.jquery)) {
                            var d = this.width / 1.5, g = this.height / 1.5;
                            this.width = d;
                            this.height = g;
                            110 < d && (g = this.width / this.height, d = 110, g = d / g);
                            c.wa = jQuery(String.format("<div class='flowpaper_loader' style='position:{1};z-index:100;top:50%;left:50%;color:#ffffff;width:{5}px;margin-left:-{10}px;margin-top:-{11}px'><div style='position:relative;'><div class='flowpaper_titleloader_image' style='position:absolute;left:0px;'></div><div class='flowpaper_titleloader_progress' style='position:absolute;left:{7}px;width:{8}px;height:{6}px;background-color:#000000;opacity:0.3;'></div></div></div>", c.p, "static" == c.A.css("position") ? "relative" : "fixed", c.u.Bc && !c.cj ? "35%" : "47%", c.u.mm, c.renderer.ka(1, 200), d, g, 0, d, c.u.Bc && !c.cj ? "30%" : "40%", d / 2, g / 2));
                            c.A.append(c.wa);
                            jQuery(this).css({width: d + "px", height: g + "px"});
                            c.wa.find(".flowpaper_titleloader_image").append(this);
                        }
                    });
                    d.src = c.config.document.LoaderImage ? c.config.document.LoaderImage : c.renderer.ka(1, 200);
                } else {
                    window.zine && !(eb.browser.msie && 10 > eb.browser.version) ? (c.wa = jQuery(String.format("<div id='flowpaper_initloader_{0}' class='flowpaper_loader flowpaper_initloader' style='position:{1};margin: 0px auto;z-index:100;top:40%;left:{2}'></div>", c.p, "static" == c.A.css("position") ? "relative" : "absolute", eb.platform.iphone ? "40%" : "50%")), c.A.append(c.wa), c.yb = new CanvasLoader("flowpaper_initloader_" + c.p), c.yb.setColor("#555555"), c.yb.Lm("square"), c.yb.Im(70), c.yb.Hm(151), c.yb.Km(0.8), c.yb.Mm(2), c.yb.Jm(42), c.yb.show()) : (c.wa = jQuery(String.format("<div class='flowpaper_loader flowpaper_initloader' style='position:{2};z-index:100;'><div class='flowpaper_initloader_panel' style='{1};background-color:#ffffff;'><img src='{0}' style='vertical-align:middle;margin-top:7px;margin-left:5px;'><div style='float:right;margin-right:25px;margin-top:19px;' class='flowpaper_notifylabel'>" + c.Pc + "<br/><div style='margin-left:30px;' class='flowpaper_notifystatus'>" + c.uc + "</div></div></div></div>", c.si, "margin: 0px auto;", "static" == c.A.css("position") ? "relative" : "absolute")), c.A.append(c.wa));
                }
            }
        }, initialize: function () {
            var c = this;
            FLOWPAPER.Dg.init();
            c.lk();
            c.kk();
            c.gd = location.hash && 0 <= location.hash.substr(1).indexOf("inpublisher") ? r : z;
            c.r = jQuery("#" + c.p);
            c.toolbar = new Fa(this, this.document);
            c.Ig = c.document.ImprovedAccessibility;
            eb.platform.iphone && (!c.config.document.InitViewMode && !window.zine) && (c.ab = S);
            "BookView" == c.config.document.InitViewMode && 0 == c.document.StartAtPage % 2 && (c.document.StartAtPage += 1);
            c.config.document.TouchInitViewMode && (c.config.document.TouchInitViewMode != c.ab && eb.platform.touchonlydevice) && (c.ab = c.config.document.TouchInitViewMode);
            !c.config.document.TouchInitViewMode && (eb.platform.touchonlydevice && !window.zine) && (c.ab = X);
            if (window.zine && !c.document.DisableOverflow) {
                c.u = c.toolbar.Cd = new FlowPaperViewer_Zine(c.toolbar, this, c.r);
                if (("Portrait" == c.ab || "Portrait" == c.config.document.TouchInitViewMode) && eb.platform.touchonlydevice) {
                    c.config.document.TouchInitViewMode = c.config.document.InitViewMode = c.j = "Flip-SinglePage";
                }
                c.u.initialize();
                c.j != c.H() && (c.j = c.ab);
            } else {
                c.j = c.ab;
            }
            "CADView" == c.j && (c.j = "SinglePage");
            if (window.zine && (eb.browser.msie && 9 > eb.browser.version || eb.browser.safari && 5 > eb.browser.Mb) && !eb.platform.touchonlydevice) {
                c.document.MinZoomSize = c.MinZoomSize = 0.3, c.j = "BookView";
            }
            "0px" == c.r.css("width") && c.r.css("width", "1024px");
            "0px" == c.r.css("height") && c.r.css("height", "600px");
            c.Ne = c.j == c.H() && (eb.platform.iphone || eb.platform.Bb);
            c.A === s && !c.u && (0 < c.r.css("width").indexOf("%") && (c.zf = parseFloat(c.r[0].style.width.substr(0, c.r[0].style.width.length - 1) / 100)), 0 < c.r.css("height").indexOf("%") && (c.yf = parseFloat(c.r[0].style.height.substr(0, c.r[0].style.height.length - 1) / 100)), c.document.DisableOverflow ? (c.config.document.FitPageOnLoad = z, c.config.document.FitWidthOnLoad = r, c.A = jQuery("<div style='left:0px;top:0px;position:absolute;width:" + (window.printWidth ? window.printWidth : "210mm") + ";height:" + (window.printHeight ? window.printHeight : "297mm") + ";' class='flowpaper_viewer_container'/>")) : (c.A = jQuery("<div style='" + c.r.attr("style") + ";' class='flowpaper_viewer_wrap flowpaper_viewer_container'/>"), ("" == c.A.css("position") || "static" == c.A.css("position")) && c.A.css({position: "relative"})), c.A = c.r.wrap(c.A).parent(), c.document.DisableOverflow ? c.r.css({
                left: "0px",
                top: "0px",
                position: "relative",
                width: "100%",
                height: "100%",
                "max-width": window.printWidth ? window.printWidth : "210mm",
                "max-height": window.printHeight ? window.printHeight : "297mm"
            }).addClass("flowpaper_viewer") : c.r.css({
                left: "0px",
                top: "0px",
                position: "relative",
                width: "100%",
                height: "100%"
            }).addClass("flowpaper_viewer").addClass("flowpaper_viewer_gradient"), window.annotations && c.config.document.AnnotationToolsVisible && !c.document.DisableOverflow ? (c.xd = eb.platform.touchdevice ? 15 : 22, c.r.height(c.r.height() - c.xd)) : c.xd = 0);
            c.Jk = c.A.html();
            eb.browser.msie && jQuery(".flowpaper_initloader_panel").css("left", c.r.width() - 500);
            c.document.DisableOverflow || (c.config.Toolbar == s && 0 == jQuery("#" + c.za).length ? (c.Toolbar = c.A.prepend("<div id='" + c.za + "' class='flowpaper_toolbarstd' style='z-index:200;overflow-y:hidden;overflow-x:hidden;'></div>").parent(), c.toolbar.create(c.za)) : c.config.Toolbar != s && !(c.Toolbar instanceof jQuery) && (c.config.Toolbar = unescape(c.config.Toolbar), c.Toolbar = jQuery(c.config.Toolbar), c.Toolbar.attr("id", c.za), c.A.prepend(c.Toolbar)));
            c.Ei();
            c.document.DisableOverflow || c.resources.initialize();
            c.document.DisplayRange && (c.DisplayRange = ia(c.document.DisplayRange));
            hoverPage = 0;
            hoverPageObject = s;
            c.u != s ? c.u.pl(c.za) : window.annotations && (c.plugin = new FlowPaperViewerAnnotations_Plugin(this, this.document, c.za + "_annotations"), c.plugin.create(c.za + "_annotations"), c.plugin.bindEvents(c.g));
            c.document.DisableOverflow || (eb.platform.touchonlydevice || c.A.append("<textarea id='selector' class='flowpaper_selector' rows='0' cols='0'></textarea>"), 0 == jQuery("#printFrame_" + c.p).length && c.A.append("<iframe id='printFrame_" + c.p + "' name='printFrame_" + c.p + "' class='flowpaper_printFrame'>"));
            jQuery(c.renderer).bind("loadingProgress", function (d, e) {
                c.uh(d, e);
            });
            jQuery(c.renderer).bind("labelsLoaded", function (d, e) {
                c.rh(d, e);
            });
            jQuery(c.renderer).bind("loadingProgressStatusChanged", function (d, e) {
                c.vh(d, e);
            });
            jQuery(c.renderer).bind("UIBlockingRenderingOperation", function (d, e) {
                c.xc(d, e);
            });
            jQuery(c.renderer).bind("UIBlockingRenderingOperationCompleted", function () {
                c.$a();
            });
            jQuery(c.renderer).bind("outlineAdded", function (d, e) {
                c.dh(d, e);
            });
            $FlowPaper(c.p).dispose = c.lb;
            $FlowPaper(c.p).highlight = c.highlight;
            $FlowPaper(c.p).rotate = c.rotate;
            $FlowPaper(c.p).getCurrentRenderingMode = c.getCurrentRenderingMode;
        }, Ei: function () {
            if (!this.Fi && !this.document.DisableOverflow) {
                if (eb.platform.touchonlydevice && !this.Ne) {
                    eb.platform.touchonlydevice ? (window.zine ? this.r.height(this.r.height() - (!this.config.BottomToolbar ? 0 : 65)) : window.annotations ? this.r.height(this.r.height() - (!this.config.BottomToolbar ? 47 : 65)) : this.r.height(this.r.height() - (!this.config.BottomToolbar ? 25 : 65)), this.config.BottomToolbar && this.A.height(this.A.height() - (eb.platform.Bb ? 7 : 18))) : this.r.height(this.r.height() - 25);
                } else {
                    if (!window.zine || this.j == S) {
                        this.config.BottomToolbar ? this.r.height(this.r.height() - jQuery(this.m).height() + 11) : this.r.height(this.r.height() - 23);
                    }
                }
                this.Fi = r;
            }
        }, rh: function (c, d) {
            if (window.zine && this.u && this.u.Je) {
                var e = this.u.Je.createElement("labels");
                this.u.Je.childNodes[0].appendChild(e);
                try {
                    for (var g = 0; g < d.Lg.length; g++) {
                        var f = d.Lg[g], n = e, l = g + 1, q = this.u.Je.createElement("node");
                        q.setAttribute("pageNumber", l);
                        q.setAttribute("title", escape(f));
                        n.appendChild(q);
                    }
                } catch (h) {
                }
                this.labels = jQuery(e);
            }
        }, uh: function (c, d) {
            var e = this;
            e.uc = Math.round(100 * d.progress) + "%";
            e.wa && (e.wa.find && 0 < e.wa.find(".flowpaper_notifystatus").length) && e.wa.find(".flowpaper_notifystatus").html(e.uc);
            if (e.Eh && e.wa && e.wa.find) {
                var g = e.wa.find(".flowpaper_titleloader_progress");
                if (g) {
                    var f = e.wa.find(".flowpaper_titleloader_image");
                    if (0 < f.length) {
                        var n = f.css("width"), n = parseFloat(n.replace("px", ""));
                        requestAnim(function () {
                            (isNaN(e.uc) || parseFloat(e.uc) < Math.round(100 * d.progress)) && g.animate({
                                left: n * d.progress + "px",
                                width: n * (1 - d.progress) + "px"
                            }, 100);
                        });
                    }
                }
            }
        }, vh: function (c, d) {
            this.Pc = d.label;
            this.wa.find(".flowpaper_notifylabel").html(d.label);
        }, xc: function (c, d) {
            var e = this;
            !e.document.DisableOverflow && e.Qb === s && (e.Qb = jQuery("<div style='position:absolute;left:50%;top:50%;'></div>"), e.A.append(e.Qb), e.Qb.spin({color: "#777"}), e.ef != s && (window.clearTimeout(e.ef), e.ef = s), d.pm || (e.ef = setTimeout(function () {
                e.Qb && (e.Qb.remove(), e.Qb = s);
            }, 1000)));
        }, $a: function () {
            this.Qb && (this.Qb.remove(), this.Qb = s);
        }, show: function () {
            var c = this;
            jQuery(c.resources).bind("onPostinitialized", function () {
                setTimeout(function () {
                    c.Be();
                    c.config.document.RTLMode && (c.renderer.C && c.renderer.C.length) && (c.document.StartAtPage = c.renderer.C.length - c.document.StartAtPage + (0 == c.renderer.C.length % 2 ? 1 : 0));
                    !c.document.DisableOverflow && c.u == s ? c.toolbar.bindEvents(c.r) : c.u != s && c.u.Qf && c.toolbar.bindEvents(c.r);
                    c.u && c.u.Qf && (c.u != s && !c.document.DisableOverflow) && c.u.bindEvents(c.r);
                    c.u && !c.u.Qf ? c.rl = function () {
                        c.toolbar.bindEvents(c.r);
                        c.u.bindEvents(c.r);
                        c.Le(c.document.StartAtPage);
                        jQuery(c.r).trigger("onDocumentLoaded", c.renderer.getNumPages());
                    } : (c.Le(c.document.StartAtPage), jQuery(c.r).trigger("onDocumentLoaded", c.renderer.getNumPages()));
                }, 50);
                jQuery(c.resources).unbind("onPostinitialized");
            });
            c.resources.Tj();
        }, lb: function () {
            this.ul = r;
            this.r.unbind();
            this.r.find("*").unbind();
            this.A.find("*").unbind();
            this.A.find("*").remove();
            this.r.empty();
            this.A.empty();
            jQuery(this).unbind();
            0 == jQuery(".flowpaper_viewer_container").length && window.PDFJS && delete window.PDFJS;
            this.plugin && (jQuery(this.plugin).unbind(), this.plugin.lb(), delete this.plugin, this.plugin = s);
            jQuery(this.renderer).unbind();
            this.renderer.lb();
            delete this.renderer;
            delete this.config;
            jQuery(this.k).unbind();
            this.k.lb();
            delete this.k;
            delete window["wordPageList_" + this.p];
            window["wordPageList_" + this.p] = s;
            this.A.unbind("mousemove");
            this.A.unbind("mousedown");
            this.A.unbind("mouseup");
            jQuery(window).unbind("resize", this.mh);
            delete this.mh;
            jQuery(this.renderer).unbind("loadingProgress");
            jQuery(this.renderer).unbind("labelsLoaded");
            jQuery(this.renderer).unbind("loadingProgressStatusChanged");
            jQuery(this.renderer).unbind("UIBlockingRenderingOperation");
            jQuery(this.renderer).unbind("UIBlockingRenderingOperationCompleted");
            this.u ? this.u.lb() : this.r.parent().remove();
            var c = this.A.parent(), d = this.A.attr("style");
            this.A.remove();
            delete this.A;
            delete this.r;
            this.renderer && (delete this.renderer.Z, delete this.renderer.C, delete this.renderer.qa, delete this.renderer.Fe, delete this.renderer.Q);
            delete this.renderer;
            var e = jQuery(this.Jk);
            e.attr("style", d);
            e.attr("class", "flowpaper_viewer");
            c.append(e);
            this.plugin && delete this.plugin;
        }, tf: function () {
            var c = this;
            eb.platform.touchonlydevice ? (c.initialized = r, (!c.u && c.config.document.FitWidthOnLoad && c.j != V && c.j != T || c.j == S || c.j == X) && c.fitwidth(), (c.config.document.FitPageOnLoad || c.j == V || c.j == T || c.u) && c.fitheight(), c.k.Yd(), c.k.md()) : (c.initialized = r, c.ql || c.toolbar.Di(c.config.document.MinZoomSize, c.config.document.MaxZoomSize), c.document.DisableOverflow ? c.fitwidth() : c.config.document.FitPageOnLoad || c.j == V || c.j == T ? c.fitheight() : c.config.document.FitWidthOnLoad && c.j != V && c.j != T ? c.fitwidth() : c.Zoom(c.config.document.Scale));
            (!c.document.StartAtPage || 1 == c.document.StartAtPage) && c.j != c.H() && c.r.trigger("onCurrentPageChanged", c.k.D + 1);
            c.document.StartAtPage && 1 != c.document.StartAtPage && c.k.scrollTo(c.document.StartAtPage);
            c.u && c.u.tf();
            c.wa && c.wa.fadeOut ? c.wa.fadeOut(300, function () {
                c.wa && (c.wa.remove(), c.A.find(".flowpaper_loader").remove(), c.yb && (c.yb.Tl(), delete c.yb), delete c.wa, c.yb = s, jQuery(c.k.F).fadeIn(300, B()), c.PreviewMode && c.u.Za.Tf(c.k, c.r));
            }) : (c.A.find(".flowpaper_loader").remove(), jQuery(c.k.F).fadeIn(300, B()), c.PreviewMode && c.u.Za.Tf(c.k, c.r));
            c.r.trigger("onInitializationComplete");
        }, Be: function () {
            this.renderer.ug = z;
            if (this.k) {
                for (var c = 0; c < this.document.numPages; c++) {
                    this.k.k[c] && window.clearTimeout(this.k.k[c].Xb);
                }
            }
            this.M = 1;
            this.r.find("*").unbind();
            this.r.find("*").remove();
            this.r.empty();
            this.uc = 0;
            this.renderer.fd = z;
            jQuery(".flowpaper_glyphcanvas").css("z-index", -1);
            jQuery(this.Lf).remove();
            this.u && this.u.Be();
        }, Le: function (c) {
            this.k = new Ea(this.r, this, this.p, c);
            this.k.create(this.r);
        }, previous: function () {
            var c = this;
            !c.uf && c.j != c.H() ? (c.uf = setTimeout(function () {
                window.clearTimeout(c.uf);
                c.uf = s;
            }, 700), c.k.previous()) : c.j == c.H() && c.k.previous();
        }, dh: function () {
            for (var c = jQuery.parseXML("<UIConfig></UIConfig>"), d = c.createElement("outline"), e = 0; e < this.renderer.outline.length; e++) {
                ja(c, this.renderer.outline[e], d, this.renderer);
            }
            this.outline = jQuery(d);
        }, expandOutline: function () {
            var c = this;
            c.Ua && c.Kd();
            if (!c.Hb && c.outline && !(c.outline && 0 == c.outline.length)) {
                c.U = c.r.width();
                c.ia = c.r.height();
                var d = c.Pc = c.toolbar != s && c.toolbar.Ya != s ? c.toolbar.la(c.toolbar.Ya, "TOC", "Table of Contents") : "Table of Contents",
                    e = window.zine ? jQuery(c.m).css("background-color") : "transparent",
                    g = window.zine ? "transparent" : "#c8c8c8", f = c.j == c.H() ? "40px" : jQuery(c.m).height() + 2;
                c.H();
                var n = c.j == c.H() ? 30 : 40, l = c.j == c.H() ? 0 : 41,
                    q = c.u && !c.u.$m ? jQuery(c.m).offset().top + jQuery(c.m).outerHeight() : 0,
                    h = c.j == c.H() ? c.A.height() : parseFloat(jQuery(c.k.F).css("height")) - 10,
                    A = c.j == c.H() && eb.platform.touchonlydevice;
                c.Wd = c.A.find(c.m).css("margin-left");
                "rgba(0, 0, 0, 0)" == e.toString() && (e = "#555");
                c.A.append(jQuery(String.format("<div class='flowpaper_toc' style='position:absolute;left:0px;top:0px;height:{5}px;width:{2};min-width:{3};opacity: 0;z-index:150;background:{9}'><div style='padding: 10px 10px 10px 10px;background-color:{6};height:{7}px'><div style='height:25px;width:100%'><div class='flowpaper_tblabel' style='margin-left:10px; width: 100%;height:25px;'><img src='{1}' style='vertical-align: middle;width:14px;height:auto;'><span style='margin-left:10px;vertical-align: middle;{10}'>{0}</span><img src='{4}' style='float:right;margin-right:5px;cursor:pointer;' class='flowpaper_toc_close' /></div><hr size='1' color='#ffffff' /></div></div>" + (window.zine ? "" : "<div class='flowpaper_bottom_fade'></div></div>"), d, c.ti, "20%", "250px", c.Ke, h, e, h - 20, q, g, A ? "font-size:1.4em;" : "")));
                c.Hb = c.A.find(".flowpaper_toc");
                jQuery(c.Hb.children()[0]).css({"border-radius": "3px", "-moz-border-radius": "3px"});
                jQuery(c.Hb.children()[0]).append("<div class='flowpaper_toc_content' style='display:block;position:relative;height:" + (jQuery(c.Hb.children()[0]).height() - n) + "px;margin-bottom:50px;width:100%;overflow-y: auto;overflow-x: hidden;'><ul class='flowpaper_accordionSkinClear'>" + ta(c, c.outline.children()).html() + "</ul></div>");
                d = jQuery(".flowpaper_accordionSkinClear").children();
                0 < d.children().length && (d = jQuery(d.get(0)).children(), 0 < d.children().length && jQuery(d.find("li").get(0)).addClass("cur"));
                window.zine ? (jQuery(c.m).css("opacity", 0.7), 600 < c.Mc() && c.resize(c.r.width(), c.r.height() + l, z, B())) : c.j != V && c.j != c.H() && c.resize(c.r.width(), c.A.height() + 1, z, B());
                jQuery(".flowpaper_accordionSkinClear").vj();
                jQuery(".flowpaper-tocitem").bind("mousedown", function () {
                    c.gotoPage(jQuery(this).data("pagenumber"));
                });
                c.j == c.H() ? (l = c.A.width() - c.r.width(), c.r.animate({left: Math.abs(l) + "px"}, 0)) : c.r.animate({left: c.Hb.width() + "px"}, 0);
                l = 0.5 * c.Hb.width();
                jQuery(c.m).width() + l > c.A.width() && (l = 0);
                jQuery(c.m).animate({"margin-left": parseFloat(c.Wd) + l + "px"}, 200, function () {
                    if (window.onresize) {
                        window.onresize();
                    }
                });
                0 == l && c.Hb.css({top: f, height: c.r.height() - 40 + "px"});
                c.j == c.H() && c.u.Sm();
                c.Hb.fadeTo("fast", 1);
                c.A.find(".flowpaper_toc_close").bind("mousedown", function () {
                    c.Hg();
                });
            }
        }, Hg: function () {
            this.Hb.hide();
            this.A.find(".flowpaper_tocitem, .flowpaper_tocitem_separator").remove();
            this.Hb.remove();
            this.Hb = s;
            window.zine && (jQuery(this.m).css("opacity", 1), 600 < this.Mc() && this.resize(this.U, this.ia + 33, z));
            this.r.css({left: "0px"});
            jQuery(this.m).animate({"margin-left": parseFloat(this.Wd) + "px"}, 200);
            this.j == this.H() && this.u.Kd();
        }, setCurrentCursor: function (c) {
            "ArrowCursor" == c && (this.va = z, addCSSRule(".flowpaper_pageword", "cursor", "default"), window.annotations || jQuery(".flowpaper_pageword_" + this.p).remove());
            "TextSelectorCursor" == c && (this.va = r, this.oa = "flowpaper_selected_default", addCSSRule(".flowpaper_pageword", "cursor", "text"), window.annotations || (this.k.getPage(this.k.D - 1), this.k.getPage(this.k.D - 2), jQuery(".flowpaper_pageword_" + this.p).remove(), this.k.ma()));
            this.u && this.u.setCurrentCursor(c);
            this.k.setCurrentCursor(c);
            jQuery(this.m).trigger("onCursorChanged", c);
        }, highlight: function (c) {
            var d = this;
            jQuery.ajax({
                type: "GET", url: c, dataType: "xml", error: B(), success: function (c) {
                    jQuery(c).find("Body").attr("color");
                    c = jQuery(c).find("Highlight");
                    var g = 0, f = -1, n = -1;
                    jQuery(c).find("loc").each(function () {
                        g = parseInt(jQuery(this).attr("pg"));
                        f = parseInt(jQuery(this).attr("pos"));
                        n = parseInt(jQuery(this).attr("len"));
                        d.k.getPage(g).Cc(f, n, z);
                    });
                    d.k.ma();
                }
            });
        }, printPaper: function (c) {
            if (this.document.PrintFn) {
                this.document.PrintFn();
            } else {
                if (eb.platform.touchonlydevice) {
                    c = "current";
                } else {
                    if (!c) {
                        jQuery("#modal-print").css("background-color", "#dedede");
                        jQuery("#modal-print").smodal({minHeight: 255, appendTo: this.A});
                        jQuery("#modal-print").parent().css("background-color", "#dedede");
                        return;
                    }
                }
                "current" == c && 0 < jQuery(this.m).find(".flowpaper_txtPageNumber").val().indexOf("-") && (c = this.getCurrPage() - 1 + "-" + this.getCurrPage());
                var d = s, e = "ImagePageRenderer";
                if ("ImagePageRenderer" == this.renderer.Lc() || this.document.MixedMode || this.renderer.config.pageImagePattern && this.renderer.config.jsonfile) {
                    e = "ImagePageRenderer", d = "{key : '" + this.config.key + "',jsonfile : '" + this.renderer.config.jsonfile + "',compressedJsonFormat : " + (this.renderer.ba ? this.renderer.ba : z) + ",pageImagePattern : '" + this.renderer.config.pageImagePattern + "',JSONDataType : '" + this.renderer.config.JSONDataType + "',signature : '" + this.renderer.config.signature + "',UserCollaboration : " + this.config.UserCollaboration + "}";
                }
                "CanvasPageRenderer" == this.renderer.Lc() && (e = "CanvasPageRenderer", d = "{key : '" + this.config.key + "',jsonfile : '" + this.renderer.config.jsonfile + "',PdfFile : '" + this.renderer.file + "',compressedJsonFormat : " + (this.renderer.ba ? this.renderer.ba : z) + ",pageThumbImagePattern : '" + this.renderer.config.pageThumbImagePattern + "',pageImagePattern : '" + this.renderer.config.pageImagePattern + "',JSONDataType : '" + this.renderer.config.JSONDataType + "',signature : '" + this.renderer.config.signature + "',UserCollaboration : " + this.config.UserCollaboration + "}");
                if (0 < jQuery("#printFrame_" + this.p).length) {
                    var g = window.printFrame = eb.browser.msie || eb.browser.ic ? window.open().document : jQuery("#printFrame_" + this.p)[0].contentWindow.document || jQuery("#printFrame_" + this.p)[0].contentDocument,
                        f = "", n = Math.floor(this.renderer.getDimensions()[0].width),
                        l = Math.floor(this.renderer.getDimensions()[0].height);
                    jQuery("#printFrame_" + this.p).css({width: ua(n) + "px", height: ua(l) + "px"});
                    g.open();
                    f += "<!doctype html><html>";
                    f += "<head>";
                    f += "<script type='text/javascript' src='" + this.config.jsDirectory + "jquery.min.js'>\x3c/script>";
                    f += "<script type='text/javascript' src='" + this.config.jsDirectory + "jquery.extensions.min.js'>\x3c/script>";
                    f += '<script type="text/javascript" src="' + this.config.jsDirectory + 'flowpaper.js">\x3c/script>';
                    f += '<script type="text/javascript" src="' + this.config.jsDirectory + 'flowpaper_handlers.js">\x3c/script>';
                    f += "<script type='text/javascript' src='" + this.config.jsDirectory + "FlowPaperViewer.js'>\x3c/script>";
                    !eb.browser.safari && !this.renderer.rb && (f += "<script type='text/javascript'>window.printWidth = '" + n + "pt';window.printHeight = '" + l + "pt';\x3c/script>");
                    f += "<style type='text/css' media='print'>html, body { height:100%; } body { margin:0; padding:0; } .flowpaper_ppage { clear:both;display:block;max-width:" + n + "pt !important;max-height:" + l + "pt !important;margin-top:0px;} .ppage_break { page-break-after : always; } .ppage_none { page-break-after : avoid; }</style>";
                    this.renderer.rb ? this.renderer.rb && (f += "<style type='text/css' media='print'>@page { size: auto; margin: 0mm; }</style>") : f += "<style type='text/css' media='print'>@supports ((size:A4) and (size:1pt 1pt)) {@page { margin: 0mm 0mm 0mm 0mm; size: " + n + "pt " + l + "pt;}}</style>";
                    f += "<link rel='stylesheet' type='text/css' href='" + this.config.cssDirectory + "flowpaper.css' />";
                    f += "</head>";
                    f += "<body>";
                    f += '<script type="text/javascript">';
                    f += "function waitForLoad(){";
                    f += "if(window.jQuery && window.$FlowPaper && window.print_flowpaper_Document && window.CryptoJS){";
                    f += "window.focus();";
                    f += "window.print_flowpaper_Document('" + e + "'," + d + ",'" + c + "', " + this.Rh() + ", " + this.getTotalPages() + ", '" + this.config.jsDirectory + "');";
                    f += "jQuery('#documentViewer').bind('onDocumentLoaded',function(e,totalPages){";
                    f += "var ml = " + JSON.stringify(this.plugin.df()) + ";";
                    f += "$FlowPaper('documentViewer').addMarks(ml);";
                    f += "});";
                    f += "}else{setTimeout(function(){waitForLoad();},1000);}";
                    f += "}";
                    f += "waitForLoad();";
                    f += "\x3c/script>";
                    f += "</body></html>";
                    g.write(f);
                    eb.browser.msie || setTimeout("window['printFrame'].close();", 3000);
                    eb.browser.msie && 9 <= eb.browser.version && g.close();
                }
            }
        }, switchMode: function (c, d) {
            var e = this;
            if (e.j != c && !(("TwoPage" == c || "BookView" == c) && 2 > e.getTotalPages())) {
                d > e.getTotalPages() && (d = e.getTotalPages()), e.Ua && e.Kd(), jQuery(e.k.F).$i(function () {
                    e.u && e.u.switchMode(c, d);
                    "Tile" == c && (e.j = W);
                    c == S && (e.j = e.ab == X ? X : S);
                    c == X && (e.j = X);
                    c == V && (e.j = V);
                    c == T && (e.j = T);
                    e.Be();
                    e.k.ck();
                    e.renderer.Fc = -1;
                    e.renderer.Z && e.renderer.Z.saveState();
                    c != V && c != T && (d != s ? e.k.D = d - 1 : d = 1);
                    e.Le(d);
                    jQuery(e.m).trigger("onViewModeChanged", c);
                    setTimeout(function () {
                        !eb.platform.touchdevice || eb.platform.touchdevice && (c == X || c == S) ? e.fitheight() : c != V && (c != T && c != e.H()) && e.fitwidth();
                        c != V && c != T && e.Yc(d);
                    }, 100);
                });
            }
        }, fitwidth: function () {
            if (!(this.j == V || this.j == T || this.j == W)) {
                var c = jQuery(this.k.F).width() - (this.document.DisableOverflow ? 0 : 15);
                this.Ua && (c -= 100);
                var d = 1 < this.getTotalPages() ? this.M - 1 : 0;
                0 > d && (d = 0);
                this.DisplayRange && (d = this.DisplayRange[0] - 1);
                var e = this.k.getPage(d).dimensions.U / this.k.getPage(d).dimensions.ia;
                if (eb.platform.touchonlydevice) {
                    g = c / (this.k.getPage(d).pa * e) - (this.document.DisableOverflow ? 0 : 0.03), window.FitWidthScale = g, this.Ea(g), this.k.Ff();
                } else {
                    var g = c / (this.k.getPage(d).pa * this.document.MaxZoomSize * e) - (this.document.DisableOverflow ? 0 : 0.012);
                    if (90 == this.k.getPage(d).rotation || 270 == this.k.getPage(d).rotation) {
                        g = this.Jc();
                    }
                    window.FitWidthScale = g;
                    jQuery(this.m).trigger("onScaleChanged", g / this.document.MaxZoomSize);
                    if (this.document.DisableOverflow) {
                        for (var f = ua(parseFloat(window.printHeight)) - 0, n = this.k.getPage(d).pa * this.document.MaxZoomSize * g, l = this.k.getPage(d).pa * this.k.getPage(d).bd() * this.document.MaxZoomSize * g, q = 0; n > f;) {
                            g = c / (this.k.getPage(d).pa * this.document.MaxZoomSize * e) + q, n = this.k.getPage(d).pa * this.document.MaxZoomSize * g, l = this.k.getPage(d).pa * this.k.getPage(d).bd() * this.document.MaxZoomSize * g, q -= 0.0001;
                        }
                        this.A.css("width", Math.floor(l) + "px");
                        this.A.css("height", Math.floor(n) + "px");
                    }
                    g * this.document.MaxZoomSize >= this.document.MinZoomSize && g <= this.document.MaxZoomSize && (this.j == S ? this.Ea(this.document.MaxZoomSize * g, {Bd: r}) : this.Ea(this.document.MaxZoomSize * g));
                }
            }
        }, getCurrentRenderingMode: function () {
            return this.renderer instanceof CanvasPageRenderer ? "html5" : "html";
        }, Ea: function (c, d) {
            var e = this;
            if (e.initialized && e.k) {
                e.j == e.H() && 1 == c && (d = d || {}, d.Bd = r);
                if (!d || d && !d.Bd) {
                    var g = 100 / (100 * e.document.ZoomInterval);
                    c = Math.round(c * g) / g;
                }
                e.j == e.H() && 1 > c && (c = 1);
                jQuery(e.m).trigger("onScaleChanged", c / e.document.MaxZoomSize);
                var g = jQuery(e.k.F).prop("scrollHeight"), f = jQuery(e.k.F).scrollTop(), g = 0 < f ? f / g : 0;
                e.Vc != s && (window.clearTimeout(e.Vc), e.Vc = s);
                e.k.bk() && e.scale != c && (jQuery(".flowpaper_annotation_" + e.p).remove(), jQuery(".flowpaper_pageword_" + e.p).remove());
                e.Vc = setTimeout(function () {
                    e.lc();
                    e.k && e.k.ma();
                }, 500);
                if (0 < c) {
                    c < e.config.document.MinZoomSize && (c = this.config.document.MinZoomSize);
                    c > e.config.document.MaxZoomSize && (c = this.config.document.MaxZoomSize);
                    e.k.Ta(c, d);
                    e.scale = c;
                    (!d || d && !d.Qh) && e.k.k[0] && e.k.k[0].yd();
                    jQuery(e.m).trigger("onZoomFactorChanged", {ad: c, g: e});
                    if ("undefined" != window.FitWidthScale && Math.round(100 * window.FitWidthScale) == Math.round(100 * (c / e.document.MaxZoomSize))) {
                        if (jQuery(e.m).trigger("onFitModeChanged", "FitWidth"), window.onFitModeChanged) {
                            window.onFitModeChanged("Fit Width");
                        }
                    } else {
                        if ("undefined" != window.FitHeightScale && Math.round(100 * window.FitHeightScale) == Math.round(100 * (c / e.document.MaxZoomSize))) {
                            if (jQuery(e.m).trigger("onFitModeChanged", "FitHeight"), window.onFitModeChanged) {
                                window.onFitModeChanged("Fit Height");
                            }
                        } else {
                            if (jQuery(e.m).trigger("onFitModeChanged", "FitNone"), window.onFitModeChanged) {
                                window.onFitModeChanged("Fit None");
                            }
                        }
                    }
                    e.j != e.H() && (e.k.md(), e.k.Sd(), e.k.Ff(), f = jQuery(e.k.F).prop("scrollHeight"), eb.browser.Da.Ia && (!d || d && !d.Qh ? jQuery(e.k.F).scrollTo({
                        left: "50%",
                        top: f * g + "px"
                    }, 0, {axis: "xy"}) : jQuery(e.k.F).scrollTo({top: f * g + "px"}, 0, {axis: "y"})));
                }
            }
        }, lc: function () {
            if (this.renderer) {
                this.Vc != s && (window.clearTimeout(this.Vc), this.Vc = s);
                "CanvasPageRenderer" == this.renderer.Lc() && (jQuery(".flowpaper_pageword_" + this.p + ":not(.flowpaper_selected_searchmatch)").remove(), window.annotations && this.k.ma());
                this.k.ye && (0 <= this.k.ye && this.k.k[this.k.ye].Ha) && this.renderer.Ob(this.k.k[this.k.ye], r);
                for (var c = 0; c < this.document.numPages; c++) {
                    this.k.La(c) && (c != this.k.ye && this.k.k[c]) && (this.k.k[c].Ha ? this.renderer.Ob(this.k.k[c], r) : this.k.k[c].na = z);
                }
            }
        }, Zoom: function (c, d) {
            !eb.platform.touchonlydevice || !(this.j == V || this.j == T) ? (c > this.document.MaxZoomSize && (c = this.document.MaxZoomSize), c /= this.document.MaxZoomSize, jQuery(this.m).trigger("onScaleChanged", c), c * this.document.MaxZoomSize >= this.document.MinZoomSize && c <= this.document.MaxZoomSize && this.Ea(this.document.MaxZoomSize * c, d)) : 1 < c ? this.j == V || this.j == T ? this.k.je() : (this.j == S || this.j == X) && this.fitwidth() : this.j == V || this.j == T ? this.k.ed() : (this.j == S || this.j == X) && this.fitheight();
        }, ZoomIn: function () {
            this.Zoom(this.scale + 3 * this.document.ZoomInterval);
        }, ZoomOut: function () {
            if (this.j == S || this.j == X) {
                this.k.jScrollPane != s ? (this.k.jScrollPane.data("jsp").scrollTo(0, 0, z), this.k.jScrollPane.data("jsp").reinitialise(this.Lb)) : this.k.z(this.k.F).parent().scrollTo({
                    left: 0,
                    top: 0
                }, 0, {axis: "xy"});
            }
            this.Zoom(this.scale - 3 * this.document.ZoomInterval);
        }, xh: function () {
            var c = this;
            if (!eb.platform.mobilepreview && !eb.platform.Bb && (c.Hb && c.Hg(), !c.Ua)) {
                c.A.find(".flowpaper_searchabstract_result, .flowpaper_searchabstract_result_separator").remove();
                var d = c.Pc = c.toolbar != s && c.toolbar.Ya != s ? c.toolbar.la(c.toolbar.Ya, "Search") : "Search",
                    e = c.j == c.H() ? c.A.height() - 0 : parseFloat(jQuery(c.k.F).css("height")) - 10,
                    f = c.j == c.H() ? jQuery(c.m).css("background-color") : "#c8c8c8",
                    m = c.j == c.H() ? "40px" : jQuery(c.m).height() + 2,
                    n = c.j == c.H() ? "color:#ededed" : "color:#555555;", l = (c.H(), 40), q = c.j == c.H() ? 0 : 41;
                "rgba(0, 0, 0, 0)" == f.toString() && (f = "#555");
                c.Wd = c.A.find(c.m).css("margin-left");
                c.j == c.H() ? (jQuery(c.m).css("opacity", 0.7), c.A.append(jQuery(String.format("<div class='flowpaper_searchabstracts' style='position:absolute;left:0px;top:{8}px;height:{5}px;width:{2};min-width:{3};opacity: 0;z-index:50;{9}'><div style='padding: 10px 10px 10px 10px;background-color:{6};height:{7}px'><div style='height:25px;width:100%'><div class='flowpaper_tblabel' style='margin-left:10px; width: 100%;height:25px;'><img src='{1}' style='vertical-align: middle'><span style='margin-left:10px;vertical-align: middle'>{0}</span><img src='{4}' style='float:right;margin-right:5px;cursor:pointer;' class='flowpaper_searchabstracts_close' /></div><hr size='1' color='#ffffff' /></div></div>", d, c.Rf, "20%", "250px", c.Ke, e, f, e - 20, 0, !c.u.backgroundImage ? "background-color:" + c.u.backgroundColor : ""))), c.Ua = c.A.find(".flowpaper_searchabstracts"), jQuery(c.Ua.children()[0]).css({
                    "border-radius": "0 3px 3px 0px",
                    "-moz-border-radius": "3px"
                }), jQuery(c.Ua.children()[0]).append("<div class='flowpaper_searchabstracts_content' style='display:block;position:relative;height:" + (jQuery(c.Ua.children()[0]).height() - l) + "px;margin-bottom:50px;width:100%;overflow-y: auto;overflow-x: hidden;'></div>"), c.resize(c.r.width(), c.r.height() + q, z, B()), d = c.A.width() - c.r.width(), c.r.animate({left: Math.abs(d) + "px"}, 0)) : (c.A.append(jQuery(String.format("<div class='flowpaper_searchabstracts' style='position:absolute;left:0px;top:0px;height:{5}px;width:{2};min-width:{3};opacity: 0;z-index:13;overflow:hidden;'><div style='margin: 0px 0px 0px 0px;padding: 10px 7px 10px 10px;background-color:{6};height:{7}px'><div style='height:25px;width:100%' <div class='flowpaper_tblabel' style='margin-left:10px; width: 100%;height:25px;'><img src='{1}' style='vertical-align: middle'><span style='margin-left:10px;vertical-align: middle'>{0}</span><img src='{4}' style='float:right;margin-right:5px;cursor:pointer;' class='flowpaper_searchabstracts_close' /></div><div class='flowpaper_bottom_fade'></div></div></div>", d, c.Rf, "20%", "250px", c.Ke, parseFloat(jQuery(c.k.F).css("height")) + 10, f, c.A.height() - 58))), c.Ua = c.A.find(".flowpaper_searchabstracts"), jQuery(c.Ua.children()[0]).append("<div class='flowpaper_searchabstracts_content' style='display:block;position:relative;height:" + e + "px;margin-bottom:50px;width:100%;overflow-y: auto;overflow-x: hidden;'></div>"), c.j != V && c.j != c.H() && c.resize(c.r.width(), c.A.height() + 1, z, B()), c.r.animate({left: c.Ua.width() / 2 + "px"}, 0), c.document.FitWidthOnLoad ? c.fitwidth() : c.fitheight());
                d = 0.5 * c.Ua.width();
                jQuery(c.m).width() + d > c.A.width() && (d = 0);
                jQuery(c.m).animate({"margin-left": parseFloat(c.Wd) + d + "px"}, 200, function () {
                    if (window.onresize) {
                        window.onresize();
                    }
                });
                0 == d && c.Ua.css({top: m, height: parseFloat(jQuery(c.k.F).css("height")) + 10 + "px"});
                c.j == c.H() && c.u.xh();
                c.Ua.fadeTo("fast", 1);
                var h = c.A.find(".flowpaper_searchabstracts_content");
                jQuery(c).bind("onSearchAbstractAdded", function (d, e) {
                    var f = e.rc.fragment;
                    100 < f.length && (f = f.substr(0, 100) + "...");
                    f = f.replace(RegExp(c.kc, "g"), "<font style='color:#ffffff'>[" + c.kc + "]</font>");
                    f = "<b>p." + c.toolbar.nc(e.rc.pageIndex + 1, e.rc.pageIndex + 1, r) + "</b> : " + f;
                    h.append(jQuery(String.format("<div id='flowpaper_searchabstract_item_{1}' style='{2}' class='flowpaper_searchabstract_result'>{0}</div><hr size=1 color='#777777' style='margin-top:8px;' class='flowpaper_searchabstract_result_separator' />", f, e.rc.id, n)));
                    jQuery("#flowpaper_searchabstract_item_" + e.rc.id).bind("mousedown", function (d) {
                        c.sa = e.rc.pageIndex + 1;
                        c.wc = e.rc.fk;
                        c.hb = -1;
                        c.searchText(c.kc, z);
                        d.preventDefault && d.preventDefault();
                        d.returnValue = z;
                    });
                    jQuery("#flowpaper_searchabstract_item_" + e.rc.id).bind("mouseup", function (c) {
                        c.preventDefault && c.preventDefault();
                        c.returnValue = z;
                    });
                });
                c.A.find(".flowpaper_searchabstracts_close").bind("mousedown", function () {
                    c.Kd();
                });
            }
        }, Kd: function () {
            this.Ua && (this.r.css({left: "0px"}), this.Ua.remove(), this.Ua = s, this.A.find(".flowpaper_searchabstract_result, .flowpaper_searchabstract_result_separator").remove(), this.j == this.H() ? (jQuery(this.m).css("opacity", 1), this.resize(this.A.width(), this.r.height(), z)) : this.j == V ? (this.r.css({
                left: "0px",
                width: "100%"
            }), this.fitheight()) : this.resize(this.A.width(), this.A.height() + 1, z), jQuery(this.m).animate({"margin-left": parseFloat(this.Wd) + "px"}, 200), this.j == this.H() && this.u.Kd());
            jQuery(this).unbind("onSearchAbstractAdded");
        }, Kg: function (c, d) {
            jQuery(".flowpaper_searchabstract_blockspan").remove();
            var e = this.renderer.getNumPages();
            d || (d = 0);
            for (var f = d; f < e; f++) {
                this.Ci(f, c);
            }
            this.j != this.H() && this.A.find(".flowpaper_searchabstracts_content").append(jQuery("<div class='flowpaper_searchabstract_blockspan' style='display:block;clear:both;height:200px'></div>"));
        }, Ci: function (c, d) {
            var e = this.renderer.Q;
            if (e[c] != s) {
                -1 < e[c].toLowerCase().indexOf("actionuri") && (e[c] = e[c].replace(/actionuri(.*?)\):/gi, ""));
                -1 < e[c].toLowerCase().indexOf("actiongotor") && (e[c] = e[c].replace(/actiongotor(.*?)\):/gi, ""));
                -1 < e[c].toLowerCase().indexOf("actiongoto") && (e[c] = e[c].replace(/actiongoto(.*?)\):/gi, ""));
                for (var f = e[c].toLowerCase().indexOf(d), m = 0; 0 <= f;) {
                    var n = 0 < f - 50 ? f - 50 : 0, l = f + 75 < e[c].length ? f + 75 : e[c].length,
                        q = this.Cb.length;
                    this.Cb.Sc[q] = [];
                    this.Cb.Sc[q].pageIndex = c;
                    this.Cb.Sc[q].fk = m;
                    this.Cb.Sc[q].id = this.p + "_" + c + "_" + m;
                    this.Cb.Sc[q].fragment = e[c].substr(n, l - n);
                    f = e[c].toLowerCase().indexOf(d, f + 1);
                    jQuery(this).trigger("onSearchAbstractAdded", {rc: this.Cb.Sc[q]});
                    m++;
                }
            } else {
                this.nh == s && this.Gh(d, c);
            }
        }, Gh: function (c, d) {
            var e = this;
            e.nh = setTimeout(function () {
                e.renderer.Ub == s ? e.renderer.hc(d + 1, z, function () {
                    e.nh = s;
                    e.Kg(c, d);
                }) : e.Gh(c, d);
            }, 100);
        }, searchText: function (c, d) {
            var e = this;
            if (!(c == s || c != s && 0 == c.length)) {
                if (d === k && (e.j == S || e.j == X || e.j == V || e.j == e.H()) && e.document.EnableSearchAbstracts && !eb.platform.mobilepreview) {
                    d = r;
                }
                d && (e.j == e.H() && 1 < e.scale) && (e.renderer.yc && e.renderer.we && e.renderer.we(), e.Zoom(1));
                jQuery(e.m).find(".flowpaper_txtSearch").val() != c && jQuery(e.m).find(".flowpaper_txtSearch").val(c);
                if (e.j == W) {
                    e.switchMode(S), setTimeout(function () {
                        e.searchText(c);
                    }, 1000);
                } else {
                    var f = e.renderer.Q, m = e.renderer.getNumPages();
                    e.Ce || (e.Ce = 0);
                    if (0 == e.renderer.Z.qa.length && 10 > e.Ce) {
                        window.clearTimeout(e.gk), e.gk = setTimeout(function () {
                            e.searchText(c, d);
                        }, 500), e.Ce++;
                    } else {
                        e.Ce = 0;
                        e.wc || (e.wc = 0);
                        e.sa || (e.sa = -1);
                        c != s && 0 < c.length && (c = c.toLowerCase());
                        e.kc != c && (e.hb = -1, e.kc = c, e.wc = 0, e.sa = -1, e.Cb = [], e.Cb.Sc = []);
                        -1 == e.sa ? (e.sa = parseInt(e.M), e.config.document.RTLMode && (e.sa = parseInt(e.M) - m + 1)) : e.hb += c.length;
                        0 == e.Cb.Sc.length && (e.Cb.searchText != c && d) && (e.Cb.searchText != c && e.A.find(".flowpaper_searchabstract_result, .flowpaper_searchabstract_result_separator").remove(), e.Cb.searchText = c, e.xh(), e.Kg(c));
                        1 > e.sa && (e.sa = 1);
                        for (; e.sa - 1 < m;) {
                            var n = f[e.sa - 1];
                            if (e.renderer.da && n == s) {
                                jQuery(e.renderer).trigger("UIBlockingRenderingOperation", e.p);
                                e.sk = e.sa;
                                e.renderer.hc(e.sa, z, function () {
                                    n = f[e.sa - 1];
                                    e.sk = s;
                                });
                                return;
                            }
                            e.hb = n.indexOf(c, -1 == e.hb ? 0 : e.hb);
                            if (0 <= e.hb) {
                                e.M != e.sa && (e.j == e.H() && e.M != e.sa + 1 || e.j == T && e.M != e.sa + 1 || e.j == V && e.M != e.sa - 1 || e.j == X && e.M != e.sa) && (e.j == V || e.j == T || e.j == X || e.j == e.H()) ? e.gotoPage(e.sa, function () {
                                    e.hb -= c.length;
                                    e.searchText(c);
                                }) : (e.wc++, e.renderer.dc ? this.k.getPage(e.sa - 1).load(function () {
                                    e.k.getPage(e.sa - 1).xb(e.kc, z, e.hb);
                                }) : (e.j == S && this.k.getPage(e.sa - 1).load(function () {
                                    e.k.getPage(e.sa - 1).xb(e.kc, z, e.hb);
                                }), (e.j == V || e.j == X || e.j == e.H()) && this.k.getPage(e.sa - 1).xb(e.kc, z, e.hb)));
                                break;
                            }
                            e.sa++;
                            e.hb = -1;
                            e.wc = 0;
                        }
                        -1 == e.hb && (e.hb = -1, e.wc = 0, e.sa = -1, e.$a(), alert(e.toolbar != s && e.toolbar.Ya != s ? e.toolbar.la(e.toolbar.Ya, "Finishedsearching") : "No more search matches."), e.gotoPage(1));
                    }
                }
            }
        }, Ed: function (c) {
            return this.k.Ed(c);
        }, Fd: function (c) {
            return this.k.Fd(c);
        }, Rb: function (c) {
            return this.k.Rb(c);
        }, Kc: function (c) {
            return this.k.Kc(c);
        }, Gd: function (c) {
            return this.k.Gd(c);
        }, fitheight: function () {
            if (this.j != this.H()) {
                try {
                    if (eb.platform.touchdevice) {
                        if (c = this.Jc()) {
                            window.FitHeightScale = c, this.Ea(c, {Bd: r}), this.k.Ff();
                        }
                    } else {
                        var c = this.Jc();
                        window.FitHeightScale = c;
                        jQuery(this.m).trigger("onScaleChanged", c / this.document.MaxZoomSize);
                        c * this.document.MaxZoomSize >= this.document.MinZoomSize && c <= this.document.MaxZoomSize && (this.j == S ? this.Ea(this.document.MaxZoomSize * c, {Bd: r}) : this.Ea(this.document.MaxZoomSize * c));
                    }
                } catch (d) {
                }
            }
        }, he: function () {
            var c = jQuery(this.k.F).width() - 15, d = 1 < this.getTotalPages() ? this.M - 1 : 0;
            0 > d && (d = 0);
            this.DisplayRange && (d = this.DisplayRange[0] - 1);
            var e = this.k.getPage(d).dimensions.U / this.k.getPage(d).dimensions.ia;
            return eb.platform.touchdevice ? c / (this.k.getPage(d).pa * e) - (this.j == X ? 0.1 : 0.03) : c / (this.k.getPage(d).pa * this.document.MaxZoomSize * e) - 0.012;
        }, Jc: function () {
            this.M - 1 && (this.M = 1);
            if (this.j == S || this.j == X || this.j == V || this.j == T) {
                var c = this.k.getPage(this.M - 1).dimensions.width / this.k.getPage(this.M - 1).dimensions.height;
                if (eb.platform.touchdevice) {
                    if (d = jQuery(this.r).height() - (this.j == V || this.j == T ? 40 : 0), this.j == X && (d -= 25), d /= this.k.getPage(this.M - 1).pa, e = this.k.getPage(this.M - 1), e = e.pa * (e.dimensions.U / e.dimensions.ia) * d, (this.j == V || this.j == T) && 2 * e > this.r.width()) {
                        d = this.r.width() - 0, d /= 4 * this.k.getPage(this.M - 1).pa;
                    }
                } else {
                    var d = jQuery(this.k.F).height() - (this.j == V || this.j == T ? 25 : 0);
                    this.document.DisableOverflow && (d = ua(parseFloat(window.printHeight)));
                    var d = d / (this.k.getPage(this.M - 1).pa * this.document.MaxZoomSize),
                        e = this.k.getPage(this.M - 1),
                        e = e.pa * (e.dimensions.U / e.dimensions.ia) * this.document.MaxZoomSize * d;
                    if ((this.j == V || this.j == T) && 2 * e > this.r.width() && !this.document.DisableOverflow) {
                        d = (jQuery(this.r).width() - (this.j == V || this.j == T ? 40 : 0)) / 1.48, d = d / 1.6 / (this.k.getPage(this.M - 1).pa * this.document.MaxZoomSize * c);
                    }
                }
                return window.FitHeightScale = d;
            }
            if (this.j == this.H()) {
                return d = 1, window.FitHeightScale = d;
            }
        }, next: function () {
            var c = this;
            !c.of && c.j != c.H() ? (c.of = setTimeout(function () {
                window.clearTimeout(c.of);
                c.of = s;
            }, 700), c.k.next()) : c.j == c.H() && c.k.next();
        }, gotoPage: function (c, d) {
            var e = this;
            e.k && (e.config.document.RTLMode && (c = e.renderer.C.length - c + 1), e.j == W ? eb.platform.ios ? e.u ? e.u.Vm(c) : e.switchMode(S, c) : e.switchMode(S, c) : (e.j == S && e.k.scrollTo(c), e.j == X && setTimeout(function () {
                e.k.Hd(c, d);
            }, 300), (e.j == V || e.j == T) && setTimeout(function () {
                e.k.Id(c, d);
            }, 300), e.u && e.u.gotoPage(c, d)));
        }, rotate: function () {
            var c = this.getCurrPage() - 1;
            -1 == c && (c = 0);
            this.k.rotate(c);
            window.annotations && (jQuery(".flowpaper_pageword_" + this.p).remove(), this.lc(), this.k.ma());
        }, getCurrPage: function () {
            return this.k != s ? this.j != this.H() ? this.k.D + 1 : this.k.D : 1;
        }, lk: function () {
            this.version = "3.3.2";
        }, kk: function () {
            this.build = "23-August-2019";
        }, getTotalPages: function () {
            return this.k.getTotalPages();
        }, Yc: function (c) {
            var d = this;
            d.j != d.H() && (this.M = c, this.k.D = this.M - 1);
            c > d.getTotalPages() && (c -= 1, this.k.D = c);
            if ((this.j == V || this.j == T) && this.k.D == this.k.getTotalPages() - 1 && 0 != this.k.D % 2) {
                this.k.D += 1;
            }
            d.u && (0 == c && (c++, this.M = c), d.u.Yc(c));
            d.tb && (jQuery(".flowpaper_mark_video_maximized").remove(), jQuery(".flowpaper_mark_video_maximized_closebutton").remove(), d.tb = s);
            var e = jQuery(".flowpaper_mark_video_" + (c - 1) + '[data-autoplay="true"]');
            if (e.length) {
                for (var f = 0; f < e.length; f++) {
                    jQuery(e[f]).trigger("mouseup");
                }
            }
            0 < jQuery(".flowpaper_mark_video").find("iframe,video").length && jQuery(".flowpaper_mark_video").find("iframe,video").each(function () {
                try {
                    var c = jQuery(this).closest(".flowpaper_page").attr("id"),
                        e = parseInt(c.substr(14, c.lastIndexOf("_") - 14));
                    if (0 == e && 0 != d.k.D - 1 || !d.u.Bc && 0 < e && e != d.k.D - 1 && e != d.k.D - 2 || d.u.Bc && e != d.k.D - 1) {
                        jQuery(this).parent().remove();
                        var f = d.k.k[e];
                        f.me(f.Dj ? f.Dj : f.scale, f.nb());
                    }
                } catch (g) {
                }
            });
            this.toolbar.Dk(c);
            d.plugin != s && (this.j == V ? d.plugin.Xe() : this.j == T && 1 != c && d.plugin.Xe(), d.plugin.Xe());
        }, openFullScreen: function () {
            var c = this;
            FLOWPAPER.getParameterByName("autoplay") && (c.document.FullScreenAsMaxWindow = r);
            if (c.gd) {
                c.A.prepend("<div id='modal-maximize' class='modal-content flowpaper_printdialog' style='overflow:hidden;;'><div style='background-color:#fff;color:#000;padding:10px 10px 10px 10px;height:155px;padding-bottom:20px;'>It's not possible to maximize the viewer from within the Desktop Publisher. <br/><br/>You can try this feature by clicking on 'Publish' and then 'View in Browser'.<br/><br/><a class='flowpaper_printdialog_button' id='bttnMaximizeDisabledOK'>OK</a></div></div>"), c.$l = jQuery("#modal-maximize").smodal({
                    minHeight: 155,
                    appendTo: c.A
                }), jQuery("#bttnMaximizeDisabledOK").bind("click", function (c) {
                    jQuery.smodal.close();
                    c.stopImmediatePropagation();
                    jQuery("#modal-maximize").remove();
                    return z;
                });
            } else {
                var d = document.dj || document.mozFullScreen || document.webkitIsFullScreen || window.Yh || window.He || document.fullscreenElement || document.msFullscreenElement,
                    e = c.A.get(0);
                if (d) {
                    return document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen(), window.He && window.close(), z;
                }
                "0" != c.A.css("top") && (c.Nj = c.A.css("top"));
                "0" != c.A.css("left") && (c.Mj = c.A.css("left"));
                c.j == c.H() && 1 < c.scale && (c.k.ed(), c.af.show(), c.af.animate({opacity: 1}, 100));
                c.U = c.A.width();
                c.ia = c.A.height();
                c.PreviewMode && c.k.rm && (c.PreviewMode = z, c.Ie = r, c.u.Za.vm(c.k, c.r), c.u.Tm());
                c.A.css({visibility: "hidden"});
                jQuery(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function () {
                    setTimeout(function () {
                        if (window.navigator.standalone || document.fullScreenElement && document.fullScreenElement != s || document.mozFullScreen || document.webkitIsFullScreen) {
                            eb.browser.safari ? window.zine ? c.resize(screen.width, screen.height) : c.config.BottomToolbar ? c.resize(screen.width, screen.height - jQuery(c.m).height() - 70) : c.resize(screen.width, screen.height - jQuery(c.m).height()) : window.zine ? c.resize(jQuery(document).width(), jQuery(document).height()) : c.resize(window.innerWidth, window.innerHeight);
                        }
                        window.annotations && (jQuery(".flowpaper_pageword_" + c.p).remove(), c.lc(), c.k.ma());
                        c.A.css({visibility: "visible"});
                    }, 500);
                    jQuery(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function () {
                        jQuery(document).unbind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange");
                        c.hf = z;
                        c.A.css({top: c.Nj, left: c.Mj});
                        c.Ie && (c.PreviewMode = r, c.u.Il(), c.u.oj(), setTimeout(function () {
                            c.PreviewMode && c.u.oj();
                        }, 1000));
                        c.j == c.H() && 1 < c.scale ? c.k.ed(function () {
                            c.af.show();
                            c.af.animate({opacity: 1}, 100);
                            c.resize(c.U, c.ia - 2);
                            jQuery(c.m).trigger("onFullscreenChanged", z);
                        }) : (c.resize(c.U, c.ia - 2), jQuery(c.m).trigger("onFullscreenChanged", z));
                        jQuery(document).unbind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange");
                        c.Ie && (c.Ie = z, c.u.Za.Tf(c.k, c.r));
                        window.annotations && (jQuery(".flowpaper_pageword_" + c.p).remove(), c.lc(), c.k.ma());
                    });
                    window.clearTimeout(c.xf);
                    c.xf = setTimeout(function () {
                        !c.PreviewMode && (c.u && c.u.Yi) && c.u.pk();
                    }, 1000);
                });
                d = eb.platform.android && !e.webkitRequestFullScreen || eb.platform.ios && !e.webkitRequestFullScreen;
                !c.document.FullScreenAsMaxWindow && document.documentElement.requestFullScreen && !d ? (c.A.css({visibility: "hidden"}), e.requestFullScreen(), c.A.css({
                    left: "0px",
                    top: "0px"
                })) : !c.document.FullScreenAsMaxWindow && document.documentElement.mozRequestFullScreen && !d ? (c.A.css({visibility: "hidden"}), e.mozRequestFullScreen(), c.A.css({
                    left: "0px",
                    top: "0px"
                })) : !c.document.FullScreenAsMaxWindow && document.documentElement.webkitRequestFullScreen && !d ? (c.A.css({visibility: "hidden"}), e.webkitRequestFullScreen(!(eb.browser.safari && 10 > eb.browser.Mb) ? {} : 0), c.A.css({
                    left: "0px",
                    top: "0px"
                })) : !c.document.FullScreenAsMaxWindow && document.documentElement.msRequestFullscreen ? (c.A.css({visibility: "hidden"}), c.hf ? (c.hf = z, window.document.msExitFullscreen()) : (c.hf = r, e.msRequestFullscreen()), setTimeout(function () {
                    c.A.css({visibility: "visible"});
                    c.resize(window.outerWidth, window.outerHeight);
                    window.annotations && (jQuery(".flowpaper_pageword_" + c.p).remove(), c.lc(), c.k.ma());
                }, 500)) : (c.Kj(), setTimeout(function () {
                    c.A.css({visibility: "visible"});
                }, 500));
                jQuery(c.m).trigger("onFullscreenChanged", r);
            }
        }, Kj: function () {
            var c = "", c = "toolbar=no, location=no, scrollbars=no, width=" + screen.width,
                c = c + (", height=" + screen.height), c = c + ", top=0, left=0, fullscreen=yes";
            nw = this.document.FullScreenAsMaxWindow ? window.open("") : window.open("", "windowname4", c);
            nw.params = c;
            c = "<!doctype html><head>";
            c += '<meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width" />';
            c += '<link rel="stylesheet" type="text/css" href="' + this.config.cssDirectory + (-1 == this.config.cssDirectory.indexOf("flowpaper.css") ? "flowpaper.css" : "") + '" />';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'jquery.min.js">\x3c/script>';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'jquery.extensions.min.js">\x3c/script>';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'flowpaper.js">\x3c/script>';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'flowpaper_handlers.js">\x3c/script>';
            c += '<style type="text/css" media="screen">body{ margin:0; padding:0; overflow-x:hidden;overflow-y:hidden; }</style>';
            c += "</head>";
            c += '<body onload="openViewer();">';
            c += '<div id="documentViewer" class="flowpaper_viewer" style="position:absolute;left:0px;top:0px;width:100%;height:100%;"></div>';
            c += '<script type="text/javascript">';
            c += "function openViewer(){";
            c += 'jQuery("#documentViewer").FlowPaperViewer(';
            c += "{ config : {";
            c += "";
            c += 'SWFFile : "' + this.document.SWFFile + '",';
            c += 'IMGFiles : "' + this.document.IMGFiles + '",';
            c += 'JSONFile : "' + this.document.JSONFile + '",';
            c += 'PDFFile : "' + this.document.PDFFile + '",';
            c += "";
            c += "Scale : " + this.scale + ",";
            c += 'ZoomTransition : "' + this.document.ZoomTransition + '",';
            c += "ZoomTime : " + this.document.ZoomTime + ",";
            c += "ZoomInterval : " + this.document.ZoomInterval + ",";
            c += "FitPageOnLoad : " + this.document.FitPageOnLoad + ",";
            c += "FitWidthOnLoad : " + this.document.FitWidthOnLoad + ",";
            c += "FullScreenAsMaxWindow : " + this.document.FullScreenAsMaxWindow + ",";
            c += "ProgressiveLoading : " + this.document.ProgressiveLoading + ",";
            c += "MinZoomSize : " + this.document.MinZoomSize + ",";
            c += "MaxZoomSize : " + this.document.MaxZoomSize + ",";
            c += "MixedMode : " + this.document.MixedMode + ",";
            c += "SearchMatchAll : " + this.document.SearchMatchAll + ",";
            c += 'InitViewMode : "' + this.document.InitViewMode + '",';
            c += 'RenderingOrder : "' + this.document.RenderingOrder + '",';
            c += "useCustomJSONFormat : " + this.document.useCustomJSONFormat + ",";
            c += 'JSONDataType : "' + this.document.JSONDataType + '",';
            this.document.JSONPageDataFormat != s && (c += "JSONPageDataFormat : {", c += 'pageWidth : "' + this.document.JSONPageDataFormat.ta + '",', c += 'pageHeight : "' + this.document.JSONPageDataFormat.ya + '",', c += 'textCollection : "' + this.document.JSONPageDataFormat.zc + '",', c += 'textFragment : "' + this.document.JSONPageDataFormat.Ma + '",', c += 'textFont : "' + this.document.JSONPageDataFormat.Vd + '",', c += 'textLeft : "' + this.document.JSONPageDataFormat.pb + '",', c += 'textTop : "' + this.document.JSONPageDataFormat.Va + '",', c += 'textWidth : "' + this.document.JSONPageDataFormat.$b + '",', c += 'textHeight : "' + this.document.JSONPageDataFormat.Zb + '"', c += "},");
            c += "ViewModeToolsVisible : " + this.document.ViewModeToolsVisible + ",";
            c += "ZoomToolsVisible : " + this.document.ZoomToolsVisible + ",";
            c += "NavToolsVisible : " + this.document.NavToolsVisible + ",";
            c += "CursorToolsVisible : " + this.document.CursorToolsVisible + ",";
            c += "SearchToolsVisible : " + this.document.SearchToolsVisible + ",";
            window.zine || (c += 'Toolbar : "' + escape(this.config.Toolbar) + '",');
            c += 'BottomToolbar : "' + this.config.BottomToolbar + '",';
            c += 'UIConfig : "' + this.document.UIConfig + '",';
            c += 'jsDirectory : "' + this.config.jsDirectory + '",';
            c += 'cssDirectory : "' + this.config.cssDirectory + '",';
            c += 'localeDirectory : "' + this.config.localeDirectory + '",';
            c += 'key : "' + this.config.key + '",';
            c += "";
            c += 'localeChain: "' + this.document.localeChain + '"';
            c += "}});";
            c += "}";
            c += "jQuery('#documentViewer').bind('onDocumentLoaded',function(e,totalPages){";
            c += "var ml = " + JSON.stringify(this.plugin.df()) + ";";
            c += "$FlowPaper('documentViewer').addMarks(ml);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onMarkCreated',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.p + "').trigger('onMarkCreated',mark);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onMarkDeleted',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.p + "').trigger('onMarkDeleted',mark);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onMarkChanged',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.p + "').trigger('onMarkChanged',mark);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onSelectedMarkChanged',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.p + "').trigger('onSelectedMarkChanged',mark);";
            c += "});";
            c += "document.fullscreen = true;";
            c += "$(document).keyup(function(e) {if (e.keyCode == 27){window.close();}});";
            c += "\x3c/script>";
            c += "</body>";
            c += "</html>";
            nw.document.write(c);
            nw.He = r;
            window.focus && nw.focus();
            nw.document.close();
            return z;
        }, resize: function (c, d, e, f) {
            var m = this;
            if (m.initialized) {
                m.width = s;
                if (m.j == m.H()) {
                    m.u.resize(c, d, e, f);
                } else {
                    m.Ua && (c -= m.Ua.width() / 2, m.r.animate({left: m.Ua.width() / 2 + "px"}, 0));
                    var n = jQuery(m.m).height() + 1 + 14, l = 0 < m.xd ? m.xd + 1 : 0;
                    m.u && (l = 37);
                    m.r.css({width: c, height: d - n - l});
                    (e == s || e == r) && this.A.css({width: c, height: d});
                    m.k.resize(c, d - n - l, f);
                    jQuery(".flowpaper_interactiveobject_" + m.p).remove();
                    jQuery(".flowpaper_pageword_" + m.p).remove();
                    (m.j == V || m.j == T) && m.fitheight();
                    window.clearTimeout(m.Qj);
                    m.Qj = setTimeout(function () {
                        m.k.ma();
                    }, 700);
                }
                m.u && m.u.Yi && (window.clearTimeout(m.xf), m.xf = setTimeout(function () {
                    m.PreviewMode || m.u.pk();
                }, 2500));
            }
        }
    };
    f.loadFromUrl = f.loadFromUrl;
    return f;
}();
window.print_flowpaper_Document = function (f, c, d, e, g) {
    FLOWPAPER.Dg.init();
    var m = Array(g + 1), n = 0;
    if ("all" == d) {
        for (var l = 1; l < g + 1; l++) {
            m[l] = r;
        }
        n = g;
    } else {
        if ("current" == d) {
            m[e] = r, n = 1;
        } else {
            if (-1 == d.indexOf(",") && -1 < d.indexOf("-")) {
                for (var q = parseInt(d.substr(0, d.toString().indexOf("-"))), h = parseInt(d.substr(d.toString().indexOf("-") + 1)); q < h + 1; q++) {
                    m[q] = r, n++;
                }
            } else {
                if (0 < d.indexOf(",")) {
                    for (var A = d.split(","), l = 0; l < A.length; l++) {
                        if (-1 < A[l].indexOf("-")) {
                            q = parseInt(A[l].substr(0, A[l].toString().indexOf("-")));
                            for (h = parseInt(A[l].substr(A[l].toString().indexOf("-") + 1)); q < h + 1; q++) {
                                m[q] = r, n++;
                            }
                        } else {
                            m[parseInt(A[l].toString())] = r, n++;
                        }
                    }
                } else {
                    isNaN(d) || (m[parseInt(d)] = r, n = 1);
                }
            }
        }
    }
    jQuery(document.body).append("<div id='documentViewer' style='position:absolute;width:100%;height:100%'></div>");
    m = "1-" + g;
    window.rf = 0;
    m = "current" == d ? e + "-" + e : "all" == d ? "1-" + g : d;
    jQuery("#documentViewer").FlowPaperViewer({
        config: {
            IMGFiles: c.pageImagePattern,
            JSONFile: c.jsonfile && "undefined" != c.jsonfile ? c.jsonfile : s,
            PDFFile: c.PdfFile,
            JSONDataType: c.JSONDataType,
            Scale: 1,
            RenderingOrder: "ImagePageRenderer" == f ? "html,html" : "html5,html",
            key: c.key,
            UserCollaboration: c.UserCollaboration,
            InitViewMode: "Portrait",
            DisableOverflow: r,
            DisplayRange: m
        }
    });
    jQuery("#documentViewer").bind("onPageLoaded", function () {
        window.rf == n - 1 && setTimeout(function () {
            if (window.parent.onPrintRenderingCompleted) {
                window.parent.onPrintRenderingCompleted();
            }
            window.focus && window.focus();
            window.print();
            window.close && window.close();
        }, 2000);
        window.rf++;
        if (window.parent.onPrintRenderingProgress) {
            window.parent.onPrintRenderingProgress(window.rf);
        }
    });
};
window.renderPrintPage = function Ka(c, d) {
    "CanvasPageRenderer" == c.Lc() && (d < c.getNumPages() ? c.da ? document.getElementById("ppage_" + d) ? c.kf(d + 1, function () {
        if (parent.onPrintRenderingProgress) {
            parent.onPrintRenderingProgress(d + 1);
        }
        document.getElementById("ppage_" + d) ? c.ja[d].getPage(1).then(function (e) {
            var g = document.getElementById("ppage_" + d);
            if (g) {
                var m = g.getContext("2d"), n = e.getViewport(4), m = {
                    canvasContext: m, viewport: n, Ch: s, continueCallback: function (c) {
                        c();
                    }
                };
                g.width = n.width;
                g.height = n.height;
                e.render(m).promise.then(function () {
                    e.destroy();
                    Ka(c, d + 1);
                }, function (c) {
                    console.log(c);
                });
            } else {
                Ka(c, d + 1);
            }
        }) : Ka(c, d + 1);
    }) : Ka(c, d + 1) : document.getElementById("ppage_" + d) ? c.ja.getPage(d + 1).then(function (e) {
        if (parent.onPrintRenderingProgress) {
            parent.onPrintRenderingProgress(d + 1);
        }
        var g = document.getElementById("ppage_" + d);
        if (g) {
            var m = g.getContext("2d"), n = e.getViewport(4), m = {
                canvasContext: m, viewport: n, Ch: s, continueCallback: function (c) {
                    c();
                }
            };
            g.width = n.width;
            g.height = n.height;
            e.render(m).promise.then(function () {
                Ka(c, d + 1);
                e.destroy();
            }, function (c) {
                console.log(c);
            });
        } else {
            Ka(c, d + 1);
        }
    }) : Ka(c, d + 1) : (parent.onPrintRenderingCompleted(), window.print()));
};
Ja && self.addEventListener("message", function (f) {
    f = f.data;
    if ("undefined" !== f.cmd) {
        switch (f.cmd) {
            case"loadImageResource":
                var c = new XMLHttpRequest;
                c.open("GET", "../../" + f.src);
                c.fm = c.responseType = "arraybuffer";
                c.onreadystatechange = function () {
                    if (4 == c.readyState && 200 == c.status) {
                        for (var d = new Uint8Array(this.response), e = d.length, f = Array(e); e--;) {
                            f[e] = String.fromCharCode(d[e]);
                        }
                        self.postMessage({status: "ImageResourceLoaded", blob: f.join("")});
                        self.close();
                    }
                };
                c.send(s);
        }
    }
}, z);