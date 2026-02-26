import { Box, Button, Typography } from '@mui/material'

export default function StopWatch() {
  return (
	<>
		<Typography variant="h5" gutterBottom sx={{ marginRight: 'auto'}}>
			Stop Watch
		</Typography>
		<Box sx={{
			display: 'flex', 
			alignItems: 'center', 
			justifyContent: 'center', 
			width: '300px',
			height: '300px',
			borderRadius: '50%',
			backgroundColor: '#fff',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		}}>
			<Typography variant="h2" gutterBottom>
				00:00:00
			</Typography>
		</Box>
		<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: '1rem' }}>
			<Button variant="outlined" color="success" sx={{ marginTop: '1rem' }}>
				Start
			</Button>
			<Button variant="outlined" color="error" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
				Stop
			</Button>
			<Button variant="outlined" color="primary" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
				Pause
			</Button>
			<Button variant="outlined" color="info" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
				Lap
			</Button>
			<Button variant="outlined" color="secondary" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>	
				Reset
			</Button>
		</Box>

	</>
  )
}
