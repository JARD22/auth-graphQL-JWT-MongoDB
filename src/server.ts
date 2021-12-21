import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { createServer, Server } from "http";
import result from './config/enviroment'


class GraphQLServer {
    //Propiedades
    private app!: Application;
    private httpServer!: Server;
    private readonly DEFAULT_PORT = (process.env.PORT)? +process.env.PORT : 3003;
    private schema!:GraphQLSchema;


    constructor(schema:GraphQLSchema) {
        if (schema===undefined) {
            throw new Error('Se necesita un schema de GraphQL para trabajar con APIS')
        }
        this.schema= schema

        this.init();
    }


    private init() {
        this.configExpress();
        this.configApolloServerExpress();
        this.configRoutes();
    }

    private initEnviroment(){
        if (process.env.NODE_ENV !=="production") {
            const env = result;
            console.log(env);   
        }
    }

    private configExpress() {
        this.app = express();
        this.app.use(compression());
        this.httpServer = createServer(this.app)
    }

    private async configApolloServerExpress() {
      
        const apolloServer = new ApolloServer({
            schema:this.schema,
            introspection: true
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({ app:this.app, cors: true })

    }

    private configRoutes() {

        this.app.get('/hola', (_, res) => {
            res.send('Primera api con GraphQL');
        });
    
    
        this.app.get('/',(_,res)=>{
            res.redirect('/graphql');
        });
    }


    listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () => {
            callback(this.DEFAULT_PORT)
        })
    };


}


export default GraphQLServer;
