// Homepage: Context

//texts inout
const steps = [
  {
    element: "#context",
    text: "Before you continue, there are a few things you should know about.",
    top: "25vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "In this portfolio there are multiple different realms.",
    top: "25vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "Each realm has its own unique information on themes it represents.",
    top: "25vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "I will give you a bit of insight beforehand.",
    top: "13vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "Right now you are located in the neverRealm.",
    top: "13vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "neverRealm is an extremely cold place with very little signs of life.",
    top: "13vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "You will be following a version of me throughout the realms.",
    top: "13vw",
    left: "40vw"
  },
  {
    element: "#context",
    text: "Travelling through realms is indicated here.",
    top: "20px",
    right: "140px"
  },
  {
    element: "#context",
    text: "The arrow points to whichever direction you're about to go.",
    top: "20px",
    right: "140px"
  },
  {
    element: "#context",
    text: "There are 4 directions on each page: East, West, North and South.",
    top: "20px",
    right: "140px"
  },
  {
    element: "#context",
    text: "Left-clicking an object changes the direction you're going. When doing so, the arrow points to that direction.",
    top: "20px",
    right: "140px"
  },
  {
    element: "#context",
    text: "Finally, to move in the desired direction, use your mouse wheel as you usually would.",
    top: "20px",
    right: "140px"
  },
  {
    element: "#context",
    text: "If you wish to return to the previous page you were on, you can do so by simply scrolling back.",
    top: "20px",
    right: "140px"
  },
  {
    element: "#context",
    text: "Keep in mind, scrolling back to the previous page only works if you didn't change the direction youre going.",
    top: "20px",
    right: "140px"
  },
  // -------
  {
    element: "#context",
    text: "If you can't find a path, you can search for them through the patchnotes.",
    bottom: "200px",
    right: "60px"
  },
  {
    element: "#context",
    text: "DO NOT REFRESH THE PAGE! YOU WILL BE SENT BACK TO THE HOMEPAGE!!!",
    top: "20px",
    left: "40vw"
  },
  {
    element: "#context",
    text: "That would be everything you should know beforehand. Have fun!",
    top: "25vw",
    left: "40vw"
  },
  
  
  
  
];

let currentStep = 0;

//STart showing the steps 
function startContext() {
  document.getElementById("context-overlay").style.display = "block";
  document.body.style.overflow = "hidden";
  showStep();
}

//shows the text with a step
function showStep() {
  const step = steps[currentStep];
  const element = document.querySelector(step.element);
  const rect = element.getBoundingClientRect();

  const spotlight = document.getElementById("spotlight");
  const textBoxContext = document.getElementById("textBoxContext");

  // Move text
  spotlight.style.top = rect.top + "px";
  spotlight.style.left = rect.left + "px";
  spotlight.style.width = rect.width + "px";
  spotlight.style.height = rect.height + "px";

  // Reset the position
  textBoxContext.style.top = "";
  textBoxContext.style.bottom = "";
  textBoxContext.style.left = "";
  textBoxContext.style.right = "";

  // Manual positioning
  if (step.top) textBoxContext.style.top = step.top;
  if (step.bottom) textBoxContext.style.bottom = step.bottom;
  if (step.left) textBoxContext.style.left = step.left;
  if (step.right) textBoxContext.style.right = step.right;

  document.getElementById("textContent").innerText = step.text;
}

// Start next step
function nextStep() {
  currentStep++;

  if (currentStep >= steps.length) {
    endContext();
  } else {
    showStep();
  }
}

// Ends all the texts
function endContext() {
  document.getElementById("context-overlay").style.display = "none";
  document.body.style.overflow = "auto";
  currentStep = 0;
}



// Homepage: patchnotes
  function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('patchnotes').style.display = 'none';
  }

  function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('patchnotes').style.display = 'block';
  }

  // Homepage: credit
  function openCredit() {
    document.getElementById('credit-popup').style.display = 'block';
    document.getElementById('credit').style.display = 'none';
  }

  function closeCredit() {
    document.getElementById('credit-popup').style.display = 'none';
    document.getElementById('credit').style.display = 'block';
  }

  //Homepage: falling snow
  const container = document.getElementById("snow");

  function createFlake() {
      const flake = document.createElement("div");
      flake.classList.add("flake");
      flake.textContent = "*";

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // randomize snow location
      flake.style.left = Math.random() * containerWidth + "px";

      // random size
      const size = Math.random() * 20 + 10;
      flake.style.fontSize = size + "px";

      // random speed
      const duration = Math.random() * 5 + 5;
      flake.style.animationDuration = duration + "s";

      // falling distance some as page height
      flake.style.animationName = "fall";
      flake.style.setProperty("--fall-distance", containerHeight + "px");

      container.appendChild(flake);

      setTimeout(() => {
        flake.remove();
      }, duration * 1000);
}

setInterval(createFlake, 200);

  // Situation page: Monologue
  let index = 0;

  const texts = [
    "Well honestly said, I am not sure.",
    "I just woke up, and boom, I suddenly ended up here.",
    "I am wearing a completely different attire than I normally do.",
    "Who am I you ask?. To be honest, I am way too tired to explain. I just woke up, as I already said.",
    "Just open my personal file, it is really hard to miss. Yes, that giant  button to your right. Don't be shy.",
    "Take your time reading it through. It's not like I am hanging above a cliff or something....",
    "Read it yet? Good. In the meantime, I've been planning a way out.",
    "My plan you ask? Well, I was going through my new attire you see, and I found this blade in my left pocket -|////////>",
    "And after some thinking, I thought of this. Alright, are you ready for the master plan?",
    "Okay so, since I've never been here before, and I am not certain what can happen...",
    "I'm just going to cut the rope and pray for the best. Please, please, no need to clap."
  ];

  function nextText() {
    index++;
    if (index < texts.length) {
      document.getElementById("textBox").textContent = texts[index];
    } else {
      document.getElementById("textBox").textContent = "I'll cut the rope when you scroll down. I'm ready for it, your call.";
    }
  }

// Situation page: buttons switching
const panel = document.getElementById('aboutPanel');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
  panel.classList.toggle('active');
});

function showInfo(id) {
    const sections = document.querySelectorAll('.info');
    sections.forEach(section => {
      section.style.display = 'none';
    });

    document.getElementById(id).style.display = 'block';
  }
