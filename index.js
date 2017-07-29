
var fs = require('fs');
var jsStringEscape = require('js-string-escape');

var myArgs = process.argv.slice(2);

console.log("Found files",myArgs);

for ( i = 0; i< myArgs.length; i++){
    var v = require('./'+myArgs[i]);
    //console.log(v);
    const filename = v["test-folder"] + "/" + getTestFilename(v["code-file"]);
    var stream = fs.createWriteStream(filename);

    stream.write(`describe( "Tests for ${v["code-file"]}", function(){\n`);
    stream.write(`\tvar ${v["function-under-test"]} = require ('../../${v["code-file"].slice(0,-3)}').${v["function-under-test"]};\n`);

    var tests = v["test-descriptions"];
    for (j =  0; j < tests.length; j++){
        stream.write(`\tit ('${jsStringEscape(tests[j])}', function() {\n`);
        stream.write(`\t\texpect(${getTesCall(tests[j])}).toBe(${getTestResult(tests[j])});\n`);
        stream.write("\t});\n");
    }
    stream.write("});\n");
    stream.end();
}

function getTestFilename(str){
    const start = str.lastIndexOf("/")+1;
    return str.slice(start,-3)+"-spec.js";
}

function getTesCall(str){
    const end = str.lastIndexOf(" should");
    return str.slice(0,end);
}
function getTestResult(str){
    const start = str.lastIndexOf(" should return ")+" should return ".length;
    return str.slice(start,-1);
}

// describe( "Tests for caesers-cipher", function(){
//
//     var cipher = require ('../../basic/caesars-cipher');
//
//     it('rot13("SERR PBQR PNZC") should decode to "FREE CODE CAMP"', function() {
//         var secret = "SERR PBQR PNZC";
//         var clearText = "FREE CODE CAMP";
//         expect(cipher.rot13(secret)).toBe(clearText);
//     });


// {
//     "code-file":"intermediate/boo-who.js",
//     "test-folder":"intermediate-tests",
//     "function-under-test":"booWho",
//     "test-descriptions": [
//     "booWho(true) should return true.",
//     "booWho(false) should return true.",
//     "booWho([1, 2, 3]) should return false.",
//     "booWho([].slice) should return false.",
//     "booWho({ 'a': 1 }) should return false.",
//     "booWho(1) should return false.",
//     "booWho(NaN) should return false.",
//     "booWho('a') should return false.",
//     "booWho('true') should return false.",
//     "booWho('false') should return false."
// ]
// }