def rotate_array(nums, k):      
    if len(nums) <= 1:
        return None
    
    for i in range(k):
        current = 0
        next_index_location = 1
        holder = 0
        for elem in nums:
            if current == 0:
                holder = elem
            transport_element = nums[next_index_location]
            nums[next_index_location] = holder
            holder = transport_element
            if next_index_location < len(nums) - 1:
                next_index_location += 1
            else:
                next_index_location = 0
            current += 1
    return nums