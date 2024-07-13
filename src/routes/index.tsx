import Loader from '@/components/loader'
import { PATHS } from '@/constant/_paths'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const LandingPage = lazy(() => import('./landing-page'))
const Login = lazy(() => import('./login'))
const Register = lazy(() => import('./register'))
const Dashboard = lazy(() => import('./dashboard'))
const DashboardDetail = lazy(() => import('./dashboard'))
const Resume = lazy(() => import('./resume'))

const useRoutes = () => [
  {
    path: PATHS.LANDING_PAGE,
    element: <LandingPage />,
  },
  {
    path: PATHS.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.REGISTER,
    element: <Register />,
  },
  {
    path: PATHS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: PATHS.DETAIL,
    element: <DashboardDetail />,
  },
  {
    path: PATHS.PUBLIC,
    element: <Resume />,
  },
]

export default function Routers() {
  const routes = useRoutes()
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Suspense fallback={<Loader />}>{route.element}</Suspense>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
