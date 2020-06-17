export const up = knex =>
  knex.schema
    .createTable('users', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
      table
        .string('email')
        .unique()
        .notNullable()
      table.string('password')
      table.enum('role', ['ADMIN', 'USER'])
      table.string('signup_token')
      table.string('reset_password_token')
      table.bigInteger('reset_password_expires')
      table.timestamps(true, true)
    })
    .createTable('patients', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
      table.datetime('birthday')
      table.string('to_search')
      table.enu('origin', [
        'ps',
        'nursery',
        'surgical-ward',
        'other-institution',
        'uti-covid',
        'home'
      ])
      table
        .enu('outcome', ['pending', 'death', 'discharge'])
        .defaultTo('pending')
      table.integer('saps_3').defaultTo(0)
      table.datetime('outcome_date')
      table.datetime('hospitalization_date')
      table.enu('bed', ['A', 'B', 'C', 'D', 'E', 'F'])
    })
    .createTable('hr', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
      table.string('to_search')
    })
    .createTable('hr_patients', table => {
      // table
      //   .uuid('id')
      //   .unique()
      //   .primary()
      //   .notNullable()
      table
        .uuid('patient_id')
        .references('id')
        .inTable('patients')
      table
        .uuid('hr_id')
        .references('id')
        .inTable('hr')
    })
    .createTable('comorbidities', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
      table.string('to_search')
    })
    .createTable('comorbidities_patients', table => {
      // table
      //   .uuid('id')
      //   .unique()
      //   .primary()
      //   .notNullable()
      table
        .uuid('patient_id')
        .references('id')
        .inTable('patients')
      table
        .uuid('comorbidity_id')
        .references('id')
        .inTable('comorbidities')
    })
    .createTable('nas', table => {
      table
        // .uuid('id')
        .increments()
        .unique()
        .primary()
        .notNullable()
      table.uuid('patient_id')
      table
        .foreign('patient_id')
        .references('id')
        .inTable('patients')
      table
        .enu('monitoring_and_controls', ['1a', '1b', '1c'])
        .notNullable()
        .defaultTo('1b')
      table
        .boolean('laboratory_investigations')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('medication_except_vasoactive_drugs')
        .notNullable()
        .defaultTo(true)
      table
        .enu('hygiene_procedures', ['4a', '4b', '4c'])
        .notNullable()
        .defaultTo('4a')
      table
        .boolean('caring_for_drains')
        .notNullable()
        .defaultTo(true)
      table
        .enu('mobilization_and_positioning', ['6a', '6b', '6c'])
        .notNullable()
        .defaultTo('6b')
      table
        .enu('support_and_care', ['7a', '7b'])
        .notNullable()
        .defaultTo('7a')
      table
        .enu('administrative_and_managerial_tasks', ['8a', '8b', '8c'])
        .notNullable()
        .defaultTo('8a')
      table
        .boolean('ventilatory_support')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('lung_function')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('artificial_airways')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('vasoactive_drugs')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('intravenous_replacement')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('monitoring_of_the_left_atrium')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('cardiorespiratory_resumption')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('hemofiltration_techniques')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('urine_output')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('intracranial_pressure')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('acidosis_treatment')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('intravenous_hyperalimentation')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('enteral_feeding')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('specific_interventions_in_the_unit')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('specific_interventions_outside_the_unit')
        .notNullable()
        .defaultTo(false)
      table.timestamps()
      table.datetime('nas_date').notNullable()
    })

export const down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('hr_patients')
    .dropTableIfExists('hr')
    .dropTableIfExists('comorbidities_patients')
    .dropTableIfExists('nas')
    .dropTableIfExists('patients')
    .dropTableIfExists('comorbidities')
