import React from 'react';

const FilterPerson = (props) => {
  const { show, handleSearch } = props;
  return (
    <div>
      <p>Filter with</p>
      <input value={show} onChange={handleSearch} />
    </div>
  );
};

export default FilterPerson;
