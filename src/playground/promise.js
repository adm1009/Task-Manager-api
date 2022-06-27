require("../db/mongoose.js");
const User =require("../models/user.js");
// User.findByIdAndUpdate("62affba706512803b4328c4f",{age:12}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:12})
// }).then((counted)=>{
//     console.log(counted);
// }).catch((e)=>{
//         console.log(e);
//     });

    const userAndUpdate =async (id,age)=>{
        const user = await User.findByIdAndUpdate(id,{age:age});
        const count = await User.countDocuments({age:age});
        return count;
    }

    userAndUpdate("62affd1f4b39d3205cec519e",12).then((result)=>{
        console.log(result);
    }).catch((e)=>{
        console.log(e);
    });
