var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express();
    
app.get('/siops', function(req, res) {
    url = 'http://siops.datasus.gov.br/consleirespfiscal.php?';
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            $('#cmbPeriodo option').each(function(i) {
                //Teria como chamar aqui o crawler passando os parametros ?
                //Dependendo do retorno passaria novos parametros ate que o retorno seja
                //valido, caso seja obtido pegar este ultimo retorno e 
                //salva na tabela do dim.
                console.log($(this).val());
            });
        }
    })
})
app.listen('8081')
console.log('Executando na porta 8081...');
exports = module.exports = app;