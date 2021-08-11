import bcrypt

"""
Authentication and authorization with Bcrypt
NOTE: DO NOT STORE USERNAME AND PW IN DATABASE
-Developers who have access to the db can see the text passwords

Hashing is the proper way to store passwords
-function used to map data of any arbitrary size to fixed-size values
-Hash functions are deterministic (always gives same output for same input)
-plain text pw goes into hashing function, output goes into database. If we use the same pw on login, it will give us the same output which we can compare against
-One way hash functions (cannot be reverse engineered)
-Hashing is how dictionaries work, key is hashed, value pair is stored at that 'hash-address'
    -This is why you cannot have a non-hashable key like a list

Only a few acceptable cryptographic hash function options
-We will be using b-crypt
    -Uses a 'salt' or random concatenated string to your pw, hashes that and stores result
    -Incredibly unlikeley we will ever have a collision
    -Gives you hash and salt 
    -Slow for the attacker so they can't brute force their way through with high-performance hardware
    -binary math (blowfish and crypt put together)

Create class methods for registering on User class
Make sure your program rememebers who is logged in and check if user_id is in the session in Flask
"""

salt = bcrypt.gensalt()
# returns b'$2b$12$LidGZTPH555dgYeNVkgXvu', b means binary

password = b'monkeypepper78'
bcrypt.hashpw(password, salt)
# returns b'$2b$12$LidGZTPH555dgYeNVkgXvuAEqvFkFc1tWOVKTLlb6Gc/fOmISZdPa'
# Process is, client creates username and pw, on backend we generate salt then bcrypt.hashpw(pw, salt), store the result. Based on unique username, when they login next time we compare the hash with the result from the session pw hash with the same salt
