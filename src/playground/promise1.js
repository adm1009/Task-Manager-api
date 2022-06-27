require("../db/mongoose.js");
const Task = require("../models/task.js");

// Task.findByIdAndDelete("62ac7b185cbe3f01e444fb2b").then(()=>{
//     console.log("id removed");
//     return Task.countDocuments({completed:false})
// }).then((count)=>{
//     console.log(count);
// }).catch((e)=>{
//     console.log(e);
// })


const deleteTaskandCount =async(id,taskStatus)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:taskStatus});
    return count;
}

deleteTaskandCount("62b03d43b2e2a219c0fbeaa4",false).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log("error "+e);
})