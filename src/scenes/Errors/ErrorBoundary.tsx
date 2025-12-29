import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { useNavigateHomePage } from '../../hooks/navigate'

export default function ErrorBoundary() {
  const error = useRouteError()
  const goHome = useNavigateHomePage()

  return (
    <Container sx={{ padding: '2rem' }}>

      {isRouteErrorResponse(error)
        ? (
            <Box>
              <Typography variant="h1">
                {error.status}
                {' '}
                -
                {' '}
                {error.statusText}
              </Typography>
              <Typography>{error.data?.message || 'Ein Fehler ist aufgetreten.'}</Typography>
            </Box>
          )
        : (
            <Box>
              <Typography variant="h1">Etwas ist schiefgelaufen.</Typography>
              <Typography>{(error as Error)?.message}</Typography>
            </Box>
          )}
      <Button
        sx={{ mt: '2rem' }}
        variant="contained"
        onClick={() => goHome()}
      >
        Zur Homepage
      </Button>
    </Container>
  )
}
