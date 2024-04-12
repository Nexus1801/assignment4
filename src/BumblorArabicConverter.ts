

export function bumblor2arabic(Bumblor: string): number{
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

        if (currentValue < prevValue) {
            if (prevValue / currentValue > 10) {
                throw new Error("Malformed Number");
            }
            result -= currentValue;
        } else {
            result += currentValue;
        }

        prevValue = currentValue;
    }

    return isNegative ? -result : result;

}

export function arabic2bumblor(arabic: number) : string{
    const bumblorNumerals: Record<number, string> = {
        0: 'O',
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M',
    }

    // Truncate decimal numbers
    arabic = Math.floor(arabic);

    // Check for out of range
    if (arabic < 0 || arabic > 4999) {
        throw new Error("Out of Range");
    }

    if (arabic === 0) {
        return 'O';
    }

    let result = '';
    let remaining = arabic;

    for (const [value, numeral] of Object.entries(bumblorNumerals).sort((a, b) => parseInt(b[0]) - parseInt(a[0]))) {
        const numericValue = parseInt(value);
        const count = Math.floor(remaining / numericValue);
        remaining -= count * numericValue;

        if (count === 0) {
            continue;
        }

        result += numeral.repeat(count);
    }

    return result;
}