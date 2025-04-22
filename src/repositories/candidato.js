const db = require('../config/database');

async function createCandidato(cpf, nome, data_nascimento, profissoes){
    try{
        const get_candidato = await db.query("SELECT * FROM CANDIDATO WHERE cpf = $1", [cpf]);

        if(get_candidato.sucess === false){
            const create_candidato = await db.query("INSERT INTO CANDIDATO (cpf, nome, data_nascimento, profissoes) VALUES ($1, $2, $3, $4) RETURNING *", [cpf, nome, data_nascimento, profissoes]);

            if(create_candidato.rowCount > 0){
                return {
                    sucess: true,
                    candidato: create_candidato.rows[0],
                    status_code: 201
                }
            }else{
                return {
                    sucess: false,
                    message: "Candidato não encontrado",
                    status_code: 404
                }
            }
        }
        else{
            return {
                sucess: false,
                message: "Candidato já existe",
                status_code: 409
            }
        }

    }catch(err){
        return {
            sucess: false,
            message: err,
            status_code: 500
        }
    }
}

async function getCandidato(cpf){
    try{
        const get_candidato = await db.query("SELECT * FROM CANDIDATO WHERE cpf = $1", [cpf]);

        if(get_candidato.rowCount > 0){
            return {
                sucess: true,
                candidato: get_candidato.rows[0],
                status_code: 200
            }
        }else{
            return {
                sucess: false,
                message: "Candidato não encontrado",
                status_code: 404
            }
        }
        
    }catch(err){
        return {
            sucess: false,
            message: err,
            status_code: 500
        }
    }
}

async function listCandidatosByRole(limit, offset, role){

    try{
        const list_candidatos = await db.query("SELECT * FROM CANDIDATO WHERE profissoes=ANY($1) LIMIT $2 OFFSET $3", [role, limit, offset]);

        if(list_candidatos.rowCount > 0){  
            return {
                sucess: true,
                candidatos: list_candidatos.rows[0],
                status_code: 200
            }
        }else{
            return {
                sucess: false,
                message: "Candidatos não encontrados"
            }
        }
        
    }catch(err){
        return {
            sucess: false,
            message: err,
            status_code: 500
        }
    }

};


module.exports = {
    createCandidato,
    getCandidato,
    listCandidatosByRole,
};