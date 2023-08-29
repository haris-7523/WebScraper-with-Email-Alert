const cheerio = require('cheerio');
const fetch = require('node-fetch');
const Email = require('./Email');
const sendMail = Email.sendMail;

const cnn = 'https://lite.cnn.com/';
const string = 'Pakistan';

function getFromCNN(resp) {
    fetch(cnn)
    .then(res => res.text())
    .then(html => {
        resp(html);
    });
}

function getLatestHeadline(data) {
    const $ = cheerio.load(data);
    let Titles = [];
    $('ul').children('li').each(function(i, el) {
        const title = $(el).text();
        const relativeLink = $(el).children('a').attr('href');
        const absoluteLink = new URL(relativeLink, cnn).href; // Convert to absolute link
        Titles.push({
            title: title,
            link: absoluteLink
        });
    });
    return Titles[0];
}

function compare() {
        getFromCNN((data)=>{
            let previousHeadline  = getLatestHeadline(data)
            setTimeout(()=>{
                getFromCNN((data)=>{
                   let newestHeadline = getLatestHeadline(data);
                 if(newestHeadline.title !== previousHeadline.title) {
                     console.log('New article found!');
                     if(newestHeadline.title.includes(string)){
                       console.log('Pakistan related article. Sending email') 
                       sendMail('Pakistan related article released!',newestHeadline.title,newestHeadline.link,url)
                      } 
                 } 
                })
            },2*1000)
        })
    }


setInterval(compare,10*1000);


    