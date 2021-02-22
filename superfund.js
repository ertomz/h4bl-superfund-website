var superfundKey = "$2b$10$uL8ywCwlTQxBy85XQ6pHe.nOtVeD2otuBBCudT0kar6DrS/IgZ4Fm";

function getState(sel){
    stateName= sel.options[sel.selectedIndex].text;
    return stateName
}

function parseStateCity(data, state, county) {
    console.log(data[state])
    let senator1 = data[state]["senators"]["senator_name_1"];
    let senatorContact1 = data[state]["senators"]["contact_site_1"];
    let senator2 = data[state]["senators"]["senator_name_2"];
    let senatorContact2 = data[state]["senators"]["contact_site_2"];
    let stateCount = parseInt(data[state]["superfund_sites"]);
    let countyCount = 0;
    let censusPercent = (data[state]["blk_g13_cnt"])/(data[state]['superfund_sites']) * 100

    if (county in data[state]["counties"]){
        countyCount = data[state]["counties"][county];
    }

    senatorString = `Your senators are: <a href=${senatorContact1}>${senator1}</a> and <a href=${senatorContact2}>${senator2}</a>`;

    
    header = `To The Honorable ${senator1}:`
    introduction = countyCount < 0 ? `I am writing from ${county}, ${state} in regards to our ${stateCount} Superfund sites in ${state}.`
                                 : `I am writing from ${county}, ${state} in regards to our ${countyCount} Superfund sites in ${county} and ${stateCount} in ${state}.`    
    
    percentage = censusPercent > 0 ? `Of those in ${state}, ${censusPercent}% are in counties with higher than average proportion of Black Americans in their population.`
                                   : ""

    
    document.getElementById("senators").innerHTML = senatorString;
    document.getElementById("replace").innerHTML = `${header} 
        ${introduction}  ${percentage}
        
        The Superfund is a noble federal project that aims to restore health and safety to Americans across the country by relieving them from contact with toxic materials that are harmful to not only their own livelihood, but that of their lineage. It must, however, like every branch and sector of this government, serve all residents of this country equally. I am therefore writing to ask you to put pressure on Congress to fund the EPA’s Superfund Trust Fund.
        
        Communities of color are far too often victims to the social and health impacts of pollution. While minorities comprise just shy of 40% of the U.S. population, the EPA states that they comprise 50% of the population who live within 1 mile of a Superfund Site.

        Cleanup of superfund sites not only makes the areas safer; the completion of a cleanup also improves public health, local economies, and scientific and technological advancements, according to the EPA. It is an investment in the community’s future!

        In 2017, Cory Booker introduced the Environmental Cleanup Infrastructure Act, aiming to address environmental racism and assist further EPA cleanup at superfund sites. It did not pass. For any moment in history, now is the time to revamp our commitment to preserving the environment and mitigating racial systems of oppression.

        The Trump administration slashed the Superfund program by 30%. I can not accept this as my future. The time is now to invest in health, in racial equality, and in an American system that works for all people.

        Thank you for your time, Senator ${senator1}.

        Appreciatively,
        <YOUR NAME>
        
        <YOUR ADDRESS>

        `

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
        req.open("GET", "https://api.jsonbin.io/b/6031d4d1d677700867e5c65b/11", true);
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


