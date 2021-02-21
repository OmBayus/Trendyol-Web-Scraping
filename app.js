require('dotenv').config()
const puppeteer = require("puppeteer")
const $ = require("cheerio")
const CronJob = require("cron").CronJob
const nodemailer = require("nodemailer")

if (process.argv.length < 3) {
      console.log('Please provide the link as an argument: node app.js "trendyol-urun-link"')
      process.exit(1)
}

const url = process.argv[2]

async function configureBrowser(){
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url)
      return page
}

async function checkPrice(page){
      
      await page.reload()
      await page.evaluate(() => {
            document.querySelector('.omc-mr-btn').click();
      });
      let html = await page.evaluate(()=> document.body.innerHTML)

      var yourPrice = Number($(".prc-dsc",html)['0'].children[0].data.replace(" TL","").replace(".","").replace(",","."))
      var cheapest = yourPrice

      $(".mrc-new-prc span",html).each(function(){
            let dollarPrice = $(this).text()

            var currentPrice = Number(dollarPrice.replace(" TL","").replace(".","").replace(",","."))

            if(cheapest > currentPrice){
                  cheapest = currentPrice
            }
      })

      if(cheapest < yourPrice){
            sendNotification(cheapest);
      }
}

async function startTracking() {
      const page = await configureBrowser();
    
      let job = new CronJob('* */30 * * * *', function() { //runs every 30 minutes in this config
        checkPrice(page);
      }, null, true, null, null, true);
      job.start();
  }
  
  async function sendNotification(price) {
  
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
      });
    
      let textToSend = 'Price dropped to ' + price;
      let htmlText = `<a href=\"${url}\">Link</a>`;
    
      let info = await transporter.sendMail({
        from: ('"Price Tracker" ' + process.env.EMAIL),
        to: process.env.TOEMAIL,
        subject: 'Price dropped to ' + price, 
        text: textToSend,
        html: htmlText
      });
      console.log("Message sent: %s", info.messageId);
}
  
  startTracking();