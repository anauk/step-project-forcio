//navbar links: scrolling to anchors
import $ from 'jquery';
$(function () {
    function slowScroll (e) {
        let anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - -10
        }, 800);
        e.preventDefault();
    }

    $('a.navbar__menu-link').on("click", slowScroll);
    $('a.footer-nav__link').on("click",  slowScroll);
})