const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is the API of HackerNews Clone',
    feed: () => links,
    link: (id) => links.find({ id }),
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },

    updateLink: (root, args) => {
      // This looks nice, but isn't particularly efficient.
      links = links.map(link => (args.id === link.id ? { ...link, ...args } : link))
      return links.find({ id: args.id })
    },

    deleteLink: (root, args) => {
      let returnLink;

      links = links.filter(link => {
        if (args.id !== link.id) {
          returnLink = link;
          return true;
        }
      });
      
      return returnLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));
