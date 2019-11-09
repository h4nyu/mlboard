#!/bin/sh
uvicorn api:app --workers 8  --reload --host 0.0.0.0 --port 5000
