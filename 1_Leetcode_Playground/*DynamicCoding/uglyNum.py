'''
An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return true if n is an ugly number.

Example 1:

Input: n = 6
Output: true
Explanation: 6 = 2 × 3
Example 2:

Input: n = 1
Output: true
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
Example 3:

Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes the prime factor 7.
'''
import math
 
# A function to print all prime factors of
# a given number n
# def primeFactors(n):
     
#     # Print the number of two's that divide n
#     while n % 2 == 0:
#         print 2,
#         n = n / 2
         
#     # n must be odd at this point
#     # so a skip of 2 ( i = i + 2) can be used
#     for i in range(3,int(math.sqrt(n))+1,2):
         
#         # while i divides n , print i and divide n
#         while n % i== 0:
#             print i,
#             n = n / i
             
#     # Condition if n is a prime
#     # number greater than 2
#     if n > 2:
#         print n
         
# Driver Program to test above function
 
# n = 315
# primeFactors(n)
class Solution:
    def isUgly(self, n: int) -> bool:
        if n == 0: return False
        while n % 5 == 0: n /= 5
        while n % 3 == 0: n /= 3
        while n % 2 == 0: n /= 2
        return n == 1

pp = Solution()
print(pp.isUgly(14))
        
