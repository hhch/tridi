/*
  Tridi v0.0.2 - JavaScript 3D Product Viewer
  Author: Łukasz Wójcik
  License: MIT
  Homepage: https://tridi.lukem.net
  GitHub: http://github.com/lukemnet/tridi
*/
var Tridi=function(){function a(e){this.validateOptions=function(e){e.element||console.error(a.header(),"'element' property is missing or invalid. Container element must be specified."),void 0===e.images&&void 0===e.imageFormat&&console.error(a.header(),"'imageFormat' property is missing or invalid. Image format must be provided for 'numbered' property."),"numbered"!==e.images||e.imageLocation||console.error(a.header(),"'imageLocation' property is missing or invalid. Image location must be provided for 'numbered' property."),Array.isArray(e.images)&&e.imageFormat&&console.warn(a.header(),"Got array of images as initalizing parameter. 'imageFormat' property will be ignored."),Array.isArray(e.images)&&e.imageLocation&&console.warn(a.header(),"Got array of images as initalizing parameter. 'imageLocation' property will be ignored."),Array.isArray(e.images)&&e.imageCount&&console.warn(a.header(),"Got array of images as initalizing parameter. 'imageCount' property will be ignored."),!e.showHintOnStartup&&e.hintText&&console.warn(a.header(),"'showHintOnStartup is set to 'false'. 'hintText' parameter will be ignored."),!e.draggable&&e.mouseleaveDetect&&console.warn(a.header(),"'draggable is set to 'false'. 'mouseleaveDetect' parameter will be ignored."),!e.autoplay&&e.autoplaySpeed&&console.warn(a.header(),"'autoplay is set to 'false'. 'autoplaySpeed' parameter will be ignored."),!e.autoplay&&e.stopAutoplayOnMouseenter&&console.warn(a.header(),"'autoplay is set to 'false'. 'stopAutoplayOnMouseenter' parameter will be ignored."),!e.autoplay&&e.resumeAutoplayOnMouseleave&&console.warn(a.header(),"'autoplay is set to 'false'. 'resumeAutoplayOnMouseleave' parameter will be ignored."),!e.autoplay&&e.resumeAutoplayDelay&&console.warn(a.header(),"'autoplay is set to 'false'. 'resumeAutoplayDelay' parameter will be ignored.")},this.validateOptions(e),this.element=e.element,this.images=e.images||"numbered",this.imageFormat=e.imageFormat||void 0,this.imageLocation=e.imageLocation||"./images",this.imageCount=Array.isArray(this.images)?this.images.length:e.imageCount||e.imagecount||e.count,this.draggable=void 0===e.draggable||e.draggable,this.showHintOnStartup=e.showHintOnStartup||!1,this.hintText=e.hintText||null,this.lazy=e.lazy||!1,this.autoplay=e.autoplay||!1,this.autoplaySpeed=void 0!==e.autoplaySpeed?e.autoplaySpeed||e.autoplayspeed:50,this.stopAutoplayOnClick=e.stopAutoplayOnClick||!1,this.stopAutoplayOnMouseenter=e.stopAutoplayOnMouseenter||!1,this.resumeAutoplayOnMouseleave=e.resumeAutoplayOnMouseleave||!1,this.resumeAutoplayDelay=e.resumeAutoplayDelay||0,this.buttons=e.buttons||!1,this.scroll=e.scroll||!1,this.spinner=void 0!==e.spinner&&e.spinner,this.touch=void 0===e.touch||e.touch,this.mousewheel=e.mousewheel||!1,this.wheelInverse=e.wheelInverse||!1,this.inverse=e.inverse||!1,this.dragInterval=e.dragInterval||1,this.touchDragInterval=e.touchDragInterval||1,this.mouseleaveDetect=void 0!==e.mouseleaveDetect&&e.mouseleaveDetect,this.verbose=e.verbose||e.debug||!1,this.imageIndex=1,this.moveBuffer=[],this.moveState=0,this.dragActive=!1,this.intervals=[],this.timeouts=[],this.verbose&&console.log(a.header(this.element),"Class intialized")}return a.header=function(e){return"Tridi"+(e?" ["+e+"]":"")+":"},a.prototype.appendClass=function(e,t){e.className+=0===e.className.length?t:" "+t},a.prototype.addClassName=function(t,e){var i=this;"string"==typeof e?t.classList.contains(e)||this.appendClass(t,e):Array.isArray(e)&&e.forEach(function(e){t.classList.contains(e)||i.appendClass(t,e)})},a.prototype.removeClassName=function(t,e){"string"==typeof e?t.classList.contains(e)&&t.classList.remove(e):Array.isArray(e)&&e.forEach(function(e){t.classList.contains(e)&&t.classList.remove(e)})},a.prototype.getContainer=function(){return document.querySelector(this.element)},a.prototype.getViewer=function(){return document.querySelector(this.element+".tridi-viewer")},a.prototype.getStash=function(){return document.querySelector(this.element+" .tridi-stash")},a.prototype.getLeftButton=function(){return document.querySelector(this.element+" .tridi-btn-left")},a.prototype.getRightButton=function(){return document.querySelector(this.element+" .tridi-btn-right")},a.prototype.getHintOverlay=function(){return document.querySelector(this.element+" .tridi-hint-overlay")},a.prototype.getLoadingScreen=function(){return document.querySelector(this.element+" .tridi-loading")},a.prototype.getImage=function(e){return this.getImages()[e-1]},a.prototype.getFirstImage=function(){return this.getImage(1)},a.prototype.getViewerImage=function(){return document.querySelector(this.element+".tridi-viewer .tridi-viewer-image")},a.prototype.lazyLoad=function(e,t){this.lazy&&!t?this.getViewerImage().addEventListener("click",function(){e()}):e()},a.prototype.getImages=function(){if("numbered"!==this.images)return Array.isArray(this.images)?this.images:(console.error(a.header(this.element),"Error getting images from source."),null);var e=this.imageCount,i=this.imageLocation,r=this.imageFormat;return Array.from(new Array(e),function(e,t){return i+"/"+(t+1)+"."+r})},a.prototype.generateViewer=function(){var e=this.getContainer();e?(this.verbose&&console.log(a.header(this.element),"Appending Tridi CSS classes"),this.addClassName(e,["tridi-viewer","tridi-viewer-"+this.element.substr(1),"tridi-draggable-"+this.draggable,"tridi-touch-"+this.touch,"tridi-mousewheel-"+this.mousewheel,"tridi-wheelInverse-"+this.wheelInverse,"tridi-showHintOnStartup-"+this.showHintOnStartup,"tridi-lazy-"+this.lazy,"tridi-buttons-"+this.buttons])):console.error(this.element,"Viewer element not found")},a.prototype.generateLoadingScreen=function(){var e=document.createElement("div");e.className="tridi-loading",e.style.display="none";var t=document.createElement("div");t.className="tridi-spinner",e.appendChild(t),this.getViewer().appendChild(e)},a.prototype.setLoadingState=function(e){this.getLoadingScreen().style.display=e?"block":"none"},a.prototype.generateStash=function(){if(!this.getStash()){this.verbose&&console.log(a.header(this.element),"Generating image stash");var e=document.createElement("div");e.className="tridi-stash",e.style.display="none",this.getViewer().appendChild(e)}},a.prototype.displayHintOnStartup=function(r){var o=this;if(this.showHintOnStartup){this.verbose&&console.log(a.header(this.element),"Generating hint on startup");var n=this.element.substr(1),e=document.createElement("div");e.className="tridi-hint-overlay tridi-"+n+"-hint-overlay",e.tabIndex=0;var t=document.createElement("div");t.className="tridi-hint",this.hintText&&(t.innerHTML='<span class="tridi-hint-text tridi-'+n+'-hint-text">'+this.hintText+"</span>"),e.appendChild(t),this.getViewer().appendChild(e);var i=function(e){var t=e.target.classList.contains("tridi-"+n+"-hint-overlay"),i=e.target.classList.contains("tridi-"+n+"-hint-text");(t||i)&&(o.getHintOverlay().style.display="none",r())};document.addEventListener("click",i),document.addEventListener("keydown",function(e){13===e.which&&i(e)})}else r()},a.prototype.populateStash=function(){var i=this.getStash(),e=this.getImages();i&&e?e.forEach(function(e,t){i.innerHTML+='<img src="'+e+'" class="tridi-image-'+(t+1)+'" alt="" />'}):console.error(this.element,"Error populating stash!")},a.prototype.generateViewerImage=function(){this.verbose&&console.log(a.header(this.element),"Generating first image");var e=this.element.substr(1),t=this.getViewer(),i=this.getFirstImage();t.innerHTML='<img src="'+i+'" alt="" class="tridi-viewer-image tridi-viewer-'+e+'-image" draggable="false" />'+t.innerHTML},a.prototype.nextFrame=function(){var e=this.getViewerImage();this.imageIndex=this.imageIndex<=1?this.imageCount:this.imageIndex-1,e.src=this.getImage(this.imageIndex)},a.prototype.previousFrame=function(){var e=this.getViewerImage();this.imageIndex=this.imageIndex>=this.imageCount?1:this.imageIndex+1,e.src=this.getImage(this.imageIndex)},a.prototype.rotateViewerImage=function(e){var t=this,i=e.touches?this.touchDragInterval:this.dragInterval;this.moveState+=1;var r=(e.touches?e.touches[0].clientX:e.clientX)-this.getViewerImage().offsetLeft;this.moveBuffer.push(r);var o=this.moveBuffer.length,n=this.moveBuffer[o-2],a=this.moveBuffer[o-1];!(this.moveState%i)&&(a<n?t.inverse?t.previousFrame():t.nextFrame():n<a&&(t.inverse?t.nextFrame():t.previousFrame()))},a.prototype.startDragging=function(){var e=this.getViewer();this.addClassName(e,"tridi-dragging"),this.dragActive=!0},a.prototype.stopDragging=function(){var e=this.getViewer();this.removeClassName(e,"tridi-dragging"),this.dragActive=!1},a.prototype.resetMoveBuffer=function(){this.moveBuffer=[]},a.prototype.attachCosmeticEvents=function(){var e=this;this.verbose&&console.log(a.header(this.element),"Attaching common events");var t=this.getViewer();t.addEventListener("mouseenter",function(){e.verbose&&console.log(a.header(e.element),"Mouseenter event triggered"),e.addClassName(t,"tridi-viewer-hovered")}),t.addEventListener("mouseleave",function(){e.verbose&&console.log(a.header(e.element),"Mouseenter event triggered"),e.removeClassName(t,"tridi-viewer-hovered")})},a.prototype.attachDragEvents=function(){var t=this;if(this.draggable){var e=this.getViewerImage();this.verbose&&console.log(a.header(this.element),"Attaching drag events"),e.addEventListener("mouseup",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(a.header(t.element),"Mouseup triggered"),t.stopDragging(),t.resetMoveBuffer()}),e.addEventListener("mousedown",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(a.header(t.element),"Mousedown triggered"),t.startDragging(),t.rotateViewerImage(e)}),e.addEventListener("mousemove",function(e){t.dragActive&&(e.preventDefault&&e.preventDefault(),t.verbose&&console.log(a.header(t.element),"Mousemove triggered"),t.rotateViewerImage(e))}),e.addEventListener("mouseleave",function(){t.verbose&&console.log(a.header(t.element),"Mouseleave triggered"),t.resetMoveBuffer()})}},a.prototype.attachMouseLeaveDetection=function(){var e=this;this.mouseleaveDetect&&(this.verbose&&console.log(a.header(this.element),"Attaching mouseleave detection"),this.getViewer().addEventListener("mouseleave",function(){e.verbose&&console.log(a.header(e.element),"Viewer mouseleave triggered"),e.stopDragging(),e.resetMoveBuffer()}))},a.prototype.attachTouchEvents=function(){var t=this;if(this.touch){this.verbose&&console.log(a.header(this.element),"Attaching touch events");var e=this.getViewerImage();e.addEventListener("touchstart",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(a.header(t.element),"Touchstart triggered"),t.startDragging(),t.rotateViewerImage(e)}),e.addEventListener("touchmove",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(a.header(t.element),"Touchmove triggered"),t.rotateViewerImage(e)}),e.addEventListener("touchend",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(a.header(t.element),"Touchend triggered"),t.stopDragging(),t.resetMoveBuffer()})}},a.prototype.attachMousewheelEvents=function(){var t=this;if(this.mousewheel){this.verbose&&console.log(a.header(this.element),"Attaching mousewheel events");var e=this.getViewerImage();e.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault(),0<e.deltaY/120?t.wheelInverse?t.previousFrame():t.nextFrame():t.wheelInverse?t.nextFrame():t.previousFrame()})}},a.prototype.generateButtons=function(){if(this.buttons&&!this.getLeftButton()&&!this.getRightButton()){this.verbose&&console.log(a.header(this.element),"Generating buttons");var e=document.createElement("div"),t=document.createElement("div");e.className+="tridi-btn tridi-btn-left",e.setAttribute("tabindex","0"),t.className+="tridi-btn tridi-btn-right",t.setAttribute("tabindex","0"),this.getViewer().appendChild(e),this.getViewer().appendChild(t)}},a.prototype.attachButtonEvents=function(){var t=this;if(this.buttons){var e=this.getLeftButton(),i=this.getRightButton();e&&(this.verbose&&console.log(a.header(this.element),"Attaching left button click event"),e.addEventListener("click",function(){t.verbose&&console.log(a.header(t.element),"Left button click triggered"),t.inverse?t.previousFrame():t.nextFrame()}),e.addEventListener("keydown",function(e){13===e.which&&(t.verbose&&console.log(a.header(t.element),"Left button Enter keydown triggered"),t.inverse?t.previousFrame():t.nextFrame())})),i&&(this.verbose&&console.log(a.header(this.element),"Attaching right button click event"),i.addEventListener("click",function(){t.verbose&&console.log(a.header(t.element),"Right button click triggered"),t.inverse?t.nextFrame():t.previousFrame()}),i.addEventListener("keydown",function(e){13===e.which&&(t.verbose&&console.log(a.header(t.element),"Right button Enter keydown triggered"),t.inverse?t.nextFrame():t.previousFrame())}))}},a.prototype.toggleAutoplay=function(e,t){var i=this.resumeAutoplayDelay,r=this.autoplaySpeed;if(!1===e)this.intervals.forEach(clearInterval),this.intervals=[];else{var o=this;if(this.timeouts.forEach(clearTimeout),this.timeouts=[],t){var n=setInterval(function(){o.nextFrame()},r);o.intervals.push(n)}else{var a=setTimeout(function(){var e=setInterval(function(){o.nextFrame()},r);o.intervals.push(e)},i);o.timeouts.push(a)}}},a.prototype.startAutoplay=function(){var t=this;if(this.autoplay){if(this.verbose&&console.log(a.header(this.element),"Starting autoplay"),this.toggleAutoplay(!0,!0),this.stopAutoplayOnClick)this.verbose&&console.log(a.header(this.element),"Enable stop autoplay on click event"),this.getViewerImage().addEventListener("mousedown",function(){t.toggleAutoplay(!1)});if(this.stopAutoplayOnMouseenter)this.verbose&&console.log(a.header(this.element),"Enable stop autoplay on hover event"),this.getViewerImage().addEventListener("mouseenter",function(){t.verbose&&console.log(a.header(t.element),"Stopping autoplay on mouseenter"),t.toggleAutoplay(!1)});if(this.resumeAutoplayOnMouseleave)this.getViewerImage().addEventListener("mouseleave",function(e){t.verbose&&console.log(a.header(t.element),"Resuming autoplay on mouseleave"),e.target.classList.contains("tridi-btn")||t.toggleAutoplay(!0)})}},a.prototype.start=function(){var e=this;this.generateViewer(),this.generateLoadingScreen(),this.setLoadingState(!0),this.generateViewerImage(),this.setLoadingState(!1),this.displayHintOnStartup(function(){e.lazyLoad(function(){e.setLoadingState(!0),e.generateStash(),e.populateStash(),e.attachCosmeticEvents(),e.attachDragEvents(),e.attachMouseLeaveDetection(),e.attachTouchEvents(),e.attachMousewheelEvents(),e.generateButtons(),e.attachButtonEvents(),e.startAutoplay(),e.setLoadingState(!1)})})},a.prototype.load=function(){this.start()},a}();