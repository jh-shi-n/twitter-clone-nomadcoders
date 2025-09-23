import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";

export default function Home(){
    const Navigate = useNavigate();
    const logOut = () => {
                auth.signOut()
                Navigate("/login")
            }
    return <h1>
                <button onClick={logOut}>로그아웃</button>
           </h1>;
    }