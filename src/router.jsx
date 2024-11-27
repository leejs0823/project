import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import SignupPage from './pages/signup/SignupPage';
import StorePage from './pages/store/StorePage';
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
    ],
  },
]);

export default router;
