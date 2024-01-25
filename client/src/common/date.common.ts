const formatDate = (date:string):string => {
    const result = date.split('T')[0];
    return result;
}

export default formatDate;