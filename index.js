

/*const http = require('http');

const server = http.createServer();

server.on('request',(request,response)=>{
   response.writeHead(200,{'Content-Type':'text/plain'});
   response.write('Hello world');
   response.end();
});

server.listen(3000,()=>{
  console.log('Node server created at port 3000');
});*/


/*const express = require('express');
const app = express();

app.get('*', (req, res) => { 
  res.send('hello world');
});

app.listen(3000, () => {
  console.log('Express application running on localhost:3000');
});*/


/*const express = require('express');
const app = express();

app.get('/', (req, res) => { 
    res.send('hello world');
  });
  app.get('/students', (req, res) => { 
    res.send('Hello students');
  });

app.listen(3000, () => {
  console.log('Express application running on localhost:3000');
});*/
//mongoose.connect('mongodb://localhost:27017/myfirstmongodb', {useNewUrlParser: true});

const express = require('express');
const app = express();
var mongoose = require('mongoose');

app.get('/', (req, res) => { 
    res.send('This is my first NODE JS app');
  });
  
  /*app.get('/students', (req, res) => { 

    const listOfStudents = [
      {id: 1,name: 'Usama'},
      {id: 2,name: 'Uzair'},
      {id: 3,name: 'Safwan'},
      {id: 4,name: 'Fahad'},
      {id: 5,name: 'Sohaib'},
    ]
  
    res.send(listOfStudents);
  });*/
 



  const Student = mongoose.model('Student', {
    name: String,
    student_id: Number,
    email: String,
    password: String,
    date_added: Date
   });
  
   const bodyParser = require('body-parser');
  mongoose.connect('mongodb://localhost:27017/myfirstmongodb', {useNewUrlParser: true,useUnifiedTopology:true});
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
 /* app.post('/signup', async (req, res) => {
    const body = req.body;
    console.log('req.body', body);
    res.send({
      message: 'Success'
    });
    
      });*/

 app.post('/signup', async (req, res) => {
const body = req.body;
console.log('req.body', body);
  try{
const student = new Student(body);

const result = await student.save();
res.send({
  message: 'Student signup successful'
});

  }
  catch(ex){
    console.log('ex',ex);
    res.send({message: 'Error'}).status(401);
  }
});



app.get('/students', async (req, res) => {

  const allStudents = await Student.find();
  console.log('allStudents', allStudents);

  res.send(allStudents);
});


/*app.post('/login',  async (req, res) => {
  const body = req.body;
  console.log('req.body', body);

  const email = body.email;

  // lets check if email exists

  const result = await Student.findOne({"email":  email});
  console.log('result', result);

  // 2. if exists, check if password matches

res.send({
result: result
});

});*/
app.post('/login',  async (req, res) => {
  const body = req.body;
  console.log('req.body', body);

  const email = body.email;

  // lets check if email exists

  const result = await Student.findOne({"email":  email});
  if(!result) // this means result is null
  {
    res.status(401).send({
      Error: 'This user doesnot exists. Please signup first'
     });
  }
  else{
    // email did exist
    // so lets match password

    if(body.password === result.password){

      // great, allow this user access

      console.log('match');

      res.send({message: 'Successfully Logged in'});
    }

      else{

        console.log('password doesnot match');

        res.status(401).send({message: 'Wrong email or Password'});
      }


  }

});






app.get('*', (req, res) => { 
  res.send('Page Doesnot exists');
});
  
app.listen(3000, () => {
  console.log('Express application running on localhost:3000');
});

















