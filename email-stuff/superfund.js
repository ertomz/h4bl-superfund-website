const key = "$2b$10$uL8ywCwlTQxBy85XQ6pHe.nOtVeD2otuBBCudT0kar6DrS/IgZ4Fm";

function onClick(){
    let state = document.getElementById("input").value;

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            data = JSON.parse(req.responseText);
            senator1 = data[state]["senator_name_1"];
            senatorContact1 = data[state]["contact_site_1"];
            senator2 = data[state]["senator_name_2"];
            senatorContact2 = data[state]["contact_site_2"];

            string = `Your senators are: <a href=${senatorContact1}>${senator1}</a> and <a href=${senatorContact2}>${senator2}</a>`

            console.log(senatorContact1);

            document.getElementById("senators").innerHTML = string;
            document.getElementById("replace").innerHTML = `Dear ${senator1}... `

        };}

    req.open("GET", "https://api.jsonbin.io/b/6031d4d1d677700867e5c65b", true);
    req.setRequestHeader("secret-key", key);
    req.send();

}

function copyText(){
    var txt = document.getElementById("replace");

    txt.select();
    txt.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");  
}


