import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {typeDefs} from './Schema.js';
import db from './db.js';

const resolvers={
    Query:{
        games()
        {
            return db.games; 
        },
        reviews()
        {
            return db.reviews;
        },
        authors()
        {
            return db.authors;
        },
        game($id)
        {

        },
        review(parent,args)
        {
            return db.reviews.find((item)=>item.id===args.id)
        },
        getGameByTitle(parentFunction,params)
        {
            console.log(params)
              return db.games.find(item=>(item.title!==params.title));
        }
    },
    Mutation:{
        deleteGameById(_,params)
        {
        return db.games.filter((item) => item.id !== params.id);   
        },
        addNewGame(_,params)
        {
            let game={...params.game,id:Date.now().toString()}

          db.games.push(game)
          return game
        }
    }
}



const server = new ApolloServer({
    typeDefs,
    resolvers
});


const {url}=await startStandaloneServer(server,{
    listen:{port:5000}
});

console.log('Apollo server is running at port 5000');