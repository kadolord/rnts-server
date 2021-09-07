import "reflect-metadata";

import express, { json } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { config } from "./config";
import { TestResolver } from "./graphql/resolvers/test";

const main = async () => {
  await config;
  const app = express();
  app.use(express.json());
  const schema = await buildSchema({
    resolvers: [TestResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  apolloServer.applyMiddleware({ app });
  apolloServer.start();
  app.listen(9090, () => {
    console.log("Server started at localhost:9090");
  });
};

main().catch((err) => {
  console.log(err);
});
