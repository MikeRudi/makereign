//W start
gsap.config({
  nullTargetWarn: false,
});
const isMobile = window.matchMedia("(max-width: 991px)").matches;

const lenis = new Lenis({
  syncTouch: !isMobile,
  syncTouchLerp: 0.075,
  touchInertiaExponent: 1.7,
  touchMultiplier: 1,
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

lenis.on("scroll", ScrollTrigger.update);

let winW = window.innerWidth;

window.addEventListener("resize", () => {
  if (window.innerWidth !== winW) {
    winW = window.innerWidth;
    ScrollTrigger.refresh();
  }
});

const CONTROL = {
  headingSelector: "[page-intro-item]",

  preloader: {
    minDuration: 3000,
    maxWait: 6000,
    dotsInterval: 400,
    progressLerp: 0.08,
    progressSnap: 0.001,
  },

  introHeading: {
    startY: "3rem",
    endY: "0rem",
    duration: 1,
    ease: "power3.out",
    stagger: 0.01,
  },

  overlap: {
    headingStart: ">-0.8",
    oneTrustStart: ">-0.0",
  },

  onetrust: {
    visibleClass: "is-visible",
    id: "onetrust-consent-sdk",
  },
};

//PRELOADER
function sitePreloader() {
  if (window.Webflow && window.Webflow.env && window.Webflow.env("editor"))
    return;

  const $preloader = $(".preloader-wrap");
  const $pageWrap = $(".page-main");
  const $number = $(".preloader-number");
  const $loading = $(".preloader-loading");
  const $progressBar = $(".preloader-progress");
  const $loadOpacity = $("[page-intro-item]");

  if (!$preloader.length || !$pageWrap.length) return;

  gsap.set(CONTROL.headingSelector, { y: CONTROL.introHeading.startY });

  $preloader.css({ opacity: 1, pointerEvents: "auto", display: "block" });
  $loadOpacity.css({ opacity: 1 });

  if ($number.length) $number.text("0%");
  if ($progressBar.length) $progressBar.css("width", "0%");

  if (
    typeof lenis !== "undefined" &&
    lenis &&
    typeof lenis.stop === "function"
  ) {
    lenis.stop();
  }

  const MIN_DURATION = CONTROL.preloader.minDuration;
  const MAX_WAIT = CONTROL.preloader.maxWait;
  const startTime = performance.now();

  let loadDone = false;
  let finished = false;

  let displayedProgress = 0;
  let targetProgress = 0;

  let dotsInterval = null;
  let dotsCount = 0;

  function startLoadingDots() {
    if (!$loading.length) return;

    dotsInterval = setInterval(() => {
      dotsCount = (dotsCount + 1) % 4;
      const dots = ".".repeat(dotsCount);
      $loading.text("loading" + dots);
    }, CONTROL.preloader.dotsInterval);
  }

  function stopLoadingDots() {
    if (dotsInterval) clearInterval(dotsInterval);
  }

  const masterTimeline = gsap.timeline({
    paused: true,
    onComplete() {
      stopLoadingDots();

      $preloader.css({ display: "none", pointerEvents: "none" });
      $pageWrap.css({ pointerEvents: "auto" });

      if (
        typeof lenis !== "undefined" &&
        lenis &&
        typeof lenis.start === "function"
      ) {
        lenis.start();
      }

      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    },
  });

  masterTimeline
    .to($pageWrap, { opacity: 1 }, 0.5)
    .to(
      $preloader,
      {
        opacity: 1,
        clipPath: "inset(0% 0% 100% 0% round 0 0 2.5rem 2.5rem)",
        duration: 1.25,
        ease: "power3.inOut",
      },
      0
    )
    .to(
      ".preloader-layout",
      {
        yPercent: -30,
        duration: 1.25,
        ease: "power3.inOut",
      },
      0
    )
    .fromTo(
      "[lander-load-opacity], [cursor-img]",
      { opacity: 0 },
      { opacity: 1, duration: 0.75, ease: "power1.inOut" },
      0.75
    )
    .fromTo(
      "[cursor-img]",
      { yPercent: 50, scale: 0.95 },
      { yPercent: 0, scale: 1, duration: 1, ease: "power3.inOut" },
      0.4
    )
    .fromTo(
      "[lander-load-nav]",
      { yPercent: 10 },
      { yPercent: 0, duration: 0.65, ease: "power1.out" },
      0.5
    )
    .fromTo(
      "[lander-load-opacity]",
      { yPercent: 30 },
      { yPercent: 0, duration: 1, ease: "power3.inOut" },
      0.4
    )
    .to(
      CONTROL.headingSelector,
      {
        y: CONTROL.introHeading.endY,
        duration: CONTROL.introHeading.duration,
        ease: CONTROL.introHeading.ease,
        stagger: CONTROL.introHeading.stagger,
      },
      CONTROL.overlap.headingStart
    )
    .add(() => {
      const el = document.getElementById(CONTROL.onetrust.id);
      if (el) el.classList.add(CONTROL.onetrust.visibleClass);
      else {
        const observer = new MutationObserver(() => {
          const el2 = document.getElementById(CONTROL.onetrust.id);
          if (!el2) return;
          el2.classList.add(CONTROL.onetrust.visibleClass);
          observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }, CONTROL.overlap.oneTrustStart);

  if (document.readyState === "complete") {
    loadDone = true;
  } else {
    window.addEventListener(
      "load",
      () => {
        loadDone = true;
      },
      { once: true }
    );
  }

  function renderProgress(value) {
    const percent = Math.round(value * 100);
    if ($number.length) $number.text(percent + "%");
    if ($progressBar.length) $progressBar.css("width", percent + "%");
  }

  function finishIfReady() {
    if (finished) return;

    const now = performance.now();
    const elapsed = now - startTime;

    const minTimeDone = elapsed >= MIN_DURATION;
    const safetyTimeoutReached = elapsed >= MIN_DURATION + MAX_WAIT;

    if (
      (minTimeDone && loadDone && displayedProgress >= 0.999) ||
      safetyTimeoutReached
    ) {
      finished = true;
      gsap.ticker.remove(updateProgress);
      masterTimeline.play();
    }
  }

  function updateProgress() {
    const now = performance.now();
    const elapsed = now - startTime;

    const timeProgress = Math.min(elapsed / MIN_DURATION, 1);

    if (!loadDone) {
      targetProgress = Math.min(timeProgress, 0.99);
    } else {
      targetProgress = 1;
    }

    displayedProgress +=
      (targetProgress - displayedProgress) * CONTROL.preloader.progressLerp;

    if (
      Math.abs(targetProgress - displayedProgress) <
      CONTROL.preloader.progressSnap
    ) {
      displayedProgress = targetProgress;
    }

    renderProgress(displayedProgress);
    finishIfReady();
  }

  startLoadingDots();
  gsap.ticker.add(updateProgress);
}

sitePreloader();

//MAP
function loadDotMapSvg() {
  const mount = document.getElementById("map-svg");
  if (!mount) return;

  const url =
    "https://cdn.prod.website-files.com/698865026f2f9537ae6ae527/699c2c6895edffbdcec9eeb3_map01.svg";

  fetch(url)
    .then((r) => r.text())
    .then((svgText) => {
      mount.innerHTML = svgText;

      const svg = mount.querySelector("svg");
      if (!svg) return;

      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

      const paths = svg.querySelectorAll("path");
      paths.forEach((p) => p.classList.add("map-dot"));

      mount.dataset.mapReady = "true";

      console.log("✅ SVG injected, paths:", paths.length);

      mapDotProximity(); // ✅ start AFTER injection
    })
    .catch((err) => {
      console.warn("❌ SVG fetch failed", err);
    });
}

function mapDotProximity() {
  const mount = document.getElementById("map-svg");
  if (!mount) return;

  const svg = mount.querySelector("svg");
  if (!svg) {
    console.warn("❌ mapDotProximity: svg not found (too early)");
    return;
  }

  const paths = svg.querySelectorAll("path.map-dot");
  console.log("🟣 mapDotProximity init, dots:", paths.length);
  if (!paths.length) return;

  const dots = Array.from(paths).map((el) => {
    const bb = el.getBBox();
    return { el, cx: bb.x + bb.width / 2, cy: bb.y + bb.height / 2 };
  });

  function remToPx(rem) {
    const fs = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * (Number.isFinite(fs) ? fs : 16);
  }

  function getSvgPoint(clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;

    const ctm = svg.getScreenCTM();
    if (!ctm) return null;

    return pt.matrixTransform(ctm.inverse());
  }

  let mouseX = -99999;
  let mouseY = -99999;
  let rafId = null;
  function tick() {
    rafId = null;

    const svgPoint = getSvgPoint(mouseX, mouseY);
    if (!svgPoint) return;

    const radius = remToPx(2.5);
    const radius2 = radius * radius;

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const dx = d.cx - svgPoint.x;
      const dy = d.cy - svgPoint.y;
      const d2 = dx * dx + dy * dy;

      if (d2 <= radius2) {
        const dist = Math.sqrt(d2);
        let t = 1 - dist / radius; // 1 center → 0 edge
        t = t * t; // eased falloff

        d.el.classList.add("is-hot");
        d.el.style.setProperty("--s", (1 + t * 0.2).toFixed(3)); // 1 → 1.2
      } else {
        d.el.classList.remove("is-hot");
        d.el.style.setProperty("--s", "1");
      }
    }
  }

  function scheduleTick() {
    if (rafId) return;
    rafId = requestAnimationFrame(tick);
  }

  $(window)
    .off("mousemove.mapDots mouseleave.mapDots")
    .on("mousemove.mapDots", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      scheduleTick();
    })
    .on("mouseleave.mapDots", function () {
      for (let i = 0; i < dots.length; i++)
        dots[i].el.classList.remove("is-hot");
    });
}

loadDotMapSvg();
//NAV 1
const navHolder = document.querySelector(".nav-holder");
const triggerEl = document.querySelector(".nav-trigger");

// SCROLL SHRINK
if (window.innerWidth > 991) {
  const shrinkTl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start: "top top",
      toggleActions: "play none none reverse",
    },
  });
  shrinkTl.fromTo(
    navHolder,
    { width: "100%" },
    { width: "57.5%", duration: 0.4, ease: "power2.out" }
  );
}

gsap.set(".menu", { display: "none" });

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
gsap.defaults({
  ease: "main",
  duration: 0.5,
});

function initMenu() {
  const navWrap = document.querySelector(".nav");
  const navbar = document.querySelector(".navbar");
  const menu = navWrap.querySelector(".menu");
  const menuInner = navWrap.querySelector(".menu-inner");
  const overlay = navWrap.querySelector(".overlay");
  const menuToggles = document.querySelectorAll("[data-menu-toggle]");
  const menuLinks = navWrap.querySelectorAll(".menu-link");
  const mobileTog = navbar.querySelector(".menu-mobile-tog .icon-up");

  let tl = gsap.timeline();

  const openNav = (clickedToggle) => {
    lenis.stop();
    menu.setAttribute("data-nav", "open");

    const menuButton = clickedToggle.closest(".menu-button");
    const menuButtonIcon = menuButton.querySelector(".icon-up");
    const navbarLink = menuButton.querySelectorAll(".navbar-link");

    tl.clear()
      .set(menuInner, { height: "5.5rem", opacity: 0 })
      .set(menu, { display: "block" })
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
      .to(navHolder, { width: window.innerWidth > 991 ? "57.5%" : "100%" }, "<")
      .fromTo(
        menuInner,
        { height: "5.5rem", opacity: 0 },
        { height: "97%", opacity: 1 },
        "<+0.2"
      )
      .fromTo(menuButtonIcon, { yPercent: 0 }, { yPercent: -102 }, "<")
      .fromTo(
        navbarLink,
        { yPercent: 0 },
        { yPercent: -100, stagger: 0.2 },
        "<"
      )
      .fromTo(
        menuLinks,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.03 },
        "<+=0.1"
      );

    if (mobileTog) {
      tl.fromTo(mobileTog, { yPercent: 0 }, { yPercent: -100 }, "<");
    }

    if (window.innerWidth <= 991) {
      tl.to(".pp-logo, .download", { scale: 0.7 }, 0);
    }
  };

  const closeNav = () => {
    lenis.start();
    menu.setAttribute("data-nav", "closed");
    const triggerTop = triggerEl.getBoundingClientRect().top;
    const shouldBeShrunk = triggerTop <= 0 && window.innerWidth > 991;

    const allMenuButtons = document.querySelectorAll(".menu-button");

    tl.clear()
      .to(overlay, { autoAlpha: 0 })
      .to(navHolder, { width: shouldBeShrunk ? "57.5%" : "100%" }, "<")
      .to(menuInner, { height: "5.5rem", opacity: 0 }, "<");

    allMenuButtons.forEach((btn) => {
      const icon = btn.querySelector(".icon-up");
      const links = btn.querySelectorAll(".navbar-link");

      tl.to(links, { yPercent: 0 }, "<").to(icon, { yPercent: 0 }, "<");
    });

    if (mobileTog) {
      tl.to(mobileTog, { yPercent: 0 }, "<");
    }

    tl.set(menu, { display: "none" });

    if (window.innerWidth <= 991) {
      tl.to(".pp-logo, .download", { scale: 1 }, 0);
    }
  };

  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const state = menu.getAttribute("data-nav");
      state === "open" ? closeNav() : openNav(toggle);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.getAttribute("data-nav") === "open") {
      closeNav();
    }
  });
}

initMenu();

// NAV 2
const mm = gsap.matchMedia();

mm.add("(min-width: 992px)", () => {
  ScrollTrigger.create({
    trigger: ".nav-trigger",
    start: "top top",
    onEnter: () => {
      gsap.set(".before-scroll", { opacity: 1 });

      gsap.to(".download, .pp-logo", {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.out",
      });

      gsap.to(".menu-nav-wrap", {
        yPercent: 150,
        duration: 0.6,
        ease: "power2.out",
      });
    },

    onLeaveBack: () => {
      gsap.set(".before-scroll", { opacity: 0 });

      gsap.to(".download, .pp-logo", {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.2,
        delay: 0.5,
        ease: "power2.out",
      });

      gsap.to(".menu-nav-wrap", {
        yPercent: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    },
  });
});

const mmmobile = gsap.matchMedia();
mmmobile.add("(max-width: 991px)", () => {
  const showAnim = gsap
    .from(".nav", {
      yPercent: -150,
      paused: true,
      duration: 0.8,
    })
    .progress(1);

  let lastY = 0;

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    onUpdate: (self) => {
      const currentY = self.scroll();
      if (Math.abs(currentY - lastY) < 5) return; // ignore tiny movements
      lastY = currentY;

      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });
});

// DESKTOP HOVER
$(".map-tag-hover").hover(
  function () {
    if (window.innerWidth >= 992) {
      $(this).closest(".map-tag").addClass("tag-on");
    }
  },
  function () {
    if (window.innerWidth >= 992) {
      $(this).closest(".map-tag").removeClass("tag-on");
    }
  }
);
// MOBILE OPEN
$(".map-tag-hover").on("click", function () {
  if (window.innerWidth > 991) return;

  const $tag = $(this).closest(".map-tag-wrap");

  // If already open → do nothing
  if ($tag.hasClass("mobile-tag-on")) return;

  // Close any currently open tag
  const $open = $(".map-tag-wrap.mobile-tag-on");

  if ($open.length) {
    $open.removeClass("mobile-tag-on");
  }

  // Open new one
  $tag.addClass("mobile-tag-on");
});

// MOBILE CLOSE
$(document).on("click", ".mobile-icon-popup, .mobile-map-close", function () {
  if (window.innerWidth > 991) return;

  const $tag = $(this).closest(".map-tag-wrap");

  if (!$tag.hasClass("mobile-tag-on")) return;

  $tag.removeClass("mobile-tag-on");
});
//ACCORDION
// let maccoridon = gsap.matchMedia();

// maccoridon.add("(min-width: 992px)", () => {
//   let autoInterval;
//   const $accordions = $(".accordion-section .accordion");
//   let currentIndex = 0;

//   function matchHeight() {
//     const h = $(".accordion-img-wrap").outerHeight();
//     $(".accordion-section > .accordion-content").css("height", h + "px");
//   }

//   function setStretchHeight() {
//     const wrapHeight = $(".accordion-img-wrap").outerHeight();
//     let totalClosed = 0;
//     $accordions.each(function () {
//       if (!$(this).hasClass("is-expanded")) {
//         totalClosed += $(this).outerHeight(true);
//       }
//     });
//     const $expanded = $accordions.filter(".is-expanded");
//     if ($expanded.length) {
//       const $stretch = $expanded.find(".accordion-stretch");
//       const currentStretch = $stretch.outerHeight() || 0;
//       const expandedTotal = $expanded.get(0).scrollHeight - currentStretch;
//       const remaining = wrapHeight - totalClosed - expandedTotal;
//       $stretch.css("height", (remaining > 0 ? remaining : 0) + "px");
//     }
//   }

//   function openAccordion(index) {
//     $(".accordion > .accordion-content").removeClass("active");
//     $(".accordion .btn-hover").removeClass("hover");
//     $(".accordion-stretch").css("height", "0px");
//     $accordions.removeClass("is-expanded");
//     const $current = $accordions.eq(index);
//     $current.find("> .accordion-content").addClass("active");
//     $current.find(".btn-hover").addClass("hover");
//     $current.addClass("is-expanded");
//     setTimeout(setStretchHeight, 420);
//   }

//   function startAuto() {
//     stopAuto();
//     autoInterval = setInterval(function () {
//       currentIndex = (currentIndex + 1) % $accordions.length;
//       openAccordion(currentIndex);
//     }, 4000);
//   }

//   function stopAuto() {
//     clearInterval(autoInterval);
//   }

//   matchHeight();
//   openAccordion(0);
//   startAuto();

//   $(".accordion-section").on("click", ".accordion", function (e) {
//     e.stopPropagation();
//     if ($(this).hasClass("is-expanded")) return;

//     currentIndex = $accordions.index(this);
//     const $content = $(this).find("> .accordion-content");

//     $(".accordion > .accordion-content").removeClass("active");
//     $(".accordion .btn-hover").removeClass("hover");
//     $(".accordion-stretch").css("height", "0px");
//     $accordions.removeClass("is-expanded");

//     $content.addClass("active");
//     $(this).find(".btn-hover").addClass("hover");
//     $(this).addClass("is-expanded");
//     setStretchHeight();

//     startAuto();
//   });

//   $(document).on("click", function () {
//     $(".accordion > .accordion-content").removeClass("active");
//     $(".accordion .btn-hover").removeClass("hover");
//     $(".accordion-stretch").css("height", "0px");
//     $accordions.removeClass("is-expanded");
//   });

//   $(".accordion-section")
//     .on("mouseenter", ".accordion", function () {
//       $(this).find(".btn-hover").addClass("hover");
//     })
//     .on("mouseleave", ".accordion", function () {
//       if (!$(this).find("> .accordion-content").hasClass("active")) {
//         $(this).find(".btn-hover").removeClass("hover");
//       }
//     });

//   $(window).on("resize", function () {
//     matchHeight();
//     setStretchHeight();
//   });
// });

//ACCORDION END

function accordionAutoMatch() {
  let maccoridon = gsap.matchMedia();

  maccoridon.add("(min-width: 992px)", () => {
    const $section = $(".accordion-section");
    const $accordions = $section.find(".accordion");

    if (!$accordions.length || !$section.length) return;

    let index = 0;
    let timer = null;
    let auto = false;
    let progressTween = null;

    // 🔧 CONTROL THIS VALUE (milliseconds)
    const AUTO_DURATION = 8000;

    function showImageForCurrent() {
      const $current = $accordions.eq(index);
      const key = $current.attr("aa-item");

      if (!key) return;

      const $imgsAll = $(".aa-img");
      const $imgsScoped = $section.find(".aa-img");
      const $targetAll = $(".aa-img-" + key);
      const $targetScoped = $section.find(".aa-img-" + key);

      const $imgs = $imgsScoped.length ? $imgsScoped : $imgsAll;
      const $target = $targetScoped.length ? $targetScoped : $targetAll;

      $imgs.css("opacity", 0);

      if (!$target.length) return;

      $target.css("opacity", 1);
    }

    function startProgressBar() {
      if (typeof gsap === "undefined") return;
      if (progressTween) progressTween.kill();

      const $fills = $accordions.find(".h-line-fill");
      if (!$fills.length) return;

      $fills.css("width", "0%");
      const $currentFill = $accordions.eq(index).find(".h-line-fill");

      progressTween = gsap.fromTo(
        $currentFill,
        { width: "0%" },
        {
          width: "100%",
          duration: AUTO_DURATION / 1000,
          ease: "linear",
        }
      );
    }

    function restartTimer() {
      clearTimeout(timer);
      if (!auto) return;

      timer = setTimeout(nextItem, AUTO_DURATION);
      startProgressBar();
    }

    function clearActive() {
      $(".accordion > .accordion-content").removeClass("active");
      $(".accordion .btn-hover").removeClass("hover");
      $accordions.removeClass("is-expanded");
    }

    function setActive(i) {
      index = i;

      clearActive();

      const $current = $accordions.eq(index);
      $current.find("> .accordion-content").addClass("active");
      $current.find(".btn-hover").addClass("hover");
      $current.addClass("is-expanded");

      showImageForCurrent();

      if (auto) restartTimer();
    }

    function nextItem() {
      index = (index + 1) % $accordions.length;
      setActive(index);
    }

    $accordions.each(function (i) {
      $(this).on("click", function (e) {
        e.stopPropagation();
        if ($(this).hasClass("is-expanded")) return;

        auto = false;
        clearTimeout(timer);
        if (progressTween) progressTween.kill();

        setActive(i);

        const $fills = $accordions.find(".h-line-fill");
        if ($fills.length) {
          $fills.css("width", "0%");
          $accordions.eq(index).find(".h-line-fill").css("width", "100%");
        }
      });
    });

    $(".accordion-section")
      .on("mouseenter", ".accordion", function () {
        $(this).find(".btn-hover").addClass("hover");
      })
      .on("mouseleave", ".accordion", function () {
        if (!$(this).find("> .accordion-content").hasClass("active")) {
          $(this).find(".btn-hover").removeClass("hover");
        }
      });

    setActive(0);

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({
        trigger: $section[0],
        start: "top 50%",
        once: true,
        onEnter() {
          auto = true;
          restartTimer();
        },
      });
    }
  });
}

accordionAutoMatch();

//ACCORDION END

//W end
//M start

let isVideoPlaying = false;
let isOpeningVideo = false;
let $currentHolder = null;

function getVideo($holder) {
  return $holder.find("video").get(0) || null;
}

function playVideo($holder) {
  const video = getVideo($holder);
  if (!video) return;

  video.playsInline = true;

  const p = video.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

function pauseVideo($holder) {
  const video = getVideo($holder);
  if (!video) return;
  video.pause();
}

$(".modal_trigger_btn_wrap").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  lenis.stop();

  const id = $(this).attr("video-target") || "default";
  const $holder = $(`.full_vid_holder[video-target="${id}"]`);
  if (!$holder.length) return;

  $currentHolder = $holder;
  isOpeningVideo = true;

  gsap.set(".video-popup-wrap", { pointerEvents: "auto" });

  gsap.set($holder, {
    display: "block",
    opacity: 0,
    pointerEvents: "auto",
  });

  gsap.to($holder, {
    opacity: 1,
    duration: 0.3,
    ease: "linear",
    onComplete: () => {
      playVideo($holder);

      gsap.delayedCall(0.1, () => {
        const video = getVideo($holder);
        if (video && video.paused) playVideo($holder);
        isVideoPlaying = true;
        isOpeningVideo = false;
      });
    },
  });
});

$(".model-close-m").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  if ($currentHolder) pauseVideo($currentHolder);
  isVideoPlaying = false;

  if ($currentHolder) {
    gsap.to($currentHolder, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.set($currentHolder, { display: "none" });
      },
    });
  } else {
    gsap.to(".full_vid_holder", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(".full_vid_holder", { display: "none" });
      },
    });
  }

  gsap.set(".video-popup-wrap", { pointerEvents: "none" });

  lenis.start();

  $currentHolder = null;
});

$(".full_vid_holder").on("click", function (e) {
  if (isOpeningVideo) return;

  if (
    $(e.target).closest(".video-volume-embed, .video-volum-embed").length ||
    $(e.target).closest(".slider").length ||
    $(e.target).closest(".video-progress-wrap").length
  ) {
    return;
  }

  const $holder = $(this);
  const video = getVideo($holder);
  if (!video) return;

  if (!video.paused) {
    video.pause();
    isVideoPlaying = false;
  } else {
    playVideo($holder);
    isVideoPlaying = true;
  }

  $currentHolder = $holder;
});

function visualVolumeSlider() {
  const wraps = document.querySelectorAll(
    ".video-volume-embed, .video-volum-embed"
  );

  wraps.forEach((wrap) => {
    const slider = wrap.querySelector(".slider");
    if (!slider) return;

    function setValueFromClick(e) {
      const rect = wrap.getBoundingClientRect();
      let pct = (e.clientX - rect.left) / rect.width;
      pct = Math.min(Math.max(pct, 0), 1);

      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 1;
      const step = parseFloat(slider.step) || 0.01;

      let val = min + pct * (max - min);
      val = Math.round(val / step) * step;

      slider.value = val;
      slider.dispatchEvent(new Event("input"));
    }

    wrap.addEventListener("click", setValueFromClick);

    wrap.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches && e.touches[0]) setValueFromClick(e.touches[0]);
      },
      { passive: true }
    );
  });

  document.querySelectorAll(".slider").forEach((slider) => {
    slider.addEventListener("input", () => {
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 1;
      const val = parseFloat(slider.value) || 0;

      const pct = ((val - min) / (max - min)) * 100;

      slider.style.backgroundImage = `linear-gradient(to right, white ${pct}%, rgba(255,255,255,.2) ${pct}%)`;
    });

    slider.dispatchEvent(new Event("input"));
  });
}

visualVolumeSlider();

function footerNavToggle() {
  if (typeof ScrollTrigger === "undefined") return;

  const $nav = $(".nav");
  const trigger = $(".footer-nav-trigger");

  if (!$nav.length || !trigger.length) return;

  ScrollTrigger.create({
    trigger: trigger[0],
    start: "bottom 50%",
    onEnter: function () {
      $nav.addClass("footer");
    },
    onLeaveBack: function () {
      $nav.removeClass("footer");
    },
  });
}

footerNavToggle();
//M end

function tooltip() {
  const tip = document.querySelector(".tooltip");
  if (!tip) return;

  function close() {
    tip.classList.add("is-closed");

    tip.removeEventListener("click", close);
    window.removeEventListener("scroll", close, true);
    window.removeEventListener("wheel", close, true);
    window.removeEventListener("touchmove", close, true);
  }

  // Close only if clicking inside tooltip
  tip.addEventListener("click", close);

  // Close on any scroll
  window.addEventListener("scroll", close, true);
  window.addEventListener("wheel", close, true);
  window.addEventListener("touchmove", close, true);
}

tooltip();

function maskScroll() {
  const $masks = $("[mask-scroll]");
  if (!$masks.length) return;

  $masks.each(function () {
    const el = this;

    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      linesClass: "mask-line",
      onSplit: function (instance) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          instance.lines,
          { clipPath: "inset(100% 0% -8% 0%)" },
          {
            clipPath: "inset(0% 0% -8% 0%)",
            duration: 0.3,
            ease: "power1.in",
            stagger: 0.08,
          },
          0
        )
          .fromTo(
            instance.lines,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.3,
              ease: "power1.out",
              stagger: 0.08,
            },
            0
          )
          .fromTo(
            instance.lines,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.1,
              ease: "linear",
              stagger: 0.08,
            },
            0.1
          );

        return tl;
      },
    });
  });
}

maskScroll();

function flipFilterTabs() {
  if (typeof gsap === "undefined" || typeof Flip === "undefined") return;

  gsap.registerPlugin(Flip);

  const filterLabels = gsap.utils.toArray(
    '[attr-1="filter-radios"] .radio_label'
  );
  const filterInputs = gsap.utils.toArray('[attr-1="filter-radios"] input');
  const items = gsap.utils.toArray('[attr-1="filter-item"]');

  const nonAllInputs = filterInputs.filter(
    (input, index) => filterLabels[index]?.id !== "All"
  );
  const isRadio = nonAllInputs.length > 0 && nonAllInputs[0].type === "radio";

  let allInput = null;
  filterInputs.forEach((input, index) => {
    if (filterLabels[index]?.id === "All") allInput = input;
  });

  filterInputs.forEach((input, index) => {
    const label = filterLabels[index];
    if (!label) return;

    if (label.id === "All") input.checked = true;
    else if (isRadio) input.checked = false;
    else input.checked = true;
  });

  if (isRadio && !allInput && filterInputs.length > 0) {
    filterInputs[0].checked = true;
  }

  function setActiveText(labelEl, delay) {
    const allTexts = document.querySelectorAll(
      '[attr-1="filter-radios"] [flip-text]'
    );
    allTexts.forEach((t) => (t.style.color = ""));

    const activeText = labelEl.querySelector("[flip-text]");
    if (!activeText) return;

    gsap.killTweensOf(activeText);

    gsap.to(activeText, {
      color: "#fff",
      duration: 0.25,
      ease: "power2.out",
      delay: delay || 0,
    });
  }

  function updateFilters() {
    const state = Flip.getState(items);

    let matches;

    if (isRadio) {
      let selectedId = "All";
      let activeLabel = null;

      filterInputs.forEach((input, index) => {
        if (input.checked) {
          selectedId = filterLabels[index]?.id || "All";
          activeLabel = filterLabels[index] || null;
        }
      });

      if (activeLabel) setActiveText(activeLabel, 0.18);

      if (selectedId === "All") {
        matches = items;
      } else {
        matches = items.filter((item) => {
          const filterText = item.querySelector('[attr-1="filter"]');
          return filterText && filterText.textContent.trim() === selectedId;
        });
      }
    } else {
      const checkedIds = [];

      filterInputs.forEach((input, index) => {
        const labelId = filterLabels[index]?.id;
        if (input.checked && labelId && labelId !== "All")
          checkedIds.push(labelId);
      });

      const allNonAllChecked = nonAllInputs.every((input) => input.checked);
      if (allInput) allInput.checked = allNonAllChecked;

      if (checkedIds.length === 0) matches = [];
      else if (allNonAllChecked) matches = items;
      else {
        matches = items.filter((item) => {
          const filterText = item.querySelector('[attr-1="filter"]');
          return (
            filterText && checkedIds.includes(filterText.textContent.trim())
          );
        });
      }
    }

    items.forEach((item) => {
      item.style.display = matches.indexOf(item) === -1 ? "none" : "block";
    });

    Flip.from(state, {
      duration: 1,
      scale: true,
      absolute: false,
      ease: "power1.inOut",
      onEnter: (elements) => {
        gsap.set(elements, { transformOrigin: "50% 100%" });
        gsap.fromTo(
          elements,
          { opacity: 0, height: "0%" },
          {
            opacity: 1,
            height: "auto",
            duration: 1.2,
            stagger: { from: "center", amount: 0.1 },
            ease: "expo.out",
          }
        );
      },
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          height: "0%",
          duration: 1.2,
          stagger: { from: "center", amount: 0.1 },
          ease: "expo.out",
        });
      },
    });
  }

  function initFlipBg($wrap) {
    const $btns = $wrap.find("[flip-btn]");
    const $bg = $wrap.find("[flip-bg]").first();
    if (!$btns.length || !$bg.length) return null;

    function moveToLabel(labelEl, instant) {
      const wrapRect = $wrap.get(0).getBoundingClientRect();
      const btnRect = labelEl.getBoundingClientRect();

      gsap.to($bg, {
        x: btnRect.left - wrapRect.left,
        y: btnRect.top - wrapRect.top,
        width: btnRect.width,
        height: btnRect.height,
        duration: instant ? 0 : 0.6,
        ease: "power3.out",
      });
    }

    const $checkedLabel = $btns.has("input[type='radio']:checked").first();
    const startLabel = ($checkedLabel.length ? $checkedLabel : $btns.eq(0)).get(
      0
    );

    gsap.set($bg, { x: 0, y: 0 });
    moveToLabel(startLabel, true);
    setActiveText(startLabel, 0);

    let resizeRaf = null;
    $(window)
      .off("resize.flipTabs")
      .on("resize.flipTabs", function () {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          const active =
            $btns.has("input[type='radio']:checked").first().get(0) ||
            startLabel;
          moveToLabel(active, true);
          setActiveText(active, 0);
        });
      });

    return moveToLabel;
  }

  const $wrap = $("[flip-wrap]").first();
  const moveBgTo = $wrap.length ? initFlipBg($wrap) : null;

  filterInputs.forEach((input, index) => {
    input.addEventListener("change", (e) => {
      if (!isRadio && filterLabels[index]?.id === "All") {
        const shouldCheck = e.target.checked;
        nonAllInputs.forEach((checkbox) => (checkbox.checked = shouldCheck));
      }

      if (isRadio && input.checked && moveBgTo) {
        const label = filterLabels[index];
        if (label) {
          moveBgTo(label, false);
          setActiveText(label, 0.18);
        }
      }

      updateFilters();
    });
  });

  updateFilters();
}


flipFilterTabs();
