def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    flip_case_word = ''

    for char in phrase:
        if char.lower() == to_swap.lower():
            if char.islower():
                flip_case_word += char.upper()
            else:
                flip_case_word += char.lower()
        else:
            flip_case_word += char
    return flip_case_word
