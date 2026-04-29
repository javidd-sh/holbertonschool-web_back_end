#!/usr/bin/env python3
"""
Module providing an element_length function.
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Takes an iterable of sequences and returns a list of tuples,
    where each tuple contains the sequence and its length.

    Args:
        lst (Iterable[Sequence]): An iterable containing sequences
        (like strings, lists, or tuples).

    Returns:
        List[Tuple[Sequence, int]]: A list of tuples, where the first
        element is the original sequence and the second is its length.
    """
    return [(i, len(i)) for i in lst]
