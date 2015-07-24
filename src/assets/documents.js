// PLACEHOLDER -- dynamically gens JSON 

var Faker = require('faker');
var _ = require('lodash');

function mockDocuments(num){
  var forceImageChange = Object.getOwnPropertyNames(Faker.image);


  var articles = [];
  for (var i = 1; i < num; i++) {
    var abtractParagraphs = [];
    var abstNum = randomInt(1,4);
    for (var j = 0; j < abstNum; j++){
      abtractParagraphs.push({
        heading: capFirst(Faker.hacker.noun()),
        content: Faker.lorem.paragraph()
      });
    }
    var randImg = _.sample(forceImageChange);
    articles.push({
      id: i,
      title: Faker.name.title(),
      pdf: Faker.image[randImg](),
      abstract: abtractParagraphs,
      summary: Faker.lorem.sentences(randomInt(2,10)).split('\n')
    });
  }

  return articles;
}

function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = mockDocuments;