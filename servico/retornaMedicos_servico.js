import poll from './conexao.js';

export async function retornaMedico() {
    const conexao = await pool.getConnection();
    const query = "SELECT id, nome, telefone, email, especialidade FROM medicos";
    const medicos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

async function executaQuery(conexao, query) {
    const resultado_query = await conexao.query(query);
    const resposta = resultado_query[0];
    return resposta
}