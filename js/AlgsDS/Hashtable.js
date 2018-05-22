function RunHashtableProblems() {
    // intersection([12, 3, 2, 2], [3, 4, 5, 2]);
}
var intersection = function (nums1, nums2) {
    let a = new Set(nums1);
    let b = new Set(nums2);
    let intersection = [...a].filter(x => b.has(x));
    console.log(intersection);
};

var intersectionMap = function (nums1, nums2) {

}

var singleNumber = function(nums) {
    let mapSet = new Set(nums);
    for(const num of nums){
        if(mapSet.has(num)){
            mapSet.delete(num);
        }
        else{
            mapSet.add(num);
        }
    }
    return mapSet.entries;
};

