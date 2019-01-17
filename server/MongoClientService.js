const MongoClient = require('mongodb').MongoClient;
const config = require('dotenv').config();
const uri = process.env.MONGO_CONNECTION_STRING;

class MongoClientService {
  constructor() {
    this.mongo_instance = new MongoClient(uri, { useNewUrlParser: true });
    // @todo: receive endpoint-specific string to fine tune which database is called?
  }

  getBooksCollection() {
    let self = this;
    // return 'hello world';
    return new Promise((resolve, reject) => {
      self.mongo_instance.connect(err => {
        if(err)
          reject(err);

        const collection = self.mongo_instance.db('library').collection('books');
        // console.log(collection);

        collection.find({}).toArray((coll_err, docs) => {
          if(coll_err) console.log(coll_err);
          // console.log(docs);

          self.mongo_instance.close();
          resolve(docs);
        });
        self.mongo_instance.close();

        // resolve(collection);
      });
      // resolve('hello world; resolved');
    });
  }
}

module.exports = MongoClientService;
