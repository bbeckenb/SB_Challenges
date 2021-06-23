# You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

# You may assume the two numbers do not contain any leading zero, except the number 0 itself.
# Input: l1 = [2,4,3], l2 = [5,6,4]
# Output: [7,0,8]
# Explanation: 342 + 465 = 807.
# Example 2:

# Input: l1 = [0], l2 = [0]
# Output: [0]
# Example 3:

# Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
# Output: [8,9,9,9,0,0,0,1]
def add_two_lists(l1, l2):
    l1_new = []
    l2_new = []
    num_1 = 0
    num_2 = 0
    mult = 1

    for elem in l1:
        l1_new.append(elem)

    for elem in l2:
        l2_new.append(elem)

    l1_new = l1_new[::-1]
    l2_new = l2_new[::-1]

    for elem in l1_new:
        num_1 += elem * mult
        mult *= 10
    mult = 1

    for elem in l2_new:
        num_2 += elem * mult
        mult *= 10

    num_out = num_1 + num_2
    l_out = []
    while num_out != 0:
        l_out.append(num_out%10)
        num_out = int(num_out/10)
    if l_out == []:
        l_out.append(0)
    return l_out

    # ping-pong, exircism
   