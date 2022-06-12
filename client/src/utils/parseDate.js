//For dates of format: YYYY-MM-DDThh:mm:ss.msX
const parseDateYYYYMMDD = (date) => {
    const year = date.slice(0,4);
    const month = getMonthName(date.slice(5,7));
    const day = date.slice(8,10);
    return `${day} de ${month} de ${year}`;
}

const getMonthName = (monthNumber) => {
    try {
        monthNumber = parseInt(monthNumber);
    } catch (error) {
        return "undefined"
    }
    switch (monthNumber) {
        case 1:
            return "Enero";
            break;
        case 2:
            return "Febrero";
            break;
        case 3:
            return "Marzo";
            break;
        case 4:
            return "Abril";
            break;
        case 5:
            return "Mayo";
            break;
        case 6:
            return "Junio";
            break;
        case 7:
            return "Julio";
            break;
        case 8:
            return "Agosto";
            break;
        case 9:
            return "Septiembre";
            break;
        case 10:
            return "Octubre";
            break;
        case 11:
            return "Noviembre";
            break;
        case 12:
            return "Diciembre";
            break;

        default:
            break;
    }
}
export default parseDateYYYYMMDD;