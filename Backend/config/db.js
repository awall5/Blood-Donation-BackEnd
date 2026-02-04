const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_DB_URL, {
        dbName: "backend-template-db",
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        console.log("-------- DB connected --------");
    })
    .catch((err) => {
        console.log("----- DB connection error -----");
        console.log(err.message);
        console.log("----- ----------------- -----");
    });

mongoose.connection.on('disconnected', () => {
    console.log('-------- DB disconnected --------');
});

mongoose.connection.on('reconnected', () => {
    console.log('-------- DB reconnected --------');
});
