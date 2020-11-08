import {Router, Request, Response, NextFunction} from 'express';
import {isLoggedIn, isNotLoggedIn} from './middleware';
import {userLogin, userLogout, userSignup, userProfileEdit, getUserRecommends, profileUser } from './controller/user.controller';
import {addFollow, deFollow} from './controller/user.controller';
import {uploadPost, deletePost, getPost, getPosts, profilePosts} from './controller/post.controller';
import {uploadComment, deleteComment} from './controller/comment.controller';
import {uploadStory, getStory} from './controller/story.controller';
import IMG_UPLOAD from './utils/upload';
import {getStories} from './controller/story.controller';
const router = Router();

// Main
router.get('/', isLoggedIn, getPosts, getStories, getUserRecommends, (req: Request, res: Response, next: NextFunction) => {res.render('main')});

// Auth
router.get('/auth/signup', isNotLoggedIn, (req: Request, res: Response, _: NextFunction) => {res.render('signup')});
router.post('/auth/signup', isNotLoggedIn, userSignup);
router.post('/auth/login', isNotLoggedIn, userLogin);
router.get('/auth/logout', isLoggedIn, userLogout);

// Profile edit
router.get('/edit', isLoggedIn, (req: Request, res: Response, next: NextFunction) => {res.render('edit')});
router.put('/edit', isLoggedIn, userProfileEdit);

router.post('/follow', isLoggedIn, addFollow);
router.delete('/follow', isLoggedIn, deFollow);

// Posting
router.post('/p', isLoggedIn, uploadPost);
router.delete('/p', isLoggedIn, deletePost);
router.get('/p/:id', isLoggedIn, getPost);

router.post('/p/comment', isLoggedIn, uploadComment);
router.delete('/p/comment', isLoggedIn, deleteComment);

// Story
router.post('/story', isLoggedIn, uploadStory);
router.get('/story/:id', isLoggedIn, getStory);

// img upload
router.post('/p/img', isLoggedIn, IMG_UPLOAD, (req: Request, res: Response, next: NextFunction) => {res.status(200).json(req.file)});

// profile
router.get('/profile/:id', profileUser, profilePosts, (req: Request, res: Response, next: NextFunction)=> {res.render('profile')});

export default router;