def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal.

    For example:

        >>> sum_pairs([1, 2, 2, 10], 4)
        (2, 2)

    (4, 2) sum to 6, and come before (5, 1):

        >>> sum_pairs([4, 2, 10, 5, 1], 6) # (4, 2)
        (4, 2)

    (4, 3) sum to 7, and finish before (5, 2):

        >>> sum_pairs([5, 1, 4, 8, 3, 2], 7)
        (4, 3)

    No pairs sum to 100, so return empty tuple:

        >>> sum_pairs([11, 20, 4, 2, 1, 5], 100)
        ()
    """
    count = 0 
    dict_1 = {}
    for num in nums:
        temp_list = nums.copy()
        temp_list.pop(count)
        other_count = 0
        for x in temp_list:
            if num + x == goal:
                if count < other_count:
                    dict_1[(num, x)] = [other_count, count]
                else:
                    dict_1[(num, x)] = [count, other_count]
            other_count += 1
        count+=1

    key = ()
    compare_val = len(nums)
    for item in dict_1:
        if dict_1[item][0] < compare_val:
            key = item
            compare_val = dict_1[item][0]

    return key

