/* 
GENERATE RANDOM NUMBER FROM SPECIFIED RANGE
*/
function generateRandom(min,max) {
    return Math.floor(Math.random() * (max - min)) + min
}


function getRandomInRange(min, max, fixed) {
    return (Math.random() * (max - min) + min).toFixed(fixed) * 1;
}
/* 
CHECK IF OBJECT IS EMPTY
*/
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/* 
CHECK IF TWO ARRAYS ARE EQUAL
*/
function arraysEqual (a, b) {
    if (a === b) return true ;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i)  if (a[i] !== b[i]) return false;

    return true;
}

/* 
DIFFERENCE BETWEEN TWO ARRAYS
*/
function arraysDiff (a1, a2) {
    let a = [], diff = [];

    for (let i = 0; i < a1.length; i++)  a[a1[i]] = true;

    for (let i = 0; i < a2.length; i++) 
        if (a[a2[i]]) 
            delete a[a2[i]];
        else 
            a[a2[i]] = true;

    for (let k in a) diff.push(k);

    return diff;
}

/* 
 * Generate Access Token
 */
function generateAccessToken() {
    let randomString = require("randomstring"),
        Encrypt = require('./../Configs/encrypt'),
        encrypt = new Encrypt();

    let tokenString = randomString.generate({
        length: 25,
        charset: 'alphanumeric'
    });

    return encrypt.encryptEntity(tokenString);
}

module.exports = {
    generateRandom,
    getRandomInRange,
    generateAccessToken,
    isEmpty,
    arraysEqual,
    arraysDiff
}