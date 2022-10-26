deploy-prod:
	echo "Deployment started ..."
	git pull origin master
	docker-compose -f production.yml up -d --build
	echo "Deployment finished!"

deploy-dev:
	echo "Deployment started ..."
	git pull origin master
	docker-compose up -d
	echo "Deployment finished!"
