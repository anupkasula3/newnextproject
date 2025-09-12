type WritingTask = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  imageUrl: string;
  timeLimit: number;
  minWords: number;
  category: string;
  examType?: string;
};

type WritingTaskData = {
  academic: WritingTask[];
  essay: WritingTask[];
};

export const writingTaskData: WritingTaskData = {
  academic: [
    {
      id: 'academic-1',
      title: 'Bar Chart Analysis',
      description: 'The chart below shows the percentage of households with internet access in the UK from 1999 to 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Bar Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-2',
      title: 'Process Diagram',
      description: 'The diagram below shows the process of manufacturing cement and how cement is used to produce concrete for building purposes.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Process',
      examType: 'ielts'
    },
    {
      id: 'academic-3',
      title: 'Line Graph Analysis',
      description: 'The graph below shows the amount of time spent by people of different age groups on social media platforms daily in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Line Graph',
      examType: 'ielts'
    },
    {
      id: 'academic-4',
      title: 'Pie Chart Analysis',
      description: 'The pie charts below show the main reasons for migration to and from the UK in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Pie Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-5',
      title: 'Table Data Analysis',
      description: 'The table below gives information about the monthly spending of an average family in the US and Germany in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Table',
      examType: 'ielts'
    },
    {
      id: 'academic-6',
      title: 'Map Comparison',
      description: 'The maps below show the town of Millfield in 1980 and 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Map',
      examType: 'ielts'
    },
    {
      id: 'academic-7',
      title: 'Multiple Charts Analysis',
      description: 'The charts below show electricity generation by fuel source in Australia and France in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Multiple Charts',
      examType: 'ielts'
    },
    {
      id: 'academic-8',
      title: 'Flow Chart Analysis',
      description: 'The flow chart below shows the process of recycling paper.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1643187975306-e6801f4648ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Flow Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-9',
      title: 'Stacked Bar Chart',
      description: 'The stacked bar chart below shows the percentage of people of different age groups using various modes of transportation in a European city in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1553335720-7f6cb1e1a8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Bar Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-10',
      title: 'Diagram Analysis',
      description: 'The diagram below shows the water cycle.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1534937048125-855b2f1412b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Diagram',
      examType: 'ielts'
    },
    {
      id: 'academic-11',
      title: 'Population Pyramid',
      description: 'The population pyramid below shows the population distribution of Country X in 1980 and 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1618307842633-1274896ad184?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Population Pyramid',
      examType: 'ielts'
    },
    {
      id: 'academic-12',
      title: 'Scientific Process',
      description: 'The diagram below shows the life cycle of a butterfly.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1567793706285-b63d95a17bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Scientific Process',
      examType: 'ielts'
    },
    {
      id: 'academic-13',
      title: 'Scatter Plot Analysis',
      description: 'The scatter plot below shows the relationship between hours spent studying and exam scores for 100 students.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Scatter Plot',
      examType: 'ielts'
    },
    {
      id: 'academic-14',
      title: 'Area Chart Analysis',
      description: 'The area chart below shows the market share of different smartphone brands from 2010 to 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Area Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-15',
      title: 'Combined Chart Analysis',
      description: 'The chart below shows the average monthly rainfall and temperature in London in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1635682406513-64a0d83ccc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Combined Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-16',
      title: 'Bubble Chart Analysis',
      description: 'The bubble chart below shows the relationship between GDP per capita, life expectancy, and population size for different countries in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Bubble Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-17',
      title: 'Polar Chart Analysis',
      description: 'The polar chart below shows the distribution of energy consumption by sector in a developed country in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1639816330537-709c9d0eadb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Polar Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-18',
      title: 'Radar Chart Analysis',
      description: 'The radar chart below compares five smartphones across six different attributes.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Radar Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-19',
      title: 'Gantt Chart Analysis',
      description: 'The Gantt chart below shows the schedule for building a house from start to completion.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Gantt Chart',
      examType: 'ielts'
    },
    {
      id: 'academic-20',
      title: 'Tree Map Analysis',
      description: 'The tree map below shows the global market share of different categories of consumer products in 2022.',
      instructions: 'Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 20,
      minWords: 150,
      category: 'Tree Map',
      examType: 'ielts'
    }
  ],
  essay: [
    {
      id: 'essay-1',
      title: 'Technology and Society',
      description: 'Some people believe that the widespread use of the internet is damaging social interaction between people.',
      instructions: 'To what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Technology',
      examType: 'ielts'
    },
    {
      id: 'essay-2',
      title: 'Education Systems',
      description: 'Some people think that schools should teach children academic subjects that will help them in their future careers, while others believe that schools should teach a wide range of subjects and knowledge.',
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Education',
      examType: 'ielts'
    },
    {
      id: 'essay-3',
      title: 'Environmental Protection',
      description: 'Many environmental problems are too large for individual countries to solve alone. To what extent do you agree or disagree with this statement?',
      instructions: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Environment',
      examType: 'ielts'
    },
    {
      id: 'essay-4',
      title: 'Work-Life Balance',
      description: 'In some countries, many people work long hours. This can affect their health, their families, and the environment.',
      instructions: 'What are the reasons for this? What actions could be taken to solve this problem? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Work & Career',
      examType: 'ielts'
    },
    {
      id: 'essay-5',
      title: 'Urban Development',
      description: 'In many countries, cities are growing rapidly and many people are leaving rural areas to live in cities.',
      instructions: 'Why is this happening? What problems are caused by this trend? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Urbanization',
      examType: 'ielts'
    },
    {
      id: 'essay-6',
      title: 'Art and Culture',
      description: 'Some people believe that governments should fund art while others think funding should be allocated to other priorities like healthcare and education.',
      instructions: 'Discuss both these views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Arts & Culture',
      examType: 'ielts'
    },
    {
      id: 'essay-7',
      title: 'Public Health',
      description: 'In recent years, more and more people are suffering from health problems related to a poor diet.',
      instructions: 'What are the reasons for this? What measures could be taken to address this situation? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Health',
      examType: 'ielts'
    },
    {
      id: 'essay-8',
      title: 'Tourism',
      description: 'International tourism has brought enormous benefits to many places. At the same time, there is concern about its impact on local inhabitants and the environment.',
      instructions: 'Discuss the impacts of international tourism and explain whether you believe the benefits outweigh the disadvantages. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Tourism',
      examType: 'ielts'
    },
    {
      id: 'essay-9',
      title: 'Transportation',
      description: 'Some people believe that the best way to reduce traffic congestion is to increase the price of fuel for cars and other private vehicles. To what extent do you agree or disagree?',
      instructions: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Transportation',
      examType: 'ielts'
    },
    {
      id: 'essay-10',
      title: 'Science and Research',
      description: 'Some people think that scientific research should be conducted by governments rather than private companies. To what extent do you agree or disagree with this opinion?',
      instructions: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Science',
      examType: 'ielts'
    },
    {
      id: 'essay-11',
      title: 'Globalization',
      description: 'Globalization has both positive and negative effects on traditional cultures.',
      instructions: 'Discuss both the advantages and disadvantages. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1526376043067-5af36c35cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Globalization',
      examType: 'ielts'
    },
    {
      id: 'essay-12',
      title: 'Parenting and Family',
      description: 'Some people believe that children should be allowed to do whatever they want, while others believe children need strict rules.',
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1478071735433-3eef23d9ad86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Family',
      examType: 'ielts'
    },
    {
      id: 'essay-13',
      title: 'Crime and Punishment',
      description: 'Some people believe that the most effective way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime.',
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Crime',
      examType: 'ielts'
    },
    {
      id: 'essay-14',
      title: 'Space Exploration',
      description: 'Some people think that space exploration is a waste of money and resources while others think that it is essential for mankind to continue to explore space.',
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Space',
      examType: 'ielts'
    },
    {
      id: 'essay-15',
      title: 'Genetic Engineering',
      description: "Genetic engineering is an important issue in modern society. Some people think that it will improve people's lives in many ways. Others feel that it may be a threat to life on earth.",
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Genetics',
      examType: 'ielts'
    },
    {
      id: 'essay-16',
      title: 'Media Influence',
      description: "News media has a significant influence on people's ideas and opinions. To what extent do you agree or disagree with this statement?",
      instructions: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Media',
      examType: 'ielts'
    },
    {
      id: 'essay-17',
      title: 'Artificial Intelligence',
      description: 'Many jobs that humans do now will be done by robots or artificial intelligence in the future. Do you think the advantages of this development outweigh the disadvantages?',
      instructions: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Technology',
      examType: 'ielts'
    },
    {
      id: 'essay-18',
      title: 'Animal Rights',
      description: 'Some people believe that it is morally wrong to use animals for human benefit, others believe that humans have the right to use animals as they see fit.',
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Animal Rights',
      examType: 'ielts'
    },
    {
      id: 'essay-19',
      title: 'Renewable Energy',
      description: 'Fossil fuels are the main source of energy in many countries, but in some countries the use of alternative sources of energy is encouraged. Is this a positive or negative development?',
      instructions: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Energy',
      examType: 'ielts'
    },
    {
      id: 'essay-20',
      title: 'Cultural Heritage',
      description: 'Many traditional skills and ways of life are disappearing. Should society try to preserve these cultural traditions or should society continue to develop new traditions and skills?',
      instructions: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
      imageUrl: 'https://images.unsplash.com/photo-1519677584237-752f8853252e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      timeLimit: 40,
      minWords: 250,
      category: 'Culture',
      examType: 'ielts'
    }
  ]
};
