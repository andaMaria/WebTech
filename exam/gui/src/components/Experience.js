import './Experience.css'

function Experience (props) {
  const { item } = props

  return (
    <div className='user'>
      <div className='username'>
        {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
      <div className='startingPoint'>
        {item.startingPoint}
      </div>
      <div className='destinationPoint'>
        {item.destinationPoint}
      </div>
      <div className='publicTransport'>
        {item.publicTransport}
      </div>
      <div className='departureHour'>
        {item.departureHour}
      </div>
      <div className='tripDuration'>
        {item.tripDuration}
      </div>
      <div className='crowdednessLevel'>
        {item.crowdednessLevel}
      </div>
      <div className='observations'>
        {item.observations}
      </div>
      <div className='satisfactionLevel '>
        {item.satisfactionLevel}
      </div>
    </div>
  )
}

export default Experience
