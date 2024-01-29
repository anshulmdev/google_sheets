import writeXlsxFile from 'write-excel-file';
import { globalConfig } from '@airtable/blocks';


const mainConverter = async (fileName, schema, dataObject, setProgress) => {
    // await writeXlsxFile(dataObject, { schema, fileName: `${fileName}.xlsx`})
    setProgress(0.5)

    return;
}

export const excelConverter = async (fileName, tableFields, tableRecords, setProgress) => {
    try {
        setProgress(0.1);
        let fields = {}
        tableFields.forEach((e) => {fields[e._id] = { name: e.name, type: e.type }})

        let records = [];
        tableRecords.records.forEach(element => {
            records.push(element._data.cellValuesByFieldId)
        });
        const schema = []
        const objects = []
        const checkType = (type) => {
            switch(type) {
                case "createdTime": return Date ;
                case "checkbox": return Boolean;
                default: return String ;
            }
        }

        const checkValue = (item, type, name) => {
            switch(item) {
                case type === "checkbox": return item[name]
                default: return String(item[name])
            }
        }

        Object.values(fields).forEach((e) => { 
            let row = {column: e.name, type: checkType(e.type), value: item => checkValue(item, e.type, e.name)};
            if ( row.type === Date ) row['format'] = 'mm/dd/yyyy';
            schema.push(row)
        
        })
        console.log(records)
        setProgress(0.2)
        records.forEach((record) => {
            let recordTemp = {};
            Object.keys(record).forEach((key) => {
                if (fields[key]) recordTemp[String(fields[key].name)] = record[key]
            })
            objects.push(recordTemp)
        })

        console.log("schema", schema);
        console.log("objects", objects)
        setProgress(0.3)
        await mainConverter(fileName, schema, objects, setProgress)





        return;
        
    } catch (error) {
        console.log(error);
        return error
    }

}