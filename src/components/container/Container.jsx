import React from 'react';

function Container({ children }) {
  return (
    <div className='w-full max-w-screen mx-auto px-4 sm:px-6'>
      {children}
    </div>
  );
}

export default Container;