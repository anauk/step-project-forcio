
$(function(){
    $('.navbar__toggle-navbar').on('click', function(){
        $('.navbar__menu-block').toggleClass('active');
    });
    $('.navbar__menu-link_home').on('click', function(){
        $('.navbar__menu-block').toggleClass('active');
    });
})

/*

document.addEventListener('click', function(event){
    if (event.target.closest('.navbar__toggle-navbar')) {
        document.getElementsByClassName('navbar__menu-block')[0].classList.toggle('active');
    }
})

document.getElementsByClassName('navbar__menu-link_home')[0].addEventListener('click', function(event){
    document.getElementsByClassName('navbar__menu-block')[0].classList.toggle('active');
})*/
