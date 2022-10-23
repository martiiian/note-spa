export default {
  namespaced: true,

  state: () => ({
    all: [
      {
        id: 1,
        title: 'Заметка',
        description: '',
        isComplete: false,
      },
      {
        id: 2,
        title: 'Заметка 2',
        description: '',
        isComplete: false,
      },
      {
        id: 3,
        title: 'Заметка 3',
        description: '',
        isComplete: false,
      },
      {
        id: 4,
        title: 'Заметка 4',
        description: '',
        isComplete: false,
      },
      {
        id: 5,
        title: 'Заметка 5',
        description: '',
        isComplete: false,
      },
      {
        id: 6,
        title: 'Заметка 6',
        description: '',
        isComplete: false,
      },
      {
        id: 7,
        title: 'Заметка 7',
        description: '',
        isComplete: false,
      },
      {
        id: 8,
        title: 'Заметка 8',
        description: '',
        isComplete: false,
      },
      {
        id: 9,
        title: 'Заметка 9',
        description: '',
        isComplete: false,
      },
      {
        id: 10,
        title: 'Заметка 10',
        description: '',
        isComplete: false,
      },
      {
        id: 11,
        title: 'Заметка 11',
        description: '',
        isComplete: false,
      },
    ]
  }),

  mutations: {
    delete(state, item) {
      state.all = state.all.filter((i) => i.id !== item.id)
    }
  },
}
