import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div``;


export default function Home(){
    const Navigate = useNavigate();
    const logOut = () => {
                auth.signOut()
                Navigate("/login")
            }
    return (
        <Wrapper>
            <PostTweetForm />
        </Wrapper>
    )
}