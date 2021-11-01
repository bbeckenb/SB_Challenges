class Solution:
    def removeElement(self, nums, val) -> int:
        arr_count=0
        val_count=len(nums)
        while arr_count < len(nums):
            if nums[arr_count] == val:
                val_count -= 1
                nums.pop(arr_count)
                nums.append('_')
            else:
                arr_count += 1
        return val_count

s = Solution()
print(s.removeElement([3,2,2,3], 3))