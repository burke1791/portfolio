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
  });

  $(window).scroll(function() {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();

    let fadeElementClasses = ['about', 'skills', 'portfolio', 'contact'];

    for (var className of fadeElementClasses) {
      let elTop = $('.' + className).position().top;
      let elHeight = $('.' + className).height();

      if (elTop > pageTop) {
        fadeIn(elTop, elHeight, pageTop, className);
      } else {
        fadeOut(elTop, elHeight, pageTop, className);
      }
    }
  });

  function fadeIn(elTop, elHeight, pageTop, className) {
    let opacity = 1 - (elTop - pageTop) / elHeight * 1.5;
    $('.' + className + 'Content').css('opacity', opacity);
  }

  function fadeOut(elTop, elHeight, pageTop, className) {
    let opacity = 1 - (pageTop - elTop) / elHeight * 1.5;
    $('.' + className + 'Content').css('opacity', opacity);
  }
})