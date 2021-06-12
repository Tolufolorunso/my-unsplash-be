const Photo = require('./../models/imageModel')

const getPhotos = async (req, res) => {
  let { label } = req.query
  try {
    const photos = await Photo.find()
    let sortedPhotos = [...photos]

    if (label) {
      console.log(label)
      sortedPhotos = sortedPhotos.filter((photo) => {
        return photo.label.startsWith(label)
      })
    }
    sortedPhotos = sortedPhotos.reverse()
    res.status(200).json({
      status: 'success',
      data: sortedPhotos,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      errorMsg: 'Fail to fetch images',
    })
  }
}

const postPhoto = async (req, res) => {
  const { label, photoUrl } = req.body

  try {
    const photo = await Photo.create({ label, photoUrl })
    res.status(201).json({
      status: 'success',
      data: photo,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'fail',
      errorMsg: 'Fail to add image',
    })
  }
}

const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.photoID)
    if (!photo) {
      return res.status(404).json({
        status: 'fail',
        errorMsg: 'Image with the ID not found',
      })
    }
    res.status(200).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      errorMsg: 'Fail to fetch images',
    })
  }
}

module.exports = { postPhoto, getPhotos, deletePhoto }
