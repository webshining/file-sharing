logs:
	docker-compose logs app
rebuild:
	docker-compose up -d --no-deps --force-recreate --build