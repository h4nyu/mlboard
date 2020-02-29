#!/bin/sh

echo start migration...
cd /srv && alembic upgrade head
