const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// GET, POST, PUT, DELETE

server.get("/accounts", (req, res) => {
  db.select("*")
    .from("Accounts")
    .then((accounts) => res.status(200).json({ accounts }).end())
    .catch((error) => res.status(500).json({ error }));
});

server.post("/accounts", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account)
    .returning("id")
    .then((idn) => res.status(201).json({ inserted: idn }).end())
    .catch((error) => res.status(500).json({ error }));
});

module.exports = server;
