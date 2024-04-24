const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')

// POST route to add a Person
router.post('/', async (req,res) => {
    try{
        const data = req.body   // Asssuming the req.body contains the person data

        // Create a new Person data using Mongoose Model
        const newPerson = new Person(data);
        
        // Save the new PErson to Database
        const response = await newPerson.save();
        console.log('Data Saved',response);
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

router.get('/', async (req,res) => {
    try{
        const data = await Person.find();
        console.log('Data Fetched Successfully...');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})


// Parameterized routing 
router.get('/:workType', async(req,res) => {
    try{
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log("Data Fetched Successfully...");
            res.status(200).json(response); 
        }
        else{
            res.status(404).json({error: 'Invalid Work Type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

// UPDATE (PUT)
router.put('/:id', async(req,res) => {
    try{
       const personId = req.params.id;
       const updatePersonData = req.body;
       
       const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
        new: true,
        runValidators: true
       })

       if(!response){
        res.status(404).json({error: "Person not found"})
       }

       console.log("Data Updated Successfully...");
       res.status(500).json(response);

    }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
    }
})

// DELETE 
router.delete('/:id', async(req,res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        
        if(!response){
            res.status(404).json({error: "Person not Found."})
        }
        console.log("Data deleted Successfully.");
        res.status(500).json({message: "Person record deleted Successfully."})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
    
})
module.exports = router;