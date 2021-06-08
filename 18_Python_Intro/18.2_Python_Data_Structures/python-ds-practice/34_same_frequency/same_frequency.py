def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1_list = [int(x) for x in str(num1)]
    num2_list = [int(x) for x in str(num2)]

    count = 0
    for num in num1_list:
        if num1_list.count(num) != num2_list.count(num):
            return False
    return True