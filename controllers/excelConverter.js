
const excel = require('excel4node');
const workbook = new excel.Workbook();

export const excelConverter = (tableName, tableFields, tableRecords) => {


    try {
        const worksheet = workbook.addWorksheet(tableName);
        
    } catch (error) {
        console.log(error);
        return error
    }

}