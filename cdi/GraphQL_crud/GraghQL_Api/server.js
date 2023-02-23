import { ApolloServer, gql } from "apollo-server";
import { GraphQLObjectType } from "graphql";
import axios from "axios";

let tweets = [
    {
        id:"1",
        text:"written by gun bom!",
        userId:"2"
    },
    {
        id:"2",
        text:"written by gun goguma",
        userId:"1"

    },
    {
        id:"3",
        text:"written by gun oksusu",
        userId:"3"

    },
    {
        id:"4",
        text:"written by gun paprika",
        userId:"4"

    },
]

let users = [
    {
        id:"1", 
        firstName:"gun",
        lastName:"goguma"
    },
    {
        id:"2", 
        firstName:"gun",
        lastName:"bom"
    },
    {
        id:"3", 
        firstName:"gun",
        lastName:"oksusu"
    },  
    {
        id:"4", 
        firstName:"gun",
        lastName:"paprika"
    },
]

const typeDefs = gql`

type User{
    id:ID!
    firstName:String
    lastName:String
    sayHi:String!
}

type Tweet {
    id:ID!
    text:String!
    author:User
}

type Query{
        allUsers:[User!]!
        allTweets: [Tweet!]!
        tweet(id:ID!):Tweet
        ping:String
}

type Mutation{
    postTweet(text:String!, userId:ID!):Tweet!
    deleteTweet(id:ID!):Boolean!
}

`;

 
const resolvers = {
  
  // root is required, if it is blank or forget to write
  // the function does not work.
    Query: {
        tweet(root, {id}) {
           
            console.log(tweets.text, "tweets.text is --");
            return tweets.find((tweet)=> tweet.id === id);
        },
        ping(){
            return "Pong";
        },
        allTweets(){
            console.log("allTweets called")
           return tweets
        }, 
        allUsers(){
            console.log("welcome friend1")
            return users;
        }
    }, 
    Mutation:{
        postTweet(root, {text, userId}){
            const newTweet={
                id:tweets.length+1,
                text
            } 
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(root, {id}){
            const Ftweet = tweets.find((tweet)=> tweet.id === id)
            // 내가 넣은 id 값이 없는 경우, 그런 아이디가 아예 없어서 트윗 자체가 없으면 false 
            if(!Ftweet) return false;
            // 내가 넣은 id 값이 있는 경우, 그리고 지우기가 성공한 경우
           tweets =tweets.filter(tweet => tweet.id !== id);
 
            return true;

        }
    },
    User:{
        sayHi({firstName, lastName}){
            console.log("welcome friend2")
            return `hi welcome! my name is ${firstName} ${lastName}`
        }
    },
    Tweet:{
        author({userId}){
            console.log("author called")
            return users.find(user=> user.id === userId)
        }
    }

  };

const RootQuery = ()=>{
axios.get(`http://localhost:4000/user/${id}`)
.then((res)=> res.data);

};

const server = new ApolloServer({typeDefs, resolvers, RootQuery})

server.listen().then(({url})=>{
console.log(`Running on ${url}`);
})