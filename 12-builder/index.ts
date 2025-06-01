/**
  Паттерн Билдер:
  Это порождающий паттерн, часто встречающийся при разработке.
  Назначение: Упрощение создания сложных объектов.
  Домашнее Задание:
  Разработать генератор запросов, используя паттерн билдер.
  Задача: Создать класс для генерации и управления запросами с читаемым и простым интерфейсом.
  Функциональность Генератора Запросов:
  Конструкция запроса с помощью методов: добавить тип, боди, заголовки, указать URL и т.д.
  Пример использования: .тип().боди().заголовок().
  Важно: В конце должен быть метод exec, исполняющий запрос.
 */

enum MethodRequest {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
  Head = 'HEAD',
  Options = 'OPTIONS',
}

class FetchBuilder {
  private init: RequestInit = {};
  private url: string = '';

  method(type: MethodRequest) {
    if (type) {
      this.init.method = type;
    }
    return this;
  }

  headers(key: string, value: string): FetchBuilder;
  headers(arg: Record<string, string>): FetchBuilder;
  headers(arg: [string, string][]): FetchBuilder;
  headers(keyOrArg: string | Record<string, string> | [string, string][], value?: string): FetchBuilder {
    if (typeof keyOrArg === 'string' && typeof value === 'string') {
      if (!this.init.headers) {
        this.init.headers = {};
        this.init.headers[keyOrArg] = value;
      } else {
        (this.init.headers as Record<string, string>)[keyOrArg] = value;
      }
    } else if (typeof keyOrArg === 'object' && keyOrArg !== null) {
      this.init.headers = structuredClone(keyOrArg);
    } else if (Array.isArray(keyOrArg)) {
      this.init.headers = structuredClone(keyOrArg);
    }
    return this;
  }

  body(key: string, value: string): FetchBuilder;
  body(arg: Record<string, string>): FetchBuilder;
  body(keyOrArg: string | Record<string, string>, value?: string): FetchBuilder {
    if (typeof keyOrArg === 'string' && typeof value === 'string') {
      const obj: Record<string, string> = {};
      obj[keyOrArg] = value;
      if (!this.init.body) {
        this.init.body = JSON.stringify(obj);
      } else {
        try {
          const body = JSON.parse(this.init.body as string);
          body[keyOrArg] = value;
          this.init.body = JSON.stringify(body);
        } catch (e) {
          this.init.body = JSON.stringify(obj);
        }
      }
    } else if (typeof keyOrArg === 'object' && keyOrArg !== null) {
      this.init.body = JSON.stringify(structuredClone(keyOrArg));
    }
    return this;
  }

  input(url: string) {
    if (!url) {
      return this;
    }
    this.url = url.toString();
    return this;
  }

  async exec(): Promise<Response> {
    const response = await fetch(this.url, this.init);
    console.log(this);
    return response;
  }
}

const fetchCustom = new FetchBuilder();
fetchCustom
  .method(MethodRequest.Post)

  .headers('auth', '123')
  .headers('name', 'testUser')
  .headers({ auth: '123', name: 'testUser' })
  .headers([
    ['auth', '123'],
    ['name', 'testUser'],
  ])

  .body('testKey', 'dataKey')
  .body({ auth: '123', name: 'testUser' })

  .input('https://google.com')
  .exec();
