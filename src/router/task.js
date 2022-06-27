const express = require("express");
const router = new express.Router();
const Task = require("../models/task.js");
const auth = require("../middleware/auth.js")
// const app= express()
router.post("/tasks",auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
      ...req.body,
      owner:req.user._id
    })
    try {
      await task.save();
      res.status(200).send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  router.get("/tasks",auth, async (req, res) => {
    const match ={};
    const sort = {};
    if(req.query.completed){
      req.query.completed = match.completed === "true"
    }
    if(req.query.sortBy){
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1]==="desc" ? -1: 1;
    }
    // else{
    //   req.query.completed == match.completed === "false"
    // }
    try {
      // const task = await Task.find({owner:req.user._id});
      await req.user.populate({path:"tasks",
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
        // sort:{
        //   createdAt: -1
        // }
      }
    }).execPopulate();
      res.send(req.user.tasks)
      // res.status(200).send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  router.get("/tasks/:id",auth, async (req, res) => {
    const _id = req.params.id;
  
    try {
      // const task = await Task.findById(id);
      const task = await Task.findOne({_id,owner:req.user._id})
      
      if (!task) {
        res.status(400);
      }
      res.status(200).send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  router.patch("/tasks/:id",auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
      return res.status(500).send({ error: "Invalid parameter" });
    }
    try {
      const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
      
      if (!task) {
        res.status(400).send({ error: "task is not present" });
      }
      updates.forEach((update)=>{
        task[update]=req.body[update]
      })
      await task.save();

      res.status(200).send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
      // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});

      if(!task){
        res.status(400).send("task not found")
      }
      res.status(200).send(task)
    }catch (e){
      res.status(500).send(e);
    }
   
  })
  module.exports = router;