export const columns = [
    {
        name: "ПІБ",
        selector: row => row.title,
        sortable: true
    },
    {
        name: "Посада",
        selector: row => row.role,
        sortable: true
    },
    {
        name: "Дата реєстрації",
        selector: row => new Date(row.created).toLocaleString(),
        sortable: true
    },
];
