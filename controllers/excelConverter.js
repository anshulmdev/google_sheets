import writeXlsxFile from 'write-excel-file';
import { globalConfig } from '@airtable/blocks';
import { reduceCredits } from "../controllers/globalConfig";


const mainConverter = async (fileName, schema, dataObject, setProgress) => {
    await setProgress(0.8)
    await writeXlsxFile(dataObject, { schema, fileName: `${fileName}.xlsx`})
    await setProgress(1.0)
    return true;
}

export const excelConverter = async (fileName, tableFields, tableRecords, setProgress, credits) => {
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
                case "number": return Number;
                case "currency": return Number;
                case "percent": return Number;
                default: return String ;
            }
        }

        const checkValue = (item, type, name) => {
            switch(item) {
                case type === "string": return String(item[name])
                default: return item[name]
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
        await setProgress(0.3);
        const creditReduction = await reduceCredits(credits, setProgress);
        await setProgress(0.7);
        if (creditReduction) await mainConverter(fileName, schema, objects, setProgress);
        else throw new error(creditReduction);
        await setProgress(0.0)
        return true;
        
   
}