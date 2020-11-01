# instagram clone coding


## 1. Models
1) User : User 정보 저장 (id(PK), password, user_name, email, social)
 - Association
 > Post와 1:N 관계 구성
 > getPosts() countPosts() createPost()
 > Comment와 1:N 관계 구성
 > getComments() countComments() createComment()
 > Like와 1:N 관계 구성
 > Story와 1:N 관계 구성

2) Post : Post 정보 저장 (id(PK), content, img, UserId)
 - Association
 > User와 N:1
 > Comment와 1:N
 > getComments() countComments() createComment()
 > Like와 1:N
 > getLikes() countLikes() createLike()
 
3) Comment : Comment 정보 저장( id(PK), content, UserId, PostId)
 > User와 N:1
 > Post와 N:1

4) Like : Like 정보 저장 ( id(PK), PostId, UserId)
 > Post와 N:1
 > User와 N:1

5) Story : Story 정보 저장 (id(PK), UserId)
 > User와 N:1

## 2. Routers
 - GET / : 메인 페이지 & 로그인 >> isNotLoggedIn 시 login rendering. 로그인 시 main rendering

 1. Auth Router
  - POST /auth/login : login 수행 O
  - GET /auth/signup : sign up page rendering O
  - GET /auth/facebook/(callback) : facebook authentication
 2. Post Router
  - POST /p : post o
  - POST /p/:postId/comment : comment o
  - POST /p/:postId/like : like 
  - GET /p : render upload page o
  - GET /p/:postId : get post o
  - DELETE /p/:postId : delete post

 3. Profile Router
  - GET /:id : profile

 4. Story Router
  - POST /story : story
  - GET /story/:id : story 

## 3. View
 - login.pug : login page
 - main.pug : main page
 - story.pug : story page
 - post.pug : post page
 - profile.pug : profile page

## API
 1. POST
  - /api/v1/following
  {follower: 'follower_id', following: 'following_id'};
 2. GET
  - /api/v1/follow/:userId 
 

 ## TODO
 - LIKE 부분 수정 !
 - posts 넘길 시 필요없는 부분(user 전체)넘김
 - 포스트 삭제
 - 팔로우 기능
 - 스토리 o
 - 프로필 ing
 - 업로드 modal 형식으로 수정 o 
 - 이미지 업로드 aws로