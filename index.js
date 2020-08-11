/** @jsx createvnode */
let items = "'JSX compiler'".split(" ");
let vdom = (
    <div>
        <div class="container" style="margin-bottom: 0.5em">
            hi
        </div>
        <div class="container">
            <b>simple</b>
            <ul>{renderList(items)}</ul>
        </div>
    </div>
);

let dom = render(vdom);

document.body.appendChild(dom);

function renderList(vlist) {
    return vlist.map((li) => <li> {li} </li>);
}

function createvnode(nodeName, attrs, ...args) {
    let children = args.length ? [].concat(...args) : null;

    return {
        nodeName,
        attrs,
        children,
    };
}

function render(vnode) {
    if (typeof vnode === "string") return document.createTextNode(vnode);

    let node = document.createElement(vnode.nodeName);
    let attr = vnode.attrs || {};
    Object.keys(attr).forEach((k) => node.setAttribute(k, attr[k]));
    let children = vnode.children || [];
    // we need to first render node and later add child nodes
    children.map((c) => node.appendChild(render(c)));

    return node;
}
