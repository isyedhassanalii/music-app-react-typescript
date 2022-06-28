export enum FetchState{
  DEFAULT='DEFAULT',
  LOADING='LOADING',
  SUCCESS='SUCCESS',
  ERROR='ERROR'
}

export type songData = {
  id: string;
  name: string;
  description:string,
  music_file_path:string;
  cover_image_path: string;
  likes:number;

};
export type likesData={
  id:string,
}
