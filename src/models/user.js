const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    unique:true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email Error");
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("age Error");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password not to be password");
      }
    },
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
  avatar:{
    type:Buffer
  }
});

userSchema.virtual("tasks",{
  ref:"Task",
  localField:"_id",
  foreignField:"owner"
})

userSchema.methods.toJSON = function () {
   const user = this
   const userObject = user.toObject();
    
   delete userObject.password;
   delete userObject.tokens;
   delete userObject.avatar;

   return userObject;
}

userSchema.methods.generateAuthToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

userSchema.statics.findByCredentials= async (Email,password)=>{
    const user = await User.findOne({Email:Email});

    if(!user){
        throw new Error("unable to login")
    };

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    return user;
}
userSchema.pre("save", async function (next) {
  const user = this;
//   console.log("just before saving");
if(user.isModified("password")){
    user.password = await bcrypt.hash(user.password,8)
}
  next();
});

userSchema.pre("remove", async function(next){
    
  const user = this;
  await Task.deleteMany({owner:user._id})
  next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
