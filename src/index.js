const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  /*
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info);
    },
    updateLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link.id === args.id) {
          links[i] = args;
          return links[i];
        }
      }
    },

    deleteLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link.id === args.id) {
          links.splice(i, 1);
          return link;
        }
      }
    }
  }
  */
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/paul-coroneos/database/dev',
      secret: 'mysecret123',
      debug: true,
    })
  })
});

server.start(() => console.log('Server is running on http://localhost:4000'));
