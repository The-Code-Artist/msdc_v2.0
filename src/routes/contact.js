const express = require("express");

const contactRouter = express.Router();

contactRouter.get("", (req, res) => {
    res.render("contact", { title: "Contact", layout: "./layouts/cardless-layout" });
});

module.exports = contactRouter;
