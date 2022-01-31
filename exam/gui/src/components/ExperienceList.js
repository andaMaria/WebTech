import { useEffect, useState } from 'react'
import Experience from './Experience'
import ExperienceForm from './ExperienceForm'
import './ExperienceList.css'

const SERVER = 'http://localhost:8080'    //location of the backend server that contains our data (server with express+ sql DB)

function ExperienceList (props) {
  const [users, setUsers] = useState([])

  const getUsers = async () => {                  //we use async on the method because the response from the server can be delayed
    const response = await fetch(`${SERVER}/users`)   //this endpoint has been defined on backend -check server.js line 53
    const data = await response.json()                //we await the data from the server (comes in json format)
    console.warn(data)
    setUsers(data)
  }

  const addUser = async (user) => {        //when the add button is pressed, this method is activated 
    await fetch(`${SERVER}/users`, {       // notice how get and post fetch calls are quite similar 
      method: 'post',                      //if it's a post you just need to specify extra details like the type of request
      headers: {                           //and type of content 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)           //so this request will send to the post endpoint from backend server the details 
                                          // we write in the form. the form will populate the body of this request with "user" object
    })
    getUsers()                             //we will call once again getUsers so that the list that we see in the front end is up to date with the new user 
  }

  useEffect(() => {   //this effect will run first time or when anything changes to getUsers 
    getUsers()
  }, [])

  return (
    <div className='user-list'>
      {
        users.map(e => <Experience key={e.id} item={e} />)  //we creare a User component and for each element from the users array, we return the html defined in User
      }
      <ExperienceForm onAdd={addUser}/>    
      </div>
  )
}

export default ExperienceList
