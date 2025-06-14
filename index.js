import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

    let Arr = [];

app.get('/', (req, res)=>{
    if (Arr.length > 0){
        res.render('home.ejs', {postsArr : Arr} )
    } else {
        res.render('home.ejs')
    }
})


app.get('/about', (req, res)=>{
    res.render('about.ejs')
})

app.get('/submit', (req, res)=>{
    res.render('submit.ejs')
})


app.post('/', (req, res)=>{

    const {name} = req.body
    const {title} = req.body
    const {text} = req.body
    
    console.log(req.body);
    

    Arr.push({
    name : name,
    title : title,
    text : text
   })

   res.render('home.ejs', {postsArr : Arr} )
})

app.post('/delete', (req, res)=>{
    let {id} = req.body;
    Arr.splice(id, 1)
    res.redirect('/')
})

app.post('/edit', (req, res) =>{
    const {name} = req.body
    const {title} = req.body
    const {text} = req.body

    let {id} = req.body;
    Arr.splice(id, 1)

    const formData = {
        name : name,
        title : title,
        text : text
    }

    res.render('submit.ejs', {data : formData})
    
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})