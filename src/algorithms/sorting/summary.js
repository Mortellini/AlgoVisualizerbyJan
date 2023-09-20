import React from "react";

import RunningAlgorithmManager from "../../utils/running-algorithm-manager";
import selectionSort from "./selectionSort";
import insertionSort from "./insertionSort";
import bubbleSort from "./bubbleSort";
import combSort from "./combSort";
import cocktailSort from "./cocktailSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import heapSort from "./heapSort";
import radixSort from "./radixSort";
import countingSort from "./countingSort";
import bogoSort from "./bogoSort";
import timSort from "./timSort";
import shuffleArray from "./support/shuffelArray";

const sortingAlgoritms = [
  {
    title: "Selection Sort",
    name: "Selection",
    function: selectionSort,
    description: (
      <div>
        <h3>Selection Sort</h3>
        <p>
          Selection Sort is a simple sorting algorithm that works by dividing
          the input list into two parts: the sorted part and the unsorted part.
          It repeatedly selects the smallest (or largest) element from the
          unsorted part and moves it to the sorted part. The process continues
          until the unsorted part becomes empty.
        </p>
        <p>Here's a step-by-step breakdown of how Selection Sort works:</p>
        <ol>
          <li>
            Find the minimum (or maximum) element in the unsorted part of the
            list.
          </li>
          <li>
            Swap the found minimum (or maximum) element with the first element
            in the unsorted part.
          </li>
          <li>
            Move the boundary between the sorted and unsorted parts one element
            to the right.
          </li>
          <li>Repeat steps 1-3 until the entire list is sorted.</li>
        </ol>
        <p>
          Selection Sort may not be the most efficient sorting algorithm, as it
          has a worst-case time complexity of O(n^2), but it is simple to
          understand and implement. It's useful for small lists or as a step in
          more complex sorting algorithms.
        </p>
      </div>
    ),
  },
  {
    title: "Insertion Sort",
    name: "Insertion",
    function: insertionSort,
    description: (
      <div>
        <h3>Insertion Sort</h3>
        <p>
          Insertion Sort is a simple sorting algorithm that builds the final
          sorted array one item at a time. It works by taking one element from
          the unsorted list and inserting it into its correct position in the
          already sorted part of the list. This process continues until the
          entire list is sorted.
        </p>
        <p>Here's a step-by-step breakdown of how Insertion Sort works:</p>
        <ol>
          <li>
            Start with the second element (index 1) and consider it as the first
            element in the sorted part.
          </li>
          <li>
            Compare the current element with the elements in the sorted part and
            find the correct position for it.
          </li>
          <li>
            Shift the larger elements in the sorted part to the right to make
            space for the current element.
          </li>
          <li>
            Insert the current element into its correct position in the sorted
            part.
          </li>
          <li>
            Repeat steps 2-4 for each remaining element in the unsorted part.
          </li>
        </ol>
        <p>
          Insertion Sort is an efficient algorithm for small lists and is often
          used in practice because it is simple and has good performance for
          nearly sorted data. Its worst-case time complexity is O(n^2), but it
          can be faster than other O(n^2) algorithms like Bubble Sort or
          Selection Sort in many cases.
        </p>
      </div>
    ),
  },
  {
    title: "Bubble Sort",
    name: "Bubble",
    function: bubbleSort,
    description: (
      <div>
        <h3>Bubble Sort</h3>
        <p>
          Bubble Sort is a simple sorting algorithm that repeatedly steps
          through the list to be sorted, compares adjacent elements, and swaps
          them if they are in the wrong order. The pass through the list is
          repeated until the list is sorted.
        </p>
        <p>Here's a step-by-step breakdown of how Bubble Sort works:</p>
        <ol>
          <li>Start from the first element in the list.</li>
          <li>Compare the current element with the next element.</li>
          <li>
            If the current element is greater than the next element, swap them.
          </li>
          <li>
            Move to the next pair of elements and repeat steps 2 and 3 until the
            end of the list.
          </li>
          <li>
            Continue this process for each element in the list, one pass at a
            time.
          </li>
          <li>
            Repeat the entire process until no more swaps are needed, indicating
            the list is sorted.
          </li>
        </ol>
        <p>
          Bubble Sort is not the most efficient sorting algorithm, as it has a
          worst-case time complexity of O(n^2), but it is easy to understand and
          implement. It is often used for educational purposes to demonstrate
          the basic principles of sorting algorithms.
        </p>
      </div>
    ),
  },
  {
    title: "Comb Sort",
    name: "Comb",
    function: combSort,
    description: (
      <div>
        <h3>Comb Sort</h3>
        <p>
          Comb Sort is a relatively simple sorting algorithm that improves upon
          the Bubble Sort algorithm by introducing a gap or stride value for
          comparing elements. It repeatedly compares and swaps elements with a
          shrinking gap until the entire list is sorted.
        </p>
        <p>Here's a step-by-step breakdown of how Comb Sort works:</p>
        <ol>
          <li>
            Start with a gap value that is typically the length of the list.
          </li>
          <li>
            Compare elements at the current position and the position at the
            current position plus the gap.
          </li>
          <li>If the elements are out of order, swap them.</li>
          <li>
            Reduce the gap by a shrink factor (usually 1.3) until it becomes 1.
          </li>
          <li>
            Repeat steps 2-4 until the gap becomes 1 and the entire list is
            sorted.
          </li>
        </ol>
        <p>
          Comb Sort is an improvement over Bubble Sort and has an average-case
          time complexity of O(n^2), but in practice, it can be faster than some
          other quadratic time sorting algorithms. It is often used when a
          simple sorting algorithm is required.
        </p>
      </div>
    ),
  },
  {
    title: "Cocktail Sort",
    name: "Cocktail",
    function: cocktailSort,
    description: (
      <div>
        <h3>Cocktail Sort</h3>
        <p>
          Cocktail Sort, also known as Bidirectional Bubble Sort or Shaker Sort,
          is a variation of the Bubble Sort algorithm. It works by sorting the
          list in both directions, first from left to right and then from right
          to left, while continuously comparing and swapping adjacent elements
          until the entire list is sorted.
        </p>
        <p>Here's a step-by-step breakdown of how Cocktail Sort works:</p>
        <ol>
          <li>
            Start with two pointers, one at the beginning (left) and one at the
            end (right) of the list.
          </li>
          <li>
            Move the left pointer to the right, comparing and swapping elements
            as necessary to push the largest element to the right.
          </li>
          <li>
            Move the right pointer to the left, comparing and swapping elements
            as necessary to push the smallest element to the left.
          </li>
          <li>
            Repeat steps 2 and 3 until the left pointer is greater than or equal
            to the right pointer.
          </li>
          <li>
            Repeat the entire process until no more swaps are needed, indicating
            the list is sorted.
          </li>
        </ol>
        <p>
          Cocktail Sort is a variation of Bubble Sort and has a worst-case time
          complexity of O(n^2). While it can perform better than Bubble Sort in
          some cases, it is not the most efficient sorting algorithm for large
          lists. It is often used for educational purposes and is rarely used in
          practice.
        </p>
      </div>
    ),
  },
  {
    title: "Merge Sort",
    name: "Merge",
    function: mergeSort,
    description: (
      <div>
        <h3>Merge Sort</h3>
        <p>
          Merge Sort is a highly efficient, comparison-based sorting algorithm
          that follows the divide-and-conquer approach. It works by recursively
          dividing the input list into smaller sublists, sorting those sublists,
          and then merging them back together to produce a sorted result.
        </p>
        <p>Here's a step-by-step breakdown of how Merge Sort works:</p>
        <ol>
          <li>
            Divide the unsorted list into smaller sublists until each sublist
            contains only one element (base case).
          </li>
          <li>
            Recursively sort each sublist by applying the Merge Sort algorithm
            to them.
          </li>
          <li>
            Merge the sorted sublists back together to create a single, sorted
            list.
          </li>
        </ol>
        <p>
          Merge Sort has a time complexity of O(n log n), making it one of the
          most efficient sorting algorithms, especially for larger datasets. It
          is stable, meaning it preserves the order of equal elements, and is
          widely used in practice.
        </p>
      </div>
    ),
  },
  {
    title: "Tim Sort",
    name: "Tim",
    function: timSort,
    description: (
      <div>
        <h3>Tim Sort</h3>
        <p>
          Tim Sort is a hybrid sorting algorithm derived from Merge Sort and
          Insertion Sort. It is designed to perform well on many kinds of
          real-world data and takes advantage of the fact that natural data
          often has partially ordered sequences.
        </p>
        <p>Here's a step-by-step breakdown of how Tim Sort works:</p>
        <ol>
          <li>Divide the input list into small chunks or runs.</li>
          <li>
            Sort each run using Insertion Sort, which works efficiently on small
            sequences.
          </li>
          <li>
            Merge the sorted runs together using a modified version of Merge
            Sort, resulting in larger sorted runs.
          </li>
          <li>Repeat steps 1-3 until the entire list is sorted.</li>
        </ol>
        <p>
          Tim Sort is highly efficient and adaptive, making it suitable for
          sorting real-world data with varying levels of order. It has a time
          complexity of O(n log n) in the average case and worst-case scenarios,
          and it is the sorting algorithm used by Python's built-in `sorted()`
          function.
        </p>
      </div>
    ),
  },
  {
    title: "Quick Sort",
    name: "Quick",
    function: quickSort,
    description: (
      <div>
        <h3>Quick Sort</h3>
        <p>
          Quick Sort is a highly efficient, comparison-based sorting algorithm
          that follows the divide-and-conquer approach. It works by selecting a
          'pivot' element from the array and partitioning the other elements
          into two sub-arrays, according to whether they are less than or
          greater than the pivot. The sub-arrays are then sorted recursively.
        </p>
        <p>Here's a step-by-step breakdown of how Quick Sort works:</p>
        <ol>
          <li>Choose a 'pivot' element from the array.</li>
          <li>
            Partition the array into two sub-arrays: elements less than the
            pivot and elements greater than the pivot.
          </li>
          <li>Recursively apply Quick Sort to the sub-arrays.</li>
          <li>
            Combine the sorted sub-arrays with the pivot to form the final
            sorted array.
          </li>
        </ol>
        <p>
          Quick Sort is known for its efficiency and has an average-case time
          complexity of O(n log n). In the best-case scenario, it can achieve
          O(n log n) time as well. While it has a worst-case time complexity of
          O(n^2), this is rare in practice, and efficient pivot selection
          strategies can minimize this risk.
        </p>
      </div>
    ),
  },
  {
    title: "Heap Sort",
    name: "Heap",
    function: heapSort,
    description: (
      <div>
        <h3>Heap Sort</h3>
        <p>
          Heap Sort is a comparison-based sorting algorithm that utilizes a
          binary heap data structure to achieve efficient sorting. It is an
          in-place algorithm, meaning it doesn't require additional memory for
          sorting, making it memory-efficient.
        </p>
        <p>Here's a step-by-step breakdown of how Heap Sort works:</p>
        <ol>
          <li>
            Build a max-heap from the input array. This transforms the array
            into a binary heap structure where each parent node is greater than
            or equal to its child nodes (for max-heap).
          </li>
          <li>
            Swap the root node (the maximum element) with the last element in
            the heap and decrement the heap size.
          </li>
          <li>Heapify the root node to maintain the max-heap property.</li>
          <li>Repeat steps 2 and 3 until the heap size becomes 1.</li>
          <li>
            The sorted elements will appear at the end of the array in ascending
            order.
          </li>
        </ol>
        <p>
          Heap Sort has a time complexity of O(n log n) in the worst-case,
          making it efficient for large datasets. It is stable and in-place,
          making it a practical choice for various sorting scenarios.
        </p>
      </div>
    ),
  },
  {
    title: "Radix Sort",
    name: "Radix",
    function: radixSort,
    description: (
      <div>
        <h3>Radix Sort</h3>
        <p>
          Radix Sort is a non-comparative, integer-based sorting algorithm that
          works by sorting numbers digit by digit. It is particularly
          well-suited for sorting integers or strings with fixed-length
          representations.
        </p>
        <p>Here's a step-by-step breakdown of how Radix Sort works:</p>
        <ol>
          <li>
            Find the maximum number in the array to determine the number of
            digits in the largest number.
          </li>
          <li>
            Iterate through each digit position, starting from the least
            significant digit to the most significant digit.
          </li>
          <li>
            For each digit position, use a stable sorting algorithm (usually
            counting sort) to sort the elements based on that digit.
          </li>
          <li>
            Repeat step 3 for all digit positions until the entire array is
            sorted.
          </li>
        </ol>
        <p>
          Radix Sort has a time complexity of O(k * n), where n is the number of
          elements in the array and k is the maximum number of digits in the
          largest number. It is efficient for sorting integers with a bounded
          range of values and is often used in scenarios where the range of
          integers is known.
        </p>
      </div>
    ),
  },
  {
    title: "Counting Sort",
    name: "Counting",
    function: countingSort,
    description: (
      <div>
        <h3>Counting Sort</h3>
        <p>
          Counting Sort is a non-comparative, integer-based sorting algorithm
          that works by counting the frequency of each element in the input
          array and then reconstructing a sorted array based on these counts. It
          is efficient for sorting integers within a known range.
        </p>
        <p>Here's a step-by-step breakdown of how Counting Sort works:</p>
        <ol>
          <li>
            Find the minimum and maximum values in the input array to determine
            the range of values.
          </li>
          <li>
            Create a count array to store the frequency of each unique element
            within the range.
          </li>
          <li>
            Traverse the input array and increment the count of each element in
            the count array.
          </li>
          <li>
            Calculate the cumulative sum of counts to determine the position of
            each element in the sorted array.
          </li>
          <li>
            Create the sorted array based on the cumulative counts and the
            original input array.
          </li>
        </ol>
        <p>
          Counting Sort has a time complexity of O(n + k), where n is the number
          of elements in the input array and k is the range of values (the
          difference between the maximum and minimum values). It is highly
          efficient when the range of input values is small and is often used
          for sorting integers within a known range.
        </p>
      </div>
    ),
  },
  {
    title: "Bogo Sort",
    name: "Bogo",
    function: bogoSort,
    description: (
      <div>
        <h3>Bogo Sort</h3>
        <p>
          Bogo Sort, short for "Bogosort" or "Stupid Sort," is a highly
          inefficient and humorous sorting algorithm. It works by randomly
          shuffling the elements of an array until they happen to be in sorted
          order. It has no practical use and is mainly used as a joke or for
          educational purposes.
        </p>
        <p>
          Here's a step-by-step (or rather, step-by-luck) breakdown of how Bogo
          Sort "works":
        </p>
        <ol>
          <li>Check if the array is sorted. If it is, you're done.</li>
          <li>
            If the array is not sorted, randomly shuffle the elements into a new
            permutation.
          </li>
          <li>
            Repeat steps 1 and 2 until, by pure chance, the array becomes
            sorted.
          </li>
        </ol>
        <p>
          Bogo Sort is incredibly inefficient and has an average-case time
          complexity of O((n+1)!), where n is the number of elements in the
          array. In practice, it can take an astronomically long time to sort
          even small lists, and it's not suitable for any practical application.
        </p>
        <p>
          Bogo Sort is mainly used as a humorous example of a bad sorting
          algorithm and should never be used in real-world scenarios.
        </p>
      </div>
    ),
  },
];

const sortingAlgoritmFunctionMap = sortingAlgoritms.reduce((map, algorithm) => {
  map[algorithm.name] = algorithm.function;
  return map;
}, {});

const sortingOptions = {
  showCompare: {
    defaultValue: true,
    valueType: Boolean,
    type: "checkbox",
    text: "Show Comparisions",
    icon: "fa-solid fa-eye",
  },
  showSwap: {
    defaultValue: true,
    valueType: Boolean,
    type: "checkbox",
    text: "Show Swaps",
    icon: "fa-solid fa-eye",
  },
  onlyDelayOuterLoop: {
    defaultValue: false,
    valueType: Boolean,
    type: "checkbox",
    text: "Speed Up",
    icon: "fa-solid fa-bolt",
  },
  arraySize: {
    defaultValue: 100,
    valueType: Number,
    min: 5,
    max: 2000,
    step: 2,
    type: "slider",
    text: "Array Size",
    icon: "fa-solid fa-arrows-left-right-to-line",
  },
  delay: {
    defaultValue: 10,
    valueType: Number,
    min: 0,
    max: 1000,
    step: 1,
    type: "slider",
    unit: "ms",
    text: "Delay",
    icon: "fa-solid fa-clock",
  },
  reset: {
    type: "button",
    valueType: null,
    text: "Shuffle",
    icon: "fa-solid fa-shuffle",
    action: (grid) => shuffleArray(grid),
  },
  run: {
    type: "button",
    valueType: null,
    text: "Sort",
    icon: "fa-solid fa-arrow-down-short-wide",
    action: (
      grid,
      options = {
        algorithm: "Selection",
        onlyDelayOuterLoop: false,
        showCompare: true,
        showSwap: true,
        delay: 1,
        cancelled: false,
      }
    ) => {
      const algorithm = sortingAlgoritmFunctionMap[options.algorithm];
      algorithm(grid, options);
      RunningAlgorithmManager.trackAlgorithmOptions(options);
    },
  },
  algorithm: {
    type: null,
    defaultValue: "Selection",
    valueType: String,
  },
  stop: {
    type: null,
    defaultValue: false,
    valueType: Boolean,
    action: () => {
      RunningAlgorithmManager.stopCurrentAlgorithm();
    },
  },
};

const sortingLegend = {
  compare: {
    key: 1,
    color: "#ff0000",
    text: "Comparision",
  },
  swap: {
    key: 2,
    color: "#0000ff",
    text: "Swap",
  },
  current: {
    key: 3,
    color: "#ff00ff",
    text: "Current",
  },
  pivot: {
    key: 4,
    color: "#ff00ff",
    text: "Pivot",
  },
  sorted: {
    key: 5,
    color: "#00ff00",
    text: "Sorted Correctly",
  },
  sortedWrong: {
    key: 6,
    color: "#ff0000",
    text: "Sorted Wrong",
  },
};

const sortingStats = {
  comparisons: {
    text: "Comparisons",
    value: 0,
  },
  swaps: {
    text: "Swaps",
    value: 0,
  },
  time: {
    text: "Time",
    value: 0,
  },
};

export {
  sortingAlgoritms,
  sortingAlgoritmFunctionMap,
  sortingOptions,
  sortingLegend,
  sortingStats,
};
