import React from 'react';
import debounce from 'lodash.debounce';

export default ({ onSearchChange }) => {
  const handleSearchChange = debounce((event) => {
    onSearchChange(event.target.value);
  }, 350);

  return (
    <div className="p-1 w-full">
      <input
        id="search"
        type="text"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        placeholder="Search Movies"
        onChange={handleSearchChange}
      />
    </div>
  );
};
