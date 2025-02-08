import express from 'express';
import pool from './servico/conexao.js';
import { retornaMedico } from './servico/retornaMedicos_servico.js';

const app = express();

app.get('/medicos', async (req, res) => {
    let medicos;
    const nome = req.query.nome;
    const telefone = req.query.time;
    if (typeof ano === 'undefined' && typeof time === 'undefined') {
        campeonatos = await retornaCampeonatos();
    }
    else if (typeof ano !== 'undefined') {
        campeonatos = await retornaCampeonatosAno(ano);
    }
    else if (typeof time !== 'undefined') {
        campeonatos = await retornaCampeonatosTime(time);
    }
    if (campeonatos.length > 0) {
        res.json(campeonatos);
    } else {
        res.status(404).json({mensagem: "Nenhum campeonato encontrado" });
    }
})

app.listen(9000, async () => {
    const data = new Date();
    console.log('Servidor node iniciado em: '+data);

    const conexao = await pool.getConnection();

    console.log(conexao.threadId);

    conexao.release();
})