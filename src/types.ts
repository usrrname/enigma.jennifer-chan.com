export type Video = {
  id: string;
  name: string;
  start?: number;
  end?: number;
}

export type IndexState = {
  prev: number;
  current: number;
}
