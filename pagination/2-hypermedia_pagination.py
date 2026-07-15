#!/usr/bin/env python3
"""
Hypermedia pagination helper module containing the Server class.
"""
import csv
import math
from typing import List, Tuple, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate the start and end indexes for a given page and page size.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Get page from dataset based on pagination parameters.
        """
        # Verify arguments are integers strictly greater than 0
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0

        # Find the correct start and end indices
        start, end = index_range(page, page_size)

        # Get the dataset
        data = self.dataset()

        # If indices are out of range for the dataset size, return empty list
        if start >= len(data):
            return []

        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Get hypermedia metadata dictionary along with the paginated dataset.
        """
        # Fetch the records for this page
        data = self.get_page(page, page_size)
        
        # Determine total dataset length to compute total pages
        total_records = len(self.dataset())
        total_pages = math.ceil(total_records / page_size)

        # Calculate previous and next pages
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
