const userRoles=require('../domains/usuarios/constants/userRoles');


const checkRole = (usuarioLogado)=>{
    return (req,res,next)=>{
        if(usuarioLogado.cargo!=userRoles.admin){
            throw new Error('Voce nao tem permissao para acessar esse recurso');
        }
        next();
    }
}

module.exports=checkRole;