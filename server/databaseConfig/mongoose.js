const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGOOSE_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                dbName: process.env.DB_NAME
            });
      console.log(`We use ${process.env.DB_NAME} database`);
      console.log(`MongoDb connected ${connect.connection.host}`);
    }catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = dbConnection;
