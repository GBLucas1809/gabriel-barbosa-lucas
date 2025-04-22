const router = require('express-promise-router')();

const candidatoController = require('../controllers/candidato');


//criando as rotas da API
router.post('/criarCandidato', candidatoController.createCandidato);
router.get('/buscarCandidato', candidatoController.getCandidato);
router.get('/candidatos', candidatoController.listCandidatos);




module.exports = router;
