import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import Tweet from "./tweet";

export interface ITweet {
    id: string;
    photo: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt : number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export default function Timeline(){
    const [tweets, setTweet] = useState<ITweet[]>([]);
    useEffect(() => {  // 유저가 화면을 보고 있지않을때 값을 반환하면서 cleanup
        let unsubscribe : Unsubscribe | null = null;
           const fetchTweets = async() => {
                const tweetsQuery = query(
                    collection(db, "tweets"),
                    orderBy("createdAt", "desc"),
                    limit(25)
                ); // 불러오기 + orderBy

        // Realtime 연결 생성 : onSnapshot - 과금조심
        // 비용절약용 : unsubscribe나 limit을 통해 조절 가능
        unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
            console.log("새 데이터 수신")
            const tweets = snapshot.docs.map((doc) => {
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
            setTweet(tweets)
        })

        }
            fetchTweets();
            return () => { // timeline 컴포넌트가 보이지않을때 (사용되지않을떄), timeline의 이벤트 리스너를 취소
                unsubscribe && unsubscribe();
            }
    }, [])
    return <Wrapper>
        {tweets.map((tweet => 
            <Tweet key={tweet.id} {...tweet} /> 
            ))}
    </Wrapper>;
}



/* // Snapshot - 해당 시간대 문서만 반환 (실시간 업데이트 X) (V9 버전)
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
*/