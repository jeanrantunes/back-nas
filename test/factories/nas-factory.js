import Nas from 'models/Nas'

const nasFactory = async patientId => {
  const nas = await new Nas({
    patient_id: patientId,
    monitoring_and_controls: '1a',
    laboratory_investigations: true,
    medication_except_vasoactive_drugs: false,
    hygiene_procedures: '4a',
    caring_for_drains: false,
    mobilization_and_positioning: '6b',
    support_and_care: '7a',
    administrative_and_managerial_tasks: '8a',
    ventilatory_support: true,
    lung_function: false,
    artificial_airways: false,
    vasoactive_drugs: true,
    intravenous_replacement: false,
    monitoring_of_the_left_atrium: false,
    cardiorespiratory_resumption: true,
    hemofiltration_techniques: true,
    urine_output: true,
    intracranial_pressure: true,
    acidosis_treatment: true,
    intravenous_hyperalimentation: true,
    enteral_feeding: false,
    specific_interventions_in_the_unit: true,
    specific_interventions_outside_the_unit: true,
    nas_date: new Date()
  }).save()
  return nas.attributes
}

export default nasFactory
