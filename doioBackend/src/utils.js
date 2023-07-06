const { Client } = require('@elastic/elasticsearch')
require("dotenv").config();

const elasticSearchClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
});

module.exports = {
  elasticSearchClient,
};
