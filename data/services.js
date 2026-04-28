export const servicesData = {
  haircut: [
    {
      id: 1,
      name: "Classic Haircut",
      price: 150,
      serviceDesc: "A traditional haircut with clean sides and a natural finish, suitable for all ages.",
      time: "30 mins",
      popular: true,
      category: "haircut"
    }
  ],
  beardAndShave: [
    {
      id: 101,
      name: "Beard Trim & Styling",
      price: 150,
      serviceDesc: "Neat beard trimming with precision shaping for a clean professional look.",
      time: "20 mins",
      imgSrc: "/beardCut.jpg",
      popular: true,
      category: "beard"
    },
    {
      id: 103,
      name: "Hot Towel Shave",
      price: 200,
      serviceDesc: "Relaxing hot towel shave using premium products for smooth skin.",
      time: "35 mins",
      imgSrc: "/beardCut.jpg",
      popular: true,
      category: "shave"
    },
    {
      id: 104,
      name: "Clean Shave",
      price: 100,
      serviceDesc: "Complete clean shave using high-quality grooming products.",
      time: "20 mins",
      imgSrc: "/shaves.jpg",
      popular: false,
      category: "shave"
    }
  ],
  packages: [
    {
      id: 201,
      name: "Complete Grooming",
      price: 350,
      serviceDesc: "Haircut + Beard trim for the complete gentleman's experience.",
      time: "50 mins",
      imgSrc: "/barbershop.jpg",
      popular: true,
      category: "package"
    },
    {
      id: 202,
      name: "Haircut and coloring",
      price: 400,
      serviceDesc: "Haircut + coloring ",
      time: "50 mins",
      imgSrc: "/barbershop.jpg",
      popular: true,
      category: "package"
    },
    {
      id: 203,
      name: "Premium Package",
      price: 500,
      serviceDesc: "Haircut, beard styling, and relaxing hot towel shave.",
      time: "70 mins",
      imgSrc: "/barbershop.jpg",
      popular: true,
      category: "package"
    },
    {
      id: 204,
      name: "straight hair + shave",
      price: 500,
      serviceDesc: "Hair Straight + Hot towel shave",
      time: "70 mins",
      imgSrc: "/barbershop.jpg",
      popular: true,
      category: "package"
    }
  ]
};

// Popular services for home page
export const getPopularServices = () => {
  const allServices = [...servicesData.haircut, ...servicesData.beardAndShave, ...servicesData.packages];
  return allServices.filter(service => service.popular).slice(0, 3);
};

// All services for booking dropdown
export const getAllServices = () => {
  return [...servicesData.haircut, ...servicesData.beardAndShave, ...servicesData.packages];
};