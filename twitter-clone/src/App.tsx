import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout.tsx"
import Home from "./routes/home.tsx"
import Profile from "./routes/profile.tsx"

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />,
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

  }


])

function App() {
  return (
    <> 
      <RouterProvider router = {router} />
    </>
  )
}

export default App
