require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

function searchShoppingListByTerm(term) {
    knexInstance
      .select('*')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${term}%`)
      .then(result => {
        console.log(result)
      })
}
  
// searchShoppingListByTerm('burger');

function paginateShoppingList(page) {
    const itemsPerPage = 6;
    const offset = itemsPerPage * (page - 1);

    knexInstance
      .select('*')
      .from('shopping_list')
      .limit(itemsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
  }
  
//   paginateShoppingList(5);

function getItemsAfterDaysAgo(daysAgo) {
    knexInstance
      .select('*')
      .where(
        'date_added',
        '<',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .from('shopping_list')
      .then(result => {
        console.log(result)
      })
  }
  
//   getItemsAfterDaysAgo(7);

function totalCostShoppingList() {
    knexInstance
      .select('category')
      .sum('price AS Total_COST')
      .from('shopping_list')
      .groupBy('category')
      .orderBy([
        { column: 'category', order: 'ASC' },
        { column: 'Total_COST', order: 'DESC'},
      ])
      .then(result => {
        console.log(result)
      })
  }
  
  totalCostShoppingList();