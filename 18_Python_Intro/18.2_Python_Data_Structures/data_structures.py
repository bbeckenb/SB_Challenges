new_list = [1,2,3,4,5,6]
print(len(new_list)) #will show us the length of the list

print("constructor function, list()")
string_list = list('hello')
print(string_list)
number_list = list(range(0,20,2))
print(number_list)

print("NOTE: 'is' compares memory reference, '==' compares contents. If you make a copy of a variable and adjust its contents, it will change the original contents as well")

copy = string_list
copy[0] = 'j'
print(copy)
print(string_list)

print("slicing - lst[start:stop:step] NOTE does not include 'stop'")
print(string_list[0:4:2])
print("can reverse arrays with slicing")
reverse_string_list = string_list[::-1]
print(reverse_string_list)

print("splicing same syntax as slicing, but it updates list")
print(number_list)
print("now splice with number_list[0:1] = [9,9,9]")
number_list[0:1] = [9,9,9]
print(number_list)
print("can add to the end of the list number_list[6:] = [1,2,3]")
number_list[6:] = [1,2,3]
print(number_list)
print("can delete after a certain element number_list[6:] = []")
number_list[6:] = []
print(number_list)

print("list methods - append")
chickens = [1,2,3,4]
print(chickens)
chickens.append(5)
print(chickens)

print("list methods - copy, does not reference same place in memory")

copy_flock = chickens.copy()
copy_flock.append(5)
print(chickens)
print(copy_flock)

print("list methods - count - how many times does an element value occur in a list")
print(copy_flock.count(5))

print("List methods - extend, appends an iterable thing to a list")
chickens.extend(copy_flock)
print(chickens)

print("List methods - index - returns first index of element, raises value error if value is not present (use in conjunction with "in"")
print(chickens.index(5))

print("List methods - insert, inserts element at desired index")
chickens.insert(3, [9,9]) #at index of 3 insert a list of [9,9]
print(chickens)

print("List methods - pop, removes and returns an element from a list at desired index")
chick = chickens.pop(3)
print(chickens)
print(chick)

print("List methods - sort - sorts alphabetically for str and ascending order for numbers, can reverse order with arg Reverse=True. Must be homogenous list")
chickens.sort()
print(chickens)
chickens.sort(reverse=True)
print(chickens)

print("Strings continued - can slice, but not splice, strings are immutable")
#immutable = can't be modified
msg = "hsadbjahsdbahsbdahsbdjhasbdhasd"
print(msg[0])
print(msg[5:])

print("Strings Continued - count, (case-sensitive) returns # of times char occurred in a string")
print(msg.count('h'))

print("Strings continued - endswith() checks if string ends with a char or a pattern")
sentence = "The man bought a candy bar for the cheeseburger picnic"
print(sentence.endswith('picnic'))

print("Strings continued - startswith() checks if string starts with a char or a pattern")
sentence = "The man bought a candy bar for the cheeseburger picnic"
print(sentence.startswith('The'))

#find - shows first occurrence of char or string, returns -1 if it is not there

#isdigit checks if the whole string consists of digits

#join - brings together elements of a list or string with a desired character in between
#combines iterable as a word
print("|".join(sentence))

# lower upper isupper islower capitalize

#replace
text = "I hate you so much"

text = text.replace(' ', '... ', 1)

print(text)

#split turns string into list using separator char (can't use that for spaces)
animals = "goat,pig,sheep,dog,monkey"
animals = animals.split(',')
print(animals)

#strip - removes whitespace
user_input = "    beep    dssds    "
user_input = user_input.strip()
print(user_input)

print("dictionaries - data structure, they are objects")
#it is similar to a JS map
new_dict = {'cats': ['tino', 'pussnboots'], 'numbers': [1,2,3]}
print(new_dict['cats'])
# use 'in' operator to see if a key is in the dictionary
bean = dict([[True,0],[False,1],[1,4],[2,3],['b','eans']])
print(bean)

print("iterating over dictionaries")
print(bean.keys())
print(bean.items())
for pair in bean.items():
    print(pair)

for (k,v) in bean.items():
    print(k, '---->', v)

# dictionaries are ordered off insertion order

print("dictionary methods")
#get
print(bean.get('z'))
#then if it does not exist yet, you can return an optional default value
print(bean.get('z', 'ebra'))
bean['z'] = 'ebra'
print(bean['z'])

#specific key pop
zebra = bean.pop('z')
print(zebra)

#popitem, takes an item of the list
print(bean)
print(bean.popitem())
print(bean)

print({}.fromkeys('MTWTF', 4))

bean.clear()
print(bean)

print("Sets - unique collection of elements that have to be unique")
#set = {x,y,z}
languages = {'ruby', 'python', 'javascript', 'ruby'}
print(languages, 'is type', type(languages))

voted_languages = ['ruby', 'python', 'scala', 'python', 'javascript']
print(set(voted_languages))

#can only use immutable types
languages.add('scala')
print(languages)
print(languages.pop())
print(languages)

languages.remove('python')
print(languages)

#.copy() works the same as for other data-types
#.clear() works the same

print("set operations")
lemon = {'sour', 'yellow', 'fruit', 'bumpy'}
banana = {'fruit', 'smooth', 'sweet', 'yellow'}

print("union operator, puts sets together 'set1 | set2 | set3 ...etc'")
all_features = banana | lemon
print(all_features)

print("also intersection, collects commonalities set1 & set2")
same_features =  banana & lemon
print(same_features)

print("difference set1 - set2, get elements that are in set1 that are not in set2")
print(lemon.difference(banana))

print("also symmetric difference set1 ^ set2, returns all non-commonalities")
print(lemon ^ banana)

print("NOTE: all named set functions work on iterables (lists), a set will be created from the iterable")

print("Tuples - immutable, ordered sequence, tuple = (elem1, elem2, elem3)")
#cannot make a tuple of a single element without adding a trailing comma ex: (3,)
#smaller than lists, faster than lists (slightly)
#can be used as keys for dictionaries (k,v), advantage is that they are immutable
#count, index are methods usable on tuples

print("Comprehensions - syntax for creating a list off of some other iterable")
nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]

evens = [num for num in nums if num % 2 == 0]
#called comprehensions - the act or process of comprising

double = [num * 2 for num in nums]

print("[what_to_append for thing in list]")

square = [num ** 2 for num in nums]

print(f"{evens}\n{double}\n{square}")

new_str = [char.upper() + '.' for char in 'lmfao']
print(new_str)

# Can also add filter
print("nested list comprehension")
blank1 = [[] for x in range(3)]
print(blank1)
blank2 = [[0 for y in range(3)] for x in range(3)]
print(blank2)

def gen_board(size, initial_val=None):
    return [[initial_val for x in range(size)] for y in range(size)]

print("Can add conditional logic")

#grades = ['PASS' for score in nums if score >= 8 ]
grades = ['PASS' if score >=8 else "FAIL" for score in nums]
print(grades)

print("works for dictionaries")
day_count = {day: 0 for day in 'MTWRFSU'}
print(day_count)

square_dict = {num: num ** 2 for num in range(1,10)}
print(square_dict)

print("works for sets")
set_letters = {char for char in 'hello darkness my old friend' if char not in 'aeiou'}
print(set_letters)