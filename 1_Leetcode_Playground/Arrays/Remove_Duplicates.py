
def removeDuplicates(nums):
    pointer_1 = 0
    pointer_2 = 0
    for elem in nums:
        pointer_2 = 0
        while pointer_2 != len(nums) - 1:
            if elem == nums[pointer_2] and pointer_1 != pointer_2:
                print(nums, elem, pointer_1, pointer_2)
                boop = nums.pop(pointer_2)
                print(nums, elem, boop, pointer_1, pointer_2)
            else:
                pointer_2 += 1
        pointer_1 += 1
    return nums
    
