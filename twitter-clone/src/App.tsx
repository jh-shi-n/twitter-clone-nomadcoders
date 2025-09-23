import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout.tsx"
import Home from "./routes/home.tsx"
import Profile from "./routes/profile.tsx"
import Login from "./routes/login.tsx"
import CreateAccount from "./routes/create-account.tsx"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />, // Login User (인증된 사용자) 만 사용하게 하고싶을때 구분
    children : [
      {
        path: "",
        element: <Home />,
        
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/create-account",
    element : <CreateAccount />
  }


])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  return (
    <> 
      <GlobalStyles />
      <RouterProvider router = {router} />
    </>
  )
}

export default App
