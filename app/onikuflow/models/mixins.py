import json
import uuid


class SerializableMixIn(object):

    def to_dict(self):
        obj_dict = {}
        for attr, column in self.__mapper__.c.items():
            value = getattr(self, attr)
            if isinstance(value, datetime.datetime):
                obj_dict[attr] = value.isoformat()
            elif isinstance(value, datetime.timedelta):
                obj_dict[attr] = str(value)
            elif isinstance(value, uuid.UUID):
                obj_dict[attr] = str(value)
            else:
                obj_dict[attr] = value
        return obj_dict

    def from_dict(self, obj_dict):
        relations = [attr for attr,
                     relation in self.__mapper__.relationships.items()]
        attrs = [attr for attr, colum in self.__mapper__.c.items()]

        for key, value in obj_dict.items():
            if key in attrs:
                setattr(self, key, value)
            if key in relations:
                if value is None:
                    continue
                relation = self.__mapper__.relationships[key]
                class_ = relation.argument()
                if relation.uselist:
                    setattr(self, key, [class_().from_dict(i) for i in value])
                else:
                    setattr(self, key, class_().from_dict(value))
        return self

    def to_json(self, *args, **kwargs):
        return json.dumps(self.to_dict(*args, **kwargs))

    def from_json(self, json_str):
        self.from_dict(json.loads(json_str))
        return self

    def clone(self):
        dict_ = self.to_dict()
        return self.__class__().from_dict(dict_)
