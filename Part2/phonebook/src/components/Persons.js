import React from 'react';

const Persons = (props) => {
  const { show, personSearch, persons,onChange } = props;
  return (
    <div>
      <h2>Numbers</h2>
      <h3>
        {show
          ? personSearch.map((it) => (
              <div key={it.id}>
                {it.name}:{it.number}
                <button onClick={() => onChange(it.id,it.name)}>Delete</button>
              </div>
            ))
          : persons.map((person) => (
              <div key={person.id}>
                {person.name}:{person.number}
                <button onClick={() => onChange(person.id,person.name)}>Delete</button>
              </div>
            ))}
      </h3>
     
    </div>
  );
};

export default Persons;
