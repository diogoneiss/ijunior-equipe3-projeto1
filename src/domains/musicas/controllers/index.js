const express=require('express');
const router=express.Router();

const Musica=require('../models/Musica');

router.get('/',(req, res) => {
    if(Musica!=undefined){
        res.status(200).send(Musica);
    }else{
        res.status(404).send();
    }

});

router.post('/',(req,res) => {
    newMusica={
    nome:req.body.nome || "",
    artista: req.body.artista || "",
    genero: req.body.genero || "",
    quantidadeDownloads: req.body.quantidadeDownloads || 0.
    };
    Musica.append(newMusica);

});


module.exports=router;