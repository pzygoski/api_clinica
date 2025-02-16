import express from 'express';
import { retornaMedicos, retornaMedicoNome, retornaMedicoEspecialidade } from './servico/retornaMedicos_servico.js';
import { retornaPacientes, retornaPacientesNome } from './servico/retornaPacientes_servico.js';

const app = express();

app.get('/medicos', async (req, res) => {
    let medicos = [];
    const { nome, especialidade } = req.query;

    if (!nome && !especialidade) {
        medicos = await retornaMedicos();
    } else if (nome) {
        medicos = await retornaMedicoNome(nome);
    } else if (especialidade) {
        medicos = await retornaMedicoEspecialidade(especialidade);
    }

    if (medicos.length > 0) {
        res.json(medicos);
    } else {
        res.status(404).json({ mensagem: "Nenhum médico encontrado" });
    }
});

app.get('/pacientes', async (req, res) => {
    try {
        let pacientes;
        const nome = req.query.nome;

        if (!nome) {
            pacientes = await retornaPacientes();
        } else {
            pacientes = await retornaPacientesNome(nome);
        }

        if (pacientes.length > 0) {
            res.json(pacientes);
        } else {
            res.status(404).json({ erro: "Nenhum paciente encontrado" });
        }

    } catch (error) {
        console.error("Erro na API:", error.message);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

app.listen(9000, () => {
    console.log(`Servidor node iniciado em: ${new Date()}`);
});
