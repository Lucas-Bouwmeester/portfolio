const soundDoor = document.getElementById("soundDoor");

document.querySelectorAll(".door").forEach(door => {
  door.addEventListener("click", () => {
    soundDoor.currentTime = 0;
    soundDoor.play();
  });
});

const soundelevatorButton = document.getElementById("soundelevatorButton");

document.querySelectorAll(".elevatorButton").forEach(elevatorButton => {
  elevatorButton.addEventListener("click", () => {
    soundelevatorButton.currentTime = 0;
    soundelevatorButton.play();
  });
});