[![Actions Status](https://github.com/alan-seymour/aoc-ts/workflows/Node%20CI/badge.svg)](https://github.com/alan-seymour/aoc-ts/actions)

# aoc-ts

Advent of Code Solutions in Typescript

## Usage

```bash
# run using ts-node
$ npm run solve-ts

# run using node
# build project before running
$ npm run build-ts
# run file
$ npm run solve
```

### Options

```
-d, --day   Run solution for specific day
-p, --part  Run specific part of solution (defaults to 1)
-t, --time  Measure the time it takes to solve
--input     Provide a specific input file (defaults to ./inputs/{day}.txt)
```

#### Examples:

```bash
# Run 201801 part 1
$ npm run solve-ts -- -d 201801

# Run part 2 of 201901 with test.txt and output time taken
$ npm run solve-ts -- -d 201901 -p 2 -t --input="./inputs/test.txt"
```

## Running Tests

```bash
# execute the tests
$ npm test
```

## Currently implemented solutions

| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
| 2018 | 1   | :heavy_check_mark: | 1ms      | :heavy_check_mark: | 19ms     |
| 2018 | 2   | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 16ms     |
| 2018 | 3   | :heavy_check_mark: | 200ms    | :heavy_check_mark: | 215ms    |
| 2019 | 1   | :heavy_check_mark: | 200μs    | :heavy_check_mark: | 320μs    |
| 2019 | 2   | :heavy_check_mark: | 700μs    | :heavy_check_mark: | 85ms     |
| 2019 | 3   | :heavy_check_mark: | 150ms    | :heavy_check_mark: | 150ms    |
| 2019 | 4   | :heavy_check_mark: | 90ms     | :heavy_check_mark: | 95ms     |
| 2019 | 5   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 2ms      |
| 2019 | 6   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 2ms      |
| 2019 | 7   | :heavy_check_mark: | 60ms     | :heavy_check_mark: | 155ms    |
| 2019 | 8   | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 4ms      |
| 2019 | 9   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 300ms    |
| 2019 | 10  | :heavy_check_mark: | 35ms     | :heavy_check_mark: | 33ms     |
| 2019 | 11  | :heavy_check_mark: | 25ms     | :heavy_check_mark: | 32ms     |
| 2019 | 12  | :heavy_check_mark: | 7ms      | :heavy_check_mark: | 900ms    |
| 2019 | 13  | :heavy_check_mark: | 37ms     | :heavy_check_mark: | 423ms    |
| 2020 | 1   | :heavy_check_mark: | 280μs    | :heavy_check_mark: | 340μs    |
| 2020 | 2   | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 2ms      |
| 2020 | 3   | :heavy_check_mark: | 550μs    | :heavy_check_mark: | 650μs    |
| 2020 | 4   | :heavy_check_mark: | 4ms      | :heavy_check_mark: | 6ms      |
| 2020 | 5   | :heavy_check_mark: | 4ms      | :heavy_check_mark: | 4ms      |
| 2020 | 6   | :heavy_check_mark: | 4ms      | :heavy_check_mark: | 4ms      |
| 2020 | 6   | :heavy_check_mark: | 88ms     | :heavy_check_mark: | 87ms     |
| 2020 | 7   | :heavy_check_mark: | 1ms      | :heavy_check_mark: | 5ms      |
| 2020 | 8   | :heavy_check_mark: | 6ms      | :heavy_check_mark: | 13ms     |
| 2020 | 9   | :heavy_check_mark: | 650μs    | :heavy_check_mark: | 500μs    |
| 2020 | 10  | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 2ms      |
| 2020 | 11  | :heavy_check_mark: | 810ms    | :heavy_check_mark: | 1s       |
| 2020 | 12  | :heavy_check_mark: | 4ms      | :heavy_check_mark: | 5ms      |