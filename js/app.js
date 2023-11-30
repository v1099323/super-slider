(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const nextBtn = document.querySelector(".main-block__slider-button");
    const slider = document.querySelector(".main-block__slider");
    const slides = document.querySelectorAll(".main-block__slide");
    let index = 0;
    slider.classList.add("initialized");
    setTimeout((() => {
        slider.classList.remove("initialized");
    }), 200);
    function setActiveSlide() {
        slides.forEach(((slide, i) => {
            const isActive = i === index;
            const isAfterActive = i === (index - 1 + slides.length) % slides.length;
            const isBeforeActive = i === (index + 1) % slides.length;
            slide.classList.toggle("main-block__slide--active", isActive);
            slide.classList.toggle("main-block__slide--after-active", isAfterActive);
            slide.classList.toggle("main-block__slide--before-active", isBeforeActive);
        }));
    }
    function nextSlide() {
        if (!nextBtn.classList.contains("disabled")) {
            nextBtn.classList.add("disabled");
            setTimeout((() => {
                nextBtn.classList.remove("disabled");
            }), 2500);
            index = (index + 1) % slides.length;
            setActiveSlide();
        }
    }
    setActiveSlide();
    nextBtn.addEventListener("click", nextSlide);
    const {autoplay, autoplayInterval} = slider.dataset;
    if (autoplay === "true") setInterval(nextSlide, parseInt(autoplayInterval) || 5e3);
    window.addEventListener("load", (function() {
        const slides = document.querySelectorAll(".main-block__slide");
        slides.forEach((slide => {
            const imgSrc = slide.querySelector(".main-block__image").getAttribute("src");
            const createCircle = size => {
                const circleElem = document.createElement("div");
                circleElem.classList.add("main-block__circle", "main-block__circle--bg", `main-block__circle--${size}`);
                const imgElem = document.createElement("img");
                imgElem.classList.add("main-block__image");
                imgElem.setAttribute("src", imgSrc);
                imgElem.setAttribute("alt", "image");
                circleElem.appendChild(imgElem);
                return circleElem;
            };
            slide.appendChild(createCircle("large"));
            slide.appendChild(createCircle("small"));
        }));
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
    menuInit();
})();