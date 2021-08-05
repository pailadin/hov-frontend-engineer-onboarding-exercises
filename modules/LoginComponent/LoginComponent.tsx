import { Center } from '@chakra-ui/react';
import { FormContainer, Item } from '@components/Form';
import { LOGIN as VALIDATION_SCHEMA } from '@constants/validation/user';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeUserData } from '@store/userSlice';
import { FC } from 'react';
import ForgotPassword from './ForgotPassword';

const LoginComponent: FC = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data: unknown): Promise<unknown> => {
    try {
      return await dispatch(getFakeUserData(data));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <Center>
      <FormContainer validationSchema={VALIDATION_SCHEMA} header="Log in" onSubmit={onSubmit}>
        <Item name="email" placeholder="email@example.com" />

        <Item name="password" placeholder="********" type="password" renderBelow={<ForgotPassword />} />
      </FormContainer>
    </Center>
  );
};

export default LoginComponent;
