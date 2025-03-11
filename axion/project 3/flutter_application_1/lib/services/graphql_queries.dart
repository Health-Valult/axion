class GraphQLQueries {
  // Single query to get all patient data including reports (procedures)
  static String getPatientData = '''
    query GetPatientData(\$patient: ID!) {
      procedures(patient: \$patient) {
        Procedures {
          encounter
          patient
          id
          code
          display
          Date
          meta
        }
      }
      observations(patient: \$patient, code: null, encounter: null) {
        encounter
        patient
        code
        display
        unit
        value
        timestamp
        meta
      }
      allergys(patient: \$patient) {
        allergyIntolerances {
          patient
          code
          display
          timestamp
          criticality
          severity
          category
          active
          source
          verificationStatus
        }
      }
      medications(patient: \$patient) {
        medications {
          patient
          code
          display
          dosage
          route
          prescriber
          meta
        }
      }
    }
  ''';

  // Query for specific observations (report content) by encounter
  static String getObservationsByEncounter = '''
    query GetObservationsByEncounter(\$patient: ID!, \$encounter: ID!) {
      observations(patient: \$patient, encounter: \$encounter) {
        encounter
        patient
        code
        display
        unit
        value
        timestamp
        meta
      }
    }
  ''';
}
