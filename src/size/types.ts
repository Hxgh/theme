export interface SizeConfig {
  name: string;
  middle: string;
  small: string;
}

export type SizeConfigs = Array<SizeConfig>;

export enum SizeType {
  Middle = 'middle',
  Small = 'small',
}
