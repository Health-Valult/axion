// import { gql } from "@apollo/client";
// // import { ReportTemplates, ReportType } from "./ReportData";
//
// export const generateReportQuery = (reportType: ReportType) => {
//     const commonFields = ["patientName", "referredBy", "ageSex", "date", "investigations"];
//     const specificFields = ReportTemplates[reportType]?.fields || [];
//
//     return gql`
//       query GetReportData($reportId: ID!, $type: String!) {
//         report(id: $reportId, type: $type) {
//           ${[...commonFields, ...specificFields].join("\n")}
//         }
//       }
//     `;
// };
