#Unpacking

first_name = 'Xander'
initial, *rest = first_name
print(initial, rest)

bean = (1,2)
one, two = bean
print(bean, one, two)

#Spread

nums = [2,3,4,5]
#make copy
num_copy = [*nums]
print(num_copy)
new_list = [4,9,8, *nums]

#dictionary behaves differently, need ** or it will assume its a set
rain_dict = {'Jan': 2.3, 'Feb': 4.0}
rain_set = {*rain_dict} #makes a set of keys
print(rain_set)
new_rain_dict = {'Dec':4.7, **rain_dict}
print(new_rain_dict)

#error handling
#try and accept block

def get_days_alive(person):
    try:
        days = person['age'] * 365
        print(f'{person["name"]} have been alive for {days} days')
    except KeyError as exc:
        print(f"Missing Key {exc}")
    except TypeError:
        print("Expected person to be a dict")

#raising exceptions

#raise Exception

#raise ValueError

#raise ValueError("I don't like that value")

def bounded_avg(nums):
    """return avg of nums (makes sure nums are 1-100)

    >>> bounded_avg([2,4,6])
    4.0

    >>> bounded_avg([10,20,30,40,50])
    30.0

    """

    #Then we need to run python3 -m doctest -v FILE_NAME
    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")
    
    return sum(nums) / len(nums)

def handle_date():
    """process data from database"""

    #ages from DB
    ages = [10,43,65,7,8,0,102]

    try:
        avg = bounded_avg(ages)
        print("average was", avg)

    except ValueError as exc:
        # exc is exception obj - you can examine it!
        print("Invalid age in list of ages")

#Standard Lib importing
import math

from random import choice
print(choice('abcdefghijklmnop'))

from statistics import mean, median

import random

from random import choice as dog #can name function or lib whatever is convenient

print(dog([1,2,3,4,45,554]))


from colorsys import rgb_to_hls

import calendar as cal

cal.prmonth(2025, 4)


#from turtle import * #will allow all functions from turtle to be called independently

#can import other files with same syntax, one class per file
from other_file import *