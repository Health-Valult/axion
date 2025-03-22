class GraphQLQueries {
  // Query to get medications for the authenticated user


  // Combined query for medications, allergies, and immunizations
  static String getAllHealthData = '''
    query HealthData {
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
