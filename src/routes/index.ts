import DrawVolunteerPage from '@/pages/DrawVolunteerPage';
import ExistingListPage from '@/pages/ExistingListPage/ExistingListPage';
import HomePage from '@/pages/HomePage';
import MyListsPage from '@/pages/MyListsPage';
import NewListPage from '@/pages/NewListPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Paths } from '@/types/enums';
import { Route } from '@/types/interfaces';

const { Home, NewList, MyLists, ExistingList, DrawVolunteer, NotFound } =
  Paths;

export const router: Route[] = [
  {
    key: Home,
    title: 'Accueil',
    path: Home,
    component: HomePage,
  },
  {
    key: MyLists,
    title: 'Mes listes',
    path: MyLists,
    component: MyListsPage,
  },
  {
    key: NewList,
    title: 'Nouvelle liste',
    path: NewList,
    component: NewListPage,
  },
  {
    key: ExistingList,
    title: 'Rejoindre une liste',
    path: `${ExistingList}/:id`,
    component: ExistingListPage,
  },
  {
    key: DrawVolunteer,
    title: 'Tirer au sort',
    path: `${ExistingList}/:id${DrawVolunteer}`,
    component: DrawVolunteerPage,
  },
  {
    key: NotFound,
    title: '404 Not Found',
    path: '*',
    component: NotFoundPage,
  },
];

export default router;
