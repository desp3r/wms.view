export const columns = [
    {
        name: "Номер",
        selector: row => row.title,
        sortable: true
    },
    {
        name: "Кількість",
        selector: row => row.productCount > 0 ? row.productCount : "-",
        sortable: true
    },

];

export const conditionalRowStyles = [
    {
        when: row => row.productCount > 0 && (row.size - row.productCount) > (row.size / 2),
        style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => row.productCount > 0 && (row.size - row.productCount) < (row.size / 2),
        style: {
            backgroundColor: 'rgba(248, 148, 6, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => row.productCount > 0 && (row.size - row.productCount) < (row.size / 10),
        style: {
            backgroundColor: 'rgba(242, 38, 19, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'not-allowed',
            },
        },
    },
];
