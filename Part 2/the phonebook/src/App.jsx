import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import updatePhoneBook from "./services/updatePhoneBook.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [personsFound, setPersonsFound] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    (async () => {
      const data = await updatePhoneBook.getContacts();
      setPersons(data);
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameExists = persons.find((person) => person.name.toLowerCase() === name.toLowerCase());

    if (nameExists) {
      const numberOfUser = nameExists.number;
      if (numberOfUser !== number) {
        if (window.confirm(`${name} is already added to phonebook, replace the old number with the new one?`)) {
          (async () => {
            const currentContactUpdated = { ...nameExists, number: number };
            const data = await updatePhoneBook.updateContact(currentContactUpdated.id, currentContactUpdated);
            setPersons(persons.map((person) => (person.id === data.id ? data : person)));
          })();
        }
      } else alert(`${name} with phone number: ${number} already exists`);
    } else {
      const copynameObj = {
        name: name,
        number: number,
      };
      (async () => {
        const data = await updatePhoneBook.addContact(copynameObj);
        setPersons([...persons, data]);
        setName("");
        setNumber("");
      })();
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateNumber = (e) => {
    setNumber(e.target.value);
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
    handleSearch(e);
  };

  const handleSearch = (e) => {
    const matches = persons.filter((person) => person.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    setPersonsFound(matches);
  };

  let contactsToRender = !query ? [...persons] : [...personsFound];

  const handleDelete = (id) => {
    if (window.confirm("Delete " + persons.find((person) => person.id === id).name + " ?")) {
      (async () => {
        const data = await updatePhoneBook.deleteContact(id);
        setPersons(persons.filter((person) => person.id !== data.id));
      })();
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={query} updateQuery={updateQuery} />
      <h1>add a new</h1>
      <PersonForm handleSubmit={handleSubmit} updateName={updateName} updateNumber={updateNumber} name={name} number={number} />
      <h1>Numbers</h1>
      <Persons contactsToRender={contactsToRender} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
