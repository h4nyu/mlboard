#!/bin/sh
while true; do
inotifywait -e modify,create,delete -r ./ &&  go test -v -failfast ./...
done

