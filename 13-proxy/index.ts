/*
  Задание:
    Разработка класса Proxy.
    Использование класса API для отправки запросов на продукт.
    Опционально: Использование паттерна билдер из предыдущих заданий для формирования запроса.
    Детали отправки: запрос направляется на damage.json.product.1, который возвращает продукт 
    в зависимости от ID. При ID меньше 10 данные возвращаются успешно, при больших значениях - возвращается ошибка.
  Поведение Proxy:
    Проксирование запросов на Product1, фильтрация по ID (остановка запросов с ID больше 10).
  Реализация и проверка:
    После реализации, поместить код в папку 13 Proxy для ревью.
  Выводы:
    Паттерн Proxy позволяет эффективно управлять доступом к объектам, предоставляя дополнительный уровень абстракции.
    Важность паттерна в возможности контролировать и модифицировать доступ или запросы к определённым ресурсам.
    Выполнение данного задания позволит на практике освоить принципы работы со структурными 
    паттернами и глубже понять механизм Proxy.
  Заключение: 
    Реализация и понимание паттерна Proxy является ключевым навыком для разработчиков, 
    позволяя создавать более гибкие и безопасные приложения.
 */

import { FetchBuilder, MethodRequest } from './../12-builder/index.js';

const URL = 'https://dummyjson.com/products/'

class Api {
  private apiBuilder: FetchBuilder;
  constructor(private url: string) {
    this.apiBuilder = new FetchBuilder();
  }
  async get(id: number): Promise<Record<string, any>> {
    const response = await this.apiBuilder.method(MethodRequest.Get).input(`${this.url}${id}`).exec();
    return response.json();
  }
}


class Proxy {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }
  async get(id: number): Promise<Record<string, any>> {
    if (id < 10) {
      return this.api.get(id);
    }
    return Promise.reject({error: 'Данные не получены. Доступ ограничен'});
  }
}

const productProxyApi = new Proxy(new Api(URL));
const productProxySuccess = await productProxyApi.get(1);
const productProxyForbidden = await productProxyApi.get(10);
console.log(productProxySuccess);
console.log(productProxyForbidden);


