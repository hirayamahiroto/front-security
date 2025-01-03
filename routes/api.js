const express = require("express");
const router = express.Router();

router.get("/get", (req, res, next) => {
    const response = req.query.message;

    if(response === ""){
        res.status(400).send("Bad Request");
    }
    
    res.send(response);
});

router.use(express.json());
router.post("/post", (req, res, next) => {
    const body = req.body;
    console.log(body);
    res.json({ status: 'success', data: body });
});

module.exports = router;
