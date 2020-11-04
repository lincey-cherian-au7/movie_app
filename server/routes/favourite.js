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

router.post("/addtofavourite", auth, (req, res) => {
  const favourite = new Favourite(req.body)
  favourite.save((err,doc)=>{
    if(err) return res.json({success:false,err})
    res.status(200).json({success:true})
  })
});

router.post("/removefromfavourite", auth, (req, res) => {
    Favourite.findOneAndDelete({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,doc})
    })
});

router.post("/getfavouriteMovies", auth, (req, res) => {
    Favourite.find({"userFrom":req.body.userFrom})
    .exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,doc})
    })
});
module.exports = router;
