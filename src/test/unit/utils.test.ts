import { fixName } from "../../functions/utils"

test('Tests for fixName', () => {
    expect(fixName('Shangwa DB')).toBe('shangwa_db')
})

test('Tests for fixName', () => {
    expect(fixName('shangwa_db')).toBe('shangwa_db')
})

