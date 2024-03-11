export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('et-EE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};