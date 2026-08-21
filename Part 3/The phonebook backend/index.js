const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3001;

app.use(express.json());

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Server is currently running");
});

app.get("/api/persons", (req, res) => {
  res.json(phoneBook);
});

app.get("/info", (req, res) => {
  const phoneBookText = `Phonebook has info for ${phoneBook.length} people`;
  const date = new Date().toString();
  res.send(`<p>${phoneBookText}</p><p>${date}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = phoneBook.find((contact) => contact.id === id);

  if (!contact) {
    return res.status(404).json({ error: "Something went wrong" });
  }
  res.json(contact);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = phoneBook.find((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({ error: "Something went wrong" });
  }
  phoneBook = phoneBook.filter((contact) => contact.id !== id);
  res.status(204).end();
});

const generateId = () => {
  return Math.trunc(Math.random() * (phoneBook.length * 5000));
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!Object.hasOwn(body, "name") || !Object.hasOwn(body, "number")) {
    return res.status(401).json({ error: "Name or number is required" });
  }

  if (phoneBook.find((contact) => contact.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(401).json({ error: "Sorry, every name must be unique" });
  }
  const newBody = { ...body, id: generateId() };
  phoneBook = [...phoneBook, newBody];
  res.json(newBody);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Error was encountered" });
});

app.listen(PORT, () => {
  console.log("Server is currently running");
});
