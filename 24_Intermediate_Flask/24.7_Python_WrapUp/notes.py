"""
Python is high-level (far away from assembly code)
dynamic - can run a script

type hints

Operator Overloading

Python Standard Lib:
Data-structures and features:
-queues and stacks
-binary search trees
-statistics
-complex #s, fractions, cool math stuff
-functional programmer helpers

Beautiful Soup:
-a lot of sites have APIs, some do not
-you need to 'scrape' HTML to get data
-beautiful soup helps with this

Numpy:
-matrix math, linear algebra

Pandas:
-Data slicing/ grouping/ querying

SciKit-Learn:
-common machine learning algorithms
"""
# type hint
def add(x: int, y: int) -> int:
    return x + y

# place holder 'yield'
# generator function returns generator obj
# instead of creating a large list, can have this iterate to an end point
def firstngen(n):
    num=0
    while num < n:
        yield num # holds value of num for next iteration
        num +=1