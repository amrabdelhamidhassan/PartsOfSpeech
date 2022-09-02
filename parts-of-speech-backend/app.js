const express=require("express")
const dotenv=require("dotenv")
const fs = require('fs');
const bodyParser = require('body-parser')
const cors =require('cors')
const path=require("path")

const mainRouter=require("./routes/mainRouter")

const app=express();
//Implementing Cors
app.enable('trust proxy')
app.use(cors());
app.options('*',cors())
//Configuring Enviroment Variables
dotenv.config({path:"./config.env"});

const port=process.env.PORT||3000;
//Serving Static Files for deployment
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port,()=>
{
    console.log(`App is running on Port ${port}`)
})
//Reading Data from File
const data = fs.readFileSync('./data/TestData.json',
            {encoding:'utf8'})
//Handling Parsing Req body 
app.use(bodyParser.json())
//Passing Data to API 
app.use('/api',(req,res,next)=>
{
    req.data=data;
    next();
})
//Routes
app.use('/api', mainRouter);
//Serving Static Files for deployment
app.use((req,res,next)=>
{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})