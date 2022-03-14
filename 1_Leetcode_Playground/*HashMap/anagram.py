class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        def freq_counter(word):
            output_obj = {}
            for char in word:
                if char in output_obj.keys():
                    output_obj[char] += 1
                else:
                    output_obj[char] = 1
            return output_obj
        s_freq_count = freq_counter(s)
        t_freq_count = freq_counter(t)
        if len(s_freq_count) != len(t_freq_count):
            return False
        for key in s_freq_count.keys():
            if key not in t_freq_count.keys():
                return False
            if s_freq_count[key] != t_freq_count[key]:
                return False
        return True