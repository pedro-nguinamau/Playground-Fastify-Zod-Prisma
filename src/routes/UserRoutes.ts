//Todas as Rotas da manipulação do model User se encontram aqui

import { CreateUser } from "../Controllers/UserControllers";
import { GetUser } from "../Controllers/UserControllers"
import { DeletUser } from "../Controllers/UserControllers";
import { FastifyInstance } from "fastify";

export default async function CreateUserRoutes(fastify: FastifyInstance) {
    interface user {
        nome: string,
        email: string
    }

    fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body: string, done) => {
        if (body === '') {
            done(null, {}); // Trate o corpo vazio como um objeto vazio
        } else {
            done(null, JSON.parse(body));
        }
    });
    

    fastify.post<{ Body: user}>("/user/create", async(request, reply) => {
        try{
            const User = await CreateUser(request.body)
            reply.header('Content-Type', 'aplcation/json').status(201).send({user: User})

        } catch (error){
            reply.send({erro: error})
        }
    })

    fastify.get('/user/get', async(request, reply) => {
        try{
            const user = await GetUser()
            reply.header('Content-Type', 'aplcation/json').status(200).send({ user: user})
        } catch (error) {
            console.error(error)
        }
    })

    fastify.delete<{ Params: { id: number } }>("/user/delete/:id", async (request, reply) => {
        try {
            const userId = Number(request.params.id);
            const userDeleted = await DeletUser(userId);
            return reply.send({ user: userDeleted });
        } catch (error) {
            console.error('Error deleting user:', error);
            return reply.status(500).send({ error: "Failed to delete user" });
        }
    });
    
}