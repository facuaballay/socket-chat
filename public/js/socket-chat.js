

var socket = io();

var params = new URLSearchParams(window.location.search);

//si no esta el parametro nombre te devuelve al index
if(!params.has('nombre') || !params.has('sala')){
    
    window.location = 'index.html'
    throw new Error('el nombre y sala son necesarios')
}
//obtiene el parametro nombre
var usuario = {
    nombre : params.get('nombre'),
    sala:params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario,function (resp){

        console.log('Usuarios conectados',resp);
    })

});



// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
//escuchar cuando un usuario entre o sale del chat
socket.on('listaPersona', function(personas) {

    console.log(personas);
});

//mensajes privados.
socket.on('mensajePrivado',function(mensaje){
    console.log('Mensaje Privado: ',mensaje);
})