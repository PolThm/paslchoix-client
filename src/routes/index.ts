import DrawVolunteerPage from '@/pages/DrawVolunteerPage';
import ExistingListPage from '@/pages/ExistingListPage/ExistingListPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import MyListsPage from '@/pages/MyListsPage';
import NewListPage from '@/pages/NewListPage';
import NotFoundPage from '@/pages/NotFoundPage';
import RegisterPage from '@/pages/RegisterPage';
import { Paths, RouteConditions } from '@/types/enums';
import { Route } from '@/types/interfaces';

const {
  Home,
  Register,
  Login,
  NewList,
  MyLists,
  ExistingList,
  DrawVolunteer,
  NotFound,
} = Paths;

const { loggedIn, loggedOut, noCondition } = RouteConditions;

export const router: Route[] = [
  {
    key: Home,
    title: 'Accueil',
    path: Home,
    condition: noCondition,
    component: HomePage,
  },
  {
    key: Login,
    title: 'Connexion',
    path: Login,
    condition: loggedOut,
    component: LoginPage,
  },
  {
    key: Register,
    title: 'Inscription',
    path: Register,
    condition: loggedOut,
    component: RegisterPage,
  },
  {
    key: MyLists,
    title: 'Mes listes',
    path: MyLists,
    condition: loggedIn,
    component: MyListsPage,
  },
  {
    key: NewList,
    title: 'Nouvelle liste',
    path: NewList,
    condition: loggedIn,
    component: NewListPage,
  },
  {
    key: ExistingList,
    title: 'Rejoindre une liste',
    path: `${ExistingList}/:id`,
    condition: loggedIn,
    component: ExistingListPage,
  },
  {
    key: DrawVolunteer,
    title: 'Tirer au sort',
    path: `${ExistingList}/:id${DrawVolunteer}`,
    condition: loggedIn,
    component: DrawVolunteerPage,
  },
  {
    key: NotFound,
    title: '404 Not Found',
    path: '*',
    condition: noCondition,
    component: NotFoundPage,
  },
];

export default router;
