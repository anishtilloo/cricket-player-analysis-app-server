// import packages or dependencies
import express from "express";
// import cors from "cors";
import path from "path";

const PORT = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`); 
})
