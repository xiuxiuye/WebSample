$(function(){function b(){var e=-1;if(navigator.appName=="Microsoft Internet Explorer"){var c=navigator.userAgent;var d=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(d.exec(c)!=null){e=parseFloat(RegExp.$1)}}return e}var a={sectionCount:6,canScroll:true,fromButtom:false,sectionIdObject:0,section:".section",sectionBg:"img.section-bg",guideID:"#guide",hasBefore:false,extendEffect:true,beforeInit:function(){var c=this;this.hasBefore=true;this.loadSecondStepImg(function(){c.setImageSizeAndPostion()})},init:function(){if(b()>0&&b()<=9){this.extendEffect=false}this.setFrameSize();this.setImageSizeAndPostion();this.addResizeEvent();this.addScrollEvent();this.addDownloadJump();this.touchOperate();this.whenFirstLoadedIn();this.initGuide();this.goHomeButtonHover();this.getConfig()},getConfig:function(){var c="/mobile/data.json?v=150129-1";$.ajax({url:c,type:"GET",dataType:"json",success:function(g){for(var e in g){for(var f in g[e]){if(e=="iphone"){if($("#i-"+f).length){$("#i-"+f).html(g[e][f])}}else{if($("#a-"+f).length){$("#a-"+f).html(g[e][f])}}}}},error:function(){}})},goHomeButtonHover:function(){var d=$(".gohome-img-guide"),c=this;$(".gohome_but").mouseenter(function(f){if(c.extendEffect){d.addClass("yb-init-rtl")}else{d.fadeIn()}}).mouseleave(function(f){if(c.extendEffect){d.removeClass("yb-init-rtl")}else{d.fadeOut()}})},showGuideInterface:function(){var c=this,d="3%";setTimeout(function(){$(c.guideID).animate({right:d},1000)},2000)},pageFromGuide:function(){var c=this;$(".guide-item").click(function(g){if(c.canScroll){var f=$(this);if(!f.hasClass("active")){var h=parseInt(f.attr("data-section"));var d=-1;if(c.sectionIdObject>h){d=1;if(c.sectionIdObject-h>=2){c.fromButtom=true}c.sectionIdObject=h+1;c._scrollBrain(d,h+1)}else{if(h-c.sectionIdObject>=2){c.fromButtom=true}c.sectionIdObject=h-1;c._scrollBrain(d,h)}}return false}})},setPageGuide:function(d){var c=".guide-item",e="active";$(c).removeClass(e);$(c+":eq("+d+")").addClass(e)},initGuide:function(){this.showGuideInterface();this.setPageGuide(0);this.pageFromGuide()},loadSecondStepImg:function(f){var d=this;var e=$(".lazy-load"),c=e.length-1;e.each(function(g,h){var h=$(this);var i=h.attr("data-url");h.removeClass("lazy-load");h.attr({src:i}).load(function(j){d.setImageSizeAndPostion(h)});if(g==c){f()}})},whenFirstLoadedIn:function(){var c=this;$(".yb-client-content").animate({opacity:1},1000,function(){c.addInitEffect()})},addInitEffect:function(){var d=".yb-unvisible",e=".start-animate",c=false;if(!this.extendEffect){$(e).each(function(f,g){if(f==1){c=true}$(this).find(".yb-unvisible").each(function(i,h){if(!(i==1&&c)){$(this).animate({opacity:1},1000)}})})}else{$(e).addClass("init-effect")}},touchOperate:function(){var c=this,d=document.getElementById("body");c.forDevice(d,function(f){var e=c.sectionIdObject;if(c.canScroll){c.canScroll=false;e++;c._scrollBrain(f,e)}})},forDevice:function(f,i){var d=this,e=f,c=0,h=0,g={Start:"touchstart",Move:"touchmove",End:"touchend"};if(document.addEventListener){e.addEventListener(g.Start,function(k){k.preventDefault();var j=k.touches[0];c=j.pageY},false);e.addEventListener(g.Move,function(k){k.preventDefault();var j=k.touches[0];h=j.pageY-c},false);e.addEventListener(g.End,function(j){j.preventDefault();if(h){i(h)}},false)}},addDownloadJump:function(){var c=this;$("a.download_but").click(function(f){c.jumpToBottom();return false});var d=document.getElementById("downloadApp");if(document.addEventListener){d.addEventListener("touchstart",function(e){e.preventDefault();c.jumpToBottom()},false)}},jumpToBottom:function(){var c=this;c.fromButtom=true;c.sectionIdObject=5;c._scrollBrain(-1,6)},setFrameSize:function(){var d=this,e=$(window),c=e.innerHeight(),f=e.innerWidth();$(".yb-client-content , .section-bg-block ,.section-block").css({height:c});$(d.section).css({height:c});$(d.section).each(function(g,h){if(g==d.sectionCount){if(d.sectionIdObject==d.sectionCount){$(this).css({height:"1115px",bottom:"-"+(1115-c)+"px"})}else{$(this).css({height:"1115px",bottom:"-1115px"})}$(this).find(".section-block").css({height:"1115px"})}})},addScrollEvent:function(){var c=this;var d=function(g){var g=g||window.event;var f=c.sectionIdObject;if(c.canScroll){c.canScroll=false;f++;if(g.wheelDelta){c._scrollBrain(g.wheelDelta,f)}else{if(g.detail){c._scrollBrain(-(g.detail),f)}}}};if(document.addEventListener){document.addEventListener("DOMMouseScroll",d,false)}window.onmousewheel=document.onmousewheel=d},_scrollBrain:function(i,g){var f=this,e=0,d=$(window).height(),j=$(f.section+":eq("+f.sectionCount+")"),c=j.css("bottom"),h=1115;if(i<0){if(f.sectionIdObject==f.sectionCount){if(d<h&&c!="0px"){j.animate({bottom:0},300,function(){})}}if(f.sectionIdObject<f.sectionCount){$(f.section).each(function(m,n){if(m==g){f.setPageGuide(m);var k=$(this);if(!(m==1||f.fromButtom)){$(this).prev(".section").animate({bottom:"100%"},1000)}var l="0%";if(m==f.sectionCount){l="-"+(h-d)+"px"}k.animate({bottom:l},1000,function(){f.sectionIdObject++;f.canScroll=true;if(f.extendEffect){k.addClass("effect")}else{k.find(".yb-unvisible").each(function(o,p){$(this).animate({opacity:1},1000)})}if(f.fromButtom){$(f.section).each(function(o,p){if(o!=f.sectionIdObject){if(o!=0&&o<g){$(this).css({bottom:"100%"})}}});f.fromButtom=false}})}})}else{f.canScroll=true}}else{g=f.sectionIdObject;if(g>0){$(f.section).each(function(m,n){var k=$(this);if(m==g){f.setPageGuide(m-1);var o=(m==1);l=o?"-90%":"-100%";if(!(m==1||f.fromButtom)){k.prev(".section").animate({bottom:"0%"},1000)}else{if(f.fromButtom){k.prev(".section").animate({bottom:"0%"},1000)}}if(m==f.sectionCount){l="-1115px"}k.animate({bottom:l},1000,function(){f.sectionIdObject--;f.canScroll=true;var p=k.prev(".section");if(f.extendEffect){if(!p.hasClass("effect")){p.addClass("effect")}}else{k.find(".yb-unvisible").each(function(q,r){$(this).animate({opacity:1},1000)})}if(o){k.animate({bottom:"-80%"},800)}})}else{var l="-100%";if(m==f.sectionCount){l="-1115px"}if(m>g){k.animate({bottom:l},1000)}}})}else{f.canScroll=true}}},addResizeEvent:function(){var c=this;$(window).resize(function(){c.setFrameSize();c.setImageSizeAndPostion()})},setImageSizeAndPostion:function(f){var e=this,h=$(e.sectionBg),d=$(window).innerHeight(),i=$(window).innerWidth(),c={type:"data-type",originWidth:"data-origin-width",originHeight:"data-origin-height"},g={full:"full",origin:"origin"};h.each(function(r,p){var p=$(this),j=p.attr(c.type),n=p.height(),t=p.width(),l=0,o=0,k=0,m=0,q=0,s=0,u=0;if(!p.attr(c.originWidth)){p.attr({"data-origin-width":t})}else{t=p.attr(c.originWidth)}if(!p.attr(c.originHeight)){p.attr({"data-origin-height":n})}else{n=p.attr(c.originHeight)}m=d/i;q=n/t;switch(j){case g.full:if(m<q){o=i;l=i*n/t;s=-((l-d)/2);u=0}else{l=d;o=d*t/n;s=0;u=-(o-i)/2}p.css({top:s,left:u,height:l,width:o});break;case g.origin:l=d-170;if(l>n){l=n}o=l*t/n;p.css({height:l,width:o});u=(i-p.width())/2;p.css({bottom:k,left:u});break}})}};ylframe.modules.clientEffect=a});