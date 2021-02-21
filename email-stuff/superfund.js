const key = "$2b$10$uL8ywCwlTQxBy85XQ6pHe.nOtVeD2otuBBCudT0kar6DrS/IgZ4Fm";

function parseStateCity(data, state, city) {
    let senator1 = data[state]["senators"]["senator_name_1"];
    let senatorContact1 = data[state]["senators"]["contact_site_1"];
    let senator2 = data[state]["senators"]["senator_name_2"];
    let senatorContact2 = data[state]["senators"]["contact_site_2"];
    let stateCount = data[state]["superfund_sites"];
    let cityCount = 0;

    if (city in data[state]["city"]){
        cityCount = data[state]["city"][city];
        console.log(cityCount);
    }

    senatorString = `Your senators are: <a href=${senatorContact1}>${senator1}</a> and <a href=${senatorContact2}>${senator2}</a>`
    cityString = cityCount < 0 ? "" : cityCount > 1 ?  `There are ${cityCount} superfunds in my city, ${city}.` : `There is ${cityCount} superfund in my city, ${city}.`;
    stateString = `There are ${stateCount} superfunds in the state of ${state}`;

    document.getElementById("senators").innerHTML = senatorString;
    document.getElementById("replace").innerHTML = `Dear ${senator1}... ${cityString}...${stateString}`

}

function onClick(){
    let state = document.getElementById("input-state").value;
    let city = document.getElementById("input-city").value;

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            data = JSON.parse(req.responseText);

            console.log(data[state]);
            
            parseStateCity(data, state, city);

        };}

    data_loaded = false;

    if (data_loaded == false){
        req.open("GET", "https://api.jsonbin.io/b/6031d4d1d677700867e5c65b/3", true);
        req.setRequestHeader("secret-key", key);
        req.send();

    } else {
        parseStateCity(data, state, city);
    }

}

function copyText(){
    var txt = document.getElementById("replace");

    txt.select();
    txt.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");  
}


