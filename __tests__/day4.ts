import { config } from "dotenv";
import {
  analyzeOverlaps,
  getOverlaps,
  isCompletelyOverlapped,
} from "../src/days/day4";

config();

test("getOverlaps - no overlap", async () => {
  expect(getOverlaps([2, 4], [6, 8])).toBe(false);
});

test("getOverlaps - one overlap", async () => {
  expect(getOverlaps([2, 6], [6, 8])).toStrictEqual([6, 6]);
});

test("getOverlaps - partial overlap", async () => {
  expect(getOverlaps([3, 7], [6, 8])).toStrictEqual([6, 7]);
});

test("getOverlaps - total overlap", async () => {
  expect(getOverlaps([6, 8], [4, 12])).toStrictEqual([6, 8]);
});

test("isCompletelyOverlapped - no overlap", async () => {
  expect(isCompletelyOverlapped([2, 4], [6, 8])).toBe(false);
});

test("isCompletelyOverlapped - one overlap", async () => {
  expect(isCompletelyOverlapped([2, 6], [6, 8])).toBe(false);
});

test("isCompletelyOverlapped - partial overlap", async () => {
  expect(isCompletelyOverlapped([3, 7], [6, 8])).toBe(false);
});

test("isCompletelyOverlapped - total overlap", async () => {
  expect(isCompletelyOverlapped([6, 8], [4, 12])).toBe(true);
});

test("isCompletelyOverlapped - exact overlap", async () => {
  expect(isCompletelyOverlapped([6, 8], [6, 8])).toBe(true);
});

test("analyzeOverlaps", async () => {
  expect(
    analyzeOverlaps([
      "2-4,6-8",
      "2-3,4-5",
      "5-7,7-9",
      "2-8,3-7",
      "6-6,4-6",
      "2-6,4-8",
      "2-2,2-2",
      "2-4,3-4",
      "2-5,3-4",
      "2-5,2-4",
      "2-2,2-2",
      "55-55,9-55",
    ])
  ).toBe(8);
});
