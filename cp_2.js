const API_URL = "https://www.course-api.com/javascript-store-products"

function fetchProductsThen() {
  fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    })
    .then((data) => {
      data.forEach((product) => {
        const name = product?.fields?.name || product?.name || "Unnamed product"
        console.log(name)
      })
    })
    .catch((error) => {
      console.error(`An error occurred: ${error.message}`)
    })
}

fetchProductsThen()

//Step 4 below
async function fetchProductsAsync() {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const products = await res.json()
    displayProducts(products)
  } catch (error) {
    handleError(error)
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-container")
  if (!container) return

  container.innerHTML = ""

  products.slice(0, 5).forEach((product) => {
    const name = product?.fields?.name || "Unnamed product"
    const image = product?.fields?.image?.[0]?.url || ""
    const priceValue = product?.fields?.price
    const price = typeof priceValue === "number" ? `$${(priceValue / 100).toFixed(2)}` : "—"

    const card = document.createElement("div")
    card.className = "product-card"

    const img = document.createElement("img")
    img.src = image
    img.alt = name
    img.className = "product-image"

    const title = document.createElement("h3")
    title.textContent = name
    title.className = "product-name"

    const priceTag = document.createElement("p")
    priceTag.textContent = price
    priceTag.className = "product-price"

    card.appendChild(img)
    card.appendChild(title)
    card.appendChild(priceTag)
    container.appendChild(card)
  })
}
function handleError(error) {
  console.error(`An error occurred: ${error?.message || error}`)
  const container = document.getElementById("product-container")
  if (container) {
    container.innerHTML = '<div style="grid-column:1/-1;padding:1rem;border:1px solid #fecaca;background:#fee2e2;color:#991b1b;border-radius:12px;"><strong>Oops!</strong> We couldn’t load products. Please refresh the page.</div>'
  }
}
fetchProductsAsync()