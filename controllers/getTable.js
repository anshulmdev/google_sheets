import { excelConverter } from "./excelConverter";


export const demoPayload = async (myTable, fileName, view) => {
    try {
        if (!myTable) throw new Error("Table not Selected to Query")
        const queryResult = view.selectRecords();
        await queryResult.loadDataAsync();

        const viewMetadata = view.selectMetadata();
        await viewMetadata.loadDataAsync();
        const tableRecords = queryResult;
        const tableFields = viewMetadata.visibleFields;

        await excelConverter(fileName, tableFields, tableRecords);

        return true;

    } catch (error) {
        console.log(error)
        return;
    }
}