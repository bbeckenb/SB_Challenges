
class Calculator(): 

    def __init__(self):
        self.operators = '+'
        
    
    def run_initial_menu(self):
        print("Enter Operation and operand - '+', '-', '/', and '=', 'C' (clear last), and an 'AC' (clear all)", end = '')

    def get_user_input(self, operand):
        if operand == self.operators:
            return operand
        else:
            return 'That is NOT a valid operand!'