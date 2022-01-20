import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
        table.increments("id").primary()
        table.string("nisn")
        table.string("nis")
        table.string("full_name").nullable()
        table.string("kelas").nullable()
        table.boolean("has_voted").defaultTo(false)
        table.string("role")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users")
}

