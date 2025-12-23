import express from 'express'
import { addTree, updateTree, deleteTree, fetchAllTrees } from '../controller/tree.controller.js'
import jwtAuth from '../middelware/jwtAuth.js'
import uploadlocal from '../middelware/multer.js'

const treeRoutes = express.Router()

treeRoutes.post('/add', uploadlocal.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'imageFiles', maxCount: 10 }
]), jwtAuth, addTree);
treeRoutes.put('/update/:id', uploadlocal.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'imageFiles', maxCount: 10 }
]), jwtAuth, updateTree);
treeRoutes.delete('/delete/:id', jwtAuth, deleteTree);
treeRoutes.get('/fetchalltrees', fetchAllTrees);

export default treeRoutes
