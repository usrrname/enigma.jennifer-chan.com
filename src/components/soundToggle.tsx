import React, { useState } from 'react';

import { ToggleButton } from 'react-bootstrap';
import useSound from 'use-sound';

const sadeness = require('../assets/sadeness.mp3');
export const SoundToggle = () => {
  let [play, { stop, isPlaying }] = useSound(sadeness);

  let [isChecked, setIsChecked] = useState(
    false
  );

  return (
    <ToggleButton
      name="toggle-sound"
      active={isPlaying}
      checked={isChecked}
      type="checkbox"
      size="lg"
      value={isChecked}
      onChange={() => setIsChecked(!isChecked)}
      onMouseDown={() => isPlaying}
      onMouseUp={() => {
        isChecked ? stop() : play();
      }}
    />
  );
}