//later 

  // let i = 0;
  // const speedTxt = 50;

  // function typeText() {
  //   if (i < txt.length) {
  //     document.getElementById("t").innerHTML += txt.charAt(i);
  //     i++;
  //     setTimeout(typeText, speedTxt);
  //   }
  // }


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
    top: "3.5vw",
    right: "17vw"
  },
  {
    element: "#context",
    text: "The arrow points to whichever direction you're about to go.",
    top: "3.5vw",
    right: "17vw"
  },
  {
    element: "#context",
    text: "There are 4 directions on each page: East, West, North and South.",
    top: "3.5vw",
    right: "17vw"
  },
  {
    element: "#context",
    text: "Left-clicking an object changes the direction you're going. When doing so, the arrow points to that direction.",
    top: "3.5vw",
    right: "17vw"
  },
  {
    element: "#context",
    text: "Finally, to move in the desired direction, use your mouse wheel as you usually would.",
    top: "3.5vw",
    right: "17vw"
  },
  {
    element: "#context",
    text: "If you wish to return to the previous page you were on, you can do so by simply scrolling back.",
    top: "3.5vw",
    right: "17vw"
  },
  {
    element: "#context",
    text: "Keep in mind, scrolling back to the previous page only works if you didn't change the direction youre going.",
    top: "3.5vw",
    right: "17vw"
  },
  // -------
  {
    element: "#context",
    text: "If you can't find a path, you can search for them through the patchnotes.",
    bottom: "30%",
    right: "5vw"
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

  // Homepage: insights
  function openInsights() {
    document.getElementById('insights-popup').style.display = 'block';
    document.getElementById('insights').style.display = 'none';
  }

  function closeInsights() {
    document.getElementById('insights-popup').style.display = 'none';
    document.getElementById('insights').style.display = 'block';
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

  // Information page: Monologue
  let index = 0;
  let charIndex = 0;
  let isTyping = false;
  const speedTxt = 40;

  const texts = [
    "Well honestly said, I am not sure.",
    "I just woke up, and boom, I suddenly ended up here.",
    "I am wearing a completely different attire than I normally do.",
    "Who am I you ask?. To be honest, I am way too tired to explain. I just woke up, as I already said.",
    "Just open my personal file, it is really hard to miss. Yes, that giant button to your right. Don't be shy.",
    "Take your time reading it through. It's not like I am hanging above a cliff or something....",
    "Read it yet? Good. In the meantime, I've been planning a way out.",
    "My plan you ask? Well, I was going through my new attire you see, and I found this blade in my left pocket -|////////>",
    "And after some thinking, I thought of this. Alright, are you ready for the master plan?",
    "Okay so, since I've never been here before, and I am not certain what can happen...",
    "I'm just going to cut the rope and pray for the best. Please, please, no need to clap."
  ];

  const textBox = document.getElementById("textBox");

  function typeWriter(text) {
    if (charIndex < text.length) {
      textBox.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(() => typeWriter(text), speedTxt);
    } else {
      isTyping = false;
    }
  }

  function nextText() {
    if (isTyping) return; // prevent skipping mid-typing

    index++;

    if (index < texts.length) {
      textBox.textContent = "";
      charIndex = 0;
      isTyping = true;
      typeWriter(texts[index]);
    } else {
      textBox.textContent =
        "I'll cut the rope when you scroll down. I'm ready for it, your call.";
    }
  }

// Information page: buttons switching
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

//Information page: Wind/gust
const gustContainer = document.getElementById('gust-container');

// Generate the wind
function generateCurve(size) {
  const pattern = [];
  for (let i = 0; i < size; i++) {
    const spaces = i < size / 2 ? size / 2 - i : i - size / 2;
    pattern.push(' '.repeat(spaces) + '(');
  }
  return pattern.join('\n');
}

function createGust() {
  const gust = document.createElement('div');
  gust.className = 'gust';

  // Random curve size
  const size = 10 + Math.floor(Math.random() * 15); 

  // Random font size
  const fontSize = 10 + Math.random() * 25;
  gust.style.fontSize = `${fontSize}px`;

  const actualHeight = fontSize * size * 0.7;

  // Random position
  const startY = Math.random() * (gustContainer.clientHeight - actualHeight);
  gust.style.top = `${startY}px`;

  // Right
  gust.style.left = `${gustContainer.clientWidth + 50}px`;

  gust.textContent = generateCurve(size);
  gustContainer.appendChild(gust);

  // Random speed
  const speed = 0.4 + Math.random() * 1;

  function animate() {
    const currentX = parseFloat(gust.style.left);
    if (currentX < -300) {
      gust.remove();
      return;
    }
    gust.style.left = `${currentX - speed}px`;
    requestAnimationFrame(animate);
  }

  animate();
}

// The amount
setInterval(createGust, 9000); 


//internship Building
const mangaPanels = document.querySelectorAll(".manga-panel");
const mangarestartBtn = document.getElementById("mangarestartBtn");

let mangaIndex = 0;
let mangaTimeoutId = null;
let mangaRunning = false;

function showNextPanel() {
  if (mangaIndex >= mangaPanels.length) {
    mangaRunning = false;
    return;
  }

  mangaRunning = true;

  const mangaPanel = mangaPanels[mangaIndex];

  const mangaDuration = mangaPanel.dataset.duration || 800;
  const mangaDelay = mangaPanel.dataset.delay || 1000;

  mangaPanel.style.transition =
    `opacity ${mangaDuration}ms ease, transform ${mangaDuration}ms ease`;

  mangaPanel.classList.add("show");

  mangaIndex++;

  mangaTimeoutId = setTimeout(showNextPanel, parseInt(mangaDelay));
}

function restartManga() {
  clearTimeout(mangaTimeoutId);

  mangaPanels.forEach(panel => {
    panel.classList.remove("show");
  });

  mangaIndex = 0;
  mangaRunning = false;

  void document.body.offsetHeight;

  mangaTimeoutId = setTimeout(showNextPanel, 9000);
}

window.addEventListener("load", showNextPanel);

if (mangarestartBtn) {
  mangarestartBtn.addEventListener("click", restartManga);
}







  // beforeRealm 4: choice shown
const nodes = {
    start: {
        text: "Boss: Welcome and come in, Lucas<br>Bouwmeester.<br><br> 'One firm handshake later..' <br><br>Boss: Thank you for attending this<br>interview.<br><br>Boss: Could you....",
        choices: [
            { key: "1", label: "tell me more about yourself?", next: "introduce" },
            { key: "2", label: "tell me what you want to learn from the internship", next: "internship" },
        ]
    },
    
    introduce: {
      text: "Boss: Could you tell me more about<br>yourself?<br><br>Me: Yes ofcourse. I studied coding<br>for the past 2.5 years and have<br>developed multiple skills in<br>programming and processing.<br><br>I have specialized myself in<br>frontend development, and that is<br>why I think I would be a great fit<br>for your company.",
      choices: [
            { key: "1", label: "What languages do you know?", next: "codingLanguages" },
            { key: "2", label: "What do you mean with processing?", next: "processing" },
            { key: "3", label: "How are you planning to add value?", next: "value" },
      ]
    },

    codingLanguages: {
      text: "Boss: What coding languages do you<br>know?<br><br>Me: I have a good amount of experienc<br>with HTML, CSS, SCSS (SASS). I use<br>JavaScript often, but I'm low skilled<br>at it.<br><br>Me: I also know the basics of PHP and<br>MySQL. Right now I am learning React.",
      choices: [
        { key: "1", label: "How do you ensure responsiveness?", next: "responsiveness" },
        { key: "2", label: "Return to last page", next: "introduce" },
        
      ]
    },

    processing: {
      text: "Boss: What do you mean with processing?<br><br>Me: With processing I mean that outside<br>of coding I know multiple other skills<br>that are relevant for projects too.<br><br>For example, I can design wireframes,<br>work with Trello and I know how<br>scrumming works.",
      choices: [ 
          { key: "1", label: "Return to last page", next: "introduce" },
      ]
    },
    

};

// Function render node
function renderNode(nodeKey) {
    const node = nodes[nodeKey];
    const storyDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");

    storyDiv.innerHTML = node.text;

    choicesDiv.innerHTML = "";

    node.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";

    const keyBox = document.createElement("span");
    keyBox.className = "choice-key";
    keyBox.textContent = choice.key;

    const label = document.createElement("span");
    label.className = "choice-label";
    label.textContent = choice.label;

    btn.appendChild(keyBox);
    btn.appendChild(label);

    btn.onclick = () => renderNode(choice.next);

    choicesDiv.appendChild(btn);
});
}

// Restart story function
function restartStory() {
    renderNode("start");
}

// Start story 
renderNode("start");

document.querySelectorAll('.project-trigger').forEach(trigger => {
  trigger.addEventListener('click', function () {

    document.querySelectorAll('.project-popup').forEach(popup => {
      popup.style.display = 'none';
    });

    const popupId = this.getAttribute('data-popup');
    document.getElementById(popupId).style.display = 'block';
  });
});