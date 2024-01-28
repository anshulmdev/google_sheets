import { excelConverter } from "./excelConverter";


/*
const dataFormatting = (airtableTable) => {
    let formattedData = [];
    airtableTable.forEach((e) => {
        formattedData.push({
            id: e._id,
            data: e._data
        })
    })
    return formattedData
}
*/



export const demoPayload = async (myTable) => {
    try {
        if (!myTable) throw new Error("Table not Selected to Query")
        const tableID = myTable._id;
        const queryResult = myTable.selectRecords();
        await queryResult.loadDataAsync();
        const tableRecords = queryResult;
        const tableName = myTable.name;
        const tableFields = myTable.fields;

        await excelConverter(tableName, tableFields, tableRecords);

        return true;

    } catch (error) {
        console.log(error)
        return;
    }
}