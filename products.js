const productsDom = document.querySelector(".product");
const url = "https://course-api.com/javascript-store-single-product";
  
  const fetchProducts = async()=>{
    try {
      productsDom.innerHTML = `<h4" class="product-loading">loading</h4>`;
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      console.log(id);
      const response = await fetch(`${url}?id=${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      productsDom.innerHTML = `<p class='error'>there  is an error</p> `;
    }
  };
  const displayProducts = (product)=>{
  const{company,colors,description,name:title,price,image}= product.fields;
  const{url:img}=image[0];
  // console.log(company);
  document.title =title.toUpperCase();
  // colors
  const colorList = colors.map((color)=>{
    return `<span class="product-color" style="background:${color}" ></span>`;
  }).join(" ");

  productsDom.innerHTML = ` <div class="product-wrapper">
         <img src="${img}" class="img"alt="${title}">
          <div class="product-info">
            <h3>${title}</h3>
            <h5>${company}</h5>
            <span>$${price/100}</span>
            <div class="colors">
               ${colorList}
            </div>
            <p>${description}</p>
            <button class="btn">add to cart</button>
        </div>
          </div>`;
   
  }
  const start = async()=>{
    const data = await fetchProducts();
    displayProducts(data);
  };
  start();