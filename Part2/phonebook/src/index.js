import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import FilterPerson from './components/FilterPerson';
import PersonForms from './components/PersonForms';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [show, setShow] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data));
  }, []);
  const handleSearch = (event) => {
    setShow(event.target.value);
  };
  const personSearch = show
    ? persons.filter((person) => person.name.toLowerCase().search(show) !== -1)
    : persons;
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleAddition = (event) => {
    event.preventDefault();
    const arr = persons.filter((person) => person.name === newName.trim());
    if (arr.length) {
      alert(`${newName} is already added`);
      return;
    }
    setPersons([...persons, { name: newName.trim(), phone: newPhone }]);
    setNewPhone('');
    setNewName('');
  };
  const handlePhoneChange = (event) => {
    event.preventDefault();
    setNewPhone(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <FilterPerson show={show} handleSearch={handleSearch} />
      </div>
      <PersonForms
        handleAddition={handleAddition}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <Persons show={show} personSearch={personSearch} persons={persons} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
