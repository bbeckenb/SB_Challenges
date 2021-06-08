def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """

    highest_freq_num = 0
    highest_freq = 0
    for num in nums:
        if nums.count(num) > highest_freq:
            highest_freq = nums.count(num)
            highest_freq_num = num

    return highest_freq_num