class Solution:
    def longestCommonPrefix(self, strs) -> str:
        def wordCompare(wordArr, word, prefix):
            if len(wordArr) == 0:
                return prefix
            else:
                newPrefix=''
                nextWord = wordArr.pop()
                loopLen = min(len(word), len(nextWord))
                for idx in range(0, loopLen):
                    if word[idx] != nextWord[idx]:
                        break
                    else:
                        newPrefix += word[idx] 
                return wordCompare(wordArr, nextWord, newPrefix if len(newPrefix) < len(prefix) else prefix)
        if len(strs) == 0:
            return ''
        elif len(strs) == 1:
            return strs[0]
        else:
            firstWord = strs.pop()
            return wordCompare(strs, firstWord, firstWord)

        


        