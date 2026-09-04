require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

const { PersonModel } = require("./mongo.js");

app.use(express.json());

app.use(express.static("dist"));
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/info", async (req, res) => {
  const phoneBookText = `Phonebook has info for ${await PersonModel.estimatedDocumentCount()} people`;
  const date = new Date().toString();
  res.send(`<p>${phoneBookText}</p><p>${date}</p>`);
});

app.get("/api/persons", (req, res) => {
  PersonModel.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PersonModel.findById(id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  PersonModel.findByIdAndDelete(id)
    .then((person) => {
      console.log(person);
      if (!person) return res.status(404).json({ error: "Oops something went wrong, the data does not exist on the server" });
      res.status(204).end();
    })
    .catch(next);
});

app.post("/api/persons", (req, res, next) => {
  if (!req.body.name || !req.body.number) return res.status(400).json({ error: "Opps something went wrong, check validity of name or number entered" });
  const body = req.body;

  PersonModel.create(body)
    .then((newPerson) =>
      newPerson.save().then((person) => {
        res.json(person);
      }),
    )
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  if (!req.body.name || !req.body.number) return res.status(400).json({ error: "Opps something went wrong, check validity of name or number entered" });
  const { name, number } = req.body;
  const id = req.params.id;

  PersonModel.findById(id)
    .then((person) => {
      if (!person) return res.status(404);
      person.name = name;
      person.number = number;
      person
        .save()
        .then((updatedPerson) => res.json(updatedPerson))
        .catch(next);
    })
    .catch(next);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Unknown Endpoint" });
});

app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(500).json({ error: "Opps something went wrong, the ID queried does not match any data on the server" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is currently running " + PORT);
});
