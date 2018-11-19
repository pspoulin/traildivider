const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('fs');
const datetime = require('node-datetime');

const engURL = "https://www.pc.gc.ca/apps/tcond/cond_e.asp?opark=100092";


async function fetchAndSave(url, prefix) {
    let page = await axios.get(url);

    let $ = cheerio.load(page.data);
    let dt = datetime.create();
    let today = dt.format('Y-m-d');
    console.log(today);


    $(".table-condensed").each(function (i, element) {

        //console.log("==================");
        //console.log($(this).html());
        fs.writeFileSync(prefix + " " + today + " " + i + ".html", $(this).html());
    });

}

fetchAndSave(engURL, "ENG");