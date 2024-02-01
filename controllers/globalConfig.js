
import { base, globalConfig } from '@airtable/blocks';
import secrets from '../secrets.json';

const getData = async (url, id) => {
    const data = {
        "operation": "read",
        "payload": {
            "TableName": "airtable-excel",
            "Key": { id }
        }
    }
    const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    let response;
    try {
        response = await request.json();
        return response
    } catch (error) {
        console.log({error})
        return "ERROR"
    }

}

const createNewUser = async (url, id, name, email) => {
    let credits = 1000;
    let category = "Demo"
    await globalConfig.setAsync('credits', credits);
    const data = {
        "operation": "create",
        "payload": {
            "TableName": "airtable-excel",
            "Item" :{ id, name, email, credits, category}
        }
      }
      const request = await fetch(url, {
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify(data)
    })
    const response = await request.json();
    return response;
}


export const setGlobalVariables = async () => {
    try {
        const collaborator = base.activeCollaborators[0];
        const { id, email, name } = collaborator;
        const url = secrets.REACT_APP_FUNCTIONURL;
    
    
        const userInfo = await getData(url, id);
        if (userInfo.id) await globalConfig.setAsync('credits', userInfo.credits);
        else await createNewUser(url, id, name, email)
        const getInfo = await getData(url, id);
        console.log(getInfo);
        return true;

    } catch(error) {
        console.log(error)
        return true;
    }
    
}


export const reduceCredits = async (creditsToReduce) => {
    try {
        const collaborator = base.activeCollaborators[0];
        const url = secrets.REACT_APP_FUNCTIONURL;
        const userInfo = await getData(url, id);
        const { id, email, name, credits } = userInfo;
        let NewCredits = credits - creditsToReduce;
        const data = {
            "operation": "create",
            "payload": {
                "TableName": "airtable-excel",
                "Item" :{ id, name, email, credits: NewCredits}
            }
          }

    } catch (error) {
        console.log("Error")
        return "Unable to reduce credits"
    }

}