import operator

class Calculator(): 

    def __init__(self):
        self.list_of_states = []
        self.data = []
        self.current_state = '0'
        self.last_operator = None  
        self.last = '0' 
        self.user_commands = {'+': operator.add, '-': operator.sub, '*': operator.mul, '/': operator.truediv,
                            '=': self.perform_calculation, 'R': self.revert_state, "AC": self.reset_calculator}       
    
    def __repr__(self) -> str:
        rep = f"Current State: {self.current_state}\n  Data: {self.data} \n "
        # incomplete 
        return rep

    def run_initial_menu(self):
        print(("Enter Operation and operand -"
               "'+', '-', '*', '/', and '=', 'R' (clear last), and an 'AC' (clear all)"
               "'m' for menu"))
        
    def create_momento(self):
        data = list(self.data)
        current_state = str(self.current_state)
        last_operator = str(self.last_operator)
        last = str(self.last)
        
        momento = {'data': data, 
        'current_state': current_state,
        'last_operator': last_operator,
        'last': last}
        self.list_of_states.append(momento)

    def revert_state(self):
        print(self.list_of_states)
        current_unused = self.list_of_states.pop()
        prev_state = self.list_of_states[-1]
        print(prev_state)

        self.data = prev_state['data']
        self.current_state = prev_state['current_state']
        self.last_operator = prev_state['last_operator']
        self.last = prev_state['last']

    def reset_calculator(self):
        self.list_of_states = []
        self.data = []
        self.current_state = '0'
        self.last_operator = None
        self.last = '0' 
        
    def perform_calculation(self):
        print(f"current state : {self.current_state}")
        print(f"last op : {self.last_operator}")
        print(f"last input : {self.last}")
        if len(self.data) == 1:
            self.current_state = self.last
        else: 
            a = self.convert_num_to_float(self.current_state)
            b = self.convert_num_to_float(self.last)
            if b == 0 and self.last_operator == '/':
                return self.current_state
            elif self.last_operator == None:
                self.current_state = self.last
            else:    
                self.current_state = str(round(self.user_commands[(self.last_operator)](a,b), 2))
        self.create_momento() 
        print(f"state after calc : {self.current_state}")
        

    def prompt_user(self):
        user_input = input(f"Current State: {self.current_state}  Enter: ")
        self.get_user_input(user_input)

    def convert_num_to_float(self, num_or_operator):
        if num_or_operator in self.user_commands.keys():
            return num_or_operator
        else:
            return float(num_or_operator)

    def is_number(self, s):
        """ Returns True is string is a number. """
        return s.replace('.','',1).isdigit()

    def get_user_input(self, user_input):
        if user_input in self.user_commands.keys(): 
            if user_input in ['R', 'AC', '=']:
                self.user_commands[user_input]()
            else:   
                self.data.append(user_input)
                
                self.last_operator = user_input
                self.create_momento() 
        
        elif self.is_number(user_input):
            user_input = str(self.convert_num_to_float(user_input))
            # print('user_input in get_user_input', user_input, type(user_input))
            self.data.append(user_input)
            self.last = user_input
            self.perform_calculation()
                
        else:
            return 'That is not a valid input!'
            

        



