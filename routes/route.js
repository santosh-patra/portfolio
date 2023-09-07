import express from 'express';
import formidable from 'express-formidable'
import { createProjectController, deleteProjectController, getAllProjectController, getProjectPhotoController, loginController, registerController, sendMailController } from '../controller/controller.js';
import { isAdmin, requireSignin } from '../middleware/middleware.js';
const router = express.Router();

// login
router.post('/login',loginController);
// register
router.post('/register',registerController);
// create-project
router.post('/create-project',isAdmin,formidable(),createProjectController)
// get -all project details
router.get('/get-all-project-details',getAllProjectController);
// get project photo
router.get('/get-project-photo/:id',getProjectPhotoController)
// delete project
router.delete('/delete-project/:id',isAdmin,deleteProjectController)

// send - mail 
router.post('/send-mail',sendMailController);






export default router