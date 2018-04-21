"use strict"
import algoliasearch from 'algoliasearch'

const indexDocuments = (documents) => {

  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
  const index = client.initIndex(process.env.ALGOLIA_INDEX)

  return new Promise((resolve, reject) => {
    index.addObjects(documents, (err, content) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      console.info('Data imported to Algolia')
      resolve(content)
    })
  
  })

}

export default indexDocuments