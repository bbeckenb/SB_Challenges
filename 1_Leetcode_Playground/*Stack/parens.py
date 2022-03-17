'''
Given a balanced parentheses string s, return the score of the string.

The score of a balanced parentheses string is based on the following rule:

"()" has score 1.
AB has score A + B, where A and B are balanced parentheses strings.
(A) has score 2 * A, where A is a balanced parentheses string.
'''
class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        stack = []
        change_flag = 0
        score = 0
        for p in s:
            if p == "(":
                stack.append(p)
                change_flag = 0
            elif change_flag == 0:
                change_flag = 1
                score += 2**(len(stack)-1)
                stack.pop()
            else: 
                stack.pop()
        return score

        