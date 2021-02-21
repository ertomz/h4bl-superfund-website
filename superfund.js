var superfundKey = "$2b$10$uL8ywCwlTQxBy85XQ6pHe.nOtVeD2otuBBCudT0kar6DrS/IgZ4Fm";

function getState(sel){
    stateName= sel.options[sel.selectedIndex].text;
    return stateName
}

function parseStateCity(data, state, city) {
    let senator1 = data[state]["senators"]["senator_name_1"];
    let senatorContact1 = data[state]["senators"]["contact_site_1"];
    let senator2 = data[state]["senators"]["senator_name_2"];
    let senatorContact2 = data[state]["senators"]["contact_site_2"];
    let stateCount = data[state]["superfund_sites"];
    let cityCount = 0;
    let highPop = false;

    if (city in data[state]["city"]){
        cityCount = data[state]["city"][city]["superfund_count"];
        if ("black_pop_g13" in data[state]["city"][city]){
            highPop = true;
        }
        console.log(cityCount);
    }

    senatorString = `Your senators are: <a href=${senatorContact1}>${senator1}</a> and <a href=${senatorContact2}>${senator2}</a>`
    cityString = cityCount < 0 ? "" : cityCount > 1 ?  `There are ${cityCount} superfunds in my city, ${city}.` : `There is ${cityCount} superfund in my city, ${city}.`;
    stateString = `There are ${stateCount} superfunds in the state of ${state}`;

    document.getElementById("senators").innerHTML = senatorString;
    document.getElementById("replace").innerHTML = `Dear ${senator1}... ${cityString}...${stateString}, ${highPop}`

}

function onEmailClick(){
    let sel = document.getElementById("input-state");
    let state = getState(sel);
    let city = document.getElementById("input-city").value;

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            data = JSON.parse(req.responseText);            
            parseStateCity(data, state, city);

        };}

    data_loaded = false;

    if (data_loaded == false){
        req.open("GET", "https://api.jsonbin.io/b/6031d4d1d677700867e5c65b/8", true);
        req.setRequestHeader("secret-key", superfundKey);
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


