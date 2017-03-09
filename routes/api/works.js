var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require("path");
var workDB = require('../../controllers/DAL/works.db');

router.get('/', function(req, res, next) {
    workDB.getAllWorks(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get all works');
        }
        else {
            // Fix picture paths
            //data.forEach(fixPicPaths);

            res.send(data);
        }
    })
});

router.get('/:workName', function(req, res, next) {
    workDB.getWorkByName(req.params.workName, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get work');
        }
        else {
            res.send(data);
        }
    })
});

router.post('/', function(req, res, next) {
    // Validation check
    if (req.body.title == '') {
        res.status(500).send("יש להזין שם לעבודה");
    } else {
        // Find the work by its name
        workDB.getWorkByName(req.body.title, function(e, work) {
            // If not exist, add a new work
            if (work == null) {
                workDB.addWork(req.body, function(err, data) {
                    if (err) {
                        console.log("Error while adding a new work: " + err);
                        res.status(500).send("שגיאה בעת הוספת העבודה");
                    } else {
                        // Create a new directory in the gallery folder
                        var galleryDir = path.join('gallery', data.id);
                        if (!fs.existsSync(galleryDir)) {
                            fs.mkdirSync(galleryDir);
                        }

                        res.status(200).send();
                    }
                })
            } else {
                // workDB.updateWork({
                //     title: req.body.title,
                //     description: req.body.description
                // }, function(err, data) {
                //     if (err) {
                //         console.log("Error while adding a new work: " + err);
                //         res.status(500).send("שגיאה בעת עדכון העבודה");
                //     } else {
                //         res.status(200).send();
                //     }
                // })
                res.status(500).send("שם העבודה קיים כבר. אנא בחר חדש.");
            }
        })
    };
})

// MOVE TO ADMIN
/*router.post('/add', function(req, res, next) {
    workDB.getAllWorks(req.body.newWork, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot add work');
        }
        else {
            res.send(data);
        }
    })
});*/

module.exports = router;