export default function getData (el, name, val) {
    let prefix = "data-";
    name = prefix + name;
    if (val) {
        el.setAttribute(name, val);
        return el.getAttribute(name);
    } else {
        return el.getAttribute(name);
    }
}