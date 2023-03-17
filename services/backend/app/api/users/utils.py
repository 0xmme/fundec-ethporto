import random
import string

def create_code():
    code = ''.join(random.choices(string.ascii_letters + string.digits, k=40))
    return code