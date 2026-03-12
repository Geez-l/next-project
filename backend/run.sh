#!/bin/bash

i=1
for f in *.jpg; do
    mv "$f" "penguins${i}.jpg"
    ((i++))
done