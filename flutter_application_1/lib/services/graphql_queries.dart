class GraphQLQueries {
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


  static String getLabs = '''
    query Labs {
      Labs {
        labs {
          id
          patientID
          display
          timestamp
          meta
        }
      }
    }
  ''';

 
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
