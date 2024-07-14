FROM mcr.microsoft.com/mssql/server

RUN mkdir -p /usr/config

COPY script.sql /usr/config/script.sql

COPY entrypoint.sh /usr/config/entrypoint.sh

RUN chmod +x /usr/config/entrypoint.sh

ENTRYPOINT ["/usr/config/entrypoint.sh"]

EXPOSE 1433