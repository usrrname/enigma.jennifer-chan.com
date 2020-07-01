import React from 'react';
import { useElapsedTime } from "use-elapsed-time";

const easing = (t: number, b: number, c: number, d: number) => {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};

type Props = {
  isPlaying: boolean;
  end: number;
  options: {
    duration: number;
  }
}

export const Timer = (props: Props) => {
  const start = 0;
  const end = props.end;
  const duration = props.options.duration;
  const { elapsedTime } = useElapsedTime(props.isPlaying, props.options);
  const currentValue = easing(elapsedTime, start, end - start, duration);
  return (<div>{Math.round(currentValue)}</div>)
}