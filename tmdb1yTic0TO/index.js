const Joi = require('joi'); // name is Joi since this module return a class!!
const express = require('express'); // load the express module, which returns a function
const app = express(); // call the function that returns an object of type "express"

app.use(express.json()); //the express.json() adding a piece of middleware. 
//Then we call app.use to use that middleware in the request pipeline

// the convention is to name this as "app"
const heroes = [
    {id: 1, name: 'Iron Man', power: 'Repulsor Ray'},
    {id: 2, name: 'Captain America', power: 'I can do this all day!'},
    {id: 3, name: 'Hulk', power: 'Smash'},
    {id: 4, name: 'Antman', power: 'Enlarge'}

]

app.get('/',(req, res) => {
    res.send('Hello Naomi');
});


app.get('/api/avengers',(req, res) => {
    // res.send(['Avengers Assemble!']);
    res.send(heroes);
});

// Handle when the get request past over the id
app.get('/api/avengers/:id', (req, res) => {
    //array.find will need to pass a function
    // let hero = heroes.find(c => {
    //     return c.id === parseInt(req.params.id)
    // });
    //this is more concise than the upper code
    let hero = heroes.find(c => c.id === parseInt(req.params.id));
    if (!hero) return res.status(404).send('The hero is not listed!!'); // 404 object not found 

    res.send(hero);
    res.end;
});

// Handel HTTP post request
app.post('/api/heroes', (req, res) => {

    // if (!req.body.name || req.body.name.length <3) {
    //     // 400 Bad Request
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return;
    // }

    // if (!req.body.power || req.body.power.length <3) {
    //     // 400 Bad Request
    //     res.status(400).send('The hero should have a power and should be minimum 3 characters');
    // }

    // Use joi as the alternative to replace above code
    // define a schema first:what property we have in the object/range/number of the property
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        power: Joi.string().min(3).required()
    });

    //const validation = schema.validate(req.body); //this validate returns an object
    const {error} = validateHero(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  

    const hero = {
        id: heroes.length + 1,
        name: req.body.name,
        power: req.body.power
    };
    heroes.push(hero);
    //By convention we should return that object newly created in the body of response
    res.send(hero);
});

//Update a record
app.put('/api/heroes/:id', (req, res) => {
    // Look up the hero
    // If not exisintg, return 404 (resource not found)
    let hero = heroes.find(c => c.id === parseInt(req.params.id));
    if (!hero) return res.status(404).send('The hero is not listed!!');

    // validate 
    // If invalid, reutnr 400 (bad request)
    const {error} = validateHero(req.body);//object destructing syntax
    if (error) return res.status(400).send(error.details[0].message);

    // update course
    hero.name = req.body.name;
    hero.power = req.body.power;
    
    // return the updated course for the client
    res.send(hero);
});

// Set listening port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

//Input Validation
//You should never trust the user to give you the right input
//Always validate the input

//Let's write a validate hero input function here so we don't have to repeat the code multiple times
function validateHero(hero) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        power: Joi.string().min(3).required()
    });

    return validation = schema.validate(hero); //this validate returns an object
    //Simply just return here. No need to declare a const then return the const
};

app.delete('/api/heroes/:id', (req, res) => {
    let hero = heroes.find(c => c.id === parseInt(req.params.id));
    if (!hero) return res.status(404).send('The hero is not listed!!');

    const index = heroes.indexOf(hero);
    heroes.splice(index, 1);
    res.send(hero);
});