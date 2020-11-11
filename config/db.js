const mongoos = require("mongoose");

const connectDB = async () => {
    const conn = await mongoos.connect(process.env.URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
};

module.exports = connectDB;
