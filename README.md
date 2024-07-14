# vuelos
En este repositorio exiten 3 carpetas donde se encuentran los archivos necesarios y el codigo fuente del aplicativo y base de datos.

Cada carpeta contiene el archivo Docker para la puesta en marcha del proyecto.

Para ejecutar el archivo para la base de datos se puede usar Docker Compose:
docker-compose up --build

Para la ejecucion del frontend:
docker build -t fly-frontend .
docker run -p 3000:80 fly-frontend


La demostración del aplicativo se encuentra en https://vuelosf.azurewebsites.net/ donde se puede crear un usuario o usar como usuario de prueba a:
carlos@mail.com y como su password: carlos

Saludos.