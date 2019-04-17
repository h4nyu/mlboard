from logging import getLogger, Formatter, StreamHandler, DEBUG
logger = getLogger("LogWriter")
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(formatter)
logger.setLevel(DEBUG)
logger.addHandler(handler)

def create_log_writer():
    from .log_writer import LogWriter
    from ..config import STORE_DIR
    app = LogWriter(STORE_DIR)
    return app

