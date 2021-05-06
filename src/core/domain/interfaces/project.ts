import { Organization } from './organization';
import { RemPreferences } from './rem-preferences';

export interface Project {
  id: string;
  name: string;
  platform: string;
  status: string;
  created: number;
  updated: number;
  organization: Organization;
  rem_preferences: RemPreferences;
  number_of_screens: number;
  number_of_components: number;
  number_of_text_styles: number;
  number_of_colors: number;
  number_of_members: number;
  number_of_spacing_tokens: number;
  description: string;
  thumbnail: string;
  scene_url: string;
}

