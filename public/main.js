let socket = io('http://localhost:9000');
$(document).ready(() => {
    let listening = false;
    let mic = $("#mic");

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
            text = text.trim();
            console.log(text)
            if(text.toLowerCase() == "mika" || text.toLowerCase() == "mica"){                
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
            }else if(listening === true){
                    socket.emit('mika-nlp',text);
                    $("#box").append("<p><u>Você</u>:<br> "+text+"</p>");
                    mic.removeClass('fa-microphone')
                    mic.addClass('fa-microphone-slash')
                    listening = false;
            }
        }
    });
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
        //socket.emit('geolocation',geoLocation);
    }, 1000);
}
