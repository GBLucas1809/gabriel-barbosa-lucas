const concursoRepos = require('../repositories/concurso');
const crypt = require('../config/criptography');

async function createConcurso(data){
    const { codigo, orgao, edital, profissoes } = data;

    if(codigo != null && orgao != null && edital != null && profissoes != null){

        const create_concurso = await concursoRepos.createConcurso(codigo, orgao, edital, profissoes);

        if(create_concurso.sucess === true){
            return {
                sucess: true,
                concurso: create_concurso.concurso,
                status_code: 201
            };
        }
        else{
            const { error_code } = create_concurso;

            if(error_code === 404){
                return {
                    sucess: false,
                    status_code: create_concurso.error_code,
                    message: create_concurso.message
                };
            } 
            else{
                return { 
                    sucess: false,
                    status_code: create_concurso.error_code,
                    message: "Erro de banco de dados"
                };
            }
        }
    }
    else{
        return {
            sucess: false,
            message: "Faltam valores a serem preenchidos.",
            status_code: 400
        }
    }
}

async function getConcurso(codigo){

    if(codigo != null){
        const get_concurso = await concursoRepos.getConcursoByCode(codigo);

        if(get_concurso.sucess === true){
            return {
                sucess: true,
                concurso: get_concurso.concurso,
                status_code: 200
            };
        }
        else{
            const { error_code } = get_concurso;

            if(error_code === 404){
                return {
                    sucess: false,
                    status_code: get_concurso.error_code,
                    message: get_concurso.message
                };
            } 
            else{
                return { 
                    sucess: false,
                    status_code: get_concurso.error_code,
                    message: "Erro de banco de dados"
                };
            }
        }

    }
    else{
        return {
            sucess: false,
            message: "Faltam valores a serem preenchidos.",
            status_code: 400
        }
    }

}

async function getConcursos(limit, offset, role){
    
    if(limit != null && offset != null && role != null){

        
        const list_concursos = await concursoRepos.listConcursosByRole(limit, offset, role);
            
        if(list_concursos.sucess === true){
            return {
                sucess: true,
                concursos: list_concursos.data,
                status_code: 200
            };
        }
        else{
            const { error_code } = list_concursos;

            if(error_code === 404){
                return {
                    sucess: false,
                    status_code: list_concursos.error_code,
                    message: list_concursos.message
                };
            } 
            else{
                return { 
                    sucess: false,
                    status_code: list_concursos.error_code,
                    message: "Erro de banco de dados"
                };
            }
        } 

    }
    else{
        return {
            sucess: false,
            message: "Faltam valores a serem preenchidos.",
            status_code: 400
        }
    }
}

module.exports = {
    createConcurso,
    getConcurso,
    getConcursos,
};