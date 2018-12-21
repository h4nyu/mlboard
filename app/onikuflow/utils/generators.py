import itertools


def range_generator(delta,
                    from_date,
                    to_date,
                    step=1,
                    overlap=0,
                    limit=50,
                    is_rounded=False):
    if(from_date >= to_date):
        return

    _date = from_date
    task_counter = 0

    for i in itertools.count():
        _date = from_date + i * step * delta

        if _date < to_date - (step + overlap) * delta and task_counter < limit:
            yield (_date, _date + (step + overlap) * delta)
            task_counter += 1
        else:
            break

    if is_rounded is False and task_counter < limit:
        yield (_date, to_date)
        return
