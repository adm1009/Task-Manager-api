//83
// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
//     useNewUrlParser:true,
//     useCreateIndex:true
// });

// const User = mongoose.model("User",{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number 
//     }
// })

// const me= new User({
//     name:"Abhijeet",
//     age:25
// });
// me.save().then(()=>{
//    console.log(me);
// }).catch((e)=>{
//    console.log("Error!"+e);
// })


//84
// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
//     useNewUrlParser:true,
//     useCreateIndex:true
// })

// const Task = mongoose.model("task",{
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     }
// });

// const addTask = new Task({
//     description:"purchase bike",
//     completed:true
// });

// addTask.save().then(()=>{
//     console.log(addTask);
// }).catch((e)=>{
//     console.log("Error!"+e);
// })


//85
// const mongoose = require("mongoose");
// const validator = require("validator");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
//     useNewUrlParser:true,
//     useCreateIndex:true
// });

// const User = mongoose.model("User",{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     Email:{
//         type:String,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Email Error")
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error("age error")
//             }
//         }
//     }
// })

// const me= new User({
//     name:"Abhijeet     ",
//     Email:"ABHI@GMAIL.COM          "
// });
// me.save().then(()=>{
//    console.log(me);
// }).catch((e)=>{
//    console.log("Error!"+e);
// })


//86
// const mongoose= require("mongoose");
// const validator=require("validator");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{useNewUrlParser:true,useCreateIndex:true})


// const User = mongoose.model("User",{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     Email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                throw new Error("Email Error")
//             }
//         }
//     },
//     age:{
//         type:Number,
//         required:true,
//         validate(value){
//             if(value<0){
//                 throw new Error("age Error");
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minLength:7,
//         validate(value){
//             if(value.toLowerCase().includes("password")){
//                 throw new Error("password not to be password")
//             }
//         }
        // validate(value){
        //     if(value.length<6){
        //         throw new Error("password length is invalid")
        //     }
//         // }

//     }
// })

// const me=new User({
//     name:"    abhijeet",
//     Email:"   ABHI@GMAIL.COM",
//     age:34,
//     password:"password"
// });


// me.save().then(()=>{
//     console.log(me);
// }).catch((e)=>{
//     console.log("error"+e);
// });
// const mongoose = require("mongoose");
// const validator = require("validator");

// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{useNewUrlParser:true,useCreateIndex:true});

// const User = mongoose.model("task",{
//     description:{
//         type:String,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const me=new User({
//     description:"new work"
// });
// me.save().then(()=>{
//     console.log(me);
// }).catch((e)=>{
//     console.log("Error "+e);
// });

//8990
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false
})


