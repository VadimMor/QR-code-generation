let linkTest = "https://en.wikipedia.org/wiki/Enigma_machineuieyhgjkmhthtyjtneyubnhfdgrgrgfrtuiehg6urgfuymygbfuyvg";

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

// Количество байтов коррекции на один блок
const numberOfCorrectionBytesPerBlock = [
    17, 28, 22, 16, 22, 28, 26, 26, 24, 28,
    24, 28, 22, 24, 24, 30, 28, 28, 26, 28,
    30, 24, 30, 30, 30, 30, 30, 30, 30, 30,
    30, 30, 30, 30, 30, 30, 30, 30, 30, 30
]

// Генирирующие многочлены
const generatingPolynomials = {
    7: [87, 229, 146, 149, 238, 102, 21],
    10: [251, 67, 46, 61, 118, 70, 64, 94, 32, 45],
    13: [74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78],
    15: [	8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105],
    16: [120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120],
    17: [43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163, 136],
    18: [215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153],
    20: [17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156, 164, 212, 212, 188, 190],
    22: [210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219, 134, 160, 105, 165, 231],
    24: [229, 121, 135, 48, 211, 117, 251, 126, 159, 180, 169, 152, 192, 226, 228, 218, 111, 0, 117, 232, 87, 96, 227, 21],
    26: [173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70],
    28: [168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123],
    30: [41, 173, 145, 152, 216, 31, 179, 182, 50, 48, 110, 86, 239, 96, 222, 125, 42, 173, 226, 193, 224, 130, 156, 37, 251, 216, 238, 40, 192, 180]
}


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
function filling(serviceFieldsBit, qrCodeVersion, repeatFill = 0) {
    if (serviceFieldsBit.length % 8 == 0) {
        if (serviceFieldsBit.length == tableMaximumAmountOfInformationHight[qrCodeVersion]) {
            return serviceFieldsBit
        } else {
            if (repeatFill % 2) {
                return filling(serviceFieldsBit+"00010001", qrCodeVersion, ++repeatFill);
            } else {
                return filling(serviceFieldsBit+"11101100", qrCodeVersion, ++repeatFill);
            }
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
    if (NumbersOfBlocksHight[qrCodeVersion] != 1) {
        NumberOfBlocks = NumbersOfBlocksHight[qrCodeVersion],
        linkBytesLenght = linkBitString.length / 8,
        arrBytes = new Array();

        if (linkBytesLenght % NumberOfBlocks) {
            for (let i=0, plus=NumberOfBlocks - linkBytesLenght % NumberOfBlocks; i < NumberOfBlocks; i++) {
                if (i < plus) {
                    arrBytes.push(
                        linkBitString.slice(
                            i * Math.floor(linkBytesLenght / NumberOfBlocks) * 8,
                            i * Math.floor(linkBytesLenght / NumberOfBlocks) * 8 + Math.floor(linkBytesLenght / NumberOfBlocks) * 8
                        )
                    )
                } else if (i == plus) {
                    arrBytes.push(
                        linkBitString.slice(
                            i * Math.floor(linkBytesLenght / NumberOfBlocks) * 8,
                            i * Math.floor(linkBytesLenght / NumberOfBlocks) * 8 + Math.floor(linkBytesLenght / NumberOfBlocks) * 8 + 8
                        )
                    )
                } else {
                    arrBytes.push(
                        linkBitString.slice(
                            i * Math.floor(linkBytesLenght / NumberOfBlocks) * 8 + 8,
                            i * Math.floor(linkBytesLenght / NumberOfBlocks) * 8 + Math.floor(linkBytesLenght / NumberOfBlocks) * 8 + 16
                        )
                    )
                }
            }
        } else {
            for (let i=0; i < NumberOfBlocks; i++) {
                arrBytes.push(
                    linkBitString.slice(
                        i * linkBytesLenght / NumberOfBlocks * 8,
                        i * linkBytesLenght / NumberOfBlocks * 8 + linkBytesLenght / NumberOfBlocks * 8
                    )
                )
            }
        }
    }

    return arrBytes
}


// Создание байтов коррекции
/*

*/
function CreationOfCorrectionBytes() {

}

function main() {
    let linkBitString = AlphanumericCoding(linkTest);
    let qrCodeVersion = AddingServiceInformation(linkBitString.length);
    let serviceFields = AddingServiceFields(linkBitString, qrCodeVersion);
    linkBitString = serviceFields[0],
    qrCodeVersion = serviceFields[1];
    linkBitString = filling(linkBitString, qrCodeVersion);
    let arrBytes = dividingInformationIntoBlocks(linkBitString, qrCodeVersion);
    console.log(arrBytes[0].length / 8, qrCodeVersion)
}

main()