const puppeteer = require('puppeteer'),
      moment = require('moment');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    var municipio = 231330,
        uf = 23,
        ano = 2017,
        periodo = 2;

    await page.goto(`http://siops.datasus.gov.br/consleirespfiscal.php?S=1&UF=${uf}&Municipio=${municipio};&Ano=${ano}&Periodo=${periodo}`);
    await page.click('#container > div:nth-child(2) > form > div:nth-child(3) > div > input[type="Submit"]:nth-child(2)');
    await page.waitFor(5000);

    const result = await page.evaluate(() => {
        let ano_execicio = document.querySelector('#arearelatorio > div.informacao > div > div:nth-child(2) > table > tbody > tr:nth-child(5) > td').innerText;
        let data_homologada = document.querySelector('#arearelatorio > div.informacao > div > div:nth-child(2) > table > tbody > tr:nth-child(6) > td').innerText;
        let percentual = document.querySelector('#arearelatorio > div.informacao > div > table:nth-child(15) > tbody > tr > td.tdr.caixa').innerText;

        return { 'ano_execicio': ano_execicio,
            'data_homologada': data_homologada,
            'percentual' : percentual
        }
    });
    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value.ano_execicio, value.data_homologada, value.percentual);
}).catch((err) => {
    console.log("Erro na pagina SIPOS ", err);
});