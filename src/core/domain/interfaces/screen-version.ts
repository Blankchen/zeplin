export interface ScreenVersionSummary {
  id: string;
  created: number;
  creator: AuthorOrCreator;
  commit: Commit;
  image_url: string;
  thumbnails: Thumbnails;
  source: string;
  width: number;
  height: number;
  density_scale: number;
  links?: (null)[] | null;
}

export interface AuthorOrCreator {
  id: string;
  email: string;
  username: string;
  last_seen: number;
}

export interface Commit {
  color: Color;
  author: AuthorOrCreator;
}

export interface Color {
  r: number;
  b: number;
  g: number;
  a: number;
}
export interface Thumbnails {
  small: string;
  medium: string;
  large: string;
}
