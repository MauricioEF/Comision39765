const toys = [] ;

const getToys = (req,res) =>{
    res.send(toys)
}

const saveToy = (req,res) =>{
    const toy = req.body;
    toys.push(toy);
    res.sendStatus(200);
}

export default {
    getToys,
    saveToy
}