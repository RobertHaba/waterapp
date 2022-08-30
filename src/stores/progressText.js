import { defineStore } from 'pinia';
export const useProgressText = defineStore({
  id: 'texts',
  state() {
    return {
      data: [
        {
          title: 'Miło Cię widzieć!',
          text: 'Rozpocznij uzupełnianie wody i wypełnij swój cel do końca.',
        },
        {
          title: 'Pierwsze łyki za Tobą!',
          text: 'Tak trzymaj, a z pewnością uda Ci się wykonać cel.',
        },
        {
          title: 'Czy wiedziałeś, że...',
          text: 'Woda pozytywnie wpływa na wygląd naszej skóry?',
        },
        {
          title: 'Połowa jest już blisko.',
          text: 'Brakuje jeszcze kilku kropelek, a później pójdzie już z górki.',
        },
        {
          title: 'Połowa już za Tobą!',
          text: 'Uzupełniaj swoje płyny na bieżąco i dbaj o swoje nawodnienie do końca.',
        },
        {
          title: 'Woda ma wiele zalet.',
          text: 'Odpowiednie nawodnienie może poprawić Twoją koncentrację.',
        },
        {
          title: 'Cel jest tak blisko!',
          text: 'Jeszcze troszkę i Twój poziom nawodnienia będzie na idealnym poziomie.',
        },
        {
          title: 'Mamy to!',
          text: 'Twój poziom nawodnienia jest na zalecanym poziomie. Pamiętaj o regularnym uzupełnianiu płynów!',
        },
      ],
      activeData: {
        drink: '',
        water: '',
      },
    };
  },
  actions: {
    setActiveData(mode = 'water', id) {
      this.activeData[mode] = this.data[id];
    },
  },
});
