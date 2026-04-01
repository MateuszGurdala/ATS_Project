#!/bin/bash
sleep 10

/opt/mssql-tools/bin/sqlcmd -U sa -P testPASS123 -C -i /var/atsdb/database.sql -S mssqldb
/opt/mssql-tools/bin/sqlcmd -U sa -P testPASS123 -C -d CommunityApp -i /var/atsdb/tables.sql -S mssqldb
/opt/mssql-tools/bin/sqlcmd -U sa -P testPASS123 -C -d CommunityApp -i /var/atsdb/seed.sql -S mssqldb
