$phoneStyle = $('.phone-style');

$('.phone-menu').on('click', function () {
   $('.phone-style').toggleClass('p-active');
   $('i.fa-bars').toggleClass('fa-beat');
});