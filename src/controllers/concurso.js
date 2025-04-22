const concursoService = require('../services/concurso');


async function createConcurso(req, res){
    const { codigo, orgao, edital, profissoes } = req.body;

    const data = {
        codigo,
        orgao,
        edital,
        profissoes
    };

    const create_concurso = await concursoService.createConcurso(data);

    if(create_concurso.sucess === true){
        res.status(201).send(
            {
                sucess: true,
                concurso: create_concurso.concurso
            }
        );
    } 
    else{
        res.status(create_concurso.status_code).send(
            {
                sucess: false,
                error_message: create_concurso.message
            }
        );
    }
}

async function getConcurso(req, res){
    const { codigo } = req.params;

    //Faz a chamada de método de busca da camada Service
    const get_concurso = await concursoService.getConcurso(codigo);

    //Se a busca for bem-sucedida, retorna json com o concurso encontrado
    if(get_concurso.sucess === true){
        res.status(200).send(
            {
                sucess: true,
                concurso: get_concurso.concurso
            }
        );
    }else{
        //Se houver algum erro, retorna json com mensagem de erro
        res.status(get_concurso.status_code).send(
            {
                sucess: false,
                error_message: get_concurso.message
            }
        );
    }
}

async function listConcursos(req, res){
    //A requisição recebe um valor de limit, offset e uma role para ser usada na filtragem da consulta
    const { limit, offset, role } = req.body;

    //Faz a chamada de método de busca da camada Service
    const get_concursos = await concursoService.getConcursos(limit, offset, role);

    //Se a busca for bem-sucedida, retorna json com a lista dos concursos filtrados por profissão
    if(get_concursos.sucess === true){
        res.status(200).send(
            {
                sucess: true,
                concursos: get_concursos.concursos
            }
        );
    //Se houver algum erro, retorna json com mensagem de erro
    }else{
        res.status(get_concursos.status_code).send(
            {
                sucess: false,
                error_message: get_concursos.message
            }
        );
    }

};


module.exports = {
    createConcurso,
    getConcurso,
    listConcursos,
};