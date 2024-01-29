import writeXlsxFile from 'write-excel-file'


const mainConverter = async (fileName, schema, dataObject) => {
    await writeXlsxFile(dataObject, { schema, fileName: `${fileName}-file.xlsx`})
    return
}

export const excelConverter = async (tableName, tableFields, tableRecords) => {
    try {
        tableFields = tableFields.map((e) => e = { name: e.name, type: e.type })
        let records;
        tableRecords.records.forEach(element => {
            records.push(element._data.cellValuesByFieldId)
        });
        const schema = []
        const checkType = (type) => {
            switch(type) {
                case "createdTime": return Date ;
                case "checkbox": return Boolean;
                default: return String ;
            }
        }
        tableFields.forEach((e) => { schema.push({column: e.name, type: checkType(e.type), value: 100})})
        console.log('Schema', schema)





        return;
        
    } catch (error) {
        console.log(error);
        return error
    }

}