import React, { useState } from 'react';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';

export function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="container">
      <InputShortener setInputValue={setInputValue} />
      <BackgroundAnimate />
      <LinkResult inputValue={inputValue} />
    </div>
  );
}
