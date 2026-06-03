/**
    * handleSidebarFilter
    * footer
    * button
    * infiniteslide_wrap
    * animate
    * goTop
    * counter
    * section_title
    * animationBottom
    * pageTransition
 */

(function ($) {
    "use strict";

    var handleSidebarFilter = function () {
        $("#side-bar,.sidebar-btn").on("click", function () {
            if ($(window).width() <= 1200) {
                $(".sidebar-filter,.overlay-filter").addClass("show");
            }
        });
        $(".close-filter,.overlay-filter").on("click", function () {
            $(".sidebar-filter,.overlay-filter").removeClass("show");
        });
    };

    var footer = function () {
        function checkScreenSize() {
            if (window.matchMedia("(max-width: 550px)").matches) {
                $(".tf-collapse-content").css("display", "none");
            } else {
                $(".footer-menu-list").siblings().removeClass("open");
                $(".tf-collapse-content").css("display", "unset");
            }
        }
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        var args = { duration: 250 };
        $(".title-mobile").on("click", function () {
            $(this).parent(".footer-col-block").toggleClass("open");
            if (!$(this).parent(".footer-col-block").is(".open")) {
                $(this).next().slideUp(args);
            } else {
                $(this).next().slideDown(args);
            }
        });
    };

    var button = function () {
        $('.video-play-button').on('click', function (e) {
            e.preventDefault();
            var videoSrc = $(this).attr('data-video');
            $('#videoFrame').attr('src', videoSrc);
            $('#videoPopup').css('display', 'flex');
        });
        
        
        $('#videoClose').on('click', function () {
            $('#videoFrame').attr('src', '');
            $('#videoPopup').css('display', 'none');
        });
        
        $('#videoPopup').on('click', function (e) {
            if (e.target === this) {
              $('#videoFrame').attr('src', '');
              $('#videoPopup').css('display', 'none');
            }
        });
    };

    var infiniteslide_wrap = function () {
        $('.infiniteslide_wrap').each(function () {
            const $wrap = $(this);
            const slide = $wrap.find('.infiniteslide')[0];
            const slideWidth = slide.scrollWidth / 2;
            const tl = gsap.to(slide, {
              x: -slideWidth,
              duration: 18,
              ease: "linear",
              repeat: -1
            });
        
            $wrap.hover(
              function () { tl.pause(); },
              function () { tl.resume(); }
            );
        });
    }

    var animate = function () {
        var $items = $('[data-animate]');
      
        var checkAnimate = function () {
          var windowBottom = $(window).scrollTop() + $(window).height();
      
          $items.each(function () {
            var itemTop = $(this).offset().top + 100;
      
            if (windowBottom > itemTop) {
              $(this).addClass('animated');
            }
          });
        };
      
        $(window).on('scroll', checkAnimate);
        checkAnimate();
    };
      
    var goTop = function () {
        var $goTop = $("#goTop");

        $(window).on("scroll", function () {
            var scrollTop = $(this).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var progress = (scrollTop / docHeight) * 360;

            if (scrollTop > 300) {
            $goTop.addClass("show");
            } else {
            $goTop.removeClass("show");
            }

            $goTop.find(".border-progress")
            .css("--progress-angle", progress + "deg");
        });

        $goTop.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 0);
        });

        anime({
            targets: ".box",
            translateX: 250,
            duration: 1500,
            loop: true,
            direction: "alternate",
            easing: "linear"
        });
    };

    var counter = function () {
        var $counters = $('[data-target]');
      
        var checkCounter = function () {
          var windowBottom = $(window).scrollTop() + $(window).height();
      
          $counters.each(function () {
            var $el = $(this);
      
            if ($el.data('animated')) return;
      
            var elementTop = $el.offset().top;
      
            if (windowBottom > elementTop + 100) {
              anime({
                targets: { value: 0 },
                value: Number($el.data('target')),
                duration: 2000,
                easing: 'easeOutExpo',
                round: 1,
                update: function (anim) {
                  $el.html(
                    anim.animations[0].currentValue + ($el.data('suffix') || '')
                  );
                }
              });
      
              $el.data('animated', true);
            }
          });
        };
      
        $(window).on('scroll', checkCounter);
        checkCounter();
    };
      
    var pageTransition = function () {
        var $overlay = $(".page-transition");
        var $logo = $(".transition-logo");
      
        if ($logo.find("span").length === 0) {
          $logo.html(
            $logo.text().trim().split("").map(function (l) {
              return "<span>" + l + "</span>";
            }).join("")
          );
        }
      
        var letters = $(".transition-logo span").toArray();
        var panelLeft = $(".panel-left")[0];
        var panelRight = $(".panel-right")[0];
      
        var playTransition = function () {
          $overlay.css("display", "flex");
      
          anime.timeline({ easing: "easeInOutExpo" })
            .add({
              targets: letters,
              translateY: [60, 0],
              opacity: [0, 1],
              filter: ["blur(8px)", "blur(0px)"],
              delay: anime.stagger(80),
              duration: 800
            })
            .add({
              targets: letters,
              opacity: [1, 0],
              duration: 400,
              delay: 200
            })
            .add({
              targets: panelLeft,
              translateX: ["0%", "-100%"],
              duration: 900
            })
            .add({
              targets: panelRight,
              translateX: ["0%", "100%"],
              duration: 900
            }, "-=900")
            .add({
              complete: function () {
                $overlay.hide();
      
                anime.set(letters, {
                  translateY: 60,
                  opacity: 0,
                  filter: "blur(8px)"
                });
      
                anime.set([panelLeft, panelRight], {
                  translateX: "0%"
                });
              }
            });
        };
      
        playTransition();
    };

    var section_title = function () {
        $('.section-title').each(function () {
            const $title = $(this);
            const text = $title.text().trim();
        
            if ($title.find('.word').length > 0) {
              return;
            }
        
            let newHTML = '';
            const words = text.split(/\s+/);
        
            words.forEach((word, wordIndex) => {
              if (!word) return;
        
              newHTML += '<span class="word">';
        
              for (let i = 0; i < word.length; i++) {
                const char = word[i];
                newHTML += `<span class="char">${char}</span>`;
              }
        
              newHTML += '</span>';
        
              if (wordIndex < words.length - 1) {
                newHTML += ' ';
              }
            });
        
            $title.html(newHTML);
        
            const chars = $title.find('.char');
        
            chars.css({
              'transform': 'translateY(1.2em)',
              'opacity': '0',
              'display': 'inline-block'
            });
        
            let animated = false;
        
            function checkScroll() {
              if (animated) return;
        
              const elementTop = $title.offset().top;
              const windowBottom = $(window).scrollTop() + $(window).height();
        
              if (windowBottom > elementTop + 50) {
                anime({
                  targets: chars.toArray(),
                  translateY: [
                    { value: '-0.4em', duration: 400, easing: 'easeOutExpo' },
                    { value: 0, duration: 600, easing: 'easeOutBounce' }
                  ],
                  opacity: [0, 1],
                  delay: anime.stagger(30),
                  easing: 'easeOutExpo'
                });
        
                animated = true;
                $(window).off('scroll', checkScroll);
              }
            }
        
            $(window).on('scroll', checkScroll);
            checkScroll();
        });
    }
    
    var animationBottom = function () {
        var isMobile = window.innerWidth <= 768;
        var moveDistance = isMobile ? 20 : 50;
      
        var animatedElements = [];
      
        $("html, body").css("overflow-x", "hidden");
      
        var setupElement = function (el) {
          var $el = $(el);
          var rawDelay = $el.attr("data-delay");
          var customDelay = 0;
      
          if (rawDelay) {
            customDelay = rawDelay.indexOf("s") !== -1
              ? parseFloat(rawDelay) * 1000
              : parseInt(rawDelay);
          }
      
          $el.css({
            opacity: 0,
            transform: "translateY(" + moveDistance + "px)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden"
          });
      
          animatedElements.push({
            el: el,
            delay: customDelay,
            animated: false
          });
        };
      
        var EXCLUDED = ".tf-topbar, #header, .tf-slider-show, footer, .video-popup";
      
        $("section .animation-bottom, div:not(" + EXCLUDED + ") > .animation-bottom").each(function () {
          if ($(this).closest(EXCLUDED).length) return;
          setupElement(this);
        });
      
        var animateElement = function (item) {
          anime({
            targets: item.el,
            translateY: [moveDistance, 0],
            opacity: [0, 1],
            duration: 750,
            delay: item.delay,
            easing: "cubicBezier(0.22, 1, 0.36, 1)"
          });
        };
      
        var checkScroll = function () {
          var viewportBottom = window.innerHeight + window.scrollY;
      
          animatedElements.forEach(function (item) {
            if (item.animated) return;
      
            var rect = item.el.getBoundingClientRect();
            var elementTop = rect.top + window.scrollY;
      
            if (viewportBottom > elementTop + (item.el.offsetHeight * 0.15)) {
              animateElement(item);
              item.animated = true;
            }
          });
        };
      
        var ticking = false;
      
        window.addEventListener("scroll", function () {
          if (!ticking) {
            requestAnimationFrame(function () {
              checkScroll();
              ticking = false;
            });
            ticking = true;
          }
        });
      
        setTimeout(checkScroll, 100);
    };
      

    // Dom Ready
    $(function () {

        handleSidebarFilter();
        footer();
        button();
        infiniteslide_wrap();
        animate();
        goTop();
        counter();
        section_title();
        animationBottom();
        pageTransition();

    });
})(jQuery);
