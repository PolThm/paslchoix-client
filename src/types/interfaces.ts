import { FC } from 'react';

export interface Route {
  key: string;
  title: string;
  path: string;
  component: FC;
}

export interface Volunteer {
  id: number;
  name: string;
  target?: string;
}

export interface List {
  id: number;
  name: string;
  volunteers: Volunteer[];
}
