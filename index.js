// Packages
const express = require(`express`);
const hbs = require(`hbs`);
const app = express();
require(`dotenv`).config();
const mongoose = require(`mongoose`);
const Products = require(`./models/products`);
const Cart = require(`./models/cart`);
const Order = require(`./models/orders`);

// Middleware
app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }));
app.set(`views`, `views`);
app.set(`view engine`, `hbs`);

// MongoDB Connect
let db = `mongodb+srv://microsoftlive52:${process.env.DATABASE_PASS}@auteam-db.wsvrih7.mongodb.net/products_mshp?retryWrites=true&w=majority`;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log(`Connected to DB`);
    })
    .catch((error) => {
        console.log((error));
    });

// Port
const port = process.env.PORT || 3000;

// Listening server...
app.listen(port, () => {
    console.log(`Server is listening... http://localhost:${port}`);
    console.log(`Connecting to DataBase. Please wait...`); 
});

// Routes
app.get(`/`, (req, res) => {
    Products
        .find()
        .then((products) => {
            res.render(`index`, { products: products });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get(`/payed`, (req, res) => {
    Products
        .find()
        .then((products) => {
            res.render(`index`, { products: products, payed: true });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get(`/admin`, (req, res) => {
    Order
        .find()
        .then((orders) => {
            res.render(`admin`, {
                orders: orders
            });
        })
        .catch((error) => console.log(error));
});

app.post(`/pay`, (req, res) => {
    const { id } = req.body;

    if(id) {
       Products
            .find()
            .then((products) => {
                const title = products[id].title;
                const price = products[id].price;

                const post = new Cart({ id, title, price });

                post
                    .save()
                    .then((result) => res.redirect(`/payed`))
                    .catch((error) => console.log(error));
            })
            .catch((error) => {
                console.log(error);
            })
    }
});

app.get(`/cart`, (req, res) => {
    Cart
        .find()
        .then((carts) => {
            Order
                .find()
                .then((orders) => {
                    res.render(`cart`, { carts: carts, orders: orders });
                })
        })
        .catch((error) => {
            console.log(error);
        })
});

app.get(`/edit`, (req, res) => {
    Products
        .find()
        .then((products) => {
            res.render(`edit`, { products: products });
        })
        .catch((error) => {
            console.log(error);
        });
})

app.post(`/cleancart`, (req, res) => {
    Cart
        .deleteMany({})
        .then((result) => res.redirect(`/cart`))
        .catch((error) => console.log(error));
});

app.post(`/add`, (req, res) => {
    const { title, description, price, urlToImage } = req.body;

    if(title || description || price || urlToImage) {
        const product = new Products({ title, description, price, urlToImage});

        product
            .save()
            .then((result) => {
                res.redirect(`/admin`);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

app.post(`/delete`, (req, res) => {
    const { id } = req.body;

    if (id) {
        Products
            .find()
            .then((products) => {
                const title = products[id].title;

                Products
                    .deleteOne({ title: title })
                    .then((result) => res.render(`edit`, { products: products, deleted: true }))
                    .catch((error) => console.log(error));
            })
    }
});

app.post(`/order`, (req, res) => {
    const order = new Order(req.body);

    order
        .save()
        .then((result) => {
            Cart
                .deleteMany({})
                .then((result) => res.redirect(`/cart`))
                .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
});

app.post(`/status`, (req, res) => {
    const { status_change, id } = req.body;
    const status_wait = false;

    if (id) {
        Order
            .find()
            .then((orders) => {
                const status = orders[id].status;
                const status_waiting = orders[id].status_waiting;

                Order
                    .updateOne({
                        status: status,
                        status_waiting: status_waiting
                    }, {
                        $set: {
                            status: status_change,
                            status_waiting: status_wait
                        }
                    })
                    .then((result) => {
                        res.redirect(`/admin`);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }
});

// CRM Project by tynkovdev 