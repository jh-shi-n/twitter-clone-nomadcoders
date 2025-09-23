import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import Timeline from "../components/timeline";


const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
`;


export default function Home(){
    const Navigate = useNavigate();
    const logOut = () => {
                auth.signOut()
                Navigate("/login")
            }
    return (
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    )
}