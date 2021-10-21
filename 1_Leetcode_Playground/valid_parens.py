class Solution:
    def isValid(self, s: str) -> bool:  
        match_obj = {
            '(': ')',
            '{': '}',
            '[': ']'
        }
        active_mem = []
        for idx in range(0, len(s)):
            if s[idx] in ['(', '[', '{']:
                active_mem.append(match_obj[s[idx]])
            elif len(active_mem) != 0 and s[idx] == active_mem[len(active_mem)-1]:
                active_mem.pop()
            else:
                return False
        return len(active_mem) == 0

# from collections import deque
# class Solution:
#     def isValid(self, s: str) -> bool:
#         stack = deque()
        
#         for c in s:
#             if c in '{([':
#                 stack.append(c)
#             else:
#                 if not stack:
#                     return False
#                 else:
#                     top= stack.pop()
#                     #last open bracket vanishes, but ejects false if no match
#                     if (top == '(' and c != ')') or \
#                         (top == '[' and c != ']') or \
#                         (top == '{' and c != '}'):
#                         return False
                   
#         return not stack

# ____________________________________________________

# class Solution:
#     # @return a boolean
#     def isValid(self, s):
#         stack = []
#         dict = {"]":"[", "}":"{", ")":"("}
#         for char in s:
#             if char in dict.values():
#                 stack.append(char)
#             elif char in dict.keys():
#                 if stack == [] or dict[char] != stack.pop():
#                     return False
#             else:
#                 return False
#         return stack == []

        
