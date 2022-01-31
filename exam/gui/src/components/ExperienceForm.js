import { useState } from 'react'
import './ExperienceForm.css'

function ExperienceForm (props) {
  const { onAdd } = props
  const [username, setUsername] = useState('')      //we will need to define some fields for our form and add them to the state
  const [fullName, setFullName] = useState('')
  const [startingPoint, setStartingPoint] = useState('')
  const [destinationPoint, setDestinationPoint] = useState('')
  const [publicTransport, setPublicTransport] = useState('')
  const [departureHour, setDepartureHour] = useState('')
  const [tripDuration, setTripDuration] = useState('')
  const [crowdednessLevel, setCrowdednessLevel] = useState('')
  const [observations, setObservations] = useState('')
  const [satisfactionLevel, setSatisfactionLevel] = useState('')
  

  const addUser = (evt) => {       //event handler: when the event is sent the three fields are also sent 
    console.warn('called')
    onAdd({
      username,
      fullName,
      startingPoint,
      destinationPoint,
      publicTransport,
      departureHour,
      tripDuration,
      crowdednessLevel,
      observations,
      satisfactionLevel
    })
  }
                     //below we return an html form with input fields.
                     //notice how on change the value we add manually in the input field is added in our state fields we defined above 
  return (
    <div className='user-form'>
      <div className='username'>
        <input type='text' placeholder='username' onChange={(evt) => setUsername(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='fullName' onChange={(evt) => setFullName(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='startingPoint' onChange={(evt) => setStartingPoint(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='destinationPoint' onChange={(evt) => setDestinationPoint(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='publicTransport' onChange={(evt) => setPublicTransport(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='departureHour' onChange={(evt) => setDepartureHour(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='tripDuration' onChange={(evt) => setTripDuration(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='crowdednessLevel' onChange={(evt) => setCrowdednessLevel(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='observations' onChange={(evt) => setObservations(evt.target.value)} />
      </div>
      <div className='fullName'>
        <input type='text' placeholder='satisfactionLevel' onChange={(evt) => setSatisfactionLevel(evt.target.value)} />
      </div>
      <div className='add'>
        <input type='button' value='add' onClick={addUser} />
      </div>
    </div>
  )
}

export default ExperienceForm
