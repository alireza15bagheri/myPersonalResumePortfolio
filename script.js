const containers = document.querySelectorAll('.portfolio .box-container .box');
const card = document.querySelectorAll('.card');
const { width, height } = containers[1].getBoundingClientRect();

for (let item of containers.entries()) {

    item[1].addEventListener('mousemove', (event) => {
        const { offsetX, offsetY } = event;

        card[item[0]].style.setProperty('--x-pos', (offsetX / width) - 0.5);
        card[item[0]].style.setProperty('--y-pos', (offsetY / width) - 0.5);
    })
}



$(document).ready(function () {


    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

        if ($(window).scrollTop() > 0) {
            $('.top').show();
        } else {
            $('.top').hide();
        }
    });

    // Smooth Scrolling:

    $('a[href*="#"]').on('click', function (e) {

        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        },
            500,
            'linear'
        );

    });

});