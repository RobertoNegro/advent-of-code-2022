import { config } from "dotenv";
import { convertToType } from "../src/prompt";

config();

test("convertToType - valid string", async () => {
  expect(convertToType("hello world", "string")).toBe("hello world");
});

test("convertToType - valid number", async () => {
  expect(convertToType("15", "number")).toBe(15);
});

test("convertToType - invalid number", async () => {
  expect(convertToType("hello world", "number")).toBeNaN();
});

test("convertToType - valid boolean - 'true'", async () => {
  expect(convertToType("true", "boolean")).toBe(true);
});

test("convertToType - valid boolean - 'false'", async () => {
  expect(convertToType("false", "boolean")).toBe(false);
});

test("convertToType - valid boolean - any string", async () => {
  expect(convertToType("hello world", "boolean")).toBe(true);
});

test("convertToType - valid boolean - 0", async () => {
  expect(convertToType("0", "boolean")).toBe(false);
});

test("convertToType - valid boolean - null", async () => {
  expect(convertToType("null", "boolean")).toBe(false);
});

test("convertToType - valid boolean - empty", async () => {
  expect(convertToType("", "boolean")).toBe(false);
});

test("convertToType - valid json - object", async () => {
  expect(convertToType('{"hello":"world"}', "json")).toStrictEqual({
    hello: "world",
  });
});

test("convertToType - valid json - array", async () => {
  expect(convertToType('["a", "b", 3, true, null]', "json")).toStrictEqual([
    "a",
    "b",
    3,
    true,
    null,
  ]);
});

test("convertToType - valid json - string", async () => {
  expect(convertToType('"hello"', "json")).toBe("hello");
});

test("convertToType - valid json - boolean", async () => {
  expect(convertToType("true", "json")).toBe(true);
});

test("convertToType - valid json - number", async () => {
  expect(convertToType("15", "json")).toBe(15);
});

test("convertToType - invalid json", async () => {
  expect(convertToType("{not a valid json}", "json")).toBeNull();
});
