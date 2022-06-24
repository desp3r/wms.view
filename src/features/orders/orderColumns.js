export const columns = [
    {
        name: "Дата замовлення",
        selector: row => new Date(row.createdAtUtc).toLocaleDateString(),
        sortable: true
    },
    {
        name: "Назва продукту",
        selector: row => row.productTitle,
        sortable: true
    },
    {
        name: "Кількість",
        selector: row => row.productCount,
        sortable: true
    },
    {
        name: "Статус",
        selector: row => row.orderState === 1 ? "Очікує" : "Відправлено",
        sortable: true
    },

];

export const conditionalRowStyles = [
    {
        when: row => row.orderState === 2,
        style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => row.orderState === 1,
        style: {
            backgroundColor: 'rgba(248, 148, 6, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
];