import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"


const Button = styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 600;
    width: 100%;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Logo = styled.img`
    height: 25px;
`

export default function GithubButton(){
    const Navigate = useNavigate()
    const onClick = async () =>  {
        try{
            const provider = new GithubAuthProvider();
            // await signInWithPopup // 팝업 창 로그인
            // await signinwithRedirect //리다이렉트 창을 통한 로그인
            await signInWithPopup(auth, provider)
            Navigate("/")
        } catch (e) {
            console.error(e)
        }
    } 

    return (
    <Button onClick={onClick}>
        <Logo src='/github-mark.svg'/ >
        깃허브로 로그인
    </Button>
    )
}