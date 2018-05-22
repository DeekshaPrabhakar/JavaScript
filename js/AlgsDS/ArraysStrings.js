function run() {
    //reverseString("hello");
    // console.log(isValid("()[]{}"));
    // console.log(isValid("([)]"));
    // console.log(isValid("]"));
    // console.log(isPalindrome("A man, a plan, a canal: Panama"));
    // console.log(isPalindrome("race a car"));

    console.log(countAndSay(3));
    console.log(countAndSay(4));
    console.log(countAndSay(5));
}

var isValid = function (s) {
    var valid = true;
    var stack = new Stack();

    var strArray = s.split("");
    for (var str of strArray) {
        if (isOpen(str)) {
            stack.push(str);
        }
        else {
            var openCh = getOpenChForCloseCh(str);
            if (stack.size() == 0) {
                valid = false;
                break;
            }
            if (stack.pop() != openCh) {
                valid = false;
                break;
            }
        }
    }
    if (stack.size() > 0) {
        valid = false;
    }
    return valid;
};

function getOpenChForCloseCh(ch) {
    var openCh = "";
    switch (ch) {
        case ")":
            openCh = "(";
            break;
        case "}":
            openCh = "{";
            break;
        case "]":
            openCh = "[";
            break;
        default:
            break;
    }
    return openCh;
}

function isOpen(ch) {
    var isOpen = false;
    switch (ch) {
        case "(":
            isOpen = true;
            break;
        case "{":
            isOpen = true;
            break;
        case "[":
            isOpen = true;
            break;
        default:
            break;
    }
    return isOpen;
}

var reverseString = function (s) {
    return s.split("").reverse().join("");
};

var isPalindrome = function (s) {
    if (s.length == 0) {
        return true;
    }
    var palindrome = true;
    var cleanStr = alphaNumeric(s);
    var chArray = cleanStr.split("");

    var i = 0;
    var j = chArray.length - 1;

    while (i <= j) {
        if (chArray[i].toLowerCase() != chArray[j].toLowerCase()) {
            palindrome = false;
            break;
        }
        i += 1;
        j -= 1;
    }


    return palindrome;
};

function alphaNumeric(s) {
    return s.replace(/[^0-9a-z]/gi, '');
}

var countAndSay = function (n) {
    if (n == 1) {
        return "1";
    }
    if (n == 2) {
        return "11";
    }

    var str = "11";
    var i = 2;
    while (i < n) {

        var strArray = str.split("");
        var count = 1;
        var prevCh = strArray[0];
        var current = 1;
        var newStr = "";

        while (current < strArray.length) {

            if (prevCh == strArray[current]) {
                count += 1;
            }
            else {
                newStr += count + prevCh;
                count = 1;
                prevCh = strArray[current];
            }
            current += 1;
        }
        newStr += count + prevCh;
        str = newStr;
        i += 1;
    }
    return newStr;
};

var romanToInt = function (s) {

};

function IntForRoman(ch) {
    var intValue = -1;
    switch (ch) {
        case "I":
            intValue = 1;
            break;
        case "V":
            intValue = 5;
            break;
        case "X":
            intValue = 10;
            break;
        case "L":
            intValue = 50;
            break;
        case "C":
            intValue = 100;
            break;
        case "D":
            intValue = 500;
            break;
        case "M":
            intValue = 1000;
            break;
        default:
            break;
    }
    return intValue
}

var isAnagram = function (s, t) {

    let str1 = s.length >= t.length ? s : t;
    let str2 = s.length >= t.length ? t : s;


};

function buildMap(str) {
    let map = new Map();
    for (let s of str) {
        if (map.has(s)) {
            map.set(ch, map.get(ch) + 1);
        }
        else {
            map.set(ch, 1);
        }
    }
    return map;
}

