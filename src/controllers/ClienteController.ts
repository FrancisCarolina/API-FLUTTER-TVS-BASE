import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
// import { Produto } from '../models/Produto';
// import { Pedido } from '../models/Pedido';
// import { Op } from 'sequelize';

export function listarClientes(){}
export const getClienteById = async (req: Request, res: Response)=>{
    try{
        const clientId = parseInt(req.params.id, 10);
        const cliente = await Cliente.findByPk(clientId);

        if(cliente){
            res.json(cliente);
        }else{
            res.status(404).json({message: 'Cliente não encontrado'});
        }

    }catch(error){
        console.log("Erro ao buscar cliente: ", error);
        res.status(500).json({message: "Erro ao buscar cliente"});
        
    }
}
export function incluirCliente(){}
export function atualizarCliente(){}
export function excluirCliente(){}