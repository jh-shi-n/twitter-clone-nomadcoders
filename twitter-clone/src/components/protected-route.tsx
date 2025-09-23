// 로그인하지 않은 경우, 로그인 혹은 계정 생성 페이지 리다이렉트

import { auth } from "../firebase"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({
    children
} : {
    children:React.ReactNode
}) {
    const user = auth.currentUser; // Firebase에게 현재 브라우저에 로그인된 유저의 상태 확인 (실제 User or Null)
    
    console.log("Protected Route")
    console.log(user)
    if (user === null){
        return <Navigate to="/login"></Navigate>;
    }
    return children;
}