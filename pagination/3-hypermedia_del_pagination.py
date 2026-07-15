#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""
import csv
import math
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Retrieves a dict containing hypermedia details indexed from a start point,
        resilient to deletions in the dataset.
        """
        # Ensure dataset is loaded
        dataset_list = self.dataset()
        indexed_data = self.indexed_dataset()

        # Handle default index value
        if index is None:
            index = 0

        # Assert index is within valid range of the dataset
        assert isinstance(index, int) and 0 <= index < len(dataset_list)
        assert isinstance(page_size, int) and page_size > 0

        data = []
        current_index = index

        # Collect data points up to the requested page size
        while len(data) < page_size and current_index < len(dataset_list):
            if current_index in indexed_data:
                data.append(indexed_data[current_index])
            current_index += 1

        # The next index to query is the index after the last item collected
        next_index = current_index if current_index < len(dataset_list) else None

        return {
            "index": index,
            "next_index": next_index,
            "page_size": page_size,  # MUST be the requested page_size parameter
            "data": data
        }
