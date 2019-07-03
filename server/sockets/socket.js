const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');

const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {
    
   client.on('entrarChat',(data,callback)=>{
     
    //si no existe el nombre retorna
    if(!data.nombre || !data.sala ){
        return callback({
            error:true,
            mensaje:'el nombre/sala es necesario'
        })
    }
    //uno al cliente a una sala.
    client.join(data.sala);

     usuarios.agregarPersona(client.id, data.nombre,data.sala );
    //emite a todas las personas de la misma sala que usuarios estan conectados
    client.broadcast.to(data.sala).emit('listaPersona',usuarios.getpersonasPorsala(data.sala));
    
    
    callback(usuarios.getpersonasPorsala(data.sala))

    });


    client.on('crearMensaje',(data)=>{
        //mando el client.id que es el id del cliente
        let persona = usuarios.getpersona(client.id);

        let mensaje = crearMensaje(persona.nombre,data.mensaje)

        client.broadcast.to(persona.data).emit('crearMensaje',mensaje);
    })


    client.on('disconnect',() =>{
        //llama a la funcion borrar persona
       let personaborrada = usuarios.eliminarpersona(client.id);
        //emite un mensaje a los usuarios de que salio la persona
       client.broadcast.to(personaborrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaborrada.nombre} salio`))
       //emite a los usuarios todas las personas conectadas
       client.broadcast.to(personaborrada.sala).emit('listaPersona',usuarios.getpersonasPorsala(personaborrada.sala));

    }); 
    //mensajes privados
    client.on('mensajePrivado',data =>{
        let persona = usuarios.getpersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje))

    })   
    

});