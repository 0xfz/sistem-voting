import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("category", (table: Knex.TableBuilder) => {
        table.increments("id").primary()
        table.string("category_name")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("category")
}

