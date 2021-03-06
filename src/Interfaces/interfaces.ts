export interface Character {
  whatItIs: string;
  content: string;
}

export interface ComposedElement {
  type: string;
  content: Point[];
}

export interface Point {
  x: number;
  y: number;
}

export interface NormalizedCharacter {
  type: string;
  content: number[];
}

export interface StatusInfoInterface {
  message: string;
  status: Status;
}

export type Status = 'INFO' | 'ERROR' | '';

