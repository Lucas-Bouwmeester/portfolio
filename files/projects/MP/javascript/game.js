window.activePresses = {
    1: { attack: false, defense: false },
    2: { attack: false, defense: false },
    3: { attack: false, defense: false }
};

const stunnedPlayers = {}; // Nieuw: per speler/type stun bijhouden

const keyMap = {
    w: { player: 1, action: "attack" },
    s: { player: 1, action: "defense" },
    a: { player: 1, action: "attack-power" },
    d: { player: 1, action: "defense-power" },
    x: { player: 1, action: "select" },

    u: { player: 2, action: "attack" },
    j: { player: 2, action: "defense" },
    h: { player: 2, action: "attack-power" },
    k: { player: 2, action: "defense-power" },
    m: { player: 2, action: "select" },

    arrowup:    { player: 3, action: "attack" },
    arrowdown:  { player: 3, action: "defense" },
    arrowleft:  { player: 3, action: "attack-power" },
    arrowright: { player: 3, action: "defense-power" },
    enter:      { player: 3, action: "select" }
};

let gamePaused = false;
let pauseOverlay = null;

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    
    if (key === "escape") {
        togglePause();
        return;
    }

    const entry = keyMap[key];
    if (!entry) return;

    if (entry.action === "attack" || entry.action === "defense") {
        const playerNumber = entry.player;
        const type = entry.action;

        if (!stunnedPlayers[playerNumber]) stunnedPlayers[playerNumber] = {};

        // Check: is deze specifieke actie gestunned?
        if (stunnedPlayers[playerNumber][type]) return;

        if (!window.activePresses) window.activePresses = {};
        if (!window.activePresses[playerNumber]) window.activePresses[playerNumber] = {};

        const player = document.querySelector(`.player:nth-child(${playerNumber})`);
        const presszone = player.querySelector(`.presszone.${type}`);

        let hit = false;
        const blocks = document.querySelectorAll(`.block.${type}.player-${playerNumber}`);
        const presszoneRect = presszone.getBoundingClientRect();

        blocks.forEach(block => {
            const blockRect = block.getBoundingClientRect();
            if (
                blockRect.bottom > presszoneRect.top &&
                blockRect.top < presszoneRect.bottom &&
                blockRect.left < presszoneRect.right &&
                blockRect.right > presszoneRect.left
            ) {
                hit = true;
            }
        });

        if (!hit) {
            console.log(`Player ${playerNumber} missed ${type}!`);
            stunPlayer(playerNumber, type, presszone);
        } else {
            console.log(`Player ${playerNumber} successful ${type} press!`);
        }

        window.activePresses[playerNumber][type] = true; // Activeer alleen als niet gestunned
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    const entry = keyMap[key];
    if (!entry) return;

    if (entry.action === "attack" || entry.action === "defense") {
        window.activePresses[entry.player][entry.action] = false;
    }
});

function stunPlayer(playerNumber, type, presszone) {
    console.log(`Player ${playerNumber} ${type} is stunned!`);
    
    if (!stunnedPlayers[playerNumber]) stunnedPlayers[playerNumber] = {};
    stunnedPlayers[playerNumber][type] = true;

    presszone.style.opacity = '0.5';
    presszone.classList.add('stun-shake');

    setTimeout(() => {
        stunnedPlayers[playerNumber][type] = false;
        presszone.style.opacity = '1';
        presszone.classList.remove('stun-shake');
    }, 1000); // stun duurt 1.5 sec
}

