var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require("path");
var workDB = require('../../controllers/DAL/works.db');
var userDB = require('../../controllers/DAL/users.db');

router.get('/', function(req, res, next) {
    workDB.getAllWorks(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).send('Cannot get all works');
        }
        else {
            res.send(data);
        }
    })
});

router.get('/:workId', function(req, res, next) {
    workDB.getWorkById(req.params.workId, function(err, data) {
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
    // Check that user is ADMIN
    userDB.isAdmin(req.body.userId, function(dbErr, isAdmin) {
        if (!isAdmin) {
            res.status(403).send("אינך מורשה לבצע פעולה זו");
        } else {
            req.body.userId = undefined;

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
                                /*var galleryDir = path.join('gallery', data.id);
                                if (!fs.existsSync(galleryDir)) {
                                    fs.mkdirSync(galleryDir);
                                }*/

                                res.status(200).json(data);
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
                        //         res.status(200).json(work);
                        //     }
                        // })
                        res.status(500).send("שם העבודה קיים כבר. אנא בחר חדש.");
                    }
                })
            };
        }5
    });
})

router.put('/', function(req, res, next) {
    // Check that user is ADMIN
    userDB.isAdmin(req.body.userId, function(dbErr, isAdmin) {
        if (!isAdmin) {
            res.status(403).send("אינך מורשה לבצע פעולה זו");
        } else {
            req.body.userId = undefined;

            // Validation check
            if (req.body.title == '') {
                res.status(500).send("יש להזין שם לעבודה");
            } else {
                // Find the work by its name
                workDB.getWorkByName(req.body.title, function(e, work) {
                    // Check if the given name taken
                    if ((work != null) && (work._id != req.body._id)) {
                        res.status(500).send("השם שבחרת כבר תפוס...");
                    } else {
                        // Everything is good to go: update the work in the db.
                        workDB.updateWork({
                            title: req.body.title,
                            description: req.body.description,
                            _id: req.body._id
                        }, function(err, data) {
                            if (err) {
                                console.log("Error while adding a new work: " + err);
                                res.status(500).send("שגיאה בעת עדכון העבודה");
                            } else {
                                res.status(200).json(work);
                            }
                        })
                    }
                });
            }
        }
    });
})

router.delete('/:userId/:workId', function(req, res, next) {
    // Check that user is ADMIN
    userDB.isAdmin(req.params.userId, function(dbErr, isAdmin) {
        if (!isAdmin) {
            res.status(403).send("אינך מורשה לבצע פעולה זו");
        } else {
            // Check if the work exist
            workDB.getWorkById(req.params.workId, function(err, work) {
                if (err) {
                    console.log(err);
                    res.status(500).send("חלה שגיאה בעת אימות העבודה שאתה מנסה למחוק");
                } else {
                    workDB.removeWork(req.params.workId, function(e) {
                        if (e) {
                            res.status(500)
                        } else {
                            res.status(200).send();
                        }
                    })
                }
            });
        }
    });
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