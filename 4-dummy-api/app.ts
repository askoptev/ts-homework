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

import axios, { AxiosResponse } from "axios";

interface ResponseUsers {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

enum Gender {
  Female = "female",
  Male = "male",
}

interface Hair {
  color: string;
  type: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

type Currency =
  | "CHY"
  | "USD"
  | "EUR"
  | "JPY"
  | "GBP"
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "HKD"
  | "NZD"
  | "SEK"
  | "KRW"
  | "SGD"
  | "NOK"
  | "MXN"
  | "INR"
  | "RUB"
  | "ZAR"
  | "BRL"
  | "TRY";

type Stetes =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

type StatesFullName =
  | "Alabama"
  | "Alaska"
  | "Arizona"
  | "Arkansas"
  | "California"
  | "Colorado"
  | "Connecticut"
  | "Delaware"
  | "Florida"
  | "Georgia"
  | "Hawaii"
  | "Idaho"
  | "Illinois"
  | "Indiana"
  | "Iowa"
  | "Kansas"
  | "Kentucky"
  | "Louisiana"
  | "Maine"
  | "Maryland"
  | "Massachusetts"
  | "Michigan"
  | "Minnesota"
  | "Mississippi"
  | "Missouri"
  | "Montana"
  | "Nebraska"
  | "Nevada"
  | "New Hampshire"
  | "New Jersey"
  | "New Mexico"
  | "New York"
  | "North Carolina"
  | "North Dakota"
  | "Ohio"
  | "Oklahoma"
  | "Oregon"
  | "Pennsylvania"
  | "Rhode Island"
  | "South Carolina"
  | "South Dakota"
  | "Tennessee"
  | "Texas"
  | "Utah"
  | "Vermont"
  | "Virginia"
  | "Washington"
  | "West Virginia"
  | "Wisconsin"
  | "Wyoming";

type CryptoCoins =
  | "Bitcoin"
  | "Ethereum"
  | "Tether"
  | "BNB"
  | "Solana"
  | "XRP"
  | "USDC"
  | "Cardano"
  | "Dogecoin"
  | "Toncoin"
  | "Shiba Inu"
  | "Avalanche"
  | "Polkadot"
  | "TRON"
  | "Chainlink"
  | "Polygon"
  | "Litecoin"
  | "Bitcoin Cash"
  | "Stellar"
  | "Internet Computer";

type BlockChainNetworks =
  | "Ethereum (ERC20)"
  | "BNB Smart Chain (BEP20)"
  | "Tron (TRC20)"
  | "Polygon (MATIC)"
  | "Solana (SOL)"
  | "Bitcoin (BTC)"
  | "Litecoin (LTC)"
  | "Avalanche (AVAX C-Chain)"
  | "Arbitrum (ARB)"
  | "Optimism (OP)"
  | "Fantom (FTM)"
  | "Toncoin (TON)";

enum Roles {
  Admin = "admin",
  Editor = "editor",
  Moderator = "moderator",
  User = "user",
  Guest = "guest",
  Viewer = "viewer",
  Manager = "manager",
  Owner = "owner",
  Developer = "developer",
  Support = "support",
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: Currency;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: {
    address: string;
    city: string;
    state: StatesFullName;
    stateCode: Stetes;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
  };
}

interface Crypto {
  coin: CryptoCoins;
  wallet: string;
  network: BlockChainNetworks;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: Roles;
}

const url: string = "https://dummyjson.com/users";

/**
 * Выполняет запрос на сервер, получает массив пользователей
 * @param url адрес запроса: https://dummyjson.com/users
 * @returns Возвращает промис с массивом пользователей или ошибку
 */
async function getUsers(url: string): Promise<User[] | Error> {
  try {
    const { data } = await axios<ResponseUsers>(url);
    return data.users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Неизвестная ошибка");
    }
  }
}

/**
 * Собирает имена пользователей в массив
 * @param users массив объектов пользоватлей
 * @returns возвращает массив имен пользователей
 */
async function readUsersName(users: User[]): Promise<string[]> {
  const usersName: string[] = users.map((user) => user.firstName);
  return usersName;
}

/**
 * Type Guard - проверяет тип на соответствие User[]
 * @param users 
 * @returns true если User[]
 */
function isUser(users: User[] | Error): users is User[]  {
  if (Array.isArray(users) && users.length && users[0].firstName ) {
    return true;
  } else {
    return false;
  };
}

/**
 * Выводит имена пользователей в консоль
 * @param url адрес запроса: https://dummyjson.com/users
 */
async function main(url: string): Promise<void> {
  const users: User[] | Error = await getUsers(url);
  if (isUser(users)) {
    users.forEach(user => console.log(user.firstName))
  }
}

main(url);
