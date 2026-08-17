const $header = document.querySelector(".l-header");
const $overlay = document.querySelector("#overlay");
const $navbar = document.querySelector("[data-navbar]");
const $navToggler = document.querySelector("[data-nav-toggler]");
const $firstNavLink = document.querySelector(".c-nav__link");

const openNavbar = () => {
    $navbar.classList.add("active");
    $overlay.classList.add("active");
    $navToggler.setAttribute("aria-expanded", "true");
    $navbar.removeAttribute("inert");
    document.body.classList.add("is-locked");

    // Move focus to first nav item after drawer becomes visible
    setTimeout(() => $firstNavLink?.focus(), 50);
};

const closeNavbar = () => {
    $navbar.classList.remove("active");
    $overlay.classList.remove("active");
    $navToggler.setAttribute("aria-expanded", "false");
    $navbar.setAttribute("inert", "");
    document.body.classList.remove("is-locked");

    // Return focus back to the toggle trigger
    $navToggler.focus();
};

const toggleNavbar = () => {
    const isActive = $navbar.classList.contains("active");
    if (isActive) {
        closeNavbar();
    } else {
        openNavbar();
    }
};

$navToggler.addEventListener("click", toggleNavbar);
$overlay.addEventListener("click", closeNavbar);

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && $navbar.classList.contains("active")) {
        closeNavbar();
    }
});

const mediaQuery = window.matchMedia('(min-width: 48em)');

const handleNavPlacement = (e) => {
    const isDesktop = e.matches || mediaQuery.matches; 

    if (isDesktop) {
        $navbar.removeAttribute("inert");
    } else {
        if (!$navbar.classList.contains("active")) {
            $navbar.setAttribute("inert", "");
        }
    }
};

mediaQuery.addEventListener('change', handleNavPlacement);
handleNavPlacement(mediaQuery);

document.addEventListener("click", (e) => {
    const isNavOpen = $navbar.classList.contains("active");
    const clickedInsideNav = $navbar.contains(e.target);
    const clickedToggler = $navToggler.contains(e.target);

    if (isNavOpen && !clickedInsideNav && !clickedToggler) {
        closeNavbar();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $navbar.classList.contains("active")) {
        closeNavbar();
    }
});

window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
        $header.classList.add("is-scrolled");
    } else {
        $header.classList.remove("is-scrolled");
    }
});

// Slider Logic
const slidesData = [
    {
        title: "Discover innovative ways to decorate",
        desc: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
        alt: "Modern white chairs with wooden legs around a dining table with a potted bonsai tree",
        desktopImg: "images/desktop-image-hero-1.jpg",
        mobileImg: "images/mobile-image-hero-1.jpg"
    },
    {
        title: "We are all available all across the globe",
        desc: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
        alt: "Three contemporary minimalist plastic dining chairs in yellow, light green, and off-white",
        desktopImg: "images/desktop-image-hero-2.jpg",
        mobileImg: "images/mobile-image-hero-2.jpg"
    },
    {
        title: "Manufactured with the best materials",
        desc: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
        alt: "Black metal folding chair with a cushioned seat against a dark gray background",
        desktopImg: "images/desktop-image-hero-3.jpg",
        mobileImg: "images/mobile-image-hero-3.jpg"
    }
];

const titleEl = document.querySelector('.c-hero__title');
const descEl = document.querySelector('.c-hero__desc');
const pictureSource = document.querySelector('c-hero__img-container source');
const pictureImg = document.querySelector('.c-hero__img');
const prevBtn = document.querySelector('.c-slider-button.prev');
const nextBtn = document.querySelector('.c-slider-button.next');

function updateSlide(index) {
    const data = slidesData[index];

    titleEl.textContent = data.title;
    descEl.textContent = data.desc;
    pictureImg.alt = data.alt;

    pictureImg.style.opacity = '0';

    // 2. Wait 400ms for the fade-out to visually finish (matches your CSS transition time)
    setTimeout(() => {
        // Change the sources while the image is hidden
        if (pictureSource) {
            pictureSource.srcset = data.desktopImg;
        }
        pictureImg.src = data.mobileImg;

        // 3. Wait for the new image to fully load, then fade it back in
        pictureImg.onload = () => {
            pictureImg.style.opacity = '1';
            // Clean up the event so it doesn't trigger again later
            pictureImg.onload = null; 
        };

        // 4. Safety check: If the image was already cached in the browser, 
        // the 'onload' event might have fired instantly, so we check `complete`.
        if (pictureImg.complete) {
            pictureImg.style.opacity = '1';
            pictureImg.onload = null;
        }
    }, 200); 
}

let currentSlide = 0;
updateSlide(currentSlide);

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slidesData.length;
    updateSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
    updateSlide(currentSlide);
});