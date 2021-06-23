def twoSum(nums, target):
        # out_list = []
        # target = target
        # for num in nums:
        #     # list_without_num = nums.copy()
        #     # list_without_num.remove(num)
        #     for num_1 in nums:
        #         if target == num + num_1:
        #             out_list.append(nums.index(num))
        #             out_list.append(nums.index(num_1))
        #             return out_list

        out_list = []
        nums_set = set(nums)
        nums_set_remove_used = nums_set.copy()

        for num in nums_set:
            if num * 2 == target and num >= 0:
                out_list.append(nums.index(num))
                out_list.append(nums.index(num, nums.index(num) + 1))
                return out_list
            nums_set_remove_used.remove(num)
            for num_1 in nums_set_remove_used:
                if target == num + num_1:
                    print(num, num_1)
                    out_list.append(nums.index(num))
                    out_list.append(nums.index(num_1))
                    return out_list

     #Need to use dictionary (Hash map in java) for improved speed               
solution = twoSum([-3,4,3,90], 0)
print(solution)