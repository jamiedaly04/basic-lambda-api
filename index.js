const express = require('express');
const app = express();
app.use(express.json());

var listener = app.listen(8080, function () {
    console.log('Listening on port ' + listener.address().port);
});

let pets = [{ name: 'Dog', type: 'Mammal' }, { name: 'Cat', type: 'Mammal' }, { name: 'Bird', type: 'Reptile' }];

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World!' });
});

app.get('/pets', (req, res) => {
    res.status(200).send(pets);
});

app.post('/pets', (req, res) => {
    const name = req.query.name;
    const type = req.query.type;

     if (!name || !type) {
         res.status(400).send({ message: `Name and Type parameters are required` });
    }  else {
        res.status(200).send({ message: 'Pet created successfully' });
        pets.push({ name, type });
    } 
});

app.delete('/pets', (req, res) => {
    const name = req.query.name;

    if (!name) {
        res.status(400).send({ message: `Name parameter is required` });
    } else {
        let foundPet = pets.filter((pet) => {
            return pet.name.toLowerCase() === name.toLowerCase();
        });

        if (foundPet.length > 0) {
            console.log(foundPet);
            let index = pets.indexOf(foundPet[0]);
            pets.splice(index, 1);

            res.status(200).send({ message: 'Pet deleted successfully' });
        } else {
            res.status(404).send({ message: `Pet '${name}' not found`});
        }
    }
})