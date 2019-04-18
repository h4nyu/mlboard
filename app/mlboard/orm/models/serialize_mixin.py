from playhouse.shortcuts import model_to_dict, update_model_from_dict


class SerializeMixIn(object):

    @property
    def __dict__(self):
        return model_to_dict(self)

    def to_dict(self):
        return model_to_dict(self)

    def from_dict(self, data: dict):
        update_model_from_dict(self, data)
        return self

    def clone(self):
        _dict = self.to_dict()
        return self.__class__().from_dict(_dict)

    def get_diff(self, other):
        source_dict = self.to_dict()
        obj_dict = other.to_dict()
        diff = itemfilter(
            lambda x: f"{source_dict[x[0]]}" != f"{x[1]}",
            obj_dict
        )
        return diff
