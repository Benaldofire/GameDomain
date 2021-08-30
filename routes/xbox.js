const express = require('express');
const router = express.Router();

//All xbox Routes
router.get('/', (req,res)=>{
    res.render("xbox/index");
});

//export the router we created

module.exports = router;