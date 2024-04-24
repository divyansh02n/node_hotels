const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

// POST method to get MENU ITEMS
router.post('/', async (req,res) => {
    try{
        const data = req.body
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data Saved Successfully...',response);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error.'})
    }
})

// GET method to get Menu Items
router.get('/', async (req,res) => {
    try{
        const data = await MenuItem.find();
        console.log("Data Fetched Successfully...")
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})


// Parameterized routing 
router.get('/:tasteType', async(req,res) => {
    try{
        const tasteType = req.params.tasteType
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == "spicy"){
            const response = await MenuItem.find({taste: tasteType});
            console.log("Data Fetched Successfully", response);
            res.status(500).json(response);
        }else{
            res.status(404).json({error: "Invaild server error."})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error."})
    }
})
module.exports = router;