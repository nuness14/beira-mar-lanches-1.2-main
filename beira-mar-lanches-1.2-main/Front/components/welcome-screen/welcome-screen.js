import { selectCategory } from "../../scripts/category-selector.js"

class WelcomeScreen {
  constructor() {
    this.welcomeScreen = document.getElementById("welcomeScreen")
    this.startButton = document.getElementById("startButton")
    this.init()
  }

  init() {
    this.startButton.addEventListener("click", () => {
      this.welcomeScreen.classList.add("hidden")
      setTimeout(() => {
        selectCategory("destaques")
      }, 300)
    })
  }
}
