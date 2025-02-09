import express from 'express';
import pool from './servico/conexao.js';
import { retornaMedicos, retornaMedicoNome, retornaMedicoEspecialidade } from './servico/retornaMedicos_servico.js';

const app = express();

app.get('/medicos', async (req, res) => {
    let medicos = [];
    const nome = req.query.nome;
    const telefone = req.query.telefone;
    const email = req.query.email;
    const especialidade = req.query.especialidade;


    if (typeof nome === 'undefined' && typeof telefone === 'undefined' && typeof email === 'undefined' && typeof especialidade === 'undefined') {
        medicos = await retornaMedicos();
    }
    else if (typeof nome !== 'undefined') {
        medicos = await retornaMedicoNome(nome);
    }
    else if (typeof especialidade !== 'undefined') {
        medicos = await retornaMedicoEspecialidade(especialidade);
    }

    if (medicos && medicos.length > 0) {
        res.json(medicos);
    } else {
        res.status(404).json({mensagem: "Nenhum médico encontrado" });
    }
})

app.listen(9000, async () => {
    const data = new Date();
    console.log('Servidor node iniciado em: '+data);
})