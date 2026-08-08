import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [personsFound, setPersonsFound] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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
