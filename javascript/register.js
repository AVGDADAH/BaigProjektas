function validateForm(){
    let form = document.forms["registration"];
    if (len(form["username"].value) < 4 || len(form["username"].value) > 15){
        let error = document.getElementById("Error").content;
        console.log("Error")
    }
}