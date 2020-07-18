var products = [
    { id: 1, name: 'Xbox', inventary: 10, price: 10000.5 },
    { id: 2, name: 'Play', inventary: 8, price: 15000.50 },
    { id: 3, name: 'Nintendo', inventary: 5, price: 799.30 },
    { id: 4, name: 'Manazana', inventary: 15, price: 4 },

];


function findProduct(productId) {
    return products[findProductKey(productId)];
};

function findProductKey(productId) {
    for (var key = 0; key < products.length; key++) {
        if (products[key].id == productId) {
            return key;
        }
    }
};

var List = Vue.extend({
    template: '#product-list',
    data: function() {
        return { products: products, searchKey: '' };
    },
    computed: {
        filteredProducts: function() {
            return this.products.filter(function(product) {
                return this.searchKey == '' || product.name.indexOf(this.searchKey) !== -1;
            }, this);
        }
    }
});

var Product = Vue.extend({
    template: '#product',
    data: function() {
        return { product: findProduct(this.$route.params.product_id) };
    }
});

var ProductEdit = Vue.extend({
    template: '#product-edit',
    data: function() {
        return { product: findProduct(this.$route.params.product_id) };
    },
    methods: {
        updateProduct: function() {
            var product = this.product;
            products[findProductKey(product.id)] = {
                id: product.id,
                name: product.name,
                inventary: product.inventary,
                price: product.price
            };
            router.push('/');
        }
    }
});

var ProductDelete = Vue.extend({
    template: '#product-delete',
    data: function() {
        return { product: findProduct(this.$route.params.product_id) };
    },
    methods: {
        deleteProduct: function() {
            products.splice(findProductKey(this.$route.params.product_id), 1);
            router.push('/');
        }
    }
});

var AddProduct = Vue.extend({
    template: '#add-product',
    data: function() {
        return { product: { name: '', inventary: '', price: '' } }
    },
    methods: {
        createProduct: function() {
            var product = this.product;
            products.push({
                id: Math.random().toString().split('.')[1],
                name: product.name,
                inventary: product.inventary,
                price: product.price
            });
            router.push('/');
        }
    }
});

var ShowComponent = Vue.extend({
    template: "#show-product"
});

var router = new VueRouter({
    routes: [
        { path: '/', component: List },
        { path: '/product/:product_id', component: Product, name: 'product' },
        { path: '/add-product', component: AddProduct },
        { path: '/show-product', component: ShowComponent },
        { path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit' },
        { path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete' }
    ]
});

new Vue({
    el: '#cart',
    data() {
        return {
            products: [
                { id: 1, name: 'Product One', price: 9.99 },
                { id: 2, name: 'Product Two', price: 12.99 },
                { id: 3, name: 'Product Three', price: 8.00 },
                { id: 4, name: 'Product Four', price: 10.50 },
                { id: 5, name: 'Nintendo', inventary: 5, price: 799.30 }
            ],
            cart: [],
            total: 0
        };
    },
    methods: {
        addItem(prod) {
            // Increment total price
            this.total += prod.price;

            let inCart = false;
            // Update quantity if the item is already in the cart
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === prod.id) {
                    inCart = true;
                    this.cart[i].quantity++;
                    break;
                }
            }
            // Add item if not already in the cart
            if (!inCart) {
                this.cart.push({
                    id: prod.id,
                    name: prod.name,
                    price: prod.price,
                    quantity: 1
                });
            }
        },
        add(item) {
            this.total += item.price;
            item.quantity++;
        },
        sub(item) {
            this.total -= item.price;
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters: {
        currency(price) {
            return '€' + price.toFixed(2);
        }
    }
});

app = new Vue({
    router: router
}).$mount('#app')