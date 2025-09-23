import { styled } from "styled-components";
import { useState } from "react"

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;


export default function CreateAccount(){

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
    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Create An Account
            // Set the name of User
            // Redirect to the homepage

        } catch (e) {
            // setError
        } finally {
            setLoading(false);
        }
        console.log(name, email, password)
    }
    return (<Wrapper>
                <Title>Log into X </Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="이름" type="text" required />
            <Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
            <Input onChange={onChange} type="submit" value={isLoading? "Loading..." : "Create Account"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
    );
}