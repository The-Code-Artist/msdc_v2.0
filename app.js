require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;

// Middleware configuration.
app.use(layouts);
app.use(express.static("public"));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/js", express.static(`${__dirname}/public/js`));

// Templating engine configuration.
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.set("layout", `${__dirname}/src/views/layouts/layout`);

// Routes.
app.get('', (req, res) => {
    res.render("index");
});

app.get("/services", (req, res) => {
    res.render("services");
});

// Run the HTTP server.
app.listen(port, () => { console.info(`App is running and listening at port: ${port} & DB_USER: ${process.env.DB_USER}`) });
