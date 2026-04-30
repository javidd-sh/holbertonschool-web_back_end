#!/usr/bin/env python3
"""
Async Comprehension module
"""
from typing import List

# Importing the generator from the previous task
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Collect 10 random numbers using an async comprehension 
    over async_generator, then return the 10 random numbers.
    """
    return [i async for i in async_generator()]
