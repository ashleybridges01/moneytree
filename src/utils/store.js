const cards = [
    {
      id: 'card-1',
      title: 'Uber Eats - $120',
    },
    {
      id: 'card-2',
      title: 'Rent - $540',
    },
    {
      id: 'card-3',
      title: 'Car Insurance - $200',
    },
  ];
  
  const data = {
    lists: {
      'list-1': {
        id: 'list-1',
        title: 'Ash',
        cards,
      },
    },
    listIds: ['list-1'],
  };
  
  export default data;