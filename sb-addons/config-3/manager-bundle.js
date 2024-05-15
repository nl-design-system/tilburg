try{
(()=>{var ar=__STORYBOOK_API__,{ActiveTabs:nr,Consumer:or,ManagerContext:ir,Provider:sr,addons:Y,combineParameters:pr,controlOrMetaKey:lr,controlOrMetaSymbol:dr,eventMatchesShortcut:ur,eventToShortcut:fr,isMacLike:cr,isShortcutTaken:gr,keyToSymbol:br,merge:mr,mockChannel:hr,optionOrAltSymbol:yr,shortcutMatchesShortcut:vr,shortcutToHumanString:xr,types:Fr,useAddonState:wr,useArgTypes:Cr,useArgs:Sr,useChannel:kr,useGlobalTypes:Pr,useGlobals:Br,useParameter:Tr,useSharedState:Or,useStoryPrepared:Ir,useStorybookApi:_r,useStorybookState:jr}=__STORYBOOK_API__;var K=(()=>{let e;return typeof window<"u"?e=window:typeof globalThis<"u"?e=globalThis:typeof window<"u"?e=window:typeof self<"u"?e=self:e={},e})();var qr=__STORYBOOK_CLIENT_LOGGER__,{deprecate:Gr,logger:W,once:Nr,pretty:Lr}=__STORYBOOK_CLIENT_LOGGER__;function v(){return v=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},v.apply(this,arguments)}function ie(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e,r){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,a){return t.__proto__=a,t},x(e,r)}function se(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,x(e,r)}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(r){return r.__proto__||Object.getPrototypeOf(r)},A(e)}function pe(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}function X(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(X=function(){return!!e})()}function le(e,r,t){if(X())return Reflect.construct.apply(null,arguments);var a=[null];a.push.apply(a,r);var n=new(e.bind.apply(e,a));return t&&x(n,t.prototype),n}function H(e){var r=typeof Map=="function"?new Map:void 0;return H=function(t){if(t===null||!pe(t))return t;if(typeof t!="function")throw new TypeError("Super expression must either be null or a function");if(typeof r<"u"){if(r.has(t))return r.get(t);r.set(t,a)}function a(){return le(t,arguments,A(this).constructor)}return a.prototype=Object.create(t.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),x(a,t)},H(e)}var de={1:`Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,2:`Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,3:`Passed an incorrect argument to a color function, please pass a string representation of a color.

`,4:`Couldn't generate valid rgb string from %s, it returned %s.

`,5:`Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,6:`Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,7:`Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,8:`Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,9:`Please provide a number of steps to the modularScale helper.

`,10:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,11:`Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,12:`Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,13:`Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,14:`Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,15:`Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,16:`You must provide a template to this method.

`,17:`You passed an unsupported selector state to this method.

`,18:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,19:`fromSize and toSize must be provided as stringified numbers with the same units.

`,20:`expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,21:"expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",22:"expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",23:`fontFace expects a name of a font-family.

`,24:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,25:`fontFace expects localFonts to be an array.

`,26:`fontFace expects fileFormats to be an array.

`,27:`radialGradient requries at least 2 color-stops to properly render.

`,28:`Please supply a filename to retinaImage() as the first argument.

`,29:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,30:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",31:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,32:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,33:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,34:`borderRadius expects a radius value as a string or number as the second argument.

`,35:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,36:`Property must be a string value.

`,37:`Syntax Error at %s.

`,38:`Formula contains a function that needs parentheses at %s.

`,39:`Formula is missing closing parenthesis at %s.

`,40:`Formula has too many closing parentheses at %s.

`,41:`All values in a formula must have the same unit or be unitless.

`,42:`Please provide a number of steps to the modularScale helper.

`,43:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,44:`Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,45:`Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,46:`Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,47:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,48:`fromSize and toSize must be provided as stringified numbers with the same units.

`,49:`Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,50:`Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,51:`Expects the first argument object to have the properties prop, fromSize, and toSize.

`,52:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,53:`fontFace expects localFonts to be an array.

`,54:`fontFace expects fileFormats to be an array.

`,55:`fontFace expects a name of a font-family.

`,56:`linearGradient requries at least 2 color-stops to properly render.

`,57:`radialGradient requries at least 2 color-stops to properly render.

`,58:`Please supply a filename to retinaImage() as the first argument.

`,59:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,60:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",61:`Property must be a string value.

`,62:`borderRadius expects a radius value as a string or number as the second argument.

`,63:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,64:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,65:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,66:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,67:`You must provide a template to this method.

`,68:`You passed an unsupported selector state to this method.

`,69:`Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,70:`Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,71:`Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,72:`Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,73:`Please provide a valid CSS variable.

`,74:`CSS variable not found and no default was provided.

`,75:`important requires a valid style object, got a %s instead.

`,76:`fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,77:`remToPx expects a value in "rem" but you provided it in "%s".

`,78:`base must be set in "px" or "%" but you set it in "%s".
`};function ue(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var a=r[0],n=[],o;for(o=1;o<r.length;o+=1)n.push(r[o]);return n.forEach(function(s){a=a.replace(/%[a-z]/,s)}),a}var u=function(e){se(r,e);function r(t){for(var a,n=arguments.length,o=new Array(n>1?n-1:0),s=1;s<n;s++)o[s-1]=arguments[s];return a=e.call(this,ue.apply(void 0,[de[t]].concat(o)))||this,ie(a)}return r}(H(Error));function j(e){return Math.round(e*255)}function fe(e,r,t){return j(e)+","+j(r)+","+j(t)}function F(e,r,t,a){if(a===void 0&&(a=fe),r===0)return a(t,t,t);var n=(e%360+360)%360/60,o=(1-Math.abs(2*t-1))*r,s=o*(1-Math.abs(n%2-1)),p=0,l=0,d=0;n>=0&&n<1?(p=o,l=s):n>=1&&n<2?(p=s,l=o):n>=2&&n<3?(l=o,d=s):n>=3&&n<4?(l=s,d=o):n>=4&&n<5?(p=s,d=o):n>=5&&n<6&&(p=o,d=s);var h=t-o/2,y=p+h,f=l+h,_=d+h;return a(y,f,_)}var U={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function ce(e){if(typeof e!="string")return e;var r=e.toLowerCase();return U[r]?"#"+U[r]:e}var ge=/^#[a-fA-F0-9]{6}$/,be=/^#[a-fA-F0-9]{8}$/,me=/^#[a-fA-F0-9]{3}$/,he=/^#[a-fA-F0-9]{4}$/,R=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,ye=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,ve=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,xe=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function T(e){if(typeof e!="string")throw new u(3);var r=ce(e);if(r.match(ge))return{red:parseInt(""+r[1]+r[2],16),green:parseInt(""+r[3]+r[4],16),blue:parseInt(""+r[5]+r[6],16)};if(r.match(be)){var t=parseFloat((parseInt(""+r[7]+r[8],16)/255).toFixed(2));return{red:parseInt(""+r[1]+r[2],16),green:parseInt(""+r[3]+r[4],16),blue:parseInt(""+r[5]+r[6],16),alpha:t}}if(r.match(me))return{red:parseInt(""+r[1]+r[1],16),green:parseInt(""+r[2]+r[2],16),blue:parseInt(""+r[3]+r[3],16)};if(r.match(he)){var a=parseFloat((parseInt(""+r[4]+r[4],16)/255).toFixed(2));return{red:parseInt(""+r[1]+r[1],16),green:parseInt(""+r[2]+r[2],16),blue:parseInt(""+r[3]+r[3],16),alpha:a}}var n=R.exec(r);if(n)return{red:parseInt(""+n[1],10),green:parseInt(""+n[2],10),blue:parseInt(""+n[3],10)};var o=ye.exec(r.substring(0,50));if(o)return{red:parseInt(""+o[1],10),green:parseInt(""+o[2],10),blue:parseInt(""+o[3],10),alpha:parseFloat(""+o[4])>1?parseFloat(""+o[4])/100:parseFloat(""+o[4])};var s=ve.exec(r);if(s){var p=parseInt(""+s[1],10),l=parseInt(""+s[2],10)/100,d=parseInt(""+s[3],10)/100,h="rgb("+F(p,l,d)+")",y=R.exec(h);if(!y)throw new u(4,r,h);return{red:parseInt(""+y[1],10),green:parseInt(""+y[2],10),blue:parseInt(""+y[3],10)}}var f=xe.exec(r.substring(0,50));if(f){var _=parseInt(""+f[1],10),ne=parseInt(""+f[2],10)/100,oe=parseInt(""+f[3],10)/100,L="rgb("+F(_,ne,oe)+")",S=R.exec(L);if(!S)throw new u(4,r,L);return{red:parseInt(""+S[1],10),green:parseInt(""+S[2],10),blue:parseInt(""+S[3],10),alpha:parseFloat(""+f[4])>1?parseFloat(""+f[4])/100:parseFloat(""+f[4])}}throw new u(5)}function Fe(e){var r=e.red/255,t=e.green/255,a=e.blue/255,n=Math.max(r,t,a),o=Math.min(r,t,a),s=(n+o)/2;if(n===o)return e.alpha!==void 0?{hue:0,saturation:0,lightness:s,alpha:e.alpha}:{hue:0,saturation:0,lightness:s};var p,l=n-o,d=s>.5?l/(2-n-o):l/(n+o);switch(n){case r:p=(t-a)/l+(t<a?6:0);break;case t:p=(a-r)/l+2;break;default:p=(r-t)/l+4;break}return p*=60,e.alpha!==void 0?{hue:p,saturation:d,lightness:s,alpha:e.alpha}:{hue:p,saturation:d,lightness:s}}function Z(e){return Fe(T(e))}var we=function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},D=we;function m(e){var r=e.toString(16);return r.length===1?"0"+r:r}function E(e){return m(Math.round(e*255))}function Ce(e,r,t){return D("#"+E(e)+E(r)+E(t))}function P(e,r,t){return F(e,r,t,Ce)}function Se(e,r,t){if(typeof e=="number"&&typeof r=="number"&&typeof t=="number")return P(e,r,t);if(typeof e=="object"&&r===void 0&&t===void 0)return P(e.hue,e.saturation,e.lightness);throw new u(1)}function ke(e,r,t,a){if(typeof e=="number"&&typeof r=="number"&&typeof t=="number"&&typeof a=="number")return a>=1?P(e,r,t):"rgba("+F(e,r,t)+","+a+")";if(typeof e=="object"&&r===void 0&&t===void 0&&a===void 0)return e.alpha>=1?P(e.hue,e.saturation,e.lightness):"rgba("+F(e.hue,e.saturation,e.lightness)+","+e.alpha+")";throw new u(2)}function $(e,r,t){if(typeof e=="number"&&typeof r=="number"&&typeof t=="number")return D("#"+m(e)+m(r)+m(t));if(typeof e=="object"&&r===void 0&&t===void 0)return D("#"+m(e.red)+m(e.green)+m(e.blue));throw new u(6)}function w(e,r,t,a){if(typeof e=="string"&&typeof r=="number"){var n=T(e);return"rgba("+n.red+","+n.green+","+n.blue+","+r+")"}else{if(typeof e=="number"&&typeof r=="number"&&typeof t=="number"&&typeof a=="number")return a>=1?$(e,r,t):"rgba("+e+","+r+","+t+","+a+")";if(typeof e=="object"&&r===void 0&&t===void 0&&a===void 0)return e.alpha>=1?$(e.red,e.green,e.blue):"rgba("+e.red+","+e.green+","+e.blue+","+e.alpha+")"}throw new u(7)}var Pe=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},Be=function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},Te=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},Oe=function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"};function V(e){if(typeof e!="object")throw new u(8);if(Be(e))return w(e);if(Pe(e))return $(e);if(Oe(e))return ke(e);if(Te(e))return Se(e);throw new u(8)}function ee(e,r,t){return function(){var a=t.concat(Array.prototype.slice.call(arguments));return a.length>=r?e.apply(this,a):ee(e,r,a)}}function O(e){return ee(e,e.length,[])}function I(e,r,t){return Math.max(e,Math.min(r,t))}function Ie(e,r){if(r==="transparent")return r;var t=Z(r);return V(v({},t,{lightness:I(0,1,t.lightness-parseFloat(e))}))}var _e=O(Ie),je=_e;function Re(e,r){if(r==="transparent")return r;var t=Z(r);return V(v({},t,{lightness:I(0,1,t.lightness+parseFloat(e))}))}var Ee=O(Re),Me=Ee;function ze(e,r){if(r==="transparent")return r;var t=T(r),a=typeof t.alpha=="number"?t.alpha:1,n=v({},t,{alpha:I(0,1,(a*100+parseFloat(e)*100)/100)});return w(n)}var Xr=O(ze);function Ae(e,r){if(r==="transparent")return r;var t=T(r),a=typeof t.alpha=="number"?t.alpha:1,n=v({},t,{alpha:I(0,1,+(a*100-parseFloat(e)*100).toFixed(2)/100)});return w(n)}var He=O(Ae),De=He,i={primary:"#FF4785",secondary:"#029CFD",tertiary:"#FAFBFC",ancillary:"#22a699",orange:"#FC521F",gold:"#FFAE00",green:"#66BF3C",seafoam:"#37D5D3",purple:"#6F2CAC",ultraviolet:"#2A0481",lightest:"#FFFFFF",lighter:"#F7FAFC",light:"#EEF3F6",mediumlight:"#ECF4F9",medium:"#D9E8F2",mediumdark:"#73828C",dark:"#5C6870",darker:"#454E54",darkest:"#2E3438",border:"hsla(203, 50%, 30%, 0.15)",positive:"#66BF3C",negative:"#FF4400",warning:"#E69D00",critical:"#FFFFFF",defaultText:"#2E3438",inverseText:"#FFFFFF",positiveText:"#448028",negativeText:"#D43900",warningText:"#A15C20"},J={app:"#F6F9FC",bar:i.lightest,content:i.lightest,preview:i.lightest,gridCellSize:10,hoverable:De(.9,i.secondary),positive:"#E1FFD4",negative:"#FEDED2",warning:"#FFF5CF",critical:"#FF4400"},B={fonts:{base:['"Nunito Sans"',"-apple-system",'".SFNSText-Regular"','"San Francisco"',"BlinkMacSystemFont",'"Segoe UI"','"Helvetica Neue"',"Helvetica","Arial","sans-serif"].join(", "),mono:["ui-monospace","Menlo","Monaco",'"Roboto Mono"','"Oxygen Mono"','"Ubuntu Monospace"','"Source Code Pro"','"Droid Sans Mono"','"Courier New"',"monospace"].join(", ")},weight:{regular:400,bold:700},size:{s1:12,s2:14,s3:16,m1:20,m2:24,m3:28,l1:32,l2:40,l3:48,code:90}},$e={base:"light",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:J.app,appContentBg:i.lightest,appPreviewBg:i.lightest,appBorderColor:i.border,appBorderRadius:4,fontBase:B.fonts.base,fontCode:B.fonts.mono,textColor:i.darkest,textInverseColor:i.lightest,textMutedColor:i.dark,barTextColor:i.mediumdark,barHoverColor:i.secondary,barSelectedColor:i.secondary,barBg:i.lightest,buttonBg:J.app,buttonBorder:i.medium,booleanBg:i.mediumlight,booleanSelectedBg:i.lightest,inputBg:i.lightest,inputBorder:i.border,inputTextColor:i.darkest,inputBorderRadius:4},Q=$e,qe={base:"dark",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:"#222425",appContentBg:"#1B1C1D",appPreviewBg:i.lightest,appBorderColor:"rgba(255,255,255,.1)",appBorderRadius:4,fontBase:B.fonts.base,fontCode:B.fonts.mono,textColor:"#C9CDCF",textInverseColor:"#222425",textMutedColor:"#798186",barTextColor:i.mediumdark,barHoverColor:i.secondary,barSelectedColor:i.secondary,barBg:"#292C2E",buttonBg:"#222425",buttonBorder:"rgba(255,255,255,.1)",booleanBg:"#222425",booleanSelectedBg:"#2E3438",inputBg:"#1B1C1D",inputBorder:"rgba(255,255,255,.1)",inputTextColor:i.lightest,inputBorderRadius:4},Ge=qe,{window:M}=K;var Ne=e=>typeof e!="string"?(W.warn(`Color passed to theme object should be a string. Instead ${e}(${typeof e}) was passed.`),!1):!0,Le=e=>!/(gradient|var|calc)/.test(e),Ye=(e,r)=>e==="darken"?w(`${je(1,r)}`,.95):e==="lighten"?w(`${Me(1,r)}`,.95):r,re=e=>r=>{if(!Ne(r)||!Le(r))return r;try{return Ye(e,r)}catch{return r}},Zr=re("lighten"),Vr=re("darken"),Ke=()=>!M||!M.matchMedia?"light":M.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",k={light:Q,dark:Ge,normal:Q},z=Ke(),q=(e={base:z},r)=>{let t={...k[z],...k[e.base]||{},...e,base:k[e.base]?e.base:z};return{...r,...t,barSelectedColor:e.barSelectedColor||t.colorSecondary}};var C="#FFFFFF",We="#333333",G="#5B6E8A",N="#E6F6FF",Ue="#00A2E0",Je="#026596",Qe="#C8006C",te=8,ae=q({base:"light",fontBase:'"Roboto", sans-serif',fontCode:"monospace",brandTitle:"Gemeente Tilburg",brandUrl:"https://www.tilburg.nl/",brandImage:"logo.svg",colorPrimary:Ue,colorSecondary:Qe,appBg:N,appContentBg:C,appPreviewBg:C,appBorderColor:G,appBorderRadius:te,textColor:We,textInverseColor:C,barTextColor:C,barSelectedColor:N,barHoverColor:N,barBg:Je,inputBg:C,inputBorder:G,inputTextColor:G,inputBorderRadius:te});Y.setConfig({theme:ae});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
