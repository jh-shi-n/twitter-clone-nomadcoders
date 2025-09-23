import { auth } from "../firebase"

export default function Home(){
    const logOut = () => {
                auth.signOut()
            }
    return <h1>
                <button onClick={logOut}>로그아웃</button>
           </h1>;
    }