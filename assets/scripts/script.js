const productsList = [];

const fetchData = async function () {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category/smartphones"
    );
    const data = await response.json();
    productsList.push(...data.products);
    drawData(productsList);
  } catch (e) {
    console.error(`Error: ${e}`);
  }
};

fetchData();

const productsListContainer =
  document.getElementsByClassName("products_list")[0];

function drawData(data) {
  const yellowStar = `
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12.0553L12.944 15L11.632 9.45L16 5.71579L10.248 5.23421L8 0L5.752 5.23421L0 5.71579L4.368 9.45L3.056 15L8 12.0553Z" fill="#FF9017"/>
  </svg>
  `;
  const greyStar = `
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12.0553L12.944 15L11.632 9.45L16 5.71579L10.248 5.23421L8 0L5.752 5.23421L0 5.71579L4.368 9.45L3.056 15L8 12.0553Z" fill="#D5CDC5"/>
  </svg>
  `;
  productsListContainer.innerHTML = "";
  data.forEach((product) => {
    const fullStarsNum = Math.round(product.rating / 2);
    let starsRating = "";
    for (let i = 0; i < fullStarsNum; i++) {
      starsRating += yellowStar;
    }
    for (let i = fullStarsNum; i < 5; i++) {
      starsRating += greyStar;
    }
    let discountedPrice = (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);
    const productItem = document.createElement("div");
    productItem.className = "product_card";
    productItem.innerHTML = `
        <div class="image_container">
          <img src="${product.thumbnail}" alt="product image" />
        </div>
        <div class="product_details">
          <div>
            <div class="price">
              <span class="current_price">${discountedPrice}</span
              ><span class="old_price">${product.price}</span>
            </div>
            <div class="rate">
              ${starsRating}
              <span class="rate_score">${product.rating}</span>
            </div>
          </div>
          <div class="favourite">
            <button>
              <img
                src="./assets/icons/favorite_border.svg"
                alt="heart logo add to favourite"
              />
            </button>
          </div>
        </div>
        <div class="product_name">${product.title}</div>
    `;
    productsListContainer.appendChild(productItem);
  });
}
