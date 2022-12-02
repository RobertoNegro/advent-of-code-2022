import { config } from "dotenv";
import { analyzeRow, sanitizeRow } from "../src/days/day2";

config();

test("analyzeRow - A Y", async () => {
  expect(analyzeRow("A Y")).toBe(8);
});

test("analyzeRow - B X", async () => {
  expect(analyzeRow("B X")).toBe(1);
});

test("analyzeRow - C Z", async () => {
  expect(analyzeRow("C Z")).toBe(6);
});

test("sanitizeRow - A Y", async () => {
  expect(sanitizeRow("A Y")).toBe("A X");
});

test("sanitizeRow - B X", async () => {
  expect(sanitizeRow("B X")).toBe("B X");
});

test("sanitizeRow - C Z", async () => {
  expect(sanitizeRow("C Z")).toBe("C X");
});
