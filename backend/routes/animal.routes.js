import express from 'express'
import { addanimal, fetchAllAnimals, updateAnimal } from '../controller/animal.controller.js'
import jwtAuth from '../middelware/jwtAuth.js'
import uploadlocal from '../middelware/multer.js'

const animalRoutes = express.Router()

animalRoutes.post('/add', uploadlocal.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'imageFiles', maxCount: 10 }
]), jwtAuth, addanimal);
animalRoutes.get('/fetchallanimals', fetchAllAnimals);
animalRoutes.put('/updatanimal', updateAnimal)

export default animalRoutes