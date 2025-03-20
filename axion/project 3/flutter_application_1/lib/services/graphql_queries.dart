class GraphQLQueries {
  // Query to get medications for the authenticated user
  static String getMedications = '''
    query Medications {
      medications {
        medications {
          patientID
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

  // Query to get allergies for the authenticated user
  static String getAllergies = '''
    query Allergys {
      allergys {
        allergyIntolerances {
          patientID
          code
          display
          timestamp
          criticality
          severity
          category
          active
          source
          verificationStatus
          meta
        }
      }
    }
  ''';

  // Query to get immunizations for the authenticated user
  static String getImmunizations = '''
    query Immunization {
      immunization {
        immunizations {
          patientID
          code
          display
          dosage
          unit
          site
          timestamp
          meta
        }
      }
    }
  ''';

  // Query to get lab reports
  static String getLabs = '''
    query Labs {
      Labs {
        labs {
          id
          patientID
          code
          display
          timestamp
          meta
        }
      }
    }
  ''';

  // Query to get observations for a specific lab report
  static String getObservationStack = '''
    query ObservationStack(\$LabID: String!) {
      observationStack(LabID: \$LabID) {
        Observations {
          id
          patientID
          labID
          code
          display
          unit
          value
          timestamp
          meta
        }
      }
    }
  ''';
}
