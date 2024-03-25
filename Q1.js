const inputArray = [1,2,4,591,392,"b",391,2,5,10,2,1,1,"a","b",1,20,20];

function cleanTheRoom(arr) {
	const numbers = [];
  const strings = [];
  let sortedArray = [];
  arr.forEach(element => {
  	if (typeof element === 'number') {
  		numbers.push(element);
  	} else if (typeof element === 'string') {
  		strings.push(element);
  	}
  });
  if (numbers.length > 0) {
  	const sortedNumbers = sortNumbers(numbers);
  	const groupedNumbers = groupIdentical(sortedNumbers);
  	sortedArray.push(groupedNumbers);
  }
  if (strings.length > 0) {
  	const sortedStrings = strings.sort();	
  	const groupedStrings = groupIdentical(sortedStrings);
  	sortedArray.push(groupedStrings);
  }
  return sortedArray
}

// This function subtracts b from a. If the result is negative, a comes before b in the sorted array, if positive, b comes before a, and if zero, they remain in the same order.
function sortNumbers(arr) {
	return arr.sort((a, b) => a - b);
}

function groupIdentical(arr) {
  const grouped = [];
  let currentGroup = [];

  arr.forEach((element, index) => {
    if (index === 0 || element !== arr[index - 1]) {
      if (currentGroup.length > 1) {
        grouped.push(currentGroup);
      } else if (currentGroup.length === 1) {
        grouped.push(currentGroup[0]); 
      }
      currentGroup = [element];
    } else {
      currentGroup.push(element);
    }
  });

  if (currentGroup.length > 1) {
    grouped.push(currentGroup);
  } else if (currentGroup.length === 1) {
    grouped.push(currentGroup[0]);
  }
  
  return grouped;
}
