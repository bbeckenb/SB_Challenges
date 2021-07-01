from calculator import Calculator
import sys
import io
from random import choice
from string import  ascii_letters
from unittest import TestCase
import unittest

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
        # whatever happens here is captured...
        self.calc.run_initial_menu()
        sys.stdout = sys.__stdout__ 
        mock_stdout = ("Enter Operation and operand -"
               "'+', '-', '*', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
               "'m' for menu\n")
                     

        self.assertEqual(captured_output.getvalue(), mock_stdout)

    def test_accept_user_input_all_operators(self):
        valid_operators = set(['+', '-', '/', '='])

        self.calc.get_user_input('-')
        self.assertTrue(self.calc.data[-1] == '-')

        random_alpha = choice(ascii_letters)
        # print(random_alpha)
        user_input = self.calc.get_user_input(random_alpha)
        self.assertTrue(user_input == 'That is not a valid input!')
        
        user_input = self.calc.get_user_input("")
        self.assertNotIn(user_input,valid_operators)

    def test_accept_user_input_number(self):
    
        self.calc.get_user_input("9")
        self.assertTrue(self.calc.current_state == '9')

        user_input = self.calc.get_user_input('a')
        self.assertEqual(user_input, 'That is not a valid input!')

    @unittest.skip("skipping prompt user")
    def test_prompt_user(self):

        self.calc.current_state = "9" 
        captured_output = io.StringIO()
        sys.stdout = captured_output
        # what every happens here is captured...

        self.calc.prompt_user()

        sys.stdout = sys.__stdout__ 

        mock_stdout = "Current State: 9  Enter: "

        self.assertEqual(captured_output.getvalue(), mock_stdout)



    def test_recall_last_two_inputs(self):
        
        # self.calc.get_user_input("=")

        # self.assertEqual(self.calc.snd_last, 0)

        self.calc.get_user_input("4")
        self.calc.get_user_input("+")
        self.calc.get_user_input("5")
        

        self.assertEqual(self.calc.last, "5")
        self.assertEqual(self.calc.snd_last, "+")
        self.assertNotEqual(self.calc.last, "=")

    # def test_convert_number

    def test_add_calculation(self):
        self.calc.get_user_input("5")
        self.calc.get_user_input("+")
        self.calc.get_user_input("5")

        self.assertEqual(self.calc.current_state, "10")

        
    def test_subtraction_calculation(self):
        self.calc.get_user_input("5")
        self.calc.get_user_input('-')
        self.calc.get_user_input("1")
        
        self.assertEqual(self.calc.current_state, "4")
            
    # def test_division(self):
    def test_multiplication(self): 
        self.calc.get_user_input("2")
        self.calc.get_user_input('*')
        self.calc.get_user_input("14")
        
        self.assertEqual(self.calc.current_state, "28")

    def test_divsion(self): 
        self.calc.get_user_input("22")
        self.calc.get_user_input('/')
        self.calc.get_user_input("11")
        
        self.assertEqual(self.calc.current_state, "2")

    def test_one_numeric_input_equals(self):
        self.calc.get_user_input("5")
        self.calc.get_user_input("=")
        self.calc.get_user_input("=")
        
        self.assertNotEqual(self.calc.get_user_input("="), "That is not a valid input!")
        self.assertEqual(self.calc.current_state, "5")
        
        self.calc.get_user_input("+")
        self.calc.get_user_input("=")

        self.assertEqual(self.calc.current_state, "10")

        

        