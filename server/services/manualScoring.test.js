const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateManualScore } = require('./manualScoring');

test('scores an all-complete day as 100 and stores 10', () => {
    assert.deepEqual(calculateManualScore([true, true]), {
        marks: 100,
        average: 10,
        taskMarks: [100, 100]
    });
});

test('scores an all-incomplete day as zero', () => {
    assert.deepEqual(calculateManualScore([false, false]), {
        marks: 0,
        average: 0,
        taskMarks: [0, 0]
    });
});

test('averages task marks and preserves the existing 0–10 storage scale', () => {
    assert.deepEqual(calculateManualScore([true, false, false]), {
        marks: 33,
        average: 3.3,
        taskMarks: [100, 0, 0]
    });
});

test('uses the existing nearest-integer aggregate rounding rule', () => {
    assert.deepEqual(calculateManualScore([true, false]), {
        marks: 50,
        average: 5,
        taskMarks: [100, 0]
    });
});

test('rejects empty or malformed completion states', () => {
    assert.throws(() => calculateManualScore([]), TypeError);
    assert.throws(() => calculateManualScore(null), TypeError);
    assert.throws(() => calculateManualScore([true, 0]), TypeError);
});
