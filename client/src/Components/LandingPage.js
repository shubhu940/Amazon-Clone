import React from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import StarIcon from '@mui/icons-material/Star';
import CarouselComponent from './CarouselComponent';

const HeroSection = styled(Paper)({
  position: 'relative',
  backgroundColor: '#ffffff',
  color: '#000',
  marginBottom: '32px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  textAlign: 'center',
  padding: '64px 0 48px',
  backgroundImage: 'url(./ImagesUse/wheatfield.jpg)',
});

const HeroContent = styled('div')({
  position: 'relative',
  padding: '24px',
});

const FeatureCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
});

const TestimonialCard = styled(Card)({
  maxWidth: 345,
  margin: 'auto',
});

const CTASection = styled(Box)({
  padding: '32px',
  backgroundColor: '#3f51b5',
  color: '#ffffff',
  textAlign: 'center',
});

const products = [
  {
    title: 'Fresh Apples',
    description: 'Delicious and organic apples straight from the farm.',
    imageUrl: '/ImagesUse/mango.jpg',
  },
  {
    title: 'Organic Carrots',
    description: 'Crisp and fresh carrots grown without pesticides.',
    imageUrl: '/ImagesUse/orange.jpg',
  },
  {
    title: 'Farm Fresh Eggs',
    description: 'Free-range eggs from healthy, happy chickens.',
    imageUrl: '/ImagesUse/guava.jpg',
  },
];

const testimonials = [
  {
    name: 'John Doe',
    feedback: 'Amazing products! The freshness and quality are unbeatable.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    feedback: 'I love buying from this farm. Everything is so fresh and delicious.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    feedback: 'I love buying from this farm. Everything is so fresh and delicious.',
    rating: 5,
  },
];

const LandingPage = () => {
  return (
    <div>
      <HeroSection>
        <Container maxWidth="sm">
          <HeroContent>
            <Typography variant="h3" color="inherit" gutterBottom>
              Fresh, Organic Farm Products
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Delivering the best from our farm to your table.
            </Typography>
            <Button variant="contained" color="primary">
              Shop Now
            </Button>
          </HeroContent>
        </Container>
      </HeroSection>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Our Products
        </Typography>
        
        <CarouselComponent/>

        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <FeatureCard>
                <CardMedia component="img" height="200" image={product.imageUrl} alt={product.title} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
          Testimonials
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TestimonialCard>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.feedback}
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    {[...Array(testimonial.rating)].map((star, i) => (
                      <StarIcon key={i} color="primary" />
                    ))}
                  </Box>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <CTASection>
        <Typography variant="h4" gutterBottom>
          Ready to Taste the Freshness?
        </Typography>
        <Button variant="contained" color="secondary" size="large" to='/home'>
          Order Now 
        </Button>
      </CTASection>
    </div>
  );
};

export default LandingPage;
