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
  isTargeted: boolean;
}

export interface List {
  _id?: string;
  name: string;
  volunteers: Volunteer[];
}
