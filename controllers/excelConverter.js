import writeXlsxFile from 'write-excel-file';
import { globalConfig } from '@airtable/blocks';
import { reduceCredits } from "../controllers/globalConfig";


const mainConverter = async (fileName, schema, dataObject, setProgress) => {
    await setProgress(0.7)
    await writeXlsxFile(dataObject, { schema, fileName: `${fileName}.xlsx`})
    await setProgress(0.8)

    return;
}

export const excelConverter = async (fileName, tableFields, tableRecords, setProgress, credits) => {
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
                case "percent": return String;
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
            if ( row.type === Number ) row['format'] = '#,##0.00';
            schema.push(row)
        
        })
        setProgress(0.2)
        records.forEach((record) => {
            let recordTemp = {};
            Object.keys(record).forEach((key) => {
                if (fields[key]) {
                    if (record[key].name) recordTemp[String(fields[key].name)] = record[key].name
                    else recordTemp[String(fields[key].name)] = record[key]
                }
            })
            objects.push(recordTemp)
        })
        console.log(objects)
        await setProgress(0.3);
        await reduceCredits(credits);
        await setProgress(0.5);
        await mainConverter(fileName, schema, objects, setProgress);
        await setProgress(1.0)

        return;
        
    } catch (error) {
        await setProgress(0.0)
        console.log(error);
        return error
    }

}