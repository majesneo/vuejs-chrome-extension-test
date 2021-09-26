export async function getData(url, method = 'GET') {
    try {
        const response = await fetch(url, {
            method: `${method}`
        });
        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

