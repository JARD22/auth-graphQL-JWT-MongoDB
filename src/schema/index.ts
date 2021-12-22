
        //3 Construir el schema ejecutable

import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import 'graphql-import-node'


// ./graphql/typeDefs.js
import path from "path"

//Modularizando los tipos de raiz
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

//guarda en un arreglo los archivos con extension graphql dentro de la carpeta graphql
const typesArray = loadFilesSync(path.join(__dirname, "./graphql"), { extensions: ["graphql"] })

const typeDefs = mergeTypeDefs(typesArray)

import resolvers from '../resolvers'

        const schema: GraphQLSchema = makeExecutableSchema({
            typeDefs,
            resolvers
        });

        export default schema;