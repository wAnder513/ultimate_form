import Typography from '@material-ui/core/Typography'
import React from 'react'
import { MainContainer } from './components/MainContainer'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from './components/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useData } from './DataContext'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name shoud not contain numbers')
    .required('First name is a required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name shoud not contain numbers')
    .required('Last name is a required field'),
})

export const Step1 = () => {
  const history = useHistory()
  const { data, setValues } = useData()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    history.push('/step2')
    setValues(data)
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName')}
          id="firstName"
          type="text"
          label="First Name"
          name="firstName"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          {...register('lastName')}
          id="lastName"
          type="text"
          label="First Name"
          name="lastName"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  )
}
