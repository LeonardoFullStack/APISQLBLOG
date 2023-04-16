const {validationResult}=require('express-validator')  



const validarInputs=(req,res,next)=>{

    const errors=validationResult(req)

    if(errors.isEmpty()){
      next()
    }else{ return res.status(404).json({
            ok:false,
            msg:'Error al validar los campos',
            errores:errors.mapped()
    })
}
      
}


module.exports={
    validarInputs
}