from math import sqrt
from random import randint

class Triangle:
    """Class to represent a right triangle
    
    Attributes
    __________
    a: int
    length of side a
    b: int
    length of side b
    """

    def __init__(self, a, b): #constructor in JS, have to call self in class
        "Create triangle from a and b sides."
        self.a = a
        self.b = b
    
    @classmethod #decorator? - passes class into method, makes factory function for class
    def random(cls):
        """Class method which returns Triangle with random sides"""
        return cls(randint(1,10), randint(1,10))

    def get_hypotenuse(self): #must add self as arg to all methods as well
        """Gets hypotenuse of triangle"""
        return math.sqrt(self.a ** 2 + self.b ** 2)

    def get_area(self):
        """Gets area of triangle"""
        return (self.a * self.b) / 2

    def describe(self):
        """describes triangle"""
        return f"My area is {self.get_area()}"

    def __repr__(self) -> str: #unambiguous rep of class
         return f"<Triangle with side a length {self.a} side b length {self.b}>"

    def __str__(self) -> str: #printing for customers and consumers
        return self.describe()





