#!/usr/bin/env python3
"""
Module providing a sum_list function.
"""
from typing import List


def sum_list(input_list: List[float]) -> float:
    """
    Calculates the sum of a list of floats.

    Args:
        input_list (List[float]): A list of float numbers.

    Returns:
        float: The sum of the numbers in the list.
    """
    return sum(input_list)
