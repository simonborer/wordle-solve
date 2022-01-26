/*
  Grey letters go in 'never'.
  Green letters go in 'is'.
  Yellow letters go *both* in 'maybe' AND
    in 'not' for the position that has been 
    ruled out.
*/

const known = {
  0: {
    is: [],
    not: []
  },
  1: {
    is: [],
    not: []
  },
  2: {
    is: ["a"],
    not: []
  },
  3: {
    is: ["c"],
    not: []
  },
  4: {
    is: [],
    not: []
  },
  maybe: ["h"],
  never: ["r", "i", "s", "e", "p", "l", "n", "t", "o"]
};

export const whatIKnow = known;