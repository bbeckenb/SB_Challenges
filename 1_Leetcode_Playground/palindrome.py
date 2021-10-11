class Solution:
    def isPalindrome(self, x: int) -> bool:
        x_to_str = str(x)
        pointer_L = 0
        pointer_R = len(x_to_str) - 1
        while (pointer_R > pointer_L):
            if x_to_str[pointer_L] != x_to_str[pointer_R]:
                return False
            pointer_R -= 1
            pointer_L += 1
        return True

    def solutionIsPalindrome(self, x: int) -> bool:
        # // Special cases:
        # // As discussed above, when x < 0, x is not a palindrome.
        # // Also if the last digit of the number is 0, in order to be a palindrome,
        # // the first digit of the number also needs to be 0.
        # // Only 0 satisfy this property.
        if x < 0 or (x % 10 == 0 and x != 0): 
            return False
        

        revertedNumber = 0
        while x > revertedNumber:
            revertedNumber = revertedNumber * 10 + x % 10
            x /= 10
        

        # // When the length is an odd number, we can get rid of the middle digit by revertedNumber/10
        # // For example when the input is 12321, at the end of the while loop we get x = 12, revertedNumber = 123,
        # // since the middle digit doesn't matter in palidrome(it will always equal to itself), we can simply get rid of it.
        return x == revertedNumber or x == revertedNumber/10
    



s = Solution()
print(s.isPalindrome(512157))