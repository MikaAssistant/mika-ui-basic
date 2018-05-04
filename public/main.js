//let socket = io('http://localhost:9000');
$(document).ready(() => {
    let listening = false;

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
            if(text.toLowerCase() == "mika" || text.toLowerCase() == "mica"){
                let mic = $("#mic");
                mic.removeClass('fa-microphone-slash')
                mic.addClass('fa-microphone')
                listening = true;
                let audio = new Audio('notification.mp3');
                audio.play();
                setTimeout(function(){
                    mic.removeClass('fa-microphone')
                    mic.addClass('fa-microphone-slash')
                    listening = false;
                },10000);
            }else{
                if(listening === true){
                    console.log('enviado: '+ text);
                    mic.removeClass('fa-microphone')
                    mic.addClass('fa-microphone-slash')
                    listening = false;
                }    
            }
            $("#box").append("<p><u>Você</u>:<br> "+text+"</p>");
            //socket.emit('mika-nlp',text);
        }
    });
    //socket.emit('mika-nlp','trocar a cor da lampada da sala para rosa');
});

//socket.on("mika", function(msg) {
//    console.log("Recebeu: "+msg);
//    if( msg !== null ){
//        artyom.say(msg);
//    }
//});

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
        //socket.emit('geolocation',geoLocation);
    }, 1000);
}
