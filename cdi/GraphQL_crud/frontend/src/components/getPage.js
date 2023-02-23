import React, { useEffect, useState } from 'react'
import {useQuery, gql, useMutation} from '@apollo/client'

const GetPage = () => {

  const getTweetAPI = gql`
  query{
    allTweets {
      id
      text
      author {
        sayHi
        firstName
        lastName
      }
    }
  }
  `

  const addNewTweetAPI= gql`
  mutation($text: String!, $userId: ID!){
    postTweet(text: $text, userId: $userId) {
      id
      text
    }
  }
  `

  const deleteTweetAPI = gql`
  mutation($deleteTweetId: ID!){
    deleteTweet(id: $deleteTweetId)
  }
  `


  const [tw, setTw] = useState("")
  const [addTweet, setAddTweet] = useState('')
  
  const {loading, error, data} = useQuery(getTweetAPI, {
    onCompleted:(queryData)=>{
      console.log(queryData, "queryData");
    }
  })

 const [addNewTweetBtn] = useMutation(addNewTweetAPI,{refetchQueries:refetch=>[{query:getTweetAPI}]} )
 const [delTweetBtn] = useMutation(deleteTweetAPI,{refetchQueries:refetch=>[{query:getTweetAPI}]})

 
  useEffect(() => {
    if (data) {
      setTw(data.allTweets.map((li) => {
        console.log(li, "from map");
        return <div key={li.id}> 
          <li className="text-gray-200" > 
         <div>user name: {li.author === null ? "unknown user": li.author.lastName} </div>
          <div>tweet text :{li.text}</div>
          <div>id: {li.id}</div>
          </li> 
          <button onClick={()=>{delTweetBtn({variables:{deleteTweetId:li.id}})}}>delete!</button> 
        </div>
         
      }));
  
    } 
  
  }, [data])


  return (<>
    <div className="text-blue-400 font-semibold">User Information List</div>
    <div>{tw}</div>
    <br/>    
    <div className="text-gray-500 font-medium">if you want to add new tweet, send here!</div>
    <div><input placeholder='input name' value={addTweet} onChange={(e)=>{setAddTweet(e.target.value)}}></input><button onClick={()=>{addNewTweetBtn({variables:{text:addTweet, userId:10}})}}>Add new Tweet</button></div>
    </>)
}

export default GetPage