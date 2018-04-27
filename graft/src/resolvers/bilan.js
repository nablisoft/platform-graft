export default {

  Query: {

  },
  Mutation: {
    createBilan: async (parant, args, { models, user }) => {
      try {
        await models.Bilan.create({
          ...args,
          medcinId: user.id,
        });
        console.log(user);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
