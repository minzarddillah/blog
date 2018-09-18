### List of routes:

| Route                 |  HTTP  | Desription                                           |
| --------------------- |:------:| ---------------------------------------------------- |
| /signup               | POST   | body: name, email, password                          |
| /signin               | POST   | body: email, password                                |
| /articles             | POST   | body: title, content headers: token                  |
| /articles             | GET    | return all articles                                  |
| /articles/:id         | GET    | return specific articles                             |
| /articles             | PUT    | body: articleId, title, content headers: token       |
| /articles             | DELETE | body: articleId, headers: token                      |
