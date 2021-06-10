"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        self.start = start
        self.num = start
    
    def generate(self):
        out = self.num
        self.num += 1
        return out

    def reset(self):
        self.num = self.start

    def __repr__(self) -> str:
        return f"<SerialGenerator start={self.start} next={self.num + 1}>"
    

