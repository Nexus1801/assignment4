export function bumblor2arabic(Bumblor: string): number {
    if (Bumblor === '' || Bumblor === '-' || Bumblor === '-O') {
        throw new Error("Malformed Number"); // Throw an error if the input string is empty, a single minus sign, or '-O'
    }
    const bumblorNumerals: Record<string, number> = {
        O: 0,
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    }

    let result = 0;
    let prevValue = 0;
    let isNegative = false;
    let counts: Record<string, number> = {
        I: 0,
        V: 0,
        X: 0,
        L: 0,
        C: 0,
        D: 0,
        M: 0,
        O: 0,
    };

    if (Bumblor.startsWith('-')) {
        isNegative = true;
        Bumblor = Bumblor.substring(1); // Remove the minus sign
    }

    for (let i = Bumblor.length - 1; i >= 0; i--) {
        const currentChar = Bumblor[i];
        const currentValue = bumblorNumerals[currentChar];

        if (currentValue === undefined) {
            throw new Error("Malformed Number");
        }

        counts[currentChar]++;
        if ((currentChar === 'D' || currentChar === 'L' || currentChar === 'V' || currentChar === 'O') && counts[currentChar] > 1) {
            throw new Error("Malformed Number"); // Throw an error for extra 'D', 'L', 'V', or 'O' numerals
        }
        if ((currentChar === 'M' || currentChar === 'C' || currentChar === 'X' || currentChar === 'I') && counts[currentChar] > 4) {
            throw new Error("Malformed Number"); // Throw an error for more than four 'M', 'C', 'X', or 'I' numerals in a row
        }

        if (currentValue < prevValue) {
            throw new Error("Malformed Number"); // Throw an error if a numeral is less than the previous numeral
        }

        result += currentValue;
        prevValue = currentValue;
    }

    if (counts['O'] > 0 && Bumblor.length > 1) {
        throw new Error("Malformed Number"); // Throw an error if 'O' appears in combination with other numerals
    }

    return isNegative ? -result : result;
}

export function arabic2bumblor(arabic: number) : string {
    const bumblorNumerals: Record<number, string> = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M',
    }

    // Round decimal numbers to the nearest whole number
    arabic = arabic > 0 ? Math.floor(arabic) : Math.ceil(arabic);

    // Check for out of range
    if (arabic < -4999 || arabic > 4999) {
        throw new Error("Out of Range");
    }

    if (arabic === 0) {
        return 'O';
    }

    let result = '';
    let remaining = Math.abs(arabic);

    for (const [value, numeral] of Object.entries(bumblorNumerals).sort((a, b) => parseInt(b[0]) - parseInt(a[0]))) {
        const numericValue = parseInt(value);
        let count = 0;
        while (remaining >= numericValue && count < 4) {
            result += numeral;
            remaining -= numericValue;
            count++;
        }
    }

    return arabic < 0 ? '-' + result : result;
}