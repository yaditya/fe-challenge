import React from 'react';

const Dropdown = () => (
    <select name="select" className="dropdown__sort">
        <option value="value1">Sort by: Featured</option> 
        <option value="value2">Price</option>
        <option value="value3">Name</option>
    </select>
);

export default Dropdown;