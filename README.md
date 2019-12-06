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
# Build the project
$ npm run build-ts

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
| 2019 | 2   | :heavy_check_mark: | 700μs    | :heavy_check_mark: | 260ms    |
| 2019 | 3   | :heavy_check_mark: | 2s       | :heavy_check_mark: | 2s       |
| 2019 | 4   | :heavy_check_mark: | 350ms    | :heavy_check_mark: | 250ms    |
| 2019 | 5   | :heavy_check_mark: | 6ms      | :heavy_check_mark: | 8ms      |
| 2019 | 6   |                    |          |                    |          |
