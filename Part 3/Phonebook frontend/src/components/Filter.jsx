const Filter = ({ query, updateQuery }) => {
  return (
    <div>
      filter shown with <input value={query} onChange={updateQuery} />
    </div>
  );
};

export default Filter;
