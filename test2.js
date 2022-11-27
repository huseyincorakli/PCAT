require("dotenv").config();

const url=`mongodb+srv://${process.env.USERNAME_ID}:${process.env.PAROLA}@pcatapp.h8qnibt.mongodb.net/?retryWrites=true&w=majority`;
console.log(url)
