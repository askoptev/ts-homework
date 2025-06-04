/*
  Цель задания: 
  Разработать декоратор allowFunc для свойств класса, который будет контролировать 
  присваивание значений свойствам на основе предоставленной функции.

  Основные моменты:
  Что делает декоратор allowFunc?
  Декоратор принимает функцию, которая возвращает true или false. 
  Эта функция определяет, можно ли присвоить новое значение свойству класса.
  
  Пример: 
  Если функция проверяет, что значение больше нуля, то только такие 
  значения могут быть присвоены свойству.
*/

class User {
  @allowFunc((e: number) => e > 0)
  accessor age: number = 30;
}

function allowFunc(fn: (age: number) => boolean) {
  return function (
    original: { get: () => number; set: (v: number) => void }, 
    context: ClassAccessorDecoratorContext<User, number>
  ) {
    return {
      get() {
        const value = original.get.call(this);
        return value;
      },
      set(value: number) {
        if (fn(value)) {
          original.set.call(this, value);
        } else {
          console.log(`Значение: ${value} не соответствует требованиям`);
        }
      },
    };
  }
}

const user = new User();
console.log(user.age);
user.age = 50;       
console.log(user.age);
user.age = -50;
console.log(user.age);