const express = require("express");
const noteModel = require("./models/note.model");
const { model } = require("mongoose");

const app = express();
app.use(express.json());

/* 
POST/notes  => create a note
GET/notes  => update a note
DELETE/notes/:id  => Delete a note
PATCH/notes/:id  => update a note
*/

app.post("/notes",async (req,res)=> {
    const data = req.body; // {title, description}
    await noteModel.create({
        title: data.title,
        description: data.description
    });

    res.status(201).json({
        message:"Note created"
    })
});

app.get("/notes",async (req,res) => {

    const notes = await noteModel.find() // retunn an array []

    /*  
    find => [], gives an empty array eventhough the condition didnt match
    findOne => {} or null 
    */
    res.status(200).json({
        message:"Notes fetched successfully",
        notes:notes
    })
    // const notes = req.body;
})

app.delete("/notes/:id",async (req, res) => {
    const id = req.params.id
    console.log(id)
    await noteModel.findByIdAndDelete({
        _id:id
    })
    res.status(200).json({
        message:"Note deleted successfully"
    })
})

app.patch("/notes/:id",async (req,res) => {
    const id = req.params.id;
    const description = req.body.description;

    await noteModel.findOneAndUpdate({
        _id:id
    },
    {
        description:description
    })

    res.status(200).json({
        message:"note updated successfully"
    })
})

module.exports = app;

