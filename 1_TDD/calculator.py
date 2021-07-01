import operator



class Calculator(): 

    def __init__(self):
        self.list_of_states = []
        self.data = []
        self.current_state = '0'
        self.snd_last = '0'
        self.last = '0' 
        self.arithmetic = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': operator.floordiv,
                            '=': None, 'R': self.revert_state}       
    
    def run_initial_menu(self):
        print(("Enter Operation and operand -"
               "'+', '-', '*', '/', and '=', 'C' (clear last), and an 'AC' (clear all)"
               "'m' for menu"))

    def create_momento(self):
        momento = {'data': self.data, 
        'current_state': self.current_state,
        'snd_last': self.snd_last,
        'last': self.last}
        self.list_of_states.append(momento)

    def revert_state(self):
        prev_state = self.list_of_states.pop()
        # print(f"prev state {prev_state}")
        self.data = prev_state['data']
        self.current_state = prev_state['current_state']
        self.snd_last = prev_state['snd_last']
        self.last = prev_state['last']

    def perform_calculation(self, operator):
        # print(f"in perform_calculation current state {self.current_state}, last {self.last}, operator {operator}, data {self.data}")
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
            if user_input not in ['=', 'R']:
                self.data.append(user_input)
                if len(self.data) >= 2:
                    self.last = self.data[-1]
                    self.snd_last = self.data[-2]
                else:
                    self.last = self.data[0]

            elif user_input == '=':
                # print(f"in user_input {self.snd_last, self.last}")
                if not self.last.isnumeric():
                    self.last, self.snd_last = self.snd_last, self.last

            elif user_input == 'R':
                self.revert_state()
            
            if user_input != 'R':   
                self.update_state()

        else:
            return 'That is not a valid input!'
            

    def update_state(self):
        if self.snd_last in self.arithmetic.keys():
            self.current_state = self.perform_calculation(self.snd_last)
            # print(f"{self.current_state} cur state")
        else: 
            if self.last.isnumeric():
                self.current_state = self.last

        self.create_momento()   
        return self.current_state

        

