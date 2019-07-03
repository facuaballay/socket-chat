class Usuarios {

    constructor(){
        this.personas = [];
    }
//agrego a la persona dentro del arreglo personas
    agregarPersona(id,nombre,sala){
        let persona = { id,nombre,sala }
    
        this.personas.push(persona);
    
        return this.personas;
    }
//busco el id en el array de personas
    getpersona(id){
        let persona =this.personas.filter(persona =>{
            return persona.id === id
        })[0];
    
    return persona;
    }

//traigo el array de personas   
getpersonas(){
    return this.personas;
}
getpersonasPorsala(sala){
    let personasenSala= this.personas.filter(persona =>{
        //si es igual a persona.sala retorna el array filtrado
        return persona.sala === sala
    })
//retorno el let persona
    return personasenSala
}

eliminarpersona(id){
   //guardo la referencia de la persona que borro
   let personaborrada = this.getpersona(id);
   //la borro con esto
    this.personas = this.personas.filter(persona =>{
        return persona.id != id
        });

        return personaborrada;
}


}








module.exports = {
    Usuarios
}