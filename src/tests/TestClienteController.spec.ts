const request = require("supertest");
import * as server from '../server';
const app = server.server;
//import {Request, Response} from 'express';

describe('Teste da rota getClientById', ()=>{
    it('deve retornar o cliente correto quando o ID é válido', async ()=>{
        const clientId = 3;
        const response = await request(app).get(`/clientes/${clientId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', clientId);

    }),
    it('deve retornar status 404 quando ID não existe', async ()=>{
        const clientId = 99999;
        const response = await request(app).get(`/clientes/${clientId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', "Cliente não encontrado");

    })
})
