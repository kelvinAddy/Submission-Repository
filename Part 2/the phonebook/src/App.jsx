import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [personsFound, setPersonsFound] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameExists = persons
      .map(({ name }) => name.toLowerCase())
      .includes(name.toLocaleLowerCase());

    if (nameExists) {
      alert(`${name} is already added to the phonebook`);
    } else {
      const copynameObj = {
        name: name,
        number: number,
        id: persons.length + 1,
      };
      setPersons([...persons, copynameObj]);
      setName("");
      setNumber("");
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleSearch = (e) => {
    const matches = persons.filter((person) =>
      person.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase()),
    );
    setQuery(e.target.value);
    setPersonsFound(matches);
  };
  let contactsToRender = !query ? [...persons] : [...personsFound];
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={query} handleSearch={handleSearch} />
      <h1>add a new</h1>
      <PersonForm
        handleSubmit={handleSubmit}
        updateName={updateName}
        updateNumber={updateNumber}
        name={name}
        number={number}
      />
      <h1>Numbers</h1>
      <Persons contactsToRender={contactsToRender} />
    </div>
  );
};

export default App;
