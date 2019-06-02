window.OnlineShope = {

    apiUrl: "http://localhost:8085",

    getProducts: function () {

        $.ajax({
            url: OnlineShope.apiUrl + "/products",
            method: "GET"
        }).done(function (response) {
            OnlineShope.displayProducts(response.content);   // very important JSON.parse
        });


    },
    displayProducts: function(products){
        var productsContainer =  '';

        products.forEach(product => productsContainer += OnlineShope.getProductDiv(product));  // foreach method in js

        $('#products-container').html(productsContainer) //

    },

    getProductDiv: function(product){    // we got it from the html sheet from <tbody> and we add the $ etc


        return ` <div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-2.jpg" alt="">
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins>
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_id="${product.id}" rel="nofollow" href="/shop.html">Add to cart</a>
                        </div>                       
                    </div>
                </div>`
    },
};

OnlineShope.getProducts();