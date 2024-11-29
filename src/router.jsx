import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import SignupPage from './pages/signup/SignupPage';
import StorePage from './pages/store/StorePage';
import FriendPage from './pages/friend/FriendPage';
import CommunityPage from './pages/community/CommunityPage';
import SettingPage from './pages/setting/SettingPage';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'sign-up',
        element: <SignupPage />,
      },
      {
        path: 'store',
        element: <StorePage />,
      },
      {
        path: 'friend',
        element: <FriendPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
    ],
  },
]);

export default router;