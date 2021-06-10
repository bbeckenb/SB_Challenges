"""Word Finder: finds random words from a dictionary."""
from random import randint


  

class WordFinder:
    """Reads in file of words provides method/s to output a random word"""
    def __init__(self, file_path):
        word_file = open(file_path)
        self.word_list = self.clean_file(word_file)
        self.word_count = len(self.word_list)
        print(f"{self.word_count} words read")

    def clean_file(self, word_file):
        """opens word files and provides usable list for manipulation"""
        read_file = word_file.readlines()
        workable_file = list(read_file)
        cleaned_file = []
        for line in workable_file:
            line = line.replace('\n', '')
            cleaned_file.append(line)
        return cleaned_file 
    
    def random(self):
        """provides random output from full length of word list"""
        return self.word_list[randint(0, self.word_count - 1)]

    
    def __repr__(self) -> str:
        return f"<WordFinder {self.word_count} words>"



class SpecialWordFinder(WordFinder):
    """Handles special cases on top of usual WordFinder class methods"""
      
    def clean_file(self, word_file):
        """opens word files and provides usable list for manipulation"""
        read_file = word_file.readlines()
        workable_file = list(read_file)
        cleaned_file = []
        for line in workable_file:
            line = line.replace('\n', '')
            cleaned_file.append(line)
        
        count = 0
        for line in cleaned_file:
            if line.startswith("#") or "" == line:
                print(line)
                cleaned_file.pop(count)
            count += 1
        print(cleaned_file)
        cleaned_file.append('hjdsgjdhs') #see append alters it correctly
        print(cleaned_file)
        return cleaned_file
  
  
  
        
        
    
l = ['# Veggies', 'kale', 'parsnips', '# Fruits', 'apple', 'mango', 'grape', 'hjdsgjdhs']

# def remove_special_1(word_list):
#         count = 0
#         for line in word_list:
#             if line.startswith("#") or "" == line:
#                 print(line)
#                 word_list.pop(count)
#             count += 1
#             print(count)
#         print(word_list)
#         word_list.append('hjdsgjdhs')
#         print(word_list)
#         return word_list


               
        
