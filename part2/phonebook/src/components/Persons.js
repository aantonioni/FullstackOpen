const Persons = ({persons, deleteNameHandler}) => {
  return (
    <>
      {persons.map(person => <Entry key={person.name} name={person.name} number={person.number} id={person.id} buttonEvent={deleteNameHandler}/>)}
    </>
  )
};

const Entry = ({name, number, id, buttonEvent}) => {
  return (
    <>
      <p>{name} {number} <button onClick={() => buttonEvent(id, name)}>delete</button></p>
    </>
  );
};

export default Persons;