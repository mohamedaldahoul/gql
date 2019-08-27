const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`

  type Query {
    hello: String!
    user: User
  }

  type User {
    id: ID!
    username: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type RegisterResponse {
    errors: [Error]!
    user: User
  }
  input UserInfo {
    username: String!
    password: String!
    age: Int
    
  }
 
  type Mutation {
    register(userInfo: UserInfo!) : RegisterResponse!
    login(userInfo: UserInfo!) : Boolean!
  }

`;

const resolvers = {
  Query:{
    hello:()=> 'hello world',
    user: () => ({
      id: 1,
      username: "Mohamed" 
    }),
  },

  Mutation: {
    login: () => true,
    register: () => ({
      errors: [
        {
          field: "username",
          message: "NO GOOD"
        },
        {
          field: "username2",
          message: "NO GOOD 2"
        },
        null
      ],
      user: {
        id: 1,
        username: "Mohamed"
      }
    })
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url})=> console.log(`server started at ${url}`));
