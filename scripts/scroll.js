// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction(), stickyToggle()
};

// Hide/show the top button if it passes a certain threshold.
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("to-top").style.display = "block";
    } else {
        document.getElementById("to-top").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function toTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}


function toggleMenu() {
    0 == header.className.includes("responsive") ? openMenu() : closeMenu()
}

function openMenu() {
    header.classList.add("responsive")
}

// When clicked on element in hamburger, remove it.
function closeMenu() {
    header.classList.remove("responsive")
}


// Small screen hamburger
var header = document.getElementById("navbar"),
    sticky = header.offsetTop;

function stickyToggle() {
    window.pageYOffset >= sticky ? header.classList.add("sticky") : header.classList.remove("sticky")
}