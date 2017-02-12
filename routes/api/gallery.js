var express = require('express');
var router = express.Router();
var path = require("path");

router.get("/", function(req, res, next) {
    res.send("123");
})

router.get('/:workName/:imageName', function(req, res, next) {
    var imageName = req.params.imageName;
    var workName = req.params.workName;

    var appDirPath = path.dirname(path.dirname(process.mainModule.filename));

    // Find the file and return it
    res.sendFile(path.join(appDirPath, "gallery", workName, imageName));
})

module.exports = router;