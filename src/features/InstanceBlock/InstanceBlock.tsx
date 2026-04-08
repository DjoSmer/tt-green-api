import { ChangeEventHandler, useEffect, useState } from 'react';
import { TextFiled } from '../../components/TextFiled';
import { useStore } from '../../hooks/useStore';
import { useSelector } from '../../hooks/useSelector';

const storageKey = {
    apiUrl: 'apiUrl',
    idInstance: 'idInstance',
    apiToken: 'apiToken',
};

export const InstanceBlock = () => {
    const { setApiUrl, setIdInstance, setApiToken } = useStore();
    const [, setUpdate] = useState(0);

    const apiUrl = useSelector('apiUrl');
    const idInstance = useSelector('idInstance');
    const apiToken = useSelector('apiToken');

    useEffect(() => {
        setApiUrl(localStorage.getItem(storageKey.apiUrl) || '');
        setIdInstance(localStorage.getItem(storageKey.idInstance) || '');
        setApiToken(localStorage.getItem(storageKey.apiToken) || '');
        setUpdate(1);
    }, []);

    const handleApiUrlChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        value = value.endsWith('/') ? value.slice(0, -1) : value;
        setApiUrl(value);
        localStorage.setItem(storageKey.apiUrl, value);
    };

    const handleIdInstanceChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setIdInstance(value);
        localStorage.setItem(storageKey.idInstance, value);
    };

    const handleApiTokenChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setApiToken(value);
        localStorage.setItem(storageKey.apiToken, value);
    };

    return (
        <>
            <label>Api Url</label>
            <TextFiled name='apiUrl' value={apiUrl} onChange={handleApiUrlChange} />

            <label>Id Instance</label>
            <TextFiled name='idInstance' value={idInstance} onChange={handleIdInstanceChange} />

            <label>Api Token</label>
            <TextFiled name='apiToken' type='password' value={apiToken} onChange={handleApiTokenChange} />
        </>
    );
};
