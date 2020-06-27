import './App.css';

import React from 'react';
import { SoundToggle } from './components/soundToggle';

export const App = () => {
  // const [value, setValue] = useState(() => {
  //   const stickyValue =
  //     window.localStorage.getItem(key);
  //   return stickyValue !== null
  //     ? JSON.parse(stickyValue)
  //     : defaultValue;
  // });

  // useEffect(() => {
  //   window.localStorage.setItem(name, JSON.stringify(value));
  // }, [name, value]);

  return (
    <div className="App">
      <SoundToggle></SoundToggle>

    </div>
  );
};
