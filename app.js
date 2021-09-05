function reverseString(str) {
    var characterLists = str.split('');
    var reverseCharacterLists = characterLists.reverse();
    var reversedString = reverseCharacterLists.join('');

    return reversedString;
}

function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    if(str === reversedString) {
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
    var convertedDateString = convertDateToString(date);
    var ddmmyyyy = convertedDateString.day + convertedDateString.month + convertedDateString.year;
    var mmddyyyy = convertedDateString.month + convertedDateString.day + convertedDateString.year;
    var yyyymmdd = convertedDateString.year + convertedDateString.month + convertedDateString.day;
    var ddmmyy = convertedDateString.day + convertedDateString.month + convertedDateString.year.slice(-2);
    var mmddyy = convertedDateString.month + convertedDateString.day + convertedDateString.year.slice(-2);
    var yymmdd = convertedDateString.year.slice(-2) + convertedDateString.month + convertedDateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllDateFormats(date) {
    var dateFormatLists = getDateFormatLists(date);
    var palindromeCheckFlag = false;
    
    for(var i=0;i<dateFormatLists.length;i++) {
        if(isStringPalindrome(dateFormatLists[i]) === true) {
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

    while(1) {
        daysRemaining++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome === true) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [daysRemaining, nextDate];
}

function getPreviousDate(date)
{
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 3) {
        if(isLeapYear(year)) {
            if(day < 1) {
                day = 29;
                month--;
            }
        } else {
            if(day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if(day < 1) {
            month--;
            if(month < 1) {
                month = 12;
                year--;
            }
            day = daysInMonth[month - 1];
        }
    }

    return {
        day:day,
        month:month,
        year: year,
    }
}

function getPreviousPalindromeDate(date)
{
    var daysPending = 0;
    var previousDate = getPreviousDate(date);

    while(1)
    {
        daysPending++;
        var isPreviousPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPreviousPalindrome)
        {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [daysPending,previousDate];

}

var dateInput = document.querySelector("#date-container");
var submitButton = document.querySelector("#submit-button");
var selectDateOutput = document.querySelector("#select-date-output");
var nextPalindromeOutput = document.querySelector('#result-next-palindrome');
var previousPalindromeOutput = document.querySelector('#result-previous-palindrome');
var resultOutput = document.querySelector('#result-output');


function clickHandler() {

    var birthDateInput = dateInput.value;

    if(birthDateInput==='') {
        selectDateOutput.innerHTML = 'Please select the date';
        nextPalindromeOutput.innerHTML = '';
        previousPalindromeOutput.innerHTML = '';
        resultOutput.innerHTML = '';
    } else {
        var actualDate = birthDateInput.split('-');
        
        var birthDate = {
            day: Number(actualDate[2]),
            month: Number(actualDate[1]),
            year: Number(actualDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(birthDate);

        if(isPalindrome === true) {
            resultOutput.innerHTML = "Congrats! your birthday is palindrome";
            nextPalindromeOutput.innerHTML = '';
            previousPalindromeOutput.innerHTML = '';
            selectDateOutput.innerHTML = '';
        } else {
            var [daysRemaining, nextDate] = getNextPalindromeDate(birthDate);
            var [daysPending, previousDate] = getPreviousPalindromeDate(birthDate);
            
            resultOutput.innerHTML = 'Your birthday is not palindrome';
            nextPalindromeOutput.innerHTML = `the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} which is ${daysRemaining} days remaining from now`; 
            previousPalindromeOutput.innerHTML = `the previous palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year} which is ${daysPending} days remaining from now`;
            selectDateOutput.innerHTML='';
        }
    }
}

submitButton.addEventListener('click', clickHandler);