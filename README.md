# twitter-clone-nomadcoders
nomadcoder 강의 기반 twitter clone coding (전반적인 Firebase 기능 Flow 중점)


- Firebase
Firebase는 앱과 게임을 빌드하고 성장시키는 데 도움이 되는 앱 개발 플랫폼입니다.
https://firebase.google.com/?hl=ko

- Cloud Firestore
Cloud Firestore는 글로벌 규모의 모바일 및 웹 앱용 데이터를 쉽게 저장, 동기화, 쿼리할 수 있게 해주는 NoSQL 문서 데이터베이스입니다.
https://firebase.google.com/products/firestore?hl=ko

- Auth
이메일/비밀번호 계정, 전화 인증, Google, Twitter, Facebook, GitHub 로그인 등을 지원하는 엔드 투 엔드 ID 솔루션을 제공합니다.
https://firebase.google.com/products/auth?hl=ko

- Cloud Storage
Cloud Storage는 사진, 동영상 등의 사용자 제작 콘텐츠를 빠르고 손쉽게 저장하고 제공할 수 있도록 설계되었습니다.
https://firebase.google.com/products/storage?hl=ko

----
- [1] Routing
- [2] Firebase Auth
   - Firebase SDK & Server <- Auth를 위한 모든 작업 수행 (쿠키, 토큰)
   - Login
        - 어플리케이션에 로그인 요청
        - Firebase 로그인 여부 확인 : Firebase가 요청된 Cookie와 Token을 활용하여 서버와 함께 확인
        - 로그인 완료 전까지 Frontend Loading Screen
        - 로그인 완료 