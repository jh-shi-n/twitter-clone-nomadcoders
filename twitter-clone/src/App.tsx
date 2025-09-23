import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout.tsx"
import Home from "./routes/home.tsx"
import Profile from "./routes/profile.tsx"
import Login from "./routes/login.tsx"
import CreateAccount from "./routes/create-account.tsx"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useState, useEffect } from "react"
import LoadingScreen from "./components/loading-screen.tsx"
import { auth } from "./firebase"
import { styled } from "styled-components";
import ProtectedRoute from "./components/protected-route.tsx"

const router = createBrowserRouter([
  {
    path : "/",
    element : <ProtectedRoute><Layout /></ProtectedRoute>, // Login User (인증된 사용자) 만 사용하게 하고싶을때 구분
    children : [
      {
        path: "",
        element : <Home />,
      },
      {
        path: "profile",
        element:  <Profile />
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

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  // 로딩 스크린 - Firebase가 로그인 작업 진행 시
  const [ isLoading, setLoading ] = useState(true);
  const init = async() => {
    await auth.authStateReady(); // 최초 인증 상태가 완료될대 실행되는 Promise Return

    // 임시 Loading 테스트용 코드 : setTimeout(() => setLoading(false), 2000)
    setLoading(false)
  };
  useEffect(() => {
    init();
  }, []);

  return ( 
    <> 
      <Wrapper>
        <GlobalStyles />
        {isLoading ? <LoadingScreen/> : <RouterProvider router = {router} /> } 
      </Wrapper>
    </>
  )
}

export default App
