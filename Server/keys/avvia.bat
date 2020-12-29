call openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 36
call openssl rsa -in key.pem -out newkey.pem && move newkey.pem key.pem