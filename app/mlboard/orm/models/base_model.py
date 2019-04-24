from sqlalchemy.ext.declarative import as_declarative


@as_declarative()
class Base(object):
    def to_dict(self):
        _dict = {**self.__dict__}
        _dict.pop("_sa_instance_state")
        return _dict
