cd ./schemas-migrations && npx knex migrate:latest --env migration && cd ..;

sudo docker exec -it user-service sh -c \
    "cd ./migrations && npx knex migrate:latest --env migration &&
    exit;";

sudo docker exec -it user-history-service sh -c \
    "cd ./migrations && npx knex migrate:latest --env migration &&
    exit;";
