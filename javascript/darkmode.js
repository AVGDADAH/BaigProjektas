const dswitch = document.getElementById("darkmode");
if (dswitch.checked){
    activate();
}


function activate(){
        document.body.classList.toggle("darkmode");
        let texts = document.getElementsByTagName("p");
        for (let element of texts){
            element.classList.toggle("darkmode_textcolor");
        };
}

dswitch.addEventListener("click", activate);