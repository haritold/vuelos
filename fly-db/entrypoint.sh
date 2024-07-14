#!/bin/bash

# Inicia SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

sleep 15s

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Passw0rd' -d master -i /usr/config/script.sql

wait