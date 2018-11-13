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
    link: (root, args) => links.find(link => link.id === args.id),
  },

  Mutation: {
    post: (root, args) => {
      const link = { id: `link-${idCount++}`, ...args };
      links.push(link);
      return link;
    },

    updateLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link.id === args.id) {
          links[i] = args;
          return links[i];
        }
      }

      /*
        let j;

        links.forEach((link, i, arr) => {
          if (link.id === args.id) {
            j = i;
            arr[i] = { ...link, ...args };
          }
        });

        return links[j];
      */

      /*
        This looks nice, but is inefficient.
        links = links.map(link => (link.id === args.id ? { ...link, ...args } : link));
        return links.find({ id: args.id });
      */
    },

    patchLink: (root, args) => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link.id === args.id) {
          links[i] = { ...link, ...args };
          return links[i];
        }
      }
    },

    deleteLink: (root, args) => {
      // const deletedLink = links.find(link => link.id === args.id);
      // links = links.filter(link => link.id !== args.id);
      // return deletedLink;

      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (link.id === args.id) {
          links.splice(i, 1);
          return link;
        }
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000'));
