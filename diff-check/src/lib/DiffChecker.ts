const lib = {
  defaultJunkFunction: function (char) {
    return {
      " ": true,
      "\t": true,
      "\n": true,
      "\f": true,
      "\r": true,
    }.hasOwnProperty(char);
  },

  stripLinebreaks: function (text) {
    return text.replace(/^[\n\r]*|[\n\r]*$/g, "");
  },

  stringAsLines: function (text) {
    let newlineIndex = text.indexOf("\n");
    let carriageIndex = text.indexOf("\r");
    let separator =
      (newlineIndex !== -1 && carriageIndex !== -1) || carriageIndex < 0
        ? "\n"
        : "\r";
    let lines = text.split(separator);
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lib.stripLinebreaks(lines[i]);
    }
    return lines;
  },

  __reduce: function (func, array, initial) {
    let result = initial !== null ? initial : array[0];
    let startIndex = initial !== null ? 0 : 1;
    for (let i = startIndex; i < array.length; i++) {
      result = func(result, array[i]);
    }
    return result;
  },

  __ntuplecomp: function (arr1, arr2) {
    let length = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < length; i++) {
      if (arr1[i] < arr2[i]) return -1;
      if (arr1[i] > arr2[i]) return 1;
    }
    return arr1.length === arr2.length ? 0 : arr1.length < arr2.length ? -1 : 1;
  },

  __isindict: function (dict) {
    return function (key) {
      return dict.hasOwnProperty(key);
    };
  },

  __dictget: function (dict, key, defaultValue) {
    return dict.hasOwnProperty(key) ? dict[key] : defaultValue;
  },

  SequenceMatcher: function (a, b, isJunk) {
    this.set_seqs = function (seq1, seq2) {
      this.set_seq1(seq1);
      this.set_seq2(seq2);
    };

    this.set_seq1 = function (seq) {
      if (seq !== this.a) {
        this.a = seq;
        this.matching_blocks = this.opcodes = null;
      }
    };

    this.set_seq2 = function (seq) {
      if (seq !== this.b) {
        this.b = seq;
        this.matching_blocks = this.opcodes = this.fullbcount = null;
        this.__chain_b();
      }
    };

    this.__chain_b = function () {
      let b2j = (this.b2j = {});
      let bLen = this.b.length;
      let popular = {};

      for (let i = 0; i < bLen; i++) {
        let char = this.b[i];
        if (b2j.hasOwnProperty(char)) {
          let list = b2j[char];
          if (bLen >= 200 && list.length * 100 > bLen) {
            popular[char] = 1;
            delete b2j[char];
          } else {
            list.push(i);
          }
        } else {
          b2j[char] = [i];
        }
      }

      for (let char in popular) {
        if (popular.hasOwnProperty(char)) {
          delete b2j[char];
        }
      }

      let isJunkDict = {};
      if (isJunk) {
        for (let char in popular) {
          if (popular.hasOwnProperty(char) && isJunk(char)) {
            isJunkDict[char] = 1;
            delete popular[char];
          }
        }
        for (let char in b2j) {
          if (b2j.hasOwnProperty(char) && isJunk(char)) {
            isJunkDict[char] = 1;
            delete b2j[char];
          }
        }
      }

      this.isbjunk = lib.__isindict(isJunkDict);
      this.isbpopular = lib.__isindict(popular);
    };

    this.find_longest_match = function (aStart, aEnd, bStart, bEnd) {
      let a = this.a;
      let b = this.b;
      let b2j = this.b2j;
      let isJunk = this.isbjunk;

      let bestMatchA = aStart,
        bestMatchB = bStart,
        bestMatchLen = 0;
      let lastMatch = {};
      let emptyArr = [];

      for (let i = aStart; i < aEnd; i++) {
        let matches = {};
        let candidates = lib.__dictget(b2j, a[i], emptyArr);

        for (let j of candidates) {
          if (j < bStart) continue;
          if (j >= bEnd) break;

          let newLen = lib.__dictget(lastMatch, j - 1, 0) + 1;
          matches[j] = newLen;

          if (newLen > bestMatchLen) {
            bestMatchA = i - newLen + 1;
            bestMatchB = j - newLen + 1;
            bestMatchLen = newLen;
          }
        }

        lastMatch = matches;
      }

      while (
        bestMatchA > aStart &&
        bestMatchB > bStart &&
        !isJunk(b[bestMatchB - 1]) &&
        a[bestMatchA - 1] === b[bestMatchB - 1]
      ) {
        bestMatchA--;
        bestMatchB--;
        bestMatchLen++;
      }

      while (
        bestMatchA + bestMatchLen < aEnd &&
        bestMatchB + bestMatchLen < bEnd &&
        !isJunk(b[bestMatchB + bestMatchLen]) &&
        a[bestMatchA + bestMatchLen] === b[bestMatchB + bestMatchLen]
      ) {
        bestMatchLen++;
      }

      return [bestMatchA, bestMatchB, bestMatchLen];
    };

    this.get_matching_blocks = function () {
      if (this.matching_blocks !== null) return this.matching_blocks;

      let queue = [[0, this.a.length, 0, this.b.length]];
      let matchingBlocks = [];

      while (queue.length) {
        let [aStart, aEnd, bStart, bEnd] = queue.pop();
        let [matchA, matchB, matchLen] = this.find_longest_match(
          aStart,
          aEnd,
          bStart,
          bEnd
        );

        if (matchLen) {
          matchingBlocks.push([matchA, matchB, matchLen]);
          queue.push([aStart, matchA, bStart, matchB]);
          queue.push([matchA + matchLen, aEnd, matchB + matchLen, bEnd]);
        }
      }

      matchingBlocks.sort(lib.__ntuplecomp);
      matchingBlocks.push([this.a.length, this.b.length, 0]);
      this.matching_blocks = matchingBlocks;
      return this.matching_blocks;
    };

    this.isjunk = isJunk || lib.defaultJunkFunction;
    this.a = this.b = null;
    this.set_seqs(a, b);
  },
};
