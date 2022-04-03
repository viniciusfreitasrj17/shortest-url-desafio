#!/usr/bin/env bash

mysql -u "${DB_USER}" -p"${DB_PASS}" -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
