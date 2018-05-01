let socket = io('http://localhost:9000');
$(document).ready(() => {

    getGeoLocation();

    artyom.initialize({
        lang:"pt-BR",
        continuous:true,
        listen:true,
        debug:false,
        speed:0.9
    }).then(function(){
        console.log("Ready to work !");
    });

    artyom.addCommands({indexes: [],action: function(i){}});


    artyom.redirectRecognizedTextOutput(function(text,isFinal){
        if(isFinal){
            console.log("Enviou: "+text);
            socket.emit('mika-nlp',text);
        }
    });
});

socket.on("mika", function(msg) {
    console.log("Recebeu: "+msg);
    if( msg !== null ){
        artyom.say(msg);
    }
});

function getGeoLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    let geoLocation = {};
    geoLocation.latitude = position.coords.latitude;
    geoLocation.longitude = position.coords.longitude;
    setTimeout(function(){
        socket.emit('geolocation',geoLocation);
    }, 1000);
}