

def adder(a,b):
    # for doctest run 'python -m doctest -v FILE_NAME.py'
    # not good for full app, better for documentation
    """doc tests - formatting is annoying, but this is useful call 'python' in terminal from FILE import FUNCTION
    >>> adder(3,5)
    8

    >>> adder(91,46)
    137
    """
    return a+b

#assertion tests
assert adder(2,5) == 7
assert adder(2,7) == 9 # there is no feedback w/ assert and it stops on first fail
