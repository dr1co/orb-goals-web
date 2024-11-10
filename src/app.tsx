import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./contexts/user";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Home } from "./components/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home /> 
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}
