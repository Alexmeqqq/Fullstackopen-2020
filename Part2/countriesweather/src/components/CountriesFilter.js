import React from "react";

const CountriesFilter = (props) => {
    const {value,onChange} = props;
  return (
    <div>
      <label htmlFor="countries-search">find countries</label>
      <input
        type="text"
        id="countries-search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CountriesFilter;
