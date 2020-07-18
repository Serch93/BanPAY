new Vue({
    el: '#app',
    data() {
        return {
            products: [
                { id: 1, name: 'Xbox', inventary: 10, price: 10000.5 },
                { id: 2, name: 'Play', inventary: 8, price: 15000.50 },
                { id: 3, name: 'Nintendo', inventary: 5, price: 799.30 },
                { id: 4, name: 'Manazana', inventary: 15, price: 4 },
            ],
            cart: [],
            total: 0
        };
    },
    methods: {
        addItem(prod) {
            this.total += prod.price;

            let inCart = false;

            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === prod.id) {
                    inCart = true;
                    this.cart[i].quantity++;
                    break;
                }
            }

            if (!inCart) {
                this.cart.push({
                    id: prod.id,
                    name: prod.name,
                    price: prod.price,
                    inventary: prod.inventary,
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
            return '$' + price.toFixed(2);
        }
    }
});