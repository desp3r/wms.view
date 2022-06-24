import {Role} from "../../app/helpers/role";

export const columns = [
    {
        name: "ПІБ",
        selector: row => row.title,
        sortable: true
    },
    {
        name: "Посада",
        selector: row => row.role === Role.Admin ? "Aдміністратор" : (row.role === Role.Manager ? "Менеджер" : "Вантажник"),
        sortable: true
    },
    {
        name: "Дата реєстрації",
        selector: row => new Date(row.created).toLocaleString(),
        sortable: true
    },
];
