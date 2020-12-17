import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
// import { SECRET } from './config';
// import jwt from 'jsonwebtoken';
import root from './graphql/typeDefs/root';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';
import { DB, IN_PORD, PORT, SESSION_SECRET } from './config';

// const { errorType } = require('./config/error')
const app = express()
const MongoStore = connectMongo(session);
app.use(cors());
app.disable("x-powered-by");
// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   keys: ['username', 'token' , "id" , "role", "isValid"],
//   secret: SESSION_SECRET,
//   cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
//   store: new MongoStore({
//     url: DB,
//     autoReconnect: true,
//     autoRemove: 'disabled'
//   })
// }));

const server = new ApolloServer({
	root,
	typeDefs,
  resolvers,

  formatError(err) {
  //   let s=err.message.split('/')
  //   console.log(s) 
  //   // console.log(err.message.split('/'))
  //   // const error = getErrorCode(err.message)
    return ({
      message: err.message
    })
  },
  playground: IN_PORD
    ? true
    : {
        settings: {
          "request.credentials": "include",
        },
      },
  context: ({ req, res }) => ({ req, res }),
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  }
});
const MONGODB_URI = "mongodb+srv://Pandi:pandian12@cluster0.h3zrn.mongodb.net/graphql?retryWrites=true&w=majority";
// heroku config:set MONGODB_URI="mongodb+srv://Pandi:pandian12@cluster0.h3zrn.mongodb.net/graphql?retryWrites=true&w=majority"
// mongoose.connect(DB || process.env.MONGODB_URI,
// {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex:true,
//       useFindAndModify: false
//     });
// const DB_URL = "mongodb+srv://Pandi:pandian12@cluster0-h3zrn.mongodb.net/graphql?retryWrites=true&w=majority"
// mongoose.connect(DB_URL,
// 	{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex:true,
//     useFindAndModify: false
//   });

app.get('/', (req, res) => res.send("hello world"))
server.applyMiddleware({ app, cors: true });
app.listen({port: process.env.PORT|| PORT},() => console.log(`Apollo Server start on localhost:${PORT}${server.graphqlPath}`))

// app.listen({port: PORT},() => console.log(`Apollo Server start on localhost:${PORT}${server.graphqlPath}`))