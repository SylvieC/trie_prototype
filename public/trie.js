Trie = function() {
  this.characters = {};
  this.isWord = undefined;
};

var rootTrie = new Trie();
Trie.prototype.learn = function(word, index) {
  if (typeof index === "undefined" || index === null) {
    index = 0;
  }
  if (index === word.length) {
    this.isWord = true;
  } else {
    if (this.characters[word[index]] !== undefined) {
      return this.characters[word[index]].learn(word, index + 1);
    } else {
      this.characters[word[index]] = new Trie();
      return this.characters[word[index]].learn(word, index + 1);
    }
  }
};


// This function should add the given word,
// starting from the given index,
// to this Trie.
//let's say I am given the word begin
//if  b is not in the root_node characters hash,  add it and return nodejustcreated.learn('begin',1)
//if b is in the root_node,  find return root_node.character['b'].learn('begin', 1)
//root.learn(word, 0) ... > you take care of word[0] ,   learn('begin', 2) will take care of begin[2]
//.learn(word, 1)... until 
// this.learn('be') ...> this.characters['b']= tree1; index= 0
// return tree1.learn('be', 1) ....> tree1['e'] = tree2; index = 1
//     return (tree2.learn(tree2 .isWord = true

// It will be recursive.  It will tell
// the correct child of this Trie to learn the word
// starting from a later index.

// Consider what the learn function should do
// when it reaches the end of the word?
// A word does not necessarily end at a leaf.
// You must mark nodes which are the ends of words,
// so that the words can be reconstructed later
//node roote has 'b' as a key in its characters hash, this b's value is tree1. tree1's characters
// hash has now a key 'e' with tree 2 as its value. tree2 is Word is true


Trie.prototype.getWords = function(words, currentWord) {

  currentWord = currentWord || '';
  words = words || [];

  if (this.isWord === true) {
    words.push(currentWord);
  }

  for (var key in this.characters) {
    newWord = currentWord + key;
    this.characters[key].getWords(words, newWord);
  }
  return words;
};

rootTrie.learn("be");
rootTrie.learn("begin");
rootTrie.learn("beginner");
rootTrie.learn("beast");


Trie.prototype.find = function(word, index) {
  if (typeof index === "undefined" || index === null) {
    index = 0;
  }
  word_length = word.length;
  if (index === word_length) {
    return this;
  }
  if (this.characters[word[index]] !== undefined) {
    return this.characters[word[index]].find(word, index + 1);
  } else {
    return false;
  }
};

Trie.prototype.autoComplete = function(prefix) {
  if (this.find(prefix) === false) {
    return [];
  } else {
    var result = this.find(prefix).getWords();
    var answer = [];
    for (var i = 0; i < result.length; i++) {
      word = prefix.concat(result[i]);
      answer.push(word);
    }

    return answer;
  }


  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
};