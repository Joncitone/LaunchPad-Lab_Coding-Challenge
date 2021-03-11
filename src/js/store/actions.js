// add action types as a form of best practice

const TYPE1 = 'TYPE1';

//ACTIONS

export default {
  typeOne(context, payload) {
    context.commit(TYPE1, payload);
  },
  //typeTwo...
};
