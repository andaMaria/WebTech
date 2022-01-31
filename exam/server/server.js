const express = require('express')
const cors = require('cors')

const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storea: 'sample.db'
})

const Ship = sequelize.define('ship', {
  id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  displacement: {
    type: Sequelize.INTEGER
  }
})

const CrewMember = sequelize.define('crew', {
  id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.BOOLEAN
  }
})

const app = express()
app.use(cors())
app.use(express.json())


app.get('/sync', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    const sampleData = [{
      id: '34578',
      name: 'Titanic',
      displacement:'55'
    }]
    for (const item of sampleData) {
      const user = new Ship(item)
      await ship.save()
    }
    res.status(201).json({ message: 'sample db created' })
  } catch (err) {
    next(err)
  }
})

app.get('/ships', async (req, res, next) => {
  try {
    const ships = await Ship.findAll()
    res.status(200).json(ships)
  } catch (err) {
    next(err)
  }
})

app.get('/ships/:id', async (req, res)=>{
  try {
    const ship = await Ship.findByPk(req.params.id)
    if(ship){
      res.status(200).json(ship)
    }else{
      res.status(404).json({message:'not found'})
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({message:'some error'})
  }
})

app.put('/ships/:id', async (req, res)=>{
  try {
    const ship = await Ship.findByPk(req.params.id)
    if(ship){
      await ship.update(req.body,{
        fields:['id','name','displacement']
      })
      res.status(202).json({message:'accepted'})
    }else{
      res.status(404).json({message:'not found'})
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({message:'some error'})
  }
})

app.delete('/ships/:id', async (req, res)=>{
  try {
    const ship = await Ship.findByPk(req.params.id)
    if(ship){
      await ship.destroy()
      res.status(202).json({message:'accepted'})
    }else{
      res.status(404).json({message:'not found'})
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({message:'some error'})
  }
})

app.post('/ships', async (req, res, next) => {
  try {
    const ship = await Ship.create(req.body)
    res.status(201).json(ship)
  } catch (err) {
    next(err)
  }
})




app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)
