const candidatoRepos = require('../repositories/candidato');
const crypt = require('../config/criptography');

async function createCandidato(data){
    const { cpf, nome, data_nascimento, profissoes } = data;

    if(cpf != null && nome != null && data_nascimento != null && profissoes != null){

        const create_candidato = await candidatoRepos.createCandidato(cpf, nome, data_nascimento, profissoes);

        if(create_candidato.sucess === true){
            const { candidato, status_code } = create_candidato;
            return {
                sucess: true,
                status_code,
                candidato
            };
        }
        else{
            const { message, status_code } = create_candidato;
            return {
                sucess: false,
                message,
                status_code 
            }
        }

    }else{
        return {
            sucess: false,
            message: "Faltam valores a serem preenchidos.",
            status_code: 400
        }
    }

}

async function getCandidato(cpf){
    if(cpf != null){

        try{
            const get_candidato = await candidatoRepos.getCandidato(cpf);

            if(get_candidato.sucess === true){
                return {
                    sucess: true,
                    candidato: get_candidato.candidato
                };
            }else{
                return {
                    sucess: false,
                    message: get_candidato.message,
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


    }else{
        return {
            sucess: false,
            message: "Faltam valores a serem preenchidos.",
            status_code: 400
        }
    }
}

async function getCandidatos(limit, offset, role){
    
    if(limit != null && offset != null && role != null){

        try{
            const list_candidatos = await candidatoRepos.listCandidatosByRole(limit, offset, role);
            return {
                sucess: true,
                candidatos: list_candidatos.data
            };

        }catch(err){
            return {
                sucess: false,
                message: err,
                status_code: 400
            }
        }


    }else{
        return {
            sucess: false,
            message: "Faltam valores a serem preenchidos.",
            status_code: 400
        }
    }
}

module.exports = {
    createCandidato,
    getCandidato,
    getCandidatos,
};