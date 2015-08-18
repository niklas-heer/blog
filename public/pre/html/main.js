(function() {
  window.onload = function() {
    var $menuIcon, $offCanva, $popup, $siteWrap, addClass, removeClass, toggleClass;
    addClass = function(element, className) {
      return element.className += " " + className;
    };
    removeClass = function(element, className) {
      var classNameRegEx;
      classNameRegEx = new RegExp("\\s*" + className + "\\s*");
      return element.className = element.className.replace(classNameRegEx, " ");
    };
    toggleClass = function(element, className) {
      if (!element || !className) {
        return;
      }
      if (element.className.indexOf(className) === -1) {
        return addClass(element, className);
      } else {
        return removeClass(element, className);
      }
    };
    $menuIcon = document.getElementsByClassName("menu-icon")[0];
    $offCanva = document.getElementsByClassName("off-canvas")[0];
    $siteWrap = document.getElementsByClassName("site-wrapper")[0];
    $menuIcon.addEventListener("click", (function() {
      toggleClass($menuIcon, "close");
      toggleClass($offCanva, "toggled");
      return toggleClass($siteWrap, "open");
    }), false);
    $menuIcon.addEventListener("mouseenter", function() {
      return addClass($menuIcon, "hover");
    });
    $menuIcon.addEventListener("mouseleave", function() {
      return removeClass($menuIcon, "hover");
    });
    $popup = document.getElementsByClassName("popup")[0];
    if (!$popup) {
      return;
    }
    return $popup.addEventListener("click", function(e) {
      var height, left, opts, top, url, width;
      e.preventDefault();
      width = 575;
      height = 400;
      left = (document.documentElement.clientWidth - width) / 2;
      top = (document.documentElement.clientHeight - height) / 2;
      url = this.href;
      opts = "status=1" + ",width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
      window.open(url, "twitter", opts);
      return false;
    });
  };

  $(function() {
    return $("article").fitVids();
  });

  $(".close-menu").click(function() {
    $(".menu").toggleClass("disabled");
    return $(".links").toggleClass("enabled");
  });

  $(".about").click(function() {
    return $("#about").css("display", "block");
  });

  $(".close-about").click(function() {
    return $("#about").css("display", "");
  });

  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  $(document).ready(function() {
    return $(".image-popup").magnificPopup({
      type: "image",
      tLoading: "Loading image #%curr%...",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      },
      image: {
        tError: "<a href=\"%url%\">Image #%curr%</a> could not be loaded."
      },
      removalDelay: 300,
      mainClass: "mfp-fade"
    });
  });

  $(document).ready(function() {
    var code;
    code = $("pre code").parent();
    return code.wrap("<div class='highlight'></div>");
  });

}).call(this);

