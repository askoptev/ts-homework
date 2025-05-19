/* 
Цель задания:
  Создать свою реализацию класса мап, имитируя поведение стандартной хэш-мапы.
Основные требования:
Реализация основных методов:
  Добавление пары ключ-значение.
  Удаление пары ключ-значение.
  Получение значения по ключу.
  Очистка всей структуры данных.
Структура хранения:
  Использование бакетов для разделения данных по хэш-суммам ключей.
  При совпадении хэш-сумм разных ключей, организовать хранение в виде 
  цепочек элементов внутри бакета.
Как работает хэш-мапа:
  Ключи и значения: мапа хранит пары ключ-значение и позволяет быстро 
    выполнять операции добавления, удаления и поиска.
  Хэширование: преобразование ключей в уникальные хэш-суммы для 
    определения места хранения в бакетах.
Обработка коллизий: в случае совпадения хэш-сумм разных ключей, 
  данные сохраняются в виде связного списка внутри одного бакета.
Задача:
  Реализовать класс Map, который повторяет логику работы хэш-мапы.
  Включить в класс методы для добавления, удаления, получения, и очистки данных.
  Применить механизм хэш-функций и бакетов для оптимального распределения данных.
Пример использования:
  class Map {
    constructor() {
      // Инициализация структуры
    }
    // Методы для работы с данными...
  }

  // Пример добавления данных
  let weatherMap = new Map();
  weatherMap.add('London', 20);
  weatherMap.add('Berlin', 25);
  // Пример получения данных
  console.log(weatherMap.get('London')); // Выведет 20

В завершение:
  Учти, что реализация не претендует на производительность встроенных решений, 
  но является отличной практикой работы с классами и внутренней логикой хэш-мап.
*/

interface ElementBaket {
  key: any;
  value: any;
}

type Baket = ElementBaket[];

class CustomMap {
  private data: { [key: number]: Baket } = {};
    
  constructor();
  constructor(key: any, value: any);
  constructor(entries: [any, any][]);
  constructor(...args: [] | [any, any] | [[any, any][]]) {    
    if (args.length === 0) return;
    if (args.length === 2 && !Array.isArray(args[0])) {
      const [key, value] = args;
      this.set(key, value);
    }
    else if (args.length === 1 && Array.isArray(args[0])) {
      const entries = args[0];
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    } 
  }

  private hash(name: any): number {
    let inputArray: any[] = [];
    if (typeof name === "string") {
      inputArray = name.split("");
    } else if (typeof name === "number") {
      inputArray = name.toString().split("");
    } else if (typeof name === "object" && name !== null) {
      inputArray = Object.keys(name);
    } else if (Array.isArray(name)) {
      inputArray = name;
    } else if (typeof name === "boolean") {
      inputArray = name ? [1, 1, 1] : [0, 0, 0];
    } else {
      inputArray = [5, 5, 5];
    }
    return inputArray.reduce((hash, char) => hash + char.charCodeAt(0), 0);
  }

  set(key: any, value: any): CustomMap {
    const hashKey: number = this.hash(key);
    const baket = this.data[hashKey];
    if (!baket) {
      this.data[hashKey] = [{ key: key, value: value }];
      return this;
    }
    for (const item of baket) {
      if (item.key === key) {
        item.value = value;
        return this;
      }
    }
    baket.push({ key: key, value: value });
    return this;
  }

  get(key: any): any {
    const hashKey: number = this.hash(key);
    const baket = this.data[hashKey];
    if (!baket) {
      return undefined;
    }
    for (const item of baket) {
      if (item.key === key) {
        return item.value;
      }
    }
    return undefined;
  }

  delete(key: any): boolean {
    const hashKey: number = this.hash(key);
    let baket = this.data[hashKey];
    if (!baket) {
      return false;
    }
    if (baket.length === 1 && baket[0].key === key) {
      delete this.data[hashKey];
      return true;
    }
    if (baket.filter((e) => e.key === key).length > 0) {
      this.data[hashKey] = baket.filter((e) => e.key !== key);
      return true;
    } else {
      return false;
    }
  }

  clear(): void {
    this.data = {};
  }
}

const keyArray = [1, 2, 3, 4];
const keyObject = { 1: 1, 2: 2 };
const entries = Object.entries(keyObject);

console.log("entries +++++++++++++");
const entriesMap = new CustomMap(entries);
console.log(entriesMap.get('1'));

console.log("keys +++++++++++++");
const keysMap = new CustomMap("west", "north");
console.log(keysMap.get("west"));

console.log("empty +++++++++++++");
const map = new CustomMap();
map.set(100, "сто").set(120, "сто двадцать").set(keyArray, "двести").set(keyObject, "четыреста");

console.log(map.get(100));
console.log(map.get(keyArray));
console.log(map.get(keyObject));

console.log(map.delete(120));
console.log(map.delete(220));
console.log(map.delete(keyObject));

map.clear();

console.log(map.get(100));
console.log(map.get(120));
console.log(map.get(keyArray));
console.log(map.get(keyObject));
