export const columns = [
    {
        name: "Номер",
        selector: row => row.title,
        sortable: true
    },
    {
        name: "Дата",
        selector: row => new Date(row.createdAtUtc).toLocaleString(),
        sortable: true
    },
    {
        name: "Статус",
        selector: row => row.supplyState === 1 ? "Отримано" : "Оброблено",
        sortable: true
    },
];

export const conditionalRowStyles = [
    {
        when: row => row.supplyState === 1,
        style: {
            backgroundColor: 'rgba(248, 148, 6, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => row.supplyState === 2,
        style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
];
