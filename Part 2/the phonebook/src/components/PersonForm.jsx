const PersonForm = ({
  handleSubmit,
  updateName,
  updateNumber,
  number,
  name,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input value={name} onChange={updateName} />
      </div>
      <div>
        number:
        <input value={number} onChange={updateNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
