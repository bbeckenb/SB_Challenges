


class Calculator(): 

    def __init__(self):
        self.operators = set(['+', '-', '/', '='])
        self.data = []
        self.current_state = 0
        self.snd_last = 0
        self.last = 0 
        self.arithmetic = {'+': self.addition, '-': self.subtraction}       
    
    def run_initial_menu(self):
        print(("Enter Operation and operand -"
               "'+', '-', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
               "'m' for menu"))

    def addition(self):
        return self.current_state + self.last 

    def subtraction(self):
        return self.current_state - self.last

    # def equal_assign(self, a): # not sure about
    #     self.current_state = a

    def prompt_user(self):
        user_input = input(f"Current State: {self.current_state}  Enter: ")
        self.get_user_input(user_input)

    def convert_num_to_float(self, num_or_operator):
        if num_or_operator in self.operators:
            return num_or_operator
        else:
            return float(num_or_operator)

    def get_user_input(self, input):

        if input in self.operators or str(input).isdigit() == True:
            self.data.append(input)
            if len(self.data) >= 2:
                self.last = self.convert_num_to_float(self.data[-1])
                self.snd_last = self.convert_num_to_float(self.data[-2])
            else:
                self.last = self.convert_num_to_float(self.data[0])
                self.current_state = self.last
                # print(self.last, self.snd_last, self.current_state)
            
            if self.snd_last in self.arithmetic.keys():
                self.perform_calculation()
            return input
        else:
            return 'That is not a valid input!'

    def perform_calculation(self): # adding
         # 5... -  1 -> state = self.arith[self.snd_last]
        self.current_state = self.arithmetic[self.snd_last]()
        

