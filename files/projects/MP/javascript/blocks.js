const players = document.querySelectorAll('.player');
const healthEls = document.querySelectorAll('.health'); // All health elements
const gameScreen = document.querySelector('.container'); // The container holding the game elements

// Set initial health for each player
players.forEach(player => {
    const healthEl = player.querySelector('.health');
    healthEl.textContent = '3'; // Set initial HP to 3 for each player
});

let countdown = 3;
const countdownEl = document.createElement('div');
countdownEl.classList.add('countdown');
countdownEl.textContent = countdown;
document.body.appendChild(countdownEl);

const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
        countdownEl.textContent = countdown;
    } else {
        countdownEl.textContent = 'GO!';
        setTimeout(() => countdownEl.remove(), 1000);

        // Start the game
        players.forEach((player, index) => {
            const playerNumber = index + 1;
            createBlockLoop(player, 'attack', playerNumber);
            createBlockLoop(player, 'defense', playerNumber);
        });

        clearInterval(countdownInterval);
    }
}, 1000);

function createBlockLoop(player, type, playerNumber) {
    const mainColumn = player.querySelector('.main-column');
    const presszone = player.querySelector(`.presszone.${type}`);
    const character = player.querySelector('.character');
    const health = player.querySelector('.health');
    const manaBar = player.querySelector(`.${type}-mana`);

    setInterval(() => {
        const block = document.createElement('div');
        block.classList.add('block', type, `player-${playerNumber}`);
        block.style.backgroundColor = type === 'attack' ? 'red' : 'blue';
        block.style.width = '20px';
        block.style.height = '20px';
        block.style.position = 'absolute';

        const presszoneRect = presszone.getBoundingClientRect();
        const presszoneWidth = presszoneRect.width;
        const randomOffset = Math.random() * (presszoneWidth - 20); // -20 to keep the block inside
        const blockLeft = presszoneRect.left + randomOffset;

        const startTop = type === 'attack' ? 0 : window.innerHeight;
        let pos = startTop;
        const speed = 2.2 + Math.random() * 1;

        block.style.left = `${blockLeft}px`;
        block.style.top = `${pos}px`;

        document.body.appendChild(block);

        function moveBlock() {
            if (!document.body.contains(block)) return;

            pos += type === 'attack' ? speed : -speed;
            block.style.top = `${pos}px`;

            const blockRect = block.getBoundingClientRect();
            const presszoneRect = presszone.getBoundingClientRect();
            const characterRect = character.getBoundingClientRect();
            const isPressed = window.activePresses?.[playerNumber]?.[type];

            if (
                blockRect.bottom > presszoneRect.top &&
                blockRect.top < presszoneRect.bottom &&
                isPressed
            ) {
                block.remove();
                updateMana(manaBar, playerNumber, type);
                return;
            }

            if (
                blockRect.bottom > characterRect.top &&
                blockRect.top < characterRect.bottom
            ) {
                block.remove();
                updateHealth(health);
                return;
            }

            if (pos < -40 || pos > window.innerHeight + 40) {
                block.remove();
                return;
            }

            requestAnimationFrame(moveBlock);
        }

        moveBlock();
    }, 900 + Math.random() * 1200);
}

function updateMana(manaEl, playerNumber, type) {
    manaValues[playerNumber][type] += 1;
    manaEl.dataset.value = manaValues[playerNumber][type];
    manaEl.textContent = `${manaValues[playerNumber][type]}`;
}

function updateHealth(healthEl) {
    let hp = parseInt(healthEl.textContent);

    // Check if the health is a valid number and is not NaN
    if (!isNaN(hp)) {
        hp = Math.max(0, hp - 1); // Deduct 1 HP but not below 0
    } else {
        hp = 0; // Set to 0 if invalid value
    }
    healthEl.textContent = hp;

    // Immediately display "Game Over" message if a player’s HP reaches 0
    if (hp === 0) {
        displayGameOverMessage(healthEl);
    }

    checkGameOver(); // Check for overall Game Over after updating HP
}

function displayGameOverMessage(healthEl) {
    const player = healthEl.closest('.player');
    const character = player.querySelector('.character');

    // Create the Game Over message
    const gameOverMessage = document.createElement('div');
    gameOverMessage.classList.add('message', 'game-over');
    gameOverMessage.textContent = 'Game Over';

    // Position the message over the character
    const characterRect = character.getBoundingClientRect();
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.left = `${characterRect.left + characterRect.width / 2 - gameOverMessage.offsetWidth / 2}px`;
    gameOverMessage.style.top = `${characterRect.top - 30}px`;  // 30px above the character
    document.body.appendChild(gameOverMessage);
}

function checkGameOver() {
    let remainingPlayers = 0;
    let winner = null;

    players.forEach((player, index) => {
        const healthEl = player.querySelector('.health');
        const hp = parseInt(healthEl.textContent);

        if (hp > 0) {
            remainingPlayers++;
            winner = index;  // The last player with HP will be the winner
        }
    });

    if (remainingPlayers === 1) {
        endGame(winner);
    }
}

function endGame(winnerIndex) {
    // Loop through each player to display the winner and game over messages
    players.forEach((player, index) => {
        const character = player.querySelector('.character');
        const healthEl = player.querySelector('.health');
        const hp = parseInt(healthEl.textContent);

        // Create a message element
        const message = document.createElement('div');
        message.classList.add('message');

        if (hp === 0) {
            message.textContent = 'Game Over';
            message.style.color = 'red';
        } else if (index === winnerIndex) {
            message.textContent = 'Winner!';
            message.style.color = 'green';
        }

        // Position the message over the character
        const characterRect = character.getBoundingClientRect();
        message.style.position = 'absolute';
        message.style.left = `${characterRect.left + characterRect.width / 2 - message.offsetWidth / 2}px`;
        message.style.top = `${characterRect.top - 30}px`;  // 30px above the character
        document.body.appendChild(message);
    });

    // Optionally, you can add a "Back to Home" button below the game area if needed
    const backButton = document.createElement('button');
    backButton.classList.add('back-to-home');
    backButton.textContent = 'Back to Home';
    backButton.onclick = () => {
        window.location.href = '/'; // Replace with the actual URL you want to navigate to
    };
    gameScreen.appendChild(backButton);
}
