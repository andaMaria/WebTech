import { useState } from 'react'

const SERVER = 'http://localhost:8080'    //location of the backend server that contains our data (server with express+ sql DB)

function Login (props) {
  const [uname, setUname] = useState('')

  const [password, setPassword] = useState('')


  function inputusername(e){
    setUname(e.target.value)
  }

  function inputpassword(e){
    setPassword(e.target.value)
  }
  
  const login = async () => {
      const user={
          uname,
          password
      }
      await fetch(`${SERVER}/login`, {       
        method: 'post',                      
        headers: {                          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)          
      })
  }

  return (
    <div>
      <form action="/action_page.php">
        <label for="fname">Username:</label>
        <input type="text" id="fname" name="fname" value="Username" onChange={(e)=>inputusername(e)}></input><br></br>
        <label for="lname">Password:</label>
        <input type="text" id="lname" name="lname" value="Password"onChange={(e)=>inputpassword(e)}></input><br></br>
        <input type="button" value="Login" onClick={login()}></input>
      </form> 
     </div>
  )
}

export default Login