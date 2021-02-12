import React, { useState } from 'react';

export default ({ movie, selected, onSelect }) => {
  const handleSelectClick = () => {
    if (typeof onSelect === 'function') {
      onSelect(movie);
    }
  };

  const classes = [
    'relative flex shadow-md items-center justify-center m-2 h-100 rounded-lg overflow-hidden ring-4 ring-green-500 ring-opacity-0',
  ];
  if (selected) {
    classes.push('ring-opacity-100');
  }

  return (
    <div className={classes.join(' ')} onClick={handleSelectClick}>
      {selected && (
        <div className="absolute top z-10 w-16 h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="fill-current text-green-600">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      )}
      <figure className="relative max-w-xs cursor-pointer h-full">
        <img className=" shadow-xl hover:shadow-2xl" src={movie.Poster} />
        <figcaption className="absolute bottom-0 z-0 p-3 text-xl text-white px-4 bg-black bg-opacity-90 w-full">
          <div>
            <h1>{movie.Title}</h1>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};
