$(function () {
  let fadeElementClasses = ['about', 'skills', 'portfolio', 'contact'];
  let lightDarkIdentifiers = ['getInTouch', 'calcuttaBtn', 'hangmanBtn', 'flockaBtn']; // list of ids to toggle light/dark theme
  let lightDarkImgElements = ['linkedInBotNav', 'light-dark-toggle', 'githubBotNav', 'linkedInAbout', 'githubAbout', 'aboutTopNav', 'skillsTopNav', 'portfolioTopNav', 'contactTopNav'];
  let lightDarkShadows = ['projectScreenShot', 'calcuttaLink', 'b1gHangmanLink', 'flockatimeLink'];

  $('.jumpLink').click(function (event) {
    console.log('clicked link');
    event.preventDefault();

    if ($(window).width() < 600) {
      var targetId = $(this).attr('data-scrollToResponsive');
      var target = $('#' + targetId);
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 0);
    } else {
      var targetId = $(this).attr('data-scrollTo');
      var target = $('#' + targetId);
      $('html, body').animate({
        scrollTop: target.offset().top - 50
      }, 0);
    }

    var target = $('#' + targetId);

    $('html, body').animate({
      scrollTop: target.offset().top - 50
    }, 0);
  });

  $('#light-dark-toggle').click(function () {
    var state = $(this).attr('data-state');
    if (state === 'light') {
      toggleLightDark('dark', 'light');
      localStorage.setItem('theme', 'dark');
    } else {
      toggleLightDark('light', 'dark');
      localStorage.setItem('theme', 'light');
    }
  });

  $(window).scroll(handleScrollEffects);

  var prevScrollPos = $(window).scrollTop();

  function handleScrollEffects() {
    var pageTop = $(document).scrollTop();
    var docHeight = $(document).height();
    var windowHeight = $(window).height();
    handleFadeEffects(pageTop, windowHeight);
    if ($(window).width() < 600) {
      handleMobileScroll(pageTop, docHeight, windowHeight);
    }
  }

  function handleMobileScroll(pageTop, docHeight, windowHeight) {
    if (prevScrollPos >= pageTop) {
      $('#topNavBar').css('top', 0);
    } else {
      $('#topNavBar').css('top', -50);
    }

    if (pageTop < 0) {
      prevScrollPos = 0;
    } else if (pageTop >= (docHeight - windowHeight)) {
      prevScrollPos = docHeight - windowHeight;
    } else {
      prevScrollPos = pageTop;
    }

  }

  function handleFadeEffects(pageTop, windowHeight) {
    if (window.location.pathname == '/index.html') {
      for (var className of fadeElementClasses) {
        let elTop = $('.' + className).position().top;
        let elHeight = $('.' + className).outerHeight();
        let elBot = elTop + elHeight;
        let pageBot = pageTop + windowHeight;

        if (elTop >= pageTop && elBot <= pageBot) {
          // entire element is within page bounds
          noFade(className);
        } else if (elTop <= pageTop && elBot >= pageBot) {
          // element takes up entirety of viewport
          noFade(className);
        } else {
          // element is partially within viewport or none of the element is within the viewport
          fade(elTop, elBot, elHeight, pageTop, pageBot, windowHeight, className);
        }
      }
    }
  }

  function toggleLightDark(newState, oldState) {
    $('body').attr('class', newState);

    // navbars are separate because their color themes are opposite of the semantic light/dark
    $('#topNavBar').removeClass('nav-' + oldState);
    $('#botNavBar').removeClass('nav-' + oldState);
    $('#topNavBar').addClass('nav-' + newState);
    $('#botNavBar').addClass('nav-' + newState);

    for (id of lightDarkShadows) {
      $('#' + id).removeClass(oldState + 'Shadow');
      $('#' + id).addClass(newState + 'Shadow');
    }
    
    for (id of lightDarkImgElements) {
      var newSrc = $('#' + id).attr('data-' + newState);
      $('#' + id).attr('src', newSrc);
      $('#' + id).attr('data-state', newState);
    }

    for (id of lightDarkIdentifiers) {
      $('#' + id).removeClass(oldState);
      $('#' + id).addClass(newState);
    }
  }

  function fade(elTop, elBot, elHeight, pageTop, pageBot, windowHeight, className) {
    let viewRatio;
    if (elHeight <= windowHeight) {
      // element is smaller than the viewport
      viewRatio = (elTop < pageTop) ? (elBot - pageTop) / elHeight : (pageBot - elTop) / elHeight;
    } else {
      // element is larget than the viewport
      viewRatio = (elTop < pageTop) ? (elBot - pageTop) / windowHeight : (pageBot - elTop) / windowHeight;
    }
    setOpacity(className, viewRatio);
  }

  function noFade(className) {
    setOpacity(className, 1);
  }

  function setOpacity(className, opacity) {
    $('.' + className + 'Content').css('opacity', opacity);
  }

  function checkLocalStorageForThemeSetting() {
    let theme = localStorage.getItem('theme');
    console.log(theme);
    if (!theme) {
      theme = 'light';
    } else if (theme === 'dark') {
      toggleLightDark(theme, 'light');
    }
  }

  checkLocalStorageForThemeSetting();
  handleFadeEffects();
})