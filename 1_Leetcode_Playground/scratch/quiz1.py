def fun(n): # n is a positive integer
  count = 0
  for i in range(n):
    for j in range(i, 0, -2):
      count += 1
  return count


# print(fun(1000))
# def fun(n): # n is a positive integer
#   count = 0
#   i = n
#   while i > 0:
#     for j in range(n):
#       count += 1
#     i //= 2 # Integer division rounds down
#   return count

print(fun(1001))