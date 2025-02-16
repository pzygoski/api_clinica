import pool from './conexao.js'; 

export async function retornaMedicos() {
    const conexao = await pool.getConnection();
    const query = "SELECT id, nome, telefone, email, especialidade FROM medicos ORDER BY nome ASC";
    const [medicos] = await conexao.query(query);
    
    for (let medico of medicos) {
        const [especialidade] = await conexao.query('SELECT especialidade FROM especialidades WHERE id = ?', [medico.especialidade]);
        medico.especialidade = especialidade[0] ? especialidade[0].especialidade : 'Desconhecida';
    }
    
    conexao.release();
    return medicos;
}

export async function retornaMedicoNome(nome) {
    const conexao = await pool.getConnection();
    const [medicos] = await conexao.query(
        'SELECT id, nome, telefone, email, especialidade FROM medicos WHERE LOWER(nome) LIKE LOWER(?) ORDER BY nome ASC', 
        ['%' + nome + '%']
    );

    for (let medico of medicos) {
        const [especialidade] = await conexao.query('SELECT especialidade FROM especialidades WHERE id = ?', [medico.especialidade]);
        medico.especialidade = especialidade[0] ? especialidade[0].especialidade : 'Desconhecida';
    }
    
    conexao.release();
    return medicos;
}

export async function retornaMedicoEspecialidade(especialidade) {
    const conexao = await pool.getConnection();
    const [especialidadeResult] = await conexao.query(
        'SELECT id FROM especialidades WHERE LOWER(especialidade) LIKE LOWER(?)', 
        ['%' + especialidade + '%']
    );
    
    if (especialidadeResult.length === 0) {
        conexao.release();
        return []; 
    }
    
    const especialidadeId = especialidadeResult[0].id;
    const [medicos] = await conexao.query(
        'SELECT id, nome, telefone, email, especialidade FROM medicos WHERE especialidade = ? ORDER BY nome ASC', 
        [especialidadeId]
    );

    for (let medico of medicos) {
        const [especialidade] = await conexao.query('SELECT especialidade FROM especialidades WHERE id = ?', [medico.especialidade]);
        medico.especialidade = especialidade[0] ? especialidade[0].especialidade : 'Desconhecida';
    }
    
    conexao.release();
    return medicos;
}