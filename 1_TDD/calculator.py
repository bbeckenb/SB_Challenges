import operator


class Calculator(): 

    def __init__(self):
        self.data = []
        self.current_state = '0'
        self.snd_last = '0'
        self.last = '0' 
        self.arithmetic = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': operator.floordiv,
                            '=': None}       
    
    def run_initial_menu(self):
        print(("Enter Operation and operand -"
               "'+', '-', '*', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
               "'m' for menu"))


    def perform_calculation(self, operator):
        a = self.convert_num_to_int(self.current_state)
        b = self.convert_num_to_int(self.last)
        return str(self.arithmetic[(operator)](a,b))
      
    def prompt_user(self):
        user_input = input(f"Current State: {self.current_state}  Enter: ")
        self.get_user_input(user_input)

    def convert_num_to_int(self, num_or_operator):
        if num_or_operator in self.arithmetic.keys():
            return num_or_operator
        else:
            return int(num_or_operator)

    def get_user_input(self, user_input):
        
        if user_input in self.arithmetic.keys() or user_input.isnumeric() == True:
            if user_input != '=':
                self.data.append(user_input)
                if len(self.data) >= 2:
                    self.last = self.data[-1]
                    self.snd_last = self.data[-2]
                else:
                    self.last = self.data[0]

            elif user_input == '=':
                if not self.last.isnumeric():
                    self.last, self.snd_last = self.snd_last, self.last
                    
            self.update_state()

        else:
            return 'That is not a valid input!'
            

    def update_state(self):
        if self.snd_last in self.arithmetic.keys():
            
            self.current_state = self.perform_calculation(self.snd_last)
        else: 
            if self.last.isnumeric():
                self.current_state = self.last
            
        return self.current_state

        

