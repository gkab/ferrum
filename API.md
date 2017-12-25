# Конфигурация

## config/config.js

## config/languages.js

# Решения

Решение должно быть оформлено в виде Pull Request к основному репозиторию для определенной задачи

## build.json

### format-version
Строка. Версия формата файла, должна быть "2"

### lang
Строка. Язык используемый для сборки, должен быть "C" или другой, см. config/languages.js

### files
Массив строк. Файлы, входящие в проект.

### cflags
Зависит от языка. Для `C` это массив строк - флаги компилятора.

### lflags
Зависит от языка. Для `C` это массив строк - флаги компоновщика.

# API

## /job

Работа с очередью процессов

### GET /

### GET /:job

### PUT /:job/cancel

## /student

Работа с базой данных студентов

### GET /

### GET /:name

### POST /:name

### DELETE /:name

### PUT /:name

## /task

Работа с базой данных задач, сборка

### GET /

### GET /:id

### POST /:id

### DELETE /:id

### PUT /:id

### PUT /:id/build

### PUT /:id/build/:student

### PUT /:id/update

# Пример работы преподавателя и студента

- **Преподаватель** создает репозиторий с тектом задачи, исходными данными и т.д.
Например: https://github.com/gkab/ferrum-testing
- **Студент** делает форк данного репозитория
Например: https://github.com/ferrum-test-student/ferrum-testing
- **Студент** создает папку с заранее заданным именем в своем форке, в этой папке размещает исходный код решения, создает файл build.json с неободимыми данными
Например: https://github.com/ferrum-test-student/ferrum-testing/blob/master/FerrumStudent/build.json
- **Студент** локально тестирует решение своей задачи и делает Pull Request к основному репозиторию
Например: https://github.com/gkab/ferrum-testing/pull/1

Клиент преподавателя должен в данном случае сделать следующие запросы:

- **POST /api/task/testing**
Данные: `repo=ferrum-testing`
Этот запрост создаст объект задачи с условным названием `testing` в базе данных. `repo` это название репозитория на аккаунте преподавателя (заданного в `config/config.js`)
- **POST /api/student/ferrum-test-student**
Данные: `workingDirectory=FerrumStudent`
Этот запрос создаст объект студента с логином `ferrum-test-student` в базе данных. `workingDirectory` это название папки, куда студент должен класть исходный код решения задачи.
- **PUT /api/task/testing/build**
Этот запрос JSON объект по виду `{ "job": 1 }`, где `job` будет иметь номер процесса сборки. Этот номер необходимо сохранить. 
Через какое-то время начнется сборка всех решений к проекту.
- ЛИБО **PUT /api/task/testing/build/
- **GET /api/job/1**
Этот запрос вернет объект вида
```json
{
    "state": "done",
    "students": {
        "ferrum-test-student": {
            "stdout": "",
            "stderr": "",
            "success": true
        }
    },
    "current": "ferrum-test-student"
}
```
Если `state` не `done` и не `error`, значит сборка еще не закончилась. Если объект студента в массиве `students` содержит ключ `error`, то сборка для данного студента завершилась обишкой. Если там есть ключ `success`, то сборка завершилась успешно.


