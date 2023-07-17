const Filter = ({name, eventHandler}) => {
  return (
    <div>
      Filter by name: <input 
        value={name}
        onChange={eventHandler}
      />
    </div>
  );
};

export default Filter;