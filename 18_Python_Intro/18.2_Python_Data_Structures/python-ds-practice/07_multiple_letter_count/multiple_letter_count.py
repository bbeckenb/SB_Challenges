def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    letter_freq = {}
    for char in phrase:
        if char in letter_freq.keys():
            letter_freq[char] += 1
        else:
            letter_freq[char] = 1 

    return letter_freq