
        //3 Construir el schema ejecutable

import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import 'graphql-import-node'
import typeDefs from './graphql/schema.graphql'
import resolvers from '../resolvers'

        const schema: GraphQLSchema = makeExecutableSchema({
            typeDefs,
            resolvers
        });

        export default schema;