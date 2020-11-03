const express = require('express');
const router = express.Router();
const { Favourite } = require("../models/Favourite");

const { auth } = require("../middleware/auth");

router.post("/favouriteNumber", auth, (req, res) => {
    Favourite.find({"movieId":req.body.movieId})
    .exec((err,favourite)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,FavouriteNumber:favourite.length})
    })
});

router.post("/favourite", auth, (req, res) => {
    Favourite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err,favourite)=>{
        if(err) return res.status(400).send(err)

        let result = false
        if(favourite.length !=0){
            result= true
        }
        res.status(200).json({success:true,favourite:result})
    })
});

module.exports = router;
