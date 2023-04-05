const dswitch = document.getElementById("darkmode");
if (dswitch.checked){
    activate();
}

//alert(dswitch.checked)

function activate(){
        document.body.classList.toggle("darkmode");
        let texts = document.getElementsByTagName("p");
        const labels = document.getElementsByTagName("label")
        //TODO: Make this with 1 loop
        for (let label of labels){
            label.classList.toggle("darkmode_textcolor");
        };
        for (let element of texts){
            element.classList.toggle("darkmode_textcolor");
        };
}

dswitch.addEventListener("click", activate);