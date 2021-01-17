import React, { useState, useEffect } from 'react';
import provider from './services/provider'
import ReactDOM from 'react-dom';
import FilterPerson from './components/FilterPerson';
import PersonForms from './components/PersonForms';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [show, setShow] = useState('');
  const [notify,setNotify] = useState('');
  const [errs,setErrs] = useState('')
  useEffect(() => {
    provider.getAll().then(res => setPersons(res.data))
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
    const arr = persons.filter((person) => person.name === newName.toLowerCase().trim());
    if (arr.length) {
      const personToUpdate = arr[0];
      const replace = window.confirm(`${personToUpdate.name} is already present,want to update`);
      if(replace){
        personToUpdate.number = newPhone;
        personToUpdate.name = newName;
        provider
          .update(personToUpdate).then((data) => {
            setPersons(persons.map((p) => {return p.id === data.id ? data : p}))
            setNotify(`updated ${personToUpdate.name}`); 
          })
          .catch((err) => {
            setPersons(persons.filter((p) => { return p.id !== personToUpdate.id}))
            setErrs(`${personToUpdate.name} is already deleted!!!`)
          })
         
      }
    }else
        {const phoneObject = { name: newName.trim(), number: newPhone };
        provider.create(phoneObject)
          .then(res => {
            setPersons(persons.concat(res.data))
          })
          setNotify(`created ${phoneObject.name}`)
        }
        setNewPhone('');
        setNewName('');
        setTimeout(() => {
          setNotify("");
        }, 2000);
        setTimeout(() => {
          setErrs("");
        },5000);
  };
  const handlePhoneChange = (event) => {
    event.preventDefault();
    setNewPhone(event.target.value);
  };
  const handleDeletion = (id,name) => {
    if(window.confirm(`Delete ${name}`)){
      provider.remove(id).then((res) => {
        const xyz = persons.filter((x) => x.id !== id)
        setPersons(xyz);
        setShow('');
      })
      .catch((err) => {
        setNotify(`Person is already deleted or a error occured!!!`)
      })
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      {errs ? <Notification message={errs} /> : null}
      {notify ?  <Notification message={notify} /> : null}
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
      <Persons show={show} personSearch={personSearch} persons={persons} onChange={handleDeletion} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
