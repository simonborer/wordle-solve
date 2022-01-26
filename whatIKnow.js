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
    is: [],
    not: []
  },
  3: {
    is: [],
    not: []
  },
  4: {
    is: [],
    not: []
  },
  maybe: [],
  never: []
};

export const whatIKnow = known;