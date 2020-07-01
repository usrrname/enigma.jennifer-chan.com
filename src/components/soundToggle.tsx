import React from 'react';

import { ToggleButton } from 'react-bootstrap';
import { PlayFunction } from 'use-sound/dist/types';

type ComponentProps = {
  play: PlayFunction,
  pause: (id?: string) => void;
  isPlaying: boolean;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = ComponentProps;
export const SoundToggle = (props: Props) => {
  return (
    <div className="sound-toggle">
      {props.isPlaying && <label className="ml-2 mr-2">Sound On</label>}
      {!props.isPlaying && <label className="ml-2 mr-2">Sound Off</label>}
      <ToggleButton
        name="toggle-sound"
        active={props.isPlaying}
        checked={props.isChecked}
        type="checkbox"
        size="sm"
        value=''
        onClick={() => props.setIsChecked(!props.isChecked)}
        onChange={() => props.isChecked ? props.pause() : props.play()}
      />
    </div>
  );
}