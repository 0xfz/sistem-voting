import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("candidates", (table: Knex.TableBuilder) => {
        table.increments("id").primary()
        table.integer("no_urut")
        table.string("candidate_profile_picture").nullable()
        table.integer("category_id").unsigned()
        table.string("full_name")
        table.string("kelas")
        table.text("visi")
        table.text("misi")
        table.foreign("category_id").references("id").inTable("category").onDelete("cascade")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("candidates")
}
