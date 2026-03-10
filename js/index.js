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

// General: Compass-map
  function openCompass() {
    document.getElementById('compass-popup').style.display = 'block';
    document.getElementById('compass').style.display = 'none';
  }

  function closeCompass() {
    document.getElementById('compass-popup').style.display = 'none';
    document.getElementById('compass').style.display = 'block';
  }

// Map of Realms: Map workabiltiy
let mapIsDragging = false;
let mapStart = { x: 0, y: 0 };
let mapPosition = { x: 0, y: 0 };
let mapScale = 0.2;

const mapContainer = document.getElementById("map-container");
const mapElement = document.getElementById("map");

let currentActiveItem = null; 

function mapUpdateTransform() {
    mapElement.style.transform = `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`;
}

function mapClampPosition() {
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const mapWidth = mapElement.offsetWidth * mapScale;
    const mapHeight = mapElement.offsetHeight * mapScale;

    const overflowX = Math.max(0, (mapWidth - containerWidth) / 2);
    const overflowY = Math.max(0, (mapHeight - containerHeight) / 2);

    mapPosition.x = Math.max(-overflowX, Math.min(overflowX, mapPosition.x));
    mapPosition.y = Math.max(-overflowY, Math.min(overflowY, mapPosition.y));
}

mapContainer.addEventListener("mousedown", (e) => {
    mapIsDragging = true;
    mapStart.x = e.clientX - mapPosition.x;
    mapStart.y = e.clientY - mapPosition.y;
    mapContainer.style.cursor = "grabbing";
    e.preventDefault();
});

window.addEventListener("mousemove", (e) => {
    if (!mapIsDragging) return;
    mapPosition.x = e.clientX - mapStart.x;
    mapPosition.y = e.clientY - mapStart.y;
    mapClampPosition();
    mapUpdateTransform();
});

window.addEventListener("mouseup", () => {
    mapIsDragging = false;
    mapContainer.style.cursor = "grab";
});

mapContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const zoomSpeed = 0.0005;
    const MIN_SCALE = 0.10;
    const MAX_SCALE = 1;
    mapScale += -e.deltaY * zoomSpeed;
    mapScale = Math.min(Math.max(mapScale, MIN_SCALE), MAX_SCALE);
    mapClampPosition();
    mapUpdateTransform();
}, { passive: false });

function mapCenterInit() {
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const mapWidth = mapElement.offsetWidth * mapScale;
    const mapHeight = mapElement.offsetHeight * mapScale;

    mapPosition.x = (containerWidth - mapWidth) / 2;
    mapPosition.y = (containerHeight - mapHeight) / 2;
    mapUpdateTransform();
}
mapCenterInit();

function openMap() {
    const mapPopup = document.getElementById("compass-popup");
    mapPopup.style.display = "block";
    mapElement.style.transform = `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(0)`;
    requestAnimationFrame(() => mapUpdateTransform());
}

document.querySelectorAll(".map-item").forEach(mapItem => {
    mapItem.addEventListener("click", () => {
        const targetId = mapItem.dataset.mapSection;
        const targetPanel = document.getElementById(targetId);
        if (!targetPanel) return;

        if (currentActiveItem) currentActiveItem.classList.remove("active");

        mapItem.classList.add("active");
        currentActiveItem = mapItem;

        if (targetPanel !== currentPanel && !isAnimating) {
            animateTransition(currentPanel, targetPanel, currentDirection);
            currentPanel = targetPanel;
        }
    });
});

function updateMapCurrent() {
    document.querySelectorAll(".map-item").forEach(item => {
        item.classList.remove("current");
        const targetId = item.dataset.mapSection;
        if (currentPanel.id === targetId) {
            item.classList.add("current");
        }
    });
}

document.querySelectorAll(".map-item").forEach(mapItem => {
    mapItem.addEventListener("click", () => {
        const targetId = mapItem.dataset.mapSection;
        const targetPanel = document.getElementById(targetId);
        if (!targetPanel) return;

        if (targetPanel !== currentPanel && !isAnimating) {
            animateTransition(currentPanel, targetPanel, currentDirection);
            currentPanel = targetPanel;
        }

        updateMapCurrent();
    });
});

updateMapCurrent();