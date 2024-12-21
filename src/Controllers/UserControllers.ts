import {  PrismaClient } from "@prisma/client";
import { userSchema } from "../schemas/UserChema";
import z from "zod";
// Curso Básic consumismo cientifico

const prisma = new PrismaClient()
interface UserDto {
    nome: string,
    email: string,
}

interface UserID {
    id: number
}

export async function CreateUser(data: UserDto)  {
        try {
            const ValidateData = userSchema.parse(data)
            const user =  await prisma.user.create({
                data: ValidateData
            })
            console.log('Usuario Criado', user)
            return user
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error("Erro de validação:", error.errors);
              } else {
                console.error("Erro inesperado:", error);
              }
              throw error;

        }
    }

   
export async function GetUser() {
    try{
        const user = await prisma.user.findMany()
        return user
    } catch (error) {
        console.log(error)
    }
    
}


export async function DeletUser(UserId: number) {
    try{
        const user = await prisma.user.delete({
            where: {
                id: UserId
            }
        })
        console.log('sucess0')
        return user

    } catch (error) {
        console.error(error)

    }
}