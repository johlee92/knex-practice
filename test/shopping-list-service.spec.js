const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Shopping list service object`, () => {
    let db;
    let testList = [
        {
            id: 1,
            name: 'Fish tricks',
            // price: 13.10, why doesn't this work? how to get pass it?
            price: '13.10',
            date_added: new Date('2029-01-22T16:28:32.615Z'),  
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'beef jerky',
            price: '1.29',
            date_added: new Date('2100-05-22T16:28:32.615Z'),  
            checked: true,
            category: 'Snack'    
        },
        {
            id: 3,
            name: 'popcorn',
            price: '7.11',
            date_added: new Date('1919-12-22T16:28:32.615Z'),  
            checked: false,
            category: 'Breakfast'
        },
    ]
        
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    afterEach(() => db('shopping_list').truncate())
    after(() => db('shopping_list').truncate())
    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
              .into('shopping_list')
              .insert(testList)
        })

        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testList)
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testList[thirdId - 1]
                return ShoppingListService.getById(db, thirdId)
                    .then(actual => {
                        expect(actual).to.eql({
                            id: thirdId,
                            name: thirdTestItem.name,
                            price: thirdTestItem.price,
                            date_added: thirdTestItem.date_added,  
                            checked: thirdTestItem.checked,
                            category: thirdTestItem.category
                        })
                })
        })

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(actual => {
                    // copy the test items array without the "deleted" item
                    const expected = testList.filter(item => item.id !== itemId)
                    expect(actual).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated name',
                price: '0.00',
                date_added: new Date(),
                checked: true,
                category: 'Main'
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        ...newItemData,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })

        it(`insertItem() inserts a new item and resolves the new item with an 'add'`, () => {
            const newItem = {
                name: 'new name',
                price: '1.00',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                checked: false,
                category: 'Snack'
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: 'new name',
                        price: '1.00',
                        date_added: new Date('2020-01-01T00:00:00.000Z'),
                        checked: false,
                        category: 'Snack'
                    })
            })
        })
    })
})
