import express from 'express' ;
import cors from 'cors' ;
import { PrismaClient } from "@prisma/client";
import UserRouter from './routers/User/user.router' ;
import ImageRouter from './routers/Images/image.router' ;

const app = express()

app.use(cors())
app.use(express.json())
const prisma =new PrismaClient();

app.use('/user' ,UserRouter )
app.use('/image' , ImageRouter)


app.listen(5001 , () => {
    console.log("Server running on port 5001")
})
