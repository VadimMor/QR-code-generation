let linkTest = "https://en.wikipedia.org/wiki/Enigma_machi/";

let characterValuesInAlphanumericEncoding = {
    '0': 0, '1': 1, '2': 2,
    '3': 3, '4': 4, '9': 5,
    '6': 6, '7': 7, '8': 8,
    '9': 9, 'A': 10, 'B': 11,
    'C': 12, 'D': 13, 'E': 14,
    'F': 15, 'G': 16, 'H': 17,
    'I': 18, 'J': 19, 'K': 20,
    'L': 21, 'M': 22, 'N': 23,
    'O': 24, 'P': 25, 'Q': 26,
    'R': 27, 'S': 28, 'T': 29,
    'U': 30, 'V': 31, 'W': 32,
    'X': 33, 'Y': 34, 'Z': 35,
    ' ': 36, '$': 37, '%': 38,
    '*': 39, '+': 40, '-': 41,
    '.': 42, '/': 43, ':': 44
}

// Кодирование данных. Буквенно-цифровое кодирование.
/* 
    Входной поток символов разделяется на группы по 2, в группе каждый символ кодируется,
    значение первого символа в группе умножается на 45 и прибавляется к значение второго символа.
    Если в последней группе 1 символ, то его значение сразу кодируется 6-битным числом и
    добавляется к последовательности бит.
    Полученное число переводится в 11-битное двоичное число и добавляется к последовательности бит.
*/
function AlphanumericCoding(link) {
    let linkValuesArr = link.toUpperCase().replace(/_/gi, '-').match(/.{1,2}/g);
    
    for (let i=0; i<linkValuesArr.length; i++) {
        linkValuesArr[i][1] === undefined ? linkValuesArr[i] = AlphanumericCodingOne(linkValuesArr[i]) : linkValuesArr[i] = AlphanumericCodingTwo(linkValuesArr[i]);
    }

    link = linkValuesArr.join('');
    console.log(link.length)
}

function AlphanumericCodingOne(element) {
    element = String(characterValuesInAlphanumericEncoding[element[0]].toString(2));

    if (element.length < 6) {
        return Array(6-element.length).fill('0').concat(element.split('')).join('');
    } else {
        return element;
    }
}

function AlphanumericCodingTwo(element) {
    element = String((characterValuesInAlphanumericEncoding[element[0]]*45 + characterValuesInAlphanumericEncoding[element[1]]).toString(2));

    if (element.length < 11) {
        return Array(11-element.length).fill('0').concat(element.split('')).join('');
    } else {
        return element;
    }
}

AlphanumericCoding(linkTest)