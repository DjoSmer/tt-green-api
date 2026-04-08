import { useStore } from './useStore';

export const useGreenApi = () => {
    const {getStore, setLastResponseData} = useStore();

    const sendAction = async (action: string, data?: {}) => {
        const {apiUrl, idInstance, apiToken} = getStore();

        if (!apiUrl || !idInstance || !apiToken) {
            alert('Укажите Api Url, Id Instance, Api Token');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/waInstance${idInstance}/${action}/${apiToken}`, {
                method: data ? 'POST' : 'GET',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: data ? JSON.stringify(data) : null
            });
            if (!response.ok) {
                alert(response.statusText);
                return;
            }
            const responseData = await response.json();
            setLastResponseData(responseData);
        }
        catch (e) {
            alert('Error: ' + (e as Error).message);
        }
    }

    return {sendAction};
}
