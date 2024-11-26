import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
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
    ],
  },
]);

export default router;
