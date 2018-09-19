### List of routes:

| Route                 |  HTTP  | Desription                                           |
| --------------------- |:------:| ---------------------------------------------------- |
| /signup               | POST   | body: name, email, password                          |
| /signin               | POST   | body: email, password                                |
| /articles             | POST   | body: title, content. headers: token                 |
| /articles             | GET    | return all articles                                  |
| /articles/:id         | GET    | return specific article and comments                 |
| /articles             | PUT    | body: articleId, title, content. headers: token      |
| /comment              | GET    | BELOM                                                |
| /comment              | POST   | body: commentId, content. headers: token             |
| /comment              | DELETE | body: commentId. headers: token                      |