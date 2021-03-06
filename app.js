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
import init from './config/init';

// const { errorType } = require('./config/error')
const app = express()
const MongoStore = connectMongo(session);
app.use(cors());
app.disable("x-powered-by");
app.use(session({
  resave: false,
  saveUninitialized: true,
  keys: ['username', 'token' , "id" , "role", "isValid"],
  secret: SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: DB,
    autoReconnect: true,
    autoRemove: 'disabled'
  })
}));

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
  introspection: true,  
  playground: IN_PORD
    ? false
    : {
        settings: {
          "request.credentials": "include",
        },
      },
  context: ({ req, res }) => ({ req, res }),
  tracing: true,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  }
});
// mongoose.Promise = global.Promise;
mongoose.connect(DB ,
{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify: false
    });

app.get('/', (req, res) => res.send("hello world"))
server.applyMiddleware({ app, cors: false });

init(app, DB).then(function initialized() {
      app.listen({ port: PORT},() => console.log(`Apollo Server start on localhost:${PORT}${server.graphqlPath}`))
});