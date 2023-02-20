const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('Return partitionkey of event when present partition key is string and less 256 length', () => {
    const event = { partitionKey: 'key123456' };
    expect(deterministicPartitionKey(event)).toEqual('key123456');
  });

  it('Return sha3-512 hashed partitionkey of event when partition key is string and more 256 length', () => {
    const key = "71UTWuSBPqbMj5MuvEBaBUhOvKMzl00er7W0CBsCIwWvZbl0KUbjOPKNb8V87ZZNICXsswm7GLZ0FGQs3Ci4pfdEYMOSt5me2bxQVDp3Ww1QcCZO1vgyabBmijHkZIgjNZRXBn180mDMJ7Gl4a99eGr6sQI8UzT7xtfCF24zq5LO12Wfm4t6uUXX7Pylz4E6gb73Y16TSbsUmJWDOkvbMZzA3WVvPR1HWWrXMY16Mgo6HNX7gafFymMJMnjyrGM2dV89fjOqFUL7GUtro3WJTdrQQFjjCP0LXlmhk01AHQUf";
    const event = { partitionKey: key };
    const expected = crypto.createHash("sha3-512").update(key).digest("hex");
    expect(deterministicPartitionKey(event)).toEqual(expected);
  });

  it('Return partitionkey of event when partition key is object and its string is less 256 length', () => {
    const key = {key1: "val1"};
    const event = { partitionKey: key };
    const expected = JSON.stringify(key);
    expect(deterministicPartitionKey(event)).toEqual(expected);
  });

  it('Return sha3-512 hashed of event when event is object and partitionKey is absent', () => {
    const event = { key1: 'val1', key2: 100 };
    const data = JSON.stringify(event);
    const expected = crypto.createHash("sha3-512").update(data).digest("hex");
    expect(deterministicPartitionKey(event)).toEqual(expected);
  });

  it('Return sha3-512 hashed of event when event is primitive value and when partitionKey is absent', () => {
    const event = 100;
    const data = JSON.stringify(event);
    const expected = crypto.createHash("sha3-512").update(data).digest("hex");
    expect(deterministicPartitionKey(event)).toEqual(expected);
  });
});
