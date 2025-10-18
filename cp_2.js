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

