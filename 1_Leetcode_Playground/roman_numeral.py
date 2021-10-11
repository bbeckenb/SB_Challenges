class Solution:
    def romanToInt(self, s: str) -> int:
        roman_numerals ={
            'I':1,
            'V':5,
            'X':10,
            'L':50,
            'C':100,
            'D':500,
            'M':1000
        }
        returnSum = 0
        hold_rom_num = ''
        for rom_num in s:
            if hold_rom_num == 'I' and rom_num == 'V':
                returnSum += 3
            elif hold_rom_num == 'I' and rom_num == 'X':
                returnSum += 8
            elif hold_rom_num == 'X' and rom_num == 'L':
                returnSum += 30
            elif hold_rom_num == 'X' and rom_num == 'C':
                returnSum += 80
            elif hold_rom_num == 'C' and rom_num == 'D':
                returnSum += 300
            elif hold_rom_num == 'C' and rom_num == 'M':
                returnSum += 800
            else:
                returnSum += roman_numerals[rom_num]
            hold_rom_num = rom_num
        return returnSum

