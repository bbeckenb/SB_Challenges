class Solution:
    def addDigits(self, num: int) -> int:
        while num%10 != num:
            out_sum = 0
            while num > 0:
                out_sum += num%10
                num //= 10
            num = out_sum
        return num