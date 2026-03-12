const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { InfoBanco } = require('./Bancos');

app.get('/', (req,res) => {
    res.send('Bienvenido al banco.')
})

app.get('/banco', (req,res) => {
    const resultado = InfoBanco.Bancos
    res.send(resultado)
})

app.get('/banco/:id', (req,res) => {
    const id = req.params.id;
    const resultado = InfoBanco.Bancos.filter(Bancos => Bancos.id === id)
    if (!resultado) {
        return res.status(404).send(`Nos se encontro banco ${id}`)
    }
    res.send(resultado)
})

app.get('/banco/:id/personas', (req,res) => {
    const id = req.params.id;
    const resultado = InfoBanco.Bancos.filter(Bancos => Bancos.id === id)
    if (!resultado) {
        return res.status(404).send(`Nos se encontro banco ${id}`)
    }
    res.send(resultado)
})

app.get('/banco/:id/personas/:parid', (req,res) => {
    const id = req.params.id;
    const parid = req.params.parid;
    const resultado = InfoBanco.Bancos.find(Bancos => Bancos.id === id)
    const resultado1 = resultado.Personas.find(p => p.parid === parid)
    if (!resultado1) {
        return res.status(404).send(`Nos se encontro banco ${id} ni se encontro persona ${parid}`)
    }
    res.send(resultado1)
})

app.post('/banco', (req,res) => {
    const nuevo = req.body;
    const resultado = InfoBanco.Bancos.push(nuevo)
    res.send(resultado)
})

app.post('/banco/:id/personas', (req,res) => {
    const nuevo = req.body;
    const id = req.params.id;
    const nuevo1 = {
        parid: "6",
        Cliente: "Juan Miguel",
        cuenta: "9237497"
    };
    Object.assign(InfoBanco.Bancos[id],nuevo1,nuevo);
    res.send('Espero que funcione');
})

app.put('/banco/:id/personas/:parid', (req,res) => {
    const id = req.params.id;
    const parid = req.params.parid;
    const nuevoid = req.body;
    const resultado = InfoBanco.Bancos.find(B => B.id === id)
    const resultado1 = resultado.Personas.find(p => p.parid == parid)
    Object.assign(resultado1,nuevoid)
    res.send("Datos modificados.")
})

app.delete('/banco/:id/personas/:parid', (req,res) => {
    const id = req.params.id;
    const parid = req.params.parid;
    const resultado = InfoBanco.Bancos.find(B => B.id === id)
    const resultado1 = resultado.Personas.filter(p => p.parid == parid)
    const index = resultado.Personas.findIndex(p => p.parid == parid);
    resultado.Personas.splice(index, 1)
    res.send('Datos eliminados')
})

app.listen(port, () => {
    console.log(`Servidor abrierto ${port}...`)
})