// let navbarMenu = document.getElementsByClassName('navbar__menu-block')[0];

document.addEventListener('click', function(event){
    if (event.target.closest('.navbar__toggle-navbar')) {
        document.getElementsByClassName('navbar__menu-block')[0].classList.toggle('active');
    }
})

document.getElementsByClassName('navbar__menu-link_home')[0].addEventListener('click', function(event){
    document.getElementsByClassName('navbar__menu-block')[0].classList.toggle('active');
})