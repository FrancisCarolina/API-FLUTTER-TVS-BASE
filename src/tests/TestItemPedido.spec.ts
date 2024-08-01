const request = require("supertest");
import { Pedido } from "../models/Pedido";
import { app } from "../server"; // Certifique-se de que o caminho está correto

describe("Teste da Rota incluirItemDoPedido", () => {
  let pedidoNovoId: number;

  it("Deve incluir um novo item do pedido com sucesso", async () => {
    const novoItem = {
        id_pedido: 1,
        id_produto: 3,
        qtdade: 3
    };

    const response = await request(app).post("/incluirItemDoPedido").send(novoItem);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id_pedido).toBe(novoItem.id_pedido);
    expect(response.body.id_produto).toBe(novoItem.id_produto);
    expect(response.body.qtdade).toBe(novoItem.qtdade);

    pedidoNovoId = response.body.id; // Armazena o ID do pedido recém-criado para limpeza posterior
  });

  it("Deve retornar erro ao tentar incluir um item para um pedido inválido", async () => {
    const novoItem = {
        id_pedido: 99999,
        id_produto: 3,
        qtdade: 3
    };

    const response = await request(app).post("/incluirItemDoPedido").send(novoItem);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", 'Pedido ou Produto não encontrado');
  }); 

  it("Deve retornar erro ao tentar incluir um item para um produto inválido", async () => {
    const novoItem = {
        id_pedido: 1,
        id_produto: 9999,
        qtdade: 3
    };

    const response = await request(app).post("/incluirItemDoPedido").send(novoItem);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", 'Pedido ou Produto não encontrado');
  }); 

  afterAll(async () => {
    if (pedidoNovoId) {
      await Pedido.destroy({ where: { id: pedidoNovoId } });
    }
  });
});