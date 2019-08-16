import cytoolz.curried as tl
from .. import models as ms
from mlboard.core import enums as es
import typing as t


    #  if(empty_count == 0 and same_count == 0 and len(serial) == 0):
    #      return es.StatusLevel.WARNING
    #  elif(empty_count == 0 and same_count == 0 and len(serial) > 0):
    #      return es.StatusLevel.INFO
    #  elif(empty_count == 0 and same_count > 0):
    #      return es.StatusLevel.ERROR
    #  elif(empty_count > 0 and same_count == 0 and len(serial) > 0):
    #      return es.StatusLevel.WARNING
    #  elif(empty_count > 0 and same_count > 0 and len(serial) > 0):
    #      return es.StatusLevel.ERROR
    #  elif(empty_count > 0 and same_count > 0 and len(serial) == 0):
    #      return es.StatusLevel.INFO
    #  elif(empty_count > 0 and len(serial) == 0):
    #      return es.StatusLevel.INFO
