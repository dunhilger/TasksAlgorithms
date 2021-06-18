// 1.Эмуляция изображения шахматной доски в консоль

function PrintChessBoard(n) {
    const char = " *".repeat(n);
    let chessBoard = "";
    let row = "";
    if (n >= 1) {
        for (let i = 1; i <= 8; i++) {
            let line = "";
            for (let j = 1; j <= 8; j++) {
                if ((i + j) % 2 === 0) {
                    line += " ".repeat(n * 2);
                } else {
                    line += char;
                }
            }
            row += (line + "\n").repeat(n);
        }
    }
    chessBoard += row;
    console.log(chessBoard);
}

PrintChessBoard(20);

//_____________________________________с замыканием_________________________________

function PrintChessBoard(width) {
    if (width > 0) {
        let f = function(n) {
            return ((n - 1) % (width * 2) < width);
        }
        for (let i = 1; i <= 8 * width; i++) {
            let line = "";
            for (let j = 1; j <= 8 * width; j++) {
                let symbol = "  ";
                if ((f(i) && f(j)) || (!f(i) && !f(j))) {
                    symbol = "* ";
                }
                line += symbol;
            }
            console.log(line);
        }
    }
}

PrintChessBoard(20);

// 2.Вывод в консоль таблицы умножения с пустым квадратом внутри

function PrintMultiplicationTable(n, indent) {
    let width = String(n * n).length + 1; //ширина столбца
    for (let i = 1; i <= n; i++) {
        let line = "";
        for (let j = 1; j <= n; j++) {
            if (i > indent + 1 &&
                j > indent + 1 &&
                i < n - indent &&
                j < n - indent) {
                line += this.PadEnd(String(i * j), width);
            } else if (indent <= n / 2 &&
                n >= 5 &&
                i > indent &&
                j > indent &&
                i < n - indent + 1 &&
                j < n - indent + 1) {
                line += this.PadEnd("", width);
            } else {
                j !== n ? line += this.PadEnd(String(i * j), width) : line += String(i * j); //заполнение строки значением+пробел, либо, если значение последнее в строке, то без пробела в конце - как есть
            }
        }
        if (i == 1) {
            console.log(this.PadEnd("", width) + "|" + line);
            console.log("_".repeat(width * (n + 1)));
        }
        console.log(this.PadEnd(String(i), width) + "|" + line);
    }
}

function PadEnd(str, count) {
    let diff = count - str.length;
    return diff > 0 ? str + " ".repeat(diff) : str;
}

PrintMultiplicationTable(10, 2);

// __________________________________________вариант с одним параметром__________________________________

function PrintMultiplicationTable(n) {
    let shift = Math.floor((n - 2) / 3);
    let width = String(n * n).length + 1;
    for (let i = 1; i <= n; i++) {
        let line = "";
        for (let j = 1; j <= n; j++) {
            let symbol = String(i * j);
            if (shift > 0) {
                let rowCond = i > shift && i <= (n - shift);
                let rowCondInside = i < (n - shift) && i > (shift + 1);
                let colCond = j > shift && j <= (n - shift);
                let colCondInside = j < (n - shift) && j > (shift + 1);

                if ((rowCond && colCond) && !(rowCondInside && colCondInside)) {
                    symbol = "";
                }
            }
            line += this.PadEnd(symbol, width);
        }
        if (i == 1) {
            console.log(this.PadEnd("", width) + "|" + line);
            console.log("_".repeat(width * (n + 1)));
        }
        console.log(this.PadEnd(String(i), width) + "|" + line);
    }
}

function PadEnd(str, count) {
    let diff = count - str.length;
    return diff > 0 ? str + " ".repeat(diff) : str;
}

PrintMultiplicationTable(8);

// 3.статистика символов в переданной строке

function GetCharFrequency(text) {
    if (text.length > 0) {
        let setRegisterText = text.toLowerCase();
        let charArray = new Map();
        for (let char of setRegisterText) {
            charArray.has(char) ? charArray.set(char, charArray.get(char) + 1) : charArray.set(char, 1);
        }
        let sortResult = new Map([...charArray.entries()].sort());
        sortResult.forEach((key, value) => {
            console.log(`${value} использовано ${key} раз(а)`);
        });

    }
}

GetCharFrequency("ColD RaIn faLlinG doWn!");

//4.статистика гласных и согласных в строке

function charStatistic(arg) {
    if (/^[А-Яа-я]+$/.test(arg.join('')) && arg.length > 0) {
        const vowelCharsArray = new Set(['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я']);
        let statisticVowel = [];
        let statisticConsonant = [];
        let statisticParity = [];
        let resultStatisticVowel = "";
        let resultStatisticConsonant = "";
        let resultStatisticParity = "";
        let firstCharsStatisticVowel = new Set();
        let lastCharsStatisticConsonant = new Set();
        let resultCategory = [];

        arg.forEach((elem) => {
            let vowelCount = 0;
            let consonantCount = 0;
            for (let i = 0; i < elem.length; i++) {
                vowelCharsArray.has(elem[i]) ? vowelCount += 1 : consonantCount += 1;
            }
            if (vowelCount > consonantCount) {
                statisticVowel.push(elem);
                statisticVowel.forEach((elem) => { firstCharsStatisticVowel.add(elem.charAt(0)) });
            } else if (vowelCount < consonantCount) {
                statisticConsonant.push(elem);
                statisticConsonant.forEach((elem) => { lastCharsStatisticConsonant.add(elem.charAt(elem.length - 1)) });
            } else {
                statisticParity.push(elem);
            }
        });

        statisticParity.forEach((elem) => {
            if (firstCharsStatisticVowel.has(elem.charAt(0)) &&
                lastCharsStatisticConsonant.has(elem.charAt(elem.length - 1))) {
                resultCategory.push(elem);
            }
        });

        resultStatisticVowel = statisticVowel.join();
        resultStatisticConsonant = statisticConsonant.join();
        resultStatisticParity = statisticParity.join();

        console.log("гласных больше", "\t", "   ", statisticVowel.length, " ", resultStatisticVowel);
        console.log("согласных больше", "\t", statisticConsonant.length, " ", resultStatisticConsonant);
        console.log("буквы в паритете", "\t", statisticParity.length, " ", resultStatisticParity);
        console.log("смежные слова", "\t", "   ", resultCategory.length);
        console.log("переданный текст:", "\t", "   ", arg.join());
    }
}

charStatistic(["гадалка", "достала", "белую", "колоду", "таро", "барыга", "борода", "тамада", "туя"]);

//5.Вывод окружности в консоль

function PrintCircle(n) {
    const char = "*";
    let square = "";
    let radius = Math.floor(n / 2 - 1);
    if (radius > 0) {
        for (let i = 1; i <= n; i++) {
            let line = "";
            for (let j = 1; j <= n; j++) {
                if (Math.pow(i - radius - 1, 2) + Math.pow(j - radius - 1, 2) <= Math.pow(radius, 2)) {
                    line += char + " ";
                } else {
                    line += "- ";
                }
            }
            square += line + "\n";
        }
    }
    console.log(square);
}

PrintCircle(10);