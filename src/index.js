const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    info: () => 'This is the API of HackerNews Clone',
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    },
    link: (root, args) => links.find(link => link.id === args.id),
  },

  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info);
    },

    /*
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
    */
  }
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
