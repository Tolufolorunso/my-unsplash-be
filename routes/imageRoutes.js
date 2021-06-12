const express = require('express')
const router = express.Router()
const {
  postPhoto,
  getPhotos,
  deletePhoto,
} = require('../controllers/imageControllers')

router.route('/').get(getPhotos).post(postPhoto)
router.delete('/:photoID', deletePhoto)
module.exports = router
