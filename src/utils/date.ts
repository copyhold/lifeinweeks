String.prototype.parseDate = function(format) {
    const parsed = new Date();
    const formats = 'yyyy|dd|mm'.split('|');
    formats.forEach(f => {
        const index = format.indexOf(f);
        if (index < 0) return;
        const value = this.slice(index, index + f.length);
        const _ = {
            yyyy: () => parsed.setFullYear(value),
            dd: () => parsed.setDate(value),
            mm: () => parsed.setMonth(value - 1)
        }[f]();
    });

    return parsed;
}
Date.prototype.format = function (format) {
    return format.replace(/(yyyy|dd|mm)/gi, e => {
        switch (e) {
            case 'yyyy': return this.getFullYear();
            case 'dd': return ('0' + this.getDate()).slice(-2);
            case 'mm': return ('0' + (this.getMonth() + 1)).slice(-2);
            default: return e;
        }
    });
}