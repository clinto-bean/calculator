// Variables
const screen = document.getElementById("screen")
const log = document.getElementsByClassName("log")[0]
const content = document.getElementsByClassName("screen-content")[0]
const logo = document.getElementsByClassName("logo")[0]
const buttons = document.getElementsByClassName("calc-button")
const back = document.getElementById("back")
const light = document.getElementById("light")
const power = document.getElementById("power-button")
const clear = document.getElementById("clear")
const equal = document.getElementById("equals")
const decimal = document.getElementById("decimal")
let decimalAdded = false
let powerState

// Validation for Later
function validation(element) {
  return function () {
    console.log("ur mom")
  }
}

// Startup Function
const startup = () => {
  powerState = true
  screen.classList.remove("off", "dimmed")
  screen.classList.add("lit", "on")
  logo.style.opacity = "1"
  content.style.opacity = "1"
  log.innerHTML = "On"
  log.style.color = "var(--clr-neutral-500)"
  content.textContent = "0"
}

const shutdown = () => {
  screen.classList.add("off")
  screen.classList.remove("lit", "on")
  content.style.opacity = "0"
  logo.style.opacity = "0"
  log.innerHTML = "Off"
  log.style.color = "var(--clr-neutral-100)"
  clearAll()
  powerState = false
}

// Functional Buttons
const powerOn = () => {
  if (screen.classList.contains("off")) {
    startup()
  } else {
    shutdown()
  }
}

const powerSaver = () => {
  if (screen.classList.contains("dimmed")) {
    screen.classList.remove("dimmed")
    screen.classList.add("lit")
    log.style.color = "var(--clr-neutral-500)"
  } else {
    screen.classList.add("dimmed")
    screen.classList.remove("lit")
    log.style.color = "var(--clr-neutral-100)"
  }
}

const clearAll = () => {
  content.textContent = "0"
  decimalAdded = false
}

// Inputs

const removeNum = () => {
  let num = content.textContent

  if (num.length === 1 || num === "0") {
    num = "0"
    decimalAdded = false
  } else {
    const lastChar = num.slice(-1)
    if (lastChar === ".") {
      decimalAdded = false
    }
    num = num.slice(0, -1)
  }

  content.textContent = num
}

if (content.textContent === "") {
  content.textContent = "0"
}

for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i]
  button.onclick = () => {
    if (button.textContent === ".") {
      addDecimal()
    }
    if (button.textContent === "=") {
      calcResult()
    } else {
      // Check if the current content is "0" and replace it
      if (content.textContent === "0") {
        content.textContent = button.textContent
      } else {
        // Append the pressed number to the existing content
        content.textContent += button.textContent
      }
    }
  }
}

const addDecimal = () => {
  if (!decimalAdded) {
    content.textContent += "."
    decimalAdded = true
  }
}

const calcResult = () => {
  result = eval(content.textContent)
  content.textContent = result
}

// Styling Functions

if (!powerState) {
  content.textContent = ""
}

// Calls

power.onclick = powerOn
light.onclick = powerSaver
clear.onclick = clearAll
back.onclick = removeNum
equal.onclick = calcResult
decimal.onclick = addDecimal
