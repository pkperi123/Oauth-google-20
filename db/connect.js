const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url).then(()=>console.log("conected to th db...")).catch((err)=>console.log(err));
}

module.exports = connectDB