import { excelConverter } from "./excelConverter";


export const demoPayload = async (myTable, fileName, view, setProgress, credits, setErrorDialogOpen) => {
    try {
        if (!myTable) throw new Error("Table not Selected to Query")
        const queryResult = view.selectRecords();
        await queryResult.loadDataAsync();

        const viewMetadata = view.selectMetadata();
        await viewMetadata.loadDataAsync();
        const tableRecords = queryResult;
        const tableFields = viewMetadata.visibleFields;

        await excelConverter(fileName, tableFields, tableRecords, setProgress, credits);

        return true;

    } catch (error) {
        try {
            await setProgress(0.0);
            await setErrorDialogOpen(error.message);
        } catch(errorMessage_2) {
            console.log(errorMessage_2.message)
            await setErrorDialogOpen("Looks like we are offline or facing server issue. Please reload and try again!!!");

        }
        return;
    }
}