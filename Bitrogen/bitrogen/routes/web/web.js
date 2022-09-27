//enable router to give it to index.js to use apis
const express = require('express')
const router = express.Router()
const path = require('path')
router.get('/terms', (req, res) => {
    var filePath = "./views/terms.html"
    var resolvedPath = path.resolve(filePath);
    return res.sendFile(resolvedPath)
})

router.get('/privacy', (req, res) => {
    var filePath = "./views/privacy.html"
    var resolvedPath = path.resolve(filePath);
    return res.sendFile(resolvedPath)
})

module.exports = router