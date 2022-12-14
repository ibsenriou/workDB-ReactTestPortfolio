// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ** Third Party Imports
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

// ** Mock Data & Type Imports
import { IUser } from '../../../mock/users';

// ** Form Validation Error Message
const ERROR_MESSAGE = 'Este campo é obrigatório!';

// ** Yup Schema
const schema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required(ERROR_MESSAGE),
  surname: yup.string().required(ERROR_MESSAGE),
  height: yup
    .number()
    .required(ERROR_MESSAGE)
    .typeError(ERROR_MESSAGE)
    .min(0.01, 'Este campo não pode ser menor que 0.01')
    .max(2.5, 'Este campo não pode ser maior que 2.50'),
  dateOfBirth: yup.string().required(ERROR_MESSAGE),
});

// ** Form Props Interface
interface FormProps {
  handleCreateUser: (user: IUser) => void;
}

const Form = ({ handleCreateUser }: FormProps) => {
  // State
  const [focus, setFocused] = useState(false);

  // Mui TextField Type Date/Text Input
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // Form Default Values
  const defaultValues = {
    id: '',
    name: '',
    surname: '',
    height: 0,
    dateOfBirth: '',
  };

  // Form
  const {
    setValue: setFormValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  useState(() => {
    setFormValue('id', uuidv4());
  });

  const handleReset = () => {
    reset();
    setFormValue('id', uuidv4());
  };

  const onSubmit = (data: IUser) => {
    handleCreateUser(data);
    handleReset();
  };

  return (
    <CardContent>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h5">Adicionar Usuário</Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item sm={3} xs={12}>
          <FormControl fullWidth>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Nome"
                  onChange={onChange}
                  placeholder="Jhon"
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item sm={3} xs={12}>
          <FormControl fullWidth>
            <Controller
              name="surname"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Sobrenome"
                  onChange={onChange}
                  placeholder="Doe"
                  error={Boolean(errors.surname)}
                />
              )}
            />
            {errors.surname && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.surname.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item sm={3} xs={12}>
          <FormControl fullWidth>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={value}
                  placeholder="01/01/1990"
                  type={value || focus ? 'date' : 'text'}
                  label="Data de Nascimento"
                  onChange={onChange}
                  error={Boolean(errors.dateOfBirth)}
                />
              )}
            />
            {errors.dateOfBirth && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.dateOfBirth.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item sm={3} xs={12}>
          <FormControl fullWidth>
            <Controller
              name="height"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="number"
                  value={value}
                  label="Altura"
                  onChange={onChange}
                  placeholder="1.80"
                  error={Boolean(errors.height)}
                />
              )}
            />
            {errors.height && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.height.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ mt: 1, mb: 2, display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ marginRight: 1 }}
            onClick={handleSubmit(onSubmit)}
          >
            Adicionar Novo Usuário
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleReset()}
          >
            Resetar
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ margin: 0 }} />
    </CardContent>
  );
};

export default Form;
