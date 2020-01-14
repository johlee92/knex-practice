const ShoppingListService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')
    },

    insertItem(knex, newItem) {
        // returned an empty object that says that the promise has been resolved
        // return Promise.resolve({})
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(arrayOfRows => {
                return arrayOfRows[0]
            })
    },

    getById(knex, id) {
        return knex.from('shopping_list').select('*').where('id', id).first()
    },

    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    },

    updateItem(knex, id, newItemFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newItemFields)
    }
}

module.exports = ShoppingListService;