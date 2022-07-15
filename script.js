'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // scroll to
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   right: s1coords.top + window.pageYOffset,
  //   behaviour: 'smooth',
  // });

  // more modern way - take element you want to scroll to > then scroll into view > set object behaviour to smooth
  section1.scrollIntoView({behavior: 'smooth'});
})

// Page Navigation - Event Delegation
// 1. Add event listen to common parent element
// 2. Determine what element originated the event.
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching Strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth' });
  }
});

// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Attaching event listener on the common parent
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard Clause
  if(!clicked) return;
  // Remove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  // Activate Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

// Menu Fade Animation
const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
})

// Sticky Navigation

const initialCoords = section1.getBoundingClientRect();

// Scroll event at specific location on the page isn't very efficient as scroll is always calculating and can clog performance (especially on older mobile).
// Look at Intersection Observer API
window.addEventListener('scroll', function (e) {
  if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
})

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('slider__btn--left');
const btnRight = document.querySelector('slider__btn--right');

let currentSlide = 0;

slider.style.overflow = 'visible';

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

btnRight.addEventListener('click', function() {
  currentSlide++;
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i - currentSlide}%)`));
})
