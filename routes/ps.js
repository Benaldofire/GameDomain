const express = require('express');
const router = express.Router();

//All PS Route
//PS5 id =  187, ps4 id = 18
router.get('/', (req,res)=>{
    res.render("ps/index");
});

//export the router we created

module.exports = router;