#!/bin/bash

docker exec -i mssqldb /opt/mssql-tools18/bin/sqlcmd -U sa -P testPASS123 -C -i /var/atsdb/database.sql
docker exec -i mssqldb /opt/mssql-tools18/bin/sqlcmd -U sa -P testPASS123 -C -d CommunityApp -i /var/atsdb/tables.sql
docker exec -i mssqldb /opt/mssql-tools18/bin/sqlcmd -U sa -P testPASS123 -C -d CommunityApp -i /var/atsdb/seed.sql
