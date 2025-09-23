import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import Tweet from "./tweet";

export interface ITweet {
    id: string;
    photo: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt : number;
}

const Wrapper = styled.div``;

export default function Timeline(){
    const [tweets, setTweet] = useState<ITweet[]>([]);
    const fetchTweets = async() => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
        ); // 불러오기 + orderBy
        const snapshot = await getDocs(tweetsQuery)
        // snapshot.docs.forEach((doc => console.log(doc.data()))) // 문서를 각각 log로 출력
        const tweets = snapshot.docs.map((doc)=> {
            const {tweet, createdAt, userId, username, photo} = doc.data()
            return {
                tweet, 
                createdAt, 
                userId, 
                username, 
                photo,
                id : doc.id,
            }
        });
        setTweet(tweets); // 문서에서 Tweet을 개별 추출 후, 상태 변경
    }

    useEffect(() => {
        fetchTweets();
    }, [])
    return <Wrapper>
        {tweets.map((tweet => 
            <Tweet key={tweet.id} {...tweet} /> 
            ))}
    </Wrapper>;
}