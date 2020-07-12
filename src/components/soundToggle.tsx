import React from 'react';

import { ToggleButton } from 'react-bootstrap';
import { PlayFunction } from 'use-sound/dist/types';

type ComponentProps = {
  play: PlayFunction,
  pause: (id?: string) => void;
  isPlaying: boolean;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = ComponentProps;

export const SoundToggle = (props: Props) => {
  const onClick = () => {
    props.setIsChecked(!props.isChecked);
  }
  const onChange = () => {
    props.isChecked && props.isPlaying ? props.pause() : props.play();
  }

  return (
    <>
      <div className="sound-toggle">
        {props.isChecked && props.isPlaying ? <label className="ml-2 mr-2">Sound On</label> : <label className="ml-2 mr-2">Sound Off</label>}

        <ToggleButton
          name="toggle-sound"
          active={props.isPlaying}
          checked={props.isChecked}
          type="checkbox"
          size="sm"
          value=''
          onClick={onClick}
          onChange={onChange}
        />
      </div >
    </>
  );
}