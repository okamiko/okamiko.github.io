var modalOpen = !1;
var l, o, n, t, d;

function openModal(e) {
    l = document.getElementById(e.id), 
    o = document.getElementById(e.id + "-modal"), 
    n = document.getElementById(e.id + "-close"), 
    t = document.getElementById(e.id + "-close-btn"), 
    d = document.getElementsByTagName("body")[0];

    modalOpen = !0, o.style.display = "block", 
    d.style.overflow = "hidden", o.scrollTop = 0;
    n.onclick = function() {
        modalOpen = !1, 
        o.style.display = "none", 
        d.style.overflow = "visible"
    }, t.onclick = function() {
        modalOpen = !1,
        o.style.display = "none",
        d.style.overflow = "visible"
    }
}