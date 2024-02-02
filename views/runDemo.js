import React, { useState } from "react";
import { base } from '@airtable/blocks';
import { Tooltip, ProgressBar, Text, Icon, FormField, Input, Box, Heading, Button, Dialog } from "@airtable/blocks/ui";
import { demoPayload } from "../controllers/getTable";
import { TablePicker, ViewPicker } from "@airtable/blocks/ui";
import { globalConfig } from '@airtable/blocks';
import secrets from "../secrets.json";


export const GenerateBasicReport = () => {
    const [progress, setProgress] = useState(0.0);
    const [table, setTable] = useState(base.tables[0]);
    const [view, setView] = useState(table.views[0]);
    const [value, setValue] = useState(`${table.name}`);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rows, setRows] = useState(0);
    const [ErrorDialogOpen, setErrorDialogOpen] = useState(false);

    const viewRowCount = async (view) => {
        const queryResult = view.selectRecords();
        await queryResult.loadDataAsync();
        await setRows(queryResult.records.length);
        return;
    }
    viewRowCount(view);
    return (
        <div>
            <Box style={{ "borderColor": secrets.REACT_THEME_DARK_COLOR, borderRadius: 5 }} border="default">
                <Box marginTop={2} display="flex" justifyContent="flex-end" alignIt2ms="right">
                    <Text><b>{globalConfig.get('credits')}: Credits</b></Text>
                    <Tooltip
                        content="Credits to use Excel Exporter"
                        placementX={Tooltip.placements.CENTER}
                        placementY={Tooltip.placements.BOTTOM}
                        shouldHideTooltipOnClick={true}
                    >
                        <Icon marginX={2} name="help" size={16} />

                    </Tooltip>
                </Box>
                <Box paddingTop={3} display="flex">
                    <Text marginX={3} flex={1} justifyContent='flex-start'><b>Table</b></Text>
                    <Text marginX={3} flex={1} justifyContent='flex-end'><b>View</b></Text>
                </Box>
                <Box marginY={1} marginTop={2} display="flex">
                    <Text as={'p'} marginX={3} flex={1} justifyContent='flex-start'>Prepare excel as per selected Table</Text>
                    <Text marginX={3} flex={1} justifyContent='flex-end'>Generate filtered view and export it from here</Text>
                </Box>
                <Box display="flex">
                    <TablePicker flex={1} justifyContent='flex-start' marginX={3}
                        table={table}
                        onChange={newTable => { setTable(newTable); setView(newTable.views[0]); viewRowCount(newTable.views[0]) }}
                        width="320px"
                    />
                    <ViewPicker
                        flex={1} justifyContent='flex-start' marginX={3}
                        table={table}
                        view={view}
                        onChange={newView => { setView(newView); viewRowCount(newView) }}
                        width="320px"
                    />
                </Box>
                <Box display="flex" alignItems="center" padding={3} marginBottom={2}>
                    <FormField flex={4} justifyContent='flex-start' label="Enter FileName">
                        <Input value={value} onChange={e => setValue(e.target.value)} />
                    </FormField>
                    <Button
                        style={{
                            "backgroundColor": secrets.REACT_THEME_DARK_COLOR
                        }}
                        variant="primary" flex={1} marginLeft={1} marginTop={1} justifyContent='flex-start' onClick={() => setIsDialogOpen(true)} icon="premium">
                        Generate Excel Report
                    </Button>
                </Box>
                {isDialogOpen && (
                    <Dialog onClose={() => viewRowCount(view)} width="320px">
                        <Dialog.CloseButton />
                        <Heading>Confirm Operation</Heading>
                        <Text variant="paragraph">
                            You are about to use {rows} credits for {rows} rows in this operation. Would you like to proceed?
                        </Text>
                        <Box paddingTop={3} display="flex">
                            <Button style={{
                                "backgroundColor": secrets.REACT_THEME_DARK_COLOR
                            }} marginX={1} flex={1} justifyContent='flex-start' variant="primary" onClick={() => { setIsDialogOpen(false); demoPayload(table, value, view, setProgress, rows, setErrorDialogOpen) }}>Proceed</Button>
                            <Button marginX={1} flex={1} justifyContent='flex-start' onClick={() => setIsDialogOpen(false)}>Close</Button>

                        </Box>
                    </Dialog>
                )}
                {ErrorDialogOpen && (
                    <Dialog onClose={() => viewRowCount(view)} width="320px">
                        <Dialog.CloseButton />
                        <Heading>Error in Operation</Heading>
                        <Text variant="paragraph">
                            {ErrorDialogOpen}
                        </Text>
                        <Box paddingTop={3} display="flex">
                            <Button marginX={1} flex={1} justifyContent='flex-start' onClick={() => setErrorDialogOpen(false)}>Close</Button>
                        </Box>
                    </Dialog>
                )}
                <ProgressBar
                    progress={progress}
                    barColor={secrets.REACT_THEME_LIGHT_COLOR}
                />
            </Box>

        </div>
    )
}