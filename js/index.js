//This JS code is for 3 main things:
// - compass
// - page switching
// - rework scrolling

const panels = document.querySelectorAll(".panel");
const needle = document.querySelector(".needle");
const compass = document.querySelector(".compass");
const buttons = document.querySelectorAll("[data-dir]");

let currentPanel = document.querySelector(".panel.active");
let currentDirection = "south";
let isAnimating = false;

let scrollAccumulator = 0;
const scrollThreshold = 400;   // distance needed before navigating
const travelDistance = 100;    // space between squares in %
const animationDuration = 1100;

// Rotation compass
const rotations = {
  north: -135,
  east: -45,
  south: 45,
  west: 135
};

// Direction moving

function setDirection(dir) {
  currentDirection = dir;
  needle.style.transform = `translate(-50%, -100%) rotate(${rotations[dir]}deg)`;
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    setDirection(btn.dataset.dir);
  });
});

function getOpposite(dir) {
  return {
    north: "south",
    south: "north",
    east: "west",
    west: "east"
  }[dir];
}

// Navigation

function navigate(direction) {
  if (isAnimating) return;

  const nextId = currentPanel.dataset[direction];
  if (!nextId) return;

  const nextPanel = document.getElementById(nextId);
  animateTransition(currentPanel, nextPanel, direction);

  currentPanel = nextPanel;
}

// Animations

function animateTransition(from, to, direction) {
  isAnimating = true;

  const opposite = getOpposite(direction);

  const transforms = {
    north: `translateY(-${travelDistance}%)`,
    south: `translateY(${travelDistance}%)`,
    east: `translateX(${travelDistance}%)`,
    west: `translateX(-${travelDistance}%)`
  };

  // To make sure no flip glitch
  panels.forEach(panel => {
    panel.style.transition = "none";
    panel.style.transform = "translate(0,0)";
  });

  requestAnimationFrame(() => {

    to.style.transform = transforms[direction];
    to.classList.add("active");

    requestAnimationFrame(() => {

      from.style.transition = `transform ${animationDuration}ms cubic-bezier(.77,0,.18,1)`;
      to.style.transition = `transform ${animationDuration}ms cubic-bezier(.77,0,.18,1)`;

      to.style.transform = "translate(0,0)";
      from.style.transform = transforms[opposite];
    });

  });

  setTimeout(() => {
    from.classList.remove("active");
    from.style.transition = "none";
    from.style.transform = "translate(0,0)";
    isAnimating = false;
  }, animationDuration);
}

// Scrolling in other contents is made possible

function isScrollable(element, deltaY) {
  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;
  const canScroll = overflowY === "auto" || overflowY === "scroll";

  if (!canScroll) return false;

  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight;

  if (deltaY > 0) return scrollTop + clientHeight < scrollHeight; 
  else return scrollTop > 0; 
}

//scrolling itself

window.addEventListener("wheel", (e) => {
  if (isAnimating) return;

  let el = e.target;
  while (el && el !== document.body) {
    if (isScrollable(el, e.deltaY)) return; 
    el = el.parentElement;
  }

  scrollAccumulator += e.deltaY;

  if (scrollAccumulator > scrollThreshold) {
    navigate(currentDirection);
    scrollAccumulator = 0;
  }

  if (scrollAccumulator < -scrollThreshold) {
    navigate(getOpposite(currentDirection));
    scrollAccumulator = 0;
  }
});

setDirection(currentDirection);



//phone scrolling (in testing)

let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (e) => {
  if (isAnimating) return;
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  if (isAnimating) return;
  touchEndY = e.touches[0].clientY;
});

const swipeThreshold = 50; 

window.addEventListener("touchend", (e) => {
  if (isAnimating) return;

  const deltaY = touchStartY - touchEndY;

  if (Math.abs(deltaY) > swipeThreshold) {
    if (deltaY > 0) {

      navigate(currentDirection);
    } else {

      navigate(getOpposite(currentDirection));
    }
  }

  touchStartY = 0;
  touchEndY = 0;
});