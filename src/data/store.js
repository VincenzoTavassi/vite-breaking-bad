import { reactive } from "vue";

export const store = reactive({
  yugiCards: [],
  isLoading: false,
  offSet: 0,
  url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=40&offset=",
});
