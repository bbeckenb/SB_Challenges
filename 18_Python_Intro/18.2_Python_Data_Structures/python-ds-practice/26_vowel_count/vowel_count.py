def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowel_dict = {}
    vowel_list = 'aeiou'
    for char in phrase.lower():
        if char in vowel_list:
            if char in vowel_dict:
                vowel_dict[char] += 1
            else:
                vowel_dict[char] = 1
    return vowel_dict