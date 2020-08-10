const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// GET, POST, PUT, DELETE

server.get("/accounts", (req, res) => {
  db.select("*")
    .from("Accounts")
    .then((accounts) => res.status(200).json({ accounts }).end())
    .catch((error) => res.status(500).json({ error }).end());
});

server.post("/accounts", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account)
    .returning("id")
    .then((idn) => res.status(201).json({ inserted: idn }).end())
    .catch((error) => res.status(500).json({ error }).end());
});

server.put("/accounts/:id", (req, res) => {
  const accountId = req.params.id;

  db("accounts")
    .where({ id: accountId })
    .update(req.body)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "Change successful!" }).end();
      } else {
        res.status(404).json({ message: "Account not found!" }).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error }).end();
    });
});

server.delete("/accounts/:id", (req, res) => {
  const accountId = req.params.id;

  db("accounts")
    .where({ id: accountId })
    .del()
    .then((count) => {
      if (count) {
        res.status(200).json({ message: "Removal successful!" }).end();
      } else {
        res.status(404).json({ message: "Account not found!" }).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error }).end();
    });
});

module.exports = server;
