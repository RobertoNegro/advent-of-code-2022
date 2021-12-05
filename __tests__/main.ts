import { formatOrdinals, validateChoice } from "../src/main";

test("Validate choice - String", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), "e")).toBe("string");
});

test("Validate choice - NaN", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), NaN)).toBe("string");
});

test("Validate choice - null", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), null)).toBe("string");
});

test("Validate choice - undefined", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), undefined)).toBe(
    "string"
  );
});

test("Validate choice - Valid december", () => {
  expect(validateChoice(new Date("12-05-2021"), 5)).toBe(true);
});

test("Validate choice - Valid december 1", () => {
  expect(validateChoice(new Date("12-05-2021"), 1)).toBe(true);
});

test("Validate choice - Valid december max", () => {
  expect(validateChoice(new Date("12-05-2021"), 5)).toBe(true);
});

test("Validate choice - Valid not december", () => {
  expect(validateChoice(new Date("01-05-2021"), 25)).toBe(true);
});

test("Validate choice - Valid not december 1", () => {
  expect(validateChoice(new Date("01-05-2021"), 1)).toBe(true);
});

test("Validate choice - Valid not december max", () => {
  expect(validateChoice(new Date("01-05-2021"), 31)).toBe(true);
});

test("Validate choice - invalid date december >", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), 10)).toBe("string");
});

test("Validate choice - invalid date december < 1", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), 0)).toBe("string");
});

test("Validate choice - invalid date december < 0", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), -5)).toBe("string");
});

test("Validate choice - invalid date december > +1", () => {
  expect(typeof validateChoice(new Date("12-05-2021"), 6)).toBe("string");
});

test("Validate choice - invalid date not december >", () => {
  expect(typeof validateChoice(new Date("11-05-2021"), 33)).toBe("string");
});

test("Validate choice - invalid date not december <", () => {
  expect(typeof validateChoice(new Date("11-05-2021"), 0)).toBe("string");
});

test("Format ordinals - < 0", () => {
  expect(() => formatOrdinals(-5)).toThrow(RangeError);
});
test("Format ordinals - NaN", () => {
  expect(() => formatOrdinals(NaN)).toThrow(RangeError);
});

test("Format ordinals - null", () => {
  expect(() => formatOrdinals(null)).toThrow(RangeError);
});

test("Format ordinals - string", () => {
  expect(() => formatOrdinals("5")).toThrow(RangeError);
});

test("Format ordinals - 0th", () => {
  expect(formatOrdinals(0)).toBe("0th");
});
test("Format ordinals - 1st", () => {
  expect(formatOrdinals(1)).toBe("1st");
});

test("Format ordinals - 2nd", () => {
  expect(formatOrdinals(2)).toBe("2nd");
});

test("Format ordinals - 3rd", () => {
  expect(formatOrdinals(3)).toBe("3rd");
});

test("Format ordinals - 4th", () => {
  expect(formatOrdinals(4)).toBe("4th");
});

test("Format ordinals - 11th", () => {
  expect(formatOrdinals(11)).toBe("11th");
});

test("Format ordinals - 21st", () => {
  expect(formatOrdinals(21)).toBe("21st");
});

test("Format ordinals - 42nd", () => {
  expect(formatOrdinals(42)).toBe("42nd");
});

test("Format ordinals - 103rd", () => {
  expect(formatOrdinals(103)).toBe("103rd");
});
