#!/usr/bin/env python3
"""
Module providing an element_length function.
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Takes an iterable of sequences and returns a list of tuples,
    where each tuple contains the sequence and its length.
    """
    return [(i, len(i)) for i in lst]
