import { addDoc, collection, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import styled from "styled-components"
import { auth, db, storage } from "../firebase"
import { auth_v8, db_v8, storage_v8 } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const TextArea = styled.textarea`
    border:2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: None;
    &::placeholder{
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0
    }
`

// AttachFileInput의 id를 위한 label
const AttachFileButton = styled.label`
    padding: 10px 0px;
    color:#1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    
`

// 이미지 형식 파일이라면 뭐든지 업로드 가능
const AttachFileInput = styled.input` 
    display: none;
    
`

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color:white;
    border:none;
    padding:10px 0px;
    border-radius: 20px;
    font-size:16px;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.9;
    }
`

export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value) // TextArea에 입력한 내용을 setTweet으로 상태변경
    }    
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e?.target; 
        if(files && files.length === 1){ // e.target에 file 존재(파일 업로드 감지), 파일이 1개일 경우
            setFile(files[0]) // files 배열에 설정
        }
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = auth.currentUser
        if(!user || isLoading || tweet === "" || tweet.length > 180) return;
        
        try {
            setLoading(true)
            // Document Add & set
            // 백엔드 API 구축시에는 이 부분에 API Function + Value를 넣어서 Request를 보낼 것!
            // 방식 (1) - firebase v9버전
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt : Date.now(),
                username: user.displayName || "익명",
                userId: user.uid,
            })

            if(file){
                const locationRef = ref(storage, `tweets/${user.uid}-${user.
                                    displayName}/${doc.id}`);
                const result = await uploadBytes(locationRef, file) 
                const url = await getDownloadURL(result.ref)
                await updateDoc(doc, {
                    photo: url,
                });
            }

            // 방식 (2) - firebase v8버전
            // let newTweet = {
            //         tweet,
            //         createdAt : Date.now(),
            //         username: user.displayName || "익명",
            //         userId: user.uid,
            //     }
            // const docRef = await db_v8.collection("tweets").add(newTweet);

            // if(file) {
            //     const storageRef = storage_v8.ref(`tweets/${user.uid}-${user.displayName}/${docRef.id}`);
            //     const snapshot = await storageRef.put(file);
            //     const url = await snapshot.ref.getDownloadURL();
                
            //     // Firestore 문서 업데이트
            //     await docRef.update({
            //         photo: url,
            //     });
            // }
            // 백엔드 API 구축시에는 이 부분에 API Function + Value를 넣어서 Request를 보낼 것!  
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return <Form onSubmit={onSubmit}>
        <TextArea 
            rows={5}
            maxLength={180}
            onChange={onChange} 
            value={tweet} 
            placeholder="무슨일이 일어나고 있나요?"
        />
        <AttachFileButton htmlFor="file">
            {file ? "사진 첨부됨" : "사진 추가"}
        </AttachFileButton>
        <AttachFileInput 
            onChange={onFileChange}
            type="file"
            id="file"
            accept="image/*"
        /> 
        <SubmitBtn 
            type="submit" 
            value={isLoading ? "포스팅 중..." : "트윗 올리기"}
        />
    </Form>
    
}