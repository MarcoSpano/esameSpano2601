
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    var paraminvocation = "?";

    inv = Object.keys(invocationParameters);
    val = Object.values(invocationParameters);

    for(i=0;i<inv.length;i++) {
        paraminvocation += inv[i] + "="+ val[i] +"&";
    }
    
    var resurl = takeData(url,paraminvocation);
    

    var compare = compareResults(expectedResultData,resurl);

    var statusurl = getstatus(url,paraminvocation);

    var checkstatus;
    
    if(expectedResultStatus == statusurl) checkstatus = true;
    else checkstatus = false;

    var checkPassed;

    if(checkstatus && compare) checkPassed = true;
    else checkPassed = false;
    
    return {
        urlChecked: url,
        resultData: resurl,
        resultStatus: checkstatus,
        statusTestPassed: checkPassed,
        resultDataAsExpected: compare};

}

function takeData(url,paraminvocation) {
    return fetch(url+paraminvocation)
    .then(body => {
        return body.json();
    })
    .then(function(res) {
        //console.log(res.status);
        return res.json();
        })
    .catch(error => {
        console.log(error);
    });
}

function getstatus(url,paraminvocation) {
    return fetch(url+paraminvocation)
    .then(function(res) {
    //console.log(res.status);
    return res.statusText;
    })
    .catch(error => {
        console.log(error);
    });
}



// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = {check};