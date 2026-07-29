const express = require('express');

const app = express();
const PORT = 8383;

const data = ["james"]

app.use(express.json());

// websote endpoints ( these endpoints are for sending back html and they typically come when a user enters a url in a browser)

app.get('/',(req,res)=>{
    res.send(`
        <body style="background:pink;color:blue">
            <h1> DATA: </h1>
            <p>${JSON.stringify(data)}</p>
        </body>
        
        `);
});

app.get('/home',(req,res)=>{
    res.send("<h1> Home page </h1>");
});

app.get('/dashboard',(req,res)=>{
    res.send("<h1> dashboard </h1>");
});

// Type -2 ( API endpoints )

app.get('/api/data',(req,res)=>{
    res.send(data);
});

app.post('/api/data',(req,res)=>{
    const newEntry = req.body;
    console.log(req.body);
    data.push(newEntry.name);
    res.sendStatus(201);
})

app.listen(PORT,()=>{
    console.log('server listening', PORT);
})