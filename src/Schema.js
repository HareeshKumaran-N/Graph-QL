//scaler types can be used int,float,boolean,ID,string
//! means required.

export const typeDefs = `#graphql 
type Game{
    id:ID!
    title:String!
    platform:[String!]!
    # here we are creating a relation between the game and review 
    # reviews can be empty(nullable) we are not providing esclamation outside the array. inside the review array it must be review type we are providing a esclamattion.    
    reviews:[Review!]
}

type Author{
id:ID!
name:String!
verified:Boolean!
reviews:[Review!]
}

type Review{
    id:ID!
    rating:Int!
    content:String!
    game:Game!,
    author:Author!
}

# type Query are not optional.Its job is to create a entry point and specify the return type 
# pattern entry point:return type 

type Query{
    # resolvers
    reviews:[Review]
    authors:[Author]
    games:[Game]
    review(id:ID!):Review
    game(id:ID!):Game
    author(id:ID!):Author
    getGameByTitle(title:String!):Game

}

input AddGameInput{
    title:String!,
    platform:[String!]!
}

type Mutation{
    deleteGameById(id:ID!):[Game]   
    addNewGame(game:AddGameInput!):Game
}

`;
