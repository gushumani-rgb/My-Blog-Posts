// ===== ad-navigation-bar.js =====

// Function to safely set an attribute on window load
function setAttributeOnload(o, a, v) {
    if (window.addEventListener) {
        window.addEventListener('load', function() { o[a] = v; }, false);
    } else {
        window.attachEvent('onload', function() { o[a] = v; });
    }
}

// Load Google platform.js script
(function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://apis.google.com/js/platform.js';
    document.getElementsByTagName('head')[0].appendChild(script);
})();

// Function to load the Blogger navbar safely
function loadNavbar() {
    if (window.gapi && gapi.load) {
        gapi.load("gapi.iframes:gapi.iframes.style.bubble", function() {
            if (gapi.iframes) {
                if (gapi.iframes.getContext) {
                    gapi.iframes.getContext().openChild({
                        url: 'https://draft.blogger.com/navbar/962814831527169344?origin=http://localhost:80',
                        where: document.getElementById("navbar-iframe-container"),
                        id: "navbar-iframe"
                    });
                }
            }
        });
    }
}

// Run loadNavbar on window load
setAttributeOnload(window, 'load', loadNavbar);

// Load Google top ads script safely
(function() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '//pagead2.googlesyndication.com/pagead/js/google_top_exp.js';
    var h = document.getElementsByTagName('head')[0];
    if (h) h.appendChild(s);
})();
