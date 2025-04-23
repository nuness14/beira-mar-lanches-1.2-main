import { productsSection } from "../../app"
import { formatCategoryName } from "../../utils/helpers"

class Sidebar {
  constructor() {
    this.navItems = document.querySelectorAll(".nav-item")
    this.init()
  }

  init() {
    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
        const category = item.dataset.category
        this.selectCategory(category)
      })
    })
  }

  selectCategory(category) {
    this.navItems.forEach((item) => {
      item.classList.remove("active")
    })
    document.querySelector(`[data-category="${category}"]`).classList.add("active")

    productsSection.setTitle(formatCategoryName(category))
    productsSection.displayProducts(category)
  }
}
