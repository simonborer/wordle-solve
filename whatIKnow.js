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
    not: ["a"]
  },
  2: {
    is: [],
    not: []
  },
  3: {
    is: [],
    not: []
  },
  4: {
    is: [],
    not: ["e"]
  },
  maybe: ["a", "e"],
  never: ["r", "i", "s"]
};

export const whatIKnow = known;