function sumFromArray(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (target - arr[i] === arr[j]) {
                return [arr[i], arr[j]]
            }
        }
    }
    return "inapplicable"
}
