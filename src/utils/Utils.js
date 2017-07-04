export function getStyle (el, styleName, _class) {
    if (!_class) {
        //去除px
        if (window.getComputedStyle(el, null)[styleName].match(/.+px/)) {
            return window.getComputedStyle(el, null)[styleName].slice(0, -2);
        } else {
            return window.getComputedStyle(el, null)[styleName]
        }
    } else {
        return window.getComputedStyle(el, _class)[styleName].slice(0, -2);
    }

}