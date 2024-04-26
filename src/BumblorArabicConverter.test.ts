import {expect, test} from "vitest";
import {arabic2bumblor, bumblor2arabic} from "./BumblorArabicConverter.ts";

// Bumblor2Arabic tests
test('Bumblor -> Arabic, with lowercase', () => {
    expect(() => bumblor2arabic('mmdclxv')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no foreign letters.', () => {
    expect(() => bumblor2arabic('jhgjhgjghj')).toThrow(Error('Malformed Number'))
})

test('Bumblor -> Arabic, range within -4999, 4999, positive', () => {
    expect( bumblor2arabic('MMCL')).toBe(2150)
})
test('Bumblor -> Arabic, range within -4999, 4999, negative', () => {
    expect(bumblor2arabic('-MMCL')).toBe(-2150)
})

test('Bumblor -> Arabic, range less than 4999', () => {
    expect(() => bumblor2arabic('MMMMDDDD')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, range greater than -4999', () => {
    expect(() => bumblor2arabic('-MMMMDDDD')).toThrow(Error('Malformed Number'))
})

test('Bumblor -> Arabic, only one O', () => {
    expect(() => bumblor2arabic('OO')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, O only by itself', () => {
    expect(() => bumblor2arabic('MO')).toThrow(Error('Malformed Number'))
})


test('Bumblor -> Arabic, test O', () => {
    expect( bumblor2arabic('O')).toBe(0)
})

test('Bumblor -> Arabic, test negative 0', () => {
    expect(() => bumblor2arabic('-O')).toThrow(Error('Malformed Number'))
})


test('Bumblor -> Arabic, correct order of magnitude; MID', () => {
    expect(() => bumblor2arabic('MID')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, correct order of magnitude; CIMM', () => {
    expect(() => bumblor2arabic('CIMM')).toThrow(Error('Malformed Number'))
})

test('Bumblor -> Arabic, correct order of magnitude; MMIV', () => {
    expect(() => bumblor2arabic('MMIV')).toThrow(Error('Malformed Number'))
})

test('Bumblor -> Arabic, correct order of magnitude for a negative number; -MMIV', () => {
    expect(() => bumblor2arabic('MMIV')).toThrow(Error('Malformed Number'))
})


test('Bumblor -> Arabic, only one minus sign', () => {
    expect(() => bumblor2arabic('--MM')).toThrow(Error('Malformed Number'))
})


test('Bumblor -> Arabic, only one minus sign total', () => {
    expect(() => bumblor2arabic('-')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no spaces', () => {
    expect(() => bumblor2arabic(' ')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no spaces in a word', () => {
    expect(() => bumblor2arabic(' M M MMC')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no more than 4 M letters in a row', () => { // WHY WORKING
    expect(() => bumblor2arabic('MMMMM')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no more than 4 C letters in a row', () => {
    expect(() => bumblor2arabic('CCCCC')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no more than 4 X letters in a row', () => {
    expect(() => bumblor2arabic('XXXXX')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, no more than 4 I letters in a row', () => {
    expect(() => bumblor2arabic('IIIII')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, D can only appear once', () => {
    expect(() => bumblor2arabic('DD')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, L can only appear once', () => {
    expect(() => bumblor2arabic('LL')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, V can only appear once', () => {
    expect(() => bumblor2arabic('VV')).toThrow(Error('Malformed Number'))
})
test('Bumblor -> Arabic, empty input', () => {
    expect(() => bumblor2arabic('')).toThrow(Error('Malformed Number'))
})



// Arabic2Bumblor tests
test('Arabic -> Bumblor, 4000', () => {
    expect(arabic2bumblor(4000)).toBe("MMMM");
})
test('Arabic -> Bumblor, -4000', () => {
    expect(arabic2bumblor(-4000)).toBe("-MMMM");
})

test('Arabic -> Bumblor, 5000', () => {
    expect(() => arabic2bumblor(5000)).toThrow(Error('Out of Range'));
})
test('Arabic -> Bumblor, -5000', () => {
    expect(() => arabic2bumblor(-5000)).toThrow(Error('Out of Range'));
})

test('Arabic -> Bumblor, -2150', () => {
    expect(arabic2bumblor(-2150)).toBe("-MMCL");
})
test('Arabic -> Bumblor, 2150', () => {
    expect(arabic2bumblor(2150)).toBe("MMCL");
})

test('Arabic -> Bumblor, 2155', () => {
    expect(arabic2bumblor(2155)).toBe("MMCLV");
})

test('Arabic -> Bumblor, -2155', () => {
    expect(arabic2bumblor(-2155)).toBe("-MMCLV");
})

test('Arabic -> Bumblor, 2155.534', () => {
    expect(arabic2bumblor(2155.534)).toBe("MMCLV");
})

test('Arabic -> Bumblor, -2155.534', () => {
    expect(arabic2bumblor(-2155.534)).toBe("-MMCLV");
})

test('Arabic -> Bumblor, 9', () => {
    expect(arabic2bumblor(9)).toBe("VIIII");
})

test('Arabic -> Bumblor, -9', () => {
    expect(arabic2bumblor(-9)).toBe("-VIIII");
})

test('Arabic -> Bumblor, 99', () => {
    expect(arabic2bumblor(99)).toBe("LXXXXVIIII");
})

test('Arabic -> Bumblor, -99', () => {
    expect(arabic2bumblor(-99)).toBe("-LXXXXVIIII");
})

test('Arabic -> Bumblor, 213.57', () => {
    expect(arabic2bumblor(213.57)).toBe("CCXIII");
})

test('Arabic -> Bumblor, -213.57', () => {
    expect(arabic2bumblor(-213.57)).toBe("-CCXIII");
})

test('Arabic -> Bumblor, Test -0', () => {
    expect(arabic2bumblor(-0)).toBe('O');
}) // MAYBE IGNORE

test('Test -0', () => {
    expect(arabic2bumblor(-0)).toBe('O');
})