def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """

    new_list = []
    for x in lst:
        if bool(x) != False:
            new_list.append(x)
    
    return new_list