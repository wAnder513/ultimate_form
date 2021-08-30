import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { MainContainer } from './components/MainContainer'
import { PrimaryButton } from './components/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useData } from './DataContext'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email shold have correct format')
    .required('Email is a required field'),
})

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value)
  if (!phoneNumber) {
    return value
  }

  return phoneNumber.formatInternational()
}

export const Step2 = () => {
  const { data, setValues } = useData()
  const history = useHistory()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const hasPhone = watch('hasPhone')

  const onSubmit = (data) => {
    history.push('/step3')
    setValues(data)
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          id="email"
          type="email"
          label="Email"
          name="email"
          reauired
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              color="primary"
              {...register('hasPhone')}
              name="hasPhone"
            />
          }
          label="Do you have a phone"
        />

        {hasPhone && (
          <Input
            {...register('phoneNumber')}
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            label="Phone number"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value)
            }}
          />
        )}

        <PrimaryButton>next</PrimaryButton>
      </Form>
    </MainContainer>
  )
}
