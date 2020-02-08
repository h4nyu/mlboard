#!/bin/sh
while true; do
inotifywait -e modify,create,delete -r ./  && cargo build --tests
done

