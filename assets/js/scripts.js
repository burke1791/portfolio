$(function() {
  $('.rightNavLink').click(function(event) {
    console.log('clicked link');
    event.preventDefault();
    var targetId = $(this).attr('data-scrollTo');
    var target = $('#' + targetId);

    var options = {
      duration: 1000,
      easing: 'linear'
    };

    $('html, body').animate({
      scrollTop: target.offset().top - 50
    }, 0);
  })
})