const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const Book =require('../models/book')
const Author = require('../models/author')

// Books data

// let books=[
//     {name:"Name of the wind", genre:"Fantasty",id:"1",authorid:"1"},
//     {name:"The Final Empire", genre:"Fantasty",id:"2",authorid:"2"},
//     {name:"The long Earth", genre:"Sci-Fi",id:"3",authorid:"3"},
//     {name:"The last of us", genre:"Action",id:"4",authorid:"2"},
//     {name:"Call of duty", genre:"war",id:"5",authorid:"2"},
//     {name:"FarCry", genre:"game",id:"6",authorid:"3"}
// ]

// Author data

// let authors=[
//     {name:"ali",age:"35",id:"1"},
//     {name:"bilal",age:"40",id:"2"},
//     {name:"saad",age:"25",id:"3"}
// ]


// Book Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors,{id:parent.authorid})
      },
    },
  }),
});

// Author Type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books,{authorid:parent.id})
      },
    },
  }),
});

//-----------------------------------------------------------------------------------//

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryBook",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        //    return _.find(books,{id:args.id})
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors,{id:args.id})
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
      },
    },
  },
});

//-----------------------------------------------------------------------------------//

// export schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
