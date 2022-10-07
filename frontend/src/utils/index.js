export const dateSorter = (data) => {
    const sortedData = data.sort((a, b) => {
        const dateA = a.createdAt.toUpperCase();
        const dateB = b.createdAt.toUpperCase();
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
    });
    return sortedData;
};
