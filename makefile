start:
	ng serve --ssl true \
	         --ssl-cert ./certs/localhost.duncannevin.com.pem \
	         --ssl-key ./certs/localhost.duncannevin.com-key.pem \
	         --host localhost.duncannevin.com \
	         --port 4200
