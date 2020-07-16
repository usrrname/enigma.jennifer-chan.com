import React, { useEffect } from 'react';

import { ToggleButton } from 'react-bootstrap';
import { PlayFunction } from 'use-sound/dist/types';

type ComponentProps = {
  play: PlayFunction,
  pause: (id?: string) => void;
  isPlaying: boolean;
  isChecked: boolean;
  onChange: (event: any) => void;
}

type Props = ComponentProps;

export const SoundToggle = (props: Props) => {
  useEffect(() => {

  }, [props.isPlaying, props.isChecked])
  return (
    <div className="sound-toggle">
      {props.isChecked && props.isPlaying ? <label className="ml-2 mr-2">Sound On</label> : <label>Sound Off</label>}
      <ToggleButton
        name="toggle-sound"
        active={props.isPlaying}
        checked={props.isChecked}
        type="checkbox"
        size="sm"
        value=''
        onChange={props.onChange}
      />
    </div >
  );
}