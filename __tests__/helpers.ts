import { config } from "dotenv";
import { getInput, getNumberArrayInput } from "../src/helpers";

config();

test("getInput - 1", async () => {
  expect(Array.isArray(await getInput(1))).toBe(true);
});
test("getInput - 0", async () => {
  await expect(async () => {
    await getInput(0);
  }).rejects.toThrow(Error);
});

test("getNumberArrayInput - 1", async () => {
  expect(Array.isArray(await getNumberArrayInput(1))).toBe(true);
});

test("getNumberArrayInput - 0", async () => {
  await expect(async () => {
    await getNumberArrayInput(0);
  }).rejects.toThrow(Error);
});
