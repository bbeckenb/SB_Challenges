def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """

    if type(num) != int:
        return None
    else:
        if num >= 0:
            output_str = ''
            while num > 0:
                output_str += phrase
                num -= 1
            return output_str
        else: 
            return None
            
