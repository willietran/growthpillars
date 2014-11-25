# Check env var to see whether environment is local dev or prod
from os import environ
def check_is_local():
    return environ.get('GROWTH_PRODUCTION') == None
