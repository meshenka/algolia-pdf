import pdfParser from 'pdf-parser'
import algoliasearch from 'algoliasearch'
import _ from 'dotenv'

_.config()

const title = process.env.BOOK
const PDF_PATH = './data/' + title

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
const index = client.initIndex('documents')


pdfParser.pdf2json(PDF_PATH, (error, pdf) => {
  if (error != null) {
    console.log(error);
  } else {
    console.log("Starting parsing/indexing for", title)
    const nbPages = pdf.pages.length
    let documents = []
    let page = 0
    pdf.pages.forEach(currentPage => {

      const text = currentPage.texts.map(data => data.text).join(' ')
      const data = {
        page,
        text,
        book: title,
        nbPages
      }

      console.log(data)
      documents.push(data)
      page++

    });

    index.addObjects(documents, function(err, content) {
      if (err) {
        console.error(err);
      }
      console.log("Done!! for", title)
    })
  }
});