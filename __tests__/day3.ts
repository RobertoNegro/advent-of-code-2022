import { config } from "dotenv";
import {
  getPriority,
  getSharedType,
  getTotalGroupPriority,
  getTotalPriority,
  splitCompartments,
} from "../src/days/day3";

config();

test("splitCompartments - first", async () => {
  expect(splitCompartments("vJrwpWtwJgWrhcsFMMfFFhFp")).toStrictEqual([
    "vJrwpWtwJgWr",
    "hcsFMMfFFhFp",
  ]);
});

test("splitCompartments - second", async () => {
  expect(splitCompartments("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toStrictEqual([
    "jqHRNqRjqzjGDLGL",
    "rsFMfFZSrLrFZsSL",
  ]);
});

test("splitCompartments - third", async () => {
  expect(splitCompartments("PmmdzqPrVvPwwTWBwg")).toStrictEqual([
    "PmmdzqPrV",
    "vPwwTWBwg",
  ]);
});

test("getSharedType - first", async () => {
  expect(getSharedType("vJrwpWtwJgWr", "hcsFMMfFFhFp")).toStrictEqual(["p"]);
});

test("getSharedType - second", async () => {
  expect(getSharedType("jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL")).toStrictEqual([
    "L",
  ]);
});

test("getSharedType - third", async () => {
  expect(getSharedType("PmmdzqPrV", "vPwwTWBwg")).toStrictEqual(["P"]);
});

test("getPriority - first", async () => {
  expect(getPriority("p")).toBe(16);
});

test("getPriority - second", async () => {
  expect(getPriority("L")).toBe(38);
});

test("getPriority - third", async () => {
  expect(getPriority("P")).toBe(42);
});

test("getTotalPriority", async () => {
  expect(
    getTotalPriority([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ])
  ).toBe(157);
});

test("getTotalGroupPriority", async () => {
  expect(
    getTotalGroupPriority([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ])
  ).toBe(70);
});
