import express = require('express')
const app = express()
let ejs = require('ejs');
import path = require('path');
app.use(express.static(path.join(__dirname, '/public')))

import {MetricsHandler} from './metrics';
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

const port: string = process.env.PORT || '8080'

app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})

app.get(
    '/hello/:name', 
    (req, res) => res.render('yellow.ejs', {name: req.params.name})
)

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})

app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err, data)=>{
        if(err) throw err
        res.status(200).json(data)
    });
})