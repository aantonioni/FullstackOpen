const PersonForm = ({newName, newNumber, addNameHandler, nameChangeHandler, numberChangeHandler}) => {
  return (
    <form onSubmit={addNameHandler}>
      <div>
        name: <input 
          value={newName}
          onChange={nameChangeHandler}
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={numberChangeHandler}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;