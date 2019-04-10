function RunHashtableProblems() {
    // intersection([12, 3, 2, 2], [3, 4, 5, 2]);
    // console.log(singleNumber([1,1,2,3,4,4,3]));
    // console.log(isAnagram("anagram","nagaram"));
    // console.log(isAnagram("rat","car"));
    // console.log(containsDuplicate([1,2,3,1]));
    // console.log(containsDuplicate([1,2,3,4]));
    // console.log(containsDuplicate([1,1,1,3,3,4,3,2,4,2]));
    // console.log(firstUniqChar("leetcode"));
    // console.log(firstUniqChar("loveleetcode"));
    // console.log(intersect([1, 2, 2, 1],[2, 2]));
    // console.log(intersect([1,2,3],[1,4,3]));
    // console.log(isHappy(19));
    // console.log(isHappy(20));

    // console.log(twoSum([2, 7, 11, 15], 9));
    console.log(twoSum([3,3],6));
    // console.log(twoSum([],));
}

var twoSum = function(nums, target) {
    let resultArr = [];
    let digitMap = new Map();

    for(let i = 0; i< nums.length; i++){
        if(digitMap.has(nums[i])){
            let arr = digitMap.get(nums[i]);
            arr.push(i);
        }
        else{
            digitMap.set(nums[i],[i]);
        }
    }


    for(let i=0; i<nums.length; i++){
        const currentNum =  nums[i];
        const complement = target - currentNum;
        if(digitMap.has(complement)){
            
            if(currentNum != complement){
                resultArr.push(i);
                resultArr.push(digitMap.get(complement)[0]);
                break;
            }
            else {
                let arr = digitMap.get(complement).sort();
                let filteredArray = arr.filter(x => x != i);
                if(filteredArray.length > 0){
                    resultArr.push(i);
                    resultArr.push(filteredArray[0]);
                    break;
                }
            }

            
        }
    }
    return resultArr;
};

var isHappy = function(n) {
    let happySet = new Set();
  
    let num = n;
    while(num != 1){
        if(happySet.has(num)){
            return false;
        }
        else{
            happySet.add(num);
        }
        num = calculateSumofSquareOfDigits(num);
    }
    return true;
};

function calculateSumofSquareOfDigits(n){
    let sum = 0;
    let num = n + "";

    for(const ch of num){
        const digit = parseInt(ch);
        sum += digit * digit;
    }   

    return sum;
}

var intersect = function(nums1, nums2) {

    let arr = nums1.length > nums2.length ? nums1 : nums2;
    let otherArr = nums1.length > nums2.length ? nums2 : nums1;

    let arrMap = new Map();

    for(const num of arr){
        if(arrMap.has(num)){
            arrMap.set(num, arrMap.get(num) + 1);
        }
        else{
            arrMap.set(num, 1);
        }
    }

    let resultArr = [];

    for(const num of otherArr){
        if(arrMap.has(num)){
            resultArr.push(num);
            
            arrMap.set(num, arrMap.get(num) -1);
            if(arrMap.get(num) == 0){
                arrMap.delete(num);
            }
        }
    }

   return resultArr; 
};

var firstUniqChar = function(s) {
    let charMap = new Map();
    for(const ch of s){
        if(charMap.has(ch)){
            charMap.set(ch, charMap.get(ch) + 1);
        }
        else{
            charMap.set(ch, 1);
        }
    }

    for(let i=0; i< s.length; i++){
        if(charMap.get(s[i]) == 1){
            return i;
        }
    }
    return -1;
};

var containsDuplicate = function(nums) {
    const numsSet = new Set(nums);
    return numsSet.size != nums.length;
};

var isAnagram = function(s, t) {
    if(s.length != t.length){
        return false;
    }

    let charMap = new Map();
    for(const ch of s){
        if(charMap.has(ch)){
            charMap.set(ch, charMap.get(ch) + 1);
        }
        else{
            charMap.set(ch, 1);
        }
    }

    for(const ch of t){
        if(charMap.has(ch)){
            charMap.set(ch, charMap.get(ch) - 1);
            if(charMap.get(ch) == 0){
                charMap.delete(ch);
            }
        }
        else{
            return false;
        }
    }

    if(charMap.size > 0){
        return false;
    }
    return true;
};

var intersection = function (nums1, nums2) {
    let a = new Set(nums1);
    let b = new Set(nums2);
    let intersection = [...a].filter(x => b.has(x));
    console.log(intersection);
};

var intersectionMap = function (nums1, nums2) {

}

var singleNumber = function (nums) {
    // let mapSet = new Set();
    // for (const num of nums) {
    //     if (mapSet.has(num)) {
    //         mapSet.delete(num);
    //     }
    //     else {
    //         mapSet.add(num);
    //     }
    // }

    // const iterator = mapSet.values();
    // const num = iterator.next();
    // return num.value;

    let sNumber = "";
    for(const num of nums){
        sNumber = sNumber ^ num;
    }
    return sNumber;
};

