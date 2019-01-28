const {
  graphql
} = require('graphql');
const readline = require('readline');
const schema = require('./schema/main');

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rli.question('Client Request:', inputQuery => {
  graphql(schema, inputQuery).then(result => {
    console.log('Server Anwser:', result.data);
  })
  rli.close();
});