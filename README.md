[![Actions Status](https://github.com/alan-seymour/aoc-ts/workflows/Node%20CI/badge.svg)](https://github.com/alan-seymour/aoc-ts/actions)

# aoc-ts

Advent of Code Solutions in Typescript

## Usage

```bash
# run using ts-node
$ yarn solve-ts

# run using node
# build project before running
$ yarn build-ts
# run file
$ yarn solve
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
$ yarn solve-ts -- -d 201801

# Run part 2 of 201901 with test.txt and output time taken
$ yarn solve-ts -- -d 201901 -p 2 -t --input="./inputs/test.txt"
```

## Running Tests

```bash
# execute the tests
$ yarn test
```

## Currently implemented solutions

<details>
  <summary>2015 22/50 :star:</summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
| 2015 | 1   | :heavy_check_mark: | 395μs    | :heavy_check_mark: | 241μs    |
| 2015 | 2   | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 3ms      |
| 2015 | 3   | :heavy_check_mark: | 6ms      | :heavy_check_mark: | 11ms     |
| 2015 | 4   | :heavy_check_mark: | 807ms    | :heavy_check_mark: | 23s      |
| 2015 | 5   | :heavy_check_mark: | 5ms      | :heavy_check_mark: | 11ms     |
| 2015 | 6   | :heavy_check_mark: | 202ms    | :heavy_check_mark: | 203ms    |
| 2015 | 7   | :heavy_check_mark: | 29ms     | :heavy_check_mark: | 57ms     |
| 2015 | 8   | :heavy_check_mark: | 980μs    | :heavy_check_mark: | 824μs    |
| 2015 | 9   | :heavy_check_mark: | 114ms    | :heavy_check_mark: | 119ms    |
| 2015 | 10  | :heavy_check_mark: | 202ms    | :heavy_check_mark: | 4s       |
| 2015 | 11  | :heavy_check_mark: | 106ms    | :heavy_check_mark: | 509ms    |

</details>
<details>
  <summary>2018 6/50 :star:</summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
| 2018 | 1   | :heavy_check_mark: | 1ms      | :heavy_check_mark: | 19ms     |
| 2018 | 2   | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 16ms     |
| 2018 | 3   | :heavy_check_mark: | 200ms    | :heavy_check_mark: | 215ms    |

</details>
<details>
  <summary>2019 26/50 :star: </summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
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

</details>
<details>
  <summary>2020 50/50 :star2: </summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
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
| 2020 | 13  | :heavy_check_mark: | 266μs    | :heavy_check_mark: | 491μs    |
| 2020 | 14  | :heavy_check_mark: | 8ms      | :heavy_check_mark: | 280ms    |
| 2020 | 15  | :heavy_check_mark: | 350μs    | :heavy_check_mark: | 4s       |
| 2020 | 16  | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 6ms      |
| 2020 | 17  | :heavy_check_mark: | 60ms     | :heavy_check_mark: | 1s       |
| 2020 | 18  | :heavy_check_mark: | 10ms     | :heavy_check_mark: | 12ms     |
| 2020 | 19  | :heavy_check_mark: | 25ms     | :heavy_check_mark: | 330ms    |
| 2020 | 20  | :heavy_check_mark: | 145ms    | :heavy_check_mark: | 240ms    |
| 2020 | 21  | :heavy_check_mark: | 15ms     | :heavy_check_mark: | 3ms      |
| 2020 | 22  | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 1s       |
| 2020 | 23  | :heavy_check_mark: | 262μs    | :heavy_check_mark: | 4s       |
| 2020 | 24  | :heavy_check_mark: | 14ms     | :heavy_check_mark: | 1m       |
| 2020 | 25  | :heavy_check_mark: | 141ms    | :santa:            | N/A      |

</details>
<details>
  <summary>2021 30/50 :star: </summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
| 2021 | 1   | :heavy_check_mark: | 900μs    | :heavy_check_mark: | 1ms      |
| 2021 | 2   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 3ms      |
| 2021 | 3   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 1ms      |
| 2021 | 4   | :heavy_check_mark: | 18ms     | :heavy_check_mark: | 36ms     |
| 2021 | 5   | :heavy_check_mark: | 64ms     | :heavy_check_mark: | 90ms     |
| 2021 | 6   | :heavy_check_mark: | 720μs    | :heavy_check_mark: | 3ms      |
| 2021 | 7   | :heavy_check_mark: | 3ms      | :heavy_check_mark: | 88ms     |
| 2021 | 8   | :heavy_check_mark: | 1ms      | :heavy_check_mark: | 22ms     |
| 2021 | 9   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 11ms     |
| 2021 | 10  | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 2ms      |
| 2021 | 11  | :heavy_check_mark: | 8ms      | :heavy_check_mark: | 13ms     |
| 2021 | 12  | :heavy_check_mark: | 32ms     | :heavy_check_mark: | 265ms    |
| 2021 | 13  | :heavy_check_mark: | 13ms     | :heavy_check_mark: | 15ms     |
| 2021 | 14  | :heavy_check_mark: | 15ms     | :heavy_check_mark: | 50ms     |
| 2021 | 15  | :heavy_check_mark: | 51ms     | :heavy_check_mark: | 480ms    |

</details>
<details>
  <summary>2022 12/50 :star: </summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
| 2022 | 1   | :heavy_check_mark: | 1ms      | :heavy_check_mark: | 1ms      |
| 2022 | 2   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 5ms      |
| 2022 | 3   | :heavy_check_mark: | 6ms      | :heavy_check_mark: | 6ms      |
| 2022 | 4   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 1ms      |
| 2022 | 5   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 2ms      |
| 2022 | 6   | :heavy_check_mark: | 379μs    | :heavy_check_mark: | 3ms      |

</details>

<details>
  <summary>2023 12/50 :star: </summary>
  
| Year | Day | Part 1             | Run Time | Part 2             | Run Time |
| ---- | --- | ------------------ | -------- | ------------------ | -------- |
| 2023 | 1   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 6ms      |
| 2023 | 2   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 2ms      |
| 2023 | 3   | :heavy_check_mark: | 16ms     | :heavy_check_mark: | 17ms     |
| 2023 | 4   | :heavy_check_mark: | 4ms      | :heavy_check_mark: | 5ms      |
| 2023 | 5   | :heavy_check_mark: | 2ms      | :heavy_check_mark: | 3h       |
| 2023 | 6   | :heavy_check_mark: | 434μs    | :heavy_check_mark: | 408μs    |

</details>
