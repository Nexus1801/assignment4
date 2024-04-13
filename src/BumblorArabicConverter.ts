

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
        //The following letters – M, C, X, and I – can each be repeated up to 4 times in a row.
        if(currentChar == "M" || currentChar === "C" || currentChar === "X" || currentChar === "I"){

            let j = 0;
            let count = 0;

            for(j = 0; j <= Bumblor.length; j++){
                if(currentChar == Bumblor[j]){
                    count = count + 1;
                }

                //count for repeated characters, ignore currentChar so make it 5 to check
                if(count == 5){
                    throw new Error("Malformed Number");
                }
            }

        }

        //The following letters – D, L, V – can each appear only once.
        if(currentChar === "D" || currentChar === "L" || currentChar === "V"){

            let k = 0;
            let count = 0;

            for(k = 0; k <= Bumblor.length; k++){
                if(currentChar == Bumblor[k]){
                    count = count + 1;
                }

                //count for repeated characters, ignore currentChar so make it 2 to check
                if(count == 2){
                    throw new Error("Malformed Number");
                }
            }
        }

        if (currentChar === "O"){
            let l = 0;
            let count = 0;

            for(l = 0; l <= Bumblor.length; l++){
                count += 1;
                //count for repeated characters, ignore currentChar so make it 2 to check
                if(count == 3){
                    throw new Error("Malformed Number");
                }
            }
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

    if(result > 4999 || result < -4999){
        throw new Error("Malformed Number");
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