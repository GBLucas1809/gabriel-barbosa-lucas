const candidatoService = require('../services/candidato');

async function createCandidato(req, res){
    const { cpf, nome, data_nascimento, profissoes } = req.body;
    
    const data = {
        cpf,
        nome,
        data_nascimento,
        profissoes
    }

    const create_candidato = await candidatoService.createCandidato(data);

    if(create_candidato.sucess === true){
        const { candidato } = create_candidato.candidato;

        res.status(200).send(
            {
                sucess: true,
                candidato
            }
        );
    }
    else{
        res.status(create_candidato.status_code).send(
            {
                sucess: false,
                error_message: create_candidato.message
            }
        );
    }


}

async function getCandidato(req, res){
    const { cpf } = req.body;

    const get_candidato = await candidatoService.getCandidato(cpf);

    if(get_candidato.sucess === true){
        res.status(200).send(
            {
                sucess: true,
                candidato: get_candidato.candidato
            }
        )
    }else{
        res.status(get_candidato.status_code).send(
            {
                sucess: false,
                error_message: get_candidato.message
            }
        );
    }
}

async function listCandidatos(req, res){

    //A requisição passa valor de limit, offset e o nome de uma profissão
    const { limit, offset, role } = req.body;

    const get_candidatos = await candidatoService.getCandidatos;

    if(get_candidatos.sucess === true){
        res.status(200).send(
            {
                sucess: true,
                candidatos: get_candidatos.candidatos
            }
        )
    }else{
        res.status(get_candidatos.status_code).send(
            {
                sucess: false,
                error_message: get_candidatos.message
            }
        );
    }
};


module.exports = {
    createCandidato,
    getCandidato,
    listCandidatos,
};