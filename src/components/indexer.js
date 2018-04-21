"use strict"
import algoliasearch from 'algoliasearch'

const indexDocuments = (documents) => {

  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
  const index = client.initIndex('documents')

  index.addObjects(documents, (err, content) => {
    if (err) {
      console.error(err);
    }
    console.info('Data imported to Algolia')
    console.debug(content)
  })
}

export default indexDocuments