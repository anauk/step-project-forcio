import $ from 'jquery';
$(function(){
    $('.navbar__toggle-navbar').on('click', function(e){
        $('.navbar__menu-block').toggleClass('active');
    });
    $('.navbar__menu-link').on('click', function(){
        $('.navbar__menu-block').toggleClass('active');
    });
})

$(document).keyup(function (e) {
    if (e.keyCode === 27) {
        $('.navbar__menu-block').removeClass('active');
    }
});
