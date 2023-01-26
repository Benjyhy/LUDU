#!/bin/bash

rm -rf ./luduBackend/files/server.tgz
cd ./luduBackend/tasks
ansible-playbook compress.yml
cd ../..
ansible-playbook luduPlaybook.yml -v --ask-become-pass