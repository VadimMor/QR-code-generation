let linkTest = "https://en.wikipedia.org/wiki/Enigma_machinekuguyefvytyf342";

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

// Поле Галуа
const GaloisField = [
    1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205,  135, 19, 38,
    76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192,
    157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35,
    70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161,
    95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240,
    253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226,
    217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206,
    129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204,
    133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84,
    168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115,
    230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255,
    227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65,
    130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166,
    81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9,
    18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22,
    44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 1
]

// Обратное поле Галуа
const reverseGaloisField = [
    undefined, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75,
    4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113,
    5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69,
    29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166,
    6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136,
    54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64,
    30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61,
    202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87,
    7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24,
    227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46,
    55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97,
    242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162,
    31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246,
    108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90,
    203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215,
    79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175
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
function CreationOfCorrectionBytes(arrBytes, qrCodeVersion) {   
    let  arrBytesCorrections = new Array();

    arrBytes.map(arrByte => {
        let generatingPolynomial = generatingPolynomials[numberOfCorrectionBytesPerBlock[qrCodeVersion]];
        let temporaryPolynomial = [...generatingPolynomial];

        arrByte = arrByte.match(/.{1,8}/g)
        arrByte.map((byte, key) => {
            arrByte[key] = parseInt(byte, 2)
        })

        arrByte = arrByte.concat(new Array(generatingPolynomial.length - arrByte.length).fill(0))

        for (let i=0; i<arrByte.length; i++) {
            if (!arrByte[0]) {
                break
            }

            let firstVariable = arrByte[0];
            let secondVariable = reverseGaloisField[firstVariable];

            temporaryPolynomial.map((el, key) => {
                temporaryPolynomial[key] = arrByte[key] ^ GaloisField[(el + secondVariable) % 255];
            })

            arrByte.push(0);
            arrByte.shift();
        }
        arrBytesCorrections.push(temporaryPolynomial)
    })

    return arrBytesCorrections
}

// Объединение блоков
function combiningBlocks(arrBytes, arrBytesCorrections, qrCodeVersion) {
    arrBytes.map((arrByte, key) => {
        arrBytes[key] = arrByte.match(/.{1,8}/g);
    })

    arrBytesCorrections.map((arrByte, key) => {
        arrBytesCorrections[key] = arrByte;

        arrByte.map((byte, key) => {
            arrByte[key] = byte.toString(2);
            arrByte[key] = new Array(8 - arrByte[key].length).fill(0).concat(arrByte[key]).join('');
        })
    })

    let arrByteCode = new Array();

    for (let i=0, j=0; j<arrBytes[arrBytes.length-1].length; i++) {
        if (arrBytes[i][j] === undefined) {
            continue
        }

        arrByteCode.push(arrBytes[i][j])

        if (i==3) {
            i=-1; 
            j++
        }
    }

    for (let i=0, j=0; j<arrBytesCorrections[0].length; i++) {

        arrByteCode.push(arrBytesCorrections[i][j])

        if (i==3) {
            i=-1; 
            j++
        }
    }

    return arrByteCode
}

function main() {
    let linkBitString = AlphanumericCoding(linkTest);
    let qrCodeVersion = AddingServiceInformation(linkBitString.length);
    let serviceFields = AddingServiceFields(linkBitString, qrCodeVersion);
    linkBitString = serviceFields[0],
    qrCodeVersion = serviceFields[1];
    linkBitString = filling(linkBitString, qrCodeVersion);
    let arrBytes = dividingInformationIntoBlocks(linkBitString, qrCodeVersion);
    arrBytesCorrections = CreationOfCorrectionBytes(arrBytes, qrCodeVersion);
    let arrByteCode = combiningBlocks(arrBytes, arrBytesCorrections, qrCodeVersion);

    console.log(arrByteCode)
}

main()