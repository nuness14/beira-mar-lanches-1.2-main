import { productsSection } from "../../app.js"

class Header {
  constructor() {
    this.searchInput = document.getElementById("searchInput")
    this.init()
  }

  init() {
    this.searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      productsSection.filterProducts(searchTerm)
    })
  }
}
