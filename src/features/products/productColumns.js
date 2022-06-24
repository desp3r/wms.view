export const columns = [
    {
        name: "Назва",
        selector: row => row.title,
        sortable: true
    },
    {
        name: "Бренд",
        selector: row => row.brand,
        sortable: true
    },
    {
        name: "Категорія",
        selector: row => row.category,
        sortable: true
    },
    {
        name: "Ціна",
        selector: row => row.price,
        sortable: true
    },
];

