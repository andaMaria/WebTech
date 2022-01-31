import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require( 'cors');
//import path from 'path';
const Sequelize = require('sequelize');
require('dotenv').config();

let app = express();
let router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(express.static('build'));

// const db = new Sequelize({
//     dialect: 'mysql',
//     database: 'Products',
//     username: 'root',  
//     password: '123123',
//     logging: false,
//     define: {
//         timestamps: false,
//         freezeTableName: true
//     }
// })

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

let Ship = db.define('ship', {
  id : Sequelize.INTEGER,
    name : {
        type: Sequelize.STRING,
        validate: {
            len: [3, 100]            
        },
        allowNull: false
    },
    displacement : Sequelize.INTEGER

})

let data = [
    {
        "id": 1, "name": "Titanic", "displacement": "51"
    },
    {
        "id": 2, "name": "MBigger", "displacement": "52"
    },
    {
        "id": 3, "name": "Leia", "displacement": "53"
    },
    {
        "id": 4, "name": "BlackPearl", "displacement": "54"
    },
    {
        "id": 5, "name": "Pirate", "displacement": "55"
    },
]

function getData(){
    return data;
}

function getDataById(id){
    return data.find(d => d.id === parseInt(id));
}

function createElem(elem){
   data.push(elem);
   return data;
}

function updateElem(id, elem){

    data = data.map( obj => parseInt(obj.id) === parseInt(id) ? elem : obj ) 
    return data;
}

function deleteElem(id){
    let deleteElem = data.find(d => d.id === parseInt(id));
    let deleteIndex = data.indexOf(deleteElem);
    data.splice(deleteIndex, 1);
    return data;
}

router.use((request, response ,next) => {
    console.log("middleware");
    next();
})

router.route('/data').get((request, response) => {
    response.json(getData());
});

router.route('/data/:id').get((request, response) => {
    response.json(getDataById(request.params.id));
});

router.route('/data').post((request, response) => {
    response.json(createElem(request.body));
});

router.route('/data/:id').put((request, response) => {
    response.json(updateElem(request.params.id, request.body));
});

router.route('/data/:id').delete((request, response) => {
    response.json(deleteElem(request.params.id));
});

// router.route('/').get(async (req, res) => {
//     let path = path.resolve();
//     res.sendFile(path.join(path, "build", "Index.html"));
// });

router.route("/sync").get(async (req, res) => {
    await db.sync({force: true});
    for (let i = 0; i < 10; i++){
        let ship = new Ship({
            name: 'name ' + i,
            id: 'id',
            displacement: 50+ i
        })
        await ship.save()
    }
    res.json({message: "Success"});
});

router.route("/getship").get(async (req, res) => {
    let ship = await Ship.findAll()
    res.status(200).json(ship)
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);
