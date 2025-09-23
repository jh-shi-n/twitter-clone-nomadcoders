import styled from "styled-components"
import { auth, db } from "../firebase"
import { useEffect, useState } from "react";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { query, collection, where, limit, orderBy, getDocs } from "firebase/firestore";
import { storage } from "../firebase";
import type { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height : 80px;
    border-radius : 50%;
    background-color : #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content :center;
    align-items: center;
    svg{
        width: 50px;
    }

`

const AvatarImg = styled.img`
    width: 100%;

`;

const AvatarInput = styled.input`
    display: none;
`

const Name = styled.span`
    font-size: 22px;
`

const Tweets = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default function Profile(){
    const user = auth.currentUser
    const [avatar, SetAvatar] = useState(user?.photoURL);
    const [tweets, SetTweets] = useState<ITweet[]>([]);
    const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (!user) return;
        if(files && files.length === 1){
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`)
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            SetAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL : avatarUrl,
            });
        }
    };
    const fetchTweets = async() => {
        const tweetQuery = query(
            collection(db, "tweets"),
            where("userId", "==", user?.uid), // 해당 부분은 파이어베이스 -> 색인에 업데이트 해주어야함
            orderBy("createdAt", "desc"),
            limit(25)
        );
        const snapshot = await getDocs(tweetQuery);
        const tweets = snapshot.docs.map(doc => {
            const {tweet, createdAt, userId, username, photo} = doc.data();
            return {
                tweet, 
                createdAt, 
                userId, 
                username, 
                photo,
                id: doc.id
            }
        });
        SetTweets(tweets)

    };
    useEffect(() => {
        fetchTweets()
    }, []) // 빈 dependency array를 추가하여 임시로 계속된 요청 차단
    return <Wrapper>
        <AvatarUpload htmlFor="avatar">
            {avatar ? (<AvatarImg src={avatar} /> 
            ) : (
            <svg fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true">
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
            )}
        </AvatarUpload>
        <AvatarInput 
            onChange={onAvatarChange}
            id="avatar"
            type="file" 
            accept="image/*"
        />
        <Name>
            {user?.displayName ? user.displayName : "익명"}
        </Name>
        <Tweets>
            {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
        </Tweets>
    </Wrapper>
}