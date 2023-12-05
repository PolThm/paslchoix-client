import { FC } from 'react';

export interface Route {
  key: string;
  title: string;
  path: string;
  component: FC;
}

export interface Volunteer {
  id: string;
  name: string;
  target?: string;
}

export interface List {
  id: string;
  name: string;
  volunteers: Volunteer[];
}
