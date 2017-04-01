var express = require('express');
var fs = require("fs");
var router = express.Router();
var path = require("path");
var workDB = require('../../controllers/DAL/works.db');
var userDB = require('../../controllers/DAL/users.db');

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

router.post('/upload', function(req, res) {
    // Check that user is ADMIN
    userDB.isAdmin(req.body.userId, function(dbErr, isAdmin) {
        if (!isAdmin) {
            res.status(403).send("אינך מורשה לבצע פעולה זו");
        } else {
            req.body.userId = undefined;

            // IF there are no files uploaded
            if (!req.files) {
                res.status(400).send("לא נשלחו קבצים");
            } else {
                var file = req.files.file;
                var fileFullPath = path.join(path.dirname(path.dirname(process.mainModule.filename)), "gallery", req.body.workId, file.name)
                file.mv(fileFullPath, function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("בדוק שהעבודה קיימת!");
                    } else {
                        // Find the wanted work
                        workDB.getWorkById(req.body.workId, function(err, data) {
                            if (err) {
                                res.status(500).send("לא ניתן לעדכן את העבודה, בדוק שהיא קיימת");
                            } else {
                                var picExist = false;

                                // Run over the work pictures
                                for (var curr in data.pictures) {
                                    // Check if the current picture name equals to the uploaded picture name
                                    if (data.pictures[curr].picPath == file.name) {
                                        picExist = true;
                                    }
                                }

                                // If the picture does not exist already
                                if (!picExist) {
                                    workDB.updateWork({
                                        _id: req.body.workId,
                                        $push: {
                                            pictures: { picPath: file.name }
                                        }
                                    }, function(err, data) {
                                        if (err) {
                                            console.error(err);
                                            res.status(500).send("שגיאה בעת עדכון העבודה");
                                        } else {
                                            res.status(200).send("הקבצים הועלו בהצלחה");
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        }
    });
})

router.delete("/:userId/:workId/:picPath", function(req, res, next) {
    // Check that user is ADMIN
    userDB.isAdmin(req.params.userId, function(dbErr, isAdmin) {
        if (!isAdmin) {
            res.status(403).send("אינך מורשה לבצע פעולה זו");
        } else {
            var fileFullPath = path.join(path.dirname(path.dirname(process.mainModule.filename)), "gallery", req.params.workId, req.params.picPath)

            // Remove physical file
            fs.exists(fileFullPath, function(exists) {
                if (exists) {
                    //fs.unlink(fileFullPath);

                    // Delete the picture
                    workDB.removePicture(req.params.workId, req.params.picPath, function(e) {
                        if (e) {
                            console.log(e);
                            res.status(500).send("שגיאה בעת מחיקת התמונה");
                        }
                    });                    
                } else {
                    res.status(401).send("התמונה לא נמצאה, בדוק שהיא תחת העבודה הזאת באמת");
                }
            })
        }
    });
})

module.exports = router;