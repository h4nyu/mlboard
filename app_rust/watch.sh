#!/bin/sh
while true; do
inotifywait -e modify,create,delete -r ./  && cargo test --lib -- --nocapture
done

