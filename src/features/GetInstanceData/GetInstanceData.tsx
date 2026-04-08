import { Button } from '../../components/Button';
import { useGreenApi } from '../../hooks/useGreenApi';

export const GetInstanceData = () => {
    const {sendAction} = useGreenApi();

    const handleGetSettingsClick = async () => {
      await sendAction('getSettings');
    }

    const handleGetStateInstanceClick = async () => {
      await sendAction('getStateInstance');
    }

    return (
        <>
            <Button onClick={handleGetSettingsClick}>getSettings</Button>
            <Button onClick={handleGetStateInstanceClick}>getStateInstance</Button>
        </>
    );
};
