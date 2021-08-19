function reverseString(str) {
   
    var characterLists = str.split('');
    var reverseCharacterLists = characterLists.reverse();
    var reversedString = reverseCharacterLists.join('');

    return reversedString;
}

function isPalindrome(str) {
    var reverseStr = reverseString(str);
    if(str === reverseStr) {
        return true;
    } else {
        return false;
    }

}

function convertDateToString(date) {
    var dateString = {
        day: '',
        month: '',
        year: ''
    };

    if(date.day < 10) {
        dateString.day = '0' + date.day;
    } else {
        dateString.day = date.day.toString();
    }

    if(date.month < 10) {
        dateString.month = '0' + date.month;
    } else {
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();

    return dateString;
}


function getDateFormatLists(date) {
    var dateConvertedString = convertDateToString(date);

    var ddmmyyyy = dateConvertedString.day + dateConvertedString.month + dateConvertedString.year;
    var mmddyyyy = dateConvertedString.month + dateConvertedString.day + dateConvertedString.year;
    var yyyymmdd = dateConvertedString.year + dateConvertedString.month + dateConvertedString.day;
    var ddmmyy = dateConvertedString.day + dateConvertedString.month + dateConvertedString.year.slice(-2);
    var mmddyy = dateConvertedString.month + dateConvertedString.day + dateConvertedString.year.slice(-2);
    var yyddmm = dateConvertedString.year.slice(-2) + dateConvertedString.day + dateConvertedString.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}


function checkPalindromeForAllDateFormats(date) {
    var dateFormatLists = getDateFormatLists(date);
    var palindromeCheckFlag = false;
    
    for(var i=0;i<dateFormatLists.length;i++) {
        if(isPalindrome(dateFormatLists[i]) === true) {
            palindromeCheckFlag =  true;
            break;
        }
    }

    return palindromeCheckFlag;
}


function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;
    } else if(year % 100 === 0) {
        return false;
    } else if(year % 4 === 0) {
        return true;
    } else {
        return false;
    }
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    if(month === 2) {
        if(isLeapYear(year) === true) {
            if(day > 29) {
                day = 1;
                month++;
            }
        } else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if(day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if(month > 12) {
        month = 1;
        year++;
    }
    
    return {
        day: day,
        month: month,
        year: year
    }
}


function getNextPalindromeDate(date) {
    var daysRemaining = 0;
    var nextDate = getNextDate(date);
    console.log(nextDate);
    console.log(checkPalindromeForAllDateFormats(nextDate));

    while(1) {
        daysRemaining++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome === true) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    console.log(nextDate);
    console.log(daysRemaining);
    return [daysRemaining, nextDate];
}


var dateInput = document.querySelector("#date-container");
var submitButton = document.querySelector("#submit-button");
var resultOutput = document.querySelector("#result");


function clickHandler() {
    console.log(dateInput.value);

    var birthDateInput = dateInput.value;

    if(birthDateInput==='') {
        console.log('Date field is empty');
    } else {
        var actualDate = birthDateInput.split('-');
        console.log(actualDate);
        var birthDate = {
            day: actualDate[2],
            month: actualDate[1],
            year: actualDate[0]
        };
        console.log(birthDate);
        var isPalindrome = checkPalindromeForAllDateFormats(birthDate);
        console.log(isPalindrome);

        if(isPalindrome === true) {
            console.log(true);
            resultOutput.innerHTML = "Congrats! your birthday is palindrome";
        } else {
            var [daysRemaining, nextDate] = getNextPalindromeDate(birthDate);
            console.log(false);
            resultOutput.innerHTML = `your birthday is not palindrome, the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} which is ${daysRemaining} days remaining from now `;
        }
    }
}




submitButton.addEventListener('click', clickHandler);