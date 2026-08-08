const Contact = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

const Persons = ({ contactsToRender }) => {
  return contactsToRender.map((person) => (
    <Contact key={person.id} name={person.name} number={person.number} />
  ));
};

export default Persons;
