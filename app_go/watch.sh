#!/bin/sh
while true; do
inotifywait -e modify,create,delete -r ./ &&  go test -v -failfast ./... | sed ''/PASS/s//$(printf "\033[32mPASS\033[0m")/'' | sed ''/FAIL/s//$(printf "\033[31mFAIL\033[0m")/''

done

