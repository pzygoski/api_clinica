import pool from "./conexao.js";

export async function retornaPacientes() {
    const conexao = await pool.getConnection();
    try {
        const pacientes_tb = await conexao.query(
            `SELECT id, nome, telefone, email, cpf FROM pacientes ORDER BY nome`);
        return pacientes_tb[0];
        
    } finally {
        conexao.release();
    }
}

export async function retornaPacientesNome(nome) {
    const conexao = await pool.getConnection();
    try {
        const pacientes_tb = await conexao.query(
            `SELECT id, nome, telefone, email, cpf FROM pacientes WHERE nome LIKE ? ORDER BY nome`,[`%${nome}%`]);
        return pacientes_tb[0];

    } finally {
        conexao.release();
    }
}