/*
O controller é responsável por mediar as requisições HTTP e as respostas entre o frontend e as outras camadas do backend.


Este documento possui por padrão o seguinte formato de estrutura:


//Import de Service
const Xservice = const(<caminho-para>/<Xservice>);


//Métodos do Controller:

async function <nome_do_método>(req, res){
    const { <variaveis> } = req.body; // ou req.query, dependendo do tipo de requisição
    <chamada de método de serviço>
    const metodoService = await Xservice.<nome_do_método>(<variaveis>);
    
    <verificações de retorno da camada de serviço>
    if(metodoService.sucess === true){
        return res.status(metodoService.status_code).json({
            sucess: true,
            <variaveis>: <variaveis>
        });
    }else{
        return res.status(metodoService.status_code).json({
            sucess: false,
            error_message: metodoService.message
        });
    }
}

module.exports = {
    <métodos>,
};

*/