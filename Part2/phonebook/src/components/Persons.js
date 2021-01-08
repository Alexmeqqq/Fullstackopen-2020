import React from 'react';

const Persons = (props) => {
  const { show, personSearch, persons } = props;
  return (
    <div>
      <h2>Numbers</h2>
      <h3>
        {show
          ? personSearch.map((it) => (
              <div key={it.name}>
                {it.name}:{it.number}
              </div>
            ))
          : persons.map((person) => (
              <div key={person.name}>
                {person.name}:{person.number}
              </div>
            ))}
      </h3>
    </div>
  );
};

export default Persons;
