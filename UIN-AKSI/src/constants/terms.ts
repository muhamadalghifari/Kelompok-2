export type Term = {
    id: string;
    title: string;
    description: string;
    category: string;
    // isPopular: boolean;
};

export const TERMS: Term[] = [
    {
        id: '1',
        title: 'SKS',
        description: 'Satuan Kredit Semester',
        category: 'Akademik',
        // isPopular: true,
    },
    {
        id: '2',
        title: 'KRS',
        description: 'Kartu Rencana Studi',
        category: 'Akademik',
        // isPopular: true,
    },
    {
        id: '3',
        title: 'IPK',
        description: 'Indeks Prestasi Kumulatif',
        category: 'Akademik',
        // isPopular: true,
    },
    {
        id: '4',
        title: 'BAAK',
        description: 'Biro Administrasi Akademik',
        category: 'Administrasi',
        // isPopular: false,
    },
];
