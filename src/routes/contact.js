const express = require("express");
const sendEmail = require("../smtp/mail");

const contactRouter = express.Router();

contactRouter.get("", (req, res) => {
    res.render("contact", { title: "Contact", layout: "./layouts/cardless-layout" });
});

contactRouter.post("", (req, res) => {
    // TODO: Retrieve form field data and store the values into variables.
});

module.exports = contactRouter;
