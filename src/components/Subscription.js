import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { colors } from '../constants/globals';

const plans = [
  {
    title: 'Monthly',
    price: 7.99,
    description: [
      'All access personal training',
      'Help center access',
      'Email support',
    ],
    buttonText: 'choose plan',
    buttonVariant: 'contained',
    paymentLink: 'https://buy.stripe.com/test_6oE3e3ep03gecuc28e',
  },
  {
    title: '6 Months',
    subheader: 'Most popular',
    price: 45.99,
    description: [
    'All access personal training',
    'Help center access',
    'Priority email support',
    ],
    buttonText: 'choose plan',
    buttonVariant: 'contained',
    paymentLink: 'https://buy.stripe.com/test_3cs9Cr6Wy8AygKs6ov'
  },
  {
    title: 'Yearly',
    price: 90.00,
    description: [
    'All access personal training',
    'Help center access',
      'Phone & email support',
    ],
    buttonText: 'choose plan',
    buttonVariant: 'contained',
    paymentLink: 'https://buy.stripe.com/test_dR65mb6Wy4ki8dW3ck'
  },
];


export default function SubscriptionCard({close}) {
  return (
    <div className='flex flex-col bg-white shadow-lg rounded-2xl '>
           {/* Close icon */}
           <div className='flex justify-end m-1'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 m-2 mb-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => close()}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>

        <div className='flex flex-col  pb-12 px-8'>
      <Container disableGutters maxWidth="sm" component="main">
     
        <p
        className='text-3xl font-bold text-center text-gray-800 mb-4'
        >
          Pricing
        </p>
        <p className='text-xl text-gray-500 text-center mb-8 mx-16' >
          Here are our different plans covering all your needs, monthly, 6 months or yearly.
        </p>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {plans.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === '6 Months' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                      mx: 4
                    }}
                  >
                    <Typography component="h4" variant="h4" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}
                    sx={{
                        bgcolor: colors.primary,
                        color: 'white',
                        '&:hover': {
                            bgcolor: colors.primary,
                            color: 'white',
                        },
                      }}
                  >
                    <a
                    href={tier.paymentLink}
                    target='_blank'
                    onClick={() => close()}
                    >
                    {tier.buttonText}
                    </a>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </div>
    </div>
  );
}