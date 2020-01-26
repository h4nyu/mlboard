#!/bin/sh
uvicorn api:app --workers 16  --reload --host 0.0.0.0 --port 5000
