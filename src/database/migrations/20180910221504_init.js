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
      table.string('password').notNullable()
      table.enum('role', ['ADMIN', 'USER'])
      table.string('resetPasswordToken')
      table.bigInteger('resetPasswordExpires')
      table.timestamps(true, true)
    })
    .createTable('patients', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
      table.date('birthday')
      table.string('toSearch')
      table
        .enu('outcome', ['pending', 'death', 'discharge'])
        .defaultTo('pending')
      table.integer('saps3').defaultTo(0)
      table.datetime('outcomeDate')
      table.datetime('hospitalizationDate')
      table.enu('bed', ['A', 'B', 'C', 'D', 'E', 'F'])
    })
    .createTable('hospitalizationReason', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
    })
    .createTable('hospitalizationReasonPatients', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table
        .uuid('patientId')
        .references('id')
        .inTable('patients')
      table
        .uuid('hospitalizationReasonId')
        .references('id')
        .inTable('hospitalizationReason')
    })
    .createTable('comorbidities', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.string('name').notNullable()
    })
    .createTable('comorbiditiesPatients', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table
        .uuid('patientId')
        .references('id')
        .inTable('patients')
      table
        .uuid('comorbiditiesId')
        .references('id')
        .inTable('comorbidities')
    })
    .createTable('nas', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
      table.uuid('patientId')
      table
        .foreign('patientId')
        .references('id')
        .inTable('patients')
      table
        .enu('monitoringAndControls', ['1a', '1b', '1c'])
        .notNullable()
        .defaultTo('1b')
      table
        .boolean('laboratoryInvestigations')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('medicationExceptVasoactiveDrugs')
        .notNullable()
        .defaultTo(true)
      table
        .enu('hygieneProcedures', ['4a', '4b', '4c'])
        .notNullable()
        .defaultTo('4a')
      table
        .boolean('caringForDrains')
        .notNullable()
        .defaultTo(true)
      table
        .enu('mobilizationAndPositioning', ['6a', '6b', '6c'])
        .notNullable()
        .defaultTo('6b')
      table
        .enu('supportAndCare', ['7a', '7b'])
        .notNullable()
        .defaultTo('7a')
      table
        .enu('administrativeAndManagerialTasks', ['8a', '8b', '8c'])
        .notNullable()
        .defaultTo('8a')
      table
        .boolean('ventilatorySupport')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('lungFunction')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('vasoactiveDrugs')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('intravenousReplacement')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('monitoringOfTheLeftAtrium')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('cardiorespiratoryResumption')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('hemofiltrationTechniques')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('urineOutput')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('intracranialPressure')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('acidosisTreatment')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('intravenousHyperalimentation')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('enteralFeeding')
        .notNullable()
        .defaultTo(true)
      table
        .boolean('specificInterventionsInTheUnit')
        .notNullable()
        .defaultTo(false)
      table
        .boolean('specificInterventionsOutsideTheUnit')
        .notNullable()
        .defaultTo(false)
      table.timestamps()
    })

export const down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('hospitalizationReasonPatients')
    .dropTableIfExists('hospitalizationReason')
    .dropTableIfExists('comorbiditiesPatients')
    .dropTableIfExists('nas')
    .dropTableIfExists('patients')
    .dropTableIfExists('comorbidities')
