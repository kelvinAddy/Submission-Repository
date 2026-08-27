const Contact = ({ name, number, handleDelete }) => {
  return (
    <p>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </p>
  );
};

const Persons = ({ contactsToRender, handleDelete }) => {
  return contactsToRender.length === 0
    ? "No contacts found"
    : contactsToRender.map((person) => (
        <Contact
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.id)}
        />
      ));
};

export default Persons;
