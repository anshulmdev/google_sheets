import { excelConverter } from "./excelConverter";


export const demoPayload = async (myTable, fileName, view) => {
    try {
        if (!myTable) throw new Error("Table not Selected to Query")
        console.log(view._id)
        const queryResult = myTable.selectRecords();
        await queryResult.loadDataAsync();

        const viewMetadata = view.selectMetadata();
        await viewMetadata.loadDataAsync();

        console.log(queryResult)
        console.log(viewMetadata)

        const tableRecords = queryResult;
        const tableFields = myTable.fields;

        await excelConverter(fileName, tableFields, tableRecords);

        return true;

    } catch (error) {
        console.log(error)
        return;
    }
}