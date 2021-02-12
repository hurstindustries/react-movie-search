import React from 'react';

export default ({ text = 'Loading...' }) => {
  return <div className="text-gray-500 p-2 text-center block"> {text}</div>;
};
