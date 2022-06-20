const mongoose = require('mongoose');


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    }).then((conn)=>{console.log(`MongoDB connected on port ${conn.connection.port}`)}).catch(err => console.log(err));

}

module.exports = connectDB;