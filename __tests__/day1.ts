import { config } from "dotenv";
import { reduce } from "../src/days/day1";

config();

test("reduce", async () => {
  expect(
    reduce([
      null,
      1000,
      2000,
      3000,
      null,
      4000,
      null,
      null,
      null,
      5000,
      6000,
      null,
      null,
      7000,
      8000,
      9000,
      null,
      10000,
      null,
    ])
  ).toStrictEqual([6000, 4000, 11000, 24000, 10000]);
});
