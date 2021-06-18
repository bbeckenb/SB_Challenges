"""Example of unit Tests"""

import arithmetic
from unittest import TestCase

class AdditionTestCase(TestCase):
    def test_adder(self):
        assert arithmetic.adder(2,3) == 5

    def test_adder_2(self):
        #instead of assert testing.adder(2,2) == 4
        self.assertEqual(arithmetic.adder(2,2), 4)
        # self.assertFalse(function_name(input)) - makesure oputput is False
        # self.assertTrue(function_name(input)) - make sure output is True
        # self.assertRaises(Error_type, function, value)
    # run 'python3 -m unittest FILE_NAME.py'



# class TestStringMethods(TestCase):

#     def test_upper(self):
#         self.assertEqual('foo'.upper(), 'FOO')

#     def test_isupper(self):
#         self.assertTrue('FOO'.isupper())
#         self.assertFalse('Foo'.isupper())

#     def test_split(self):
#         s = 'hello world'
#         self.assertEqual(s.split(), ['hello', 'world'])
#         # check that s.split fails when the separator is not a string
#         with self.assertRaises(TypeError):
#             s.split(2)