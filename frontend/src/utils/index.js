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

export const commonFollowers = (user1, user2) => {
    console.log(user1);
    console.log(user2);
    const followers1 = user1.followers;
    const followers2 = user2.followers;
    let commonFollowers = 0;
    for (let i = 0; i < followers1.length; i++) {
        if (followers2.includes(followers1[i])) {
            commonFollowers++;
        }
    }
    return commonFollowers;
};

export const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }

    return array;
};
