# For a list of words, print out each word on a separate line, but in all uppercase. How can you change a word to uppercase? Ask Python for help on what you can do with strings!

# Turn that into a function, print_upper_words. Test it out. (Don’t forget to add a docstring to your function!)

# Change that function so that it only prints words that start with the letter ‘e’ (either upper or lowercase).

# Make your function more general: you should be able to pass in a set of letters, and it only prints words that start with one of those letters.

# For example:

# # this should print "HELLO", "HEY", "YO", and "YES"

# print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
#                    must_start_with={"h", "y"})

def print_upper_words(word_list, letter_list):
    """takes in list of words, prints words that start with 'e' on a separate line as an uppercase version of it self"""
    
    letter_list_upper = []
    for letter in letter_list:
        letter_list_upper.append(letter.upper())
    
    letter_list_lower = []
    for letter in letter_list:
        letter_list_lower.append(letter.lower())

    for word in word_list:
        if word[0] in letter_list_lower or word[0] in letter_list_upper:
            print(f'{word.upper()}\n')

print_upper_words(['beans', 'cats', 'dogs', 'eagles', 'Entei', 'e', 'E', 'a', 'O'], ['a', 'E', 'C'])