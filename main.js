let linkTest = "https://en.wikipedia.org/wiki/Enigma_machinesdfssdfsdfdf";

// Значения символов в буквенно-цифровом кодировании.
const characterValuesInAlphanumericEncoding = {
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

const tableMaximumAmountOfInformationHight = [
    72, 128, 208, 288,
    368, 480, 528, 688,
    800, 976, 1120, 1264,
    1440, 1576, 1784, 2024,
    2264, 2504, 2728, 3080,
    3248, 3536, 3712, 4112,
    4304, 4768, 5024, 5288,
    5608, 5960, 6344, 6760,
    7208, 7688, 7888, 8432,
    8768, 9136, 9776, 10208
]

//  Длина поля количества данных
const DataQuantityFieldLength = {
    '1-9': 9,
    '10-26': 11,
    '27-40': 13
}

// Количество блоков
const NumbersOfBlocksHight = [
    1, 1, 2, 4, 4, 4, 5, 6, 8, 8,
    11, 11, 16, 16, 18, 16, 19, 21, 25, 25,
    25, 34, 30, 32, 35, 37, 40, 42, 45, 48,
    51, 54, 57, 60, 63, 66, 70, 74, 77, 81
]


// Кодирование данных. Буквенно-цифровое кодирование.
/* 
    Входной поток символов разделяется на группы по 2.
    После каждая группа преобразуется в битовые числа и
    соединяется в в одну последовательность бит.
*/
function AlphanumericCoding(link) {
    let linkValues = link.toUpperCase().replace(/_/gi, '-').match(/.{1,2}/g);
    
    for (let i=0; i<linkValues.length; i++) {
        linkValues[i][1] === undefined ? linkValues[i] = AlphanumericCodingOne(linkValues[i]) : linkValues[i] = AlphanumericCodingTwo(linkValues[i]);
    }

    return linkValues.join('');
}

/*
    Если в последней группе 1 символ, то его значение сразу кодируется 6-битным числом.
*/
function AlphanumericCodingOne(element) {
    element = String(characterValuesInAlphanumericEncoding[element[0]].toString(2));

    return element.length < 6 ? Array(6-element.length).fill('0').concat(element.split('')).join('') : element;
}

/* 
    Если в группе каждый символ кодируется, значение первого символа в
    группе умножается на 45 и прибавляется к значение второго символа.
    Полученное число переводится в 11-битное двоичное число.
*/
function AlphanumericCodingTwo(element) {
    element = String((characterValuesInAlphanumericEncoding[element[0]]*45 + characterValuesInAlphanumericEncoding[element[1]]).toString(2));

    return element.length < 11 ? Array(11-element.length).fill('0').concat(element.split('')).join('') : element;
}


// Добавление служебной информации и заполнения.
/*
    Добавление служебной информации.
    Определение версии QR-кода по количеству кодируемой информации
    и уровня коррекции.
*/
function AddingServiceInformation(linkBitStringLength) {
    let qrCodeVersion = tableMaximumAmountOfInformationHight.indexOf(tableMaximumAmountOfInformationHight.find(value => Math.abs(value - linkBitStringLength) === Math.min(...tableMaximumAmountOfInformationHight.map(value => Math.abs(value - linkBitStringLength)))));
    
    return linkBitStringLength <= tableMaximumAmountOfInformationHight[qrCodeVersion] ? qrCodeVersion : qrCodeVersion+1;
}

/*
    Добавление служебных полей.
    Способ кодирования — поле длиной 4 бита - 0010 для буквенно-цифрового.
    Служебных поле - 
*/
function AddingServiceFields(linkBitString, qrCodeVersion) {
    let DataFieldLength;

    for (let key in DataQuantityFieldLength) {
        key = key.split('-');
        
        if (key[0] <= qrCodeVersion && qrCodeVersion <= key[1]) {
            DataFieldLength = DataQuantityFieldLength[key.join('-')];
        }
    }

    let resDataBitField = String(linkBitString.length.toString(2)) + "0010" + linkBitString;
    
    if (resDataBitField.length <= tableMaximumAmountOfInformationHight[qrCodeVersion]) {
        return [resDataBitField, qrCodeVersion]
    } else {
        AddingServiceFields(linkBitString, qrCodeVersion+1)
    }
}

/*
    Заполнение.
    Если последовательность бит не кратна 8, тогда нужно дополнить её
    нулями так, чтобы её длина стала кратна 8.
    Потом если количество бит в текущей последовательности байт меньше того,
    которое нужно для выбранной версии, то её надо дополнить чередующимися
    байтами 11101100 и 00010001
*/
function filling(serviceFieldsBit, qrCodeVersion) {
    if (serviceFieldsBit.length % 8 == 0) {
        if (serviceFieldsBit.length == tableMaximumAmountOfInformationHight[qrCodeVersion]) {
            return serviceFieldsBit
        } else {
            if ((tableMaximumAmountOfInformationHight[qrCodeVersion] - serviceFieldsBit.length) % 16 == 0) {
                return (serviceFieldsBit + '1110110000010001'.repeat((tableMaximumAmountOfInformationHight[qrCodeVersion] - serviceFieldsBit.length) / 16));
            } {
                return (serviceFieldsBit + '1110110000010001'.repeat(Math.ceil((tableMaximumAmountOfInformationHight[qrCodeVersion] - serviceFieldsBit.length) / 16)).slice(0, -8))
            };
        }
    } else {
        serviceFieldsBit =  serviceFieldsBit + '0'.repeat(Math.ceil(serviceFieldsBit.length / 8) * 8 - serviceFieldsBit.length);
        
        return filling(serviceFieldsBit, qrCodeVersion);
    }
}

// Разделение информации на блоки.
/*
    Последовательность байт разделяется на обределённое для версии и
    уровня коррекции количество блоков.
*/
function dividingInformationIntoBlocks(linkBitString, qrCodeVersion) {
    if (NumbersOfBlocksHight[qrCodeVersion] == 1) {
        return linkBitString
    } else {
        let NumberOfBlocksHight = NumbersOfBlocksHight[qrCodeVersion],
        stringBit = [];

        if (linkBitString.length / 8 % NumberOfBlocksHight == 0) {
            console.log(linkBitString.length / 8 % NumberOfBlocksHight)
        } else {
            console.log(linkBitString.length / 8 % NumberOfBlocksHight)
        }
    }
}

function main() {
    let linkBitString = AlphanumericCoding(linkTest);
    let qrCodeVersion = AddingServiceInformation(linkBitString.length);
    let serviceFields = AddingServiceFields(linkBitString, qrCodeVersion);
    linkBitString = serviceFields[0],
    qrCodeVersion = serviceFields[1];
    linkBitString = filling(linkBitString, qrCodeVersion);
    dividingInformationIntoBlocks(linkBitString, qrCodeVersion)
}

main()