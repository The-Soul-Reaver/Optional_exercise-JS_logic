function hexToDecimal(hex_num) {
	return parseInt(hex_num, 16)
}

function decimalToHex(dec_num) {
	dec_num = parseInt(dec_num);
	let hex_num = dec_num.toString(16);
	if (hex_num.length === 1) {
		hex_num = "0" + hex_num;
	}
	return hex_num
}

function removeHashtag(string) {
	if (string.startsWith("#")) {
		string = string.slice(1);
	    return string
	}
}

function splitHex(string) {
	const substrings = [];
	string = removeHashtag(string);
	for (let i = 0; i < string.length; i += 2) {
		substrings.push(string.slice(i, i + 2));
	}
	return substrings
}

function hexOrDec(string) {
	string = string.replace(/\s/g, "")
	const regex = /\d+\,\d+\,\d+/;
	if (string.startsWith("#")) {
		return "hex"
	} else if (regex.test(string) === true) {
		return "rgb"
	} else {
		return "neither"
	}
}

function processHex(string) {
	// debugger;
	const regex = /,(?=[^,]*$).*/;
	let rgbValue = "rgb(";
	rgbArr = splitHex(string);
	for (item of rgbArr) {
		item = hexToDecimal(item);
		rgbValue = rgbValue + item + ", ";
	}
	rgbValue = rgbValue.replace(regex, ")");
	return rgbValue
}

function processRGB(string) {
	let hexValue = "";
	string = string.replace("rgb(", "");
	string = string.replace(")", "");
	rgbArr = string.split(",").map(item => item.trim());
	for (item of rgbArr) {
		hexValue = hexValue + decimalToHex(item);
	}
	return `#${hexValue}`
}

document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("userInput");
    const convertButton = document.getElementById("convert");
    const resultMessage = document.getElementById("resultMessage");

    document.body.style.backgroundColor = userInput.placeholder;

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            convertButton.click();
        }
    }

    function handleConvertButtonClick() {
        const colorValue = userInput.value;
        let hexOrDecVar = hexOrDec(colorValue);
        console.log(hexOrDecVar);
        let message = "";
        if (hexOrDecVar === "rgb") {
        	let hexValue = processRGB(colorValue);
        	console.log(hexValue);
        	message = `The hex value is ${hexValue}`;
        	document.body.style.backgroundColor = hexValue;
        } else if (hexOrDecVar === "hex") {
        	let rgbValue = processHex(colorValue);
        	console.log(rgbValue);
        	message = `The RGB value is ${rgbValue}`;
        	document.body.style.backgroundColor = rgbValue;
        }
        resultMessage.textContent = message;

        if (colorValue.length > 0) {
        	document.body.style.backgroundColor = colorValue;
        }       
    }

    convertButton.addEventListener("click", handleConvertButtonClick);
    userInput.addEventListener("keypress", handleKeyPress);
});
