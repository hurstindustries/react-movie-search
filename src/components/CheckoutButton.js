import React from 'react';

export default ({ count = 0, onCheckout }) => {
  return (
    <button
      class="fixed bottom-0 z-10 w-full h-12 px-6 text-green-100 transition-colors duration-150 bg-green-500  focus:shadow-outline hover:bg-green-700"
      onClick={onCheckout}>
      Checkout
      {count > 0 && <span className="ml-2">({count})</span>}
    </button>
  );
};
