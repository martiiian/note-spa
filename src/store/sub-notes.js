export default {
  namespaced: true,

  state: () => ({
    all: [
      {
        id: 1,
        title: 'Саб заметка',
        description: '',
        isComplete: false,
        parent: 1
      },
      {
        id: 2,
        title: 'Саб заметка 2',
        description: '',
        isComplete: false,
        parent: 1
      },
      {
        id: 3,
        title: 'Саб заметка 3',
        description: '',
        isComplete: false,
        parent: 1
      },
      {
        id: 4,
        title: 'Саб заметка 4',
        description: '',
        isComplete: false,
        parent: 2
      },
      {
        id: 5,
        title: 'Саб заметка 5',
        description: '',
        isComplete: false,
        parent: 2
      },
      {
        id: 6,
        title: 'Саб заметка 6',
        description: '',
        isComplete: false,
        parent: 2
      },
      {
        id: 7,
        title: 'Саб заметка 7',
        description: '',
        isComplete: false,
        parent: 2
      },
      {
        id: 8,
        title: 'Саб заметка 8',
        description: '',
        isComplete: false,
        parent: 3
      },
      {
        id: 9,
        title: 'Саб заметка 9',
        description: '',
        isComplete: false,
        parent: 3
      },
      {
        id: 10,
        title: 'Саб заметка 10',
        description: '',
        isComplete: false,
        parent: 3
      },
      {
        id: 11,
        title: 'Саб заметка 11',
        description: '',
        isComplete: false,
        parent: 4
      },
    ]
  }),
  
  mutations: {
    delete(state, item) {
      state.all = state.all.filter((i) => i.id !== item.id)
    },

    deleteByParent(state, parent) {
      state.all = state.all.filter((i) => i.parent !== parent.id)
    }
  }
}
