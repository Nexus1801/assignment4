import {bumblor2arabic} from "./BumblorArabicConverter.ts";

import { expect, test } from 'vitest'

test("bumblor2arabic tests for MMCL", () => {
    expect(bumblor2arabic("MMCL")).toBe(2150)
})

test("bumblor2arabic tests for -MMCL", () => {
    expect(bumblor2arabic("-MMCL")).toBe(-2150)
})

test("bumblor2arabic tests for MMMMDCCCC", () => {
    expect(bumblor2arabic("MMMMDCCCC")).toBe(4900)
})

test("bumblor2arabic tests for MDD", () => {
    expect(bumblor2arabic("MDD")).toBe(2000)
})