import { AuthorOrCreator, Color, Commit, Thumbnails } from './screen-version';

export interface ScreenDetail {
  id: string;
  created: number;
  creator: AuthorOrCreator;
  commit: Commit;
  image_url: string;
  thumbnails: Thumbnails;
  source: string;
  width: number;
  height: number;
  background_color: Color;
  density_scale: number;
  links?: (null)[] | null;
  layers?: (LayersEntity)[] | null;
  assets?: (AssetsEntity)[] | null;
}

export interface LayersEntity {
  id: string;
  source_id: string;
  type: 'text' | 'shape' | 'group';
  name: string;
  rect: Rect;
  fills?: (FillsEntityOrFill | null)[] | null;
  borders?: (BordersEntity | null)[] | null;
  shadows?: (ShadowsEntity | null)[] | null;
  opacity: number;
  blend_mode: string;
  border_radius: number;
  rotation: number;
  exportable: boolean;
  layers?: (LayersEntity)[] | null;
  component_name: string;
  content?: string | null;
  text_styles?: (TextStylesEntity)[] | null;
}

export interface Rect {
  y: number;
  x: number;
  width: number;
  height: number;
  absolute: Absolute;
}

export interface Absolute {
  x: number;
  y: number;
}

export interface FillsEntityOrFill {
  type: string;
  color: Color;
  opacity: number;
  blend_mode: string;
}

export interface BordersEntity {
  position: string;
  thickness: number;
  fill: FillsEntityOrFill;
}

export interface ShadowsEntity {
  type: string;
  offset_x: number;
  offset_y: number;
  blur_radius: number;
  spread: number;
  color: Color;
}

export interface FillsEntity {
  type: string;
  color?: Color | null;
  opacity: number;
  blend_mode: string;
  gradient?: Gradient | null;
}

export interface Gradient {
  type: string;
  color_stops?: (ColorStopsEntity)[] | null;
}

export interface ColorStopsEntity {
  position: number;
  color: Color;
}

export interface Range {
  location: number;
  length: number;
}

export interface Style {
  postscript_name: string;
  font_family: string;
  font_size: number;
  font_weight: number;
  font_style: string;
  font_stretch: number;
  letter_spacing: number;
  color: Color;
  text_align?: string | null;
}

export interface TextStylesEntity {
  range: Range;
  style: Style;
}

export interface AssetsEntity {
  layer_source_id: string;
  layer_name: string;
  display_name: string;
  contents?: (ContentsEntity)[] | null;
}

export interface ContentsEntity {
  url: string;
  format: 'png' | 'jpg' | 'svg' | 'pdf';
  density: 1 | 1.5 | 2 | 3 | 4;
}
