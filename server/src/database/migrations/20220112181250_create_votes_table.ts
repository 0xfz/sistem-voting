import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("votes", (table: Knex.TableBuilder) => {
        table.increments("id").primary()
        table.integer("user_id").unsigned()
        table.integer("candidate_id").unsigned()
        table.integer("category_id").unsigned()
        table.foreign("user_id").references("id").inTable("users").onDelete("cascade")
        table.foreign("candidate_id").references("id").inTable("candidates").onDelete("cascade")
        table.foreign("category_id").references("id").inTable("category").onDelete("cascade")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("votes")
}
