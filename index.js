const folderPath = 'C:/Users/saidlykaov/Downloads/Archive/messages/628090942'
const fs = require('fs');
const files = fs.readdirSync(folderPath);
const open = require('open');

var iconv = require('iconv-lite');
var cheerio = require('cheerio');

let imageLinks = [];

for (const fileName of files) {
  const buffer = fs.readFileSync(folderPath + '/' + fileName)
  const html = iconv.decode(buffer, 'win1251');
  const $ = cheerio.load(html);
  const elems = $('.attachment__link').get()
  for (const elem of elems) {
    const attrs = elem.attributes;

    let targetAttr 
    for(const attr of attrs) {
      if(attr.name == 'href') {
        imageLinks.push(attr.value)
      }
    }
  }

}
function pause(millis) {
  var date = Date.now();
  var curDate = null;
  do {
      curDate = Date.now();
  } while (curDate-date < millis);
}

fs.writeFileSync('C:/Users/saidlykaov/Desktop/Новая папка/file.txt', imageLinks.join('\n\n'))
for(imagelink of imageLinks) {
  open(imagelink)
  pause(300)
}