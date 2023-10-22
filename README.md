<h1 align="center">Тестовое задание</h1>

### В приложении присутствуют два сервиса - сервис пользователей и сервис истории записей.

### Каждый сервис автономно управляет своей схемой в PostgreSQL через миграции.

# Развертывание

## Установка зависимостей

sh install-dependencies.sh

## Запуск контейнеров Docker

sudo docker-compose up -d

## Миграции базы данных

sh migrate-latest.sh