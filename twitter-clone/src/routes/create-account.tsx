import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { 
    Switcher, 
    Wrapper, 
    Input, 
    Form, 
    Title, 
    Error
 } from "../components/auth-components";
import GithubButton from "../components/github-btn";


export default function CreateAccount(){
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState(""); // 상태 확인용 (1) - name
    const [email, setEmail] = useState(""); // 상태 확인용 (2) - email
    const [password, setPassword] = useState(""); // 상태 확인용 (3) - password
    const [error, setError] = useState("")
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => { // 이벤트 생성
        const {target : {name, value}} = e;
        if (name === "name"){
            setName(value)
        } else if (name==="email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Form 제출 시 새로고침 방지
        setError("") // 에러 발생 후 클라이언트에 남아있는 에러 문구 초기화
        try {
            setLoading(true)
            if (isLoading || name === "" || email === "" || password === "") return;
            // Create An Account
            // Set the name of User
            // Redirect to the homepage
            const credentials = await createUserWithEmailAndPassword(auth, email, password) // 성공시 자격증명 Get
            console.log(credentials.user);

            await updateProfile(credentials.user, { // 프로필 업데이트, Avatar URL도 설정 가능
                displayName : name,
            });

            // 이 사이에서 백엔드 Function를 통해 가입 유저 관련 정보를 DB와 주고받을 수 있다.

            navigate("/") // 작동과정 : Firebase 가입 -> 자격증명생성 -> 자격증명이용 Profile Update -> Home
        } catch (e) {
            // setError
            if (e instanceof FirebaseError) {
                // console.log(e.code, e.message)
                setError(e.message)
            }
        } finally {
            setLoading(false);
        }
    }

    return (<Wrapper>
                <Title>Join 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input 
                onChange={onChange} 
                name="name" value={name} 
                placeholder="이름" 
                type="text" 
                required 
            />
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
                value={isLoading? "Loading..." : "Create Account"} 
            />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
            이미 계정이 있나요?{" "}
            <Link to="/login"> 로그인 &rarr;</Link>
        </Switcher>
        <GithubButton/>
    </Wrapper>
    );
}