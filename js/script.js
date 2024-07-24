(()=>{
    var e = {
        842: function() {
            !function() {
                "use strict";
                function e(e) {
                    var t = !0
                      , n = !1
                      , o = null
                      , s = {
                        text: !0,
                        search: !0,
                        url: !0,
                        tel: !0,
                        email: !0,
                        password: !0,
                        number: !0,
                        date: !0,
                        month: !0,
                        week: !0,
                        time: !0,
                        datetime: !0,
                        "datetime-local": !0
                    };
                    function i(e) {
                        return !!(e && e !== document && "HTML" !== e.nodeName && "BODY" !== e.nodeName && "classList"in e && "contains"in e.classList)
                    }
                    function a(e) {
                        e.classList.contains("focus-visible") || (e.classList.add("focus-visible"),
                        e.setAttribute("data-focus-visible-added", ""))
                    }
                    function d(e) {
                        t = !1
                    }
                    function r() {
                        document.addEventListener("mousemove", c),
                        document.addEventListener("mousedown", c),
                        document.addEventListener("mouseup", c),
                        document.addEventListener("pointermove", c),
                        document.addEventListener("pointerdown", c),
                        document.addEventListener("pointerup", c),
                        document.addEventListener("touchmove", c),
                        document.addEventListener("touchstart", c),
                        document.addEventListener("touchend", c)
                    }
                    function c(e) {
                        e.target.nodeName && "html" === e.target.nodeName.toLowerCase() || (t = !1,
                        document.removeEventListener("mousemove", c),
                        document.removeEventListener("mousedown", c),
                        document.removeEventListener("mouseup", c),
                        document.removeEventListener("pointermove", c),
                        document.removeEventListener("pointerdown", c),
                        document.removeEventListener("pointerup", c),
                        document.removeEventListener("touchmove", c),
                        document.removeEventListener("touchstart", c),
                        document.removeEventListener("touchend", c))
                    }
                    document.addEventListener("keydown", (function(n) {
                        n.metaKey || n.altKey || n.ctrlKey || (i(e.activeElement) && a(e.activeElement),
                        t = !0)
                    }
                    ), !0),
                    document.addEventListener("mousedown", d, !0),
                    document.addEventListener("pointerdown", d, !0),
                    document.addEventListener("touchstart", d, !0),
                    document.addEventListener("visibilitychange", (function(e) {
                        "hidden" === document.visibilityState && (n && (t = !0),
                        r())
                    }
                    ), !0),
                    r(),
                    e.addEventListener("focus", (function(e) {
                        var n, o, d;
                        i(e.target) && (t || (n = e.target,
                        o = n.type,
                        "INPUT" === (d = n.tagName) && s[o] && !n.readOnly || "TEXTAREA" === d && !n.readOnly || n.isContentEditable)) && a(e.target)
                    }
                    ), !0),
                    e.addEventListener("blur", (function(e) {
                        var t;
                        i(e.target) && (e.target.classList.contains("focus-visible") || e.target.hasAttribute("data-focus-visible-added")) && (n = !0,
                        window.clearTimeout(o),
                        o = window.setTimeout((function() {
                            n = !1
                        }
                        ), 100),
                        (t = e.target).hasAttribute("data-focus-visible-added") && (t.classList.remove("focus-visible"),
                        t.removeAttribute("data-focus-visible-added")))
                    }
                    ), !0),
                    e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host ? e.host.setAttribute("data-js-focus-visible", "") : e.nodeType === Node.DOCUMENT_NODE && (document.documentElement.classList.add("js-focus-visible"),
                    document.documentElement.setAttribute("data-js-focus-visible", ""))
                }
                if ("undefined" != typeof window && "undefined" != typeof document) {
                    var t;
                    window.applyFocusVisiblePolyfill = e;
                    try {
                        t = new CustomEvent("focus-visible-polyfill-ready")
                    } catch (e) {
                        (t = document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready", !1, !1, {})
                    }
                    window.dispatchEvent(t)
                }
                "undefined" != typeof document && e(document)
            }()
        }
    }
      , t = {};
    function n(o) {
        var s = t[o];
        if (void 0 !== s)
            return s.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n),
        i.exports
    }
    (()=>{
        "use strict";
        n(842);
        const e = ()=>{
            const e = document?.querySelectorAll(".fixed-block")
              , t = document.body
              , n = window.scrollY
              , o = window.innerWidth - t.offsetWidth + "px";
            e.forEach((e=>{
                e.style.paddingRight = o
            }
            )),
            t.classList.add("lock"),
            t.dataset.position = n,
            t.style.paddingRight = o,
            t.style.top = `-${n}px`
        }
          , t = ()=>{
            const e = document?.querySelectorAll(".fixed-block")
              , t = document.body
              , n = parseInt(t.dataset.position, 10);
            e.forEach((e=>{
                e.style.paddingRight = "0px"
            }
            )),
            t.style.paddingRight = "",
            t.style.top = "",
            t.classList.remove("lock"),
            window.scroll({
                top: n,
                left: 0
            }),
            t.removeAttribute("data-position")
        }
        ;
        window.addEventListener("DOMContentLoaded", (()=>{
            (()=>{
                const e = navigator.userAgent || navigator.vendor || window.opera
                  , t = document.querySelector("html");
                /android/i.test(e) ? t.classList.add("android") : /iPad|iPhone|iPod/.test(e) && !window.MSStream && t.classList.add("ios")
            }
            )(),
            (()=>{
                const n = document?.querySelector("[data-burger]")
                  , o = document?.querySelector("[data-menu]")
                  , s = document?.querySelector("[data-overlay]");
                n?.addEventListener("click", (()=>{
                    n?.classList.toggle("burger--active"),
                    o?.classList.toggle("menu--active"),
                    o?.classList.contains("menu--active") ? (n?.setAttribute("aria-expanded", "true"),
                    n?.setAttribute("aria-label", "Close menu"),
                    s?.setAttribute("data-overlay", "true"),
                    e()) : (n?.setAttribute("aria-expanded", "false"),
                    n?.setAttribute("aria-label", "Open menu"),
                    s?.setAttribute("data-overlay", "false"),
                    t())
                }
                )),
                s?.addEventListener("click", (e=>{
                    e.target && e.target.hasAttribute("data-overlay") && (n?.setAttribute("aria-expanded", "false"),
                    n?.setAttribute("aria-label", "Open menu"),
                    s?.setAttribute("data-overlay", "false"),
                    n?.classList.remove("burger--active"),
                    o?.classList.remove("menu--active"),
                    t())
                }
                )),
                o?.addEventListener("click", (e=>{
                    e.target.hasAttribute("data-menu-item") && (n?.setAttribute("aria-expanded", "false"),
                    n?.setAttribute("aria-label", "Open menu"),
                    s?.setAttribute("data-overlay", "false"),
                    n.classList.remove("burger--active"),
                    o.classList.remove("menu--active"),
                    t())
                }
                ))
            }
            )(),
            (()=>{
                function n(n, o, s) {
                    const i = document.querySelector(".modal.show");
                    "open" === o ? (i && (i.classList.remove("show"),
                    t()),
                    n.classList.add("show"),
                    e()) : "close" === o && (n.classList.remove("show"),
                    setTimeout((()=>{
                        t()
                    }
                    ), s))
                }
                document.querySelector(".modal-form") && function(e, t, o=null, s=300, i=!0) {
                    const a = document.querySelectorAll(e)
                      , d = document.querySelector(t);
                    a.forEach((e=>{
                        e.addEventListener("click", (()=>{
                            n(d, "open")
                        }
                        ))
                    }
                    )),
                    o && d.querySelector(o).addEventListener("click", (()=>{
                        n(d, "close", s)
                    }
                    )),
                    i && d.addEventListener("click", (e=>{
                        e.target.closest(".modal__content") || n(d, "close", s)
                    }
                    ))
                }(".triggerModalForm", ".modal-form", ".modal-form__close")
            }
            )()
        }
        ))
    }
    )()
}
)();
