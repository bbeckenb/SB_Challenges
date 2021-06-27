from calculator import Calculator
import sys
import io
from random import choice
import string
from unittest import TestCase

class CalculatorTestCase(TestCase):
    
    def setUp(self):
        """stuff to do before every test"""
        """All tests below will run in order setUp, test_x, tearDown"""
        self.calc = Calculator()

    def tearDown(self):
        """stuff to do after each test"""

    def test_initial_menu_display(self):
        #  Display operation menu
        # Enter Operation and operand -
        #  '+', '-', '/', and '=', 'C' (clear last), and an 'AC' (clear all)
        #  Current State: 0  $:
        captured_output = io.StringIO()
        sys.stdout = captured_output
        # what every happens here is captured...
        self.calc.run_initial_menu()
        sys.stdout = sys.__stdout__ 
        mock_stdout = "Enter Operation and operand - '+', '-', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
       
        self.assertEqual(captured_output.getvalue(), mock_stdout)

    def test_accept_user_plus_operator_input(self):
        user_input = self.calc.get_user_input('+')
        self.assertTrue(user_input == '+')
        random_alpha = choice(string.ascii_letters)
        print(random_alpha)
        user_input = self.calc.get_user_input(random_alpha)
        self.assertTrue(user_input == 'That is NOT a valid operand!')
        
        
