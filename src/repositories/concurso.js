const db = require('../config/database');

async function createConcurso(codigo, orgao, edital, profissoes){
    try{
        const get_concurso = getConcursoByCode(codigo);

        if(get_concurso.sucess === false){
            const insert_concurso = await db.query("INSERT INTO CONCURSO (codigo, orgao, edital, profissoes) VALUES ($1, $2, $3, $4) RETURNING *", [codigo, orgao, edital, profissoes]);
        }
        else{
            return {
                sucess: false,
                message: "Concurso já cadastrado",
                error_code: 409    
            };
        }
    }
    catch(err){
        return {
            sucess: false,
            message: err,
            error_code: 500
        };
    }
}

async function getConcursoByCode(codigo){
    try{
        const get_concurso = await db.query("SELECT * FROM CONCURSO WHERE codigo = $1", [codigo]);

        if(get_concurso.rowCount > 0){
            return {
                sucess: true,
                concurso: get_concurso.rows[0]
            };
        }
        else{
            return {
                sucess: false,
                message: "Nenhum concurso encontrado",
                error_code: 404
            };
        }
        
    }
    catch(err){
        return {
            sucess: false,
            message: err,
            error_code: 500
        };
    }
}

async function listConcursosByRole(limit, offset, role){

    try{
        const list_concursos = await db.query("SELECT * FROM CONCURSO WHERE profissoes=ANY($1) LIMIT $2 OFFSET $3", [role, limit, offset]);

        if(list_concursos.rowCount > 0){
            return {
                sucess: true,
                concursos: list_concursos.rows[0]
            }
        }
        else{
            return {
                sucess: false,
                message: "Nenhum concurso encontrado",
                error_code: 404
            }
        }
        
    }
    catch(err){
        return {
            sucess: false,
            message: err,
            error_code: 500
        }
    }
};


module.exports = {
    createConcurso,
    listConcursosByRole,
    getConcursoByCode,
};