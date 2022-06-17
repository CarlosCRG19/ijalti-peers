const months = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre"
}

//For dates of format: YYYY-MM-DDThh:mm:ss.msX
const parseDateYYYYMMDD = (date) => {
    const year = date.slice(0, 4);
    const month = months[parseInt(date.slice(5, 7))];
    const day = date.slice(8, 10);
    return `${day} de ${month} de ${year}`;
}

export default parseDateYYYYMMDD;