

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