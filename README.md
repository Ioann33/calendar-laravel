Написать Rest API для ведения личного календаря. В качестве аутентификации использовать Bearer-токены. Доступные эндпойнты:

GET /calendar
Возвращает все записи в интервале между параметрами date_start и date_end. Доступен только для аутентифицированных пользователей.

POST /calendar
Добавление новой записи в календарь. Запись добавляется на конкретное время (date) и с конкретной длительностью в минутах (duration).
Также у записи есть поля title (обязательное) и description (не обязательное).
Если запись добавляет аутентифицированный пользователь, то возможно пересечение различных записей по времени (например, в календаре уже есть запись с 14:00 до 15:30, а пользователь добавляет новую запись с 15:00 до 16:00).
Анонимный пользователь также может добавлять новые записи, но только на полностью свободное от других событий время.

PATCH /calendar/<id>
Обновление конкретной записи в календаре. Обновлять можно любые поля, но только у записей, до начала которых больше трех часов. Доступен только для аутентифицированных пользователей.

DELETE /calendar/<id>
Удаление конкретной записи в календаре. Удалять можно только записи, до которых осталось больше 3 часов. Доступен только для аутентифицированных пользователей.
