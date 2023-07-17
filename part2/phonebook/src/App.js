import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, []);

  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLocaleLowerCase()));

  const displayNotification = (text, type) => {
    setNotification({ text: text, type: type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            displayNotification(`Updated number for ${updatedPerson.name}`, 'notification');
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== updatedPerson.id));
            displayNotification(`Information of ${newName} has already been removed from the server`, 'error');
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    };

    personsService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        displayNotification(`Added ${newPerson.name}`, 'notification');
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          displayNotification(`Deleted ${name}`, 'notification');
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter name={searchName} eventHandler={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        addNameHandler={addName} 
        nameChangeHandler={handleNameChange} 
        numberChangeHandler={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteNameHandler={handleDelete} />
    </div>
  );
};

export default App;