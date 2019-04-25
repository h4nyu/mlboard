from databases import Database
from mlboard.config import DB_CONN
DATABASE_URI = DB_CONN
DATABASE_MIN_POOL_SIZE = 10
DATABASE_MAX_POOL_SIZE = 50

db = Database(DATABASE_URI, min_size=5, max_size=10)
