/* 
  Основные понятия:
  Служебные типы: 
  Ключевой элемент для работы с типами данных в TypeScript, 
  включая, но не ограничиваясь Exclude, Pick и другими.

  Функция difference: 
  Пример функции, часто встречающейся в библиотеке Lodash, показывает, 
  как можно использовать служебные типы на практике.

  Практическое задание:
  Вы будете работать с функцией, выполняющей вычитание свойств 
  одного объекта из другого. Например, функция принимает два объекта: 
  А (со свойствами 5 и B) и В (пустой объект). В результате функция возвращает 
  свойства, которые есть в А, но отсутствуют в B.

  Пример:
  Даны объекты: А = {5, B} и В = {}.
  Результат: возвращается только B, так как B присутствует в А и отсутствует в B.
  Теоретическая часть:
  Объяснение работы интерфейсов AB и AC, и как из этого следует результат функции.
  Рассмотрение использования служебных типов, таких как Exclude и Pick, 
  для извлечения правильных частей объекта А, которые отсутствуют в объекте B.
  Домашнее задание:

  Используя полученные знания, выполнить задание с функцией difference 
  и различными служебными типами.
*/

interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

interface IDifference {
  b: string;
}

interface A0 {
  b: string;
}

function difference<T extends IA, P extends IB>(objA: T, objB: P): Pick<T, Exclude<keyof T, keyof P>> {
  const keys = Object.keys(objA) as Array<keyof T>;  
  return keys.reduce((acc, key) => {
    if (!(key in objB)) {
      const diffKey = key as Exclude<keyof T, keyof P>;
      acc[diffKey] = objA[diffKey];
    }
    return acc;
  }, {} as Pick<T, Exclude<keyof T, keyof P>>);
}

const a0: A0 = difference(a, b);
console.log(a0);

