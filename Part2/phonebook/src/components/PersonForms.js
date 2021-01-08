import React from 'react';

const PersonForms = (props) => {
  const {
    handleAddition,
    handleNameChange,
    handlePhoneChange,
    newName,
    newPhone,
  } = props;
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={handleAddition}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number:
          <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForms;
