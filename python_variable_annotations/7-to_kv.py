#!/usr/bin/env python3
"""
Module providing a to_kv function.
"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Creates a tuple from a string and the square of an int or float.

    Args:
        k (str): The string element.
        v (Union[int, float]): The number to be squared.

    Returns:
        Tuple[str, float]: A tuple where the first element is k 
        and the second is the square of v (as a float).
    """
    return (k, float(v**2))
