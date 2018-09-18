### List of routes:

| Route                 |  HTTP  | Desription                                           |
| --------------------- |:------:| ---------------------------------------------------- |
| /signup               | POST   | body: name, email, password                          |
| /signin               | POST   | body: email, password                                |
| /articles             | POST   | body: title, description headers: token              |
| /articles             | GET    | return all articles                                  |
| /articles             | PUT    | body: articleId, title, description headers: token   |
| /articles             | DELETE | body: articleId, headers: token                      |
