class GraphQLQueries {
  static String getMedications = '''
    query GetMedications {
      medications {
        id
        name
        dosage
        frequency
        startDate
        endDate
        instructions
      }
    }
  ''';

  static String getAllergies = '''
    query GetAllergies {
      allergies {
        id
        name
        severity
        reaction
        diagnosedDate
        notes
      }
    }
  ''';

  static String getReports = '''
    query GetReports(\$year: Int!) {
      reports(year: \$year) {
        id
        reportType
        dateTime
        title
        status
        placeholderImageUrl
        patientName
        referredBy
        ageSex
        investigations
        dailyCaseNumber
        patientID
        medications {
          id
          name
          dosage
          frequency
          startDate
          endDate
          instructions
        }
        allergies {
          id
          name
          severity
          reaction
          diagnosedDate
          notes
        }
        ... on CBCReport {
          testResults {
            testName
            value
            unit
            reference
          }
        }
        ... on SerumChlorideReport {
          chlorideValue
          unit
          reference
        }
        ... on SerumSodiumReport {
          sodiumValue
          unit
          reference
        }
        ... on HBA1cReport {
          hba1cValue
          unit
          reference
        }
        ... on SerumPotassiumReport {
          potassiumValue
          unit
          reference
        }
        ... on LipidProfileReport {
          totalCholesterol
          triglycerides
          hdl
          ldl
          vldl
          ldlHdlRatio
          totalCholesterolHdlRatio
        }
        ... on LiverFunctionTestReport {
          bilirubinTotal
          bilirubinDirect
          bilirubinIndirect
          sgpt
          sgot
          alkalinePhosphatase
          serumProtein
          serumAlbumin
          globulin
          agRatio
        }
        ... on ThyroidFunctionTestReport {
          t3
          t4
          tsh
        }
        ... on CRPReport {
          crpQuantitative
          crpQualitative
        }
        ... on SerumCreatinineReport {
          creatinineValue
          unit
          reference
        }
      }
    }
  ''';

}
