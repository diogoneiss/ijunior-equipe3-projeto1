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


module.exports=router;