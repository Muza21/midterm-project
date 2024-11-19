const STARS_NUM = 5;
const productsList = [];
const productsListContainer = document.querySelector(".products_list");
const paginationNav = document.querySelector(".pagination_nav");
const pageSizeDisplay = document.querySelector("#display");
const itemsNumber = document.querySelector(".items_number");
const gridViewButton = document.querySelector(".grid_view");
const listViewButton = document.querySelector(".list_view");
let pageSize = pageSizeDisplay.value;
let currentPage = 1;
let gridView = true; // if false it's a list view

gridViewButton.addEventListener("click", (e) => {
  gridView = true;
  productsListContainer.classList.add("grid");
  productsListContainer.classList.remove("list");
  gridViewButton.classList.add("active");
  listViewButton.classList.remove("active");
  drawData(productsList);
});

listViewButton.addEventListener("click", (e) => {
  gridView = false;
  productsListContainer.classList.add("list");
  productsListContainer.classList.remove("grid");
  listViewButton.classList.add("active");
  gridViewButton.classList.remove("active");
  drawData(productsList);
});

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

pageSizeDisplay.addEventListener("change", (e) => {
  pageSize = e.target.value;
  drawData(productsList);
});

function drawStars(rating) {
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
  const fullStarsNum = Math.round(rating / 2);
  let starsDrawing = "";
  for (let i = 0; i < fullStarsNum; i++) {
    starsDrawing += yellowStar;
  }
  for (let i = fullStarsNum; i < STARS_NUM; i++) {
    starsDrawing += greyStar;
  }
  return starsDrawing;
}

function calcDiscountPrice(price, discount) {
  return (price - (price * discount) / 100).toFixed(2);
}

function drawProductItem(product, price, stars) {
  const productItem = document.createElement("div");
  if (gridView) {
    productItem.className = "product_card";
    productItem.innerHTML = `
        <div class="image_container">
          <img src="${product.thumbnail}" alt="product image" />
        </div>
        <div class="product_details">
          <div>
            <div class="price">
              <span class="current_price">${price}</span
              ><span class="old_price">${product.price}</span>
            </div>
            <div class="rate">
              ${stars}
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
  } else {
    productItem.className = "product_card list";
    productItem.innerHTML = `
        <div class="product_left">
          <div class="image_container">
            <img src="${product.thumbnail}" alt="product image" />
          </div>
          <div class="product_details">
            <div class="product_name">
              ${product.title}
            </div>
            <div>
              <div class="price">
                <span class="current_price">${price}</span
                ><span class="old_price">${product.price}</span>
              </div>
              <div class="product_review">
                <div class="rate">
                  ${stars}
                  <span class="rate_score">${product.rating}</span>
                </div>
                <div class="circle"></div>
                <div class="orders">${product.minimumOrderQuantity} ${
      product.minimumOrderQuantity === 1 ? "order" : "orders"
    }</div>
                <div class="circle"></div>
                <div class="shipping">${product.shippingInformation}</div>
              </div>
            </div>
            <div class="product_description">
              ${product.description}
            </div>
            <a href="#">View details</a>
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
    `;
  }
  return productItem;
}

function drawData(products) {
  productsListContainer.innerHTML = "";
  itemsNumber.innerText = "";
  itemsNumber.innerText = products.length;
  for (let i = (currentPage - 1) * pageSize; i < pageSize * currentPage; i++) {
    if (!products[i]) {
      break;
    }
    const product = products[i];
    const starsRating = drawStars(product.rating);
    const discountedPrice = calcDiscountPrice(
      product.price,
      product.discountPercentage
    );
    const productItem = drawProductItem(product, discountedPrice, starsRating);
    productsListContainer.appendChild(productItem);
  }
  drawPagination(products);
}

function onPaginationClick(nextPage) {
  currentPage = nextPage;
  drawData(productsList);
}

function drawArrowPaginationButton(iconName, leftArrow, firstOrLastPage) {
  const button = document.createElement("button");
  if (currentPage === firstOrLastPage) {
    iconName = `${iconName}-grey.svg`;
  } else {
    iconName = `${iconName}.svg`;
    button.addEventListener("click", (e) => {
      currentPage = leftArrow ? currentPage - 1 : currentPage + 1;
      drawData(productsList);
    });
  }
  button.innerHTML = `
    <img src="./assets/icons/${iconName}" />
  `;
  return button;
}

function drawPagination(products) {
  paginationNav.innerHTML = "";
  const pageCount = Math.ceil(products.length / pageSize);
  const buttonPrev = drawArrowPaginationButton("chevron-left", true, 1);
  paginationNav.appendChild(buttonPrev);
  for (let i = 0; i < pageCount; i++) {
    const button = document.createElement("button");
    button.innerText = i + 1;
    if (currentPage === i + 1) {
      button.classList.add("active");
    }
    button.addEventListener("click", (e) => {
      e.preventDefault();
      onPaginationClick(i + 1);
    });
    paginationNav.appendChild(button);
  }
  const buttonNext = drawArrowPaginationButton(
    "chevron-right",
    false,
    pageCount
  );
  paginationNav.appendChild(buttonNext);
}
