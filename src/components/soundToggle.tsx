import React, { useState } from 'react';

import { ToggleButton } from 'react-bootstrap';
import useSound from 'use-sound';

const sadeness = require('../assets/sadeness.mp3');
export const SoundToggle = () => {
  let [play, { duration, pause, isPlaying }] = useSound(sadeness);

  let [isChecked, setIsChecked] = useState(
    false
  );

  return (
    <>
      <label className="mr-2">Sound</label>
      <ToggleButton
        name="toggle-sound"
        active={isPlaying}
        checked={isChecked}
        type="checkbox"
        size="lg"
        value={duration}
        onChange={() => setIsChecked(!isChecked)}
        onMouseDown={() => isPlaying}
        onMouseUp={() => {
          isChecked ? pause() : play();
        }}
      />
    </>
  );
}