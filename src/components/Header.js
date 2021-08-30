import Typography from '@material-ui/core/Typography'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((there) => ({
  root: {
    fontFamily: 'Permanent Marker',
    margin: there.spacing(3, 0, 2),
    textAlign: 'center',
    fontSize: '40px',
    color: 'deeppink',
    textShadow: '1px 1px darkmagenta',
  },
}))

export const Header = () => {
  const styles = useStyles()

  return (
    <Typography className={styles.root} component="h1" variant="h5">
      The Ultimate Form Challenge
    </Typography>
  )
}
