from dateutil.parser import parse
from osca.utils.generators import range_generator
from dateutil.relativedelta import relativedelta
from dateutil.rrule import rrule, DAILY, HOURLY
import uuid
import pytest
params = [
    (parse('2017-05-01 13:00:00+09'),
     parse('2017-05-02 13:12:00+09'), False, 1, 0, 24),
    (parse('2017-05-01 13:00:00+09'),
     parse('2017-05-02 13:12:00+09'), True, 1, 0, 23),
    (parse('2017-05-01 13:00:00+09'),
     parse('2017-05-02 13:12:00+09'), True, 2, 0, 11),
    (parse('2017-05-01 13:00:00+09'),
     parse('2017-05-02 13:12:00+09'), True, 2, 2, 10),
    (parse('2017-05-02 13:00:00+09'),
     parse('2017-05-01 13:00:00+09'), False, 1, 0, 0),
    (parse('2017-05-01 13:00:00+09'),
     parse('2017-05-01 13:00:00+09'), False, 1, 0, 0),
]

hourly = relativedelta(hours=1,
                       minute=0,
                       second=0,
                       microsecond=0)


@pytest.mark.parametrize("from_date, to_date, is_rounded, step, overlap,  expected_len", params)
def test_range_task_generator(from_date, to_date, is_rounded, step, overlap, expected_len):
    tasks = range_generator(
        delta=hourly,
        from_date=from_date,
        to_date=to_date,
        is_rounded=is_rounded,
        step=step,
        overlap=overlap
    )
    periods = list(tasks)
    assert len(periods) == expected_len
