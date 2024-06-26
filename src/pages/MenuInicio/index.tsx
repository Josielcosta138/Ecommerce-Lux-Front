import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BannerPage from '../../components/BannerOfertas';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(10);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (progress === 100) {
      const redirectTimer = setTimeout(() => {
        navigate('/home');
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [progress, navigate]);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <CircularProgressWithLabel value={progress} />
      <Typography variant="body1" component="div" sx={{ mt: 2 }}>
        <strong>
          Por favor, aguarde um momento. Você será redirecionado para a página inicial em breve...
        </strong>
        <div className="banner-ofertas-da-semana">
                <BannerPage />
            </div>
      </Typography>
    </Box>
  );
}
