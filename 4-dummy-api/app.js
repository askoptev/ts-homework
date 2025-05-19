/**
  Основные темы:
    Понимание Types и интерфейсов: Начнем с общего понимания, как пишутся и работают типы с помощью TypeScript.
    Запросы к сторонним API: Обучимся делать запросы к внешним API для получения данных.
    Типизация ответов от API: Научимся типизировать получаемые ответы для повышения безопасности и удобства работы с данными.
    Обработка ошибок: Сфокусируемся на методах обработки возможных ошибок при запросах.

  Практическое задание:
    Инструменты для запросов: Используем библиотеки, например, Axios, для выполнения запросов к API.
    Пример API для практики: В качестве практики выполним запрос к https://dummyjson.com/users для изучения
    структуры данных пользователей и их типизацию.
    Типизация данных: Переходим к детальной типизации объектов, включая использование Enum для описания данных,
    таких как пол пользователя или его электронная почта.
    Ручная типизация vs автоматическая: Рекомендуется вручную создавать типы на основе данных JSON, без использования
    сторонних утилит для преобразования JSON в TypeScript, чтобы лучше понять процесс типизации.
    Обработка ошибок: Уделяем внимание правильной обработке ошибок, которые могут возникать при запросах.
 */
import axios from "axios";
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
})(Gender || (Gender = {}));
var Roles;
(function (Roles) {
    Roles["Admin"] = "admin";
    Roles["Editor"] = "editor";
    Roles["Moderator"] = "moderator";
    Roles["User"] = "user";
    Roles["Guest"] = "guest";
    Roles["Viewer"] = "viewer";
    Roles["Manager"] = "manager";
    Roles["Owner"] = "owner";
    Roles["Developer"] = "developer";
    Roles["Support"] = "support";
})(Roles || (Roles = {}));
const url = "https://dummyjson.com/users";
/**
 * Выполняет запрос на сервер, получает массив пользователей
 * @param url адрес запроса: https://dummyjson.com/users
 * @returns Возвращает промис с массивом пользователей или ошибку
 */
async function getUsers(url) {
    try {
        const { data } = await axios(url);
        return data.users;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Неизвестная ошибка");
        }
    }
}
/**
 * Собирает имена пользователей в массив
 * @param users массив объектов пользоватлей
 * @returns возвращает массив имен пользователей
 */
async function readUsersName(users) {
    const usersName = users.map((user) => user.firstName);
    return usersName;
}
/**
 * Type Guard - проверяет тип на соответствие User[]
 * @param users
 * @returns true если User[]
 */
function isUser(users) {
    if (Array.isArray(users) && users.length && users[0].firstName) {
        return true;
    }
    else {
        return false;
    }
    ;
}
/**
 * Выводит имена пользователей в консоль
 * @param url адрес запроса: https://dummyjson.com/users
 */
async function main(url) {
    const users = await getUsers(url);
    if (isUser(users)) {
        users.forEach(user => console.log(user.firstName));
    }
}
main(url);
