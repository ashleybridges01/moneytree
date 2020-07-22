const cards = [
    {
      id: 'card-1',
      title: 'Make React app',
    },
    {
      id: 'card-2',
      title: 'Say hi to Wendy',
    },
    {
      id: 'card-3',
      title: 'Watch Ducko vid',
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