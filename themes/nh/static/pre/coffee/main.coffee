window.onload = ->
  addClass = (element, className) ->
    element.className += " " + className
  removeClass = (element, className) ->
    
    # Capture any surrounding space characters to prevent repeated
    # additions and removals from leaving lots of spaces.
    classNameRegEx = new RegExp("\\s*" + className + "\\s*")
    element.className = element.className.replace(classNameRegEx, " ")
  toggleClass = (element, className) ->
    return  if not element or not className
    if element.className.indexOf(className) is -1
      addClass element, className
    else
      removeClass element, className
  $menuIcon = document.getElementsByClassName("menu-icon")[0]
  $offCanva = document.getElementsByClassName("off-canvas")[0]
  $siteWrap = document.getElementsByClassName("site-wrapper")[0]
  $menuIcon.addEventListener "click", (->
    toggleClass $menuIcon, "close"
    toggleClass $offCanva, "toggled"
    toggleClass $siteWrap, "open"
  ), false
  $menuIcon.addEventListener "mouseenter", ->
    addClass $menuIcon, "hover"

  $menuIcon.addEventListener "mouseleave", ->
    removeClass $menuIcon, "hover"

  
  # Open Twitter/share in a Pop-Up
  $popup = document.getElementsByClassName("popup")[0]
  return  unless $popup
  $popup.addEventListener "click", (e) ->
    e.preventDefault()
    width = 575
    height = 400
    left = (document.documentElement.clientWidth - width) / 2
    top = (document.documentElement.clientHeight - height) / 2
    url = @href
    opts = "status=1" + ",width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
    window.open url, "twitter", opts
    false



# FitVids options
$ ->
  $("article").fitVids()

$(".close-menu").click ->
  $(".menu").toggleClass "disabled"
  $(".links").toggleClass "enabled"

$(".about").click ->
  $("#about").css "display", "block"

$(".close-about").click ->
  $("#about").css "display", ""


# Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass "image-popup"

# Magnific-Popup options
$(document).ready ->
  $(".image-popup").magnificPopup
    type: "image"
    tLoading: "Loading image #%curr%..."
    gallery:
      enabled: true
      navigateByImgClick: true
      preload: [ 0, 1 ] # Will preload 0 - before current, and 1 after the current image

    image:
      tError: "<a href=\"%url%\">Image #%curr%</a> could not be loaded."

    removalDelay: 300 # Delay in milliseconds before popup is removed
    # Class that is added to body when popup is open. 
    # make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-fade"

# wrap code in highlight class
$(document).ready ->
	code = $("pre code").parent()
	code.wrap "<div class='highlight'></div>"