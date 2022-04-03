function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.body;

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStop.setAttribute("disabled", "");

btnStart.addEventListener("click", () => {
  timerId = setInterval(() => {
    bodyEl.style = `background-color: ${getRandomHexColor()};`;
  }, 1000);
    btnStart.setAttribute("disabled", "");
    btnStop.removeAttribute("disabled");
});

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    btnStop.setAttribute("disabled", "");
    btnStart.removeAttribute("disabled");
});


