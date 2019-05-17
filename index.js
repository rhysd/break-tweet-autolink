// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/twitter-text/dist/regexp/cashtag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var cashtag = /[a-z]{1,6}(?:[._][a-z]{1,2})?/i;
exports.default = cashtag;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/punct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/;
exports.default = punct;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/lib/regexSupplant.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (regex, map, flags) {
  flags = flags || '';
  if (typeof regex !== 'string') {
    if (regex.global && flags.indexOf('g') < 0) {
      flags += 'g';
    }
    if (regex.ignoreCase && flags.indexOf('i') < 0) {
      flags += 'i';
    }
    if (regex.multiline && flags.indexOf('m') < 0) {
      flags += 'm';
    }

    regex = regex.source;
  }

  return new RegExp(regex.replace(/#\{(\w+)\}/g, function (match, name) {
    var newRegex = map[name] || '';
    if (typeof newRegex !== 'string') {
      newRegex = newRegex.source;
    }
    return newRegex;
  }), flags);
};

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Builds a RegExp
},{}],"../node_modules/twitter-text/dist/regexp/spacesGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var spacesGroup = /\x09-\x0D\x20\x85\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000/;
exports.default = spacesGroup;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/spaces.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _spacesGroup = require('./spacesGroup');

var _spacesGroup2 = _interopRequireDefault(_spacesGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = (0, _regexSupplant2.default)(/[#{spacesGroup}]/, { spacesGroup: _spacesGroup2.default });
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./spacesGroup":"../node_modules/twitter-text/dist/regexp/spacesGroup.js"}],"../node_modules/twitter-text/dist/regexp/validCashtag.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cashtag = require('./cashtag');

var _cashtag2 = _interopRequireDefault(_cashtag);

var _punct = require('./punct');

var _punct2 = _interopRequireDefault(_punct);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _spaces = require('./spaces');

var _spaces2 = _interopRequireDefault(_spaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validCashtag = (0, _regexSupplant2.default)('(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])', { cashtag: _cashtag2.default, spaces: _spaces2.default, punct: _punct2.default }, 'gi');

exports.default = validCashtag;
module.exports = exports['default'];
},{"./cashtag":"../node_modules/twitter-text/dist/regexp/cashtag.js","./punct":"../node_modules/twitter-text/dist/regexp/punct.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./spaces":"../node_modules/twitter-text/dist/regexp/spaces.js"}],"../node_modules/twitter-text/dist/extractCashtagsWithIndices.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  if (!text || text.indexOf('$') === -1) {
    return [];
  }

  var tags = [];

  text.replace(_validCashtag2.default, function (match, before, dollar, cashtag, offset, chunk) {
    var startPosition = offset + before.length;
    var endPosition = startPosition + cashtag.length + 1;
    tags.push({
      cashtag: cashtag,
      indices: [startPosition, endPosition]
    });
  });

  return tags;
};

var _validCashtag = require('./regexp/validCashtag');

var _validCashtag2 = _interopRequireDefault(_validCashtag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./regexp/validCashtag":"../node_modules/twitter-text/dist/regexp/validCashtag.js"}],"../node_modules/twitter-text/dist/regexp/hashSigns.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var hashSigns = /[#＃]/;
exports.default = hashSigns;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/endHashtagMatch.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashSigns = require('./hashSigns');

var _hashSigns2 = _interopRequireDefault(_hashSigns);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var endHashtagMatch = (0, _regexSupplant2.default)(/^(?:#{hashSigns}|:\/\/)/, { hashSigns: _hashSigns2.default });

exports.default = endHashtagMatch;
module.exports = exports['default'];
},{"./hashSigns":"../node_modules/twitter-text/dist/regexp/hashSigns.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validCCTLD.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validCCTLD = (0, _regexSupplant2.default)(RegExp('(?:(?:' + '한국|香港|澳門|新加坡|台灣|台湾|中國|中国|გე|ไทย|ලංකා|ഭാരതം|ಭಾರತ|భారత్|சிங்கப்பூர்|இலங்கை|இந்தியா|ଭାରତ|ભારત|' + 'ਭਾਰਤ|ভাৰত|ভারত|বাংলা|भारोत|भारतम्|भारत|ڀارت|پاکستان|موريتانيا|مليسيا|مصر|قطر|فلسطين|عمان|عراق|' + 'سورية|سودان|تونس|بھارت|بارت|ایران|امارات|المغرب|السعودية|الجزائر|الاردن|հայ|қаз|укр|срб|рф|' + 'мон|мкд|ею|бел|бг|ελ|zw|zm|za|yt|ye|ws|wf|vu|vn|vi|vg|ve|vc|va|uz|uy|us|um|uk|ug|ua|tz|tw|tv|' + 'tt|tr|tp|to|tn|tm|tl|tk|tj|th|tg|tf|td|tc|sz|sy|sx|sv|su|st|ss|sr|so|sn|sm|sl|sk|sj|si|sh|sg|' + 'se|sd|sc|sb|sa|rw|ru|rs|ro|re|qa|py|pw|pt|ps|pr|pn|pm|pl|pk|ph|pg|pf|pe|pa|om|nz|nu|nr|np|no|' + 'nl|ni|ng|nf|ne|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|mn|mm|ml|mk|mh|mg|mf|me|md|mc|ma|ly|' + 'lv|lu|lt|ls|lr|lk|li|lc|lb|la|kz|ky|kw|kr|kp|kn|km|ki|kh|kg|ke|jp|jo|jm|je|it|is|ir|iq|io|in|' + 'im|il|ie|id|hu|ht|hr|hn|hm|hk|gy|gw|gu|gt|gs|gr|gq|gp|gn|gm|gl|gi|gh|gg|gf|ge|gd|gb|ga|fr|fo|' + 'fm|fk|fj|fi|eu|et|es|er|eh|eg|ee|ec|dz|do|dm|dk|dj|de|cz|cy|cx|cw|cv|cu|cr|co|cn|cm|cl|ck|ci|' + 'ch|cg|cf|cd|cc|ca|bz|by|bw|bv|bt|bs|br|bq|bo|bn|bm|bl|bj|bi|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|' + 'at|as|ar|aq|ao|an|am|al|ai|ag|af|ae|ad|ac' + ')(?=[^0-9a-zA-Z@]|$))')); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validCCTLD;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/directionalMarkersGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var directionalMarkersGroup = /\u202A-\u202E\u061C\u200E\u200F\u2066\u2067\u2068\u2069/;
exports.default = directionalMarkersGroup;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/invalidCharsGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var invalidCharsGroup = /\uFFFE\uFEFF\uFFFF/;
exports.default = invalidCharsGroup;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/lib/stringSupplant.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (str, map) {
  return str.replace(/#\{(\w+)\}/g, function (match, name) {
    return map[name] || '';
  });
};

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// simple string interpolation
},{}],"../node_modules/twitter-text/dist/regexp/invalidDomainChars.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _directionalMarkersGroup = require('./directionalMarkersGroup');

var _directionalMarkersGroup2 = _interopRequireDefault(_directionalMarkersGroup);

var _invalidCharsGroup = require('./invalidCharsGroup');

var _invalidCharsGroup2 = _interopRequireDefault(_invalidCharsGroup);

var _punct = require('./punct');

var _punct2 = _interopRequireDefault(_punct);

var _spacesGroup = require('./spacesGroup');

var _spacesGroup2 = _interopRequireDefault(_spacesGroup);

var _stringSupplant = require('../lib/stringSupplant');

var _stringSupplant2 = _interopRequireDefault(_stringSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invalidDomainChars = (0, _stringSupplant2.default)('#{punct}#{spacesGroup}#{invalidCharsGroup}#{directionalMarkersGroup}', {
  punct: _punct2.default,
  spacesGroup: _spacesGroup2.default,
  invalidCharsGroup: _invalidCharsGroup2.default,
  directionalMarkersGroup: _directionalMarkersGroup2.default
}); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = invalidDomainChars;
module.exports = exports['default'];
},{"./directionalMarkersGroup":"../node_modules/twitter-text/dist/regexp/directionalMarkersGroup.js","./invalidCharsGroup":"../node_modules/twitter-text/dist/regexp/invalidCharsGroup.js","./punct":"../node_modules/twitter-text/dist/regexp/punct.js","./spacesGroup":"../node_modules/twitter-text/dist/regexp/spacesGroup.js","../lib/stringSupplant":"../node_modules/twitter-text/dist/lib/stringSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validDomainChars.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invalidDomainChars = require('./invalidDomainChars');

var _invalidDomainChars2 = _interopRequireDefault(_invalidDomainChars);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validDomainChars = (0, _regexSupplant2.default)(/[^#{invalidDomainChars}]/, {
  invalidDomainChars: _invalidDomainChars2.default
});

exports.default = validDomainChars;
module.exports = exports['default'];
},{"./invalidDomainChars":"../node_modules/twitter-text/dist/regexp/invalidDomainChars.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validDomainName.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validDomainChars = require('./validDomainChars');

var _validDomainChars2 = _interopRequireDefault(_validDomainChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validDomainName = (0, _regexSupplant2.default)(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/, {
  validDomainChars: _validDomainChars2.default
});

exports.default = validDomainName;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validDomainChars":"../node_modules/twitter-text/dist/regexp/validDomainChars.js"}],"../node_modules/twitter-text/dist/regexp/validGTLD.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validGTLD = (0, _regexSupplant2.default)(RegExp('(?:(?:' + '삼성|닷컴|닷넷|香格里拉|餐厅|食品|飞利浦|電訊盈科|集团|通販|购物|谷歌|诺基亚|联通|网络|网站|网店|网址|组织机构|移动|珠宝|点看|游戏|淡马锡|机构|書籍|时尚|新闻|' + '政府|政务|招聘|手表|手机|我爱你|慈善|微博|广东|工行|家電|娱乐|天主教|大拿|大众汽车|在线|嘉里大酒店|嘉里|商标|商店|商城|公益|公司|八卦|健康|信息|佛山|企业|' + '中文网|中信|世界|ポイント|ファッション|セール|ストア|コム|グーグル|クラウド|みんな|คอม|संगठन|नेट|कॉम|همراه|موقع|موبايلي|كوم|' + 'كاثوليك|عرب|شبكة|بيتك|بازار|العليان|ارامكو|اتصالات|ابوظبي|קום|сайт|рус|орг|онлайн|москва|ком|' + 'католик|дети|zuerich|zone|zippo|zip|zero|zara|zappos|yun|youtube|you|yokohama|yoga|yodobashi|' + 'yandex|yamaxun|yahoo|yachts|xyz|xxx|xperia|xin|xihuan|xfinity|xerox|xbox|wtf|wtc|wow|world|' + 'works|work|woodside|wolterskluwer|wme|winners|wine|windows|win|williamhill|wiki|wien|whoswho|' + 'weir|weibo|wedding|wed|website|weber|webcam|weatherchannel|weather|watches|watch|warman|' + 'wanggou|wang|walter|walmart|wales|vuelos|voyage|voto|voting|vote|volvo|volkswagen|vodka|' + 'vlaanderen|vivo|viva|vistaprint|vista|vision|visa|virgin|vip|vin|villas|viking|vig|video|' + 'viajes|vet|versicherung|vermögensberatung|vermögensberater|verisign|ventures|vegas|vanguard|' + 'vana|vacations|ups|uol|uno|university|unicom|uconnect|ubs|ubank|tvs|tushu|tunes|tui|tube|trv|' + 'trust|travelersinsurance|travelers|travelchannel|travel|training|trading|trade|toys|toyota|' + 'town|tours|total|toshiba|toray|top|tools|tokyo|today|tmall|tkmaxx|tjx|tjmaxx|tirol|tires|tips|' + 'tiffany|tienda|tickets|tiaa|theatre|theater|thd|teva|tennis|temasek|telefonica|telecity|tel|' + 'technology|tech|team|tdk|tci|taxi|tax|tattoo|tatar|tatamotors|target|taobao|talk|taipei|tab|' + 'systems|symantec|sydney|swiss|swiftcover|swatch|suzuki|surgery|surf|support|supply|supplies|' + 'sucks|style|study|studio|stream|store|storage|stockholm|stcgroup|stc|statoil|statefarm|' + 'statebank|starhub|star|staples|stada|srt|srl|spreadbetting|spot|sport|spiegel|space|soy|sony|' + 'song|solutions|solar|sohu|software|softbank|social|soccer|sncf|smile|smart|sling|skype|sky|' + 'skin|ski|site|singles|sina|silk|shriram|showtime|show|shouji|shopping|shop|shoes|shiksha|shia|' + 'shell|shaw|sharp|shangrila|sfr|sexy|sex|sew|seven|ses|services|sener|select|seek|security|' + 'secure|seat|search|scot|scor|scjohnson|science|schwarz|schule|school|scholarships|schmidt|' + 'schaeffler|scb|sca|sbs|sbi|saxo|save|sas|sarl|sapo|sap|sanofi|sandvikcoromant|sandvik|samsung|' + 'samsclub|salon|sale|sakura|safety|safe|saarland|ryukyu|rwe|run|ruhr|rugby|rsvp|room|rogers|' + 'rodeo|rocks|rocher|rmit|rip|rio|ril|rightathome|ricoh|richardli|rich|rexroth|reviews|review|' + 'restaurant|rest|republican|report|repair|rentals|rent|ren|reliance|reit|reisen|reise|rehab|' + 'redumbrella|redstone|red|recipes|realty|realtor|realestate|read|raid|radio|racing|qvc|quest|' + 'quebec|qpon|pwc|pub|prudential|pru|protection|property|properties|promo|progressive|prof|' + 'productions|prod|pro|prime|press|praxi|pramerica|post|porn|politie|poker|pohl|pnc|plus|' + 'plumbing|playstation|play|place|pizza|pioneer|pink|ping|pin|pid|pictures|pictet|pics|piaget|' + 'physio|photos|photography|photo|phone|philips|phd|pharmacy|pfizer|pet|pccw|pay|passagens|' + 'party|parts|partners|pars|paris|panerai|panasonic|pamperedchef|page|ovh|ott|otsuka|osaka|' + 'origins|orientexpress|organic|org|orange|oracle|open|ooo|onyourside|online|onl|ong|one|omega|' + 'ollo|oldnavy|olayangroup|olayan|okinawa|office|off|observer|obi|nyc|ntt|nrw|nra|nowtv|nowruz|' + 'now|norton|northwesternmutual|nokia|nissay|nissan|ninja|nikon|nike|nico|nhk|ngo|nfl|nexus|' + 'nextdirect|next|news|newholland|new|neustar|network|netflix|netbank|net|nec|nba|navy|natura|' + 'nationwide|name|nagoya|nadex|nab|mutuelle|mutual|museum|mtr|mtpc|mtn|msd|movistar|movie|mov|' + 'motorcycles|moto|moscow|mortgage|mormon|mopar|montblanc|monster|money|monash|mom|moi|moe|moda|' + 'mobily|mobile|mobi|mma|mls|mlb|mitsubishi|mit|mint|mini|mil|microsoft|miami|metlife|merckmsd|' + 'meo|menu|men|memorial|meme|melbourne|meet|media|med|mckinsey|mcdonalds|mcd|mba|mattel|' + 'maserati|marshalls|marriott|markets|marketing|market|map|mango|management|man|makeup|maison|' + 'maif|madrid|macys|luxury|luxe|lupin|lundbeck|ltda|ltd|lplfinancial|lpl|love|lotto|lotte|' + 'london|lol|loft|locus|locker|loans|loan|llc|lixil|living|live|lipsy|link|linde|lincoln|limo|' + 'limited|lilly|like|lighting|lifestyle|lifeinsurance|life|lidl|liaison|lgbt|lexus|lego|legal|' + 'lefrak|leclerc|lease|lds|lawyer|law|latrobe|latino|lat|lasalle|lanxess|landrover|land|lancome|' + 'lancia|lancaster|lamer|lamborghini|ladbrokes|lacaixa|kyoto|kuokgroup|kred|krd|kpn|kpmg|kosher|' + 'komatsu|koeln|kiwi|kitchen|kindle|kinder|kim|kia|kfh|kerryproperties|kerrylogistics|' + 'kerryhotels|kddi|kaufen|juniper|juegos|jprs|jpmorgan|joy|jot|joburg|jobs|jnj|jmp|jll|jlc|jio|' + 'jewelry|jetzt|jeep|jcp|jcb|java|jaguar|iwc|iveco|itv|itau|istanbul|ist|ismaili|iselect|irish|' + 'ipiranga|investments|intuit|international|intel|int|insure|insurance|institute|ink|ing|info|' + 'infiniti|industries|inc|immobilien|immo|imdb|imamat|ikano|iinet|ifm|ieee|icu|ice|icbc|ibm|' + 'hyundai|hyatt|hughes|htc|hsbc|how|house|hotmail|hotels|hoteles|hot|hosting|host|hospital|' + 'horse|honeywell|honda|homesense|homes|homegoods|homedepot|holiday|holdings|hockey|hkt|hiv|' + 'hitachi|hisamitsu|hiphop|hgtv|hermes|here|helsinki|help|healthcare|health|hdfcbank|hdfc|hbo|' + 'haus|hangout|hamburg|hair|guru|guitars|guide|guge|gucci|guardian|group|grocery|gripe|green|' + 'gratis|graphics|grainger|gov|got|gop|google|goog|goodyear|goodhands|goo|golf|goldpoint|gold|' + 'godaddy|gmx|gmo|gmbh|gmail|globo|global|gle|glass|glade|giving|gives|gifts|gift|ggee|george|' + 'genting|gent|gea|gdn|gbiz|garden|gap|games|game|gallup|gallo|gallery|gal|fyi|futbol|furniture|' + 'fund|fun|fujixerox|fujitsu|ftr|frontier|frontdoor|frogans|frl|fresenius|free|fox|foundation|' + 'forum|forsale|forex|ford|football|foodnetwork|food|foo|fly|flsmidth|flowers|florist|flir|' + 'flights|flickr|fitness|fit|fishing|fish|firmdale|firestone|fire|financial|finance|final|film|' + 'fido|fidelity|fiat|ferrero|ferrari|feedback|fedex|fast|fashion|farmers|farm|fans|fan|family|' + 'faith|fairwinds|fail|fage|extraspace|express|exposed|expert|exchange|everbank|events|eus|' + 'eurovision|etisalat|esurance|estate|esq|erni|ericsson|equipment|epson|epost|enterprises|' + 'engineering|engineer|energy|emerck|email|education|edu|edeka|eco|eat|earth|dvr|dvag|durban|' + 'dupont|duns|dunlop|duck|dubai|dtv|drive|download|dot|doosan|domains|doha|dog|dodge|doctor|' + 'docs|dnp|diy|dish|discover|discount|directory|direct|digital|diet|diamonds|dhl|dev|design|' + 'desi|dentist|dental|democrat|delta|deloitte|dell|delivery|degree|deals|dealer|deal|dds|dclk|' + 'day|datsun|dating|date|data|dance|dad|dabur|cyou|cymru|cuisinella|csc|cruises|cruise|crs|' + 'crown|cricket|creditunion|creditcard|credit|courses|coupons|coupon|country|corsica|coop|cool|' + 'cookingchannel|cooking|contractors|contact|consulting|construction|condos|comsec|computer|' + 'compare|company|community|commbank|comcast|com|cologne|college|coffee|codes|coach|clubmed|' + 'club|cloud|clothing|clinique|clinic|click|cleaning|claims|cityeats|city|citic|citi|citadel|' + 'cisco|circle|cipriani|church|chrysler|chrome|christmas|chloe|chintai|cheap|chat|chase|charity|' + 'channel|chanel|cfd|cfa|cern|ceo|center|ceb|cbs|cbre|cbn|cba|catholic|catering|cat|casino|cash|' + 'caseih|case|casa|cartier|cars|careers|career|care|cards|caravan|car|capitalone|capital|' + 'capetown|canon|cancerresearch|camp|camera|cam|calvinklein|call|cal|cafe|cab|bzh|buzz|buy|' + 'business|builders|build|bugatti|budapest|brussels|brother|broker|broadway|bridgestone|' + 'bradesco|box|boutique|bot|boston|bostik|bosch|boots|booking|book|boo|bond|bom|bofa|boehringer|' + 'boats|bnpparibas|bnl|bmw|bms|blue|bloomberg|blog|blockbuster|blanco|blackfriday|black|biz|bio|' + 'bingo|bing|bike|bid|bible|bharti|bet|bestbuy|best|berlin|bentley|beer|beauty|beats|bcn|bcg|' + 'bbva|bbt|bbc|bayern|bauhaus|basketball|baseball|bargains|barefoot|barclays|barclaycard|' + 'barcelona|bar|bank|band|bananarepublic|banamex|baidu|baby|azure|axa|aws|avianca|autos|auto|' + 'author|auspost|audio|audible|audi|auction|attorney|athleta|associates|asia|asda|arte|art|arpa|' + 'army|archi|aramco|arab|aquarelle|apple|app|apartments|aol|anz|anquan|android|analytics|' + 'amsterdam|amica|amfam|amex|americanfamily|americanexpress|alstom|alsace|ally|allstate|' + 'allfinanz|alipay|alibaba|alfaromeo|akdn|airtel|airforce|airbus|aigo|aig|agency|agakhan|africa|' + 'afl|afamilycompany|aetna|aero|aeg|adult|ads|adac|actor|active|aco|accountants|accountant|' + 'accenture|academy|abudhabi|abogado|able|abc|abbvie|abbott|abb|abarth|aarp|aaa|onion' + ')(?=[^0-9a-zA-Z@]|$))')); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validGTLD;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validPunycode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validPunycode = /(?:xn--[\-0-9a-z]+)/;
exports.default = validPunycode;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validSubdomain.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validDomainChars = require('./validDomainChars');

var _validDomainChars2 = _interopRequireDefault(_validDomainChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validSubdomain = (0, _regexSupplant2.default)(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/, {
  validDomainChars: _validDomainChars2.default
});

exports.default = validSubdomain;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validDomainChars":"../node_modules/twitter-text/dist/regexp/validDomainChars.js"}],"../node_modules/twitter-text/dist/regexp/validDomain.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validCCTLD = require('./validCCTLD');

var _validCCTLD2 = _interopRequireDefault(_validCCTLD);

var _validDomainName = require('./validDomainName');

var _validDomainName2 = _interopRequireDefault(_validDomainName);

var _validGTLD = require('./validGTLD');

var _validGTLD2 = _interopRequireDefault(_validGTLD);

var _validPunycode = require('./validPunycode');

var _validPunycode2 = _interopRequireDefault(_validPunycode);

var _validSubdomain = require('./validSubdomain');

var _validSubdomain2 = _interopRequireDefault(_validSubdomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validDomain = (0, _regexSupplant2.default)(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/, { validDomainName: _validDomainName2.default, validSubdomain: _validSubdomain2.default, validGTLD: _validGTLD2.default, validCCTLD: _validCCTLD2.default, validPunycode: _validPunycode2.default });

exports.default = validDomain;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validCCTLD":"../node_modules/twitter-text/dist/regexp/validCCTLD.js","./validDomainName":"../node_modules/twitter-text/dist/regexp/validDomainName.js","./validGTLD":"../node_modules/twitter-text/dist/regexp/validGTLD.js","./validPunycode":"../node_modules/twitter-text/dist/regexp/validPunycode.js","./validSubdomain":"../node_modules/twitter-text/dist/regexp/validSubdomain.js"}],"../node_modules/twitter-text/dist/regexp/validPortNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validPortNumber = /[0-9]+/;
exports.default = validPortNumber;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/cyrillicLettersAndMarks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var cyrillicLettersAndMarks = /\u0400-\u04FF/;
exports.default = cyrillicLettersAndMarks;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/latinAccentChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var latinAccentChars = /\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0100-\u024F\u0253\u0254\u0256\u0257\u0259\u025B\u0263\u0268\u026F\u0272\u0289\u028B\u02BB\u0300-\u036F\u1E00-\u1EFF/;
exports.default = latinAccentChars;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validGeneralUrlPathChars.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cyrillicLettersAndMarks = require('./cyrillicLettersAndMarks');

var _cyrillicLettersAndMarks2 = _interopRequireDefault(_cyrillicLettersAndMarks);

var _latinAccentChars = require('./latinAccentChars');

var _latinAccentChars2 = _interopRequireDefault(_latinAccentChars);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validGeneralUrlPathChars = (0, _regexSupplant2.default)(/[a-z#{cyrillicLettersAndMarks}0-9!\*';:=\+,\.\$\/%#\[\]\-\u2013_~@\|&#{latinAccentChars}]/i, { cyrillicLettersAndMarks: _cyrillicLettersAndMarks2.default, latinAccentChars: _latinAccentChars2.default }); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validGeneralUrlPathChars;
module.exports = exports['default'];
},{"./cyrillicLettersAndMarks":"../node_modules/twitter-text/dist/regexp/cyrillicLettersAndMarks.js","./latinAccentChars":"../node_modules/twitter-text/dist/regexp/latinAccentChars.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validUrlBalancedParens.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validGeneralUrlPathChars = require('./validGeneralUrlPathChars');

var _validGeneralUrlPathChars2 = _interopRequireDefault(_validGeneralUrlPathChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Allow URL paths to contain up to two nested levels of balanced parens
//  1. Used in Wikipedia URLs like /Primer_(film)
//  2. Used in IIS sessions like /S(dfd346)/
//  3. Used in Rdio URLs like /track/We_Up_(Album_Version_(Edited))/
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validUrlBalancedParens = (0, _regexSupplant2.default)('\\(' + '(?:' + '#{validGeneralUrlPathChars}+' + '|' +
// allow one nested level of balanced parentheses
'(?:' + '#{validGeneralUrlPathChars}*' + '\\(' + '#{validGeneralUrlPathChars}+' + '\\)' + '#{validGeneralUrlPathChars}*' + ')' + ')' + '\\)', { validGeneralUrlPathChars: _validGeneralUrlPathChars2.default }, 'i');

exports.default = validUrlBalancedParens;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validGeneralUrlPathChars":"../node_modules/twitter-text/dist/regexp/validGeneralUrlPathChars.js"}],"../node_modules/twitter-text/dist/regexp/validUrlPathEndingChars.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cyrillicLettersAndMarks = require('./cyrillicLettersAndMarks');

var _cyrillicLettersAndMarks2 = _interopRequireDefault(_cyrillicLettersAndMarks);

var _latinAccentChars = require('./latinAccentChars');

var _latinAccentChars2 = _interopRequireDefault(_latinAccentChars);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validUrlBalancedParens = require('./validUrlBalancedParens');

var _validUrlBalancedParens2 = _interopRequireDefault(_validUrlBalancedParens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Valid end-of-path chracters (so /foo. does not gobble the period).
// 1. Allow =&# for empty URL parameters and other URL-join artifacts
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validUrlPathEndingChars = (0, _regexSupplant2.default)(/[\+\-a-z#{cyrillicLettersAndMarks}0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i, { cyrillicLettersAndMarks: _cyrillicLettersAndMarks2.default, latinAccentChars: _latinAccentChars2.default, validUrlBalancedParens: _validUrlBalancedParens2.default });

exports.default = validUrlPathEndingChars;
module.exports = exports['default'];
},{"./cyrillicLettersAndMarks":"../node_modules/twitter-text/dist/regexp/cyrillicLettersAndMarks.js","./latinAccentChars":"../node_modules/twitter-text/dist/regexp/latinAccentChars.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validUrlBalancedParens":"../node_modules/twitter-text/dist/regexp/validUrlBalancedParens.js"}],"../node_modules/twitter-text/dist/regexp/validUrlPath.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validGeneralUrlPathChars = require('./validGeneralUrlPathChars');

var _validGeneralUrlPathChars2 = _interopRequireDefault(_validGeneralUrlPathChars);

var _validUrlBalancedParens = require('./validUrlBalancedParens');

var _validUrlBalancedParens2 = _interopRequireDefault(_validUrlBalancedParens);

var _validUrlPathEndingChars = require('./validUrlPathEndingChars');

var _validUrlPathEndingChars2 = _interopRequireDefault(_validUrlPathEndingChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Allow @ in a url, but only in the middle. Catch things like http://example.com/@user/
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validUrlPath = (0, _regexSupplant2.default)('(?:' + '(?:' + '#{validGeneralUrlPathChars}*' + '(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*' + '#{validUrlPathEndingChars}' + ')|(?:@#{validGeneralUrlPathChars}+/)' + ')', {
  validGeneralUrlPathChars: _validGeneralUrlPathChars2.default,
  validUrlBalancedParens: _validUrlBalancedParens2.default,
  validUrlPathEndingChars: _validUrlPathEndingChars2.default
}, 'i');

exports.default = validUrlPath;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validGeneralUrlPathChars":"../node_modules/twitter-text/dist/regexp/validGeneralUrlPathChars.js","./validUrlBalancedParens":"../node_modules/twitter-text/dist/regexp/validUrlBalancedParens.js","./validUrlPathEndingChars":"../node_modules/twitter-text/dist/regexp/validUrlPathEndingChars.js"}],"../node_modules/twitter-text/dist/regexp/validUrlPrecedingChars.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _directionalMarkersGroup = require('./directionalMarkersGroup');

var _directionalMarkersGroup2 = _interopRequireDefault(_directionalMarkersGroup);

var _invalidCharsGroup = require('./invalidCharsGroup');

var _invalidCharsGroup2 = _interopRequireDefault(_invalidCharsGroup);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validUrlPrecedingChars = (0, _regexSupplant2.default)(/(?:[^A-Za-z0-9@＠$#＃#{invalidCharsGroup}]|[#{directionalMarkersGroup}]|^)/, {
  invalidCharsGroup: _invalidCharsGroup2.default,
  directionalMarkersGroup: _directionalMarkersGroup2.default
}); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validUrlPrecedingChars;
module.exports = exports['default'];
},{"./directionalMarkersGroup":"../node_modules/twitter-text/dist/regexp/directionalMarkersGroup.js","./invalidCharsGroup":"../node_modules/twitter-text/dist/regexp/invalidCharsGroup.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validUrlQueryChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validUrlQueryChars = /[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i;
exports.default = validUrlQueryChars;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validUrlQueryEndingChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validUrlQueryEndingChars = /[a-z0-9\-_&=#\/]/i;
exports.default = validUrlQueryEndingChars;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/extractUrl.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validDomain = require('./validDomain');

var _validDomain2 = _interopRequireDefault(_validDomain);

var _validPortNumber = require('./validPortNumber');

var _validPortNumber2 = _interopRequireDefault(_validPortNumber);

var _validUrlPath = require('./validUrlPath');

var _validUrlPath2 = _interopRequireDefault(_validUrlPath);

var _validUrlPrecedingChars = require('./validUrlPrecedingChars');

var _validUrlPrecedingChars2 = _interopRequireDefault(_validUrlPrecedingChars);

var _validUrlQueryChars = require('./validUrlQueryChars');

var _validUrlQueryChars2 = _interopRequireDefault(_validUrlQueryChars);

var _validUrlQueryEndingChars = require('./validUrlQueryEndingChars');

var _validUrlQueryEndingChars2 = _interopRequireDefault(_validUrlQueryEndingChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractUrl = (0, _regexSupplant2.default)('(' + // $1 total match
'(#{validUrlPrecedingChars})' + // $2 Preceeding chracter
'(' + // $3 URL
'(https?:\\/\\/)?' + // $4 Protocol (optional)
'(#{validDomain})' + // $5 Domain(s)
'(?::(#{validPortNumber}))?' + // $6 Port number (optional)
'(\\/#{validUrlPath}*)?' + // $7 URL Path
'(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?' + // $8 Query String
')' + ')', {
  validUrlPrecedingChars: _validUrlPrecedingChars2.default,
  validDomain: _validDomain2.default,
  validPortNumber: _validPortNumber2.default,
  validUrlPath: _validUrlPath2.default,
  validUrlQueryChars: _validUrlQueryChars2.default,
  validUrlQueryEndingChars: _validUrlQueryEndingChars2.default
}, 'gi'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = extractUrl;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validDomain":"../node_modules/twitter-text/dist/regexp/validDomain.js","./validPortNumber":"../node_modules/twitter-text/dist/regexp/validPortNumber.js","./validUrlPath":"../node_modules/twitter-text/dist/regexp/validUrlPath.js","./validUrlPrecedingChars":"../node_modules/twitter-text/dist/regexp/validUrlPrecedingChars.js","./validUrlQueryChars":"../node_modules/twitter-text/dist/regexp/validUrlQueryChars.js","./validUrlQueryEndingChars":"../node_modules/twitter-text/dist/regexp/validUrlQueryEndingChars.js"}],"../node_modules/twitter-text/dist/regexp/invalidUrlWithoutProtocolPrecedingChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var invalidUrlWithoutProtocolPrecedingChars = /[-_.\/]$/;
exports.default = invalidUrlWithoutProtocolPrecedingChars;
module.exports = exports["default"];
},{}],"../node_modules/punycode/punycode.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

},{}],"../node_modules/twitter-text/dist/regexp/validAsciiDomain.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _latinAccentChars = require('./latinAccentChars');

var _latinAccentChars2 = _interopRequireDefault(_latinAccentChars);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validCCTLD = require('./validCCTLD');

var _validCCTLD2 = _interopRequireDefault(_validCCTLD);

var _validGTLD = require('./validGTLD');

var _validGTLD2 = _interopRequireDefault(_validGTLD);

var _validPunycode = require('./validPunycode');

var _validPunycode2 = _interopRequireDefault(_validPunycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validAsciiDomain = (0, _regexSupplant2.default)(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi, { latinAccentChars: _latinAccentChars2.default, validGTLD: _validGTLD2.default, validCCTLD: _validCCTLD2.default, validPunycode: _validPunycode2.default }); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validAsciiDomain;
module.exports = exports['default'];
},{"./latinAccentChars":"../node_modules/twitter-text/dist/regexp/latinAccentChars.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validCCTLD":"../node_modules/twitter-text/dist/regexp/validCCTLD.js","./validGTLD":"../node_modules/twitter-text/dist/regexp/validGTLD.js","./validPunycode":"../node_modules/twitter-text/dist/regexp/validPunycode.js"}],"../node_modules/twitter-text/dist/lib/idna.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _punycode = require('punycode');

var _punycode2 = _interopRequireDefault(_punycode);

var _validAsciiDomain = require('../regexp/validAsciiDomain');

var _validAsciiDomain2 = _interopRequireDefault(_validAsciiDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var MAX_DOMAIN_LABEL_LENGTH = 63;
var PUNYCODE_ENCODED_DOMAIN_PREFIX = 'xn--';
// This is an extremely lightweight implementation of domain name validation according to RFC 3490
// Our regexes handle most of the cases well enough
// See https://tools.ietf.org/html/rfc3490#section-4.1 for details
var idna = {
  toAscii: function toAscii(domain) {
    if (domain.substring(0, 4) === PUNYCODE_ENCODED_DOMAIN_PREFIX && !domain.match(_validAsciiDomain2.default)) {
      // Punycode encoded url cannot contain non ASCII characters
      return;
    }

    var labels = domain.split('.');
    for (var i = 0; i < labels.length; i++) {
      var label = labels[i];
      var punycodeEncodedLabel = _punycode2.default.toASCII(label);
      if (punycodeEncodedLabel.length < 1 || punycodeEncodedLabel.length > MAX_DOMAIN_LABEL_LENGTH) {
        // DNS label has invalid length
        return;
      }
    }
    return labels.join('.');
  }
};

exports.default = idna;
module.exports = exports['default'];
},{"punycode":"../node_modules/punycode/punycode.js","../regexp/validAsciiDomain":"../node_modules/twitter-text/dist/regexp/validAsciiDomain.js"}],"../node_modules/twitter-text/dist/regexp/validTcoUrl.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validUrlQueryChars = require('./validUrlQueryChars');

var _validUrlQueryChars2 = _interopRequireDefault(_validUrlQueryChars);

var _validUrlQueryEndingChars = require('./validUrlQueryEndingChars');

var _validUrlQueryEndingChars2 = _interopRequireDefault(_validUrlQueryEndingChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validTcoUrl = (0, _regexSupplant2.default)(/^https?:\/\/t\.co\/([a-z0-9]+)(?:\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?/, { validUrlQueryChars: _validUrlQueryChars2.default, validUrlQueryEndingChars: _validUrlQueryEndingChars2.default }, 'i'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validTcoUrl;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validUrlQueryChars":"../node_modules/twitter-text/dist/regexp/validUrlQueryChars.js","./validUrlQueryEndingChars":"../node_modules/twitter-text/dist/regexp/validUrlQueryEndingChars.js"}],"../node_modules/twitter-text/dist/extractUrlsWithIndices.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extractUrl = require('./regexp/extractUrl');

var _extractUrl2 = _interopRequireDefault(_extractUrl);

var _invalidUrlWithoutProtocolPrecedingChars = require('./regexp/invalidUrlWithoutProtocolPrecedingChars');

var _invalidUrlWithoutProtocolPrecedingChars2 = _interopRequireDefault(_invalidUrlWithoutProtocolPrecedingChars);

var _idna = require('./lib/idna');

var _idna2 = _interopRequireDefault(_idna);

var _validAsciiDomain = require('./regexp/validAsciiDomain');

var _validAsciiDomain2 = _interopRequireDefault(_validAsciiDomain);

var _validTcoUrl = require('./regexp/validTcoUrl');

var _validTcoUrl2 = _interopRequireDefault(_validTcoUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PROTOCOL = 'https://'; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var DEFAULT_PROTOCOL_OPTIONS = { extractUrlsWithoutProtocol: true };
var MAX_URL_LENGTH = 4096;
var MAX_TCO_SLUG_LENGTH = 40;

var extractUrlsWithIndices = function extractUrlsWithIndices(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PROTOCOL_OPTIONS;

  if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
    return [];
  }

  var urls = [];

  var _loop = function _loop() {
    var before = RegExp.$2;
    var url = RegExp.$3;
    var protocol = RegExp.$4;
    var domain = RegExp.$5;
    var path = RegExp.$7;
    var endPosition = _extractUrl2.default.lastIndex;
    var startPosition = endPosition - url.length;

    if (!isValidUrl(url, protocol || DEFAULT_PROTOCOL, domain)) {
      return 'continue';
    }
    // extract ASCII-only domains.
    if (!protocol) {
      if (!options.extractUrlsWithoutProtocol || before.match(_invalidUrlWithoutProtocolPrecedingChars2.default)) {
        return 'continue';
      }

      var lastUrl = null;
      var asciiEndPosition = 0;
      domain.replace(_validAsciiDomain2.default, function (asciiDomain) {
        var asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition);
        asciiEndPosition = asciiStartPosition + asciiDomain.length;
        lastUrl = {
          url: asciiDomain,
          indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
        };
        urls.push(lastUrl);
      });

      // no ASCII-only domain found. Skip the entire URL.
      if (lastUrl == null) {
        return 'continue';
      }

      // lastUrl only contains domain. Need to add path and query if they exist.
      if (path) {
        lastUrl.url = url.replace(domain, lastUrl.url);
        lastUrl.indices[1] = endPosition;
      }
    } else {
      // In the case of t.co URLs, don't allow additional path characters.
      if (url.match(_validTcoUrl2.default)) {
        var tcoUrlSlug = RegExp.$1;
        if (tcoUrlSlug && tcoUrlSlug.length > MAX_TCO_SLUG_LENGTH) {
          return 'continue';
        } else {
          url = RegExp.lastMatch;
          endPosition = startPosition + url.length;
        }
      }
      urls.push({
        url: url,
        indices: [startPosition, endPosition]
      });
    }
  };

  while (_extractUrl2.default.exec(text)) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
  }

  return urls;
};

var isValidUrl = function isValidUrl(url, protocol, domain) {
  var urlLength = url.length;
  var punycodeEncodedDomain = _idna2.default.toAscii(domain);
  if (!punycodeEncodedDomain || !punycodeEncodedDomain.length) {
    return false;
  }

  urlLength = urlLength + punycodeEncodedDomain.length - domain.length;
  return protocol.length + urlLength <= MAX_URL_LENGTH;
};

exports.default = extractUrlsWithIndices;
module.exports = exports['default'];
},{"./regexp/extractUrl":"../node_modules/twitter-text/dist/regexp/extractUrl.js","./regexp/invalidUrlWithoutProtocolPrecedingChars":"../node_modules/twitter-text/dist/regexp/invalidUrlWithoutProtocolPrecedingChars.js","./lib/idna":"../node_modules/twitter-text/dist/lib/idna.js","./regexp/validAsciiDomain":"../node_modules/twitter-text/dist/regexp/validAsciiDomain.js","./regexp/validTcoUrl":"../node_modules/twitter-text/dist/regexp/validTcoUrl.js"}],"../node_modules/twitter-text/dist/removeOverlappingEntities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entities) {
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });

  var prev = entities[0];
  for (var i = 1; i < entities.length; i++) {
    if (prev.indices[1] > entities[i].indices[0]) {
      entities.splice(i, 1);
      i--;
    } else {
      prev = entities[i];
    }
  }
};

module.exports = exports["default"]; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{}],"../node_modules/twitter-text/dist/regexp/astralLetterAndMarks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Generated from unicode_regex/unicode_regex_groups.scala, same as objective c's \p{L}\p{M}
var astralLetterAndMarks = /\ud800[\udc00-\udc0b\udc0d-\udc26\udc28-\udc3a\udc3c\udc3d\udc3f-\udc4d\udc50-\udc5d\udc80-\udcfa\uddfd\ude80-\ude9c\udea0-\uded0\udee0\udf00-\udf1f\udf30-\udf40\udf42-\udf49\udf50-\udf7a\udf80-\udf9d\udfa0-\udfc3\udfc8-\udfcf]|\ud801[\udc00-\udc9d\udd00-\udd27\udd30-\udd63\ude00-\udf36\udf40-\udf55\udf60-\udf67]|\ud802[\udc00-\udc05\udc08\udc0a-\udc35\udc37\udc38\udc3c\udc3f-\udc55\udc60-\udc76\udc80-\udc9e\udd00-\udd15\udd20-\udd39\udd80-\uddb7\uddbe\uddbf\ude00-\ude03\ude05\ude06\ude0c-\ude13\ude15-\ude17\ude19-\ude33\ude38-\ude3a\ude3f\ude60-\ude7c\ude80-\ude9c\udec0-\udec7\udec9-\udee6\udf00-\udf35\udf40-\udf55\udf60-\udf72\udf80-\udf91]|\ud803[\udc00-\udc48]|\ud804[\udc00-\udc46\udc7f-\udcba\udcd0-\udce8\udd00-\udd34\udd50-\udd73\udd76\udd80-\uddc4\uddda\ude00-\ude11\ude13-\ude37\udeb0-\udeea\udf01-\udf03\udf05-\udf0c\udf0f\udf10\udf13-\udf28\udf2a-\udf30\udf32\udf33\udf35-\udf39\udf3c-\udf44\udf47\udf48\udf4b-\udf4d\udf57\udf5d-\udf63\udf66-\udf6c\udf70-\udf74]|\ud805[\udc80-\udcc5\udcc7\udd80-\uddb5\uddb8-\uddc0\ude00-\ude40\ude44\ude80-\udeb7]|\ud806[\udca0-\udcdf\udcff\udec0-\udef8]|\ud808[\udc00-\udf98]|\ud80c[\udc00-\udfff]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude38\ude40-\ude5e\uded0-\udeed\udef0-\udef4\udf00-\udf36\udf40-\udf43\udf63-\udf77\udf7d-\udf8f]|\ud81b[\udf00-\udf44\udf50-\udf7e\udf8f-\udf9f]|\ud82c[\udc00\udc01]|\ud82f[\udc00-\udc6a\udc70-\udc7c\udc80-\udc88\udc90-\udc99\udc9d\udc9e]|\ud834[\udd65-\udd69\udd6d-\udd72\udd7b-\udd82\udd85-\udd8b\uddaa-\uddad\ude42-\ude44]|\ud835[\udc00-\udc54\udc56-\udc9c\udc9e\udc9f\udca2\udca5\udca6\udca9-\udcac\udcae-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd1e-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd52-\udea5\udea8-\udec0\udec2-\udeda\udedc-\udefa\udefc-\udf14\udf16-\udf34\udf36-\udf4e\udf50-\udf6e\udf70-\udf88\udf8a-\udfa8\udfaa-\udfc2\udfc4-\udfcb]|\ud83a[\udc00-\udcc4\udcd0-\udcd6]|\ud83b[\ude00-\ude03\ude05-\ude1f\ude21\ude22\ude24\ude27\ude29-\ude32\ude34-\ude37\ude39\ude3b\ude42\ude47\ude49\ude4b\ude4d-\ude4f\ude51\ude52\ude54\ude57\ude59\ude5b\ude5d\ude5f\ude61\ude62\ude64\ude67-\ude6a\ude6c-\ude72\ude74-\ude77\ude79-\ude7c\ude7e\ude80-\ude89\ude8b-\ude9b\udea1-\udea3\udea5-\udea9\udeab-\udebb]|\ud840[\udc00-\udfff]|\ud841[\udc00-\udfff]|\ud842[\udc00-\udfff]|\ud843[\udc00-\udfff]|\ud844[\udc00-\udfff]|\ud845[\udc00-\udfff]|\ud846[\udc00-\udfff]|\ud847[\udc00-\udfff]|\ud848[\udc00-\udfff]|\ud849[\udc00-\udfff]|\ud84a[\udc00-\udfff]|\ud84b[\udc00-\udfff]|\ud84c[\udc00-\udfff]|\ud84d[\udc00-\udfff]|\ud84e[\udc00-\udfff]|\ud84f[\udc00-\udfff]|\ud850[\udc00-\udfff]|\ud851[\udc00-\udfff]|\ud852[\udc00-\udfff]|\ud853[\udc00-\udfff]|\ud854[\udc00-\udfff]|\ud855[\udc00-\udfff]|\ud856[\udc00-\udfff]|\ud857[\udc00-\udfff]|\ud858[\udc00-\udfff]|\ud859[\udc00-\udfff]|\ud85a[\udc00-\udfff]|\ud85b[\udc00-\udfff]|\ud85c[\udc00-\udfff]|\ud85d[\udc00-\udfff]|\ud85e[\udc00-\udfff]|\ud85f[\udc00-\udfff]|\ud860[\udc00-\udfff]|\ud861[\udc00-\udfff]|\ud862[\udc00-\udfff]|\ud863[\udc00-\udfff]|\ud864[\udc00-\udfff]|\ud865[\udc00-\udfff]|\ud866[\udc00-\udfff]|\ud867[\udc00-\udfff]|\ud868[\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|\ud86a[\udc00-\udfff]|\ud86b[\udc00-\udfff]|\ud86c[\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|\ud87e[\udc00-\ude1d]|\udb40[\udd00-\uddef]/;
exports.default = astralLetterAndMarks;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/bmpLetterAndMarks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Generated from unicode_regex/unicode_regex_groups.scala, same as objective c's \p{L}\p{M}
var bmpLetterAndMarks = /A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u052f\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07ca-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0-\u08b2\u08e4-\u0963\u0971-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09f0\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a70-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0c00-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c81-\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0cf1\u0cf2\u0d01-\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u103f\u1050-\u108f\u109a-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16f1-\u16f8\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u180b-\u180d\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191e\u1920-\u192b\u1930-\u193b\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f\u1aa7\u1ab0-\u1abe\u1b00-\u1b4b\u1b6b-\u1b73\u1b80-\u1baf\u1bba-\u1bf3\u1c00-\u1c37\u1c4d-\u1c4f\u1c5a-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1cf8\u1cf9\u1d00-\u1df5\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u20d0-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005\u3006\u302a-\u302f\u3031-\u3035\u303b\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua672\ua674-\ua67d\ua67f-\ua69d\ua69f-\ua6e5\ua6f0\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua7ad\ua7b0\ua7b1\ua7f7-\ua827\ua840-\ua873\ua880-\ua8c4\ua8e0-\ua8f7\ua8fb\ua90a-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf\ua9e0-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa36\uaa40-\uaa4d\uaa60-\uaa76\uaa7a-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab5f\uab64\uab65\uabc0-\uabea\uabec\uabed\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf870-\uf87f\uf882\uf884-\uf89f\uf8b8\uf8c1-\uf8d6\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe2d\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc/;
exports.default = bmpLetterAndMarks;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/nonBmpCodePairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var nonBmpCodePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gm;
exports.default = nonBmpCodePairs;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/hashtagAlpha.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _astralLetterAndMarks = require('./astralLetterAndMarks');

var _astralLetterAndMarks2 = _interopRequireDefault(_astralLetterAndMarks);

var _bmpLetterAndMarks = require('./bmpLetterAndMarks');

var _bmpLetterAndMarks2 = _interopRequireDefault(_bmpLetterAndMarks);

var _nonBmpCodePairs = require('./nonBmpCodePairs');

var _nonBmpCodePairs2 = _interopRequireDefault(_nonBmpCodePairs);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A hashtag must contain at least one unicode letter or mark, as well as numbers, underscores, and select special characters.
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var hashtagAlpha = (0, _regexSupplant2.default)(/(?:[#{bmpLetterAndMarks}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}))/, {
  bmpLetterAndMarks: _bmpLetterAndMarks2.default,
  nonBmpCodePairs: _nonBmpCodePairs2.default,
  astralLetterAndMarks: _astralLetterAndMarks2.default
});

exports.default = hashtagAlpha;
module.exports = exports['default'];
},{"./astralLetterAndMarks":"../node_modules/twitter-text/dist/regexp/astralLetterAndMarks.js","./bmpLetterAndMarks":"../node_modules/twitter-text/dist/regexp/bmpLetterAndMarks.js","./nonBmpCodePairs":"../node_modules/twitter-text/dist/regexp/nonBmpCodePairs.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/astralNumerals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var astralNumerals = /\ud801[\udca0-\udca9]|\ud804[\udc66-\udc6f\udcf0-\udcf9\udd36-\udd3f\uddd0-\uddd9\udef0-\udef9]|\ud805[\udcd0-\udcd9\ude50-\ude59\udec0-\udec9]|\ud806[\udce0-\udce9]|\ud81a[\ude60-\ude69\udf50-\udf59]|\ud835[\udfce-\udfff]/;
exports.default = astralNumerals;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/bmpNumerals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var bmpNumerals = /0-9\u0660-\u0669\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0de6-\u0def\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\ua9f0-\ua9f9\uaa50-\uaa59\uabf0-\uabf9\uff10-\uff19/;
exports.default = bmpNumerals;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/hashtagSpecialChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var hashtagSpecialChars = /_\u200c\u200d\ua67e\u05be\u05f3\u05f4\uff5e\u301c\u309b\u309c\u30a0\u30fb\u3003\u0f0b\u0f0c\xb7/;
exports.default = hashtagSpecialChars;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/hashtagAlphaNumeric.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _astralLetterAndMarks = require('./astralLetterAndMarks');

var _astralLetterAndMarks2 = _interopRequireDefault(_astralLetterAndMarks);

var _astralNumerals = require('./astralNumerals');

var _astralNumerals2 = _interopRequireDefault(_astralNumerals);

var _bmpLetterAndMarks = require('./bmpLetterAndMarks');

var _bmpLetterAndMarks2 = _interopRequireDefault(_bmpLetterAndMarks);

var _bmpNumerals = require('./bmpNumerals');

var _bmpNumerals2 = _interopRequireDefault(_bmpNumerals);

var _hashtagSpecialChars = require('./hashtagSpecialChars');

var _hashtagSpecialChars2 = _interopRequireDefault(_hashtagSpecialChars);

var _nonBmpCodePairs = require('./nonBmpCodePairs');

var _nonBmpCodePairs2 = _interopRequireDefault(_nonBmpCodePairs);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashtagAlphaNumeric = (0, _regexSupplant2.default)(/(?:[#{bmpLetterAndMarks}#{bmpNumerals}#{hashtagSpecialChars}]|(?=#{nonBmpCodePairs})(?:#{astralLetterAndMarks}|#{astralNumerals}))/, {
  bmpLetterAndMarks: _bmpLetterAndMarks2.default,
  bmpNumerals: _bmpNumerals2.default,
  hashtagSpecialChars: _hashtagSpecialChars2.default,
  nonBmpCodePairs: _nonBmpCodePairs2.default,
  astralLetterAndMarks: _astralLetterAndMarks2.default,
  astralNumerals: _astralNumerals2.default
}); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = hashtagAlphaNumeric;
module.exports = exports['default'];
},{"./astralLetterAndMarks":"../node_modules/twitter-text/dist/regexp/astralLetterAndMarks.js","./astralNumerals":"../node_modules/twitter-text/dist/regexp/astralNumerals.js","./bmpLetterAndMarks":"../node_modules/twitter-text/dist/regexp/bmpLetterAndMarks.js","./bmpNumerals":"../node_modules/twitter-text/dist/regexp/bmpNumerals.js","./hashtagSpecialChars":"../node_modules/twitter-text/dist/regexp/hashtagSpecialChars.js","./nonBmpCodePairs":"../node_modules/twitter-text/dist/regexp/nonBmpCodePairs.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/codePoint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var codePoint = /(?:[^\uD800-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/;
exports.default = codePoint;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/hashtagBoundary.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _codePoint = require('./codePoint');

var _codePoint2 = _interopRequireDefault(_codePoint);

var _hashtagAlphaNumeric = require('./hashtagAlphaNumeric');

var _hashtagAlphaNumeric2 = _interopRequireDefault(_hashtagAlphaNumeric);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashtagBoundary = (0, _regexSupplant2.default)(/(?:^|\uFE0E|\uFE0F|$|(?!#{hashtagAlphaNumeric}|&)#{codePoint})/, {
  codePoint: _codePoint2.default,
  hashtagAlphaNumeric: _hashtagAlphaNumeric2.default
}); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = hashtagBoundary;
module.exports = exports['default'];
},{"./codePoint":"../node_modules/twitter-text/dist/regexp/codePoint.js","./hashtagAlphaNumeric":"../node_modules/twitter-text/dist/regexp/hashtagAlphaNumeric.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validHashtag.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashSigns = require('./hashSigns');

var _hashSigns2 = _interopRequireDefault(_hashSigns);

var _hashtagAlpha = require('./hashtagAlpha');

var _hashtagAlpha2 = _interopRequireDefault(_hashtagAlpha);

var _hashtagAlphaNumeric = require('./hashtagAlphaNumeric');

var _hashtagAlphaNumeric2 = _interopRequireDefault(_hashtagAlphaNumeric);

var _hashtagBoundary = require('./hashtagBoundary');

var _hashtagBoundary2 = _interopRequireDefault(_hashtagBoundary);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validHashtag = (0, _regexSupplant2.default)(/(#{hashtagBoundary})(#{hashSigns})(?!\uFE0F|\u20E3)(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi, { hashtagBoundary: _hashtagBoundary2.default, hashSigns: _hashSigns2.default, hashtagAlphaNumeric: _hashtagAlphaNumeric2.default, hashtagAlpha: _hashtagAlpha2.default }); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validHashtag;
module.exports = exports['default'];
},{"./hashSigns":"../node_modules/twitter-text/dist/regexp/hashSigns.js","./hashtagAlpha":"../node_modules/twitter-text/dist/regexp/hashtagAlpha.js","./hashtagAlphaNumeric":"../node_modules/twitter-text/dist/regexp/hashtagAlphaNumeric.js","./hashtagBoundary":"../node_modules/twitter-text/dist/regexp/hashtagBoundary.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/extractHashtagsWithIndices.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _endHashtagMatch = require('./regexp/endHashtagMatch');

var _endHashtagMatch2 = _interopRequireDefault(_endHashtagMatch);

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

var _hashSigns = require('./regexp/hashSigns');

var _hashSigns2 = _interopRequireDefault(_hashSigns);

var _removeOverlappingEntities = require('./removeOverlappingEntities');

var _removeOverlappingEntities2 = _interopRequireDefault(_removeOverlappingEntities);

var _validHashtag = require('./regexp/validHashtag');

var _validHashtag2 = _interopRequireDefault(_validHashtag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractHashtagsWithIndices = function extractHashtagsWithIndices(text, options) {
  if (!options) {
    options = { checkUrlOverlap: true };
  }

  if (!text || !text.match(_hashSigns2.default)) {
    return [];
  }

  var tags = [];

  text.replace(_validHashtag2.default, function (match, before, hash, hashText, offset, chunk) {
    var after = chunk.slice(offset + match.length);
    if (after.match(_endHashtagMatch2.default)) {
      return;
    }
    var startPosition = offset + before.length;
    var endPosition = startPosition + hashText.length + 1;
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition]
    });
  });

  if (options.checkUrlOverlap) {
    // also extract URL entities
    var urls = (0, _extractUrlsWithIndices2.default)(text);
    if (urls.length > 0) {
      var entities = tags.concat(urls);
      // remove overlap
      (0, _removeOverlappingEntities2.default)(entities);
      // only push back hashtags
      tags = [];
      for (var i = 0; i < entities.length; i++) {
        if (entities[i].hashtag) {
          tags.push(entities[i]);
        }
      }
    }
  }

  return tags;
}; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = extractHashtagsWithIndices;
module.exports = exports['default'];
},{"./regexp/endHashtagMatch":"../node_modules/twitter-text/dist/regexp/endHashtagMatch.js","./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js","./regexp/hashSigns":"../node_modules/twitter-text/dist/regexp/hashSigns.js","./removeOverlappingEntities":"../node_modules/twitter-text/dist/removeOverlappingEntities.js","./regexp/validHashtag":"../node_modules/twitter-text/dist/regexp/validHashtag.js"}],"../node_modules/twitter-text/dist/regexp/atSigns.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var atSigns = /[@＠]/;
exports.default = atSigns;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/endMentionMatch.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atSigns = require('./atSigns');

var _atSigns2 = _interopRequireDefault(_atSigns);

var _latinAccentChars = require('./latinAccentChars');

var _latinAccentChars2 = _interopRequireDefault(_latinAccentChars);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endMentionMatch = (0, _regexSupplant2.default)(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/, { atSigns: _atSigns2.default, latinAccentChars: _latinAccentChars2.default }); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = endMentionMatch;
module.exports = exports['default'];
},{"./atSigns":"../node_modules/twitter-text/dist/regexp/atSigns.js","./latinAccentChars":"../node_modules/twitter-text/dist/regexp/latinAccentChars.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validMentionPrecedingChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:^|[^a-zA-Z0-9_+~.-])(?:rt|RT|rT|Rt):?)/;
exports.default = validMentionPrecedingChars;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validMentionOrList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atSigns = require('./atSigns');

var _atSigns2 = _interopRequireDefault(_atSigns);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validMentionPrecedingChars = require('./validMentionPrecedingChars');

var _validMentionPrecedingChars2 = _interopRequireDefault(_validMentionPrecedingChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validMentionOrList = (0, _regexSupplant2.default)('(#{validMentionPrecedingChars})' + // $1: Preceding character
'(#{atSigns})' + // $2: At mark
'([a-zA-Z0-9_]{1,20})' + // $3: Screen name
'(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?', // $4: List (optional)
{ validMentionPrecedingChars: _validMentionPrecedingChars2.default, atSigns: _atSigns2.default }, 'g'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validMentionOrList;
module.exports = exports['default'];
},{"./atSigns":"../node_modules/twitter-text/dist/regexp/atSigns.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validMentionPrecedingChars":"../node_modules/twitter-text/dist/regexp/validMentionPrecedingChars.js"}],"../node_modules/twitter-text/dist/extractMentionsOrListsWithIndices.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  if (!text || !text.match(_atSigns2.default)) {
    return [];
  }

  var possibleNames = [];

  text.replace(_validMentionOrList2.default, function (match, before, atSign, screenName, slashListname, offset, chunk) {
    var after = chunk.slice(offset + match.length);
    if (!after.match(_endMentionMatch2.default)) {
      slashListname = slashListname || '';
      var startPosition = offset + before.length;
      var endPosition = startPosition + screenName.length + slashListname.length + 1;
      possibleNames.push({
        screenName: screenName,
        listSlug: slashListname,
        indices: [startPosition, endPosition]
      });
    }
  });

  return possibleNames;
};

var _atSigns = require('./regexp/atSigns');

var _atSigns2 = _interopRequireDefault(_atSigns);

var _endMentionMatch = require('./regexp/endMentionMatch');

var _endMentionMatch2 = _interopRequireDefault(_endMentionMatch);

var _validMentionOrList = require('./regexp/validMentionOrList');

var _validMentionOrList2 = _interopRequireDefault(_validMentionOrList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./regexp/atSigns":"../node_modules/twitter-text/dist/regexp/atSigns.js","./regexp/endMentionMatch":"../node_modules/twitter-text/dist/regexp/endMentionMatch.js","./regexp/validMentionOrList":"../node_modules/twitter-text/dist/regexp/validMentionOrList.js"}],"../node_modules/twitter-text/dist/extractEntitiesWithIndices.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var entities = (0, _extractUrlsWithIndices2.default)(text, options).concat((0, _extractMentionsOrListsWithIndices2.default)(text)).concat((0, _extractHashtagsWithIndices2.default)(text, { checkUrlOverlap: false })).concat((0, _extractCashtagsWithIndices2.default)(text));

  if (entities.length == 0) {
    return [];
  }

  (0, _removeOverlappingEntities2.default)(entities);
  return entities;
};

var _extractCashtagsWithIndices = require('./extractCashtagsWithIndices');

var _extractCashtagsWithIndices2 = _interopRequireDefault(_extractCashtagsWithIndices);

var _extractHashtagsWithIndices = require('./extractHashtagsWithIndices');

var _extractHashtagsWithIndices2 = _interopRequireDefault(_extractHashtagsWithIndices);

var _extractMentionsOrListsWithIndices = require('./extractMentionsOrListsWithIndices');

var _extractMentionsOrListsWithIndices2 = _interopRequireDefault(_extractMentionsOrListsWithIndices);

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

var _removeOverlappingEntities = require('./removeOverlappingEntities');

var _removeOverlappingEntities2 = _interopRequireDefault(_removeOverlappingEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractCashtagsWithIndices":"../node_modules/twitter-text/dist/extractCashtagsWithIndices.js","./extractHashtagsWithIndices":"../node_modules/twitter-text/dist/extractHashtagsWithIndices.js","./extractMentionsOrListsWithIndices":"../node_modules/twitter-text/dist/extractMentionsOrListsWithIndices.js","./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js","./removeOverlappingEntities":"../node_modules/twitter-text/dist/removeOverlappingEntities.js"}],"../node_modules/twitter-text/dist/lib/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (o) {
  var r = {};
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      r[k] = o[k];
    }
  }

  return r;
};

module.exports = exports["default"]; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{}],"../node_modules/twitter-text/dist/extractHtmlAttrsFromOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var htmlAttrs = {};
  for (var k in options) {
    var v = options[k];
    if (OPTIONS_NOT_ATTRIBUTES[k]) {
      continue;
    }
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null;
    }
    if (v == null) {
      continue;
    }
    htmlAttrs[k] = v;
  }
  return htmlAttrs;
};

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
};

// Options which should not be passed as HTML attributes
var OPTIONS_NOT_ATTRIBUTES = {
  urlClass: true,
  listClass: true,
  usernameClass: true,
  hashtagClass: true,
  cashtagClass: true,
  usernameUrlBase: true,
  listUrlBase: true,
  hashtagUrlBase: true,
  cashtagUrlBase: true,
  usernameUrlBlock: true,
  listUrlBlock: true,
  hashtagUrlBlock: true,
  linkUrlBlock: true,
  usernameIncludeSymbol: true,
  suppressLists: true,
  suppressNoFollow: true,
  targetBlank: true,
  suppressDataScreenName: true,
  urlEntities: true,
  symbolTag: true,
  textWithSymbolTag: true,
  urlTarget: true,
  invisibleTagAttrs: true,
  linkAttributeBlock: true,
  linkTextBlock: true,
  htmlEscapeNonEntities: true
};

module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/htmlEscape.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return text && text.replace(/[&"'><]/g, function (character) {
    return HTML_ENTITIES[character];
  });
};

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var HTML_ENTITIES = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#39;'
};

module.exports = exports['default'];
},{}],"../node_modules/twitter-text/dist/tagAttrs.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (attributes) {
  var htmlAttrs = '';
  for (var k in attributes) {
    var v = attributes[k];
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null;
    }
    if (v == null) {
      continue;
    }
    htmlAttrs += ' ' + (0, _htmlEscape2.default)(k) + '="' + (0, _htmlEscape2.default)(v.toString()) + '"';
  }
  return htmlAttrs;
};

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
}; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js"}],"../node_modules/twitter-text/dist/linkToText.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, text, attributes, options) {
  if (!options.suppressNoFollow) {
    attributes.rel = 'nofollow';
  }
  // if linkAttributeBlock is specified, call it to modify the attributes
  if (options.linkAttributeBlock) {
    options.linkAttributeBlock(entity, attributes);
  }
  // if linkTextBlock is specified, call it to get a new/modified link text
  if (options.linkTextBlock) {
    text = options.linkTextBlock(entity, text);
  }
  var d = {
    text: text,
    attr: (0, _tagAttrs2.default)(attributes)
  };
  return (0, _stringSupplant2.default)('<a#{attr}>#{text}</a>', d);
};

var _stringSupplant = require('./lib/stringSupplant');

var _stringSupplant2 = _interopRequireDefault(_stringSupplant);

var _tagAttrs = require('./tagAttrs');

var _tagAttrs2 = _interopRequireDefault(_tagAttrs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./lib/stringSupplant":"../node_modules/twitter-text/dist/lib/stringSupplant.js","./tagAttrs":"../node_modules/twitter-text/dist/tagAttrs.js"}],"../node_modules/twitter-text/dist/linkToTextWithSymbol.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, symbol, text, attributes, options) {
  var taggedSymbol = options.symbolTag ? '<' + options.symbolTag + '>' + symbol + '</' + options.symbolTag + '>' : symbol;
  text = (0, _htmlEscape2.default)(text);
  var taggedText = options.textWithSymbolTag ? '<' + options.textWithSymbolTag + '>' + text + '</' + options.textWithSymbolTag + '>' : text;

  if (options.usernameIncludeSymbol || !symbol.match(_atSigns2.default)) {
    return (0, _linkToText2.default)(entity, taggedSymbol + taggedText, attributes, options);
  } else {
    return taggedSymbol + (0, _linkToText2.default)(entity, taggedText, attributes, options);
  }
};

var _atSigns = require('./regexp/atSigns');

var _atSigns2 = _interopRequireDefault(_atSigns);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _linkToText = require('./linkToText');

var _linkToText2 = _interopRequireDefault(_linkToText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./regexp/atSigns":"../node_modules/twitter-text/dist/regexp/atSigns.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./linkToText":"../node_modules/twitter-text/dist/linkToText.js"}],"../node_modules/twitter-text/dist/linkToCashtag.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, text, options) {
  var cashtag = (0, _htmlEscape2.default)(entity.cashtag);
  var attrs = (0, _clone2.default)(options.htmlAttrs || {});
  attrs.href = options.cashtagUrlBase + cashtag;
  attrs.title = '$' + cashtag;
  attrs['class'] = options.cashtagClass;
  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  return (0, _linkToTextWithSymbol2.default)(entity, '$', cashtag, attrs, options);
};

var _clone = require('./lib/clone');

var _clone2 = _interopRequireDefault(_clone);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _linkToTextWithSymbol = require('./linkToTextWithSymbol');

var _linkToTextWithSymbol2 = _interopRequireDefault(_linkToTextWithSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./lib/clone":"../node_modules/twitter-text/dist/lib/clone.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./linkToTextWithSymbol":"../node_modules/twitter-text/dist/linkToTextWithSymbol.js"}],"../node_modules/twitter-text/dist/regexp/rtlChars.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var rtlChars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm;
exports.default = rtlChars;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/linkToHashtag.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, text, options) {
  var hash = text.substring(entity.indices[0], entity.indices[0] + 1);
  var hashtag = (0, _htmlEscape2.default)(entity.hashtag);
  var attrs = (0, _clone2.default)(options.htmlAttrs || {});
  attrs.href = options.hashtagUrlBase + hashtag;
  attrs.title = '#' + hashtag;
  attrs['class'] = options.hashtagClass;
  if (hashtag.charAt(0).match(_rtlChars2.default)) {
    attrs['class'] += ' rtl';
  }
  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  return (0, _linkToTextWithSymbol2.default)(entity, hash, hashtag, attrs, options);
};

var _clone = require('./lib/clone');

var _clone2 = _interopRequireDefault(_clone);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _rtlChars = require('./regexp/rtlChars');

var _rtlChars2 = _interopRequireDefault(_rtlChars);

var _linkToTextWithSymbol = require('./linkToTextWithSymbol');

var _linkToTextWithSymbol2 = _interopRequireDefault(_linkToTextWithSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./lib/clone":"../node_modules/twitter-text/dist/lib/clone.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./regexp/rtlChars":"../node_modules/twitter-text/dist/regexp/rtlChars.js","./linkToTextWithSymbol":"../node_modules/twitter-text/dist/linkToTextWithSymbol.js"}],"../node_modules/twitter-text/dist/linkTextWithEntity.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, options) {
  var displayUrl = entity.display_url;
  var expandedUrl = entity.expanded_url;

  // Goal: If a user copies and pastes a tweet containing t.co'ed link, the resulting paste
  // should contain the full original URL (expanded_url), not the display URL.
  //
  // Method: Whenever possible, we actually emit HTML that contains expanded_url, and use
  // font-size:0 to hide those parts that should not be displayed (because they are not part of display_url).
  // Elements with font-size:0 get copied even though they are not visible.
  // Note that display:none doesn't work here. Elements with display:none don't get copied.
  //
  // Additionally, we want to *display* ellipses, but we don't want them copied.  To make this happen we
  // wrap the ellipses in a tco-ellipsis class and provide an onCopy handler that sets display:none on
  // everything with the tco-ellipsis class.
  //
  // Exception: pic.twitter.com images, for which expandedUrl = "https://twitter.com/#!/username/status/1234/photo/1
  // For those URLs, display_url is not a substring of expanded_url, so we don't do anything special to render the elided parts.
  // For a pic.twitter.com URL, the only elided part will be the "https://", so this is fine.

  var displayUrlSansEllipses = displayUrl.replace(/…/g, ''); // We have to disregard ellipses for matching
  // Note: we currently only support eliding parts of the URL at the beginning or the end.
  // Eventually we may want to elide parts of the URL in the *middle*.  If so, this code will
  // become more complicated.  We will probably want to create a regexp out of display URL,
  // replacing every ellipsis with a ".*".
  if (expandedUrl.indexOf(displayUrlSansEllipses) != -1) {
    var displayUrlIndex = expandedUrl.indexOf(displayUrlSansEllipses);
    var v = {
      displayUrlSansEllipses: displayUrlSansEllipses,
      // Portion of expandedUrl that precedes the displayUrl substring
      beforeDisplayUrl: expandedUrl.substr(0, displayUrlIndex),
      // Portion of expandedUrl that comes after displayUrl
      afterDisplayUrl: expandedUrl.substr(displayUrlIndex + displayUrlSansEllipses.length),
      precedingEllipsis: displayUrl.match(/^…/) ? '…' : '',
      followingEllipsis: displayUrl.match(/…$/) ? '…' : ''
    };
    for (var k in v) {
      if (v.hasOwnProperty(k)) {
        v[k] = (0, _htmlEscape2.default)(v[k]);
      }
    }
    // As an example: The user tweets "hi http://longdomainname.com/foo"
    // This gets shortened to "hi http://t.co/xyzabc", with display_url = "…nname.com/foo"
    // This will get rendered as:
    // <span class='tco-ellipsis'> <!-- This stuff should get displayed but not copied -->
    //   …
    //   <!-- There's a chance the onCopy event handler might not fire. In case that happens,
    //        we include an &nbsp; here so that the … doesn't bump up against the URL and ruin it.
    //        The &nbsp; is inside the tco-ellipsis span so that when the onCopy handler *does*
    //        fire, it doesn't get copied.  Otherwise the copied text would have two spaces in a row,
    //        e.g. "hi  http://longdomainname.com/foo".
    //   <span style='font-size:0'>&nbsp;</span>
    // </span>
    // <span style='font-size:0'>  <!-- This stuff should get copied but not displayed -->
    //   http://longdomai
    // </span>
    // <span class='js-display-url'> <!-- This stuff should get displayed *and* copied -->
    //   nname.com/foo
    // </span>
    // <span class='tco-ellipsis'> <!-- This stuff should get displayed but not copied -->
    //   <span style='font-size:0'>&nbsp;</span>
    //   …
    // </span>
    v['invisible'] = options.invisibleTagAttrs;
    return (0, _stringSupplant2.default)("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>", v);
  }
  return displayUrl;
};

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _stringSupplant = require('./lib/stringSupplant');

var _stringSupplant2 = _interopRequireDefault(_stringSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./lib/stringSupplant":"../node_modules/twitter-text/dist/lib/stringSupplant.js"}],"../node_modules/twitter-text/dist/regexp/urlHasProtocol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var urlHasProtocol = /^https?:\/\//i;
exports.default = urlHasProtocol;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/linkToUrl.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, text, options) {
  var url = entity.url;
  var displayUrl = url;
  var linkText = (0, _htmlEscape2.default)(displayUrl);

  // If the caller passed a urlEntities object (provided by a Twitter API
  // response with include_entities=true), we use that to render the display_url
  // for each URL instead of it's underlying t.co URL.
  var urlEntity = options.urlEntities && options.urlEntities[url] || entity;
  if (urlEntity.display_url) {
    linkText = (0, _linkTextWithEntity2.default)(urlEntity, options);
  }

  var attrs = (0, _clone2.default)(options.htmlAttrs || {});

  if (!url.match(_urlHasProtocol2.default)) {
    url = 'http://' + url;
  }
  attrs.href = url;

  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  // set class only if urlClass is specified.
  if (options.urlClass) {
    attrs['class'] = options.urlClass;
  }

  // set target only if urlTarget is specified.
  if (options.urlTarget) {
    attrs.target = options.urlTarget;
  }

  if (!options.title && urlEntity.display_url) {
    attrs.title = urlEntity.expanded_url;
  }

  return (0, _linkToText2.default)(entity, linkText, attrs, options);
};

var _clone = require('./lib/clone');

var _clone2 = _interopRequireDefault(_clone);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _linkToText = require('./linkToText');

var _linkToText2 = _interopRequireDefault(_linkToText);

var _linkTextWithEntity = require('./linkTextWithEntity');

var _linkTextWithEntity2 = _interopRequireDefault(_linkTextWithEntity);

var _urlHasProtocol = require('./regexp/urlHasProtocol');

var _urlHasProtocol2 = _interopRequireDefault(_urlHasProtocol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./lib/clone":"../node_modules/twitter-text/dist/lib/clone.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./linkToText":"../node_modules/twitter-text/dist/linkToText.js","./linkTextWithEntity":"../node_modules/twitter-text/dist/linkTextWithEntity.js","./regexp/urlHasProtocol":"../node_modules/twitter-text/dist/regexp/urlHasProtocol.js"}],"../node_modules/twitter-text/dist/linkToMentionAndList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (entity, text, options) {
  var at = text.substring(entity.indices[0], entity.indices[0] + 1);
  var user = (0, _htmlEscape2.default)(entity.screenName);
  var slashListname = (0, _htmlEscape2.default)(entity.listSlug);
  var isList = entity.listSlug && !options.suppressLists;
  var attrs = (0, _clone2.default)(options.htmlAttrs || {});
  attrs['class'] = isList ? options.listClass : options.usernameClass;
  attrs.href = isList ? options.listUrlBase + user + slashListname : options.usernameUrlBase + user;
  if (!isList && !options.suppressDataScreenName) {
    attrs['data-screen-name'] = user;
  }
  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  return (0, _linkToTextWithSymbol2.default)(entity, at, isList ? user + slashListname : user, attrs, options);
};

var _clone = require('./lib/clone');

var _clone2 = _interopRequireDefault(_clone);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _linkToTextWithSymbol = require('./linkToTextWithSymbol');

var _linkToTextWithSymbol2 = _interopRequireDefault(_linkToTextWithSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./lib/clone":"../node_modules/twitter-text/dist/lib/clone.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./linkToTextWithSymbol":"../node_modules/twitter-text/dist/linkToTextWithSymbol.js"}],"../node_modules/twitter-text/dist/autoLinkEntities.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, entities, options) {
  var options = (0, _clone2.default)(options || {});
  options.hashtagClass = options.hashtagClass || DEFAULT_HASHTAG_CLASS;
  options.hashtagUrlBase = options.hashtagUrlBase || 'https://twitter.com/search?q=%23';
  options.cashtagClass = options.cashtagClass || DEFAULT_CASHTAG_CLASS;
  options.cashtagUrlBase = options.cashtagUrlBase || 'https://twitter.com/search?q=%24';
  options.listClass = options.listClass || DEFAULT_LIST_CLASS;
  options.usernameClass = options.usernameClass || DEFAULT_USERNAME_CLASS;
  options.usernameUrlBase = options.usernameUrlBase || 'https://twitter.com/';
  options.listUrlBase = options.listUrlBase || 'https://twitter.com/';
  options.htmlAttrs = (0, _extractHtmlAttrsFromOptions2.default)(options);
  options.invisibleTagAttrs = options.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";

  // remap url entities to hash
  var urlEntities, i, len;
  if (options.urlEntities) {
    urlEntities = {};
    for (i = 0, len = options.urlEntities.length; i < len; i++) {
      urlEntities[options.urlEntities[i].url] = options.urlEntities[i];
    }
    options.urlEntities = urlEntities;
  }

  var result = '';
  var beginIndex = 0;

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });

  var nonEntity = options.htmlEscapeNonEntities ? _htmlEscape2.default : function (text) {
    return text;
  };

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    result += nonEntity(text.substring(beginIndex, entity.indices[0]));

    if (entity.url) {
      result += (0, _linkToUrl2.default)(entity, text, options);
    } else if (entity.hashtag) {
      result += (0, _linkToHashtag2.default)(entity, text, options);
    } else if (entity.screenName) {
      result += (0, _linkToMentionAndList2.default)(entity, text, options);
    } else if (entity.cashtag) {
      result += (0, _linkToCashtag2.default)(entity, text, options);
    }
    beginIndex = entity.indices[1];
  }
  result += nonEntity(text.substring(beginIndex, text.length));
  return result;
};

var _clone = require('./lib/clone');

var _clone2 = _interopRequireDefault(_clone);

var _extractHtmlAttrsFromOptions = require('./extractHtmlAttrsFromOptions');

var _extractHtmlAttrsFromOptions2 = _interopRequireDefault(_extractHtmlAttrsFromOptions);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _linkToCashtag = require('./linkToCashtag');

var _linkToCashtag2 = _interopRequireDefault(_linkToCashtag);

var _linkToHashtag = require('./linkToHashtag');

var _linkToHashtag2 = _interopRequireDefault(_linkToHashtag);

var _linkToUrl = require('./linkToUrl');

var _linkToUrl2 = _interopRequireDefault(_linkToUrl);

var _linkToMentionAndList = require('./linkToMentionAndList');

var _linkToMentionAndList2 = _interopRequireDefault(_linkToMentionAndList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default CSS class for auto-linked lists (along with the url class)
var DEFAULT_LIST_CLASS = 'tweet-url list-slug';
// Default CSS class for auto-linked usernames (along with the url class)
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var DEFAULT_USERNAME_CLASS = 'tweet-url username';
// Default CSS class for auto-linked hashtags (along with the url class)
var DEFAULT_HASHTAG_CLASS = 'tweet-url hashtag';
// Default CSS class for auto-linked cashtags (along with the url class)
var DEFAULT_CASHTAG_CLASS = 'tweet-url cashtag';

module.exports = exports['default'];
},{"./lib/clone":"../node_modules/twitter-text/dist/lib/clone.js","./extractHtmlAttrsFromOptions":"../node_modules/twitter-text/dist/extractHtmlAttrsFromOptions.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./linkToCashtag":"../node_modules/twitter-text/dist/linkToCashtag.js","./linkToHashtag":"../node_modules/twitter-text/dist/linkToHashtag.js","./linkToUrl":"../node_modules/twitter-text/dist/linkToUrl.js","./linkToMentionAndList":"../node_modules/twitter-text/dist/linkToMentionAndList.js"}],"../node_modules/twitter-text/dist/autoLink.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var entities = (0, _extractEntitiesWithIndices2.default)(text, {
    extractUrlsWithoutProtocol: false
  });
  return (0, _autoLinkEntities2.default)(text, entities, options);
};

var _extractEntitiesWithIndices = require('./extractEntitiesWithIndices');

var _extractEntitiesWithIndices2 = _interopRequireDefault(_extractEntitiesWithIndices);

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./extractEntitiesWithIndices":"../node_modules/twitter-text/dist/extractEntitiesWithIndices.js","./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js"}],"../node_modules/twitter-text/dist/autoLinkCashtags.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var entities = (0, _extractCashtagsWithIndices2.default)(text);
  return (0, _autoLinkEntities2.default)(text, entities, options);
};

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

var _extractCashtagsWithIndices = require('./extractCashtagsWithIndices');

var _extractCashtagsWithIndices2 = _interopRequireDefault(_extractCashtagsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js","./extractCashtagsWithIndices":"../node_modules/twitter-text/dist/extractCashtagsWithIndices.js"}],"../node_modules/twitter-text/dist/autoLinkHashtags.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var entities = (0, _extractHashtagsWithIndices2.default)(text);
  return (0, _autoLinkEntities2.default)(text, entities, options);
};

var _extractHashtagsWithIndices = require('./extractHashtagsWithIndices');

var _extractHashtagsWithIndices2 = _interopRequireDefault(_extractHashtagsWithIndices);

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./extractHashtagsWithIndices":"../node_modules/twitter-text/dist/extractHashtagsWithIndices.js","./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js"}],"../node_modules/twitter-text/dist/autoLinkUrlsCustom.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var entities = (0, _extractUrlsWithIndices2.default)(text, {
    extractUrlsWithoutProtocol: false
  });
  return (0, _autoLinkEntities2.default)(text, entities, options);
};

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js","./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js"}],"../node_modules/twitter-text/dist/autoLinkUsernamesOrLists.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var entities = (0, _extractMentionsOrListsWithIndices2.default)(text);
  return (0, _autoLinkEntities2.default)(text, entities, options);
};

var _extractMentionsOrListsWithIndices = require('./extractMentionsOrListsWithIndices');

var _extractMentionsOrListsWithIndices2 = _interopRequireDefault(_extractMentionsOrListsWithIndices);

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./extractMentionsOrListsWithIndices":"../node_modules/twitter-text/dist/extractMentionsOrListsWithIndices.js","./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js"}],"../node_modules/twitter-text/dist/lib/convertUnicodeIndices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

/**
 * Copied from https://github.com/twitter/twitter-text/blob/master/js/twitter-text.js
 */

var convertUnicodeIndices = function convertUnicodeIndices(text, entities, indicesInUTF16) {
  if (entities.length === 0) {
    return;
  }

  var charIndex = 0;
  var codePointIndex = 0;

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  var entityIndex = 0;
  var entity = entities[0];

  while (charIndex < text.length) {
    if (entity.indices[0] === (indicesInUTF16 ? charIndex : codePointIndex)) {
      var len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;

      entityIndex++;
      if (entityIndex === entities.length) {
        // no more entity
        break;
      }
      entity = entities[entityIndex];
    }

    var c = text.charCodeAt(charIndex);
    if (c >= 0xd800 && c <= 0xdbff && charIndex < text.length - 1) {
      // Found high surrogate char
      c = text.charCodeAt(charIndex + 1);
      if (c >= 0xdc00 && c <= 0xdfff) {
        // Found surrogate pair
        charIndex++;
      }
    }
    codePointIndex++;
    charIndex++;
  }
};

exports.default = convertUnicodeIndices;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/modifyIndicesFromUnicodeToUTF16.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, entities) {
  (0, _convertUnicodeIndices2.default)(text, entities, false);
};

var _convertUnicodeIndices = require('./lib/convertUnicodeIndices');

var _convertUnicodeIndices2 = _interopRequireDefault(_convertUnicodeIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./lib/convertUnicodeIndices":"../node_modules/twitter-text/dist/lib/convertUnicodeIndices.js"}],"../node_modules/twitter-text/dist/autoLinkWithJSON.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, json, options) {
  // map JSON entity to twitter-text entity
  if (json.user_mentions) {
    for (var i = 0; i < json.user_mentions.length; i++) {
      // this is a @mention
      json.user_mentions[i].screenName = json.user_mentions[i].screen_name;
    }
  }

  if (json.hashtags) {
    for (var i = 0; i < json.hashtags.length; i++) {
      // this is a #hashtag
      json.hashtags[i].hashtag = json.hashtags[i].text;
    }
  }

  if (json.symbols) {
    for (var i = 0; i < json.symbols.length; i++) {
      // this is a $CASH tag
      json.symbols[i].cashtag = json.symbols[i].text;
    }
  }

  // concatenate all entities
  var entities = [];
  for (var key in json) {
    entities = entities.concat(json[key]);
  }

  // modify indices to UTF-16
  (0, _modifyIndicesFromUnicodeToUTF2.default)(text, entities);

  return (0, _autoLinkEntities2.default)(text, entities, options);
};

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

var _modifyIndicesFromUnicodeToUTF = require('./modifyIndicesFromUnicodeToUTF16');

var _modifyIndicesFromUnicodeToUTF2 = _interopRequireDefault(_modifyIndicesFromUnicodeToUTF);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js","./modifyIndicesFromUnicodeToUTF16":"../node_modules/twitter-text/dist/modifyIndicesFromUnicodeToUTF16.js"}],"../node_modules/twitter-text/dist/configs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This file is generated by scripts/buildConfig.js
exports.default = {
  version1: {
    version: 1,
    maxWeightedTweetLength: 140,
    scale: 1,
    defaultWeight: 1,
    transformedURLLength: 23,
    ranges: []
  },
  version2: {
    version: 2,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    transformedURLLength: 23,
    ranges: [{ start: 0, end: 4351, weight: 100 }, { start: 8192, end: 8205, weight: 100 }, { start: 8208, end: 8223, weight: 100 }, { start: 8242, end: 8247, weight: 100 }]
  },
  version3: {
    version: 3,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    emojiParsingEnabled: true,
    transformedURLLength: 23,
    ranges: [{ start: 0, end: 4351, weight: 100 }, { start: 8192, end: 8205, weight: 100 }, { start: 8208, end: 8223, weight: 100 }, { start: 8242, end: 8247, weight: 100 }]
  },
  defaults: {
    version: 3,
    maxWeightedTweetLength: 280,
    scale: 100,
    defaultWeight: 200,
    emojiParsingEnabled: true,
    transformedURLLength: 23,
    ranges: [{ start: 0, end: 4351, weight: 100 }, { start: 8192, end: 8205, weight: 100 }, { start: 8208, end: 8223, weight: 100 }, { start: 8242, end: 8247, weight: 100 }]
  }
};
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/convertUnicodeIndices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, entities, indicesInUTF16) {
  if (entities.length == 0) {
    return;
  }

  var charIndex = 0;
  var codePointIndex = 0;

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0];
  });
  var entityIndex = 0;
  var entity = entities[0];

  while (charIndex < text.length) {
    if (entity.indices[0] == (indicesInUTF16 ? charIndex : codePointIndex)) {
      var len = entity.indices[1] - entity.indices[0];
      entity.indices[0] = indicesInUTF16 ? codePointIndex : charIndex;
      entity.indices[1] = entity.indices[0] + len;

      entityIndex++;
      if (entityIndex == entities.length) {
        // no more entity
        break;
      }
      entity = entities[entityIndex];
    }

    var c = text.charCodeAt(charIndex);
    if (c >= 0xd800 && c <= 0xdbff && charIndex < text.length - 1) {
      // Found high surrogate char
      c = text.charCodeAt(charIndex + 1);
      if (c >= 0xdc00 && c <= 0xdfff) {
        // Found surrogate pair
        charIndex++;
      }
    }
    codePointIndex++;
    charIndex++;
  }
};

module.exports = exports["default"]; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{}],"../node_modules/twitter-text/dist/extractCashtags.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var cashtagsOnly = [],
      cashtagsWithIndices = (0, _extractCashtagsWithIndices2.default)(text);

  for (var i = 0; i < cashtagsWithIndices.length; i++) {
    cashtagsOnly.push(cashtagsWithIndices[i].cashtag);
  }

  return cashtagsOnly;
};

var _extractCashtagsWithIndices = require('./extractCashtagsWithIndices');

var _extractCashtagsWithIndices2 = _interopRequireDefault(_extractCashtagsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractCashtagsWithIndices":"../node_modules/twitter-text/dist/extractCashtagsWithIndices.js"}],"../node_modules/twitter-text/dist/extractHashtags.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var hashtagsOnly = [];
  var hashtagsWithIndices = (0, _extractHashtagsWithIndices2.default)(text);
  for (var i = 0; i < hashtagsWithIndices.length; i++) {
    hashtagsOnly.push(hashtagsWithIndices[i].hashtag);
  }

  return hashtagsOnly;
};

var _extractHashtagsWithIndices = require('./extractHashtagsWithIndices');

var _extractHashtagsWithIndices2 = _interopRequireDefault(_extractHashtagsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractHashtagsWithIndices":"../node_modules/twitter-text/dist/extractHashtagsWithIndices.js"}],"../node_modules/twitter-text/dist/extractMentionsWithIndices.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var mentions = [];
  var mentionOrList = void 0;
  var mentionsOrLists = (0, _extractMentionsOrListsWithIndices2.default)(text);

  for (var i = 0; i < mentionsOrLists.length; i++) {
    mentionOrList = mentionsOrLists[i];
    if (mentionOrList.listSlug === '') {
      mentions.push({
        screenName: mentionOrList.screenName,
        indices: mentionOrList.indices
      });
    }
  }

  return mentions;
};

var _extractMentionsOrListsWithIndices = require('./extractMentionsOrListsWithIndices');

var _extractMentionsOrListsWithIndices2 = _interopRequireDefault(_extractMentionsOrListsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractMentionsOrListsWithIndices":"../node_modules/twitter-text/dist/extractMentionsOrListsWithIndices.js"}],"../node_modules/twitter-text/dist/extractMentions.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var screenNamesOnly = [],
      screenNamesWithIndices = (0, _extractMentionsWithIndices2.default)(text);

  for (var i = 0; i < screenNamesWithIndices.length; i++) {
    var screenName = screenNamesWithIndices[i].screenName;
    screenNamesOnly.push(screenName);
  }

  return screenNamesOnly;
};

var _extractMentionsWithIndices = require('./extractMentionsWithIndices');

var _extractMentionsWithIndices2 = _interopRequireDefault(_extractMentionsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractMentionsWithIndices":"../node_modules/twitter-text/dist/extractMentionsWithIndices.js"}],"../node_modules/twitter-text/dist/regexp/validReply.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atSigns = require('./atSigns');

var _atSigns2 = _interopRequireDefault(_atSigns);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _spaces = require('./spaces');

var _spaces2 = _interopRequireDefault(_spaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validReply = (0, _regexSupplant2.default)(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/, { atSigns: _atSigns2.default, spaces: _spaces2.default }); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validReply;
module.exports = exports['default'];
},{"./atSigns":"../node_modules/twitter-text/dist/regexp/atSigns.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./spaces":"../node_modules/twitter-text/dist/regexp/spaces.js"}],"../node_modules/twitter-text/dist/extractReplies.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  if (!text) {
    return null;
  }

  var possibleScreenName = text.match(_validReply2.default);
  if (!possibleScreenName || RegExp.rightContext.match(_endMentionMatch2.default)) {
    return null;
  }

  return possibleScreenName[1];
};

var _endMentionMatch = require('./regexp/endMentionMatch');

var _endMentionMatch2 = _interopRequireDefault(_endMentionMatch);

var _validReply = require('./regexp/validReply');

var _validReply2 = _interopRequireDefault(_validReply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
},{"./regexp/endMentionMatch":"../node_modules/twitter-text/dist/regexp/endMentionMatch.js","./regexp/validReply":"../node_modules/twitter-text/dist/regexp/validReply.js"}],"../node_modules/twitter-text/dist/extractUrls.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  var urlsOnly = [];
  var urlsWithIndices = (0, _extractUrlsWithIndices2.default)(text, options);

  for (var i = 0; i < urlsWithIndices.length; i++) {
    urlsOnly.push(urlsWithIndices[i].url);
  }

  return urlsOnly;
};

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js"}],"../node_modules/twitter-text/dist/lib/getCharacterWeight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var getCharacterWeight = function getCharacterWeight(ch, options) {
  var defaultWeight = options.defaultWeight,
      ranges = options.ranges;

  var weight = defaultWeight;
  var chCodePoint = ch.charCodeAt(0);
  if (Array.isArray(ranges)) {
    for (var i = 0, length = ranges.length; i < length; i++) {
      var currRange = ranges[i];
      if (chCodePoint >= currRange.start && chCodePoint <= currRange.end) {
        weight = currRange.weight;
        break;
      }
    }
  }

  return weight;
};

exports.default = getCharacterWeight;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/modifyIndicesFromUTF16ToUnicode.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, entities) {
  (0, _convertUnicodeIndices2.default)(text, entities, true);
};

var _convertUnicodeIndices = require('./lib/convertUnicodeIndices');

var _convertUnicodeIndices2 = _interopRequireDefault(_convertUnicodeIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./lib/convertUnicodeIndices":"../node_modules/twitter-text/dist/lib/convertUnicodeIndices.js"}],"../node_modules/twitter-text/dist/regexp/invalidChars.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invalidCharsGroup = require('./invalidCharsGroup');

var _invalidCharsGroup2 = _interopRequireDefault(_invalidCharsGroup);

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var invalidChars = (0, _regexSupplant2.default)(/[#{invalidCharsGroup}]/, {
  invalidCharsGroup: _invalidCharsGroup2.default
});
exports.default = invalidChars;
module.exports = exports['default'];
},{"./invalidCharsGroup":"../node_modules/twitter-text/dist/regexp/invalidCharsGroup.js","../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/hasInvalidCharacters.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return _invalidChars2.default.test(text);
};

var _invalidChars = require('./regexp/invalidChars');

var _invalidChars2 = _interopRequireDefault(_invalidChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./regexp/invalidChars":"../node_modules/twitter-text/dist/regexp/invalidChars.js"}],"../node_modules/twemoji-parser/dist/lib/regex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright Twitter Inc. Licensed under MIT
// https://github.com/twitter/twemoji-parser/blob/master/LICENSE.md

// This file is auto-generated
exports.default = /(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef9]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb4\uddb7\uddc0-\uddc2\uddd0\uddde-\uddff]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g;
},{}],"../node_modules/twemoji-parser/dist/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeName = undefined;
exports.parse = parse;
exports.toCodePoints = toCodePoints;

var _regex = require('./lib/regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeName = exports.TypeName = 'emoji';
// Copyright Twitter Inc. Licensed under MIT
// https://github.com/twitter/twemoji-parser/blob/master/LICENSE.md
function parse(text, options) {
  var assetType = options && options.assetType ? options.assetType : 'svg';
  var getTwemojiUrl = options && options.buildUrl ? options.buildUrl : function (codepoints, assetType) {
    return assetType === 'png' ? 'https://twemoji.maxcdn.com/2/72x72/' + codepoints + '.png' : 'https://twemoji.maxcdn.com/2/svg/' + codepoints + '.svg';
  };

  var entities = [];

  _regex2.default.lastIndex = 0;
  while (true) {
    var result = _regex2.default.exec(text);
    if (!result) {
      break;
    }

    var emojiText = result[0];
    var codepoints = toCodePoints(removeVS16s(emojiText)).join('-');

    entities.push({
      url: codepoints ? getTwemojiUrl(codepoints, assetType) : '',
      indices: [result.index, _regex2.default.lastIndex],
      text: emojiText,
      type: TypeName
    });
  }
  return entities;
}

var vs16RegExp = /\uFE0F/g;
// avoid using a string literal like '\u200D' here because minifiers expand it inline
var zeroWidthJoiner = String.fromCharCode(0x200d);

var removeVS16s = function removeVS16s(rawEmoji) {
  return rawEmoji.indexOf(zeroWidthJoiner) < 0 ? rawEmoji.replace(vs16RegExp, '') : rawEmoji;
};

function toCodePoints(unicodeSurrogates) {
  var points = [];
  var char = 0;
  var previous = 0;
  var i = 0;
  while (i < unicodeSurrogates.length) {
    char = unicodeSurrogates.charCodeAt(i++);
    if (previous) {
      points.push((0x10000 + (previous - 0xd800 << 10) + (char - 0xdc00)).toString(16));
      previous = 0;
    } else if (char > 0xd800 && char <= 0xdbff) {
      previous = char;
    } else {
      points.push(char.toString(16));
    }
  }
  return points;
}
},{"./lib/regex":"../node_modules/twemoji-parser/dist/lib/regex.js"}],"../node_modules/twitter-text/dist/regexp/urlHasHttps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var urlHasHttps = /^https:\/\//i;
exports.default = urlHasHttps;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/parseTweet.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

var _getCharacterWeight = require('./lib/getCharacterWeight');

var _getCharacterWeight2 = _interopRequireDefault(_getCharacterWeight);

var _hasInvalidCharacters = require('./hasInvalidCharacters');

var _hasInvalidCharacters2 = _interopRequireDefault(_hasInvalidCharacters);

var _modifyIndicesFromUTF16ToUnicode = require('./modifyIndicesFromUTF16ToUnicode');

var _modifyIndicesFromUTF16ToUnicode2 = _interopRequireDefault(_modifyIndicesFromUTF16ToUnicode);

var _twemojiParser = require('twemoji-parser');

var _urlHasHttps = require('./regexp/urlHasHttps');

var _urlHasHttps2 = _interopRequireDefault(_urlHasHttps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [parseTweet description]
 * @param  {string} text tweet text to parse
 * @param  {Object} options config options to pass
 * @return {Object} Fields in response described below:
 *
 * Response fields:
 * weightedLength {int} the weighted length of tweet based on weights specified in the config
 * valid {bool} If tweet is valid
 * permillage {float} permillage of the tweet over the max length specified in config
 * validRangeStart {int} beginning of valid text
 * validRangeEnd {int} End index of valid part of the tweet text (inclusive) in utf16
 * displayRangeStart {int} beginning index of display text
 * displayRangeEnd {int} end index of display text (inclusive) in utf16
 */


// TODO: WEB-19861 Replace with public package after it is open sourced
var parseTweet = function parseTweet() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _configs2.default.defaults;

  var mergedOptions = Object.keys(options).length ? options : _configs2.default.defaults;
  var defaultWeight = mergedOptions.defaultWeight,
      emojiParsingEnabled = mergedOptions.emojiParsingEnabled,
      scale = mergedOptions.scale,
      maxWeightedTweetLength = mergedOptions.maxWeightedTweetLength,
      transformedURLLength = mergedOptions.transformedURLLength;

  var normalizedText = typeof String.prototype.normalize === 'function' ? text.normalize() : text;

  // Hash all entities by their startIndex for fast lookup
  var urlEntitiesMap = transformEntitiesToHash((0, _extractUrlsWithIndices2.default)(normalizedText));
  var emojiEntitiesMap = emojiParsingEnabled ? transformEntitiesToHash((0, _twemojiParser.parse)(normalizedText)) : [];
  var tweetLength = normalizedText.length;

  var weightedLength = 0;
  var validDisplayIndex = 0;
  var valid = true;
  // Go through every character and calculate weight
  for (var charIndex = 0; charIndex < tweetLength; charIndex++) {
    // If a url begins at the specified index handle, add constant length
    if (urlEntitiesMap[charIndex]) {
      var _urlEntitiesMap$charI = urlEntitiesMap[charIndex],
          url = _urlEntitiesMap$charI.url,
          indices = _urlEntitiesMap$charI.indices;

      weightedLength += transformedURLLength * scale;
      charIndex += url.length - 1;
    } else if (emojiParsingEnabled && emojiEntitiesMap[charIndex]) {
      var _emojiEntitiesMap$cha = emojiEntitiesMap[charIndex],
          emoji = _emojiEntitiesMap$cha.text,
          _indices = _emojiEntitiesMap$cha.indices;

      weightedLength += (0, _getCharacterWeight2.default)(emoji.charAt(0), mergedOptions);
      charIndex += emoji.length - 1;
    } else {
      charIndex += isSurrogatePair(normalizedText, charIndex) ? 1 : 0;
      weightedLength += (0, _getCharacterWeight2.default)(normalizedText.charAt(charIndex), mergedOptions);
    }

    // Only test for validity of character if it is still valid
    if (valid) {
      valid = !(0, _hasInvalidCharacters2.default)(normalizedText.substring(charIndex, charIndex + 1));
    }
    if (valid && weightedLength <= maxWeightedTweetLength * scale) {
      validDisplayIndex = charIndex;
    }
  }

  weightedLength = weightedLength / scale;
  valid = valid && weightedLength > 0 && weightedLength <= maxWeightedTweetLength;
  var permillage = Math.floor(weightedLength / maxWeightedTweetLength * 1000);
  var normalizationOffset = text.length - normalizedText.length;
  validDisplayIndex += normalizationOffset;

  return {
    weightedLength: weightedLength,
    valid: valid,
    permillage: permillage,
    validRangeStart: 0,
    validRangeEnd: validDisplayIndex,
    displayRangeStart: 0,
    displayRangeEnd: text.length > 0 ? text.length - 1 : 0
  };
}; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var transformEntitiesToHash = function transformEntitiesToHash(entities) {
  return entities.reduce(function (map, entity) {
    map[entity.indices[0]] = entity;
    return map;
  }, {});
};

var isSurrogatePair = function isSurrogatePair(text, cIndex) {
  // Test if a character is the beginning of a surrogate pair
  if (cIndex < text.length - 1) {
    var c = text.charCodeAt(cIndex);
    var cNext = text.charCodeAt(cIndex + 1);
    return 0xd800 <= c && c <= 0xdbff && 0xdc00 <= cNext && cNext <= 0xdfff;
  }
  return false;
};

exports.default = parseTweet;
module.exports = exports['default'];
},{"./configs":"../node_modules/twitter-text/dist/configs.js","./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js","./lib/getCharacterWeight":"../node_modules/twitter-text/dist/lib/getCharacterWeight.js","./hasInvalidCharacters":"../node_modules/twitter-text/dist/hasInvalidCharacters.js","./modifyIndicesFromUTF16ToUnicode":"../node_modules/twitter-text/dist/modifyIndicesFromUTF16ToUnicode.js","twemoji-parser":"../node_modules/twemoji-parser/dist/index.js","./regexp/urlHasHttps":"../node_modules/twitter-text/dist/regexp/urlHasHttps.js"}],"../node_modules/twitter-text/dist/getTweetLength.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

var _getCharacterWeight = require('./lib/getCharacterWeight');

var _getCharacterWeight2 = _interopRequireDefault(_getCharacterWeight);

var _modifyIndicesFromUTF16ToUnicode = require('./modifyIndicesFromUTF16ToUnicode');

var _modifyIndicesFromUTF16ToUnicode2 = _interopRequireDefault(_modifyIndicesFromUTF16ToUnicode);

var _nonBmpCodePairs = require('./regexp/nonBmpCodePairs');

var _nonBmpCodePairs2 = _interopRequireDefault(_nonBmpCodePairs);

var _parseTweet = require('./parseTweet');

var _parseTweet2 = _interopRequireDefault(_parseTweet);

var _urlHasHttps = require('./regexp/urlHasHttps');

var _urlHasHttps2 = _interopRequireDefault(_urlHasHttps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTweetLength = function getTweetLength(text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _configs2.default.defaults;

  return (0, _parseTweet2.default)(text, options).weightedLength;
}; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = getTweetLength;
module.exports = exports['default'];
},{"./configs":"../node_modules/twitter-text/dist/configs.js","./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js","./lib/getCharacterWeight":"../node_modules/twitter-text/dist/lib/getCharacterWeight.js","./modifyIndicesFromUTF16ToUnicode":"../node_modules/twitter-text/dist/modifyIndicesFromUTF16ToUnicode.js","./regexp/nonBmpCodePairs":"../node_modules/twitter-text/dist/regexp/nonBmpCodePairs.js","./parseTweet":"../node_modules/twitter-text/dist/parseTweet.js","./regexp/urlHasHttps":"../node_modules/twitter-text/dist/regexp/urlHasHttps.js"}],"../node_modules/twitter-text/dist/getUnicodeTextLength.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return text.replace(_nonBmpCodePairs2.default, ' ').length;
};

var _nonBmpCodePairs = require('./regexp/nonBmpCodePairs');

var _nonBmpCodePairs2 = _interopRequireDefault(_nonBmpCodePairs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

/**
 * Copied from https://github.com/twitter/twitter-text/blob/master/js/twitter-text.js
 */
module.exports = exports['default'];
},{"./regexp/nonBmpCodePairs":"../node_modules/twitter-text/dist/regexp/nonBmpCodePairs.js"}],"../node_modules/twitter-text/dist/splitTags.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var firstSplits = text.split('<'),
      secondSplits = void 0,
      allSplits = [],
      split = void 0;

  for (var i = 0; i < firstSplits.length; i += 1) {
    split = firstSplits[i];
    if (!split) {
      allSplits.push('');
    } else {
      secondSplits = split.split('>');
      for (var j = 0; j < secondSplits.length; j += 1) {
        allSplits.push(secondSplits[j]);
      }
    }
  }

  return allSplits;
};

module.exports = exports['default']; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// this essentially does text.split(/<|>/)
// except that won't work in IE, where empty strings are ommitted
// so "<>".split(/<|>/) => [] in IE, but is ["", "", ""] in all others
// but "<<".split("<") => ["", "", ""]
},{}],"../node_modules/twitter-text/dist/hitHighlight.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, hits, options) {
  var defaultHighlightTag = 'em';

  hits = hits || [];
  options = options || {};

  if (hits.length === 0) {
    return text;
  }

  var tagName = options.tag || defaultHighlightTag,
      tags = ['<' + tagName + '>', '</' + tagName + '>'],
      chunks = (0, _splitTags2.default)(text),
      i = void 0,
      j = void 0,
      result = '',
      chunkIndex = 0,
      chunk = chunks[0],
      prevChunksLen = 0,
      chunkCursor = 0,
      startInChunk = false,
      chunkChars = chunk,
      flatHits = [],
      index = void 0,
      hit = void 0,
      tag = void 0,
      placed = void 0,
      hitSpot = void 0;

  for (i = 0; i < hits.length; i += 1) {
    for (j = 0; j < hits[i].length; j += 1) {
      flatHits.push(hits[i][j]);
    }
  }

  for (index = 0; index < flatHits.length; index += 1) {
    hit = flatHits[index];
    tag = tags[index % 2];
    placed = false;

    while (chunk != null && hit >= prevChunksLen + chunk.length) {
      result += chunkChars.slice(chunkCursor);
      if (startInChunk && hit === prevChunksLen + chunkChars.length) {
        result += tag;
        placed = true;
      }

      if (chunks[chunkIndex + 1]) {
        result += '<' + chunks[chunkIndex + 1] + '>';
      }

      prevChunksLen += chunkChars.length;
      chunkCursor = 0;
      chunkIndex += 2;
      chunk = chunks[chunkIndex];
      chunkChars = chunk;
      startInChunk = false;
    }

    if (!placed && chunk != null) {
      hitSpot = hit - prevChunksLen;
      result += chunkChars.slice(chunkCursor, hitSpot) + tag;
      chunkCursor = hitSpot;
      if (index % 2 === 0) {
        startInChunk = true;
      } else {
        startInChunk = false;
      }
    } else if (!placed) {
      placed = true;
      result += tag;
    }
  }

  if (chunk != null) {
    if (chunkCursor < chunkChars.length) {
      result += chunkChars.slice(chunkCursor);
    }
    for (index = chunkIndex + 1; index < chunks.length; index += 1) {
      result += index % 2 === 0 ? chunks[index] : '<' + chunks[index] + '>';
    }
  }

  return result;
};

var _splitTags = require('./splitTags');

var _splitTags2 = _interopRequireDefault(_splitTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./splitTags":"../node_modules/twitter-text/dist/splitTags.js"}],"../node_modules/twitter-text/dist/isInvalidTweet.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _configs2.default.defaults;

  if (!text) {
    return 'empty';
  }

  var mergedOptions = Object.assign({}, _configs2.default.defaults, options);
  var maxLength = mergedOptions.maxWeightedTweetLength;

  // Determine max length independent of URL length
  if ((0, _getTweetLength2.default)(text, mergedOptions) > maxLength) {
    return 'too_long';
  }

  if ((0, _hasInvalidCharacters2.default)(text)) {
    return 'invalid_characters';
  }

  return false;
};

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _getTweetLength = require('./getTweetLength');

var _getTweetLength2 = _interopRequireDefault(_getTweetLength);

var _hasInvalidCharacters = require('./hasInvalidCharacters');

var _hasInvalidCharacters2 = _interopRequireDefault(_hasInvalidCharacters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./configs":"../node_modules/twitter-text/dist/configs.js","./getTweetLength":"../node_modules/twitter-text/dist/getTweetLength.js","./hasInvalidCharacters":"../node_modules/twitter-text/dist/hasInvalidCharacters.js"}],"../node_modules/twitter-text/dist/isValidHashtag.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (hashtag) {
  if (!hashtag) {
    return false;
  }

  var extracted = (0, _extractHashtags2.default)(hashtag);

  // Should extract the hashtag minus the # sign, hence the .slice(1)
  return extracted.length === 1 && extracted[0] === hashtag.slice(1);
};

var _extractHashtags = require('./extractHashtags');

var _extractHashtags2 = _interopRequireDefault(_extractHashtags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractHashtags":"../node_modules/twitter-text/dist/extractHashtags.js"}],"../node_modules/twitter-text/dist/isValidList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (usernameList) {
  var match = usernameList.match(VALID_LIST_RE);

  // Must have matched and had nothing before or after
  return !!(match && match[1] == '' && match[4]);
};

var _regexSupplant = require('./lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validMentionOrList = require('./regexp/validMentionOrList');

var _validMentionOrList2 = _interopRequireDefault(_validMentionOrList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var VALID_LIST_RE = (0, _regexSupplant2.default)(/^#{validMentionOrList}$/, {
  validMentionOrList: _validMentionOrList2.default
});

module.exports = exports['default'];
},{"./lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./regexp/validMentionOrList":"../node_modules/twitter-text/dist/regexp/validMentionOrList.js"}],"../node_modules/twitter-text/dist/isValidTweetText.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, options) {
  return !(0, _isInvalidTweet2.default)(text, options);
};

var _isInvalidTweet = require('./isInvalidTweet');

var _isInvalidTweet2 = _interopRequireDefault(_isInvalidTweet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./isInvalidTweet":"../node_modules/twitter-text/dist/isInvalidTweet.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlUnreserved.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlUnreserved = /[a-z\u0400-\u04FF0-9\-._~]/i;
exports.default = validateUrlUnreserved;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlPctEncoded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i;
exports.default = validateUrlPctEncoded;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlSubDelims.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlSubDelims = /[!$&'()*+,;=]/i;
exports.default = validateUrlSubDelims;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlUserinfo.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlUnreserved = require('./validateUrlUnreserved');

var _validateUrlUnreserved2 = _interopRequireDefault(_validateUrlUnreserved);

var _validateUrlPctEncoded = require('./validateUrlPctEncoded');

var _validateUrlPctEncoded2 = _interopRequireDefault(_validateUrlPctEncoded);

var _validateUrlSubDelims = require('./validateUrlSubDelims');

var _validateUrlSubDelims2 = _interopRequireDefault(_validateUrlSubDelims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlUserinfo = (0, _regexSupplant2.default)('(?:' + '#{validateUrlUnreserved}|' + '#{validateUrlPctEncoded}|' + '#{validateUrlSubDelims}|' + ':' + ')*', { validateUrlUnreserved: _validateUrlUnreserved2.default, validateUrlPctEncoded: _validateUrlPctEncoded2.default, validateUrlSubDelims: _validateUrlSubDelims2.default }, 'i');

exports.default = validateUrlUserinfo;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlUnreserved":"../node_modules/twitter-text/dist/regexp/validateUrlUnreserved.js","./validateUrlPctEncoded":"../node_modules/twitter-text/dist/regexp/validateUrlPctEncoded.js","./validateUrlSubDelims":"../node_modules/twitter-text/dist/regexp/validateUrlSubDelims.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlDomainSegment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i;
exports.default = validateUrlDomainSegment;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlDomainTld.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i;
exports.default = validateUrlDomainTld;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlSubDomainSegment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i;
exports.default = validateUrlSubDomainSegment;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlDomain.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlDomainSegment = require('./validateUrlDomainSegment');

var _validateUrlDomainSegment2 = _interopRequireDefault(_validateUrlDomainSegment);

var _validateUrlDomainTld = require('./validateUrlDomainTld');

var _validateUrlDomainTld2 = _interopRequireDefault(_validateUrlDomainTld);

var _validateUrlSubDomainSegment = require('./validateUrlSubDomainSegment');

var _validateUrlSubDomainSegment2 = _interopRequireDefault(_validateUrlSubDomainSegment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlDomain = (0, _regexSupplant2.default)(/(?:(?:#{validateUrlSubDomainSegment}\.)*(?:#{validateUrlDomainSegment}\.)#{validateUrlDomainTld})/i, {
  validateUrlSubDomainSegment: _validateUrlSubDomainSegment2.default,
  validateUrlDomainSegment: _validateUrlDomainSegment2.default,
  validateUrlDomainTld: _validateUrlDomainTld2.default
});

exports.default = validateUrlDomain;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlDomainSegment.js","./validateUrlDomainTld":"../node_modules/twitter-text/dist/regexp/validateUrlDomainTld.js","./validateUrlSubDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlSubDomainSegment.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlDecOctet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i;
exports.default = validateUrlDecOctet;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlIpv4.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlDecOctet = require('./validateUrlDecOctet');

var _validateUrlDecOctet2 = _interopRequireDefault(_validateUrlDecOctet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlIpv4 = (0, _regexSupplant2.default)(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i, {
  validateUrlDecOctet: _validateUrlDecOctet2.default
});

exports.default = validateUrlIpv4;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlDecOctet":"../node_modules/twitter-text/dist/regexp/validateUrlDecOctet.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlIpv6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Punting on real IPv6 validation for now
var validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;
exports.default = validateUrlIpv6;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlIp.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlIpv = require('./validateUrlIpv4');

var _validateUrlIpv2 = _interopRequireDefault(_validateUrlIpv);

var _validateUrlIpv3 = require('./validateUrlIpv6');

var _validateUrlIpv4 = _interopRequireDefault(_validateUrlIpv3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Punting on IPvFuture for now
var validateUrlIp = (0, _regexSupplant2.default)('(?:' + '#{validateUrlIpv4}|' + '#{validateUrlIpv6}' + ')', { validateUrlIpv4: _validateUrlIpv2.default, validateUrlIpv6: _validateUrlIpv4.default }, 'i'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validateUrlIp;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlIpv4":"../node_modules/twitter-text/dist/regexp/validateUrlIpv4.js","./validateUrlIpv6":"../node_modules/twitter-text/dist/regexp/validateUrlIpv6.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlHost.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlDomain = require('./validateUrlDomain');

var _validateUrlDomain2 = _interopRequireDefault(_validateUrlDomain);

var _validateUrlIp = require('./validateUrlIp');

var _validateUrlIp2 = _interopRequireDefault(_validateUrlIp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateUrlHost = (0, _regexSupplant2.default)('(?:' + '#{validateUrlIp}|' + '#{validateUrlDomain}' + ')', { validateUrlIp: _validateUrlIp2.default, validateUrlDomain: _validateUrlDomain2.default }, 'i'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validateUrlHost;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlDomain":"../node_modules/twitter-text/dist/regexp/validateUrlDomain.js","./validateUrlIp":"../node_modules/twitter-text/dist/regexp/validateUrlIp.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlPort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlPort = /[0-9]{1,5}/;
exports.default = validateUrlPort;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlAuthority.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlUserinfo = require('./validateUrlUserinfo');

var _validateUrlUserinfo2 = _interopRequireDefault(_validateUrlUserinfo);

var _validateUrlHost = require('./validateUrlHost');

var _validateUrlHost2 = _interopRequireDefault(_validateUrlHost);

var _validateUrlPort = require('./validateUrlPort');

var _validateUrlPort2 = _interopRequireDefault(_validateUrlPort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlAuthority = (0, _regexSupplant2.default)(
// $1 userinfo
'(?:(#{validateUrlUserinfo})@)?' +
// $2 host
'(#{validateUrlHost})' +
// $3 port
'(?::(#{validateUrlPort}))?', { validateUrlUserinfo: _validateUrlUserinfo2.default, validateUrlHost: _validateUrlHost2.default, validateUrlPort: _validateUrlPort2.default }, 'i');

exports.default = validateUrlAuthority;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlUserinfo":"../node_modules/twitter-text/dist/regexp/validateUrlUserinfo.js","./validateUrlHost":"../node_modules/twitter-text/dist/regexp/validateUrlHost.js","./validateUrlPort":"../node_modules/twitter-text/dist/regexp/validateUrlPort.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlPchar.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlUnreserved = require('./validateUrlUnreserved');

var _validateUrlUnreserved2 = _interopRequireDefault(_validateUrlUnreserved);

var _validateUrlPctEncoded = require('./validateUrlPctEncoded');

var _validateUrlPctEncoded2 = _interopRequireDefault(_validateUrlPctEncoded);

var _validateUrlSubDelims = require('./validateUrlSubDelims');

var _validateUrlSubDelims2 = _interopRequireDefault(_validateUrlSubDelims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// These URL validation pattern strings are based on the ABNF from RFC 3986
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlPchar = (0, _regexSupplant2.default)('(?:' + '#{validateUrlUnreserved}|' + '#{validateUrlPctEncoded}|' + '#{validateUrlSubDelims}|' + '[:|@]' + ')', { validateUrlUnreserved: _validateUrlUnreserved2.default, validateUrlPctEncoded: _validateUrlPctEncoded2.default, validateUrlSubDelims: _validateUrlSubDelims2.default }, 'i');

exports.default = validateUrlPchar;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlUnreserved":"../node_modules/twitter-text/dist/regexp/validateUrlUnreserved.js","./validateUrlPctEncoded":"../node_modules/twitter-text/dist/regexp/validateUrlPctEncoded.js","./validateUrlSubDelims":"../node_modules/twitter-text/dist/regexp/validateUrlSubDelims.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlFragment.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlPchar = require('./validateUrlPchar');

var _validateUrlPchar2 = _interopRequireDefault(_validateUrlPchar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlFragment = (0, _regexSupplant2.default)(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar: _validateUrlPchar2.default
});

exports.default = validateUrlFragment;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlPchar":"../node_modules/twitter-text/dist/regexp/validateUrlPchar.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlPath.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlPchar = require('./validateUrlPchar');

var _validateUrlPchar2 = _interopRequireDefault(_validateUrlPchar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlPath = (0, _regexSupplant2.default)(/(\/#{validateUrlPchar}*)*/i, {
  validateUrlPchar: _validateUrlPchar2.default
});

exports.default = validateUrlPath;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlPchar":"../node_modules/twitter-text/dist/regexp/validateUrlPchar.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlQuery.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlPchar = require('./validateUrlPchar');

var _validateUrlPchar2 = _interopRequireDefault(_validateUrlPchar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlQuery = (0, _regexSupplant2.default)(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar: _validateUrlPchar2.default
});

exports.default = validateUrlQuery;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlPchar":"../node_modules/twitter-text/dist/regexp/validateUrlPchar.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlScheme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i;
exports.default = validateUrlScheme;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlUnencoded.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Modified version of RFC 3986 Appendix B
var validateUrlUnencoded = (0, _regexSupplant2.default)('^' + // Full URL
'(?:' + '([^:/?#]+):\\/\\/' + // $1 Scheme
')?' + '([^/?#]*)' + // $2 Authority
'([^?#]*)' + // $3 Path
'(?:' + '\\?([^#]*)' + // $4 Query
')?' + '(?:' + '#(.*)' + // $5 Fragment
')?$', 'i'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validateUrlUnencoded;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeSubDomainSegment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
exports.default = validateUrlUnicodeSubDomainSegment;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomainSegment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
exports.default = validateUrlUnicodeDomainSegment;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomainTld.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

// Unencoded internationalized domains - this doesn't check for invalid UTF-8 sequences
var validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
exports.default = validateUrlUnicodeDomainTld;
module.exports = exports["default"];
},{}],"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomain.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlUnicodeSubDomainSegment = require('./validateUrlUnicodeSubDomainSegment');

var _validateUrlUnicodeSubDomainSegment2 = _interopRequireDefault(_validateUrlUnicodeSubDomainSegment);

var _validateUrlUnicodeDomainSegment = require('./validateUrlUnicodeDomainSegment');

var _validateUrlUnicodeDomainSegment2 = _interopRequireDefault(_validateUrlUnicodeDomainSegment);

var _validateUrlUnicodeDomainTld = require('./validateUrlUnicodeDomainTld');

var _validateUrlUnicodeDomainTld2 = _interopRequireDefault(_validateUrlUnicodeDomainTld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Unencoded internationalized domains - this doesn't check for invalid UTF-8 sequences
// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlUnicodeDomain = (0, _regexSupplant2.default)(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i, {
  validateUrlUnicodeSubDomainSegment: _validateUrlUnicodeSubDomainSegment2.default,
  validateUrlUnicodeDomainSegment: _validateUrlUnicodeDomainSegment2.default,
  validateUrlUnicodeDomainTld: _validateUrlUnicodeDomainTld2.default
});

exports.default = validateUrlUnicodeDomain;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlUnicodeSubDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeSubDomainSegment.js","./validateUrlUnicodeDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomainSegment.js","./validateUrlUnicodeDomainTld":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomainTld.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeHost.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlIp = require('./validateUrlIp');

var _validateUrlIp2 = _interopRequireDefault(_validateUrlIp);

var _validateUrlUnicodeDomain = require('./validateUrlUnicodeDomain');

var _validateUrlUnicodeDomain2 = _interopRequireDefault(_validateUrlUnicodeDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateUrlUnicodeHost = (0, _regexSupplant2.default)('(?:' + '#{validateUrlIp}|' + '#{validateUrlUnicodeDomain}' + ')', { validateUrlIp: _validateUrlIp2.default, validateUrlUnicodeDomain: _validateUrlUnicodeDomain2.default }, 'i'); // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = validateUrlUnicodeHost;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlIp":"../node_modules/twitter-text/dist/regexp/validateUrlIp.js","./validateUrlUnicodeDomain":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomain.js"}],"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeAuthority.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regexSupplant = require('../lib/regexSupplant');

var _regexSupplant2 = _interopRequireDefault(_regexSupplant);

var _validateUrlUserinfo = require('./validateUrlUserinfo');

var _validateUrlUserinfo2 = _interopRequireDefault(_validateUrlUserinfo);

var _validateUrlUnicodeHost = require('./validateUrlUnicodeHost');

var _validateUrlUnicodeHost2 = _interopRequireDefault(_validateUrlUnicodeHost);

var _validateUrlPort = require('./validateUrlPort');

var _validateUrlPort2 = _interopRequireDefault(_validateUrlPort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

var validateUrlUnicodeAuthority = (0, _regexSupplant2.default)(
// $1 userinfo
'(?:(#{validateUrlUserinfo})@)?' +
// $2 host
'(#{validateUrlUnicodeHost})' +
// $3 port
'(?::(#{validateUrlPort}))?', { validateUrlUserinfo: _validateUrlUserinfo2.default, validateUrlUnicodeHost: _validateUrlUnicodeHost2.default, validateUrlPort: _validateUrlPort2.default }, 'i');

exports.default = validateUrlUnicodeAuthority;
module.exports = exports['default'];
},{"../lib/regexSupplant":"../node_modules/twitter-text/dist/lib/regexSupplant.js","./validateUrlUserinfo":"../node_modules/twitter-text/dist/regexp/validateUrlUserinfo.js","./validateUrlUnicodeHost":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeHost.js","./validateUrlPort":"../node_modules/twitter-text/dist/regexp/validateUrlPort.js"}],"../node_modules/twitter-text/dist/isValidUrl.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, unicodeDomains, requireProtocol) {
  if (unicodeDomains == null) {
    unicodeDomains = true;
  }

  if (requireProtocol == null) {
    requireProtocol = true;
  }

  if (!url) {
    return false;
  }

  var urlParts = url.match(_validateUrlUnencoded2.default);

  if (!urlParts || urlParts[0] !== url) {
    return false;
  }

  var scheme = urlParts[1],
      authority = urlParts[2],
      path = urlParts[3],
      query = urlParts[4],
      fragment = urlParts[5];

  if (!((!requireProtocol || isValidMatch(scheme, _validateUrlScheme2.default) && scheme.match(/^https?$/i)) && isValidMatch(path, _validateUrlPath2.default) && isValidMatch(query, _validateUrlQuery2.default, true) && isValidMatch(fragment, _validateUrlFragment2.default, true))) {
    return false;
  }

  return unicodeDomains && isValidMatch(authority, _validateUrlUnicodeAuthority2.default) || !unicodeDomains && isValidMatch(authority, _validateUrlAuthority2.default);
};

var _validateUrlAuthority = require('./regexp/validateUrlAuthority');

var _validateUrlAuthority2 = _interopRequireDefault(_validateUrlAuthority);

var _validateUrlFragment = require('./regexp/validateUrlFragment');

var _validateUrlFragment2 = _interopRequireDefault(_validateUrlFragment);

var _validateUrlPath = require('./regexp/validateUrlPath');

var _validateUrlPath2 = _interopRequireDefault(_validateUrlPath);

var _validateUrlQuery = require('./regexp/validateUrlQuery');

var _validateUrlQuery2 = _interopRequireDefault(_validateUrlQuery);

var _validateUrlScheme = require('./regexp/validateUrlScheme');

var _validateUrlScheme2 = _interopRequireDefault(_validateUrlScheme);

var _validateUrlUnencoded = require('./regexp/validateUrlUnencoded');

var _validateUrlUnencoded2 = _interopRequireDefault(_validateUrlUnencoded);

var _validateUrlUnicodeAuthority = require('./regexp/validateUrlUnicodeAuthority');

var _validateUrlUnicodeAuthority2 = _interopRequireDefault(_validateUrlUnicodeAuthority);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidMatch(string, regex, optional) {
  if (!optional) {
    // RegExp["$&"] is the text of the last match
    // blank strings are ok, but are falsy, so we check stringiness instead of truthiness
    return typeof string === 'string' && string.match(regex) && RegExp['$&'] === string;
  }

  // RegExp["$&"] is the text of the last match
  return !string || string.match(regex) && RegExp['$&'] === string;
} // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./regexp/validateUrlAuthority":"../node_modules/twitter-text/dist/regexp/validateUrlAuthority.js","./regexp/validateUrlFragment":"../node_modules/twitter-text/dist/regexp/validateUrlFragment.js","./regexp/validateUrlPath":"../node_modules/twitter-text/dist/regexp/validateUrlPath.js","./regexp/validateUrlQuery":"../node_modules/twitter-text/dist/regexp/validateUrlQuery.js","./regexp/validateUrlScheme":"../node_modules/twitter-text/dist/regexp/validateUrlScheme.js","./regexp/validateUrlUnencoded":"../node_modules/twitter-text/dist/regexp/validateUrlUnencoded.js","./regexp/validateUrlUnicodeAuthority":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeAuthority.js"}],"../node_modules/twitter-text/dist/isValidUsername.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (username) {
  if (!username) {
    return false;
  }

  var extracted = (0, _extractMentions2.default)(username);

  // Should extract the username minus the @ sign, hence the .slice(1)
  return extracted.length === 1 && extracted[0] === username.slice(1);
};

var _extractMentions = require('./extractMentions');

var _extractMentions2 = _interopRequireDefault(_extractMentions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./extractMentions":"../node_modules/twitter-text/dist/extractMentions.js"}],"../node_modules/twitter-text/dist/regexp/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _astralLetterAndMarks = require('./astralLetterAndMarks');

var _astralLetterAndMarks2 = _interopRequireDefault(_astralLetterAndMarks);

var _astralNumerals = require('./astralNumerals');

var _astralNumerals2 = _interopRequireDefault(_astralNumerals);

var _atSigns = require('./atSigns');

var _atSigns2 = _interopRequireDefault(_atSigns);

var _bmpLetterAndMarks = require('./bmpLetterAndMarks');

var _bmpLetterAndMarks2 = _interopRequireDefault(_bmpLetterAndMarks);

var _bmpNumerals = require('./bmpNumerals');

var _bmpNumerals2 = _interopRequireDefault(_bmpNumerals);

var _cashtag = require('./cashtag');

var _cashtag2 = _interopRequireDefault(_cashtag);

var _codePoint = require('./codePoint');

var _codePoint2 = _interopRequireDefault(_codePoint);

var _cyrillicLettersAndMarks = require('./cyrillicLettersAndMarks');

var _cyrillicLettersAndMarks2 = _interopRequireDefault(_cyrillicLettersAndMarks);

var _endHashtagMatch = require('./endHashtagMatch');

var _endHashtagMatch2 = _interopRequireDefault(_endHashtagMatch);

var _endMentionMatch = require('./endMentionMatch');

var _endMentionMatch2 = _interopRequireDefault(_endMentionMatch);

var _extractUrl = require('./extractUrl');

var _extractUrl2 = _interopRequireDefault(_extractUrl);

var _hashSigns = require('./hashSigns');

var _hashSigns2 = _interopRequireDefault(_hashSigns);

var _hashtagAlpha = require('./hashtagAlpha');

var _hashtagAlpha2 = _interopRequireDefault(_hashtagAlpha);

var _hashtagAlphaNumeric = require('./hashtagAlphaNumeric');

var _hashtagAlphaNumeric2 = _interopRequireDefault(_hashtagAlphaNumeric);

var _hashtagBoundary = require('./hashtagBoundary');

var _hashtagBoundary2 = _interopRequireDefault(_hashtagBoundary);

var _hashtagSpecialChars = require('./hashtagSpecialChars');

var _hashtagSpecialChars2 = _interopRequireDefault(_hashtagSpecialChars);

var _invalidChars = require('./invalidChars');

var _invalidChars2 = _interopRequireDefault(_invalidChars);

var _invalidCharsGroup = require('./invalidCharsGroup');

var _invalidCharsGroup2 = _interopRequireDefault(_invalidCharsGroup);

var _invalidDomainChars = require('./invalidDomainChars');

var _invalidDomainChars2 = _interopRequireDefault(_invalidDomainChars);

var _invalidUrlWithoutProtocolPrecedingChars = require('./invalidUrlWithoutProtocolPrecedingChars');

var _invalidUrlWithoutProtocolPrecedingChars2 = _interopRequireDefault(_invalidUrlWithoutProtocolPrecedingChars);

var _latinAccentChars = require('./latinAccentChars');

var _latinAccentChars2 = _interopRequireDefault(_latinAccentChars);

var _nonBmpCodePairs = require('./nonBmpCodePairs');

var _nonBmpCodePairs2 = _interopRequireDefault(_nonBmpCodePairs);

var _punct = require('./punct');

var _punct2 = _interopRequireDefault(_punct);

var _rtlChars = require('./rtlChars');

var _rtlChars2 = _interopRequireDefault(_rtlChars);

var _spaces = require('./spaces');

var _spaces2 = _interopRequireDefault(_spaces);

var _spacesGroup = require('./spacesGroup');

var _spacesGroup2 = _interopRequireDefault(_spacesGroup);

var _urlHasHttps = require('./urlHasHttps');

var _urlHasHttps2 = _interopRequireDefault(_urlHasHttps);

var _urlHasProtocol = require('./urlHasProtocol');

var _urlHasProtocol2 = _interopRequireDefault(_urlHasProtocol);

var _validAsciiDomain = require('./validAsciiDomain');

var _validAsciiDomain2 = _interopRequireDefault(_validAsciiDomain);

var _validateUrlAuthority = require('./validateUrlAuthority');

var _validateUrlAuthority2 = _interopRequireDefault(_validateUrlAuthority);

var _validateUrlDecOctet = require('./validateUrlDecOctet');

var _validateUrlDecOctet2 = _interopRequireDefault(_validateUrlDecOctet);

var _validateUrlDomain = require('./validateUrlDomain');

var _validateUrlDomain2 = _interopRequireDefault(_validateUrlDomain);

var _validateUrlDomainSegment = require('./validateUrlDomainSegment');

var _validateUrlDomainSegment2 = _interopRequireDefault(_validateUrlDomainSegment);

var _validateUrlDomainTld = require('./validateUrlDomainTld');

var _validateUrlDomainTld2 = _interopRequireDefault(_validateUrlDomainTld);

var _validateUrlFragment = require('./validateUrlFragment');

var _validateUrlFragment2 = _interopRequireDefault(_validateUrlFragment);

var _validateUrlHost = require('./validateUrlHost');

var _validateUrlHost2 = _interopRequireDefault(_validateUrlHost);

var _validateUrlIp = require('./validateUrlIp');

var _validateUrlIp2 = _interopRequireDefault(_validateUrlIp);

var _validateUrlIpv = require('./validateUrlIpv4');

var _validateUrlIpv2 = _interopRequireDefault(_validateUrlIpv);

var _validateUrlIpv3 = require('./validateUrlIpv6');

var _validateUrlIpv4 = _interopRequireDefault(_validateUrlIpv3);

var _validateUrlPath = require('./validateUrlPath');

var _validateUrlPath2 = _interopRequireDefault(_validateUrlPath);

var _validateUrlPchar = require('./validateUrlPchar');

var _validateUrlPchar2 = _interopRequireDefault(_validateUrlPchar);

var _validateUrlPctEncoded = require('./validateUrlPctEncoded');

var _validateUrlPctEncoded2 = _interopRequireDefault(_validateUrlPctEncoded);

var _validateUrlPort = require('./validateUrlPort');

var _validateUrlPort2 = _interopRequireDefault(_validateUrlPort);

var _validateUrlQuery = require('./validateUrlQuery');

var _validateUrlQuery2 = _interopRequireDefault(_validateUrlQuery);

var _validateUrlScheme = require('./validateUrlScheme');

var _validateUrlScheme2 = _interopRequireDefault(_validateUrlScheme);

var _validateUrlSubDelims = require('./validateUrlSubDelims');

var _validateUrlSubDelims2 = _interopRequireDefault(_validateUrlSubDelims);

var _validateUrlSubDomainSegment = require('./validateUrlSubDomainSegment');

var _validateUrlSubDomainSegment2 = _interopRequireDefault(_validateUrlSubDomainSegment);

var _validateUrlUnencoded = require('./validateUrlUnencoded');

var _validateUrlUnencoded2 = _interopRequireDefault(_validateUrlUnencoded);

var _validateUrlUnicodeAuthority = require('./validateUrlUnicodeAuthority');

var _validateUrlUnicodeAuthority2 = _interopRequireDefault(_validateUrlUnicodeAuthority);

var _validateUrlUnicodeDomain = require('./validateUrlUnicodeDomain');

var _validateUrlUnicodeDomain2 = _interopRequireDefault(_validateUrlUnicodeDomain);

var _validateUrlUnicodeDomainSegment = require('./validateUrlUnicodeDomainSegment');

var _validateUrlUnicodeDomainSegment2 = _interopRequireDefault(_validateUrlUnicodeDomainSegment);

var _validateUrlUnicodeDomainTld = require('./validateUrlUnicodeDomainTld');

var _validateUrlUnicodeDomainTld2 = _interopRequireDefault(_validateUrlUnicodeDomainTld);

var _validateUrlUnicodeHost = require('./validateUrlUnicodeHost');

var _validateUrlUnicodeHost2 = _interopRequireDefault(_validateUrlUnicodeHost);

var _validateUrlUnicodeSubDomainSegment = require('./validateUrlUnicodeSubDomainSegment');

var _validateUrlUnicodeSubDomainSegment2 = _interopRequireDefault(_validateUrlUnicodeSubDomainSegment);

var _validateUrlUnreserved = require('./validateUrlUnreserved');

var _validateUrlUnreserved2 = _interopRequireDefault(_validateUrlUnreserved);

var _validateUrlUserinfo = require('./validateUrlUserinfo');

var _validateUrlUserinfo2 = _interopRequireDefault(_validateUrlUserinfo);

var _validCashtag = require('./validCashtag');

var _validCashtag2 = _interopRequireDefault(_validCashtag);

var _validCCTLD = require('./validCCTLD');

var _validCCTLD2 = _interopRequireDefault(_validCCTLD);

var _validDomain = require('./validDomain');

var _validDomain2 = _interopRequireDefault(_validDomain);

var _validDomainChars = require('./validDomainChars');

var _validDomainChars2 = _interopRequireDefault(_validDomainChars);

var _validDomainName = require('./validDomainName');

var _validDomainName2 = _interopRequireDefault(_validDomainName);

var _validGeneralUrlPathChars = require('./validGeneralUrlPathChars');

var _validGeneralUrlPathChars2 = _interopRequireDefault(_validGeneralUrlPathChars);

var _validGTLD = require('./validGTLD');

var _validGTLD2 = _interopRequireDefault(_validGTLD);

var _validHashtag = require('./validHashtag');

var _validHashtag2 = _interopRequireDefault(_validHashtag);

var _validMentionOrList = require('./validMentionOrList');

var _validMentionOrList2 = _interopRequireDefault(_validMentionOrList);

var _validMentionPrecedingChars = require('./validMentionPrecedingChars');

var _validMentionPrecedingChars2 = _interopRequireDefault(_validMentionPrecedingChars);

var _validPortNumber = require('./validPortNumber');

var _validPortNumber2 = _interopRequireDefault(_validPortNumber);

var _validPunycode = require('./validPunycode');

var _validPunycode2 = _interopRequireDefault(_validPunycode);

var _validReply = require('./validReply');

var _validReply2 = _interopRequireDefault(_validReply);

var _validSubdomain = require('./validSubdomain');

var _validSubdomain2 = _interopRequireDefault(_validSubdomain);

var _validTcoUrl = require('./validTcoUrl');

var _validTcoUrl2 = _interopRequireDefault(_validTcoUrl);

var _validUrlBalancedParens = require('./validUrlBalancedParens');

var _validUrlBalancedParens2 = _interopRequireDefault(_validUrlBalancedParens);

var _validUrlPath = require('./validUrlPath');

var _validUrlPath2 = _interopRequireDefault(_validUrlPath);

var _validUrlPathEndingChars = require('./validUrlPathEndingChars');

var _validUrlPathEndingChars2 = _interopRequireDefault(_validUrlPathEndingChars);

var _validUrlPrecedingChars = require('./validUrlPrecedingChars');

var _validUrlPrecedingChars2 = _interopRequireDefault(_validUrlPrecedingChars);

var _validUrlQueryChars = require('./validUrlQueryChars');

var _validUrlQueryChars2 = _interopRequireDefault(_validUrlQueryChars);

var _validUrlQueryEndingChars = require('./validUrlQueryEndingChars');

var _validUrlQueryEndingChars2 = _interopRequireDefault(_validUrlQueryEndingChars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  astralLetterAndMarks: _astralLetterAndMarks2.default,
  astralNumerals: _astralNumerals2.default,
  atSigns: _atSigns2.default,
  bmpLetterAndMarks: _bmpLetterAndMarks2.default,
  bmpNumerals: _bmpNumerals2.default,
  cashtag: _cashtag2.default,
  codePoint: _codePoint2.default,
  cyrillicLettersAndMarks: _cyrillicLettersAndMarks2.default,
  endHashtagMatch: _endHashtagMatch2.default,
  endMentionMatch: _endMentionMatch2.default,
  extractUrl: _extractUrl2.default,
  hashSigns: _hashSigns2.default,
  hashtagAlpha: _hashtagAlpha2.default,
  hashtagAlphaNumeric: _hashtagAlphaNumeric2.default,
  hashtagBoundary: _hashtagBoundary2.default,
  hashtagSpecialChars: _hashtagSpecialChars2.default,
  invalidChars: _invalidChars2.default,
  invalidCharsGroup: _invalidCharsGroup2.default,
  invalidDomainChars: _invalidDomainChars2.default,
  invalidUrlWithoutProtocolPrecedingChars: _invalidUrlWithoutProtocolPrecedingChars2.default,
  latinAccentChars: _latinAccentChars2.default,
  nonBmpCodePairs: _nonBmpCodePairs2.default,
  punct: _punct2.default,
  rtlChars: _rtlChars2.default,
  spaces: _spaces2.default,
  spacesGroup: _spacesGroup2.default,
  urlHasHttps: _urlHasHttps2.default,
  urlHasProtocol: _urlHasProtocol2.default,
  validAsciiDomain: _validAsciiDomain2.default,
  validateUrlAuthority: _validateUrlAuthority2.default,
  validateUrlDecOctet: _validateUrlDecOctet2.default,
  validateUrlDomain: _validateUrlDomain2.default,
  validateUrlDomainSegment: _validateUrlDomainSegment2.default,
  validateUrlDomainTld: _validateUrlDomainTld2.default,
  validateUrlFragment: _validateUrlFragment2.default,
  validateUrlHost: _validateUrlHost2.default,
  validateUrlIp: _validateUrlIp2.default,
  validateUrlIpv4: _validateUrlIpv2.default,
  validateUrlIpv6: _validateUrlIpv4.default,
  validateUrlPath: _validateUrlPath2.default,
  validateUrlPchar: _validateUrlPchar2.default,
  validateUrlPctEncoded: _validateUrlPctEncoded2.default,
  validateUrlPort: _validateUrlPort2.default,
  validateUrlQuery: _validateUrlQuery2.default,
  validateUrlScheme: _validateUrlScheme2.default,
  validateUrlSubDelims: _validateUrlSubDelims2.default,
  validateUrlSubDomainSegment: _validateUrlSubDomainSegment2.default,
  validateUrlUnencoded: _validateUrlUnencoded2.default,
  validateUrlUnicodeAuthority: _validateUrlUnicodeAuthority2.default,
  validateUrlUnicodeDomain: _validateUrlUnicodeDomain2.default,
  validateUrlUnicodeDomainSegment: _validateUrlUnicodeDomainSegment2.default,
  validateUrlUnicodeDomainTld: _validateUrlUnicodeDomainTld2.default,
  validateUrlUnicodeHost: _validateUrlUnicodeHost2.default,
  validateUrlUnicodeSubDomainSegment: _validateUrlUnicodeSubDomainSegment2.default,
  validateUrlUnreserved: _validateUrlUnreserved2.default,
  validateUrlUserinfo: _validateUrlUserinfo2.default,
  validCashtag: _validCashtag2.default,
  validCCTLD: _validCCTLD2.default,
  validDomain: _validDomain2.default,
  validDomainChars: _validDomainChars2.default,
  validDomainName: _validDomainName2.default,
  validGeneralUrlPathChars: _validGeneralUrlPathChars2.default,
  validGTLD: _validGTLD2.default,
  validHashtag: _validHashtag2.default,
  validMentionOrList: _validMentionOrList2.default,
  validMentionPrecedingChars: _validMentionPrecedingChars2.default,
  validPortNumber: _validPortNumber2.default,
  validPunycode: _validPunycode2.default,
  validReply: _validReply2.default,
  validSubdomain: _validSubdomain2.default,
  validTcoUrl: _validTcoUrl2.default,
  validUrlBalancedParens: _validUrlBalancedParens2.default,
  validUrlPath: _validUrlPath2.default,
  validUrlPathEndingChars: _validUrlPathEndingChars2.default,
  validUrlPrecedingChars: _validUrlPrecedingChars2.default,
  validUrlQueryChars: _validUrlQueryChars2.default,
  validUrlQueryEndingChars: _validUrlQueryEndingChars2.default
}; // Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

module.exports = exports['default'];
},{"./astralLetterAndMarks":"../node_modules/twitter-text/dist/regexp/astralLetterAndMarks.js","./astralNumerals":"../node_modules/twitter-text/dist/regexp/astralNumerals.js","./atSigns":"../node_modules/twitter-text/dist/regexp/atSigns.js","./bmpLetterAndMarks":"../node_modules/twitter-text/dist/regexp/bmpLetterAndMarks.js","./bmpNumerals":"../node_modules/twitter-text/dist/regexp/bmpNumerals.js","./cashtag":"../node_modules/twitter-text/dist/regexp/cashtag.js","./codePoint":"../node_modules/twitter-text/dist/regexp/codePoint.js","./cyrillicLettersAndMarks":"../node_modules/twitter-text/dist/regexp/cyrillicLettersAndMarks.js","./endHashtagMatch":"../node_modules/twitter-text/dist/regexp/endHashtagMatch.js","./endMentionMatch":"../node_modules/twitter-text/dist/regexp/endMentionMatch.js","./extractUrl":"../node_modules/twitter-text/dist/regexp/extractUrl.js","./hashSigns":"../node_modules/twitter-text/dist/regexp/hashSigns.js","./hashtagAlpha":"../node_modules/twitter-text/dist/regexp/hashtagAlpha.js","./hashtagAlphaNumeric":"../node_modules/twitter-text/dist/regexp/hashtagAlphaNumeric.js","./hashtagBoundary":"../node_modules/twitter-text/dist/regexp/hashtagBoundary.js","./hashtagSpecialChars":"../node_modules/twitter-text/dist/regexp/hashtagSpecialChars.js","./invalidChars":"../node_modules/twitter-text/dist/regexp/invalidChars.js","./invalidCharsGroup":"../node_modules/twitter-text/dist/regexp/invalidCharsGroup.js","./invalidDomainChars":"../node_modules/twitter-text/dist/regexp/invalidDomainChars.js","./invalidUrlWithoutProtocolPrecedingChars":"../node_modules/twitter-text/dist/regexp/invalidUrlWithoutProtocolPrecedingChars.js","./latinAccentChars":"../node_modules/twitter-text/dist/regexp/latinAccentChars.js","./nonBmpCodePairs":"../node_modules/twitter-text/dist/regexp/nonBmpCodePairs.js","./punct":"../node_modules/twitter-text/dist/regexp/punct.js","./rtlChars":"../node_modules/twitter-text/dist/regexp/rtlChars.js","./spaces":"../node_modules/twitter-text/dist/regexp/spaces.js","./spacesGroup":"../node_modules/twitter-text/dist/regexp/spacesGroup.js","./urlHasHttps":"../node_modules/twitter-text/dist/regexp/urlHasHttps.js","./urlHasProtocol":"../node_modules/twitter-text/dist/regexp/urlHasProtocol.js","./validAsciiDomain":"../node_modules/twitter-text/dist/regexp/validAsciiDomain.js","./validateUrlAuthority":"../node_modules/twitter-text/dist/regexp/validateUrlAuthority.js","./validateUrlDecOctet":"../node_modules/twitter-text/dist/regexp/validateUrlDecOctet.js","./validateUrlDomain":"../node_modules/twitter-text/dist/regexp/validateUrlDomain.js","./validateUrlDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlDomainSegment.js","./validateUrlDomainTld":"../node_modules/twitter-text/dist/regexp/validateUrlDomainTld.js","./validateUrlFragment":"../node_modules/twitter-text/dist/regexp/validateUrlFragment.js","./validateUrlHost":"../node_modules/twitter-text/dist/regexp/validateUrlHost.js","./validateUrlIp":"../node_modules/twitter-text/dist/regexp/validateUrlIp.js","./validateUrlIpv4":"../node_modules/twitter-text/dist/regexp/validateUrlIpv4.js","./validateUrlIpv6":"../node_modules/twitter-text/dist/regexp/validateUrlIpv6.js","./validateUrlPath":"../node_modules/twitter-text/dist/regexp/validateUrlPath.js","./validateUrlPchar":"../node_modules/twitter-text/dist/regexp/validateUrlPchar.js","./validateUrlPctEncoded":"../node_modules/twitter-text/dist/regexp/validateUrlPctEncoded.js","./validateUrlPort":"../node_modules/twitter-text/dist/regexp/validateUrlPort.js","./validateUrlQuery":"../node_modules/twitter-text/dist/regexp/validateUrlQuery.js","./validateUrlScheme":"../node_modules/twitter-text/dist/regexp/validateUrlScheme.js","./validateUrlSubDelims":"../node_modules/twitter-text/dist/regexp/validateUrlSubDelims.js","./validateUrlSubDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlSubDomainSegment.js","./validateUrlUnencoded":"../node_modules/twitter-text/dist/regexp/validateUrlUnencoded.js","./validateUrlUnicodeAuthority":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeAuthority.js","./validateUrlUnicodeDomain":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomain.js","./validateUrlUnicodeDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomainSegment.js","./validateUrlUnicodeDomainTld":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeDomainTld.js","./validateUrlUnicodeHost":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeHost.js","./validateUrlUnicodeSubDomainSegment":"../node_modules/twitter-text/dist/regexp/validateUrlUnicodeSubDomainSegment.js","./validateUrlUnreserved":"../node_modules/twitter-text/dist/regexp/validateUrlUnreserved.js","./validateUrlUserinfo":"../node_modules/twitter-text/dist/regexp/validateUrlUserinfo.js","./validCashtag":"../node_modules/twitter-text/dist/regexp/validCashtag.js","./validCCTLD":"../node_modules/twitter-text/dist/regexp/validCCTLD.js","./validDomain":"../node_modules/twitter-text/dist/regexp/validDomain.js","./validDomainChars":"../node_modules/twitter-text/dist/regexp/validDomainChars.js","./validDomainName":"../node_modules/twitter-text/dist/regexp/validDomainName.js","./validGeneralUrlPathChars":"../node_modules/twitter-text/dist/regexp/validGeneralUrlPathChars.js","./validGTLD":"../node_modules/twitter-text/dist/regexp/validGTLD.js","./validHashtag":"../node_modules/twitter-text/dist/regexp/validHashtag.js","./validMentionOrList":"../node_modules/twitter-text/dist/regexp/validMentionOrList.js","./validMentionPrecedingChars":"../node_modules/twitter-text/dist/regexp/validMentionPrecedingChars.js","./validPortNumber":"../node_modules/twitter-text/dist/regexp/validPortNumber.js","./validPunycode":"../node_modules/twitter-text/dist/regexp/validPunycode.js","./validReply":"../node_modules/twitter-text/dist/regexp/validReply.js","./validSubdomain":"../node_modules/twitter-text/dist/regexp/validSubdomain.js","./validTcoUrl":"../node_modules/twitter-text/dist/regexp/validTcoUrl.js","./validUrlBalancedParens":"../node_modules/twitter-text/dist/regexp/validUrlBalancedParens.js","./validUrlPath":"../node_modules/twitter-text/dist/regexp/validUrlPath.js","./validUrlPathEndingChars":"../node_modules/twitter-text/dist/regexp/validUrlPathEndingChars.js","./validUrlPrecedingChars":"../node_modules/twitter-text/dist/regexp/validUrlPrecedingChars.js","./validUrlQueryChars":"../node_modules/twitter-text/dist/regexp/validUrlQueryChars.js","./validUrlQueryEndingChars":"../node_modules/twitter-text/dist/regexp/validUrlQueryEndingChars.js"}],"../node_modules/twitter-text/dist/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autoLink = require('./autoLink');

var _autoLink2 = _interopRequireDefault(_autoLink);

var _autoLinkCashtags = require('./autoLinkCashtags');

var _autoLinkCashtags2 = _interopRequireDefault(_autoLinkCashtags);

var _autoLinkEntities = require('./autoLinkEntities');

var _autoLinkEntities2 = _interopRequireDefault(_autoLinkEntities);

var _autoLinkHashtags = require('./autoLinkHashtags');

var _autoLinkHashtags2 = _interopRequireDefault(_autoLinkHashtags);

var _autoLinkUrlsCustom = require('./autoLinkUrlsCustom');

var _autoLinkUrlsCustom2 = _interopRequireDefault(_autoLinkUrlsCustom);

var _autoLinkUsernamesOrLists = require('./autoLinkUsernamesOrLists');

var _autoLinkUsernamesOrLists2 = _interopRequireDefault(_autoLinkUsernamesOrLists);

var _autoLinkWithJSON = require('./autoLinkWithJSON');

var _autoLinkWithJSON2 = _interopRequireDefault(_autoLinkWithJSON);

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _convertUnicodeIndices = require('./convertUnicodeIndices');

var _convertUnicodeIndices2 = _interopRequireDefault(_convertUnicodeIndices);

var _extractCashtags = require('./extractCashtags');

var _extractCashtags2 = _interopRequireDefault(_extractCashtags);

var _extractCashtagsWithIndices = require('./extractCashtagsWithIndices');

var _extractCashtagsWithIndices2 = _interopRequireDefault(_extractCashtagsWithIndices);

var _extractEntitiesWithIndices = require('./extractEntitiesWithIndices');

var _extractEntitiesWithIndices2 = _interopRequireDefault(_extractEntitiesWithIndices);

var _extractHashtags = require('./extractHashtags');

var _extractHashtags2 = _interopRequireDefault(_extractHashtags);

var _extractHashtagsWithIndices = require('./extractHashtagsWithIndices');

var _extractHashtagsWithIndices2 = _interopRequireDefault(_extractHashtagsWithIndices);

var _extractHtmlAttrsFromOptions = require('./extractHtmlAttrsFromOptions');

var _extractHtmlAttrsFromOptions2 = _interopRequireDefault(_extractHtmlAttrsFromOptions);

var _extractMentions = require('./extractMentions');

var _extractMentions2 = _interopRequireDefault(_extractMentions);

var _extractMentionsOrListsWithIndices = require('./extractMentionsOrListsWithIndices');

var _extractMentionsOrListsWithIndices2 = _interopRequireDefault(_extractMentionsOrListsWithIndices);

var _extractMentionsWithIndices = require('./extractMentionsWithIndices');

var _extractMentionsWithIndices2 = _interopRequireDefault(_extractMentionsWithIndices);

var _extractReplies = require('./extractReplies');

var _extractReplies2 = _interopRequireDefault(_extractReplies);

var _extractUrls = require('./extractUrls');

var _extractUrls2 = _interopRequireDefault(_extractUrls);

var _extractUrlsWithIndices = require('./extractUrlsWithIndices');

var _extractUrlsWithIndices2 = _interopRequireDefault(_extractUrlsWithIndices);

var _getTweetLength = require('./getTweetLength');

var _getTweetLength2 = _interopRequireDefault(_getTweetLength);

var _getUnicodeTextLength = require('./getUnicodeTextLength');

var _getUnicodeTextLength2 = _interopRequireDefault(_getUnicodeTextLength);

var _hasInvalidCharacters = require('./hasInvalidCharacters');

var _hasInvalidCharacters2 = _interopRequireDefault(_hasInvalidCharacters);

var _hitHighlight = require('./hitHighlight');

var _hitHighlight2 = _interopRequireDefault(_hitHighlight);

var _htmlEscape = require('./htmlEscape');

var _htmlEscape2 = _interopRequireDefault(_htmlEscape);

var _isInvalidTweet = require('./isInvalidTweet');

var _isInvalidTweet2 = _interopRequireDefault(_isInvalidTweet);

var _isValidHashtag = require('./isValidHashtag');

var _isValidHashtag2 = _interopRequireDefault(_isValidHashtag);

var _isValidList = require('./isValidList');

var _isValidList2 = _interopRequireDefault(_isValidList);

var _isValidTweetText = require('./isValidTweetText');

var _isValidTweetText2 = _interopRequireDefault(_isValidTweetText);

var _isValidUrl = require('./isValidUrl');

var _isValidUrl2 = _interopRequireDefault(_isValidUrl);

var _isValidUsername = require('./isValidUsername');

var _isValidUsername2 = _interopRequireDefault(_isValidUsername);

var _linkTextWithEntity = require('./linkTextWithEntity');

var _linkTextWithEntity2 = _interopRequireDefault(_linkTextWithEntity);

var _linkToCashtag = require('./linkToCashtag');

var _linkToCashtag2 = _interopRequireDefault(_linkToCashtag);

var _linkToHashtag = require('./linkToHashtag');

var _linkToHashtag2 = _interopRequireDefault(_linkToHashtag);

var _linkToMentionAndList = require('./linkToMentionAndList');

var _linkToMentionAndList2 = _interopRequireDefault(_linkToMentionAndList);

var _linkToText = require('./linkToText');

var _linkToText2 = _interopRequireDefault(_linkToText);

var _linkToTextWithSymbol = require('./linkToTextWithSymbol');

var _linkToTextWithSymbol2 = _interopRequireDefault(_linkToTextWithSymbol);

var _linkToUrl = require('./linkToUrl');

var _linkToUrl2 = _interopRequireDefault(_linkToUrl);

var _modifyIndicesFromUTF16ToUnicode = require('./modifyIndicesFromUTF16ToUnicode');

var _modifyIndicesFromUTF16ToUnicode2 = _interopRequireDefault(_modifyIndicesFromUTF16ToUnicode);

var _modifyIndicesFromUnicodeToUTF = require('./modifyIndicesFromUnicodeToUTF16');

var _modifyIndicesFromUnicodeToUTF2 = _interopRequireDefault(_modifyIndicesFromUnicodeToUTF);

var _index = require('./regexp/index');

var _index2 = _interopRequireDefault(_index);

var _removeOverlappingEntities = require('./removeOverlappingEntities');

var _removeOverlappingEntities2 = _interopRequireDefault(_removeOverlappingEntities);

var _parseTweet = require('./parseTweet');

var _parseTweet2 = _interopRequireDefault(_parseTweet);

var _splitTags = require('./splitTags');

var _splitTags2 = _interopRequireDefault(_splitTags);

var _tagAttrs = require('./tagAttrs');

var _tagAttrs2 = _interopRequireDefault(_tagAttrs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright 2018 Twitter, Inc.
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

exports.default = {
  autoLink: _autoLink2.default,
  autoLinkCashtags: _autoLinkCashtags2.default,
  autoLinkEntities: _autoLinkEntities2.default,
  autoLinkHashtags: _autoLinkHashtags2.default,
  autoLinkUrlsCustom: _autoLinkUrlsCustom2.default,
  autoLinkUsernamesOrLists: _autoLinkUsernamesOrLists2.default,
  autoLinkWithJSON: _autoLinkWithJSON2.default,
  configs: _configs2.default,
  convertUnicodeIndices: _convertUnicodeIndices2.default,
  extractCashtags: _extractCashtags2.default,
  extractCashtagsWithIndices: _extractCashtagsWithIndices2.default,
  extractEntitiesWithIndices: _extractEntitiesWithIndices2.default,
  extractHashtags: _extractHashtags2.default,
  extractHashtagsWithIndices: _extractHashtagsWithIndices2.default,
  extractHtmlAttrsFromOptions: _extractHtmlAttrsFromOptions2.default,
  extractMentions: _extractMentions2.default,
  extractMentionsOrListsWithIndices: _extractMentionsOrListsWithIndices2.default,
  extractMentionsWithIndices: _extractMentionsWithIndices2.default,
  extractReplies: _extractReplies2.default,
  extractUrls: _extractUrls2.default,
  extractUrlsWithIndices: _extractUrlsWithIndices2.default,
  getTweetLength: _getTweetLength2.default,
  getUnicodeTextLength: _getUnicodeTextLength2.default,
  hasInvalidCharacters: _hasInvalidCharacters2.default,
  hitHighlight: _hitHighlight2.default,
  htmlEscape: _htmlEscape2.default,
  isInvalidTweet: _isInvalidTweet2.default,
  isValidHashtag: _isValidHashtag2.default,
  isValidList: _isValidList2.default,
  isValidTweetText: _isValidTweetText2.default,
  isValidUrl: _isValidUrl2.default,
  isValidUsername: _isValidUsername2.default,
  linkTextWithEntity: _linkTextWithEntity2.default,
  linkToCashtag: _linkToCashtag2.default,
  linkToHashtag: _linkToHashtag2.default,
  linkToMentionAndList: _linkToMentionAndList2.default,
  linkToText: _linkToText2.default,
  linkToTextWithSymbol: _linkToTextWithSymbol2.default,
  linkToUrl: _linkToUrl2.default,
  modifyIndicesFromUTF16ToUnicode: _modifyIndicesFromUTF16ToUnicode2.default,
  modifyIndicesFromUnicodeToUTF16: _modifyIndicesFromUnicodeToUTF2.default,
  regexen: _index2.default,
  removeOverlappingEntities: _removeOverlappingEntities2.default,
  parseTweet: _parseTweet2.default,
  splitTags: _splitTags2.default,
  tagAttrs: _tagAttrs2.default
};
module.exports = exports['default'];
},{"./autoLink":"../node_modules/twitter-text/dist/autoLink.js","./autoLinkCashtags":"../node_modules/twitter-text/dist/autoLinkCashtags.js","./autoLinkEntities":"../node_modules/twitter-text/dist/autoLinkEntities.js","./autoLinkHashtags":"../node_modules/twitter-text/dist/autoLinkHashtags.js","./autoLinkUrlsCustom":"../node_modules/twitter-text/dist/autoLinkUrlsCustom.js","./autoLinkUsernamesOrLists":"../node_modules/twitter-text/dist/autoLinkUsernamesOrLists.js","./autoLinkWithJSON":"../node_modules/twitter-text/dist/autoLinkWithJSON.js","./configs":"../node_modules/twitter-text/dist/configs.js","./convertUnicodeIndices":"../node_modules/twitter-text/dist/convertUnicodeIndices.js","./extractCashtags":"../node_modules/twitter-text/dist/extractCashtags.js","./extractCashtagsWithIndices":"../node_modules/twitter-text/dist/extractCashtagsWithIndices.js","./extractEntitiesWithIndices":"../node_modules/twitter-text/dist/extractEntitiesWithIndices.js","./extractHashtags":"../node_modules/twitter-text/dist/extractHashtags.js","./extractHashtagsWithIndices":"../node_modules/twitter-text/dist/extractHashtagsWithIndices.js","./extractHtmlAttrsFromOptions":"../node_modules/twitter-text/dist/extractHtmlAttrsFromOptions.js","./extractMentions":"../node_modules/twitter-text/dist/extractMentions.js","./extractMentionsOrListsWithIndices":"../node_modules/twitter-text/dist/extractMentionsOrListsWithIndices.js","./extractMentionsWithIndices":"../node_modules/twitter-text/dist/extractMentionsWithIndices.js","./extractReplies":"../node_modules/twitter-text/dist/extractReplies.js","./extractUrls":"../node_modules/twitter-text/dist/extractUrls.js","./extractUrlsWithIndices":"../node_modules/twitter-text/dist/extractUrlsWithIndices.js","./getTweetLength":"../node_modules/twitter-text/dist/getTweetLength.js","./getUnicodeTextLength":"../node_modules/twitter-text/dist/getUnicodeTextLength.js","./hasInvalidCharacters":"../node_modules/twitter-text/dist/hasInvalidCharacters.js","./hitHighlight":"../node_modules/twitter-text/dist/hitHighlight.js","./htmlEscape":"../node_modules/twitter-text/dist/htmlEscape.js","./isInvalidTweet":"../node_modules/twitter-text/dist/isInvalidTweet.js","./isValidHashtag":"../node_modules/twitter-text/dist/isValidHashtag.js","./isValidList":"../node_modules/twitter-text/dist/isValidList.js","./isValidTweetText":"../node_modules/twitter-text/dist/isValidTweetText.js","./isValidUrl":"../node_modules/twitter-text/dist/isValidUrl.js","./isValidUsername":"../node_modules/twitter-text/dist/isValidUsername.js","./linkTextWithEntity":"../node_modules/twitter-text/dist/linkTextWithEntity.js","./linkToCashtag":"../node_modules/twitter-text/dist/linkToCashtag.js","./linkToHashtag":"../node_modules/twitter-text/dist/linkToHashtag.js","./linkToMentionAndList":"../node_modules/twitter-text/dist/linkToMentionAndList.js","./linkToText":"../node_modules/twitter-text/dist/linkToText.js","./linkToTextWithSymbol":"../node_modules/twitter-text/dist/linkToTextWithSymbol.js","./linkToUrl":"../node_modules/twitter-text/dist/linkToUrl.js","./modifyIndicesFromUTF16ToUnicode":"../node_modules/twitter-text/dist/modifyIndicesFromUTF16ToUnicode.js","./modifyIndicesFromUnicodeToUTF16":"../node_modules/twitter-text/dist/modifyIndicesFromUnicodeToUTF16.js","./regexp/index":"../node_modules/twitter-text/dist/regexp/index.js","./removeOverlappingEntities":"../node_modules/twitter-text/dist/removeOverlappingEntities.js","./parseTweet":"../node_modules/twitter-text/dist/parseTweet.js","./splitTags":"../node_modules/twitter-text/dist/splitTags.js","./tagAttrs":"../node_modules/twitter-text/dist/tagAttrs.js"}],"../node_modules/break-tweet-autolink/index.js":[function(require,module,exports) {
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tw = __importStar(require("twitter-text"));
exports.DEFAULT_CONFIG = {
    hashtag: false,
    urlNoScheme: true,
    urlWithScheme: false,
    cashtag: true,
    mention: false,
    list: false,
};
const RE_DOT = /\./g;
class TweetAutoLinkBreaker {
    constructor(cfg) {
        this.config = Object.assign({}, exports.DEFAULT_CONFIG, (cfg || {}));
    }
    breakAutoLinks(text) {
        const entities = tw.extractEntitiesWithIndices(text);
        if (entities.length === 0) {
            return text;
        }
        const tokens = [];
        for (const entity of entities.reverse()) {
            let replaced;
            if (this.config.hashtag && 'hashtag' in entity) {
                replaced = '#\u200B' + entity.hashtag;
            }
            else if (this.config.urlWithScheme &&
                'url' in entity &&
                (entity.url.startsWith('https://') || entity.url.startsWith('http://'))) {
                replaced = entity.url.replace(RE_DOT, '.\u200B');
            }
            else if ((this.config.urlNoScheme || this.config.urlWithScheme) && 'url' in entity) {
                replaced = entity.url.replace(RE_DOT, '.\u200B');
            }
            else if (this.config.cashtag && 'cashtag' in entity) {
                replaced = '$\u200B' + entity.cashtag;
            }
            else if (this.config.list && 'listSlug' in entity && entity.listSlug.length > 0) {
                replaced = `@\u200B${entity.screenName}${entity.listSlug}`;
            }
            else if (this.config.mention && 'screenName' in entity) {
                replaced = '@\u200B' + entity.screenName;
            }
            else {
                const idx = entity.indices[0];
                tokens.push(text.slice(idx));
                text = text.slice(0, idx);
                continue;
            }
            tokens.push(text.slice(entity.indices[1]));
            tokens.push(replaced);
            text = text.slice(0, entity.indices[0]);
        }
        tokens.push(text);
        return tokens.reverse().join('');
    }
}
exports.TweetAutoLinkBreaker = TweetAutoLinkBreaker;

},{"twitter-text":"../node_modules/twitter-text/dist/index.js"}],"main.js":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var break_tweet_autolink_1 = require("break-tweet-autolink");

var CONFIG_NAMES = Object.keys(break_tweet_autolink_1.DEFAULT_CONFIG);
var CLIPBOARD_UNSUPPORTED = navigator.clipboard === undefined || navigator.clipboard.readText === undefined || navigator.clipboard.writeText === undefined;

var CheckMark =
/*#__PURE__*/
function () {
  function CheckMark() {
    _classCallCheck(this, CheckMark);

    this.timer = null;
    this.elem = document.querySelector('.unlink-done');
    this.elem.addEventListener('animationend', this.onAnimationEnd.bind(this));
  }

  _createClass(CheckMark, [{
    key: "bounceIn",
    value: function bounceIn() {
      this.elem.classList.remove('fade-out');

      if (this.timer !== null) {
        window.clearTimeout(this.timer);
        this.timer = null;
        this.elem.style.display = 'none';
      }

      this.timer = window.setTimeout(this.fadeOut.bind(this), 2000);
      this.elem.classList.add('bounce-in');
      this.elem.style.display = 'block';
    }
  }, {
    key: "fadeOut",
    value: function fadeOut() {
      this.elem.classList.remove('bounce-in');
      this.elem.classList.add('fade-out');
      this.timer = null;
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd() {
      if (this.timer === null) {
        this.elem.style.display = 'none';
      }
    }
  }]);

  return CheckMark;
}();

var checkMark = new CheckMark();
var unlinkButton = document.getElementById('unlink-btn');

function readOptions() {
  var ret = {};

  for (var _i = 0, _CONFIG_NAMES = CONFIG_NAMES; _i < _CONFIG_NAMES.length; _i++) {
    var name = _CONFIG_NAMES[_i];
    var e = document.getElementById("option-".concat(name));
    ret[name] = e.checked;
  }

  return ret;
}

if (CLIPBOARD_UNSUPPORTED) {
  var fallbackContainer = document.getElementById('fallback-textarea');
  var textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  textarea.placeholder = 'Paste tweet here';
  textarea.style.marginBottom = '12px';
  fallbackContainer.appendChild(textarea);
  unlinkButton.innerText = 'Unlink';
  unlinkButton.addEventListener('click', function () {
    var breaker = new break_tweet_autolink_1.TweetAutoLinkBreaker(readOptions());
    var text = textarea.value;
    var unlinked = breaker.breakAutoLinks(text);

    if (text !== unlinked) {
      textarea.value = unlinked;
    }

    checkMark.bounceIn();
  });
} else {
  unlinkButton.addEventListener('click', function () {
    var breaker = new break_tweet_autolink_1.TweetAutoLinkBreaker(readOptions());
    navigator.clipboard.readText().then(function (text) {
      var unlinked = breaker.breakAutoLinks(text);

      if (text === unlinked) {
        return;
      }

      return navigator.clipboard.writeText(unlinked);
    }).then(function () {
      checkMark.bounceIn();
    }).catch(function (err) {
      alert(err.message);
    });
  });
}
},{"break-tweet-autolink":"../node_modules/break-tweet-autolink/index.js"}]},{},["main.js"], null)
//# sourceMappingURL=/index.js.map