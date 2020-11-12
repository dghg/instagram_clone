# instagram clone coding
 - Server side : Node, Express, Typescript
 - Client side : (vanila)JS
 - Database : Mysql + Sequelize ORM, Redis for session
 - View template : pug
 - Authentication : passport (local, facebook)

## Features
 1. Authroize
  - create new account (using oauth with facebook)
  - login using passport & session
 2. Post
  - upload image(multer + aws s3) with text
  - Comment, like on post
 3. Follow
  - follow & defollow other user
  - showing user followings' posts, stories
 4. profile
  - explore others' profile (/profile/id)


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

 ## TODO
 - 스토리 view 수정
 - edit 수정
 - search
