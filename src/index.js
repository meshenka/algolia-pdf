"use strict"

import _ from './env'
import toRecord from './components/parser'
import addToIndex from './components/indexer'

const title = process.env.BOOK
const PDF_PATH = './data/' + title

//@todo implement promises to synchronise calls
toRecord(title, PDF_PATH)
  .then(addToIndex)
  .then(console.debug)
  .then(() => {
    console.log("DONE")
  })
 

