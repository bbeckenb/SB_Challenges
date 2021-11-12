class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if (len(needle) > len(haystack)) or (len(needle) == len(haystack) and needle != haystack):
            return -1
        if (needle == haystack) or (needle == ''):
            return 0
        count=0
        goal = len(needle)
        index=0

        for elem in haystack: 
            if elem == needle[count] and (index+len(needle)-1) < len(haystack) and haystack[index+len(needle)-1] == needle[len(needle)-1]:
                indexHolder=index
                for letter in needle:
                    if indexHolder < len(haystack) and haystack[indexHolder] == letter:
                        count += 1
                        if count == goal:
                            return index 
                        indexHolder += 1
                    else:
                        count = 0
                        break 
            index += 1
        return -1
        
        
        # def helperStr(haystack=haystack, needle=needle, p1=0, p2=len(haystack)-1, results=[]):
        #     if p2<p1:
        #         return results.append(-1)
        #     else:
        #         midpoint=(p2+p1)//2
        #         print(haystack[midpoint], midpoint)
        #         helperStr(haystack, needle, midpoint+1, p2, results)
        #         helperStr(haystack, needle, p1, midpoint-1, results)
        #         if haystack[midpoint] == needle[0]:
        #             count = midpoint
        #             matchCheck = True
        #             for elem in needle:
        #                 if count > len(haystack)-1 or haystack[count] != elem:
        #                     matchCheck = False
        #                 if not matchCheck:
        #                     break
        #                 else:
        #                     count += 1
        #             if matchCheck:
        #                 results.append(midpoint)
        #     return results
        # out = list(filter(lambda x: x>=0, helperStr()))
        # return -1 if len(out) == 0 else min(out)

s = Solution()
print(s.strStr('mississippi', 'issipi'))
# print(s.strStr('abc', 'c'))
# print(s.strStr('aaaaa', 'a'))
# print(s.strStr('aaaaaaaaa', 'abb'))

              
                        

