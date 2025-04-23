class SuccessModal {
  constructor() {
    this.successModal = document.getElementById("successModal")
    this.closeSuccess = document.getElementById("closeSuccess")
    this.init()
  }

  init() {
    this.closeSuccess.addEventListener("click", () => {
      this.successModal.classList.remove("active")
    })
  }

  show() {
    this.successModal.classList.add("active")
  }
}
