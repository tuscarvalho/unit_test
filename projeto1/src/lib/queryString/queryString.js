const keyValueToString = ([key, value]) => {
    if(typeof value === 'object' && !Array.isArray(value)) {
        throw new Error('error');
    };
    return `${key}=${value}`
};

const queryString = obj =>  
    Object.entries(obj).map(keyValueToString).join('&');

const parse = obj => {
    const str = obj.split('&');
    return Object.fromEntries(str.map(item => {
        let [key, value] = item.split("=");
        if(value.indexOf(',') > -1) value = value.split(',');
        return [key, value];
    }));
};

export {
    queryString,
    parse
}