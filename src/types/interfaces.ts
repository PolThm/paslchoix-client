import { FC } from 'react';

import { RouteConditions } from '@/types/enums';

export interface Route {
  key: string;
  title: string;
  path: string;
  condition: RouteConditions;
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
  owner?: string;
  volunteers: Volunteer[];
}

export interface UserAuth {
  isLoggedIn: boolean | null;
  username: string;
}

export type NewList = Omit<List, '_id'>;
