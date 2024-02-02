
import { base, globalConfig } from '@airtable/blocks';
import secrets from '../secrets.json';
const url = secrets.REACT_APP_FUNCTIONURL;

const getData = async (id) => {
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

const createNewUser = async (id, name, email) => {
    let credits = 10000;
    await globalConfig.setAsync('credits', credits);
    const data = {
        "operation": "create",
        "payload": {
            "TableName": "airtable-excel",
            "Item" :{ id, name, email, credits}
        }
      }
      const request = await fetch(url, {
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify(data)
    })
    return request;
}


export const setGlobalVariables = async () => {
    try {
        const collaborator = base.activeCollaborators[0];
        const { id, email, name } = collaborator;
    
    
        const userInfo = await getData(id);
        if (userInfo.id) await globalConfig.setAsync('credits', userInfo.credits);
        else await createNewUser(id, name, email)
        const getInfo = await getData(id);
        return true;

    } catch(error) {
        return true;
    }
    
}


export const reduceCredits = async (creditsToReduce, setProgress) => {
        const collaborator = base.activeCollaborators[0];
        const { id } = collaborator;
        const userInfo = await getData(id);
        const { email, name, credits } = userInfo;
        let NewCredits = credits - creditsToReduce;
        await setProgress(0.4);
        if (NewCredits < 0) throw new Error ("You don't have suffiecient credits for this operation. Please contact to upgrade")
        const data = {
            "operation": "create",
            "payload": {
                "TableName": "airtable-excel",
                "Item" :{ id, name, email, credits: NewCredits}
            }
          }
          const request = await fetch(url, {
            method: "POST",
            mode: 'no-cors',
            body: JSON.stringify(data)
        })
        await setProgress(0.5);
        await setGlobalVariables();
        await setProgress(0.6);
        return true;


}