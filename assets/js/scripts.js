$(function() {
  let fadeElementClasses = ['about', 'skills', 'portfolio', 'contact'];
  let lightDarkIdentifiers = ['getInTouch']; // list of ids to toggle light/dark theme
  
  $('.jumpLink').click(function(event) {
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

  $('#light-dark-toggle').click(function() {
    var state = $(this).attr('data-state');
    if (state === 'light') {
      toggleLightDark('dark', 'light')
    } else {
      toggleLightDark('light', 'dark');
    }
  });

  $(window).scroll(handleFadeEffects);

  function handleFadeEffects() {
    var pageTop = $(document).scrollTop();

    for (var className of fadeElementClasses) {
      let elTop = $('.' + className).position().top;
      let elHeight = $('.' + className).height();

      if (elTop > pageTop) {
        fadeIn(elTop, elHeight, pageTop, className);
      } else {
        fadeOut(elTop, elHeight, pageTop, className);
      }
    }
  }

  function toggleLightDark(newState, oldState) {
    var newSrc = $('#light-dark-toggle').attr('data-' + newState);
    $('#light-dark-toggle').attr('src', newSrc);
    $('#light-dark-toggle').attr('data-state', newState);

    $('body').attr('class', newState);

    $('#topNavBar').removeClass('nav-' + oldState);
    $('#botNavBar').removeClass('nav-' + oldState);
    $('#topNavBar').addClass('nav-' + newState);
    $('#botNavBar').addClass('nav-' + newState);

    for (id of lightDarkIdentifiers) {
      $('#' + id).removeClass(oldState);
      $('#' + id).addClass(newState);
    }
  }

  function fadeIn(elTop, elHeight, pageTop, className) {
    let opacity = 1 - (elTop - pageTop) / elHeight * 1.5;
    $('.' + className + 'Content').css('opacity', opacity);
  }

  function fadeOut(elTop, elHeight, pageTop, className) {
    let opacity = 1 - (pageTop - elTop) / elHeight * 1.5;
    $('.' + className + 'Content').css('opacity', opacity);
  }

  handleFadeEffects();
})