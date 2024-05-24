import { Request, Response, Router } from 'express'
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const router = Router()
const prisma = new PrismaClient();

import * as jwt from 'jsonwebtoken'
import { authenticatoken } from "../../helper";

//User Login
router.post("/login", async (req: Request, res: Response) => {
    // console.log(req.body);
    
    try {
        const { username,password } = req.body;
        console.log({username,password});
        
        const user = await prisma.user.findFirst(
            {
                where: {
                    username: {
                        equals: username,
                    }
                }

            }
        );

        if (!user) throw new Error('Username does not exist')
        const hash = user.password;
        const hashpass = bcrypt.compareSync(password, hash)
        console.log(user);
        console.log(user.userlevel);
        if (hashpass) {
            const accessToken = jwt.sign({
                id: user.id,
                userlevel: user.userlevel,
            }, process.env.JWT_PRIVATE_KEY)
            res.send({
                accessToken: accessToken,
                level:user.userlevel,
                uname : user.username,
            });
        }else{
            throw new Error('Password is incorrect')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }

});

//User Registration
router.post("/", async (req: Request, res: Response) => {
    try {
        const { username, email, password, userlevel } = req.body;
        // console.log(req.body);
        const salt = await bcrypt.genSalt();
        const hashpass = bcrypt.hashSync(password, salt);
        const user = await prisma.user.create({
            data: {

                username: username,
                email: email,
                password: hashpass,
                userlevel : Number(userlevel)
                
            },
        });
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});

router.get("/chkusername/", async (req: Request, res: Response) => {
    try {
        const {username} = req.body ;
        console.log(req.body)
        const user = await prisma.user.findFirst(
            {
                where: {
                    username : username,
                }
            }
        );
        res.send(user);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.get("/chkemail/", async (req: Request, res: Response) => {
    try {
        const {email} = req.body ;
        console.log(req.body)
        const user = await prisma.user.findFirst(
            {
                where: {
                    email : email,
                }
            }
        );
        res.send(user);

    } catch (error) {
        res.status(500).send(error)
    }

});



router.use(authenticatoken)

//get user by email
router.get("/byemail", async (req: Request, res: Response) => {
    try {
        const {email} = req.body ;
        console.log(req.body)
        const user = await prisma.user.findFirst(
            {
                where: {
                    email : email,
                }
            }
        );
        res.send(user);

    } catch (error) {
        res.status(500).send(error)
    }

});


//delete (deactivate user)
router.delete("/:email", async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const deleteUser = await prisma.user.delete({
            where: {
                email: email
            }
        });
        res.send(deleteUser);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});

router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany(
            {
                orderBy: {
                    id: 'asc'
                }

            }
        );
        res.send(users);

    } catch (error) {
        res.status(500).send(error)
    }

});

router.put("/", async (req: Request, res: Response) => {
    try {
        const { id, username, email, userlevel, password } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt();
        const hashpass = bcrypt.hashSync(password, salt);

        const updateUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                username: username,
                email: email,
                userlevel: Number(userlevel),
                password: hashpass,
            }
        });
        res.send(updateUser);

    } catch (error) {
        res.status(500).send(error)
        console.log(error);

    }

});



export default router 