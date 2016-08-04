export default {
  user: {
    1: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'john-secret',
      role: '10',
      meta: {
        archived: false,
      },
    },
    2: {
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: 'jane-secret',
      role: '20',
      meta: {
        archived: false,
      },
    },
  },
  brand: {
    1: {
      name: 'Antenna',
      image: 'http://www.antennasonline.com/main/wp-content/themes/theme1108/images/ast_weblogo.jpg',
      background: '#444',
      text: '#FFF',
      secondary: '#333',
      obg: true,
      meta: {
        archived: false,
      },
      categories: ['1', '3'],
    },
    2: {
      name: 'Battery',
      image: 'http://www.batterypoweronline.com/main/wp-content/themes/theme1108/images/Battery_WebsiteBanner.jpg',
      background: '#444',
      text: '#FFF',
      secondary: '#333',
      obg: true,
      meta: {
        archived: false,
      },
      categories: ['2'],
    },
    3: {
      name: 'LED',
      image: 'http://www.ledjournal.com/main/wp-content/themes/theme1108/images/led_logo_main.jpg',
      background: '#444',
      text: '#FFF',
      secondary: '#333',
      obg: false,
      meta: {
        archived: false,
      },
      categories: [],
    },
  },
  category: {
    1: {
      name: 'Cheeseburger',
      heading: 'Food',
      meta: {
        archived: false,
      },
      brand: '1',
      listings: ['1', '2'],
      ads: ['1', '3'],
    },
    2: {
      name: 'French Fries',
      heading: 'Food',
      meta: {
        archived: false,
      },
      brand: '2',
      listings: ['1'],
      ads: ['1', '2'],
    },
    3: {
      name: 'Pepsi',
      heading: 'Drink',
      meta: {
        archived: false,
      },
      brand: '1',
      listings: ['2'],
      ads: ['3'],
    },
  },
  person: {
    1: {
      name: 'Jimmy Page',
      email: 'jimmypage@gmail.com',
      phone: '123-456-7890',
      job: 'Admin/HR/Legal',
      meta: {
        archived: false,
      },
      company: '1',
    },
    2: {
      name: 'Robert Plant',
      email: 'robertplant@gmail.com',
      phone: '123-456-7890',
      job: 'Finance/Purchasing',
      meta: {
        archived: false,
      },
      company: '1',
    },
    3: {
      name: 'John Paul Jones',
      email: 'johnpauljones@gmail.com',
      phone: '123-456-7890',
      job: 'Gen/Corp Management',
      meta: {
        archived: false,
      },
      company: '2',
    },
    4: {
      name: 'John Bonham',
      email: 'johnbonham@gmail.com',
      phone: '123-456-7890',
      job: 'IT/MIS',
      meta: {
        archived: false,
      },
      company: '2',
    },
  },
  company: {
    1: {
      name: 'Led Zeppelin',
      street: '444 Madison Avenue',
      city: 'New York',
      state: 'New York',
      zip: '10022',
      phone: '123-456-7890',
      url: 'swansong.com',
      email: 'swansong@gmail.com',
      description: 'Record label',
      password: 'swansong-secret',
      meta: {
        archived: false,
      },
      people: ['1', '2'],
      ads: ['1', '2'],
      listings: ['1', '2'],
    },
    2: {
      name: 'Google',
      street: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'California',
      zip: '94043',
      phone: '650-253-0000',
      url: 'google.com',
      email: 'google@gmail.com',
      description: 'Search engine',
      password: 'google-secret',
      meta: {
        archived: false,
      },
      people: ['3', '4'],
      ads: ['3'],
      listings: ['1', '3'],
    },
  },
  ad: {
    1: {
      name: 'Ad 1',
      image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      url: 'www.google.com',
      start: '03/19/1993',
      end: '03/19/2063',
      priority: '1',
      meta: {
        archived: false,
      },
      company: '1',
      categories: ['1', '2'],
    },
    2: {
      name: 'Ad 2',
      image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      url: 'www.google.com',
      start: '03/19/1993',
      end: '03/19/2063',
      priority: '2',
      meta: {
        archived: false,
      },
      company: '1',
      categories: ['2'],
    },
    3: {
      name: 'Ad 3',
      image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      url: 'www.google.com',
      start: '03/19/1993',
      end: '03/19/2063',
      priority: '3',
      meta: {
        archived: false,
      },
      company: '2',
      categories: ['1', '3'],
    },
  },
};
