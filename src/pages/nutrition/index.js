import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container} from '@mui/material';

export default function NutritionPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Nutrition | Minimal UI </title>
      </Helmet>

      <Container>
       <p>Nutrition</p>
      </Container>
    </>
  );
}
