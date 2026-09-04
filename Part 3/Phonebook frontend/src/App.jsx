import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import updatePhoneBook from "./services/updatePhoneBook.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [personsFound, setPersonsFound] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState({
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  });

  useEffect(() => {
    updatePhoneBook.getContacts().then((data) => setPersons(data));
  }, []);

  const updateNotification = (updater) => {
    updater();
    setTimeout(() => {
      setMessage(null);
      setStyle({ ...style, color: "green" });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameFound = persons.find((person) => person.name.toLowerCase() === name.toLowerCase());

    if (nameFound) {
      if (nameFound.number !== number) {
        const shouldUpdateOccur = window.confirm(`${name} is already added to phonebook, replace the old number with the new one?`);
        if (shouldUpdateOccur) updateCreatedPerson(nameFound);
      } else alert(`${name} with phone number: ${number} already exists`);
    } else createPerson();
  };

  const updateCreatedPerson = (nameFound) => {
    const currentContactUpdated = { ...nameFound, number: number };

    updatePhoneBook
      .updateContact(currentContactUpdated.id, currentContactUpdated)
      .then((data) => {
        setPersons(persons.map((person) => (person.id === data.id ? data : person)));
        updateNotification(() => {
          setMessage(`The phone number of ${data.name} was changed`);
        });
      })
      .catch((error) => {
        console.log("I RUN");
        updateNotification(() => {
          setStyle({ ...style, color: "red" });
          setMessage(error.response.data.error);
        });
      });
  };

  const createPerson = () => {
    const copynameObj = {
      name: name,
      number: number,
    };

    updatePhoneBook
      .addContact(copynameObj)
      .then((data) => {
        setPersons([...persons, data]);
        setName("");
        setNumber("");
        updateNotification(() => {
          setMessage(`Added ${data.name}`);
        });
      })
      .catch((error) => {
        updateNotification(() => {
          setStyle({ ...style, color: "red" });
          setMessage(error.response.data.error);
        });
      });
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
    const deletedPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${deletedPerson.name}?`)) deleteCreatedPerson(deletedPerson);
  };

  const deleteCreatedPerson = (deletedPerson) => {
    updatePhoneBook
      .deleteContact(deletedPerson.id)
      .then(() => {
        setPersons(persons.filter((person) => deletedPerson.name !== person.name));
      })
      .catch((error) => {
        updateNotification(() => {
          setStyle({ ...style, color: "red" });
          setMessage(error.response.data.error);
          setPersons(persons.filter((person) => deletedPerson.name !== person.name));
        });
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification style={style} message={message} />
      <Filter query={query} updateQuery={updateQuery} />
      <h1>add a new</h1>
      <PersonForm handleSubmit={handleSubmit} updateName={updateName} updateNumber={updateNumber} name={name} number={number} />
      <h1>Numbers</h1>
      <Persons contactsToRender={contactsToRender} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
