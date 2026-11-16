'use strict';

const CARS = Object.freeze([
  { id: 1, name: 'Porsche 911 GT3 RS', category: 'Supercar', horsepower: 518, topSpeedKmh: 296, priceUsd: 241300,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Mercedes-AMG GT Black Series', category: 'Track Edition', horsepower: 720, topSpeedKmh: 325, priceUsd: 325000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Ferrari SF90 Stradale', category: 'Hypercar', horsepower: 986, topSpeedKmh: 340, priceUsd: 516000,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'BMW M4 Competition', category: 'Sports Coupe', horsepower: 503, topSpeedKmh: 290, priceUsd: 82200,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Audi R8 V10 Performance', category: 'Supercar', horsepower: 602, topSpeedKmh: 331, priceUsd: 158600,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80' },
  { id: 6, name: 'Lamborghini Huracan Evo', category: 'Supercar', horsepower: 631, topSpeedKmh: 325, priceUsd: 261274,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80' }
]);

module.exports = { CARS };
