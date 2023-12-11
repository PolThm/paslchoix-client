import { FC } from 'react';

export interface Route {
  key: string;
  title: string;
  path: string;
  component: FC;
}

export interface Volunteer {
  _id?: string;
  id: string;
  name: string;
  target: string;
  hasDrawn: boolean;
}

export interface List {
  _id: string;
  name: string;
  volunteers: Volunteer[];
}

export type NewList = Omit<List, '_id'>;
