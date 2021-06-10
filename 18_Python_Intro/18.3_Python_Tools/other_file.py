def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    return phrase[::-1]

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

def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """

    for item in lst:
        if type(item) != list:
            return False
    return True

#virtual environments
#cd PROJ_DIRECTORY
#python3 -m venv venv     once per project

#source venv/bin/activate     every time we open virtual env
#allows for different version installs w/ no conflicts

#pip freeze > requrements.txt will put your installs in a file
# this allows you not to put all installs on your github when you push something from a venv
#ignore venv .gitignore venv/

#recreating clone
# git clone url
#cd into it
#python3 -m venv venv
#source venv/bin/activate
#pip3 install -r requirments.txt
# Files - https://www.youtube.com/embed/pr4ycv09UxI?showinfo=0&controls=1&rel=0&autoplay=1
#to open files use open("path", MODE) ex: file = open("path", 'r')
#mode can be r for read
#mode can be w for write - if you open("FILE.txt", 'w') and it does not exist, it will generate FILE.txt for you
# use close() to sever connection between file and python
#all_text = file.read

#http://curric.rithmschool.com/springboard/lectures/python-tools/