
class Calculator(): 

    def __init__(self):
        self.operators = set(['+', '-', '/', '='])
        self.current_state = 0
        
    
    def run_initial_menu(self):
        print(("Enter Operation and operand -"
               "'+', '-', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
               "'m' for menu"))

    def prompt_user(self):
        print(f"Current State: {self.current_state}  Enter: ", end='')
               
    def get_user_input(self, input):

        if input in self.operators or input.isdigit() == True:
            return input
        else:
            return 'That is not a valid input!'