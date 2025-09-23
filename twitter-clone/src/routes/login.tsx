import { useState } from "react"
import { auth } from "../firebase"
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { 
    Switcher, 
    Wrapper, 
    Input, 
    Form, 
    Title, 
    Error
 } from "../components/auth-components";



export default function CreateAccount(){
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState(""); // 상태 확인용 (1) - email
    const [password, setPassword] = useState(""); // 상태 확인용 (2) - password
    const [error, setError] = useState("")
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => { // 이벤트 생성
        const {target : {name, value}} = e;
        if (name==="email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value)
        }
    }
    // 사용자가 Login Form을 Submit할때 Login 절차 진행
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Form 제출 시 새로고침 방지
        setError("") // 에러 발생 후 클라이언트에 남아있는 에러 문구 초기화
        if (isLoading || email === "" || password === "") return;
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password) // 로그인
            navigate("/") // 작동과정 : Form 입력 -> 로그인 요청 -> Firebase Signin 요청 -> 홈 이동
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setLoading(false);
        }
    }

    return (<Wrapper>
                <Title>Log into 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input
                onChange={onChange} 
                name="email" 
                value={email} 
                placeholder="이메일" 
                type="email" 
                required 
            />
            <Input 
                onChange={onChange} 
                name="password" 
                value={password} 
                placeholder="비밀번호" 
                type="password" 
                required 
            />
            <Input 
                onChange={onChange} 
                type="submit" 
                value={isLoading? "Loading..." : "Login"} 
            />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            아직 계정이 없나요? {" "}
            <Link to="/create-account"> 신규 가입 &rarr;</Link>
        </Switcher>
    </Wrapper>
    );
}