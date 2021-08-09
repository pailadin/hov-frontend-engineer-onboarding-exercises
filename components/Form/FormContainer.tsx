// Currently used by the Login and SignUp modules
// TODO Ask if this component should even be here, or combine those modules, or something else:
import { Box, Button, Center } from '@chakra-ui/react';
import { Container } from '@components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

interface Props {
  children: ReactNode;
  validationSchema: ObjectShape;
  header?: string;
  onSubmit: (data: Record<string, unknown>) => void;
  submitButtonText?: string;
  // Taken from here: https://stackoverflow.com/a/58201122
  // TODO Confirm if this is fine
  [x: string]: unknown;
}

const FormContainer: FC<Props> = ({ children, validationSchema, header, onSubmit, submitButtonText, ...rest }) => {
  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(yup.object().shape(validationSchema)),
  });

  const submitDisabled =
    formMethods.formState.isSubmitting || !formMethods.formState.isDirty || !formMethods.formState.isValid;

  return (
    <Center>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Container header={header} {...rest}>
            {children}

            <Box />

            <Button type="submit" colorScheme="purple" disabled={submitDisabled}>
              {submitButtonText || header || 'Submit'}
            </Button>
          </Container>
        </form>
      </FormProvider>
    </Center>
  );
};

export default FormContainer;
