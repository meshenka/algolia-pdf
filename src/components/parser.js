"use strict"
import pdfParser from 'pdf-parser'

/**
 *
 */
const toRecord = (title, path) => {
  let documents = []

  return new Promise((resolve, reject) => {
    pdfParser.pdf2json(path, (error, pdf) => {
      if (error != null) {
        console.error(error)
        reject(error)
      } else {
        console.debug("Starting parsing", path)
        const nbPages = pdf.pages.length
        let page = 0
        pdf
          .pages
          .forEach(currentPage => {
            console.debug('page ', page)
            const text = currentPage
              .texts
              .map(data => data.text)
              .join(' ')
            const data = {
              page,
              text,
              book: title,
              nbPages,
              objectID: title + '__' + page
            }

            documents.push(data)
            page++

          })

        //return documents
        resolve(documents)

      }
    })

  })

}

export default toRecord