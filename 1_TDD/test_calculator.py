from calculator import Calculator
import sys
import io
from random import choice
from string import  ascii_letters
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
        mock_stdout = ("Enter Operation and operand -"
                       "'+', '-', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
                       "'m' for menu\n")
                     

        self.assertEqual(captured_output.getvalue(), mock_stdout)

    def test_accept_user_input_all_operators(self):
        valid_operators = set(['+', '-', '/', '='])

        user_input = self.calc.get_user_input('-')
        self.assertIn(user_input, valid_operators)

        random_alpha = choice(ascii_letters)
        # print(random_alpha)
        user_input = self.calc.get_user_input(random_alpha)
        self.assertTrue(user_input == 'That is not a valid input!')
        
        user_input = self.calc.get_user_input("")
        self.assertNotIn(user_input,valid_operators)

    def test_accept_user_input_number(self):
    
        user_input = self.calc.get_user_input("9")
        self.assertTrue(True == user_input.isdigit())

        user_input = self.calc.get_user_input('a')
        self.assertEqual(user_input, 'That is not a valid input!')

        
    def test_prompt_user(self):

        self.calc.current_state = 9 
        captured_output = io.StringIO()
        sys.stdout = captured_output
        # what every happens here is captured...

        self.calc.prompt_user()

        sys.stdout = sys.__stdout__ 
        mock_stdout = (f"Current State: {'9'}  Enter: ")

        self.assertEqual(captured_output.getvalue(), mock_stdout)

