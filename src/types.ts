export type Video = {
  id: string;
  name: string;
  start?: number;
  end?: number;
  mute?: number;
}

export type IndexState = {
  prev: number;
  current: number;
}
