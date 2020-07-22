const cards = [
    {
      id: 'card-1',
      content: 'Make React app',
    },
    {
      id: 'card-2',
      content: 'Get lunch',
    },
    {
      id: 'card-3',
      content: 'Watch Ducko vid',
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