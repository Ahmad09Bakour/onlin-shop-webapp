window.OnlineShope = {

    apiUrl: "http://localhost:8085",

    addProductToCart: function (productId) {

        let data = {
            customerId: 2, // we're setting the ID directly from here, not dynamically by the service from the DB, because
            // we only want to test it now... and i will work on it properly in the future to set all the functions correctly
            productIds: [productId]
        };

        $.ajax({
            url: OnlineShope.apiUrl + "/carts",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log('added product to cart');
            window.location.replace("/onlin-shop-webapp/cart.html"); // here is the url that we're telling the
            // service to redirect us once the button is pressed
        });


    },

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
                            <a class="add_to_cart_button" data-quantity="1" data-product_id="${product.id}" rel="nofollow" href="#">Add to cart</a>
                        </div>                                        <!--We're no redirecting the user anywhere from here, here we only put #-->
                    </div>                                           <!--but we redirect the user once the button is pressed in the function line 20-->
                </div>`
    },

    bindEvents: function () {
        $('#products-container').delegate('.add_to_cart_button', 'click', function () {
            event.preventDefault();
            let id = $(this).data("product_id");
            OnlineShope.addProductToCart(id);

        })
    }
};

OnlineShope.getProducts();
OnlineShope.bindEvents();