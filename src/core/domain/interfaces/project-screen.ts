export interface ProjectScreen {
  id: string;
  created: number;
  updated: number;
  tags?: (string | null)[] | null;
  name: string;
  image: Image;
  section?: Section | null;
  number_of_versions: number;
  number_of_notes: number;
}
export interface Image {
  width: number;
  height: number;
  original_url: string;
  thumbnails: Thumbnails;
}
export interface Thumbnails {
  small: string;
  medium: string;
  large: string;
}
export interface Section {
  id: string;
}
