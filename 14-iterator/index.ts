/*
  Основная Задача:
  Цель: 
    Реализовать улучшенную версию поведенческого паттерн итератор.
  Контекст: 
    Мы уже работали с этим паттерном, и теперь на основе предыдущего опыта разрабатываем его дальше.
  Задание: 
    Создать итератор для массивов объектов, которые содержат идентификатор, дату и заголовок (title).
  Ключевые Требования к Итератору:
    Гибкость Обхода: Итератор должен уметь обходить массив объектов как по идентификатору, так и по дате.
    Обход по идентификатору (пример: от меньшего к большему или наоборот).
    Обход по дате (возможен как по возрастанию, так и по убыванию).
    Настройка Обхода: Предусмотреть возможность выбора направления обхода:
    По идентификатору: например, от наибольшего к наименьшему.
    По дате: от наиболее ранней к наиболее поздней или наоборот.
  Инструкция по Реализации:
    Анализ и Подготовка: Изучите предыдущую реализацию итератора, 
    определите возможности для улучшения или необходимость написания нового с нуля.
  Разработка Итератора:
    Создайте структуру объекта с полями: идентификатор, дата и заголовок.
    Разработайте механизм переключения между режимами обхода (о идентификатору/дате) и направлениями обхода в каждом из режимов.
*/

interface Item {
  id: number;
  date: Date;
  title: string;
}

enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

class DataList {
  private _data: Item[] = [];

  push(item: Item) {
    this._data.push(item);
  }

  get data() {
    return this._data;
  }

  sortById(direction: SortDirection) {
    switch (direction) {
      case SortDirection.Asc:
        return this._data.sort((a, b) => a.id - b.id);
      case SortDirection.Desc:
        return this._data.sort((a, b) => b.id - a.id);
    }
  }

  sortByDate(direction: SortDirection) {
    switch (direction) {
      case SortDirection.Asc:
        return this._data.sort((a, b) => a.date.getTime() - b.date.getTime());
      case SortDirection.Desc:
        return this._data.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  }

  getIterator(iterator: IteratorBase) {
    return iterator;
  }
}

class IteratorBase {
  protected currentIndex: number = 0;
  protected data: Item[] = [];

  current(): Item | undefined {
    return this.data[this.currentIndex];
  }

  next(): Item | undefined {
    this.currentIndex += 1;
    return this.data[this.currentIndex];
  }

  prev(): Item | undefined {
    this.currentIndex -= 1;
    return this.data[this.currentIndex];
  }

  index(): number {
    return this.currentIndex;
  }
}

class IteratorById extends IteratorBase {
  constructor(dataList: DataList, direction: SortDirection) {
    super();
    this.data = dataList.sortById(direction);
  }
}

class IteratorByDate extends IteratorBase {
  constructor(dataList: DataList, direction: SortDirection) {
    super();
    this.data = dataList.sortByDate(direction);
  }
}

const data = new DataList();
for (let id = 1; id <= 9; id++) {
  data.push({ id, date: new Date(`202${id}-06-07`), title: 'item' });
}

const iteratorById = data.getIterator(new IteratorById(data, SortDirection.Asc));
console.log(iteratorById.current());
for (let item = 1; item < 9; item++) {  
  const res = iteratorById.next();
  console.log(res);
}

const iteratorByDate = data.getIterator(new IteratorByDate(data, SortDirection.Desc));
console.log(iteratorByDate.current());
for (let item = 1; item < 9; item++) {
  const res = iteratorByDate.next();
  console.log(res);
}
